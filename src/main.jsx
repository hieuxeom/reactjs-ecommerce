import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import RootLayout from "./layouts/RootLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout/>
    },
    {
        path: "/",
        element: <RootLayout/>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
