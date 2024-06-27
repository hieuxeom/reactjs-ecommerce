import React from "react";
import PropTypes from "prop-types";

FormRow.propTypes = {
    alignItems: PropTypes.string,
    children: PropTypes.node
}

function FormRow({alignItems = "items-start", children}) {
    return (
        <div className={`w-full flex ${alignItems} gap-4`}>{children}</div>
    );
}

export default FormRow;