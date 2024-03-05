import axios from "axios";

export async function getHistoryBooking(id, number) {
    const result = await axios.get(`http://localhost:8080/booking/historyBooking/${id}/${number}`)
    return result.data;
}

export async function searchHistoryBooking(id, startDate, endDate,page) {
    const result = await axios.get(`http://localhost:8080/booking/searchMovieBooking/${id}/${startDate}/${endDate}/${page}`)
    return result.data;
}
export const getSeat = async (scheduleId) =>{
    try {
        const response = await axios.get(`http://localhost:8080/api-ticket/ticket?scheduleId=${scheduleId}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
export const getMovie = async (movieId) =>{
    try {
        const response = await axios.get(`http://localhost:8080/movie/find/${movieId}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
export const getSchedule = async () =>{
    try {
        const response = await axios.get(`http://localhost:8080/schedule/schedule?movieId=${1}&date=${'2024-02-02'}&scheduleTimeId=${1}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
export const getDate = async (movieId) =>{
    try {
        const response = await axios.get(`http://localhost:8080/schedule/date?movieId=${movieId}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
export const getScheduleTime = async (movieId,date) =>{
    try {
        const response = await axios.get(`http://localhost:8080/schedule/time?movieId=${movieId}&date=${date}`);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}