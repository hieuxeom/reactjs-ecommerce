import React, {useState} from "react";
import {Button, Input} from "@nextui-org/react";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import useAxios from "../../../hooks/useAxios.js";
import {apiUrl} from "../../../utils/config/api.config.js";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

function SignIn(props) {

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["refreshToken"]);
    const axiosClient = useAxios();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitLogin = () => {
        const credentialData = {
            email,
            password
        };
        axiosClient.post(apiUrl.auth.signIn, credentialData).then((response) => {
            const {
                refreshToken,
                accessToken
            } = response.data.data;
            console.log(60 * 60 * 24 * 30);
            setCookie("refreshToken", refreshToken, {path: "/", maxAge: 60 * 60 * 24 * 30});
            setCookie("accessToken", accessToken, {path: "/", maxAge: 10});
        }).finally(() => {
            navigate("/");
        });
    };

    return (
        <section className={"w-full flex justify-center gap-4 mt-12"}>
            <form className={"min-w-[25vw] border-2 border-black/10 p-8 flex flex-col gap-4 rounded-xl"}>
                <h3 className={classNames(classConfig.fontSize.h3, classConfig.textVariant.title, "capitalize")}>Login.</h3>
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
                    <p>Password</p>
                    <Input
                        size={"lg"}
                        type="password"
                        value={password}
                        onValueChange={setPassword}
                        variant={"bordered"}
                        radius={"sm"}
                    />
                </div>
                <div>
                    <Button onClick={handleSubmitLogin} fullWidth={true} size={"lg"} color={"primary"}>Login</Button>
                </div>
            </form>
        </section>
    );
}

export default SignIn;