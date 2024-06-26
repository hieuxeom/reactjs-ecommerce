import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function RedirectRoute({redirectTo}) {
    const navigate = useNavigate();

    return useEffect(() => {
        navigate(redirectTo)
    }, []);

}

export default RedirectRoute;