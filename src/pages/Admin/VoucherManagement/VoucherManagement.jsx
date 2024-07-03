import React from "react";
import PropTypes from "prop-types";
import {Outlet} from "react-router-dom";

VoucherManagement.propTypes = {};

function VoucherManagement(props) {
    return (
        <section className={"w-full flex justify-center"}>
            <Outlet/>
        </section>
    );
}

export default VoucherManagement;