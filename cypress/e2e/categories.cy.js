describe('categories', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/');
	});

	it('works', () => {
		let timestamp = `${(new Date()).getTime()}1`;
		const data = {
			apiPath: '**/api/categories',
			path: '/categories',
			singular: 'category',
			plural: 'Categories',
		};

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
});
