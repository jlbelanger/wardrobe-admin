import { Field } from '@jlbelanger/formosa';
import React from 'react';

export default function Form() {
	const toSlug = (value) => {
		if (!value) {
			return '';
		}
		return value.toLowerCase()
			.replace(/['.]/g, '')
			.replace(/[^a-z0-9-]+/g, '-')
			.replace(/^-+/, '')
			.replace(/-+$/, '')
			.replace(/--+/g, '-');
	};

	const autopopulate = (e, row) => {
		if (!row.name) {
			return {};
		}
		return {
			slug: toSlug(row.name),
		};
	};

	return (
		<div className="formosa-horizontal">
			<Field afterChange={autopopulate} autoFocus label="Name" maxLength={255} name="name" required />
			<Field label="Slug" maxLength={255} name="slug" required />
			<Field label="Order" name="order_num" required size={5} />
			<Field label="Order Footer" name="order_num_footer" required size={5} />
			<Field label="Default?" name="is_default" type="checkbox" />
		</div>
	);
}
