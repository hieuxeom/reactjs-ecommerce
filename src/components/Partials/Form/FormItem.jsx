import React from "react";

function FormItem({children}) {
    return (
        <div className={"flex flex-col gap-2"}>
            {children}
        </div>
    );
}

export default FormItem;