import React, {useState} from "react";
import {Button, Checkbox, Input} from "@nextui-org/react";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import {apiUrl} from "../../../utils/config/api.config.js";
import Form from "../../../components/Form/Form.jsx";
import FormHeader from "../../../components/Form/FormHeader.jsx";
import {adminUrl} from "../../../utils/config/route.config.js";
import FormBody from "../../../components/Form/FormBody.jsx";
import FormItem from "../../../components/Form/FormItem.jsx";
import classConfig from "../../../utils/config/class.config.js";

function NewCategory(props) {

    const [categoryName, setCategoryName] = useState("");
    const [queryParams, setQueryParams] = useState("");
    const [isActive, setIsActive] = useState(true);

    const axiosServer = useAxiosServer();

    const handleSubmit = () => {
        axiosServer.post(apiUrl.category.base, {
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
                <FormHeader formTitle={"Tạo danh mục mới"} urlBack={adminUrl.category.index}/>
                <FormBody>
                    <FormItem>
                        <p className={classConfig.text.inputLabel}>Tên danh mục</p>
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
                        <p className={classConfig.text.inputLabel}>Query params</p>
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
                        <FormItem>
                            <Checkbox isSelected={isActive} onValueChange={setIsActive} size={"lg"}>Hoạt
                                động?</Checkbox>
                        </FormItem>
                        <Button onClick={handleSubmit} color={"primary"} className={classConfig.text.base}>
                            Tạo
                        </Button>
                    </div>
                </FormBody>
            </Form>
        </div>
    );
}

export default NewCategory;