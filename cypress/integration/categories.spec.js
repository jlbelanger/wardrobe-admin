describe('categories', () => {
	it('works', () => {
		let timestamp = (new Date()).getTime();
		const data = {
			apiPath: '**/api/categories',
			path: '/categories',
			singular: 'category',
			plural: 'Categories',
		};

		cy.login();
		cy.handlesEverything({
			...data,
			fieldsAdd: {
				text: {
					name: `Aaa ${timestamp}`,
					order_num: '1',
					order_num_footer: '2',
				},
			},
			fieldsEdit: [
				{
					text: {
						name: `Bbb ${timestamp}`,
						order_num: '3',
						order_num_footer: '4',
					},
				},
			],
		});

		timestamp = (new Date()).getTime();
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
				},
			],
		});
	});
});
