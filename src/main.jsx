import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import RootLayout from "./layouts/RootLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import {NextUIProvider} from "@nextui-org/react";
import HomePage from "./components/Home/HomePage.jsx";
import SignIn from "./components/Auth/SignIn/SignIn.jsx";
import SignUp from "./components/Auth/SignUp/SignUp.jsx";
import {CookiesProvider} from 'react-cookie';
import MyProfile from "./components/Profile/MyProfile.jsx";
import ProtectRoute from "./utils/route/ProtectRoute.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Dashboard from "./components/Admin/Dashboard/Dashboard.jsx";
import CategoryManagement from "./components/Admin/CategoryManagement/CategoryManagement.jsx";
import ProductManagement from "./components/Admin/ProductManagement/ProductManagement.jsx";
import OrderManagement from "./components/Admin/OrderManagement/OrderManagement.jsx";
import UserManagement from "./components/Admin/UserManagement/UserManagement.jsx";
import NewCategory from "./components/Admin/CategoryManagement/NewCategory.jsx";
import CategoryIndex from "./components/Admin/CategoryManagement/CategoryIndex.jsx";
import RedirectRoute from "./utils/route/RedirectRoute.jsx";
import {adminUrl} from "./utils/config/route.config.js";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                path: '',
                element: <RedirectRoute redirectTo={adminUrl.dashboard.index}/>,
            },
            {
                path: 'dashboard',
                element: <Dashboard/>
            },
            {
                path: 'categories',
                element: <CategoryManagement/>,
                children: [
                    {
                        path: '',
                        element: <CategoryIndex/>
                    },
                    {
                        path: 'new',
                        element: <NewCategory/>
                    }

                ]

            },
            {
                path: 'products',
                element: <ProductManagement/>
            },
            {
                path: 'orders',
                element: <OrderManagement/>
            },
            {
                path: 'users',
                element: <UserManagement/>
            },
            {
                path: '',
                element: <Dashboard/>
            },
        ]
    },
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: 'profile',
                element: <Profile/>,
                children: [
                    {
                        path: 'me',
                        element: <MyProfile/>
                    }

                ]
            },
            {
                element: <ProtectRoute/>,
                children: [
                    {
                        path: "sign-in",
                        element: <SignIn/>
                    },
                    {
                        path: "sign-up",
                        element: <SignUp/>
                    }
                ]
            },

        ]
    },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NextUIProvider>
            <CookiesProvider defaultSetOptions={{path: '/'}}>
                <RouterProvider router={router}/>
            </CookiesProvider>
        </NextUIProvider>
    </React.StrictMode>
);
