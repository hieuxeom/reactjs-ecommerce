import React from "react";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

TabHeader.propTypes = {
    tabTitle: PropTypes.string.isRequired,
    buttonData: PropTypes.shape({
        icon: PropTypes.node,
        label: PropTypes.string,
        color: PropTypes.oneOf(["default", "primary", "secondary", "success", "warning", "danger"]),
        urlBack: PropTypes.string
    })
};

function TabHeader({tabTitle, buttonData}) {

    const navigate = useNavigate();

    const handleNavigateTo = () => {
        return navigate(buttonData.urlBack);
    };
    return (
        <header className={"flex justify-between items-center"}>
            <h3 className={classNames(classConfig.fontSize.h3, classConfig.textVariant.formTitle, classConfig.textColor.secondary)}>{tabTitle}</h3>
            {buttonData &&
                <Button onClick={handleNavigateTo}
                        color={buttonData.color}
                        startContent={buttonData.icon}
                        className={classNames(classConfig.fontSize.base)}>
                    {buttonData.label}
                </Button>}
        </header>
    );
}

export default TabHeader;