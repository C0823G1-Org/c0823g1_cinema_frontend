import axios from "axios";

const listBooking = async (page,accessToken) => {

     const result = axios.get(`http://localhost:8080/booking/list?page=${page}`, {
         headers: {
             Authorization: `Bearer ${accessToken}`
         }
     });
     return(await  result).data
}
const exportFile = async (id, accessToken) => {
    const rs = axios.get(`http://localhost:8080/booking/exportPDF`,{params:{
            idBooking: id
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }});
    return(await  rs).data

}
const searchWithoutParam = async (page, accessToken) => {
    const result = axios.get(`http://localhost:8080/booking/search?page=${page}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
return (await result).data;
}

const searchWithParamInput = async (searchInput,page,accessToken) => {

    const result = axios.get("http://localhost:8080/booking/search",{params:{
            searchInput: `${searchInput}`,
            page: `${page}`
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }});

    return (await result).data;
}

const searchWithParamDate = async (searchDate,page,accessToken) => {
        const result = await axios.get("http://localhost:8080/booking/search", {
            params: {
                date: `${searchDate}`,
                page: `${page}`
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return (await result).data;
}
const searchWithParamDateAndValue = async (search, searchDate, page,accessToken) => {
    const result = await axios.get("http://localhost:8080/booking/search", {
        params: {
            date: `${searchDate}`,
            searchInput: `${search}`,
            page: `${page}`
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return (await result).data;
}

const findBookingDetail = async (idBooking, accessToken) => {
    const rs = await axios.get("http://localhost:8080/booking/exportDetail", {
        params: {
            idBooking: `${idBooking}`
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
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


export const getAllEmployee= async (page,searchName, accessToken) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/employee/list?page=${page}&searchName=${searchName}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const deleteEmployee= async (employee, accessToken) => {
    try {
        const rs = await axios.delete(`http://localhost:8080/api/employee/delete/${employee.id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    }catch (e) {
        return undefined
    }
}