import {
	handlesAdd,
	handlesAddErrors,
	handlesDelete,
	handlesEdit,
	handlesEditErrors,
	handlesIndex,
	handlesIndexErrors,
	handlesViewErrors,
	logout,
	setupInterceptions,
} from '../support/commands';

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

		setupInterceptions(data);
		handlesIndex(data);
		cy.get('[data-cy="add"]').click();

		handlesAdd({
			...data,
			fields: {
				text: {
					username: `aaa${timestamp}`,
					email: `aaa${timestamp}@example.com`,
				},
				password: {
					password: 'aaaaaaaa',
				},
			},
		});
		handlesEdit({
			...data,
			fields: {
				text: {
					username: `bbb${timestamp}`,
					email: `bbb${timestamp}@example.com`,
				},
			},
		});

		cy.clearCookies();
		cy.login(`aaa${timestamp}`, 'aaaaaaaa', 401);
		cy.login(`bbb${timestamp}`, 'aaaaaaaa');
		logout();
		cy.login();
		cy.visit('/');
		cy.get('[data-cy="menu"]').click();
		cy.contains('Users').click();
		cy.intercept('GET', `${data.apiPath}/*`).as(`getRecord${data.singular}`);
		cy.contains(`bbb${timestamp}`).click();
		cy.wait(`@getRecord${data.singular}`).its('response.statusCode').should('equal', 200);

		handlesDelete(data);

		cy.clearCookies();
		cy.login(`bbb${timestamp}`, 'aaaaaaaa', 401);
		cy.visit('/');
	});

	const errorData = {
		...data,
		fields: {
			text: {
				username: () => (`aaa${(new Date()).getTime()}`),
				email: () => (`aaa${(new Date()).getTime()}@example.com`),
			},
			password: {
				password: 'aaaaaaaa',
			},
		},
		fieldsEdit: {
			text: {
				username: () => (`bbb${(new Date()).getTime()}`),
			},
		},
	};

	it('handles index errors', () => {
		handlesIndexErrors(errorData);
	});

	it('handles add errors', () => {
		handlesAddErrors(errorData);
	});

	it('handles view errors', () => {
		handlesViewErrors(errorData);
	});

	it('handles edit errors', () => {
		handlesEditErrors(errorData);
	});
});
