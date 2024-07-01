import React, {useEffect, useState} from "react";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";
import {Button} from "@nextui-org/react";
import useAxios from "../../hooks/useAxios.js";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";

function NewArrivalsSection(props) {

    const axiosClient = useAxios();

    const [listProducts, setListProducts] = useState();

    useEffect(() => {
        axiosClient.get("/products").then((res) => {
            setListProducts(res.data.data);
        });
    }, []);

    useEffect(() => {
        console.log("List products", listProducts);
    }, [listProducts]);

    return (
        <section className="w-full flex justify-center">
            <div className="max-w-7xl w-full flex flex-col items-center">
                <header className="py-8">
                    <h2 className={classNames(classConfig.fontSize.h2, classConfig.textVariant.title)}>New Arrivals</h2>
                </header>
                <main className="py-8">
                    <div className="grid grid-cols-4 gap-8">
                        {
                            listProducts && listProducts.map((_p, index) => <ProductCard key={index} productData={_p}/>)
                        }
                    </div>
                </main>
                <footer className="py-8">
                    <Button variant={"bordered"} className={"capitalize"} size={"lg"}>
                        View all
                    </Button>
                </footer>
            </div>
        </section>

    )
        ;
}

export default NewArrivalsSection;