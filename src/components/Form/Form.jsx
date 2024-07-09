import React from "react";

function Form({ children }) {
    return (
        <form className={"flex flex-col gap-2"}>{children}</form>
    );
}

export default Form;