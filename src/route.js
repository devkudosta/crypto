import React from 'react';

 
const Signin = React.lazy(() => import('./Components/Dashboard/Default')); 

const route = [ 
    { path: '/dashboard', exact: true, name: 'Signin', component: Signin },
     
];
export default route;