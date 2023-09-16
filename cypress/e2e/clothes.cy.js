import {
	handlesAdd,
	handlesAddErrors,
	handlesDelete,
	handlesEdit,
	handlesEditErrors,
	handlesIndex,
	handlesIndexErrors,
	handlesViewErrors,
	setupInterceptions,
} from '../support/commands';

describe('clothes', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/');
	});

	const data = {
		apiPath: '**/api/clothes',
		path: '/clothes',
		singular: 'clothes',
		plural: 'Clothes',
		formWait: {
			getCategories: '**/api/categories?*',
		},
		waitFn: () => {
			cy.wait('@getCategories').its('response.statusCode').should('equal', 200);
		},
	};

	it('works', () => {
		let timestamp = `${(new Date()).getTime()}1`;

		setupInterceptions(data);
		handlesIndex(data);
		cy.get('[data-cy="add"]').click();

		handlesAdd({
			...data,
			fields: {
				text: {
					name: `Aaa ${timestamp}`,
				},
				autocompleteAdd: {
					category: ['Skirts'],
					colour: ['Yellow'],
				},
				fileAdd: {
					filename: {
						source: '500x500.png',
						dest: new RegExp(`/uploads/clothes/[^/]+/aaa${timestamp}.png`),
					},
				},
			},
		});
		handlesEdit({
			...data,
			fields: {
				text: {
					name: `Bbb ${timestamp}`,
				},
				autocompleteRemove: {
					category: ['Skirts'],
					colour: ['Yellow'],
				},
				autocompleteAdd: {
					category: ['Dresses'],
					colour: ['Red'],
				},
				fileRemove: {
					filename: true,
				},
				fileAdd: {
					filename: {
						source: '400x400.png',
						dest: new RegExp(`/uploads/clothes/[^/]+/bbb${timestamp}.png`),
					},
				},
			},
		});
		handlesDelete(data);

		timestamp = `${(new Date()).getTime()}2`;
		cy.get('[data-cy="add"]').click();
		handlesAdd({
			...data,
			fields: {
				text: {
					name: `Aaa ${timestamp}`,
				},
				autocompleteAdd: {
					category: ['Skirts'],
					colour: ['Yellow'],
					seasons: ['Fall Fashions'],
				},
				check: {
					is_default: true,
					is_patterned: true,
				},
				fileAdd: {
					filename: {
						source: '500x500.png',
						dest: new RegExp(`/uploads/clothes/[^/]+/aaa${timestamp}.png`),
					},
				},
			},
		});
		handlesEdit({
			...data,
			fields: {
				text: {
					name: `Bbb ${timestamp}`,
				},
				autocompleteRemove: {
					category: ['Skirts'],
					colour: ['Yellow'],
					seasons: ['Fall Fashions'],
				},
				autocompleteAdd: {
					category: ['Dresses'],
					colour: ['Red'],
					seasons: ['Winter Wear'],
				},
				uncheck: {
					is_default: true,
					is_patterned: true,
				},
				fileRemove: {
					filename: true,
				},
				fileAdd: {
					filename: {
						source: '400x400.png',
						dest: new RegExp(`/uploads/clothes/[^/]+/bbb${timestamp}.png`),
					},
				},
			},
		});
		handlesDelete(data);
	});

	const errorData = {
		...data,
		fields: {
			text: {
				name: () => (`Aaa ${(new Date()).getTime()}`),
			},
			autocompleteAdd: {
				category: ['Skirts'],
				colour: ['Yellow'],
			},
			fileAdd: {
				filename: {
					source: '500x500.png',
				},
			},
		},
		fieldsEdit: {
			text: {
				name: () => (`Bbb ${(new Date()).getTime()}`),
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
