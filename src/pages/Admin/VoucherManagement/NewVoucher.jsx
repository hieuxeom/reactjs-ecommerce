import React, { useRef, useState } from "react";
import { adminUrl } from "../../../utils/config/route.config.js";
import Form from "../../../components/Form/Form.jsx";
import FormRow from "../../../components/Form/FormRow.jsx";

import FormHeader from "../../../components/Form/FormHeader.jsx";
import FormBody from "../../../components/Form/FormBody.jsx";
import { Button, Checkbox, Input, RangeCalendar, Select, SelectItem, Textarea } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import { toast } from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";

NewVoucher.propTypes = {};

function NewVoucher(props) {

    const toastSubmit = useRef(null);

    const axiosServer = useAxiosServer();

    const typeOfVoucher = [
        {
            label: "Vận chuyển",
            key: "shipping",
            value: "shipping"
        },
        {
            label: "Đơn hàng",
            key: "billing",
            value: "billing"
        }
    ];

    const [voucherCode, setVoucherCode] = useState("");
    const [discountPercents, setDiscountPercents] = useState(0);
    const [description, setDescription] = useState("");
    const [validRangeTime, setValidRangeTime] = useState({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ days: 4 })
    });

    const [minimumOrderValue, setMinimumOrderValue] = useState(0);
    const [type, setType] = useState(typeOfVoucher[0].key);
    const [isActive, setIsActive] = useState(true);
    const [maxUsage, setMaxUsage] = useState(0);

    const handleSubmit = () => {

        toastSubmit.current = toast.info("Submitting...", toastConfig.loading);

        const voucherData = {
            voucherCode,
            discountPercents,
            description,
            validFrom: validRangeTime.start.toDate(),
            validTo: validRangeTime.end.toDate(),
            type,
            minimumOrderValue,
            maxUsage,
            isActive
        };

        axiosServer.post(apiUrl.voucher.new, voucherData).then((response) => {
            if (response.data.status === "success") {
                toast.update(toastSubmit.current, toastConfig.success(response.data.message));
            }
        }).catch((error) => {
            const { response } = error;
            console.log(response);
            toast.update(toastSubmit.current, toastConfig.error(response.data.message));
        });

    };

    return (
        <div className={"w-full max-w-7xl flex flex-col gap-4"}>
            <Form>
                <FormHeader formTitle={"Mã giảm giá mới"} urlBack={adminUrl.voucher.index}/>
                <FormBody>
                    <FormRow>
                        <Input label={"Mã"}
                               labelPlacement={"outside"}
                               size={"lg"}
                               variant={"bordered"}
                               value={voucherCode}
                               onValueChange={setVoucherCode}
                               isRequired
                        />
                        <Input label={"% Giảm"}
                               labelPlacement={"outside"}
                               size={"lg"}
                               variant={"bordered"}
                               value={discountPercents}
                               onValueChange={setDiscountPercents}
                               isRequired
                        />
                        <Input label={"Giá trị tối thiểu"}
                               labelPlacement={"outside"}
                               size={"lg"}
                               variant={"bordered"}
                               value={minimumOrderValue}
                               onValueChange={setMinimumOrderValue}
                               isRequired
                        />
                        <Select items={typeOfVoucher}
                                aria-label={"Select type of voucher"}
                                label={"Loại mã"}
                                labelPlacement={"outside"}
                                selectedKeys={[type]}
                                onSelectionChange={setType}
                                size={"lg"}
                                isRequired
                        >
                            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                        </Select>
                    </FormRow>
                    <FormRow>
                        <Textarea
                            variant="bordered"
                            label="Mô tả"
                            labelPlacement="outside"
                            value={description}
                            onValueChange={setDescription}
                            isRequired
                        />
                    </FormRow>
                    <FormRow>
                        <div className={"w-full"}>
                            <RangeCalendar aria-label="voucher valid range time "
                                           value={validRangeTime}
                                           onChange={setValidRangeTime}
                                           visibleMonths={3}
                            />
                        </div>
                        <div className={"w-full flex items-start justify-between"}>
                            <div className={"flex flex-col gap-4"}>
                                <Input label={"Lượt sử dụng tối đa"}
                                       labelPlacement={"outside"}
                                       size={"lg"}
                                       variant={"bordered"}
                                       value={maxUsage}
                                       onValueChange={setMaxUsage}
                                       isRequired
                                />
                                <Checkbox isSelected={isActive} onValueChange={setIsActive}>Hoạt động?</Checkbox>
                            </div>
                            <Button color={"primary"}
                                    size={"lg"}
                                    onClick={handleSubmit}
                            >
                                Tạo mã
                            </Button>
                        </div>
                    </FormRow>
                </FormBody>

            </Form>
        </div>
    );
}

export default NewVoucher;