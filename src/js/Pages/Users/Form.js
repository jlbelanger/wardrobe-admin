import { Field } from '@jlbelanger/formosa';
import PropTypes from 'prop-types';
import React from 'react';

export default function Form({ formType }) {
	return (
		<div className="formosa-horizontal">
			<Field
				autoCapitalize="none"
				autoComplete="off"
				autoFocus
				label="Username"
				maxLength={255}
				name="username"
				required
			/>
			<Field
				autoCapitalize="none"
				autoComplete="off"
				label="Email"
				maxLength={255}
				name="email"
				type="email"
				required
			/>
			{formType === 'add' && (
				<Field
					autoComplete="off"
					autoCorrect="off"
					label="Password"
					name="password"
					type="password"
					required
				/>
			)}
		</div>
	);
}

Form.propTypes = {
	formType: PropTypes.string.isRequired,
};
