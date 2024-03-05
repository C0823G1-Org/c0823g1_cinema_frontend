import axios from "axios"
export const getTopAccount = async () => {
    let temp = await axios.get('http://localhost:8080/account/statistics?page=0')
    return temp.data
}
export const register = async (account) => {
    try {
        return await axios.post("http://localhost:8080/account/register",account);
    } catch (error) {
        throw error.response
        
    }
}
