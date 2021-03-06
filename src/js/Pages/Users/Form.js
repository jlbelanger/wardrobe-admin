import { Field } from '@jlbelanger/formosa';
import PropTypes from 'prop-types';
import React from 'react';

export default function Form({ formType }) {
	return (
		<div className="formosa-horizontal">
			<Field autoComplete="off" autoFocus label="Username" maxLength={255} name="username" required />
			<Field autoComplete="off" label="Email" maxLength={255} name="email" type="email" required />
			<Field autoComplete="off" label="Password" name="password" type="password" required={formType === 'add'} />
		</div>
	);
}

Form.propTypes = {
	formType: PropTypes.string.isRequired,
};
