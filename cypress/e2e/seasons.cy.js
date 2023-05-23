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
