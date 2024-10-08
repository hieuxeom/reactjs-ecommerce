import React, { useEffect, useState } from "react";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import Form from "../../components/Form/Form.jsx";
import FormRow from "../../components/Form/FormRow.jsx";
import { Button, Divider, Input } from "@nextui-org/react";
import PropTypes from "prop-types";
import useAxiosServer from "../../hooks/useAxiosServer.js";
import { apiUrl } from "../../utils/config/api.config.js";

CartSummary.propTypes = {
    summaryData: PropTypes.shape({
        subTotalPrice: PropTypes.number,
        voucherCode: PropTypes.string,
        shippingFee: PropTypes.number,
        reducedFee: PropTypes.number
    })
};

function CartSummary({ summaryData, onApplyVoucher }) {

    const axiosServer = useAxiosServer();

    const [voucherCode, setVoucherCode] = useState("");

    const handleApplyVoucher = () => {
        axiosServer.put(apiUrl.cart.voucher, {
            voucherCode,
            subTotalPrice: summaryData.subTotalPrice
        }).then((response) => {
            onApplyVoucher(true);
        });
    };

    useEffect(() => {
        setVoucherCode(summaryData?.voucherCode ?? "");
    }, [summaryData]);

    useEffect(() => {
        console.log(voucherCode);
    }, [voucherCode]);

    return (
        <div className={"shadow-custom p-4 flex flex-col gap-4"}>
            <header>
                <h5 className={classNames(classConfig.fontSize.h5, "!font-bold text-secondary")}>Tổng thanh toán</h5>
            </header>
            <main className={"flex flex-col gap-4"}>
                <div className={"flex justify-between"}>
                    <p>Tạm tính</p>
                    <p>{summaryData?.subTotalPrice.toFixed(2) ?? 0}$</p>
                </div>
                <div className={"flex justify-between"}>
                    <p>Phí vận chuyển</p>
                    <p className={classNames({
                        "text-danger": summaryData?.shippingFee !== 2
                    })}>{summaryData?.shippingFee ?? 2}$</p>
                </div>
                <div className={"flex justify-between"}>
                    <p>Giảm giá</p>
                    <p className={classNames({
                        "text-danger": summaryData?.reducedFee > 0
                    })}>{summaryData?.reducedFee > 0 && "-"}{summaryData?.reducedFee.toFixed(2) ?? 0}$</p>
                </div>
                <Form>
                    <FormRow>
                        <Input placeholder={"Mã giảm giá"}
                               value={voucherCode}
                               onValueChange={setVoucherCode}
                               endContent={
                                   <Button size={"sm"}
                                           color={"secondary"}
                                           onClick={handleApplyVoucher}
                                   >
                                       Sử dụng
                                   </Button>}
                        />

                    </FormRow>
                </Form>

                <Divider/>
                <div className={"flex justify-between"}>
                    <p className={classNames(classConfig.fontSize.h5, "!font-bold  text-secondary")}>Tổng thanh toán</p>
                    <p className={classNames(classConfig.fontSize.h5, "!font-bold text-secondary")}>{summaryData?.totalPrice?.toFixed(2) ?? 0}$</p>
                </div>
            </main>
        </div>
    );
}

export default CartSummary;