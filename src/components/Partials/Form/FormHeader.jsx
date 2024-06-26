import React from 'react';
import classConfig from "../../../utils/config/class.config.js";
import classNames from "classnames";
import {Button} from "@nextui-org/react";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

function FormHeader({formTitle, urlBack}) {

    const navigate = useNavigate();

    const handleNavigateToIndex = () => {
        return navigate(urlBack);
    }

    return (
        <header className={"flex justify-between items-center"}>
            <h3 className={classNames(classConfig.text.h3, classConfig.textVariant.formTitle, classConfig.textColor.navyBlue)}>{formTitle}</h3>
            <Button className={classNames(classConfig.text.base, "flex items-center")}
                    color={"secondary"}
                    onClick={handleNavigateToIndex}
                    startContent={<IoArrowBack size={classConfig.icon.base}/>}>
                Back
            </Button>
        </header>
    );
}

export default FormHeader;