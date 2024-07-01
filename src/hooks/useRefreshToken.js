import useAxios from "./useAxios";
import {useCookies} from "react-cookie";

const useRefreshToken = () => {

    const [cookies, setCookie] = useCookies(["refresh_token"]);

    const {refreshToken} = cookies;

    const axiosClient = useAxios();

    return async () => {
        if (refreshToken) {
            const token = await axiosClient.get("/users/rftk");
            setCookie("accessToken", token.data.data, {maxAge: 5});
            return token.data.data;
        } else {
            return null;
        }
    };
};

export default useRefreshToken;