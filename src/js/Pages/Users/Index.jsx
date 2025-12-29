import { IndexTable } from '@jlbelanger/crudnick';

export default function Index() {
	return (
		<IndexTable
			columns={[
				{
					key: 'username',
					label: 'Username',
					link: true,
					thAttributes: {
						className: 'col--50',
					},
				},
				{
					key: 'email',
					label: 'Email',
					thAttributes: {
						className: 'col--50',
					},
				},
			]}
			defaultOptions={{
				sortKey: 'username',
			}}
			path="users"
			title="Users"
			url="users?sort=username&fields[users]=username,email"
		/>
	);
}
