import axios from "axios"
export const register = async (account) => {
    try {
        return await axios.post("http://localhost:8080/account/register",account);
    } catch (error) {
        throw error.response

    }
}
export const findAccount = async (id, accessToken) => {
    try {
        const result = await axios.get(`http://localhost:8080/account/detailUser/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return result.data
    } catch (error) {
        console.log(error);
    }
}
export const changeInfoUser = async (account, accessToken) => {
    try {
        return await axios.patch(`http://localhost:8080/account/changeInfoUser/${account.id}`,account,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    } catch (error) {
        throw error.response
    }
}
export const changePasswordUser = async (account, accessToken) => {
    try {
        return await axios.patch(`http://localhost:8080/account/changePassword`,account,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    } catch (error) {
        throw error.response
    }
}