import { errorMessageText, MyForm } from '@jlbelanger/crudnick';
import { Field, Submit } from '@jlbelanger/formosa';
import React, { useState } from 'react';

export default function ChangePassword() {
	const [row, setRow] = useState({});

	return (
		<div className="border">
			<h2>Change password</h2>

			<MyForm
				errorMessageText={errorMessageText}
				clearOnSubmit
				method="PUT"
				path="auth/change-password"
				preventEmptyRequest
				row={row}
				setRow={setRow}
				successToastText="Password changed successfully."
			>
				<div className="formosa-horizontal">
					<Field
						autoComplete="current-password"
						id="current-password-password"
						label="Current password"
						name="password"
						note="You must enter your current password to change your password."
						required
						type="password"
					/>

					<Field
						autoComplete="new-password"
						label="New password"
						name="new_password"
						required
						type="password"
					/>

					<Field
						autoComplete="new-password"
						label="Confirm new password"
						name="new_password_confirmation"
						required
						type="password"
					/>

					<Submit label="Change password" />
				</div>
			</MyForm>
		</div>
	);
}
