import React from "react";
import {Outlet} from "react-router-dom";

function ProductManagement(props) {
    return (
        <section className={"w-full flex justify-center"}>
            <Outlet/>
        </section>
    );
}

export default ProductManagement;