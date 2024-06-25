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

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout/>
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
