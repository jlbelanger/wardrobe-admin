describe('colours', () => {
	it('works', () => {
		const timestamp = (new Date()).getTime();
		const data = {
			apiPath: '**/api/colours',
			path: '/colours',
			singular: 'colour',
			plural: 'Colours',
		};

		cy.login();
		cy.handlesEverything({
			...data,
			fieldsAdd: {
				text: {
					name: `Aaa ${timestamp}`,
				},
			},
			fieldsEdit: [
				{
					text: {
						name: `Bbb ${timestamp}`,
					},
				},
			],
		});
	});
});
