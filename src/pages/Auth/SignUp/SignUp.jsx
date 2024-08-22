import React, { useRef, useState } from "react";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import { Button, Input } from "@nextui-org/react";
import { toast } from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import { useNavigate } from "react-router-dom";
import { userUrl } from "../../../utils/config/route.config.js";

function SignUp(props) {

    const navigate = useNavigate();

    const toastSignUp = useRef(null);

    const axiosServer = useAxiosServer();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handleSubmitSignUp = () => {
        toastSignUp.current = toast.info("Creating...", toastConfig.loading);
        if (password !== rePassword) {
            toast.update(toastSignUp.current, toastConfig.error("Password doesn't match"));
        }

        return axiosServer.post(apiUrl.auth.signUp, {
            userName,
            email,
            password
        })
            .then((response) => response.data)
            .then((response) => {
                return toast.update(toastSignUp.current, toastConfig.success(response.message, () => navigate(userUrl.auth.signIn)));
            })
            .catch((error) => {
                const { response } = error;
                return toast.update(toastSignUp.current, toastConfig.error(response.data.message));

            });

    };

    return (
        <section className={"w-full flex justify-center gap-4 mt-12"}>
            <form className={"min-w-[25vw] border-2 border-black/10 p-8 flex flex-col gap-4 rounded-xl"}>
                <h3 className={classNames(classConfig.fontSize.h3, classConfig.textVariant.title, "capitalize")}>Login.</h3>
                <div className={"flex flex-col gap-2"}>
                    <p>Tên người dùng</p>
                    <Input
                        size={"lg"}
                        type="text"
                        value={userName}
                        onValueChange={setUserName}
                        variant={"bordered"}
                        radius={"sm"}

                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <p>Email</p>
                    <Input
                        size={"lg"}
                        type="email"
                        value={email}
                        onValueChange={setEmail}
                        variant={"bordered"}
                        radius={"sm"}

                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <p>Mật khẩu</p>
                    <Input
                        size={"lg"}
                        type="password"
                        value={password}
                        onValueChange={setPassword}
                        variant={"bordered"}
                        radius={"sm"}
                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <p>Nhập lại mật khẩu</p>
                    <Input
                        size={"lg"}
                        type="password"
                        value={rePassword}
                        onValueChange={setRePassword}
                        variant={"bordered"}
                        radius={"sm"}
                    />
                </div>
                <div>
                    <Button onClick={handleSubmitSignUp} fullWidth={true} size={"lg"} color={"primary"}>Đăng kí</Button>
                </div>
            </form>
        </section>
    );
}

export default SignUp;