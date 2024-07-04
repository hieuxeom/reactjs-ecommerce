import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classConfig from "../../../../utils/config/class.config.js";

CustomerInfoBlock.propTypes = {
    customerInfo: PropTypes.shape({
        fullName: PropTypes.string,
        phoneNumber: PropTypes.string,
        email: PropTypes.string
    })
};

function CustomerInfoBlock({customerInfo}) {
    return (
        <div className={"w-full flex flex-col gap-4 shadow-custom p-4 rounded-2xl"}>
            <h5 className={classNames(classConfig.fontSize.h5, classConfig.textColor.secondary)}>
                Thông tin khách hàng
            </h5>
            {customerInfo && <div className={"flex flex-col gap-4"}>
                <div className={"flex justify-between"}>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                        Tên khách hàng
                    </p>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.default, "font-semibold")}>
                        {customerInfo?.fullName ?? ""}
                    </p>
                </div>
                <div className={"flex justify-between"}>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                        Số điện thoại
                    </p>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.default, "font-semibold")}>
                        {customerInfo?.phoneNumber ?? ""}
                    </p>
                </div>
                <div className={"flex justify-between"}>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                        Email
                    </p>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.default, "font-semibold")}>
                        {customerInfo?.email ?? ""}
                    </p>
                </div>
            </div>}
        </div>
    );
}

export default CustomerInfoBlock;