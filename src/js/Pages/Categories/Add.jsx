import { AddForm } from '@jlbelanger/crudnick';
import Form from './Form.jsx';

export default function Add() {
	return (
		<AddForm
			apiPath="categories"
			component={Form}
			path="categories"
			singular="category"
		/>
	);
}
