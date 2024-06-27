import React from "react";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import {Button} from "@nextui-org/react";
import {adminUrl} from "../../utils/config/route.config.js";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

TabHeader.propTypes = {
    tabTitle: PropTypes.string,
    buttonData: PropTypes.shape({
        icon: PropTypes.node,
        label: PropTypes.string,
        color: PropTypes.oneOf(["default", "primary", "secondary", "success", "warning", "danger"])
    })
};

function TabHeader({tabTitle, buttonData}) {

    const navigate = useNavigate();

    const handleNavigateTo = () => {
        console.log(adminUrl.category.new)
        return navigate("/admin/categories/new");
    }
    return (
        <header className={"flex justify-between items-center"}>
            <h3 className={classNames(classConfig.text.h3, classConfig.textVariant.formTitle, classConfig.textColor.navyBlue)}>{tabTitle}</h3>
            <Button onClick={handleNavigateTo}
                    color={buttonData.color}
                    startContent={buttonData.icon}
                    className={classNames(classConfig.text.base)}>{buttonData.label}</Button>
        </header>
    );
}

export default TabHeader;