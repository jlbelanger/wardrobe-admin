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

describe('seasons', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/');
	});

	const data = {
		apiPath: '**/api/seasons',
		path: '/seasons',
		singular: 'season',
		plural: 'Seasons',
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
					start_date: '01-01',
					end_date: '02-02',
					order_num: '1',
				},
			},
		});
		handlesEdit({
			...data,
			fields: {
				text: {
					name: `Bbb ${timestamp}`,
					start_date: '03-03',
					end_date: '04-04',
					order_num: '2',
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
				start_date: '01-01',
				end_date: '02-02',
				order_num: '1',
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
