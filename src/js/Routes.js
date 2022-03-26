import { Route, Switch } from 'react-router-dom';
import React from 'react';
import UserAdd from './Pages/Users/Add';
import UserEdit from './Pages/Users/Edit';
import UserIndex from './Pages/Users/Index';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/" />

			<Route exact path="/users"><UserIndex /></Route>
			<Route exact path="/users/add"><UserAdd /></Route>
			<Route exact path="/users/:id(\d+)"><UserEdit /></Route>

			<Route>Page not found.</Route>
		</Switch>
	);
}
