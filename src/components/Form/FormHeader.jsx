import React from "react";
import classConfig from "../../utils/config/class.config.js";
import classNames from "classnames";
import {Button} from "@nextui-org/react";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import iconConfig from "../../utils/config/icon.config.jsx";

FormHeader.propTypes = {
    formTitle: PropTypes.string,
    urlBack: PropTypes.string
};

function FormHeader({formTitle, urlBack}) {

    const navigate = useNavigate();

    const handleNavigateTo = () => {
        return navigate(urlBack);
    };

    return (
        <header className={"flex justify-between items-center"}>
            <h3 className={classNames(classConfig.fontSize.h3, classConfig.textVariant.formTitle, classConfig.textColor.secondary)}>{formTitle}</h3>
            <Button className={classNames(classConfig.fontSize.base, "flex items-center")}
                    color={"secondary"}
                    onClick={handleNavigateTo}
                    startContent={iconConfig.back.large}>
                Quay lại </Button>
        </header>
    );
}

export default FormHeader;