import { Field } from '@jlbelanger/formosa';
import React from 'react';

export default function Form() {
	return (
		<div className="formosa-horizontal">
			<Field autoFocus label="Name" maxLength={255} name="name" required />
		</div>
	);
}
