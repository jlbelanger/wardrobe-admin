import { AddForm } from '@jlbelanger/crudnick';
import Form from './Form.jsx';

export default function Add() {
	const relationshipNames = ['category', 'colour', 'seasons'];

	return (
		<AddForm
			apiPath="clothes"
			component={Form}
			path="clothes"
			relationshipNames={relationshipNames}
			singular="clothes"
		/>
	);
}
