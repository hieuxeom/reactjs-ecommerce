import React from "react";
import classConfig from "../../utils/config/class.config.js";
import classNames from "classnames";
import {Button} from "@nextui-org/react";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

FormHeader.propTypes = {
    formTitle: PropTypes.string,
    urlBack: PropTypes.string
};

function FormHeader({formTitle, urlBack}) {

    const navigate = useNavigate();

    const handleNavigateToIndex = () => {
        return navigate(urlBack);
    };

    return (
        <header className={"flex justify-between items-center"}>
            <h3 className={classNames(classConfig.fontSize.h3, classConfig.textVariant.formTitle, classConfig.textColor.navyBlue)}>{formTitle}</h3>
            <Button className={classNames(classConfig.fontSize.base, "flex items-center")}
                    color={"secondary"}
                    onClick={handleNavigateToIndex}
                    startContent={<IoArrowBack size={classConfig.icon.large}/>}>
                Quay lại </Button>
        </header>
    );
}

export default FormHeader;