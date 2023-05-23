import { mockServerError } from '../../support/commands';

describe('forgot password', () => {
	describe('with an invalid email', () => {
		it('works', () => {
			cy.intercept('POST', '**/api/auth/forgot-password').as('forgotPassword');

			cy.clearCookies();
			cy.visit('/forgot-password');
			cy.get('[name="email"]').type('doesnotexist@example.com');
			cy.get('[type="submit"]').click();
			cy.wait('@forgotPassword').its('response.statusCode').should('equal', 204);
			cy.get('.formosa-alert--success').invoke('text')
				.should('equal', 'If there is an account with this email address, you will receive a password reset email shortly.');
		});
	});

	describe('with an valid email', () => {
		it('works', () => {
			cy.intercept('POST', '**/api/auth/forgot-password').as('forgotPassword');

			cy.clearCookies();
			cy.visit('/forgot-password');
			cy.get('[name="email"]').type(Cypress.env('default_email'));
			cy.get('[type="submit"]').click();
			cy.wait('@forgotPassword').its('response.statusCode').should('equal', 204);
			cy.get('.formosa-alert--success').invoke('text')
				.should('equal', 'If there is an account with this email address, you will receive a password reset email shortly.');
		});
	});

	describe('with server error', () => {
		it('shows an error', () => {
			mockServerError('POST', '**/api/auth/forgot-password').as('forgotPassword');

			cy.clearCookies();
			cy.visit('/forgot-password');
			cy.get('[name="email"]').type(Cypress.env('default_email'));
			cy.get('[type="submit"]').click();
			cy.wait('@forgotPassword').its('response.statusCode').should('equal', 500);
			cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: Unable to connect to the server. Please try again later.');
		});
	});
});
