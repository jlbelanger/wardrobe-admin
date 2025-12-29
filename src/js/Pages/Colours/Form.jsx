import { Field } from '@jlbelanger/formosa';

export default function Form() {
	return (
		<div className="formosa-horizontal">
			<Field autoFocus label="Name" maxLength={255} name="name" required />
		</div>
	);
}
