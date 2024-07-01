import React, {useEffect, useState} from "react";
import DetailsSection from "./DetailsSection.jsx";
import useAxios from "../../../hooks/useAxios.js";
import {apiUrl} from "../../../utils/config/api.config.js";
import {useParams} from "react-router-dom";
import ReviewsSection from "./ReviewsSection.jsx";

function RootProductDetails({children}) {

    const axiosClient = useAxios();
    const {productId} = useParams();

    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        axiosClient.get(apiUrl.product.details(productId)).then(response => {
            if (response.data.message) {
                setProductDetails(response.data.data);
            }
        });
    }, []);

    return (
        <section className={"w-full max-w-7xl justify-center mt-8 flex flex-col gap-8"}>
            {
                productDetails &&
                <>
                    <DetailsSection productDetails={productDetails}/>
                    <ReviewsSection listReview={productDetails.productReviews}/>
                </>

            }
        </section>
    );
}

export default RootProductDetails;