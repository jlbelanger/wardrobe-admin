describe('users', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/');
	});

	const data = {
		apiPath: '**/api/users',
		path: '/users',
		singular: 'user',
		plural: 'Users',
	};

	it('works', () => {
		const timestamp = (new Date()).getTime();

		cy.handlesEverything({
			...data,
			fieldsAdd: {
				text: {
					username: `aaa${timestamp}`,
					email: `aaa${timestamp}@example.com`,
				},
				password: {
					password: 'aaa',
				},
			},
			fieldsEdit: [
				{
					text: {
						username: `bbb${timestamp}`,
						email: `bbb${timestamp}@example.com`,
					},
					password: {
						password: 'bbb',
					},
				},
			],
			afterEdit: () => {
				cy.clearCookies();
				cy.login(`aaa${timestamp}`, 'aaa', 401);
				cy.login(`aaa${timestamp}`, 'bbb', 401);
				cy.login(`bbb${timestamp}`, 'aaa', 401);
				cy.login(`bbb${timestamp}`, 'bbb');

				// Logout.
				cy.intercept('DELETE', '**/api/auth/logout').as('logout');
				cy.visit('/');
				cy.get('#crudnick-menu-button').click();
				cy.contains('Logout').click();
				cy.wait('@logout').its('response.statusCode').should('equal', 204);
				cy.location('pathname').should('eq', Cypress.env('public_path'));

				cy.login();
				cy.visit('/');
				cy.get('#crudnick-menu-button').click();
				cy.contains('Users').click();
				cy.intercept('GET', `${data.apiPath}/*`).as(`getRecord${data.singular}`);
				cy.contains(`bbb${timestamp}`).click();
				cy.wait(`@getRecord${data.singular}`).its('response.statusCode').should('equal', 200);
			},
			afterDelete: () => {
				cy.clearCookies();
				cy.login(`bbb${timestamp}`, 'bbb', 401);
				cy.visit('/');
			},
		});
	});

	const errorData = {
		...data,
		fields: {
			text: {
				username: () => (`aaa${(new Date()).getTime()}`),
				email: () => (`aaa${(new Date()).getTime()}@example.com`),
			},
			password: {
				password: 'aaa',
			},
		},
	};

	it('handles index errors', () => {
		cy.handlesIndexErrors(errorData);
	});

	it('handles add errors', () => {
		cy.handlesAddErrors(errorData);
	});

	it('handles view errors', () => {
		cy.handlesViewErrors(errorData);
	});

	it('handles edit errors', () => {
		cy.handlesEditErrors(errorData);
	});
});
