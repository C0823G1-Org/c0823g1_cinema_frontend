import axios from "axios";

const loginAccount = (param) => {
    return axios.post("http://localhost:8080/account/login", param);
}

const loginFacebook = (param) => {
    return axios.post("http://localhost:8080/account/login-by-fb", param);
}

const loginGoogle = (param) => {
    return axios.post("http://localhost:8080/account/login-by-gg", param);
}

export const LoginLogoutService = {
    loginAccount,
    loginFacebook,
    loginGoogle
}