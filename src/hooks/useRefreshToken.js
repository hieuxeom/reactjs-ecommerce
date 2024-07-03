import useAxios from "./useAxios";
import {useCookies} from "react-cookie";

const useRefreshToken = () => {
    const [cookies, setCookie] = useCookies(["refreshToken", "accessToken"]);
    const axiosClient = useAxios();

    return async () => {
        const {refreshToken} = cookies;
        if (refreshToken) {
            const token = await axiosClient.get("/users/rftk");
            const newAccessToken = token.data.data;
            setCookie("accessToken", newAccessToken, {path: "/", maxAge: 10});
            return newAccessToken;
        } else {
            return null;
        }
    };
};

export default useRefreshToken;
