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