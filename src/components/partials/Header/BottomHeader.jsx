import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import classConfig from "../../../utils/config/class.config.js";
import {Input} from "@nextui-org/react";
import {RiSearchLine} from "react-icons/ri";

function BottomHeader(props) {
    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        return navigate('/');
    }

    return (
        <div className={"w-full max-w-7xl flex items-center justify-between py-2 gap-8"}>
            <div className={"flex items-center gap-12"}>
                <div className={"cursor-pointer "} onClick={handleNavigateToHome}>
                    <h1 className={"text-4xl font-bold text-off-blue"}>hieutn.dev</h1>
                </div>
                <div className={"flex items-center gap-4"}>
                    <NavLink className={({isActive}) =>
                        [
                            "text-xl",
                            isActive ? classConfig.nav.active : classConfig.nav.inactive,
                        ].join(" ")
                    } to={"/"}>Trang chủ</NavLink>
                    <NavLink className={({isActive}) =>
                        [
                            "text-xl",
                            isActive ? classConfig.nav.active : classConfig.nav.inactive,
                        ].join(" ")
                    } to={"/shop"}>Cửa hàng</NavLink>
                    <NavLink className={({isActive}) =>
                        [
                            "text-xl",
                            isActive ? classConfig.nav.active : classConfig.nav.inactive,
                        ].join(" ")
                    } to={"/blogs"}>Blog</NavLink>
                    <NavLink className={({isActive}) =>
                        [
                            "text-xl",
                            isActive ? classConfig.nav.active : classConfig.nav.inactive,
                        ].join(" ")
                    } to={"/contact"}>Liên hệ</NavLink>
                    <NavLink className={({isActive}) =>
                        [
                            "text-xl",
                            isActive ? classConfig.nav.active : classConfig.nav.inactive,
                        ].join(" ")
                    } to={"/contract"}>Chính sách</NavLink>
                </div>
            </div>
            <div className={"flex items-center"}>
                <Input type={"text"}
                       placeholder={"Search ..."}
                       startContent={<RiSearchLine size={classConfig.icon.large}/>}
                       variant={"bordered"}
                />
            </div>
        </div>

    );
}

export default BottomHeader;