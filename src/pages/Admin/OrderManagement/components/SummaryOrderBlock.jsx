import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classConfig from "../../../../utils/config/class.config.js";
import {Chip, Divider} from "@nextui-org/react";
import {getOrderStatusVariant} from "../../../../utils/dataDefault/orderStatus.js";

SummaryOrderBlock.propTypes = {
    summaryOrder: PropTypes.shape({
        totalPrice: PropTypes.number,
        subTotalPrice: PropTypes.number,
        reducedFee: PropTypes.number,
        shippingFee: PropTypes.number,
        orderStatus: PropTypes.string,
        voucherCode: PropTypes.string
    })
};

function SummaryOrderBlock({summaryOrder}) {
    return (
        <div className={"w-full flex flex-col gap-4 shadow-custom p-4 rounded-2xl"}>
            <div className={"w-full flex justify-between"}>
                <h5 className={classNames(classConfig.fontSize.h5, classConfig.textColor.secondary)}>
                    Thông tin đơn hàng
                </h5>
                <Chip variant={"flat"}
                      color={getOrderStatusVariant(summaryOrder?.orderStatus)?.tagColor}>
                    {getOrderStatusVariant(summaryOrder?.orderStatus)?.label}
                </Chip>
            </div>
            {summaryOrder && <div className={"flex flex-col gap-4"}>
                <div className={"flex justify-between"}>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                        Tiền hàng
                    </p>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.default, "font-semibold")}>
                        {summaryOrder?.subTotalPrice?.toFixed(2) ?? 0}$
                    </p>
                </div>
                <div className={"flex justify-between"}>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                        Phí vận chuyển
                    </p>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.default, "font-semibold")}>
                        {summaryOrder?.shippingFee.toFixed(2) ?? 0}$
                    </p>
                </div>
                <div className={"flex justify-between"}>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                        Giảm giá
                    </p>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.default, "font-semibold")}>
                        {summaryOrder?.reducedFee.toFixed(2) ?? 0}$
                    </p>
                </div>
                <div className={"flex justify-between"}>
                    <p className={classNames(classConfig.fontSize.sub, classConfig.textColor.gray)}>
                        Mã giảm giá
                    </p>
                    {summaryOrder?.voucherCode ?
                        <Chip variant={"flat"}
                              color={"secondary"}
                              radius={"sm"}
                        >{summaryOrder?.voucherCode ?? ""}</Chip>
                        : <p className={"italic"}>Không dùng mã</p>}
                </div>
                <Divider/>
                <div className={"flex justify-between"}>
                    <h6 className={classNames(classConfig.fontSize.h6, classConfig.textColor.gray)}>
                        Tổng đơn hàng
                    </h6>
                    <h6 className={classNames(classConfig.fontSize.h6, classConfig.textColor.secondary, "!font-bold")}>
                        {summaryOrder?.totalPrice.toFixed(2) ?? 0}$
                    </h6>
                </div>
            </div>}
        </div>
    );
}

export default SummaryOrderBlock;