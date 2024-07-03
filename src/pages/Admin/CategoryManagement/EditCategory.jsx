import React, {useEffect, useRef, useState} from "react";
import {Button, Checkbox, Input} from "@nextui-org/react";
import {apiUrl} from "../../../utils/config/api.config.js";
import Form from "../../../components/Form/Form.jsx";
import FormHeader from "../../../components/Form/FormHeader.jsx";
import {adminUrl} from "../../../utils/config/route.config.js";
import FormBody from "../../../components/Form/FormBody.jsx";
import useAxios from "../../../hooks/useAxios.js";
import {useNavigate, useParams} from "react-router-dom";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import FormItem from "../../../components/Form/FormItem.jsx";
import classConfig from "../../../utils/config/class.config.js";
import toastConfig from "../../../utils/config/toast.config.js";
import {toast} from "react-toastify";
import {isIncludeSpace} from "../../../utils/checkSpaces.js";

function EditCategory(props) {

    const navigate = useNavigate();

    const toastEdit = useRef(null);

    const [categoryName, setCategoryName] = useState("");
    const [queryParams, setQueryParams] = useState("");
    const [isActive, setIsActive] = useState(true);

    const {categoryId} = useParams();
    const axiosClient = useAxios();
    const axiosServer = useAxiosServer();

    const getCategoryDetails = () => {
        axiosClient.get(apiUrl.category.details(categoryId)).then((response) => {

            const {categoryName, queryParams, isActive} = response.data.data;

            setCategoryName(categoryName);
            setQueryParams(queryParams);
            setIsActive(isActive);
        });
    };

    useEffect(() => {
        getCategoryDetails();
    }, []);

    const handleSubmit = () => {
        toastEdit.current = toast.info("Editing...", toastConfig.loading);

        if (isIncludeSpace(queryParams)) {
            return toast.update(toastEdit.current, toastConfig.error("Query params cannot contain spaces"));
        }

        axiosServer.put(apiUrl.category.edit(categoryId), {
            categoryName,
            queryParams,
            isActive
        }).then((response) => {
            if (response.data.status === "success") {
                toast.update(toastEdit.current, toastConfig.success(response.data.message, () => navigate(adminUrl.category.index)));
            }
        }).catch((error) => {
            const {response} = error;
            toast.update(toastEdit.current, toastConfig.error(response.data.message));
        });
    };

    return (
        <div className={"w-full max-w-7xl"}>
            <Form>
                <FormHeader formTitle={"Sửa danh mục"} urlBack={adminUrl.category.index}/>
                <FormBody>
                    <FormItem>
                        <p className={classConfig.fontSize.inputLabel}>Tên danh mục</p>
                        <Input
                            size={"lg"}
                            type="text"
                            value={categoryName}
                            onValueChange={setCategoryName}
                            variant={"bordered"}
                            radius={"sm"}
                        />
                    </FormItem>
                    <FormItem>
                        <p className={classConfig.fontSize.inputLabel}>Query params</p>
                        <Input
                            size={"lg"}
                            type="text"
                            value={queryParams}
                            onValueChange={setQueryParams}
                            variant={"bordered"}
                            radius={"sm"}

                        />
                    </FormItem>
                    <div className={"flex justify-between items-center"}>
                        <div className={"flex flex-col gap-2"}>
                            <Checkbox isSelected={isActive}
                                      onValueChange={setIsActive}
                                      size={"lg"}
                            >
                                Hoạt động?
                            </Checkbox>
                        </div>
                        <Button onClick={handleSubmit}
                                color={"primary"}
                                size={"lg"}
                        >
                            Sửa
                        </Button>
                    </div>
                </FormBody>
            </Form>
        </div>
    );
}

export default EditCategory;