import {useEffect, useRef, useState} from "react";
import TabHeader from "../../components/Tab/TabHeader.jsx";
import {IoArrowBack} from "react-icons/io5";
import {userUrl} from "../../utils/config/route.config.js";

import FormRow from "../../components/Form/FormRow.jsx";
import {Button, Divider, Input} from "@nextui-org/react";
import Form from "../../components/Form/Form.jsx";
import AddressBlock from "../../components/Address/AddressBlock.jsx";
import {toast} from "react-toastify";
import toastConfig from "../../utils/config/toast.config.js";
import {useSearchParams} from "react-router-dom";
import AddressStep from "./AddressStep.jsx";
import BillingStep from "./BillingStep.jsx";
import CompleteOrder from "./CompleteOrder.jsx";

CartCheckout.propTypes = {};

function CartCheckout(props) {

    const [searchParams, setSearchParams] = useSearchParams();

    const [step, setStep] = useState("1");

    useEffect(() => {
        console.log(searchParams.get("step") ?? "1");
        setStep(searchParams.get("step") ?? "1");

    }, [searchParams]);

    return (
        <>
            {step === "1" && <AddressStep onNextStep={setSearchParams}/>}
            {step === "2" && <BillingStep onNextStep={setSearchParams}/>}
            {step === "3" && <CompleteOrder/>}
        </>
    );
}

export default CartCheckout;
