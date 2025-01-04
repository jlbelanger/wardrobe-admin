import { Auth } from '@jlbelanger/crudnick';
import { Field } from '@jlbelanger/formosa';
import PropTypes from 'prop-types';
import React from 'react';

export default function Form({ formType, row = null }) {
	const isCurrentUser = formType === 'edit' && row.id === Auth.id().toString();
	const isEditable = formType === 'add' || isCurrentUser;

	if (isCurrentUser) {
		return null;
	}

	return (
		<div className="formosa-horizontal">
			<Field
				autoCapitalize="none"
				autoComplete="off"
				autoFocus
				disabled={!isEditable}
				label="Username"
				maxLength={255}
				name="username"
				required
			/>
			<Field
				autoCapitalize="none"
				autoComplete="off"
				disabled={!isEditable}
				label="Email"
				maxLength={255}
				name="email"
				type="email"
				required
			/>
			{formType === 'add' && (
				<Field
					autoComplete="off"
					label="Password"
					name="password"
					required
					type="password"
				/>
			)}
		</div>
	);
}

Form.propTypes = {
	formType: PropTypes.string.isRequired,
	row: PropTypes.object,
};
