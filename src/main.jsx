import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import APP from './routes/root';
import './index.css'
import Layout from './routes/layout';
const router = createBrowserRouter([
    { path: "/", element: <Layout><APP /></Layout> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
