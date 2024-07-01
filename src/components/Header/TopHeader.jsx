import React, {useEffect, useState} from "react";
import {MdEmail, MdPhone} from "react-icons/md";
import {Avatar, Button, Select, SelectItem} from "@nextui-org/react";
import {US, VN} from "country-flag-icons/react/3x2";
import {PiSignInBold} from "react-icons/pi";
import classConfig from "../../utils/config/class.config.js";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {FaShoppingCart, FaUserAlt} from "react-icons/fa";

function TopHeader(props) {

    const [cookies] = useCookies(["refreshToken"]);

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const {refreshToken} = cookies;
        setIsLogin(!!refreshToken);
    }, [cookies]);

    const navigate = useNavigate();

    const languageSelectData = [
        {
            label: "Vietnam",
            value: "vietnam",
            icon: <VN className={"w-6"}/>
        },
        {
            label: "English",
            value: "english",
            icon: <US className={"w-6"}/>
        }
    ];

    const handleNavigateToSignIn = () => {
        return navigate("/sign-in");
    };

    const handleNavigateToProfile = () => {
        return navigate("/profile/me");
    };

    const handleNavigateToCart = () => {
        return navigate("/cart");
    };

    return (
        <div className={"w-full flex justify-center bg-purple py-2"}> {/* Top Header */}
            <div className={"w-full max-w-7xl flex items-center justify-between text-white"}>
                {/* Header - Left Side */}
                <div className={"flex items-center gap-8"}>
                    <div className={"flex items-center gap-2"}>
                        <MdEmail/>
                        <p className={"text-white font-semibold"}>hieutn.bedev@gmail.com</p>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        <MdPhone/>
                        <p className={"text-white font-semibold"}>0388 406 JQK</p>
                    </div>
                </div>

                {/* Header - Right Side */}
                <div className={"w-1/2 flex items-center justify-end gap-4"}>
                    <Select items={languageSelectData}
                            defaultSelectedKeys={["vietnam"]}

                            labelPlacement={"outside-left"}
                            className="max-w-[250px] flex items-center"
                            renderValue={(items) => {
                                return items.map((item) => (
                                    <div key={item.data?.value} className={"flex items-center gap-4"}>
                                        {item.data?.icon}
                                        {item.data?.label}
                                    </div>
                                ));
                            }}
                    >
                        {(lang) => (
                            <SelectItem className={"max-w-2xl"} key={lang.value} textValue={lang.label}>
                                <div className={"flex items-center gap-4"}>
                                    {lang.icon}
                                    {lang.label}
                                </div>
                            </SelectItem>
                        )}
                    </Select>
                    {!isLogin ? <Button startContent={<PiSignInBold size={classConfig.icon.large}/>}
                                        variant={"solid"}
                                        color={"primary"}
                                        onClick={handleNavigateToSignIn}
                        >Login</Button> :
                        <>
                            <Button isIconOnly
                                    variant={"light"}
                                    onClick={handleNavigateToCart}
                            >
                                <FaShoppingCart size={classConfig.icon.base} className={"text-white"}/>
                            </Button>
                            <Avatar icon={<FaUserAlt size={classConfig.icon.base}/>}
                                    className={"bg-white cursor-pointer hover:bg-sky-blue transition-all duration-300"}
                                    onClick={handleNavigateToProfile}

                            />
                        </>
                    }

                </div>
            </div>
        </div>
    )
        ;
}

export default TopHeader;