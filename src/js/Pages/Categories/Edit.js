import { EditForm } from '@jlbelanger/crudnick';
import Form from './Form';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {
	const { id } = useParams();

	return (
		<EditForm
			apiPath="categories"
			component={Form}
			name="name"
			path="categories"
			singular="category"
			url={`categories/${id}`}
		/>
	);
}
