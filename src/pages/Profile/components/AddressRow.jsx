import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import { Button } from "@nextui-org/react";
import iconConfig from "../../../utils/config/icon.config.jsx";
import { UserAddressPropTypes } from "../../../utils/propTypes/userType.js";
import { userUrl } from "../../../utils/config/route.config.js";
import { useNavigate } from "react-router-dom";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import toastConfig from "../../../utils/config/toast.config.js";
import { toast } from "react-toastify";

AddressRow.propTypes = {
    addressData: UserAddressPropTypes,
    onDelete: PropTypes.func
};

function AddressRow({ addressData, onDelete }) {

    const toastDelete = useRef(null);

    const navigate = useNavigate();
    const axiosServer = useAxiosServer();

    const handleNavigateTo = (addressId) => {
        return navigate(userUrl.profile.addressDetails(addressId));
    };

    const handleRemoveAddress = (addressId) => {
        toastDelete.current = toast.info("Deleting...", toastConfig.loading);
        axiosServer.delete(apiUrl.user.deleteAddress(addressId))
            .then((response) => response.data)
            .then((response) => {
                if (response.status === "success") {
                    toast.update(toastDelete.current, toastConfig.success(response.message));
                    onDelete(addressId);
                } else {
                    toast.update(toastDelete.current, toastConfig.error(response.message));
                }
            })
            .catch((error) => {
                const { response } = error;
                toast.update(toastDelete.current, toastConfig.error(response.message));
            });
    };

    return (
        <div className={"relative w-full flex flex-col gap-2 border border-black/10 rounded-xl p-4"}>
            <p className={classNames(classConfig.fontSize.base, classConfig.textColor.default, "font-semibold")}>
                {addressData.fullName}
            </p>
            <div className={"flex items-center gap-2"}>
                <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray, "italic font-semibold")}>
                    {addressData.phoneNumber}
                </p>
                <p> - </p>
                <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray, "italic font-semibold")}>
                    {addressData.email}
                </p>
            </div>
            <p className={classNames(classConfig.fontSize.base, classConfig.textColor.default, "font-semibold")}>
                {addressData.fullAddress}
            </p>
            <div className={"absolute top-2 right-2"}>
                <Button isIconOnly
                        size={"sm"}
                        variant={"light"}
                        color={"warning"}
                        radius={"full"}
                        onClick={() => handleNavigateTo(addressData._id)}
                >
                    {iconConfig.edit.base}
                </Button>

                <Button isIconOnly
                        size={"sm"}
                        variant={"light"}
                        color={"danger"}
                        radius={"full"}
                        onClick={() => handleRemoveAddress(addressData._id)}
                >
                    {iconConfig.delete.base}
                </Button>
            </div>
        </div>
    );
}

export default AddressRow;