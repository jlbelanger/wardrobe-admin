import 'cypress-file-upload'; // eslint-disable-line import/no-extraneous-dependencies

const capitalize = (s) => (
	s.replace(/(?:^|\s)\S/g, (a) => (a.toUpperCase()))
);

Cypress.Commands.add('handlesEverything', ({
	afterAdd,
	afterDelete,
	afterEdit,
	apiPath,
	path,
	singular,
	plural,
	fieldsAdd,
	fieldsEdit,
}) => {
	cy.handlesIndex({ apiPath, path, plural });
	cy.handlesAdd({
		after: afterAdd,
		apiPath,
		singular,
		fields: fieldsAdd,
	});
	fieldsEdit.forEach((fields) => {
		cy.handlesEdit({ after: afterEdit, apiPath, fields, singular });
	});
	cy.handlesDelete({ apiPath, plural, singular });
	if (afterDelete) {
		afterDelete();
	}
});

Cypress.Commands.add('handlesIndex', ({ apiPath, path, plural }) => {
	cy.intercept('GET', `${apiPath}*`).as(`getRecords${plural}`);

	cy.get('#crudnick-menu-button').click();
	cy.get(`[href="${Cypress.env('public_path')}${path}"]`).click();
	cy.wait(`@getRecords${plural}`).its('response.statusCode').should('equal', 200);
	cy.get('h1 span').should('have.text', plural);
	cy.get('h1 small').invoke('text').should('match', /^ \([0-9,]+ results?\)/);
});

Cypress.Commands.add('handlesAdd', ({
	after,
	apiPath,
	fields,
	singular,
}) => {
	cy.intercept('GET', `${apiPath}/*`).as(`getRecord${singular}`);
	cy.intercept('POST', `${apiPath}*`).as(`postRecord${singular}`);

	cy.contains('Add').click();
	cy.get('h1').should('have.text', `Add ${singular}`);
	cy.get('[type="submit"]').click();
	cy.fillForm({ fields });
	cy.contains('Save').click();
	cy.wait(`@postRecord${singular}`).its('response.statusCode').should('equal', 201);
	cy.contains(`${capitalize(singular)} added successfully.`).next().click();
	cy.get('h1').should('have.text', `Edit ${singular}`);
	cy.wait(`@getRecord${singular}`).its('response.statusCode').should('equal', 200);
	cy.checkForm({ fields });
	if (after) {
		after();
	}
});

Cypress.Commands.add('handlesEdit', ({ after, apiPath, fields, singular }) => {
	cy.intercept('PUT', `${apiPath}/*`).as('putRecord');

	cy.wait(`@getRecord${singular}`).its('response.statusCode').should('equal', 200);
	cy.fillForm({ fields });
	cy.contains('Save').click();
	cy.wait('@putRecord').its('response.statusCode').should('equal', 200);
	cy.contains(`${capitalize(singular)} saved successfully.`).next().click();
	cy.reload();
	cy.checkForm({ fields });
	if (after) {
		after();
	}
});

Cypress.Commands.add('handlesDelete', ({ apiPath, plural, singular }) => {
	cy.intercept('DELETE', `${apiPath}/*`).as('deleteRecord');
	cy.intercept('GET', `${apiPath}*`).as(`getRecords${plural}`);

	cy.contains('Delete').click();
	cy.wait('@deleteRecord').its('response.statusCode').should('equal', 204);
	cy.contains(`${capitalize(singular)} deleted successfully.`).next().click();
	cy.wait(`@getRecords${plural}`).its('response.statusCode').should('equal', 200);
});

Cypress.Commands.add('fillTextField', (name, value) => {
	cy.get(`[name="${name}"]`).clear();
	if (value) {
		cy.get(`[name="${name}"]`).type(value);
	}
});

Cypress.Commands.add('removeAutocompleteValue', (name, value) => {
	cy.get(`[id="${name}-wrapper"] .crudnick-autocomplete-link`).contains(value).next().click();
});

Cypress.Commands.add('addAutocompleteValue', (name, value) => {
	cy.get(`[id="${name}"]`).clear().type(value);
	cy.get('.formosa-autocomplete__option__button').contains(value).click();
});

