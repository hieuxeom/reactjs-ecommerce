import axios from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { apiBaseUrl } from "../utils/config/api.config.js";

const useAxiosServer = () => {
    const getRefreshToken = useRefreshToken();

    const axiosServer = axios.create({
        baseURL: apiBaseUrl,
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    });

    useEffect(() => {
        const requestIntercept = axiosServer.interceptors.request.use(
            async (config) => {
                // const { accessToken } = cookies; // get the most recent accessToken
                const accessToken = await getRefreshToken();
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosServer.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await getRefreshToken();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosServer(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosServer.interceptors.request.eject(requestIntercept);
            axiosServer.interceptors.response.eject(responseIntercept);
        };
    }, [getRefreshToken]); // Add cookies and getRefreshToken to dependency array

    return axiosServer;
};

export default useAxiosServer;
