import axios from "axios";

const listBooking = async (page) => {

     const result = axios.get(`http://localhost:8080/booking/list?page=${page}`);
     return(await  result).data
}
const exportFile = async (id) => {
    const rs = axios.get(`http://localhost:8080/booking/exportPDF`,{params:{
            idBooking: id
        }});
    return(await  rs).data

}
const searchWithoutParam = async (page) => {
    const result = axios.get(`http://localhost:8080/booking/search?page=${page}`);
return (await result).data;
}

const searchWithParamInput = async (searchInput,page) => {

    const result = axios.get("http://localhost:8080/booking/search",{params:{
            searchInput: `${searchInput}`,
            page: `${page}`
        }});

    return (await result).data;
}

const searchWithParamDate = async (searchDate,page) => {
        const result = await axios.get("http://localhost:8080/booking/search", {
            params: {
                date: `${searchDate}`,
                page: `${page}`
            }
        });
        return (await result).data;
}
const searchWithParamDateAndValue = async (search, searchDate, page) => {
    const result = await axios.get("http://localhost:8080/booking/search", {
        params: {
            date: `${searchDate}`,
            searchInput: `${search}`,
            page: `${page}`
        }
    });
    return (await result).data;
}

const findBookingDetail = async (idBooking) => {
    const rs = await axios.get("http://localhost:8080/booking/exportDetail", {
        params: {
            idBooking: `${idBooking}`
        }
    })
    return (await rs).data;

}

export const EmployeeService = {
    listBooking,
    searchWithoutParam,
    searchWithParamInput,
    searchWithParamDate,
    searchWithParamDateAndValue,
    findBookingDetail,
    exportFile
}


export const getAllEmployee= async (page,searchName) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/employee/list?page=${page}&searchName=${searchName}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const deleteEmployee= async (employee) => {
    try {
        const rs = await axios.delete(`http://localhost:8080/api/employee/delete/${employee.id}`);   
        return rs.data
    }catch (e) {
        return undefined
    }
}