Cypress.Commands.add('fillForm', ({ fields }) => {
	if (Object.prototype.hasOwnProperty.call(fields, 'text')) {
		Object.keys(fields.text).forEach((name) => {
			cy.fillTextField(name, fields.text[name]);
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'password')) {
		Object.keys(fields.password).forEach((name) => {
			cy.fillTextField(name, fields.password[name]);
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'textarea')) {
		Object.keys(fields.textarea).forEach((name) => {
			cy.fillTextField(name, fields.textarea[name]);
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'select')) {
		Object.keys(fields.select).forEach((name) => {
			cy.get(`[name="${name}"]`).select(fields.select[name]);
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'check')) {
		Object.keys(fields.check).forEach((name) => {
			cy.get(`[name="${name}"]`).check();
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'uncheck')) {
		Object.keys(fields.uncheck).forEach((name) => {
			cy.get(`[name="${name}"]`).uncheck();
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'radio')) {
		Object.keys(fields.radio).forEach((name) => {
			cy.get(`[name="${name}"][value="${fields.radio[name]}"]`).check();
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'autocompleteRemove')) {
		Object.keys(fields.autocompleteRemove).forEach((name) => {
			fields.autocompleteRemove[name].forEach((value) => {
				cy.removeAutocompleteValue(name, value);
			});
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'autocompleteAdd')) {
		Object.keys(fields.autocompleteAdd).forEach((name) => {
			fields.autocompleteAdd[name].forEach((value) => {
				cy.addAutocompleteValue(name, value);
			});
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'fileRemove')) {
		Object.keys(fields.fileRemove).forEach((name) => {
			cy.get(`[id="${name}-remove"]`).click();
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'fileAdd')) {
		Object.keys(fields.fileAdd).forEach((name) => {
			cy.get(`[id="${name}"]`).attachFile(fields.fileAdd[name].source);
		});
	}
});

Cypress.Commands.add('checkForm', ({ fields }) => {
	if (Object.prototype.hasOwnProperty.call(fields, 'text')) {
		Object.keys(fields.text).forEach((name) => {
			cy.get(`[name="${name}"][value="${fields.text[name].replace(/"/g, '\\"')}"]`).should('exist');
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'password')) {
		Object.keys(fields.password).forEach((name) => {
			cy.get(`[name="${name}"][value=""]`).should('exist');
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'textarea')) {
		Object.keys(fields.textarea).forEach((name) => {
			cy.get(`[name="${name}"]`).invoke('val').should('equal', fields.textarea[name]);
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'select')) {
		Object.keys(fields.select).forEach((name) => {
			cy.get(`[name="${name}"] option:selected`).should('have.text', fields.select[name]);
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'check')) {
		Object.keys(fields.check).forEach((name) => {
			cy.get(`[name="${name}"]:checked`).should('exist');
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'uncheck')) {
		Object.keys(fields.uncheck).forEach((name) => {
			cy.get(`[name="${name}"]:not(:checked)`).should('exist');
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'radio')) {
		Object.keys(fields.radio).forEach((name) => {
			cy.get(`[name="${name}"][value="${fields.radio[name]}"]:checked`).should('exist');
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'autocompleteAdd')) {
		Object.keys(fields.autocompleteAdd).forEach((name) => {
			fields.autocompleteAdd[name].forEach((value) => {
				cy.get(`[id="${name}-wrapper"] .crudnick-autocomplete-link`).contains(value);
			});
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'autocompleteKeep')) {
		Object.keys(fields.autocompleteKeep).forEach((name) => {
			fields.autocompleteKeep[name].forEach((value) => {
				cy.get(`[id="${name}-wrapper"] .crudnick-autocomplete-link`).contains(value);
			});
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'autocompleteRemove')) {
		Object.keys(fields.autocompleteRemove).forEach((name) => {
			fields.autocompleteRemove[name].forEach((value) => {
				cy.get(`[id="${name}-wrapper"]`).should('have.attr', 'data-value').and('not.contain', value);
			});
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'autocompleteEmpty')) {
		Object.keys(fields.autocompleteEmpty).forEach((name) => {
			cy.get(`[id="${name}-wrapper"]`).should('have.attr', 'data-value', 'null');
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'fileRemove')) {
		Object.keys(fields.fileRemove).forEach((name) => {
			cy.get(`[id="${name}-name"]`).should('not.contain', fields.fileRemove[name]);
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'fileAdd')) {
		Object.keys(fields.fileAdd).forEach((name) => {
			if (typeof fields.fileAdd[name].dest === 'object') {
				cy.get(`[id="${name}-name"]`).invoke('text').should('match', fields.fileAdd[name].dest);
			} else {
				cy.get(`[id="${name}-name"]`).invoke('text').should('contain', fields.fileAdd[name].dest);
			}
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'autopopulate')) {
		Object.keys(fields.autopopulate).forEach((name) => {
			cy.get(`[name="${name}"][value="${fields.autopopulate[name].replace(/"/g, '\\"')}"]`).should('exist');
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'default')) {
		cy.checkForm({ fields: fields.default });
	}
});
