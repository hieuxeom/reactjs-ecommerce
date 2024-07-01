import React, {useState} from "react";
import TabHeader from "../../components/Tab/TabHeader.jsx";
import {IoArrowBack} from "react-icons/io5";
import {userUrl} from "../../utils/config/route.config.js";

import FormRow from "../../components/Form/FormRow.jsx";
import {Divider, Input} from "@nextui-org/react";
import Form from "../../components/Form/Form.jsx";
import AddressBlock from "../../components/Address/AddressBlock.jsx";

CartCheckout.propTypes = {};

function CartCheckout(props) {

    const [fullAddress, setFullAddress] = useState(" ");

    return (
        <div className="w-full max-w-7xl mt-8 flex flex-col gap-6">
            <TabHeader tabTitle={"Thông tin thanh toán"} buttonData={{
                label: "Quay lại",
                icon: <IoArrowBack/>,
                urlBack: userUrl.cart.base
            }}/>
            <section>
                <Form>
                    <FormRow>
                        <Input variant={"bordered"}
                               label={"Full Name"}
                               labelPlacement={"outside"}
                               size={"lg"}
                               isRequired

                        />
                        <Input variant={"bordered"}
                               label={"Phone Number"}
                               labelPlacement={"outside"}
                               size={"lg"}
                               isRequired

                        />
                        <Input variant={"bordered"}
                               label={"Email"}
                               labelPlacement={"outside"}
                               size={"lg"}
                               isRequired

                        />
                    </FormRow>
                    <FormRow>
                        <Input variant={"flat"}
                               label={"Full Address"}
                               size={"lg"}
                               value={fullAddress}
                               isRequired
                               isReadOnly
                        />
                    </FormRow>
                    <Divider/>
                    <FormRow>
                        <AddressBlock onChange={setFullAddress}/>
                    </FormRow>
                </Form>
            </section>
        </div>
    );
}

export default CartCheckout;