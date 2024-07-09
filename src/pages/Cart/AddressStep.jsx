import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import TabHeader from "../../components/Tab/TabHeader.jsx";
import { IoArrowBack } from "react-icons/io5";
import { userUrl } from "../../utils/config/route.config.js";
import Form from "../../components/Form/Form.jsx";
import FormRow from "../../components/Form/FormRow.jsx";
import { Button, Divider, Input, listbox, Listbox, ListboxItem } from "@nextui-org/react";
import AddressBlock from "../../components/Address/AddressBlock.jsx";
import { toast } from "react-toastify";
import toastConfig from "../../utils/config/toast.config.js";
import useAxiosServer from "../../hooks/useAxiosServer.js";
import { apiUrl } from "../../utils/config/api.config.js";
import iconConfig from "../../utils/config/icon.config.jsx";
import { isValidEmail, isValidPhoneNumber } from "../../utils/validations.js";

AddressStep.propTypes = {
    onNextStep: PropTypes.func
};

function AddressStep({ onNextStep }) {
    const toastCheck = useRef(null);

    const axiosServer = useAxiosServer();

    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [fullAddress, setFullAddress] = useState(" ");

    const [listUserAddresses, setListUserAddresses] = useState(null);
    const [selectedAddressKey, setSelectedAddressKey] = useState(null);

    const handleNextStep = () => {
        toastCheck.current = toast.info("Checking", toastConfig.loading);

        if (!fullName || !phoneNumber || !email || fullAddress.includes("_")) {
            return toast.update(toastCheck.current, toastConfig.error("Please fill in all required address information"));
        }
        toast.dismiss(toastCheck.current);

        const userAddress = {
            fullName,
            email,
            phoneNumber,
            fullAddress
        };
        localStorage.setItem("userAddress", JSON.stringify(userAddress));
        onNextStep({ step: 2 });
    };

    const handleGetListUserAddress = () => {
        axiosServer.get(apiUrl.user.listAddresses).then((response) => {
            let listUserAddresses = response.data.data;
            setListUserAddresses(listUserAddresses);
        });
    };

    useEffect(() => {
        if (selectedAddressKey) {
            const addressDetails = listUserAddresses?.find((_a) => _a._id === selectedAddressKey);
            setFullName(addressDetails.fullName);
            setPhoneNumber(addressDetails.phoneNumber);
            setEmail(addressDetails.email);
            setFullAddress(addressDetails.fullAddress);
        }
    }, [selectedAddressKey]);

    useEffect(() => {
        handleGetListUserAddress();
    }, []);

    return (
        <div className="w-full max-w-7xl mt-8 flex flex-col gap-6">
            <TabHeader
                tabTitle={"Thông tin thanh toán"}
                buttonData={{
                    label: "Quay lại",
                    icon: iconConfig.back.large,
                    urlBack: userUrl.cart.base,
                    color: "secondary"
                }}
            />
            <section>
                <Form>
                    <FormRow>
                        <Listbox items={listUserAddresses || []}
                                 variant={"flat"}
                                 selectionMode="single"
                                 selectedKeys={[selectedAddressKey]}
                                 onSelectionChange={(event) => setSelectedAddressKey(event.currentKey)}
                                 aria-label={"List user addresses"}
                        >
                            {
                                (item) =>
                                    <ListboxItem key={item._id}
                                    >
                                        {item.fullAddress}
                                    </ListboxItem>
                            }
                        </Listbox>
                    </FormRow>
                    <Divider/>
                    <FormRow>
                        <Input variant={"bordered"}
                               label={"Tên khách hàng"}
                               labelPlacement={"outside"}
                               value={fullName}
                               onValueChange={setFullName}
                               size={"lg"}
                               isRequired
                        />
                        <Input variant={"bordered"}
                               label={"Số điện thoại"}
                               labelPlacement={"outside"}
                               value={phoneNumber}
                               onValueChange={setPhoneNumber}
                               size={"lg"}
                               isInvalid={!isValidPhoneNumber(phoneNumber)}
                               isRequired
                        />
                        <Input variant={"bordered"}
                               label={"Email"}
                               labelPlacement={"outside"}
                               value={email}
                               onValueChange={setEmail}
                               size={"lg"}
                               isInvalid={!isValidEmail(email)}
                               isRequired
                        />
                    </FormRow>
                    <FormRow>
                        <Input variant={"flat"} label={"Full Address"} size={"lg"} value={fullAddress} isRequired
                               isReadOnly/>
                    </FormRow>
                    <Divider/>
                    {!selectedAddressKey &&
                        <FormRow>
                            <AddressBlock onChange={setFullAddress}/>
                        </FormRow>
                    }
                    <FormRow justifyContent={"justify-end"}>
                        <Button color={"primary"}
                                size={"md"}
                                onClick={handleNextStep}
                                isDisabled={!isValidEmail(email) && !isValidPhoneNumber(phoneNumber)}
                        >
                            Tiếp tục
                        </Button>
                    </FormRow>
                </Form>
            </section>
        </div>
    );
}

export default AddressStep;
