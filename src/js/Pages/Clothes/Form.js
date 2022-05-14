import { Api, Field } from '@jlbelanger/formosa';
import React, { useEffect, useState } from 'react';

export default function Form() {
	const [categories, setCategories] = useState([]);
	const [colours, setColours] = useState([]);
	const [seasons, setSeasons] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		Api.get('categories?fields[categories]=name')
			.then((response) => {
				setCategories(response);
			})
			.catch((response) => {
				setError(response);
			});
		Api.get('colours?fields[colours]=name')
			.then((response) => {
				setColours(response);
			})
			.catch((response) => {
				setError(response);
			});
		Api.get('seasons?fields[seasons]=name')
			.then((response) => {
				setSeasons(response);
			})
			.catch((response) => {
				setError(response);
			});
		return () => {};
	}, []);

	const labelFn = (option) => (
		<a
			className="crudnick-autocomplete-link"
			href={`${process.env.PUBLIC_URL}/${option.type}/${option.id}`}
			rel="noopener noreferrer"
			target="_blank"
		>
			{option.name}
		</a>
	);

	const valueKey = (option) => ({ id: option.id, type: option.type });

	return (
		<>
			{error ? (<div className="formosa-message formosa-message--error">There was an error loading the data.</div>) : null}
			<div className="formosa-horizontal">
				<Field autoFocus label="Name" maxLength={255} name="name" required />
				<Field
					accept="image/*"
					label="Image"
					imagePrefix={process.env.REACT_APP_FRONTEND_URL}
					imagePreview
					name="filename"
					required
					type="file"
				/>
				<Field
					label="Category"
					labelFn={labelFn}
					max={1}
					name="category"
					options={categories}
					required
					type="autocomplete"
					valueKey={valueKey}
				/>
				<Field
					label="Colour"
					labelFn={labelFn}
					max={1}
					name="colour"
					options={colours}
					required
					type="autocomplete"
					valueKey={valueKey}
				/>
				<Field
					label="Seasons"
					labelFn={labelFn}
					name="seasons"
					options={seasons}
					type="autocomplete"
					valueKey={valueKey}
				/>
				<Field label="Default?" name="is_default" type="checkbox" />
				<Field label="Patterned?" name="is_patterned" type="checkbox" />
			</div>
		</>
	);
}
