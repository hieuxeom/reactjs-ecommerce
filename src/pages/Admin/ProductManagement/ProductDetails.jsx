import React, {useEffect, useRef, useState} from "react";
import useAxios from "../../../hooks/useAxios.js";
import {apiUrl, imageUrl} from "../../../utils/config/api.config.js";
import Form from "../../../components/Form/Form.jsx";
import FormHeader from "../../../components/Form/FormHeader.jsx";
import {adminUrl} from "../../../utils/config/route.config.js";
import FormBody from "../../../components/Form/FormBody.jsx";
import FormItem from "../../../components/Form/FormItem.jsx";
import classConfig from "../../../utils/config/class.config.js";
import {Avatar, Checkbox, Chip, Input} from "@nextui-org/react";
import FormRow from "../../../components/Form/FormRow.jsx";
import classNames from "classnames";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import {LiaDollarSignSolid} from "react-icons/lia";

function ProductDetails(props) {
    const toastFetch = useRef(null);

    const axiosClient = useAxios();

    const {productId} = useParams();

    const [productDetails, setProductDetails] = useState();

    const getProductDetails = () => {
        toastFetch.current = toast.info("Fetching...", toastConfig.loading);
        return axiosClient.get(apiUrl.product.details(productId)).then((response) => {

            if (response.data.status === "success") {
                setProductDetails(response.data.data);
                toast.update(toastFetch.current, toastConfig.success(response.data.message));
            }
        }).catch((error) => {
            const {response} = error;
            toast.update(toastFetch.current, toastConfig.error(response.data.message));
        });
    };

    useEffect(() => {
        getProductDetails();
    }, []);

    return (<div className={"w-full max-w-7xl"}>
            <Form>
                <FormHeader formTitle={"Chi tiết sản phẩm"} urlBack={adminUrl.product.index}/>
                <FormBody>
                    <FormItem>
                        <p className={classConfig.fontSize.inputLabel}>Tên sản phẩm</p>
                        <Input type="text"
                               size={"lg"}
                               variant={"flat"}
                               radius={"sm"}
                               value={productDetails?.productName}
                        />
                    </FormItem>
                    <FormRow alignItems={"items-center"}>
                        <FormItem>
                            <p className={classConfig.fontSize.inputLabel}>Giá sản phẩm</p>
                            <Input type="text"
                                   size={"lg"}
                                   radius={"sm"}
                                   value={productDetails?.productPrice}
                                   isReadOnly
                            />
                        </FormItem>
                        <FormItem>
                            <Checkbox isSelected={productDetails?.isDiscount}
                                      size={"lg"}
                                      color={"primary"}
                                      isReadOnly
                            >
                                Giảm giá
                            </Checkbox>
                            <Input type="text"
                                   size={"lg"}
                                   radius={"sm"}
                                   value={productDetails?.discountPercents}
                                   isReadOnly
                            />
                        </FormItem>
                        <FormItem>
                            <p className={classConfig.fontSize.inputLabel}>Danh mục sản phẩm</p>
                            <Chip color={"primary"} variant={"flat"}>{productDetails?.productCategory}</Chip>
                        </FormItem>
                        <Checkbox isSelected={productDetails?.isActive}
                                  size={"lg"}
                                  className={"w-full"}
                                  color={"primary"}
                        >
                            Hoạt động?
                        </Checkbox>
                    </FormRow>
                    <FormRow>
                        <FormItem>
                            <div className={"w-full flex items-center justify-between"}>
                                <p className={classConfig.fontSize.inputLabel}>Các biến thể</p>
                                <div className={"flex items-center gap-4"}>
                                    <p className={classNames({
                                        "text-danger": productDetails?.productVariants.length === 10
                                    })}>({productDetails?.productVariants.length}/10)</p>
                                </div>
                            </div>
                            <div className={"w-full flex flex-col gap-4"}>
                                {productDetails && productDetails?.productVariants.map((variant, index) => {

                                    return (<FormRow alignItems={"items-end"} key={index}>
                                        <FormItem width={"min-w-max"}>
                                            <p className={classConfig.fontSize.subLabel}>Hình ảnh</p>
                                            <Avatar isBordered radius={"sm"}
                                                    size={"lg"}
                                                    color={"default"}
                                                    src={`${imageUrl}${variant.variantImage}`}/>
                                        </FormItem>
                                        <FormItem>
                                            <p className={classConfig.fontSize.subLabel}>
                                                Mã biến thể
                                            </p>
                                            <Input size={"lg"}
                                                   radius={"sm"}
                                                   value={variant.variantKey}
                                                   isReadOnly
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <p className={classConfig.fontSize.subLabel}>
                                                Tên biến thể
                                            </p>
                                            <Input size={"lg"}
                                                   radius={"sm"}
                                                   value={variant.variantLabel}
                                                   isReadOnly
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <p className={classConfig.fontSize.subLabel}>
                                                Số lượng trong kho
                                            </p>
                                            <Input size={"lg"}
                                                   radius={"sm"}
                                                   value={variant.variantStock}
                                                   isReadOnly
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <div className={"flex items-center gap-2"}>
                                                <Input size={"lg"}
                                                       label={"Giá gốc"}
                                                       labelPlacement={"outside"}
                                                       endContent={<LiaDollarSignSolid/>}
                                                       radius={"sm"}
                                                       value={variant.variantPrice.originalPrice}
                                                       isReadOnly
                                                />
                                                <Input size={"lg"}
                                                       label={"Giá khuyến mãi"}
                                                       labelPlacement={"outside"}
                                                       endContent={<LiaDollarSignSolid/>}
                                                       radius={"sm"}
                                                       value={variant.variantPrice.discountPrice}
                                                       isReadOnly
                                                />
                                            </div>
                                        </FormItem>
                                    </FormRow>);
                                })}
                            </div>
                        </FormItem>
                    </FormRow>

                </FormBody>
            </Form>
        </div>
    );
}

export default ProductDetails;