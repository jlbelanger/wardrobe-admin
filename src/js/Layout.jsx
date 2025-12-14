import { Layout as CrudnickLayout } from '@jlbelanger/crudnick';
import { Outlet } from 'react-router';
import React from 'react';

export default function MyLayout() {
	return (
		<CrudnickLayout
			nav={[
				{ label: 'Categories', path: '/categories' },
				{ label: 'Clothes', path: '/clothes' },
				{ label: 'Colours', path: '/colours' },
				{ label: 'Seasons', path: '/seasons' },
				{ label: 'Users', path: '/users' },
			]}
		>
			<Outlet />
		</CrudnickLayout>
	);
}
