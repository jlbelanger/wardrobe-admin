import {
	closeToast,
	handlesAdd,
	handlesAddErrors,
	handlesDelete,
	handlesIndex,
	handlesIndexErrors,
	handlesViewErrors,
	logout,
	mockServerError,
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

		// Cannot be edited.
		cy.get('#username').should('be.disabled');
		cy.get('#email').should('be.disabled');

		// Can login.
		cy.clearCookies();
		cy.login(`aaa${timestamp}`, 'aaaaaaaa');
		logout();

		// Can delete.
		cy.login();
		cy.visit('/');
		cy.get('[data-cy="menu"]').click();
		cy.contains('Users').click();
		cy.intercept('GET', `${data.apiPath}/*`).as(`getRecord${data.singular}`);
		cy.contains(`aaa${timestamp}`).click();
		cy.wait(`@getRecord${data.singular}`).its('response.statusCode').should('equal', 200);
		handlesDelete(data);

		// Cannot login.
		cy.clearCookies();
		cy.login(`aaa${timestamp}`, 'aaaaaaaa', 401);
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

	describe('when editing current user', () => {
		describe('when changing username', () => {
			describe('with valid input', () => {
				it('works', () => {
					cy.intercept('GET', '**/api/users/*').as('getUser');
					cy.intercept('PUT', '**/api/users/*').as('putUser');

					// Change.
					const name = `${Cypress.env('default_username')}2`;
					cy.visit(`/users/${Cypress.env('user_id')}`);
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get('[name="username"]').clear().type(name);
					cy.get('button').contains('Change username').click();
					cy.wait('@putUser').its('response.statusCode').should('equal', 200);
					closeToast('Username changed successfully.');
					cy.reload();
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get(`[name="username"][value="${name}"]`).should('exist');

					// Change back.
					cy.get('[name="username"]').clear().type(Cypress.env('default_username'));
					cy.get('button').contains('Change username').click();
					cy.wait('@putUser').its('response.statusCode').should('equal', 200);
					closeToast('Username changed successfully.');
					cy.reload();
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get(`[name="username"][value="${Cypress.env('default_username')}"]`).should('exist');
				});
			});

			describe('with server error', () => {
				it('shows an error', () => {
					cy.intercept('GET', '**/api/users/*').as('getUser');
					mockServerError('PUT', '**/api/users/*').as('putUser');

					const name = `${Cypress.env('default_username')}2`;
					cy.visit(`/users/${Cypress.env('user_id')}`);
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get('[name="username"]').clear().type(name);
					cy.get('button').contains('Change username').click();
					cy.wait('@putUser').its('response.statusCode').should('equal', 500);
					cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: Unable to connect to the server. Please try again later.');
				});
			});
		});

		describe('when changing email', () => {
			describe('with invalid current password', () => {
				it('shows an error', () => {
					cy.intercept('GET', '**/api/users/*').as('getUser');
					cy.intercept('PUT', '**/api/auth/change-email').as('changeEmail');

					cy.visit(`/users/${Cypress.env('user_id')}`);
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get('#current-password-email').clear().type('wrongpassword');
					cy.get('[name="email"]').clear().type(`${Cypress.env('default_email')}2`);
					cy.get('button').contains('Change email').click();
					cy.wait('@changeEmail').its('response.statusCode').should('equal', 422);
					cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: The current password is incorrect.');
					cy.get('#current-password-email-error').invoke('text').should('equal', 'The current password is incorrect.');
					cy.reload();
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get(`[name="email"][value="${Cypress.env('default_email')}"]`).should('exist');
				});
			});

			describe('with valid input', () => {
				it('works', () => {
					cy.intercept('GET', '**/api/users/*').as('getUser');
					cy.intercept('PUT', '**/api/auth/change-email').as('changeEmail');

					// Change.
					const email = `${Cypress.env('default_email')}2`;
					cy.visit(`/users/${Cypress.env('user_id')}`);
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get('#current-password-email').clear().type(Cypress.env('default_password'));
					cy.get('[name="email"]').clear().type(email);
					cy.get('button').contains('Change email').click();
					cy.wait('@changeEmail').its('response.statusCode').should('equal', 204);
					closeToast('Email changed successfully.');
					cy.reload();
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get(`[name="email"][value="${email}"]`).should('exist');

					// Change back.
					cy.get('#current-password-email').clear().type(Cypress.env('default_password'));
					cy.get('[name="email"]').clear().type(Cypress.env('default_email'));
					cy.get('button').contains('Change email').click();
					cy.wait('@changeEmail').its('response.statusCode').should('equal', 204);
					closeToast('Email changed successfully.');
					cy.reload();
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get(`[name="email"][value="${Cypress.env('default_email')}"]`).should('exist');
				});
			});

			describe('with server error', () => {
				it('shows an error', () => {
					cy.intercept('GET', '**/api/users/*').as('getUser');
					mockServerError('PUT', '**/api/auth/change-email').as('changeEmail');

					const email = `${Cypress.env('default_email')}2`;
					cy.visit(`/users/${Cypress.env('user_id')}`);
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get('#current-password-email').clear().type(Cypress.env('default_password'));
					cy.get('[name="email"]').clear().type(email);
					cy.get('button').contains('Change email').click();
					cy.wait('@changeEmail').its('response.statusCode').should('equal', 500);
					cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: Unable to connect to the server. Please try again later.');
				});
			});
		});

		describe('when changing password', () => {
			describe('with non-matching passwords', () => {
				it('shows an error', () => {
					cy.intercept('GET', '**/api/users/*').as('getUser');
					cy.intercept('PUT', '**/api/auth/change-password').as('changePassword');

					cy.visit(`/users/${Cypress.env('user_id')}`);
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get('#current-password-password').clear().type(Cypress.env('default_password'));
					cy.get('#new_password').clear().type(`${Cypress.env('default_password')}2`);
					cy.get('#new_password_confirmation').clear().type('somethingelse');
					cy.get('button').contains('Change password').click();
					cy.wait('@changePassword').its('response.statusCode').should('equal', 422);
					cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: The new password confirmation does not match.');
					cy.get('#new_password-error').invoke('text').should('equal', 'The new password confirmation does not match.');
				});
			});

			describe('with invalid current password', () => {
				it('shows an error', () => {
					cy.intercept('GET', '**/api/users/*').as('getUser');
					cy.intercept('PUT', '**/api/auth/change-password').as('changePassword');

					const password = `${Cypress.env('default_password')}2`;
					cy.visit(`/users/${Cypress.env('user_id')}`);
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get('#current-password-password').clear().type('wrongpassword');
					cy.get('#new_password').clear().type(password);
					cy.get('#new_password_confirmation').clear().type(password);
					cy.get('button').contains('Change password').click();
					cy.wait('@changePassword').its('response.statusCode').should('equal', 422);
					cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: The current password is incorrect.');
					cy.get('#current-password-password-error').invoke('text').should('equal', 'The current password is incorrect.');
				});
			});

			describe('with valid input', () => {
				it('works', () => {
					cy.intercept('GET', '**/api/users/*').as('getUser');
					cy.intercept('PUT', '**/api/auth/change-password').as('changePassword');

					// Change.
					const password = `${Cypress.env('default_password')}2`;
					cy.visit(`/users/${Cypress.env('user_id')}`);
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get('#current-password-password').clear().type(Cypress.env('default_password'));
					cy.get('#new_password').clear().type(password);
					cy.get('#new_password_confirmation').clear().type(password);
					cy.get('button').contains('Change password').click();
					cy.wait('@changePassword').its('response.statusCode').should('equal', 204);
					closeToast('Password changed successfully.');

					// Change back.
					cy.reload();
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get('#current-password-password').clear().type(password);
					cy.get('#new_password').clear().type(Cypress.env('default_password'));
					cy.get('#new_password_confirmation').clear().type(Cypress.env('default_password'));
					cy.get('button').contains('Change password').click();
					cy.wait('@changePassword').its('response.statusCode').should('equal', 204);
					closeToast('Password changed successfully.');
				});
			});

			describe('with server error', () => {
				it('shows an error', () => {
					cy.intercept('GET', '**/api/users/*').as('getUser');
					mockServerError('PUT', '**/api/auth/change-password').as('changePassword');

					const password = `${Cypress.env('default_password')}2`;
					cy.visit(`/users/${Cypress.env('user_id')}`);
					cy.wait('@getUser').its('response.statusCode').should('equal', 200);
					cy.get('#current-password-password').clear().type(Cypress.env('default_password'));
					cy.get('#new_password').clear().type(password);
					cy.get('#new_password_confirmation').clear().type(password);
					cy.get('button').contains('Change password').click();
					cy.wait('@changePassword').its('response.statusCode').should('equal', 500);
					cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: Unable to connect to the server. Please try again later.');
				});
			});
		});
	});
});
