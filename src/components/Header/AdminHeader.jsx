import React from "react";
import classConfig from "../../utils/config/class.config.js";
import {Button, ButtonGroup, Input} from "@nextui-org/react";
import {RiSearchLine} from "react-icons/ri";
import classNames from "classnames";
import {useLocation, useNavigate} from "react-router-dom";
import {adminUrl} from "../../utils/config/route.config.js";

function AdminHeader(props) {
    const {pathname} = useLocation();

    const navigate = useNavigate();

    const listNavigateButtons = [
        {
            label: "Tổng quan",
            value: "dashboard",
            href: adminUrl.dashboard.index
        }, {
            label: "Người dùng",
            value: "users",
            href: adminUrl.user.index
        },
        {
            label: "Danh mục",
            value: "categories",
            href: adminUrl.category.index
        },
        {
            label: "Sản phẩm",
            value: "products",
            href: adminUrl.product.index
        },
        {
            label: "Đơn hàng",
            value: "orders",
            href: adminUrl.order.index
        }, {
            label: "Mã giảm giá",
            value: "vouchers",
            href: adminUrl.voucher.index
        }

    ];

    const handleNavigateTo = (href) => {
        return navigate(href);
    };

    const handleNavigateToHome = () => {
        return navigate("/");
    };

    return (
        <div className={"w-full flex flex-col items-center gap-8"}>
            <div className={"w-full bg-slate-100 flex justify-center"}>
                <div className={"w-full max-w-7xl flex items-center justify-between py-2 gap-8"}>
                    <div className={"flex items-center gap-12"} onClick={handleNavigateToHome}>
                        <div className={"cursor-pointer"}>
                            <h1 className={classNames(classConfig.fontSize.h1, classConfig.textColor.primary, "!text-4xl")}>hieutn.dev</h1>
                        </div>
                    </div>
                    <div className={"flex items-center gap-12"}>
                        <div className={"cursor-pointer "}>
                            <h1 className={classNames(classConfig.fontSize.h3, classConfig.textColor.primary, "font-extrabold")}>Admin
                                Navigation</h1>
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
            </div>
            <div className={"w-full max-w-7xl"}>
                <ButtonGroup>
                    {listNavigateButtons.map((button) =>
                        <Button key={button.value}
                                color={pathname.includes(button.href) ? "primary" : "default"}
                                onClick={() => handleNavigateTo(button.href)}>
                            {button.label}
                        </Button>)}
                </ButtonGroup>
            </div>
        </div>

    );
}

export default AdminHeader;