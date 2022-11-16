import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Components/Dashboard/Default'));
const Abouts = React.lazy(() => import('./Components/Dashboard/Abouts'));
const Contactus = React.lazy(() => import('./Components/Dashboard/Contactus'));
const Privacypolicy = React.lazy(() => import('./Components/Dashboard/Privacypolicy'));
const NotFound = React.lazy(() => import('./Components/NotFound/Default'));
 
 

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/dashboard/abouts', exact: true, name: 'Abouts', component: Abouts },
    { path: '/dashboard/contactus', exact: true, name: 'Contactus', component: Contactus },
    { path: '/dashboard/privacypolicy', exact: true, name: 'Privacypolicy', component: Privacypolicy },
    { path: '/NotFound', exact: true, name: 'NotFound', component: NotFound },
     
];

export default routes;