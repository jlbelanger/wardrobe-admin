import { Field } from '@jlbelanger/formosa';
import React from 'react';

export default function Form() {
	return (
		<div className="formosa-horizontal">
			<Field autoFocus label="Name" maxLength={255} name="name" required />
			<Field label="Start Date" maxLength={5} placeholder="MM-DD" name="start_date" required size={5} />
			<Field label="End Date" maxLength={5} placeholder="MM-DD" name="end_date" required size={5} />
			<Field label="Order" name="order_num" required size={5} />
		</div>
	);
}
