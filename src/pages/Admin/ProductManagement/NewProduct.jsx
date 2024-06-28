import React, {useEffect, useRef, useState} from "react";
import {adminUrl} from "../../../utils/config/route.config.js";
import {Button, Checkbox, Input, Select, SelectItem} from "@nextui-org/react";
import Form from "../../../components/Form/Form.jsx";
import FormHeader from "../../../components/Form/FormHeader.jsx";
import FormBody from "../../../components/Form/FormBody.jsx";
import FormItem from "../../../components/Form/FormItem.jsx";
import FormRow from "../../../components/Form/FormRow.jsx";
import useAxios from "../../../hooks/useAxios.js";
import {apiUrl} from "../../../utils/config/api.config.js";
import classConfig from "../../../utils/config/class.config.js";
import {IoMdAdd} from "react-icons/io";
import {FaXmark} from "react-icons/fa6";
import classNames from "classnames";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import toastConfig from "../../../utils/config/toast.config.js";
import {isNumber} from "../../../utils/checkNumber.js";
import {isEmpty, isIncludeSpace} from "../../../utils/checkSpaces.js";

function NewProduct(props) {

    const toastSubmit = useRef(null);

    const axiosClient = useAxios();
    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const [listCategories, setListCategories] = useState([]);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("0");
    const [isDiscount, setIsDiscount] = useState(false);
    const [discountPercents, setDiscountPercents] = useState("0");
    const [productCategory, setProductCategory] = useState("");
    const [productVariants, setProductVariants] = useState([{
        variantKey: "",
        variantLabel: "",
        variantImage: "",
        variantStock: "0",
        variantPrice: "0"
    }]);
    const [isActive, setIsActive] = useState(true);

    const getListCategories = () => {
        axiosClient.get(apiUrl.category.all).then((response) => {
            let listCategories = response.data.data;
            setListCategories(listCategories);
            setProductCategory(listCategories[0].queryParams);
        });
    };

    useEffect(() => {
        getListCategories();
    }, []);

    const handleVariantInputChange = (index, key, value) => {
        const newVariants = [...productVariants];
        newVariants[index][key] = value;
        setProductVariants(newVariants);

        if (key === "variantPrice") {
            handleUpdateRangePrice();
        }
    };

    const handleAddNewVariantRow = () => {
        if (productVariants.length < 10) {
            setProductVariants([...productVariants, {
                variantKey: "",
                variantLabel: "",
                variantImage: "",
                variantStock: "0",
                variantPrice: "0"
            }]);
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
        const tempSort = productVariants.sort((a, b) => a.variantPrice - b.variantPrice);

        const minPrice = tempSort[0].variantPrice;
        const maxPrice = tempSort[tempSort.length - 1].variantPrice;

        setProductPrice(minPrice !== maxPrice ? `${minPrice}$ - ${maxPrice}$` : `${minPrice}$`);
    };

    const checkValid = () => {
        return !isEmpty(productName) && checkValidVariants();
    };

    const checkValidVariants = () => {
        return !productVariants.map((variant) => !isEmpty(variant.variantKey) && !isEmpty(variant.variantLabel) && variant.variantStock > 0 && variant.variantPrice > 0).includes(false);
    };

    const handleSubmit = () => {

        toastSubmit.current = toast.info("Creating...", toastConfig.loading);

        if (!checkValid()) {
            return toast.update(toastSubmit.current, toastConfig.error("Please fill in all required information"));
        }

        const submitData = {
            productName,
            productPrice,
            isDiscount,
            discountPercents,
            productCategory,
            productVariants,
            isActive
        };
        axiosServer.post(apiUrl.product.base, submitData).then((response) => {
            if (response.status === "success") {
                toast.update(toastSubmit.current, toastConfig.success(response.message, () => navigate(adminUrl.product.index)));
            }
        }).catch((error) => {
            const {response} = error;
            console.log(response);
            toast.update(toastSubmit.current, toastConfig.error(response.data.message));
        });
    };

    return (<div className={"w-full max-w-7xl"}>
            <Form>
                <FormHeader formTitle={"Thêm sản phẩm mới"} urlBack={adminUrl.product.index}/>
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
                            <p className={classConfig.text.inputLabel}>Giá sản phẩm</p>
                            <Input type="text"
                                   size={"lg"}
                                   radius={"sm"}
                                   value={productPrice}
                                   isReadOnly
                            />
                        </FormItem>
                        <FormItem>
                            <Checkbox isSelected={isDiscount} onValueChange={setIsDiscount} size={"lg"}
                                      color={"secondary"}
                            >
                                Giảm giá
                            </Checkbox>
                            <Input type="text"
                                   size={"lg"}
                                   variant={"bordered"}
                                   radius={"sm"}
                                   value={discountPercents}
                                   onValueChange={setDiscountPercents}
                                   isInvalid={!isNumber(discountPercents)}
                                   isDisabled={!isDiscount}
                            />
                        </FormItem>
                        <FormItem>
                            <p className={classConfig.text.inputLabel}>Danh mục sản phẩm</p>
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
                                  color={"secondary"}
                        >
                            Hoạt động?</Checkbox>
                    </FormRow>
                    <FormRow>
                        <FormItem>
                            <div className={"w-full flex items-center justify-between"}>
                                <p className={classConfig.text.inputLabel}>Các biến thể</p>
                                <div className={"flex items-center gap-4"}>
                                    <p className={classNames({
                                        "text-danger": productVariants.length === 10
                                    })}>
                                        ({productVariants.length}/10)
                                    </p>
                                    <Button isIconOnly
                                            color={"secondary"}
                                            onClick={handleAddNewVariantRow}
                                            isDisabled={productVariants.length >= 10}
                                    >
                                        <IoMdAdd size={classConfig.icon.base}/>
                                    </Button>
                                </div>
                            </div>
                            <div className={"w-full flex flex-col gap-4"}>
                                {productVariants.map((variant, index) => (
                                    <FormRow alignItems={"items-end"} key={index}>
                                        <FormItem>
                                            <Input size={"lg"}
                                                   radius={"sm"}
                                                   variant={"bordered"}
                                                   label={"Mã biến thể"}
                                                   labelPlacement={"outside"}
                                                   value={variant.variantKey}
                                                   isInvalid={isIncludeSpace(variant.variantKey) && !isEmpty(variant.variantKey)}
                                                   onValueChange={
                                                       (event) => handleVariantInputChange(index, "variantKey", event)
                                                   }
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
                                                       (event) => handleVariantInputChange(index, "variantLabel", event)
                                                   }
                                                   isRequired
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Input size={"lg"}
                                                   radius={"sm"}
                                                   variant={"bordered"}
                                                   label={"Số lượng trong kho"}
                                                   labelPlacement={"outside"}
                                                   value={variant.variantStock}
                                                   isInvalid={!isNumber(variant.variantStock)}
                                                   onValueChange={
                                                       (event) => handleVariantInputChange(index, "variantStock", event)
                                                   }
                                                   isRequired
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Input size={"lg"}
                                                   radius={"sm"}
                                                   variant={"bordered"}
                                                   label={"Giá"}
                                                   labelPlacement={"outside"}
                                                   value={variant.variantPrice}
                                                   isInvalid={!isNumber(variant.variantPrice)}
                                                   onValueChange={
                                                       (event) => handleVariantInputChange(index, "variantPrice", event)}
                                                   isRequired
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <p className={classConfig.text.subLabel}>Hình ảnh <span
                                                className={"text-danger"}>*</span></p>
                                            <Input
                                                type="file"
                                                size={"lg"}
                                                variant={"bordered"}
                                                labelPlacement={"outside-left"}
                                                isRequired
                                                onChange={(event) => handleParseFile(index, event)}
                                            />
                                        </FormItem>


                                        <Button isIconOnly color={"danger"}
                                                onClick={() => handleRemoveVariantRow(index)}><FaXmark
                                            size={classConfig.icon.large}/></Button>

                                    </FormRow>))}
                            </div>
                        </FormItem>

                    </FormRow>
                    <Button onClick={handleSubmit} color={"primary"} size={"lg"}>Thêm sản phẩm</Button>
                </FormBody>
            </Form>
        </div>
    );
}

export default NewProduct;