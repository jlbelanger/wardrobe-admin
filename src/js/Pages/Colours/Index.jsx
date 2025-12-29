import { IndexTable } from '@jlbelanger/crudnick';

export default function Index() {
	return (
		<IndexTable
			columns={[
				{
					key: 'name',
					label: 'Name',
					link: true,
				},
			]}
			defaultOptions={{
				sortKey: 'name',
			}}
			path="colours"
			title="Colours"
			url="colours?sort=name&fields[colours]=name"
		/>
	);
}
