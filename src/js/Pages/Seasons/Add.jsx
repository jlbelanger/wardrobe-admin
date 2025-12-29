import { AddForm } from '@jlbelanger/crudnick';
import Form from './Form.jsx';

export default function Add() {
	return (
		<AddForm
			apiPath="seasons"
			component={Form}
			path="seasons"
			singular="season"
		/>
	);
}
