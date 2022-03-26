import { IndexTable } from '@jlbelanger/crudnick';
import React from 'react';

export default function Index() {
	return (
		<IndexTable
			columns={[
				{
					key: 'username',
					label: 'Username',
					link: true,
				},
				{
					key: 'email',
					label: 'Email',
				},
			]}
			defaultOptions={{
				sortKey: 'username',
				sortDir: 'asc',
				filters: {},
			}}
			path="users"
			title="Users"
			url="users?sort=username&fields[users]=username,email"
		/>
	);
}
