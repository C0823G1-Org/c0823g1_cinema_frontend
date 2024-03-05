import axios from "axios"
export const getTopAccount = async () => {
    let temp = await axios.get('')
    return temp.data
}