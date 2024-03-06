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

const forgetPassword = (param) => {
    return axios.post("http://localhost:8080/account/forget-password", param);
}
const loginEmail = (param) => {
    return axios.post("http://localhost:8080/account/login-email", param);
}
const logout = (param) => {
    return axios.delete(`https://graph.facebook.com/v10.0/me/permissions?access_token=${param}`);
}
export const LoginLogoutService = {
    loginAccount,
    loginFacebook,
    loginGoogle,
    forgetPassword,
    loginEmail,
    logout
}