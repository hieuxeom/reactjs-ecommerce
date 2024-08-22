import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import AddressStep from "./AddressStep.jsx";
import BillingStep from "./BillingStep.jsx";
import CompleteOrder from "./CompleteOrder.jsx";

CartCheckout.propTypes = {};

function CartCheckout(props) {

    const [searchParams, setSearchParams] = useSearchParams();

    const [step, setStep] = useState("1");

    useEffect(() => {
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
