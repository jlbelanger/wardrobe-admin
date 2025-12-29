import { AddForm } from '@jlbelanger/crudnick';
import Form from './Form.jsx';

export default function Add() {
	return (
		<AddForm
			apiPath="users"
			component={Form}
			path="users"
			singular="user"
		/>
	);
}
