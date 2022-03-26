import { EditForm } from '@jlbelanger/crudnick';
import Form from './Form';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {
	const { id } = useParams();

	return (
		<EditForm
			apiPath="users"
			component={Form}
			name="username"
			path="users"
			singular="user"
			url={`users/${id}`}
		/>
	);
}
