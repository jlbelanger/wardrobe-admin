import 'cypress-file-upload'; // eslint-disable-line import/no-extraneous-dependencies

const capitalize = (s) => (
	s.replace(/(?:^|\s)\S/g, (a) => (a.toUpperCase()))
);

export const pad = (n, width, z = '0') => {
	n = n.toString();
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

export const randomNumber = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

export const randomDate = () => {
	const year = randomNumber(1900, 2100);
	const month = pad(randomNumber(1, 12), 2);
	const day = pad(randomNumber(1, 28), 2);
	return `${year}-${month}-${day}`;
};

export const fillTextField = (name, value) => {
	cy.get(`[name="${name}"]`).clear();
	if (value) {
		cy.get(`[name="${name}"]`).type(value);
	}
};

export const removeAutocompleteValue = (name, value) => {
	cy.get(`[id="${name}-wrapper"] .crudnick-autocomplete-link`).contains(value).next().click();
};

export const addAutocompleteValue = (id, value) => {
	cy.get(`[id="${id}"]`).clear().type(value);
	cy.get('.formosa-autocomplete__option__button').contains(value).click();
};

export const fillForm = ({ fields }) => {
	if (Object.prototype.hasOwnProperty.call(fields, 'text')) {
		Object.keys(fields.text).forEach((name) => {
			const value = typeof fields.text[name] === 'function' ? fields.text[name]() : fields.text[name];
			fillTextField(name, value);
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'password')) {
		Object.keys(fields.password).forEach((name) => {
			const value = typeof fields.password[name] === 'function' ? fields.password[name]() : fields.password[name];
			fillTextField(name, value);
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'textarea')) {
		Object.keys(fields.textarea).forEach((name) => {
			const value = typeof fields.textarea[name] === 'function' ? fields.textarea[name]() : fields.textarea[name];
			fillTextField(name, value);
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'select')) {
		Object.keys(fields.select).forEach((name) => {
			const value = typeof fields.select[name] === 'function' ? fields.select[name]() : fields.select[name];
			cy.get(`[name="${name}"]`).select(value);
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
			const value = typeof fields.radio[name] === 'function' ? fields.radio[name]() : fields.radio[name];
			cy.get(`[name="${name}"][value="${value}"]`).check();
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'autocompleteRemove')) {
		Object.keys(fields.autocompleteRemove).forEach((name) => {
			fields.autocompleteRemove[name].forEach((value) => {
				removeAutocompleteValue(name, value);
			});
		});
	}

	if (Object.prototype.hasOwnProperty.call(fields, 'autocompleteAdd')) {
		Object.keys(fields.autocompleteAdd).forEach((name) => {
			fields.autocompleteAdd[name].forEach((value) => {
				addAutocompleteValue(name, value);
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
};

export const checkForm = ({ fields }) => {
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
		checkForm({ fields: fields.default });
	}
};

export const closeToast = (message) => {
	cy.contains(message).next('.formosa-toast__close').click();
};

export const logout = () => {
	cy.intercept('DELETE', '**/api/auth/logout').as('logout');
	cy.visit('/');
	cy.get('[data-cy="menu"]').click();
	cy.get('[data-cy="logout"]').click();
	cy.wait('@logout').its('response.statusCode').should('equal', 204);
	cy.location('pathname').should('eq', Cypress.env('public_path'));
};

export const handlesIndex = ({ path, plural }) => {
	cy.get('[data-cy="menu"]').click();
	cy.get(`[href="${Cypress.env('public_path')}${path}"]`).click();
	cy.wait(`@getRecords${plural}`).its('response.statusCode').should('equal', 200);
	cy.get('[data-cy="title"]').should('have.text', plural);
	cy.get('[data-cy="num-results"]').invoke('text').should('match', /^ \([0-9,]+ results?\)/);
};

export const handlesAdd = ({ fields, singular, waitFn }) => {
	if (waitFn) {
		waitFn();
	}
	cy.get('[data-cy="title"]').should('have.text', `Add ${singular}`);
	fillForm({ fields });
	cy.get('[data-cy="save"]').click();
	cy.wait(`@postRecord${singular}`).its('response.statusCode').should('equal', 201);
	closeToast(`${capitalize(singular)} added successfully.`);
};

export const handlesEdit = ({ fields, singular, waitFn }) => {
	cy.wait(`@getRecord${singular}`).its('response.statusCode').should('equal', 200);
	if (waitFn) {
		waitFn();
	}
	cy.get('[data-cy="title"]').should('have.text', `Edit ${singular}`);
	fillForm({ fields });
	cy.get('[data-cy="save"]').click();
	cy.wait('@putRecord').its('response.statusCode').should('equal', 200);
	closeToast(`${capitalize(singular)} saved successfully.`);

	cy.reload();
	cy.wait(`@getRecord${singular}`).its('response.statusCode').should('equal', 200);
	if (waitFn) {
		waitFn();
	}
	checkForm({ fields });
};

export const handlesDelete = ({ plural, singular }) => {
	cy.get('[data-cy="delete"]').click();
	cy.get('[data-cy="modal-delete"]').click();
	cy.wait('@deleteRecord').its('response.statusCode').should('equal', 204);
	closeToast(`${capitalize(singular)} deleted successfully.`);
	cy.wait(`@getRecords${plural}`).its('response.statusCode').should('equal', 200);
};

export const setupInterceptions = ({ apiPath, formWait, plural, singular }) => {
	cy.intercept('GET', `${apiPath}*`).as(`getRecords${plural}`);
	cy.intercept('GET', `${apiPath}/*`).as(`getRecord${singular}`);
	cy.intercept('POST', `${apiPath}*`).as(`postRecord${singular}`);
	cy.intercept('PUT', `${apiPath}/*`).as('putRecord');
	cy.intercept('DELETE', `${apiPath}/*`).as('deleteRecord');

	const waitKeys = Object.keys(formWait || {});
	const numWait = waitKeys.length;
	for (let i = 0; i < numWait; i += 1) {
		cy.intercept('GET', formWait[waitKeys[i]]).as(waitKeys[i]);
	}
};

export const mockServerError = (method, url) => ( // eslint-disable-line import/prefer-default-export
	cy.intercept(
		method,
		url,
		{
			statusCode: 500,
			body: {
				errors: [
					{
						title: 'Unable to connect to the server. Please try again later.',
						status: '500',
					},
				],
			},
		}
	)
);

export const handlesIndexErrors = ({ apiPath, path }) => {
	mockServerError('GET', `${apiPath}*`).as('getRecords');

	cy.visit(path);
	cy.wait('@getRecords').its('response.statusCode').should('equal', 500);
	cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: Unable to connect to the server. Please try again later.');
};

export const handlesAddErrors = ({ apiPath, formWait, fields, path }) => {
	mockServerError('POST', `${apiPath}*`).as('postRecord');

	const waitKeys = Object.keys(formWait || {});
	const numWait = waitKeys.length;
	for (let i = 0; i < numWait; i += 1) {
		cy.intercept('GET', formWait[waitKeys[i]]).as(waitKeys[i]);
	}

	cy.visit(`${path}/add`);
	for (let i = 0; i < numWait; i += 1) {
		cy.wait(`@${waitKeys[i]}`).its('response.statusCode').should('equal', 200);
	}
	fillForm({ fields });
	cy.get('[data-cy="save"]').click();
	cy.wait('@postRecord').its('response.statusCode').should('equal', 500);
	cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: Unable to connect to the server. Please try again later.');
};

export const handlesViewErrors = ({ apiPath, fields, formWait, path, singular }) => {
	// View with not found error.
	cy.visit(`${path}/987654321`);
	cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: This record does not exist.');

	mockServerError('GET', `${apiPath}/*`).as('getRecord');
	cy.intercept('POST', `${apiPath}*`).as('postRecord');

	const waitKeys = Object.keys(formWait || {});
	const numWait = waitKeys.length;
	for (let i = 0; i < numWait; i += 1) {
		cy.intercept('GET', formWait[waitKeys[i]]).as(waitKeys[i]);
	}

	// Add.
	cy.visit(`${path}/add`);
	for (let i = 0; i < numWait; i += 1) {
		cy.wait(`@${waitKeys[i]}`).its('response.statusCode').should('equal', 200);
	}
	fillForm({ fields });
	cy.get('[data-cy="save"]').click();
	cy.wait('@postRecord').its('response.statusCode').should('equal', 201);
	closeToast(`${capitalize(singular)} added successfully.`);

	// View with server error.
	cy.wait('@getRecord').its('response.statusCode').should('equal', 500);
	cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: Unable to connect to the server. Please try again later.');
};

export const handlesEditErrors = ({ apiPath, fields, fieldsEdit, formWait, path, singular }) => {
	cy.intercept('GET', `${apiPath}/*`).as('getRecord');
	cy.intercept('POST', `${apiPath}*`).as('postRecord');
	mockServerError('PUT', `${apiPath}/*`).as('putRecord');
	mockServerError('DELETE', `${apiPath}/*`).as('deleteRecord');

	const waitKeys = Object.keys(formWait || {});
	const numWait = waitKeys.length;
	for (let i = 0; i < numWait; i += 1) {
		cy.intercept('GET', formWait[waitKeys[i]]).as(waitKeys[i]);
	}

	// Add.
	cy.visit(`${path}/add`);
	for (let i = 0; i < numWait; i += 1) {
		cy.wait(`@${waitKeys[i]}`).its('response.statusCode').should('equal', 200);
	}
	fillForm({ fields });
	cy.get('[data-cy="save"]').click();
	cy.wait('@postRecord').its('response.statusCode').should('equal', 201);
	closeToast(`${capitalize(singular)} added successfully.`);

	// View.
	cy.wait('@getRecord').its('response.statusCode').should('equal', 200);
	for (let i = 0; i < numWait; i += 1) {
		cy.wait(`@${waitKeys[i]}`).its('response.statusCode').should('equal', 200);
	}

	// Edit with error.
	fillForm({ fields: fieldsEdit || fields });
	cy.get('[data-cy="save"]').click();
	cy.wait('@putRecord').its('response.statusCode').should('equal', 500);
	cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: Unable to connect to the server. Please try again later.');

	// Delete with error.
	cy.get('[data-cy="delete"]').click();
	cy.get('[data-cy="modal-delete"]').click();
	cy.wait('@deleteRecord').its('response.statusCode').should('equal', 500);
	cy.get('.formosa-alert--error').invoke('text').should('equal', 'Error: Unable to connect to the server. Please try again later.');
};
