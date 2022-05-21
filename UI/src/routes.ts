import React from 'react';

const Bookings = React.lazy(() => import("./views/Bookings"));
const NewBooking = React.lazy(() => import("./views/NewBooking"));

const routes = [
    { path: '/', exact: true, component: Bookings},
    { path: '/bookings', exact: true, component: Bookings},
    { path: '/newBooking', exact: true, component: NewBooking},
];

export default routes;
