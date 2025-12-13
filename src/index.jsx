import '@jlbelanger/crudnick/dist/crudnick.css';
import './css/style.css';
import { CrudnickConfig } from '@jlbelanger/crudnick';
import { FormosaConfig } from '@jlbelanger/formosa';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import Routes from './js/Routes';

CrudnickConfig.init({
	basePath: import.meta.env.VITE_BASE_PATH,
	cookiePrefix: import.meta.env.VITE_COOKIE_PREFIX,
	frontendUrl: import.meta.env.VITE_FRONTEND_URL,
	siteTitle: import.meta.env.VITE_TITLE,
});

FormosaConfig.init({
	apiPrefix: import.meta.env.VITE_API_URL,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={Routes} />
	</React.StrictMode>
);
