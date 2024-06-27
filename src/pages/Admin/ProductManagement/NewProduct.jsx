import React, {useEffect, useState} from "react";
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

function NewProduct(props) {

    const axiosClient = useAxios();
    const axiosServer = useAxiosServer();
    const navigate = useNavigate();

    const [listCategories, setListCategories] = useState([]);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("0");
    const [isDiscount, setIsDiscount] = useState(false)
    const [discountPercents, setDiscountPercents] = useState("0")
    const [productCategory, setProductCategory] = useState("");
    const [productVariants, setProductVariants] = useState([{
        variantKey: "",
        variantLabel: "",
        variantImage: "",
        variantStock: "",
        variantPrice: ""
    }]);
    const [isActive, setIsActive] = useState(true);

    const getListCategories = () => {
        axiosClient.get(apiUrl.category.all).then((response) => {
            let listCategories = response.data.data;
            setListCategories(listCategories);
            setProductCategory(listCategories[0].queryParams)
        })
    }

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
                variantStock: 0,
                variantPrice: 0
            }]);
        }
    }

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
    }

    const handleUpdateRangePrice = () => {
        const tempSort = productVariants.sort((a, b) => a.variantPrice - b.variantPrice);

        const minPrice = tempSort[0].variantPrice;
        const maxPrice = tempSort[tempSort.length - 1].variantPrice;

        setProductPrice(minPrice !== maxPrice ? `${minPrice}$ - ${maxPrice}$` : `${minPrice}$`)
    }

    const handleSubmit = () => {
        const submitData = {
            productName,
            productPrice,
            isDiscount,
            discountPercents,
            productCategory,
            productVariants,
            isActive
        }
        axiosServer.post(apiUrl.product.base, submitData).then((response) => {
            navigate(adminUrl.product.index)
        })
    }

    return (<div className={"w-full max-w-7xl"}>
            <Form>
                <FormHeader formTitle={"Thêm sản phẩm mới"} urlBack={adminUrl.product.index}/>
                <FormBody>
                    <FormItem>
                        <p className={classConfig.text.inputLabel}>Tên sản phẩm</p>
                        <Input type="text"
                               size={"lg"} variant={"bordered"} radius={"sm"}
                               value={productName}
                               onValueChange={setProductName}/>
                    </FormItem>
                    <FormRow alignItems={"items-center"}>
                        <FormItem>
                            <p className={classConfig.text.inputLabel}>Giá sản phẩm</p>
                            <Input type="text"
                                   size={"lg"} variant={"bordered"} radius={"sm"}
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
                                   size={"lg"} variant={"bordered"} radius={"sm"}
                                   value={discountPercents}
                                   onValueChange={setDiscountPercents}
                                   isDisabled={!isDiscount}
                            />
                        </FormItem>
                        <FormItem>
                            <p className={classConfig.text.inputLabel}>Danh mục sản phẩm</p>
                            <Select items={listCategories}
                                    selectedKeys={[productCategory]}
                                    onSelectionChange={([event]) => {
                                        setProductCategory(event)
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
                                    })}>({productVariants.length}/10)</p>
                                    <Button isIconOnly color={"secondary"}
                                            onClick={handleAddNewVariantRow}
                                    ><IoMdAdd size={classConfig.icon.base}/></Button>
                                </div>
                            </div>
                            <div className={"w-full flex flex-col gap-4"}>
                                {productVariants.map((variant, index) => (
                                    <FormRow alignItems={"items-end"} key={index}>
                                        <FormItem>
                                            <p className={classConfig.text.subLabel}>Mã
                                                biến thể</p>
                                            <Input size={"lg"} radius={"sm"} variant={"bordered"}
                                                   value={variant.variantKey}
                                                   onValueChange={
                                                       (event) => handleVariantInputChange(index, "variantKey", event)}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <p className={classConfig.text.subLabel}>Tên
                                                biến thể</p>
                                            <Input size={"lg"} radius={"sm"} variant={"bordered"}
                                                   value={variant.variantLabel}
                                                   onValueChange={
                                                       (event) => handleVariantInputChange(index, "variantLabel", event)}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <p className={classConfig.text.subLabel}>Số
                                                lượng trong kho</p>
                                            <Input size={"lg"} radius={"sm"} variant={"bordered"}
                                                   value={variant.variantStock}
                                                   onValueChange={
                                                       (event) => handleVariantInputChange(index, "variantStock", event)}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <p className={classConfig.text.subLabel}>Giá</p>
                                            <Input size={"lg"} radius={"sm"} variant={"bordered"}
                                                   value={variant.variantPrice}
                                                   onValueChange={
                                                       (event) => handleVariantInputChange(index, "variantPrice", event)}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <p className={classConfig.text.subLabel}>Hình ảnh</p>
                                            <Input
                                                type="file"
                                                variant={"bordered"}
                                                labelPlacement="outside-left"
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