import React from 'react';

function FormBody({children}) {
    return (
        <div className={"flex flex-col gap-4"}>
            {children}
        </div>
    );
}

export default FormBody;