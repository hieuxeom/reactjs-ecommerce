import React, {useEffect, useRef, useState} from "react";
import useAxios from "../../../hooks/useAxios.js";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import {apiUrl, imageUrl} from "../../../utils/config/api.config.js";
import Form from "../../../components/Form/Form.jsx";
import FormHeader from "../../../components/Form/FormHeader.jsx";
import {adminUrl} from "../../../utils/config/route.config.js";
import FormBody from "../../../components/Form/FormBody.jsx";
import FormItem from "../../../components/Form/FormItem.jsx";
import classConfig from "../../../utils/config/class.config.js";
import {Avatar, Button, Checkbox, Input, Select, SelectItem} from "@nextui-org/react";
import FormRow from "../../../components/Form/FormRow.jsx";
import classNames from "classnames";
import {IoMdAdd} from "react-icons/io";
import {FaXmark} from "react-icons/fa6";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import {LiaDollarSignSolid} from "react-icons/lia";
import {isNumber} from "../../../utils/checkNumber.js";
import iconConfig from "../../../utils/config/icon.config.jsx";

function EditProduct(props) {
    const axiosClient = useAxios();
    const axiosServer = useAxiosServer();

    const toastEdit = useRef(null);

    const {productId} = useParams();

    const [listCategories, setListCategories] = useState([]);
    const [fetchState, setFetchState] = useState(false);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("0");
    const [isDiscount, setIsDiscount] = useState(false);
    const [discountPercents, setDiscountPercents] = useState("0");
    const [productCategory, setProductCategory] = useState("");
    const [productVariants, setProductVariants] = useState(null);
    const [isActive, setIsActive] = useState(true);

    const getListCategories = () => {
        return axiosClient.get(apiUrl.category.all).then((response) => {
            let listCategories = response.data.data;
            setListCategories(listCategories);
            setProductCategory(listCategories[0].queryParams);
        });
    };

    const getProductDetails = () => {
        return axiosClient.get(apiUrl.product.details(productId)).then((response) => {
            const productDetails = response.data.data;

            setProductName(productDetails.productName);
            setProductPrice(productDetails.productPrice);
            setIsDiscount(productDetails.isDiscount);
            setDiscountPercents(productDetails.discountPercents);
            setProductCategory(productDetails.productCategory);
            setProductVariants(productDetails.productVariants);
            setIsActive(productDetails.isActive);

            setFetchState(true);
        });
    };

    useEffect(() => {
        getListCategories();
        getProductDetails();

    }, []);

    useEffect(() => {
        console.log(productVariants);
    }, [productVariants]);

    const handleVariantInputChange = (index, key, value) => {

        const newVariants = [...productVariants];

        newVariants[index][key] = value;
        setProductVariants(newVariants);

    };

    const handleVariantPriceChange = (index, value) => {
        const newVariants = [...productVariants];
        console.log(value);
        if (value.charAt(value.length - 1) === ".") {
            newVariants[index]["variantPrice"] = {
                originalPrice: value,
                discountPrice: value
            };
        } else {
            newVariants[index]["variantPrice"] = {
                originalPrice: value,
                discountPrice: isDiscount && discountPercents ? +value * (100 - +discountPercents) / 100 : +value
            };
        }
        setProductVariants(newVariants);
        handleUpdateRangePrice();
    };

    const handleAddNewVariantRow = () => {
        if (productVariants.length < 10) {
            const newListVariants = [...productVariants, {
                variantKey: "",
                variantLabel: "",
                variantImage: "",
                variantStock: 0,
                variantPrice: 0
            }];
            setProductVariants(newListVariants);
        }
    };

    const handleRemoveVariantRow = (index) => {
        if (productVariants.length > 1) {
            const newVariants = productVariants.filter((_, i) => i !== index);
            setProductVariants(newVariants);
        }
    };

    const handleParseFile = (index, event) => {

        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            reader.onload = () => {
                handleVariantInputChange(index, "variantImage", reader.result);
            };
        }
    };

    const handleUpdateRangePrice = () => {

        let [...tempProductVariants] = productVariants;

        const tempSort = tempProductVariants.sort((a, b) => a.variantPrice.discountPrice - b.variantPrice.discountPrice);

        const minPrice = tempSort[0].variantPrice.discountPrice;
        const maxPrice = tempSort[tempSort.length - 1].variantPrice.discountPrice;

        setProductPrice(minPrice !== maxPrice ? `${minPrice}$ - ${maxPrice}$` : `${minPrice}$`);
    };

    const handleSubmit = () => {

        toastEdit.current = toast.info("Updating...", toastConfig.loading);

        const submitData = {
            productName,
            productPrice,
            isDiscount,
            discountPercents,
            productCategory,
            productVariants,
            isActive
        };

        axiosServer.put(apiUrl.product.edit(productId), submitData).then((response) => {

            if (response.data.status === "success") {
                getProductDetails();
                toast.update(toastEdit.current, toastConfig.success(response.data.message));
            }
        }).catch((error) => {
            const {response} = error;
            toast.update(toastEdit.current, toastConfig.error(response.data.message));
        });
    };

    return (<div className={"w-full max-w-7xl"}>
            <Form>
                <FormHeader formTitle={"Sửa sản phẩm"} urlBack={adminUrl.product.index}/>
                <FormBody>
                    <FormItem>
                        <Input type="text"
                               size={"lg"}
                               radius={"sm"}
                               variant={"bordered"}
                               label={"Tên sản phẩm"}
                               labelPlacement={"outside"}
                               value={productName}
                               onValueChange={setProductName}
                               isRequired
                        />

                    </FormItem>
                    <FormRow alignItems={"items-center"}>
                        <FormItem>
                            <p className={classConfig.fontSize.inputLabel}>Giá sản phẩm</p>
                            <Input type="text"
                                   size={"lg"}
                                   radius={"sm"}
                                   variant={"bordered"}
                                   value={productPrice}
                                   isReadOnly
                            />
                        </FormItem>
                        <FormItem>
                            <Checkbox isSelected={isDiscount}
                                      onValueChange={setIsDiscount}
                                      size={"lg"}
                                      color={"primary"}
                            >
                                Giảm giá
                            </Checkbox>
                            <Input type="text"
                                   size={"lg"}
                                   radius={"sm"}
                                   variant={"bordered"}
                                   value={discountPercents}
                                   onValueChange={setDiscountPercents}
                                   isInvalid={!isNumber(discountPercents)}
                                   isDisabled={!isDiscount}
                            />
                        </FormItem>
                        <FormItem>
                            <p className={classConfig.fontSize.inputLabel}>Danh mục sản phẩm</p>
                            <Select items={listCategories}
                                    selectedKeys={[productCategory]}
                                    onSelectionChange={([event]) => {
                                        setProductCategory(event);
                                    }}
                                    aria-label={"Select product category"}
                                    disallowEmptySelection
                            >
                                {(category) => <SelectItem
                                    key={category.queryParams}>{category.categoryName}</SelectItem>}
                            </Select>
                        </FormItem>
                        <Checkbox isSelected={isActive}
                                  onValueChange={setIsActive}
                                  size={"lg"}
                                  className={"w-full"}
                                  color={"primary"}
                        >
                            Hoạt động?</Checkbox>
                    </FormRow>
                    <FormRow>
                        <FormItem>
                            <div className={"w-full flex items-center justify-between"}>
                                <p className={classConfig.fontSize.inputLabel}>Các biến thể</p>
                                <div className={"flex items-center gap-4"}>
                                    <p className={classNames({
                                        "text-danger": productVariants?.length === 10
                                    })}>({productVariants?.length}/10)</p>
                                    <Button isIconOnly color={"primary"}
                                            onClick={handleAddNewVariantRow}
                                    >{iconConfig.add.large}</Button>
                                </div>
                            </div>
                            <div className={"w-full flex flex-col gap-4"}>
                                {productVariants && productVariants.map((variant, index) => {
                                    return (<FormRow alignItems={"items-end"} key={index}>
                                        <FormItem width={"min-w-max"}>
                                            <Avatar isBordered radius={"sm"}
                                                    size={"lg"}
                                                    src={`${imageUrl}${variant.variantImage}`}/>
                                        </FormItem>
                                        <FormItem>
                                            <Input size={"lg"}
                                                   radius={"sm"}
                                                   variant={"bordered"}
                                                   label={"Mã biến thể"}
                                                   labelPlacement={"outside"}
                                                   value={variant.variantKey}
                                                   onValueChange={
                                                       (event) => handleVariantInputChange(index, "variantKey", event)}
                                                   isRequired
                                            />
                                        </FormItem>
                                        <FormItem>

                                            <Input size={"lg"}
                                                   radius={"sm"}
                                                   variant={"bordered"}
                                                   label={"Tên biến thể"}
                                                   labelPlacement={"outside"}
                                                   value={variant.variantLabel}
                                                   onValueChange={
                                                       (event) => handleVariantInputChange(index, "variantLabel", event)}
                                                   isRequired
                                            />
                                        </FormItem>
                                        <FormItem>

                                            <Input size={"lg"}
                                                   radius={"sm"}
                                                   variant={"bordered"}
                                                   label={"Số lượng"}
                                                   labelPlacement={"outside"}
                                                   value={variant.variantStock}
                                                   onValueChange={
                                                       (event) => handleVariantInputChange(index, "variantStock", event)}
                                                   isRequired
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <div className={"flex items-center gap-2"}>
                                                <Input size={"lg"}
                                                       radius={"sm"}
                                                       variant={"bordered"}
                                                       label={"Giá"}
                                                       labelPlacement={"outside"}
                                                       value={variant.variantPrice.originalPrice}
                                                       endContent={<LiaDollarSignSolid/>}
                                                       onValueChange={
                                                           (event) => handleVariantPriceChange(index, event)}
                                                />
                                                <Input size={"lg"}
                                                       radius={"sm"}
                                                       label={" "}
                                                       labelPlacement={"outside"}
                                                       value={variant.variantPrice.discountPrice}
                                                       endContent={<LiaDollarSignSolid/>}
                                                       isReadOnly
                                                />
                                            </div>
                                        </FormItem>
                                        <FormItem>
                                            <p className={classConfig.fontSize.subLabel}>Hình ảnh <span
                                                className={"text-danger"}>*</span></p>
                                            <Input
                                                type="file"
                                                variant={"bordered"}
                                                labelPlacement="outside-left"
                                                isRequired
                                                onChange={(event) => handleParseFile(index, event)}
                                            />
                                        </FormItem>


                                        <Button isIconOnly color={"danger"}
                                                variant={"flat"}
                                                onClick={() => handleRemoveVariantRow(index)}><FaXmark
                                            size={classConfig.icon.large}/></Button>

                                    </FormRow>);
                                })}
                            </div>
                        </FormItem>

                    </FormRow>
                    <Button onClick={handleSubmit} color={"primary"} size={"lg"}>Sửa sản phẩm</Button>
                </FormBody>
            </Form>
        </div>
    );
}

export default EditProduct;