import axios from "axios";


const listBooking = async () => {
    return axios.get("http://localhost:8080/booking/list");
}
const searchWithoutParam = async () => {
    const result = axios.get("http://localhost:8080/booking/search");
return (await result).data;
}

const searchWithParamInput = async (searchInput) => {

    const result = axios.get("http://localhost:8080/booking/search",{params:{
            searchInput: `${searchInput}`
        }});

    return (await result).data;
}

const searchWithParamDate = async (searchDate) => {
        const result = await axios.get("http://localhost:8080/booking/search", {
            params: {
                date: `${searchDate}`
            }
        });
        return (await result).data;
}
const searchWithParamDateAndValue = async (search, searchDate) => {
    const result = await axios.get("http://localhost:8080/booking/search", {
        params: {
            date: `${searchDate}`,
            searchInput: `${search}`
        }
    });
    return (await result).data;
}

export const EmployeeService = {
    listBooking,
    searchWithoutParam,
    searchWithParamInput,
    searchWithParamDate,
    searchWithParamDateAndValue
}