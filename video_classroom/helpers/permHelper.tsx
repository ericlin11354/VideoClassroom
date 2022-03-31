import { ContentPasteSearchOutlined } from "@mui/icons-material";
import router from "next/router";
import Cookies from "universal-cookie";

export const isUserLoggedIn = (): boolean =>  {

    // const cookies = new Cookies();
    // if (cookies.get("username") && (cookies.get("username") == 'user' || cookies.get("username") == 'admin')) {
    //     return true
    // } else {
    //     return false
    // }
    
    if (sessionStorage.getItem('username')) {
        return true
    } else {
        return false
    }
}

export const getUsername = (): string =>  {
    const cookies = new Cookies();
    return cookies.get("username")
}

export const isUserAdmin = (): boolean =>  {

    // const cookies = new Cookies();
    // if (cookies.get("username") && cookies.get("username") == 'admin') {
    //     return true
    // } else {
    //     return false
    // }
    
    if (sessionStorage.permission === 'admin') {
        return true
    } else {
        return false
    }
}