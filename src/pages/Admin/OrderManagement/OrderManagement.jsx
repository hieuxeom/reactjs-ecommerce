import React from "react";
import {Outlet} from "react-router-dom";

function OrderManagement(props) {
    return (
        <div className="w-full flex justify-center">
            <Outlet/>
        </div>
    );
}

export default OrderManagement;