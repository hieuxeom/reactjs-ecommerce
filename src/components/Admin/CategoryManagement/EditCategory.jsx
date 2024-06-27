import React, {useEffect, useState} from "react";
import {Button, Checkbox, Input} from "@nextui-org/react";
import {apiUrl} from "../../../utils/config/api.config.js";
import Form from "../../Partials/Form/Form.jsx";
import FormHeader from "../../Partials/Form/FormHeader.jsx";
import {adminUrl} from "../../../utils/config/route.config.js";
import FormBody from "../../Partials/Form/FormBody.jsx";
import useAxios from "../../../hooks/useAxios.js";
import {useParams} from "react-router-dom";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import FormItem from "../../Partials/Form/FormItem.jsx";

function EditCategory(props) {

    const [categoryName, setCategoryName] = useState("");
    const [queryParams, setQueryParams] = useState("");
    const [isActive, setIsActive] = useState(true);

    const {categoryId} = useParams();
    const axiosClient = useAxios();
    const axiosServer = useAxiosServer();

    const getCategoryDetails = () => {
        axiosClient.get(apiUrl.category.details(categoryId)).then((response) => {

            const {categoryName, queryParams, isActive} = response.data.data;

            setCategoryName(categoryName)
            setQueryParams(queryParams)
            setIsActive(isActive)
        })
    }

    useEffect(() => {
        getCategoryDetails()
    }, []);

    const handleSubmit = () => {
        axiosServer.put(apiUrl.category.edit(categoryId), {
            categoryName,
            queryParams,
            isActive
        }).then((response) => {
            console.log(response);
        })
    }

    return (
        <div className={"w-full max-w-7xl"}>
            <Form>
                <FormHeader formTitle={"Sửa danh mục"} urlBack={adminUrl.category.index}/>
                <FormBody>
                    <FormItem>
                        <p>Tên danh mục</p>
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
                        <p>Query params</p>
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
                            <Checkbox isSelected={isActive} onValueChange={setIsActive}>Hoạt động?</Checkbox>
                        </div>
                        <Button onClick={handleSubmit} color={"primary"} size={"lg"}
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