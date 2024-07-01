import React, {useEffect, useState} from "react";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import Form from "../../components/Form/Form.jsx";
import FormRow from "../../components/Form/FormRow.jsx";
import {Button, Divider, Input} from "@nextui-org/react";
import PropTypes from "prop-types";

CartSummary.propTypes = {
    summaryData: PropTypes.shape({
        subTotal: PropTypes.number,
        voucherCode: PropTypes.string,
        shippingFee: PropTypes.number,
        reducedFee: PropTypes.number
    })
};

function CartSummary({summaryData}) {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const {subTotal, voucherCode, shippingFee, reducedFee} = summaryData;
        setTotal(subTotal + shippingFee - reducedFee);
    }, []);

    return (
        <div className={"shadow-custom p-4 flex flex-col gap-4"}>
            <header>
                <h5 className={classNames(classConfig.fontSize.h5, "text-secondary")}>Tổng thanh toán</h5>
            </header>
            <main className={"flex flex-col gap-4"}>
                <div className={"flex justify-between"}>
                    <p>Tạm tính</p>
                    <p>{summaryData.subTotal.toFixed(2)}$</p>
                </div>
                <div className={"flex justify-between"}>
                    <p>Phí ship</p>
                    <p>{summaryData.shippingFee}$</p>
                </div>
                <div className={"flex justify-between"}>
                    <p>Giảm giá</p>
                    <p>{summaryData.reducedFee}$</p>
                </div>
                <Form>
                    <FormRow>
                        <Input placeholder={"Mã giảm giá"}/>
                        <Button color={"secondary"}>Sử dụng</Button>
                    </FormRow>
                </Form>

                <Divider/>
                <div className={"flex justify-between"}>
                    <p className={classNames(classConfig.fontSize.h5, "text-secondary")}>Tổng thanh toán</p>
                    <p className={classNames(classConfig.fontSize.h5, "text-secondary")}>{total.toFixed(2)}$</p>
                </div>
            </main>
        </div>
    );
}

export default CartSummary;