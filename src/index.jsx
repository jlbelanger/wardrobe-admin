import '@jlbelanger/crudnick/dist/crudnick.css';
import './css/style.css';
import { createRoot } from 'react-dom/client';
import { CrudnickConfig } from '@jlbelanger/crudnick';
import { FormosaConfig } from '@jlbelanger/formosa';
import { RouterProvider } from 'react-router';
import Routes from './js/Routes.jsx';
import { StrictMode } from 'react';

CrudnickConfig.init({
	basePath: import.meta.env.VITE_BASE_PATH,
	cookiePrefix: import.meta.env.VITE_COOKIE_PREFIX,
	frontendUrl: import.meta.env.VITE_FRONTEND_URL,
	siteTitle: import.meta.env.VITE_TITLE,
});

FormosaConfig.init({
	apiPrefix: import.meta.env.VITE_API_URL,
});

const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<RouterProvider router={Routes} />
	</StrictMode>
);
