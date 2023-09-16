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

describe('colours', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/');
	});

	const data = {
		apiPath: '**/api/colours',
		path: '/colours',
		singular: 'colour',
		plural: 'Colours',
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
					name: `Aaa ${timestamp}`,
				},
			},
		});
		handlesEdit({
			...data,
			fields: {
				text: {
					name: `Bbb ${timestamp}`,
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
