import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import { Button } from "@nextui-org/react";
import iconConfig from "../../../utils/config/icon.config.jsx";
import { useNavigate } from "react-router-dom";
import { userUrl } from "../../../utils/config/route.config.js";
import AddressRow from "./AddressRow.jsx";

ListAddressesBlock.propTypes = {};

function ListAddressesBlock(props) {

    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const [listAddresses, setListAddresses] = useState([]);

    const getListAddresses = () => {
        return axiosServer.get(apiUrl.user.listAddresses)
            .then((response) => response.data)
            .then((response) => {
                setListAddresses(response.data);
            });
    };

    const handleNavigateToNewAddress = () => {
        return navigate(userUrl.profile.newAddress);
    };

    const handleOnDelete = (addressId) => {
        setListAddresses(prev => prev.filter((address) => address._id !== addressId));
    };

    useEffect(() => {
        getListAddresses();
    }, []);

    return (
        <div className={"w-full border-1 border-black/10 p-4 rounded-2xl flex flex-col gap-4"}>
            <header className={"flex justify-between items-center"}>
                <h6 className={classNames(classConfig.fontSize.h6, classConfig.textColor.secondary)}>
                    Địa chỉ của tôi
                </h6>
                <Button startContent={iconConfig.add.base}
                        color={"primary"}
                        onClick={handleNavigateToNewAddress}
                >
                    Thêm địa chỉ mới
                </Button>
            </header>
            <main className={"w-full flex flex-col gap-4"}>
                {
                    listAddresses.length > 0
                        ? listAddresses.map((address, index) =>
                            <AddressRow key={index} onDelete={handleOnDelete} addressData={address}/>
                        )
                        : <div className={"W-full flex justify-center"}>
                            <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray, "italic")}>Chưa
                                có địa chỉ nào</p>
                        </div>
                }
            </main>
        </div>
    );
}

export default ListAddressesBlock;