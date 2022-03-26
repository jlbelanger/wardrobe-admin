import { EditForm } from '@jlbelanger/crudnick';
import Form from './Form';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {
	const { id } = useParams();

	return (
		<EditForm
			apiPath="colours"
			component={Form}
			name="name"
			path="colours"
			singular="colour"
			url={`colours/${id}`}
		/>
	);
}
