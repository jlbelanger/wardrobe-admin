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

	const errorData = {
		...data,
		fields: {
			text: {
				name: () => (`Aaa ${(new Date()).getTime()}`),
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
