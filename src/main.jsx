import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import APP from './routes/root';
import Root2 from './routes/root2.jsx';
import StatsChart from './routes/root3.jsx';
import './index.css'
import Layout from './routes/layout';

import StudentAnswerList from './routes/StudentAnswerList';

const router = createBrowserRouter([
    { path: "/", element: <Layout><APP /></Layout> },
    { path: "/root2", element: <Layout><Root2 /></Layout> },
    { path: "/root3", element: <Layout><StatsChart /></Layout> },
    { path: "/root4", element: <Layout><StudentAnswerList /></Layout> },
]);
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <ToastContainer />
        <RouterProvider router={router} />
    </>
)
