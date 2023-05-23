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

		cy.handlesEverything({
			...data,
			fieldsAdd: {
				text: {
					name: `Aaa ${timestamp}`,
					order_num: '1',
					order_num_footer: '2',
				},
				autopopulate: {
					slug: `aaa-${timestamp}`,
				},
			},
			fieldsEdit: [
				{
					text: {
						name: `Bbb ${timestamp}`,
						order_num: '3',
						order_num_footer: '4',
					},
					autopopulate: {
						slug: `bbb-${timestamp}`,
					},
				},
			],
		});

		timestamp = `${(new Date()).getTime()}2`;
		cy.handlesEverything({
			...data,
			fieldsAdd: {
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
			fieldsEdit: [
				{
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
			],
		});
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
