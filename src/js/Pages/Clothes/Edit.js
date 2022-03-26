import { EditForm } from '@jlbelanger/crudnick';
import Form from './Form';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {
	const { id } = useParams();
	const relationshipNames = ['category', 'colour', 'seasons'];

	return (
		<EditForm
			apiPath="clothes"
			component={Form}
			name="name"
			path="clothes"
			relationshipNames={relationshipNames}
			singular="clothes"
			url={`clothes/${id}?include=${relationshipNames.join(',')}&fields[categories]=name&fields[colours]=name&fields[seasons]=name`}
		/>
	);
}
