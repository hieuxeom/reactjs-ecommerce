import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import { Button, Input } from "@nextui-org/react";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import { Form, useNavigate } from "react-router-dom";
import FormBody from "../../../components/Form/FormBody.jsx";
import FormRow from "../../../components/Form/FormRow.jsx";
import iconConfig from "../../../utils/config/icon.config.jsx";
import { toast } from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import { useCookies } from "react-cookie";
import { userUrl } from "../../../utils/config/route.config.js";

InformationBlock.propTypes = {};

function InformationBlock(props) {

    const toastEdit = useRef(null);

    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const axiosServer = useAxiosServer();

    const [userData, setUserData] = useState(null);

    const [userName, setUserName] = useState("");
    const [newUserName, setNewUserName] = useState("");

    const [email, setEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const [isEditUserName, setIsEditUserName] = useState(false);
    const [isEditEmail, setIsEditEmail] = useState(false);

    const getUserData = () => {
        return axiosServer.get(apiUrl.user.me)
            .then((response) => response.data)
            .then((response) => {
                setUserData(response.data);
                setUserName(response.data.userName);
                setNewUserName(response.data.userName);
                setEmail(response.data.email);
                setNewEmail(response.data.email);
            });
    };

    const handleChangeUserName = () => {

        toastEdit.current = toast.info("Updating...", toastConfig.loading);

        if (userName === newUserName) {
            toast.update(toastEdit.current, toastConfig.warning("Không có thay đổi nào?"));
            return setIsEditUserName(!isEditUserName);

        }

        axiosServer.put(apiUrl.user.changeUsername, { newUserName })
            .then((response) => response.data)
            .then((response) => {
                if (response.status === "success") {
                    toast.update(toastEdit.current, toastConfig.success(response.message));
                    setIsEditUserName(!isEditUserName);
                    setUserName(newUserName);
                } else {
                    toast.update(toastEdit.current, toastConfig.error(response.message));
                }
            })
            .catch((error) => {
                const { response } = error;
                toast.update(toastEdit.current, toastConfig.error(response.message));

            });
    };

    const handleSignOut = () => {
        removeCookie("refreshToken");
        removeCookie("accessToken");
        navigate(userUrl.auth.signIn);
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className={"w-full border-1 border-black/10 p-4 rounded-2xl flex flex-col gap-4"}>
            <header className={"flex items-center"}>
                <h6 className={classNames(classConfig.fontSize.h6, classConfig.textColor.secondary)}>Thông tin cá
                    nhân</h6>
            </header>
            <main className={"flex flex-col gap-4"}>
                <Form>
                    <FormBody>
                        <FormRow alignItems={"items-center"}>
                            <div className={"w-full flex items-center gap-2"}>
                                <p className={classNames(classConfig.textColor.gray)}>Username</p>
                                {
                                    isEditUserName ?
                                        <>
                                            <Input
                                                isRequired
                                                value={newUserName}
                                                onValueChange={setNewUserName}
                                                size={"lg"}
                                                variant={"bordered"}
                                            />
                                            <Button
                                                color={"success"}
                                                isIconOnly
                                                onClick={handleChangeUserName}
                                            >
                                                {iconConfig.confirm.base}
                                            </Button>
                                            <Button
                                                color={"danger"}
                                                isIconOnly
                                                onClick={() => setIsEditUserName(!isEditUserName)}
                                            >
                                                {iconConfig.cancel.base}
                                            </Button>
                                        </> :
                                        <>
                                            <Input
                                                isRequired
                                                value={userName ?? ""}
                                                size={"lg"}
                                            />
                                            <Button
                                                color={"warning"}
                                                isIconOnly
                                                onClick={() => setIsEditUserName(!isEditUserName)}
                                            >
                                                {iconConfig.edit.base}
                                            </Button>
                                        </>
                                }
                            </div>
                        </FormRow>
                    </FormBody>
                </Form>
                <div className={"flex justify-end"}>
                    <Button
                        variant={"flat"}
                        color={"danger"}
                        onClick={handleSignOut}
                    >
                        Đăng xuất
                    </Button>
                </div>
            </main>
        </div>
    );
}

export default InformationBlock;