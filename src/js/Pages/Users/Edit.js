import { Auth, EditForm } from '@jlbelanger/crudnick';
import ChangeEmail from './Partials/ChangeEmail';
import ChangePassword from './Partials/ChangePassword';
import ChangeUsername from './Partials/ChangeUsername';
import Form from './Form';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {
	const { id } = useParams();
	const isCurrentUser = id === Auth.id().toString();

	if (isCurrentUser) {
		return (
			<EditForm
				apiPath="users"
				component={Form}
				extra={(row) => (
					<>
						<ChangeUsername id={id} username={row.username} />
						<ChangeEmail email={row.email} />
						<ChangePassword />
					</>
				)}
				name="username"
				path="users"
				showDelete={false}
				showSave={false}
				singular="user"
				url={`users/${id}`}
			/>
		);
	}

	return (
		<EditForm
			apiPath="users"
			component={Form}
			name="username"
			path="users"
			showSave={false}
			singular="user"
			url={`users/${id}`}
		/>
	);
}
