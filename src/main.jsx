import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import APP from './routes/root';
import Root2 from './routes/root2.jsx';
import './index.css'
import Layout from './routes/layout';
const router = createBrowserRouter([
    { path: "/", element: <Layout><APP /></Layout> },
    { path: "/root2", element: <Layout><Root2 /></Layout> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
