import { Field } from '@jlbelanger/formosa';

export default function Form() {
	return (
		<div className="formosa-horizontal">
			<Field autoFocus label="Name" maxLength={255} name="name" required />
			<Field label="Start Date" maxLength={5} name="start_date" placeholder="MM-DD" required size={5} />
			<Field label="End Date" maxLength={5} name="end_date" placeholder="MM-DD" required size={5} />
			<Field label="Order" name="order_num" required size={5} />
		</div>
	);
}
