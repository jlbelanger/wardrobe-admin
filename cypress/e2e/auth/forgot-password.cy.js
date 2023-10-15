import { mockServerError } from '../../support/commands';

describe('forgot password', () => {
	describe('with non-existent email', () => {
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

	describe('with valid email', () => {
		it('works', () => {
			cy.intercept('POST', '**/api/auth/forgot-password').as('forgotPassword');
			cy.intercept('PUT', '**/api/auth/reset-password/*').as('resetPassword');
			cy.intercept('POST', '**/api/auth/login').as('login');

			cy.clearCookies();
			cy.visit('/forgot-password');
			cy.get('[name="email"]').type(Cypress.env('default_email'));
			cy.get('[type="submit"]').click();
			cy.wait('@forgotPassword').its('response.statusCode').should('equal', 204);
			cy.get('.formosa-alert--success').invoke('text')
				.should('equal', 'If there is an account with this email address, you will receive a password reset email shortly.');

			// Reset password.
			cy.visit(Cypress.env('mail_url'));
			cy.contains(`[${Cypress.env('site_name')}] Reset Password`).click();
			cy.get('#nav-plain-text-tab').click();
			cy.get('[href*="/reset-password"]')
				.then(($a) => {
					// With wrong token.
					const newPassword = 'password2';
					cy.visit($a.attr('href').replace('?', 'a?'));
					cy.get('[name="email"]').clear().type(Cypress.env('default_email'));
					cy.get('[name="new_password"]').clear().type(`${newPassword}3`);
					cy.get('[name="new_password_confirmation"]').clear().type(`${newPassword}3`);
					cy.get('[type="submit"]').click();
					cy.wait('@resetPassword').its('response.statusCode').should('equal', 403);
					cy.get('.formosa-alert--error').invoke('text')
						.should('equal', 'Error: This password reset link is invalid or the email is incorrect.');

					// With wrong email.
					cy.visit($a.attr('href'));
					cy.get('[name="email"]').type('wrongemail@example.com');
					cy.get('[name="new_password"]').clear().type(`${newPassword}4`);
					cy.get('[name="new_password_confirmation"]').clear().type(`${newPassword}4`);
					cy.get('[type="submit"]').click();
					cy.wait('@resetPassword').its('response.statusCode').should('equal', 403);
					cy.get('.formosa-alert--error').invoke('text')
						.should('equal', 'Error: This password reset link is invalid or the email is incorrect.');
				});
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
