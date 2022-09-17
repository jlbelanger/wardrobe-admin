import { IndexTable } from '@jlbelanger/crudnick';
import React from 'react';

export default function Index() {
	const columns = [
		{
			key: 'filename',
			label: 'Image',
			disableSearch: true,
			disableSort: true,
			size: 1,
			fn: (_row, value) => {
				if (!value) {
					return (
						<div className="image-placeholder" />
					);
				}
				return (
					<img
						alt=""
						className="image"
						height={50}
						loading="lazy"
						src={`${process.env.REACT_APP_FRONTEND_URL}${value}`}
					/>
				);
			},
		},
		{
			key: 'name',
			label: 'Name',
			link: true,
			thAttributes: {
				className: 'col--50',
			},
		},
		{
			key: 'relationships.category.name',
			label: 'Category',
			size: 20,
		},
		{
			key: 'relationships.colour.name',
			label: 'Colour',
			size: 20,
		},
		{
			key: 'relationships.seasons',
			label: 'Seasons',
			disableSearch: true,
			disableSort: true,
			thAttributes: {
				className: 'col--50',
			},
			fn: (_row, value) => {
				if (!value) {
					return null;
				}
				return value.map((season) => (season.name)).join(', ');
			},
		},
	];
	let url = 'clothes?';
	url += 'fields[clothes]=name,filename';
	url += '&fields[categories]=name';
	url += '&fields[colours]=name';
	url += '&fields[seasons]=name';
	url += '&include=category,colour,seasons';
	url += '&sort=name';
	return (
		<IndexTable
			columns={columns}
			defaultOptions={{
				sortKey: 'name',
			}}
			path="clothes"
			title="Clothes"
			url={url}
		/>
	);
}
