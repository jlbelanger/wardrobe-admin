import { errorMessageText, MyForm } from '@jlbelanger/crudnick';
import { Field, Submit } from '@jlbelanger/formosa';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ChangeUsername({ id, username }) {
	const [row, setRow] = useState({ username });

	return (
		<div className="border">
			<h2>Change username</h2>

			<MyForm
				errorMessageText={errorMessageText}
				id={id}
				method="PUT"
				path="users"
				preventEmptyRequest
				row={row}
				setRow={setRow}
				successToastText="Username changed successfully."
			>
				<div className="formosa-horizontal">
					<Field
						autoComplete="username"
						label="Username"
						name="username"
						required
					/>

					<Submit label="Change username" />
				</div>
			</MyForm>
		</div>
	);
}

ChangeUsername.propTypes = {
	id: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};
