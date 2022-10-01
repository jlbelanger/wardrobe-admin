describe('clothes', () => {
	it('works', () => {
		let timestamp = (new Date()).getTime();
		const data = {
			apiPath: '**/api/clothes',
			path: '/clothes',
			singular: 'clothes',
			plural: 'Clothes',
		};

		cy.login();
		cy.handlesEverything({
			...data,
			fieldsAdd: {
				text: {
					name: `Aaa ${timestamp}`,
				},
				autocompleteAdd: {
					category: ['Skirts'],
					colour: ['Yellow'],
				},
				fileAdd: {
					filename: {
						source: '500x500.png',
						dest: new RegExp(`/uploads/clothes/[^/]+/aaa${timestamp}.png`),
					},
				},
			},
			fieldsEdit: [
				{
					text: {
						name: `Bbb ${timestamp}`,
					},
					autocompleteRemove: {
						category: ['Skirts'],
						colour: ['Yellow'],
					},
					autocompleteAdd: {
						category: ['Dresses'],
						colour: ['Red'],
					},
					fileRemove: {
						filename: true,
					},
					fileAdd: {
						filename: {
							source: '400x400.png',
							dest: new RegExp(`/uploads/clothes/[^/]+/bbb${timestamp}.png`),
						},
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
				},
				autocompleteAdd: {
					category: ['Skirts'],
					colour: ['Yellow'],
					seasons: ['Fall Fashions'],
				},
				check: {
					is_default: true,
					is_patterned: true,
				},
				fileAdd: {
					filename: {
						source: '500x500.png',
						dest: new RegExp(`/uploads/clothes/[^/]+/aaa${timestamp}\.png`),
					},
				},
			},
			fieldsEdit: [
				{
					text: {
						name: `Bbb ${timestamp}`,
					},
					autocompleteRemove: {
						category: ['Skirts'],
						colour: ['Yellow'],
						seasons: ['Fall Fashions'],
					},
					autocompleteAdd: {
						category: ['Dresses'],
						colour: ['Red'],
						seasons: ['Winter Wear'],
					},
					uncheck: {
						is_default: true,
						is_patterned: true,
					},
					fileRemove: {
						filename: true,
					},
					fileAdd: {
						filename: {
							source: '400x400.png',
							dest: new RegExp(`/uploads/clothes/[^/]+/bbb${timestamp}.png`),
						},
					},
				},
			],
		});
	});
});
