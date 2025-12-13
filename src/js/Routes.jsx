import { ForgotPassword, Login, NotFound, PrivateRoute, ResetPassword } from '@jlbelanger/crudnick';
import CategoryAdd from './Pages/Categories/Add';
import CategoryEdit from './Pages/Categories/Edit';
import CategoryIndex from './Pages/Categories/Index';
import ClothesAdd from './Pages/Clothes/Add';
import ClothesEdit from './Pages/Clothes/Edit';
import ClothesIndex from './Pages/Clothes/Index';
import ColourAdd from './Pages/Colours/Add';
import ColourEdit from './Pages/Colours/Edit';
import ColourIndex from './Pages/Colours/Index';
import { createBrowserRouter } from 'react-router';
import Layout from './Layout';
import SeasonAdd from './Pages/Seasons/Add';
import SeasonEdit from './Pages/Seasons/Edit';
import SeasonIndex from './Pages/Seasons/Index';
import UserAdd from './Pages/Users/Add';
import UserEdit from './Pages/Users/Edit';
import UserIndex from './Pages/Users/Index';

export default createBrowserRouter(
	[
		{
			path: '/',
			Component: Layout,
			children: [
				{
					index: true,
					Component: Login,
				},
				{
					path: 'forgot-password',
					Component: ForgotPassword,
				},
				{
					path: 'reset-password/:token',
					Component: ResetPassword,
				},
				{
					path: '',
					Component: PrivateRoute,
					children: [
						{
							path: 'categories',
							children: [
								{ index: true, Component: CategoryIndex },
								{ path: 'add', Component: CategoryAdd },
								{ path: ':id', Component: CategoryEdit },
							],
						},
						{
							path: 'clothes',
							children: [
								{ index: true, Component: ClothesIndex },
								{ path: 'add', Component: ClothesAdd },
								{ path: ':id', Component: ClothesEdit },
							],
						},
						{
							path: 'colours',
							children: [
								{ index: true, Component: ColourIndex },
								{ path: 'add', Component: ColourAdd },
								{ path: ':id', Component: ColourEdit },
							],
						},
						{
							path: 'seasons',
							children: [
								{ index: true, Component: SeasonIndex },
								{ path: 'add', Component: SeasonAdd },
								{ path: ':id', Component: SeasonEdit },
							],
						},
						{
							path: 'users',
							children: [
								{ index: true, Component: UserIndex },
								{ path: 'add', Component: UserAdd },
								{ path: ':id', Component: UserEdit },
							],
						},
					],
				},
				{
					path: '*',
					Component: NotFound,
				},
			],
		},
	],
	{
		basename: import.meta.env.VITE_BASE_PATH,
	}
);
