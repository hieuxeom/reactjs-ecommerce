import React, { useEffect, useState } from "react";
import TabHeader from "../../../components/Tab/TabHeader.jsx";
import { Button, ButtonGroup, Input, Select, SelectItem } from "@nextui-org/react";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import ProductCard from "../../../components/ProductCard/ProductCard.jsx";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import classNames from "classnames";

function Shop({ children }) {

    const axiosServer = useAxiosServer();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectSortItems = [
        {
            label: "Mặc định",
            key: "default"
        },
        {
            label: "Xem nhiều nhất",
            key: "most-popular"
        },
        {
            label: "Bán chạy",
            key: "top-sales"
        },
        {
            label: "Mới nhất",
            key: "latest"
        }
    ];

    const [listProducts, setListProducts] = useState(null);
    const [listCategories, setListCategories] = useState(null);
    const [selectedSort, setSelectedSort] = useState(searchParams?.get("sort") ?? "default");
    const [selectedFilter, setSelectedFilter] = useState(searchParams?.get("filter") ?? "all");
    const [searchString, setSearchString] = useState(searchParams?.get("_s") ?? null);

    const getListProducts = () => {
        const queryParams = [
            selectedSort && `sort=${selectedSort}`,
            selectedFilter && `filter=${selectedFilter}`,
            searchParams?.get("_s") && `_s=${searchParams?.get("_s")}`
        ].join("&");

        axiosServer.get(apiUrl.product.base + "?" + queryParams)
            .then(response => response.data)
            .then(response => {
                console.log(response.data);
                setListProducts(response.data);
            });
    };

    const getListCategories = () => {
        axiosServer.get(apiUrl.category.base)
            .then(response => response.data)
            .then(response => {
                console.log(response.data);
                setListCategories(response.data);
            });
    };

    useEffect(() => {
        getListProducts();
        getListCategories();
    }, []);

    useEffect(() => {

        if (selectSortItems.filter((item) => item.key === selectedSort).length < 1) {
            return setSelectedSort("default");
        }

        const search = {
            sort: selectedSort,
            filter: selectedFilter
        };

        search._s = searchParams.get("_s") ?? "";

        navigate({
            pathname: "/shop",
            search: `?${createSearchParams(search)}`
        });
        getListProducts();
    }, [searchParams, selectedSort, selectedFilter, searchString]);

    return (
        <section className={"w-full max-w-7xl flex flex-col mt-8"}>
            <div className={"flex flex-col gap-4"}>
                <div className={"flex justify-between gap-4"}>
                    <TabHeader tabTitle={"Cửa hàng"}/>
                    <div className={"w-1/2 flex items-center gap-4"}>
                        <div>
                            <ButtonGroup>
                                <Button onClick={() => {
                                    setSelectedFilter("all");
                                }}
                                        color={selectedFilter === "all" ? "primary" : "default"}
                                >
                                    All
                                </Button>
                                {listCategories &&
                                    listCategories.map((category) =>
                                        <Button key={category.queryParams}
                                                onClick={() => {
                                                    setSelectedFilter(category.queryParams);
                                                }}
                                                color={selectedFilter === category.queryParams ? "primary" : "default"}
                                        >
                                            {category.categoryName}
                                        </Button>
                                    )
                                }
                            </ButtonGroup>
                        </div>
                        <Select items={selectSortItems}
                                selectedKeys={[selectedSort]}
                                onSelectionChange={(event) => setSelectedSort(event.currentKey)}
                                className={""}
                                disallowEmptySelection
                                aria-label="nothing"
                        >
                            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                </div>

                {listProducts && listProducts.length > 0 ?
                    <div className={"grid grid-cols-4 gap-4"}>
                        {
                            listProducts.map((product, index) => (
                                <ProductCard key={index} productData={product}/>
                            ))
                        }
                    </div>
                    :
                    <div className={"w-full flex justify-center"}>
                        <p>Không có sản phẩm nào</p>
                    </div>
                }
            </div>
        </section>
    );
}

export default Shop;