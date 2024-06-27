import React from "react";
import PropTypes from "prop-types";

FormBody.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

function FormBody({children}) {
    return (
        <div className={"flex flex-col gap-8"}>
            {children}
        </div>
    );
}

export default FormBody;