import { errorMessageText, MyForm } from '@jlbelanger/crudnick';
import { Field, FormosaContext, Submit } from '@jlbelanger/formosa';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

export default function ChangeEmail({ email }) {
	const { addToast } = useContext(FormosaContext);
	const [row, setRow] = useState({ email });

	const beforeSubmit = () => {
		if (email === row.email) {
			addToast('No changes to save.');
			return false;
		}
		return true;
	};

	return (
		<div className="border">
			<h2>Change email</h2>

			<MyForm
				beforeSubmit={beforeSubmit}
				errorMessageText={errorMessageText}
				method="PUT"
				path="auth/change-email"
				preventEmptyRequest
				row={row}
				setRow={setRow}
				successToastText="Email changed successfully."
			>
				<div className="formosa-horizontal">
					<Field
						autoComplete="current-password"
						id="current-password-email"
						label="Current password"
						name="password"
						note="You must enter your current password to change your email."
						required
						type="password"
					/>

					<Field
						autoComplete="email"
						label="Email"
						name="email"
						required
						type="email"
					/>

					<Submit label="Change email" />
				</div>
			</MyForm>
		</div>
	);
}

ChangeEmail.propTypes = {
	email: PropTypes.string.isRequired,
};
