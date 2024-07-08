import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Form from "../../components/Form/Form.jsx";
import FormBody from "../../components/Form/FormBody.jsx";
import FormHeader from "../../components/Form/FormHeader.jsx";
import FormRow from "../../components/Form/FormRow.jsx";
import { Button, Divider, Input } from "@nextui-org/react";
import AddressBlock from "../../components/Address/AddressBlock.jsx";
import iconConfig from "../../utils/config/icon.config.jsx";
import { useParams } from "react-router-dom";
import useAxiosServer from "../../hooks/useAxiosServer.js";
import { apiUrl } from "../../utils/config/api.config.js";
import { toast } from "react-toastify";
import toastConfig from "../../utils/config/toast.config.js";

AddressDetails.propTypes = {};

function AddressDetails(props) {

    const toastEdit = useRef(null);

    const { addressId } = useParams();
    const axiosServer = useAxiosServer();

    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [fullAddress, setFullAddress] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [isEditAddress, setIsEditAddress] = useState(false);

    const getAddressInfo = () => {
        axiosServer.get(apiUrl.user.addressDetails(addressId))
            .then((response) => response.data)
            .then((response) => {
                setFullName(response.data.fullName);
                setPhoneNumber(response.data.phoneNumber);
                setEmail(response.data.email);
                setFullAddress(response.data.fullAddress);
            });
    };

    const handleEditAddress = () => {

        toastEdit.current = toast.info("Updating...", toastConfig.loading);
        if (newAddress.includes("_")) {
            return toast.update(toastEdit.current, toastConfig.error("Please fill all required fields"));
        }

        axiosServer.put(apiUrl.user.editAddress(addressId), {
            fullName,
            phoneNumber,
            email,
            fullAddress: newAddress
        })
            .then((response) => response.data)
            .then((response) => {
                if (response.status === "success") {
                    toast.update(toastEdit.current, toastConfig.success(response.message));
                    setFullAddress(newAddress);
                    setIsEditAddress(!isEditAddress);
                }
            })
            .catch(error => {
                const { response } = error;
                toast.update(toastEdit.current, toastConfig.error(response.message));

            });
    };

    useEffect(() => {
        getAddressInfo();
    }, [addressId]);

    return (
        <section className={"w-full max-w-7xl mt-8"}>
            <Form>
                <FormHeader formTitle={"Thông tin địa chỉ"} urlBack={"/profile/me"}/>
                <FormBody>
                    <FormRow>
                        <Input variant={"bordered"}
                               label={"Full Name"}
                               labelPlacement={"outside"}
                               value={fullName}
                               onValueChange={setFullName}
                               size={"lg"}
                               isRequired
                        />
                        <Input variant={"bordered"}
                               label={"Phone Number"}
                               labelPlacement={"outside"}
                               value={phoneNumber}
                               onValueChange={setPhoneNumber}
                               size={"lg"}
                               isRequired
                        />
                        <Input variant={"bordered"}
                               label={"Email"}
                               labelPlacement={"outside"}
                               value={email}
                               onValueChange={setEmail}
                               size={"lg"}
                               isRequired
                        />
                    </FormRow>
                    <FormRow>
                        <Input variant={"flat"}
                               label={"Current Address"}
                               size={"lg"}
                               value={fullAddress} isRequired
                               isReadOnly/>
                    </FormRow>
                    {
                        isEditAddress &&
                        <FormRow>
                            <Input variant={"flat"}
                                   label={"New Address"}
                                   size={"lg"}
                                   value={newAddress}
                                   isRequired
                                   isReadOnly/>
                        </FormRow>
                    }

                    {
                        isEditAddress &&
                        <>
                            <Divider/>
                            <FormRow>
                                <AddressBlock onChange={setNewAddress}/>
                            </FormRow>
                        </>
                    }
                    <FormRow justifyContent={"justify-end"}>
                        {
                            isEditAddress ?
                                <div className={"flex gap-2 items-center"}>
                                    <Button color={"danger"}
                                            size={"md"}
                                            onClick={() => setIsEditAddress(!isEditAddress)}
                                    >
                                        Hủy
                                    </Button>
                                    <Button color={"success"}
                                            size={"md"}
                                            onClick={handleEditAddress}
                                    >
                                        Cập nhật
                                    </Button>
                                </div> :
                                <Button color={"warning"}
                                        size={"md"}
                                        startContent={iconConfig.edit.base}
                                        onClick={() => setIsEditAddress(!isEditAddress)}
                                >
                                    Sửa địa chỉ
                                </Button>
                        }
                    </FormRow>
                </FormBody>
            </Form>
        </section>
    );
}

export default AddressDetails;