import axios from "axios";


const listBooking = async () => {
    return axios.get("http://localhost:8080/booking/list");
}

export const EmployeeService = {
    listBooking
}