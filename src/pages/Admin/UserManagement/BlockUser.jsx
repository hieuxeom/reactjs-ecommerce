import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import TabHeader from "../../../components/Tab/TabHeader.jsx";
import { trimString } from "../../../utils/string.js";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Textarea } from "@nextui-org/react";
import iconConfig from "../../../utils/config/icon.config.jsx";
import { toast } from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { adminUrl } from "../../../utils/config/route.config.js";

BlockUser.propTypes = {};

function BlockUser(props) {

    const { userId } = useParams();
    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const toastActivation = useRef(null);

    const [blockReason, setBlockReason] = useState("");

    const handleBlock = () => {
        toastActivation.current = toast.info("Blocking...", toastConfig.loading);
        return axiosServer.put(apiUrl.user.activation(userId), {
            isActive: false,
            blockReason: {
                blockTime: Date.now(),
                reason: blockReason
            }
        })
            .then((response) => response.data)
            .then((response) => {
                toast.update(toastActivation.current, toastConfig.success("Successfully Blocked"));
                navigate(adminUrl.user.index);
            })
            .catch((error) => {
                const { response } = error;
                console.log(response);
            });
    };

    useEffect(() => {
        console.log(userId);
    }, []);

    return (
        <div className={"w-full max-w-7xl flex flex-col justify-center gap-4"}>
            <TabHeader tabTitle={`Khóa tài khoản #${trimString(userId ?? "-") ?? "-"}`}/>
            <div className={"w-full flex flex-col gap-4"}>
                <Textarea value={blockReason}
                          onValueChange={setBlockReason}
                          label={"Lí do khóa tài khoản"}
                          labelPlacement={"outside"}
                          variant={"bordered"}
                />
                <div>
                    <Button color={"danger"}
                            startContent={iconConfig.block.large}
                            onClick={handleBlock}
                    >
                        Khóa tài khoản
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BlockUser;