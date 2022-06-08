import { IndexTable } from '@jlbelanger/crudnick';
import React from 'react';

export default function Index() {
	return (
		<IndexTable
			columns={[
				{
					key: 'name',
					label: 'Name',
					link: true,
				},
				{
					key: 'order_num',
					label: '#',
					size: 5,
				},
				{
					key: 'is_default',
					label: 'Default?',
					type: 'checkbox',
				},
			]}
			defaultOptions={{
				sortKey: 'order_num',
			}}
			path="categories"
			title="Categories"
			url="categories?sort=order_num&fields[categories]=name,order_num,is_default"
		/>
	);
}
