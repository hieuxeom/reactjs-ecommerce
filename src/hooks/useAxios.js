import axios from "axios";
import {apiBaseUrl} from "../utils/config/api.config.js";
import {useCookies} from "react-cookie";

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

    return axiosClient;
};

export default useAxios;