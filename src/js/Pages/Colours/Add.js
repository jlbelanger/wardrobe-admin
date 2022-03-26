import { AddForm } from '@jlbelanger/crudnick';
import Form from './Form';
import React from 'react';

export default function Add() {
	return (
		<AddForm
			apiPath="colours"
			component={Form}
			path="colours"
			singular="colour"
		/>
	);
}
