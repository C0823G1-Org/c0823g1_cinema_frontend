import axios from "axios"
export const register = async (account) => {
    try {
        return await axios.post("http://localhost:8080/account/register",account);
    } catch (error) {
        throw error.response

    }
}
export const findAccount = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/account/detailUser/${id}`);
        return result.data
    } catch (error) {
        console.log(error);
    }
}
export const changeInfoUser = async (account) => {
    try {
        return await axios.patch(`http://localhost:8080/account/changeInfoUser/${account.id}`,account)
    } catch (error) {
        throw error.response
    }
}
export const changePasswordUser = async (account) => {
    try {
        return await axios.patch(`http://localhost:8080/account/changePassword`,account)
    } catch (error) {
        throw error.response
    }
}