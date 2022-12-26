import './commands';

Cypress.Commands.add('login', (username = '', password = '', expectedCode = 200) => {
	username = username || Cypress.env('default_username');
	password = password || Cypress.env('default_password');
	cy.session([username, password], () => {
		const timestamp = (new Date()).getTime();
		cy.visit('/');
		cy.get('[name="username"]').type(username);
		cy.get('[name="password"]').type(password);
		cy.intercept('POST', '**/api/auth/login').as(`login${timestamp}`);
		cy.get('[type="submit"]').click();
		cy.wait(`@login${timestamp}`).its('response.statusCode').should('equal', expectedCode);
	});
});
