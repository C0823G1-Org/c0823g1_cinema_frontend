import axios from "axios";

export async function getHistoryBooking(id, number) {
    const result = await axios.get(`http://localhost:8080/booking/historyBooking/${id}/${number}`)
    return result.data;
}

export async function searchHistoryBooking(id, startDate, endDate, page) {
    const result = await axios.get(`http://localhost:8080/booking/searchMovieBooking/${id}/${startDate}/${endDate}/${page}`)
    return result.data;
}
export const removeTicketAndBooking = async (checkout) => {
    console.log(checkout)
    try {
        let result = await axios.post("http://localhost:8080/booking/back", checkout)
        return result.data
    } catch (error) {
        return error;
    }
}
export async function getListHistoryBooking(id, startDate, endDate, page, accessToken) {
    try {
        const result = await axios.get(`http://localhost:8080/booking/getListBooking/${id}/${startDate}/${endDate}/${page}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return result.data;
    } catch (err) {
        console.log(err)
    }
}
export const getSeat = async (scheduleId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api-ticket/ticket?scheduleId=${scheduleId}`);
        return response.data;
    } catch (e) {
        console.log(e)
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
export const getMovie = async (movieId) => {
    try {
        const response = await axios.get(`http://localhost:8080/movie/find/${movieId}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
export const getSchedule = async (movieId, date, scheduleTimeId) => {
    try {
        const response = await axios.get(`http://localhost:8080/schedule/schedule?movieId=${movieId}&date=${encodeURIComponent(date)}&scheduleTimeId=${scheduleTimeId}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
export const getDate = async (movieId) => {
    try {
        const response = await axios.get(`http://localhost:8080/schedule/date?movieId=${movieId}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
export const selectTicket = async (ticket) => {
    console.log("aaa", ticket)
    try {

        let result = await axios.post("http://localhost:8080/booking/confirm", ticket)
        return result.data;
    } catch (error) {
        console.log(error)
        return error;
    }
}
export const getScheduleTime = async (movieId, date) => {
    try {
        const response = await axios.get(`http://localhost:8080/schedule/time?movieId=${movieId}&date=${encodeURIComponent(date)}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
export const getScheduleByMovieId = async (movieId) => {
    try {
        const response = await axios.get(`http://localhost:8080/schedule/movie?movieId=${movieId}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
export const getSchedule3DayByMovieId = async (movieId) => {
    try {
        const response = await axios.get(`http://localhost:8080/schedule/movie3?movieId=${movieId}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export const checkExist = async (info) => {
    try {
        const response = await axios.post(`http://localhost:8080/booking/checkexist`, info);
        return response;
    } catch (e) {
        return e;
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

