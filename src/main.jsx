import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import RootLayout from "./layouts/RootLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import {NextUIProvider} from "@nextui-org/react";
import HomePage from "./pages/Home/HomePage.jsx";
import SignIn from "./pages/Auth/SignIn/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";
import {CookiesProvider} from "react-cookie";
import MyProfile from "./pages/Profile/MyProfile.jsx";
import ProtectRoute from "./utils/route/ProtectRoute.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.jsx";
import CategoryManagement from "./pages/Admin/CategoryManagement/CategoryManagement.jsx";
import ProductManagement from "./pages/Admin/ProductManagement/ProductManagement.jsx";
import OrderManagement from "./pages/Admin/OrderManagement/OrderManagement.jsx";
import UserManagement from "./pages/Admin/UserManagement/UserManagement.jsx";
import NewCategory from "./pages/Admin/CategoryManagement/NewCategory.jsx";
import CategoryIndex from "./pages/Admin/CategoryManagement/CategoryIndex.jsx";
import RedirectRoute from "./utils/route/RedirectRoute.jsx";
import {adminUrl} from "./utils/config/route.config.js";
import EditCategory from "./pages/Admin/CategoryManagement/EditCategory.jsx";
import NewProduct from "./pages/Admin/ProductManagement/NewProduct.jsx";
import ProductIndex from "./pages/Admin/ProductManagement/ProductIndex.jsx";
import EditProduct from "./pages/Admin/ProductManagement/EditProduct.jsx";
import ProductDetails from "./pages/Admin/ProductManagement/ProductDetails.jsx";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                path: "",
                element: <RedirectRoute redirectTo={adminUrl.dashboard.index}/>
            },
            {
                path: "dashboard",
                element: <Dashboard/>
            },
            {
                path: "categories",
                element: <CategoryManagement/>,
                children: [
                    {
                        path: "",
                        element: <CategoryIndex/>
                    },
                    {
                        path: "new",
                        element: <NewCategory/>
                    },
                    {
                        path: ":categoryId/edit",
                        element: <EditCategory/>
                    }

                ]

            },
            {
                path: "products",
                element: <ProductManagement/>,
                children: [
                    {
                        path: "",
                        element: <ProductIndex/>
                    },
                    {
                        path: "new",
                        element: <NewProduct/>
                    },
                    {
                        path: ":productId",
                        element: <ProductDetails/>
                    },
                    {
                        path: ":productId/edit",
                        element: <EditProduct/>
                    }

                ]
            },
            {
                path: "orders",
                element: <OrderManagement/>
            },
            {
                path: "users",
                element: <UserManagement/>
            },
            {
                path: "",
                element: <Dashboard/>
            }
        ]
    },
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                path: "",
                element: <HomePage/>
            },
            {
                path: "profile",
                element: <Profile/>,
                children: [
                    {
                        path: "me",
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
            }

        ]
    }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NextUIProvider>
            <CookiesProvider defaultSetOptions={{path: "/"}}>
                <RouterProvider router={router}/>
            </CookiesProvider>
        </NextUIProvider>
    </React.StrictMode>
);
