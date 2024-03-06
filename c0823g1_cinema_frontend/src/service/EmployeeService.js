import axios from "axios";
import { searchName } from './MovieService';

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