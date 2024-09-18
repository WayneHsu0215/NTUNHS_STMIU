import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import APP from './routes/QuestionDisplay/root';
import Root2 from './routes/AnswerDisplay/root2.jsx';
import StatsChart from './routes/StatisticalQuery/root3.jsx';
import './index.css'
import Layout from './routes/lib/layout';
import HomePage from "./routes/HomePage/homepage.jsx";

import StudentAnswerList from './routes/StudentDetail/StudentAnswerList';

const router = createBrowserRouter([
    { path: "/root1", element: <Layout><APP /></Layout> },
    { path: "/root2", element: <Layout><Root2 /></Layout> },
    { path: "/root3", element: <Layout><StatsChart /></Layout> },
    { path: "/root4", element: <Layout><StudentAnswerList /></Layout> },
    { path: "/", element: <HomePage /> },
]);
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <ToastContainer />
        <RouterProvider router={router} />
    </>
)
