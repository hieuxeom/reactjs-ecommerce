import React, { useState } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import SideDirect from "./SideDirect.jsx";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import TabHeader from "../../components/Tab/TabHeader.jsx";
import classNames from "classnames";
import WarrantyPolicy from "./WarrantyPolicy.jsx";
import InstallmentPolicy from "./InstallmentPolicy.jsx";
import PrivatePolicy from "./PrivatePolicy.jsx";

PolicyIndex.propTypes = {};

function PolicyIndex(props) {

    const listPolicy = [
        {
            key: "warranty",
            label: "Chính sách bảo hành",
            element: <WarrantyPolicy/>
        },
        {
            key: "privacy",
            label: "Chính sách bảo mật",
            element: <PrivatePolicy/>
        },
        {
            key: "installment",
            label: "Chính sách trả góp",
            element: <InstallmentPolicy/>
        }
    ];

    const [currentPolicy, setCurrentPolicy] = useState("warranty");

    return (
        <section className={"w-full max-w-7xl flex flex-col mt-8 gap-4"}>
            <TabHeader tabTitle={"Chính sách"}/>
            <div className={"w-full flex gap-8"}>
                <div className={"min-w-max"}>
                    {listPolicy && listPolicy.map((policy) =>
                        <div key={policy.key}
                             className={classNames("text-xl transition-all duration-100 hover:border-l-4 hover:border-primary px-4 py-2", {
                                 "border-l-4 border-primary": policy.key === currentPolicy
                             })}
                             onClick={() => setCurrentPolicy(policy.key)}
                        >
                            {policy.label}
                        </div>)
                    }

                </div>
                <div className={"w-full px-4 py-2"}>
                    {listPolicy.find((policy) => policy.key === currentPolicy).element}
                </div>
            </div>
        </section>
    );
}

export default PolicyIndex;