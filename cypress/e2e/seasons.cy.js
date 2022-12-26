describe('seasons', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/');
	});

	it('works', () => {
		const timestamp = (new Date()).getTime();
		const data = {
			apiPath: '**/api/seasons',
			path: '/seasons',
			singular: 'season',
			plural: 'Seasons',
		};

		cy.handlesEverything({
			...data,
			fieldsAdd: {
				text: {
					name: `Aaa ${timestamp}`,
					start_date: '01-01',
					end_date: '02-02',
					order_num: '1',
				},
			},
			fieldsEdit: [
				{
					text: {
						name: `Bbb ${timestamp}`,
						start_date: '03-03',
						end_date: '04-04',
						order_num: '2',
					},
				},
			],
		});
	});
});
