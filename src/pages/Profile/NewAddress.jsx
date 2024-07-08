import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Form, useNavigate } from "react-router-dom";
import FormHeader from "../../components/Form/FormHeader.jsx";
import { userUrl } from "../../utils/config/route.config.js";
import FormBody from "../../components/Form/FormBody.jsx";
import FormRow from "../../components/Form/FormRow.jsx";
import { Button, Divider, Input } from "@nextui-org/react";
import AddressBlock from "../../components/Address/AddressBlock.jsx";
import iconConfig from "../../utils/config/icon.config.jsx";
import useAxiosServer from "../../hooks/useAxiosServer.js";
import { toast } from "react-toastify";
import toastConfig from "../../utils/config/toast.config.js";
import { apiUrl } from "../../utils/config/api.config.js";

NewAddress.propTypes = {};

function NewAddress(props) {

    const toastCreate = useRef(null);

    const axiosServer = useAxiosServer();

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullAddress, setFullAddress] = useState("");

    const handleCreateAddress = () => {
        toastCreate.current = toast.info("Creating...", toastConfig.loading);

        axiosServer.post(apiUrl.user.newAddress, {
            fullName,
            email,
            phoneNumber,
            fullAddress
        })
            .then((response) => response.data)
            .then((response) => {
                if (response.status === "success") {
                    toast.update(toastCreate.current, toastConfig.success(response.message));
                    return navigate(userUrl.profile.me);
                } else {
                    toast.update(toastCreate.current, toastConfig.error(response.message));
                }
            })
            .catch((error) => {
                const { response } = error;
                toast.update(toastCreate.current, toastConfig.error(response.message));
            });

    };

    return (
        <div className={"w-full max-w-7xl mt-8"}>
            <Form>
                <FormHeader formTitle={"Tạo địa chỉ mới"} urlBack={userUrl.profile.me}/>
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

                    <>
                        <Divider/>
                        <FormRow>
                            <AddressBlock onChange={setFullAddress}/>
                        </FormRow>
                    </>
                    <FormRow justifyContent={"justify-end"}>

                        <Button color={"primary"}
                                size={"md"}
                                onClick={handleCreateAddress}
                        >
                            Tạo địa chỉ mới
                        </Button>
                    </FormRow>
                </FormBody>
            </Form>
        </div>
    );
}

export default NewAddress;