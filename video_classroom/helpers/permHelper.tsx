import router from "next/router";
import Cookies from "universal-cookie";

export const isUserLoggedIn = (): boolean =>  {
    const cookies = new Cookies();
    if (cookies.get("username") && (cookies.get("username") == 'user' || cookies.get("username") == 'admin')) {
        return true
    } else {
        return false
    }
}

export const isUserAdmin = (): boolean =>  {
    const cookies = new Cookies();
    if (cookies.get("username") && cookies.get("username") == 'admin') {
        return true
    } else {
        return false
    }
}