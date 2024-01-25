import { Field } from '@jlbelanger/formosa';
import React from 'react';

export default function Form() {
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
				afterAdd={() => {
					let elem = document.querySelector('[id="colour"]');
					if (elem) {
						elem.focus();
					} else {
						elem = document.querySelector('[id="seasons"]');
						if (elem) {
							elem.focus();
						} else {
							document.querySelector('[id="is_default"]').focus();
						}
					}
				}}
				label="Category"
				labelFn={labelFn}
				max={1}
				name="category"
				required
				type="autocomplete"
				url="categories?fields[categories]=name"
				valueKey={valueKey}
			/>
			<Field
				afterAdd={() => {
					const elem = document.querySelector('[id="seasons"]');
					if (elem) {
						elem.focus();
					} else {
						document.querySelector('[id="is_default"]').focus();
					}
				}}
				label="Colour"
				labelFn={labelFn}
				max={1}
				name="colour"
				required
				type="autocomplete"
				url="colours?fields[colours]=name"
				valueKey={valueKey}
			/>
			<Field
				afterAdd={() => {
					document.querySelector('[id="is_default"]').focus();
				}}
				label="Seasons"
				labelFn={labelFn}
				name="seasons"
				type="autocomplete"
				url="seasons?fields[seasons]=name"
				valueKey={valueKey}
			/>
			<Field label="Default?" name="is_default" type="checkbox" />
			<Field label="Patterned?" name="is_patterned" type="checkbox" />
		</div>
	);
}
