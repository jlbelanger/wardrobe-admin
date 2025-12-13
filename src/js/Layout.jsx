import { Layout as CrudnickLayout } from '@jlbelanger/crudnick';
import React from 'react';
import { Outlet } from 'react-router';

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
