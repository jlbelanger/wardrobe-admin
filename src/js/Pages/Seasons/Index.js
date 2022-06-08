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
			]}
			defaultOptions={{
				sortKey: 'order_num',
			}}
			path="seasons"
			title="Seasons"
			url="seasons?sort=order_num&fields[seasons]=name,order_num"
		/>
	);
}
