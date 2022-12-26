describe('users', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/');
	});

	it('works', () => {
		const timestamp = (new Date()).getTime();
		const data = {
			apiPath: '**/api/users',
			path: '/users',
			singular: 'user',
			plural: 'Users',
		};

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
			afterAdd: () => {
				cy.clearCookies();
				cy.login(`aaa${timestamp}`, 'aaa');
				cy.visit('/');
				cy.get('#crudnick-menu-button').click();
				cy.contains('Users').click();
				cy.contains(`aaa${timestamp}`).click();
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
				cy.visit('/');
				cy.get('#crudnick-menu-button').click();
				cy.contains('Users').click();
				cy.contains(`bbb${timestamp}`).click();
			},
			afterDelete: () => {
				cy.clearCookies();
				cy.login(`bbb${timestamp}`, 'bbb', 401);
				cy.visit('/');
			},
		});
	});
});
