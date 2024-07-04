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
import AdminProductDetails from "./pages/Admin/ProductManagement/ProductDetails.jsx";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootProductDetails from "./pages/Product/ProductDetails/RootProductDetails.jsx";
import Shop from "./pages/Product/Shop/Shop.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import CartCheckout from "./pages/Cart/CartCheckout.jsx";
import VoucherManagement from "./pages/Admin/VoucherManagement/VoucherManagement.jsx";
import VoucherIndex from "./pages/Admin/VoucherManagement/VoucherIndex.jsx";
import NewVoucher from "./pages/Admin/VoucherManagement/NewVoucher.jsx";
import EditVoucher from "./pages/Admin/VoucherManagement/EditVoucher.jsx";
import OrderIndex from "./pages/Admin/OrderManagement/OrderIndex.jsx";
import OrderDetails from "./pages/Admin/OrderManagement/OrderDetails.jsx";

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
                        element: <AdminProductDetails/>
                    },
                    {
                        path: ":productId/edit",
                        element: <EditProduct/>
                    }

                ]
            },
            {
                path: "orders",
                element: <OrderManagement/>,
                children: [
                    {
                        path: "",
                        element: <OrderIndex/>
                    },
                    {
                        path: ":orderId",
                        element: <OrderDetails/>
                    }

                ]
            },
            {
                path: "users",
                element: <UserManagement/>
            },
            {
                path: "vouchers",
                element: <VoucherManagement/>,
                children: [
                    {
                        path: "",
                        element: <VoucherIndex/>
                    },
                    {
                        path: "new",
                        element: <NewVoucher/>
                    },
                    {
                        path: ":voucherId/edit",
                        element: <EditVoucher/>
                    }
                ]
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
                path: "shop",
                element: <Shop/>
            },
            {
                path: "cart",
                children: [
                    {
                        path: "",
                        element: <Cart/>
                    },
                    {
                        path: "checkout",
                        element: <CartCheckout/>
                    }
                ]
            },
            {
                path: "product/:productId",
                element: <RootProductDetails/>
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
                <ToastContainer closeOnClick/>
                <RouterProvider router={router}/>
            </CookiesProvider>
        </NextUIProvider>
    </React.StrictMode>
);
