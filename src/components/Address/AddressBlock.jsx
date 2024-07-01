import React, {useEffect, useState} from "react";
import Form from "../Form/Form.jsx";
import FormRow from "../Form/FormRow.jsx";
import {apiUrl} from "../../utils/config/api.config.js";
import axios from "axios";
import {Input, Select, SelectItem} from "@nextui-org/react";
import PropTypes from "prop-types";

AddressBlock.propTypes = {
    onChange: PropTypes.func
};

function AddressBlock({onChange}) {

    const [listProvinces, setListProvinces] = useState(null);
    const [listDistricts, setListDistricts] = useState(null);
    const [listWards, setListWards] = useState(null);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [fullAddress, setFullAddress] = useState(" ");

    const getProvincesData = () => {
        axios.get(apiUrl.address.provinces).then((response) => {
            console.log(response);
            setListProvinces(response.data.results);
            setSelectedProvince(response.data.results[0].province_id);

        });
    };

    const getDistrictsData = () => {
        axios.get(apiUrl.address.districts(selectedProvince)).then((response) => {
            console.log(response);
            setListDistricts(response.data.results);
            setSelectedDistrict(response.data.results[0].district_id);
        });
    };

    const getWardsData = () => {
        axios.get(apiUrl.address.wards(selectedDistrict)).then((response) => {
            console.log(response);
            setListWards(response.data.results);
            setSelectedWard(response.data.results[0].ward_id);
        });
    };

    const updateFullAddress = () => {
        const provinceName = listProvinces?.find((_p) => _p.province_id === selectedProvince)?.province_name ?? "_";
        const districtName = listDistricts?.find((_p) => _p.district_id === selectedDistrict)?.district_name ?? "_";
        const wardName = listWards?.find((_p) => _p.ward_id === selectedWard)?.ward_name ?? "_";
        onChange(`${fullAddress}, ${wardName}, ${districtName}, ${provinceName}`);
    };

    useEffect(() => {
        getProvincesData();
    }, []);

    useEffect(() => {
        getDistrictsData();
        updateFullAddress();
    }, [selectedProvince]);

    useEffect(() => {
        getWardsData();
        updateFullAddress();
    }, [selectedDistrict]);

    useEffect(() => {
        updateFullAddress();
    }, [selectedWard, fullAddress]);

    return (
        <div className={"w-full"}>
            <Form>
                <FormRow>
                    <Select items={listProvinces ?? []}
                            onSelectionChange={(event) => setSelectedProvince(event.currentKey)}
                            selectedKeys={[selectedProvince]}
                            size={"lg"}
                            aria-label={"test"}
                    >
                        {(item) => <SelectItem key={item.province_id}>{item.province_name}</SelectItem>}
                    </Select>
                    <Select items={listDistricts ?? []}
                            onSelectionChange={(event) => setSelectedDistrict(event.currentKey)}
                            selectedKeys={[selectedDistrict]}
                            size={"lg"}
                            aria-label={"test"}>
                        {(item) => <SelectItem key={item.district_id}>{item.district_name}</SelectItem>}
                    </Select>
                    <Select items={listWards ?? []}
                            onSelectionChange={(event) => setSelectedWard(event.currentKey)}
                            selectedKeys={[selectedWard]}
                            size={"lg"}
                            aria-label={"test"}>
                        {(item) => <SelectItem key={item.ward_id}>{item.ward_name}</SelectItem>}
                    </Select>
                </FormRow>
                <FormRow>
                    <Input label={"Địa chỉ cụ thể"}
                           labelPlacement={"outside"}
                           size={"lg"}
                           variant={"bordered"}
                           value={fullAddress}
                           onValueChange={setFullAddress}
                           isRequired
                    />
                </FormRow>
            </Form>
        </div>
    );
}

export default AddressBlock;