describe('forgot password', () => {
	describe('with an invalid email', () => {
		it('works', () => {
			cy.clearCookies();
			cy.visit('/forgot-password');
			cy.get('[name="email"]').type('doesnotexist@example.com');
			cy.intercept('POST', '**/api/auth/forgot-password').as('forgotPassword');
			cy.get('[type="submit"]').click();
			cy.wait('@forgotPassword').its('response.statusCode').should('equal', 204);
			cy.get('.formosa-message--success').invoke('text')
				.should('equal', 'If there is an account with this email address, you will receive a password reset email shortly.');
		});
	});

	describe('with an valid email', () => {
		it('works', () => {
			cy.clearCookies();
			cy.visit('/forgot-password');
			cy.get('[name="email"]').type(Cypress.env('default_email'));
			cy.intercept('POST', '**/api/auth/forgot-password').as('forgotPassword');
			cy.get('[type="submit"]').click();
			cy.wait('@forgotPassword').its('response.statusCode').should('equal', 204);
			cy.get('.formosa-message--success').invoke('text')
				.should('equal', 'If there is an account with this email address, you will receive a password reset email shortly.');
		});
	});
});
