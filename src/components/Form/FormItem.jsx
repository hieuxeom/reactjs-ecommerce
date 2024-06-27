import React from "react";
import PropTypes from "prop-types";

FormItem.propTypes = {
    width: PropTypes.string,
    alignItems: PropTypes.string,
    children: PropTypes.node
}

function FormItem({width = "w-full", alignItems = "items-start", children}) {
    return (
        <div className={`${width} flex flex-col gap-2 ${alignItems}`}>
            {children}
        </div>
    );
}

export default FormItem;