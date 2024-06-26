import axios from "axios";
import {apiBaseUrl} from "../utils/config/api.config.js";
import {useCookies} from "react-cookie";
import {useEffect} from "react";

const useAxios = () => {

    const [cookies, setCookie] = useCookies(["refresh_token"]);

    const {refreshToken} = cookies;

    const axiosClient = axios.create({
        baseURL: apiBaseUrl,
        headers: {
            "Content-Type": "application/json",
            'x-rftk': refreshToken
        },
        withCredentials: true,
    });

    useEffect(() => {
        const responseIntercept = axiosClient.interceptors.response.use(
            (response) => {
                return response.data
            }, (error) => Promise.reject(error)
        );

        return () => {
            console.log("here")

            axiosClient.interceptors.response.eject(responseIntercept);
        };
    }, []);

    return axiosClient;
};

export default useAxios;