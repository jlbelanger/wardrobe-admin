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

describe('categories', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/');
	});

	const data = {
		apiPath: '**/api/categories',
		path: '/categories',
		singular: 'category',
		plural: 'Categories',
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
					order_num: '1',
					order_num_footer: '2',
				},
				autopopulate: {
					slug: `aaa-${timestamp}`,
				},
			},
		});
		handlesEdit({
			...data,
			fields: {
				text: {
					name: `Bbb ${timestamp}`,
					order_num: '3',
					order_num_footer: '4',
				},
				autopopulate: {
					slug: `bbb-${timestamp}`,
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
					order_num: '1',
					order_num_footer: '2',
				},
				check: {
					is_default: true,
				},
				autopopulate: {
					slug: `aaa-${timestamp}`,
				},
			},
		});
		handlesEdit({
			...data,
			fields: {
				text: {
					name: `Bbb ${timestamp}`,
					order_num: '3',
					order_num_footer: '4',
				},
				uncheck: {
					is_default: true,
				},
				autopopulate: {
					slug: `bbb-${timestamp}`,
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
				order_num: '1',
				order_num_footer: '2',
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
