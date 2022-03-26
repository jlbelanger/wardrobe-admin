import { Route, Switch } from 'react-router-dom';
import CategoryAdd from './Pages/Categories/Add';
import CategoryEdit from './Pages/Categories/Edit';
import CategoryIndex from './Pages/Categories/Index';
import ClothesAdd from './Pages/Clothes/Add';
import ClothesEdit from './Pages/Clothes/Edit';
import ClothesIndex from './Pages/Clothes/Index';
import ColourAdd from './Pages/Colours/Add';
import ColourEdit from './Pages/Colours/Edit';
import ColourIndex from './Pages/Colours/Index';
import React from 'react';
import SeasonAdd from './Pages/Seasons/Add';
import SeasonEdit from './Pages/Seasons/Edit';
import SeasonIndex from './Pages/Seasons/Index';
import UserAdd from './Pages/Users/Add';
import UserEdit from './Pages/Users/Edit';
import UserIndex from './Pages/Users/Index';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/" />

			<Route exact path="/categories"><CategoryIndex /></Route>
			<Route exact path="/categories/add"><CategoryAdd /></Route>
			<Route exact path="/categories/:id(\d+)"><CategoryEdit /></Route>

			<Route exact path="/clothes"><ClothesIndex /></Route>
			<Route exact path="/clothes/add"><ClothesAdd /></Route>
			<Route exact path="/clothes/:id(\d+)"><ClothesEdit /></Route>

			<Route exact path="/colours"><ColourIndex /></Route>
			<Route exact path="/colours/add"><ColourAdd /></Route>
			<Route exact path="/colours/:id(\d+)"><ColourEdit /></Route>

			<Route exact path="/seasons"><SeasonIndex /></Route>
			<Route exact path="/seasons/add"><SeasonAdd /></Route>
			<Route exact path="/seasons/:id(\d+)"><SeasonEdit /></Route>

			<Route exact path="/users"><UserIndex /></Route>
			<Route exact path="/users/add"><UserAdd /></Route>
			<Route exact path="/users/:id(\d+)"><UserEdit /></Route>

			<Route>Page not found.</Route>
		</Switch>
	);
}
