import axios from "axios";

export async function getHistoryBooking(id, number) {
    const result = await axios.get(`http://localhost:8080/booking/historyBooking/${id}/${number}`)
    return result.data;
}

export async function searchHistoryBooking(id, startDate, endDate, page) {
    const result = await axios.get(`http://localhost:8080/booking/searchMovieBooking/${id}/${startDate}/${endDate}/${page}`)
    return result.data;
}

export async function getListHistoryBooking(id, startDate, endDate, page) {
    try {
        const result = await axios.get(`http://localhost:8080/booking/getListBooking/${id}/${startDate}/${endDate}/${page}`)
        return result.data;
    } catch (err) {
        console.log(err)
    }
}
export const selectTicket = async (ticket) => {
    try {

        let result = await axios.post("http://localhost:8080/booking/confirm", ticket)
        return result.data;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const handleSuccess = async (checkout) => {
    console.log(checkout)
    try {
        let result = await axios.post("http://localhost:8080/booking/success", checkout)
        return result.data
    } catch (error) {
        return error;
    }
}
export const handleFail = async (checkout) => {
    console.log(checkout)
    try {
        let result = await axios.post("http://localhost:8080/booking/fail", checkout)
        return result.data
    } catch (error) {
        return error;
    }
}