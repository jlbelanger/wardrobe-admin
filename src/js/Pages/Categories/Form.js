import { Field } from '@jlbelanger/formosa';
import React from 'react';

export default function Form() {
	return (
		<div className="formosa-horizontal">
			<Field autoFocus label="Name" maxLength={255} name="name" required />
			<Field label="Order" name="order_num" required size={5} />
			<Field label="Order Footer" name="order_num_footer" required size={5} />
			<Field label="Default?" name="is_default" type="checkbox" />
		</div>
	);
}
