import axios from "axios"
export const register = async (account) => {
    try {
        return await axios.post("http://localhost:8080/account/register",account);
    } catch (error) {
        throw error.response
        
    }
}
