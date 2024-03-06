import axios from "axios";

export async function findByIdMovie(idMovie) {
    const result = await axios.get(`http://localhost:8080/movie/find/${idMovie}`)
    return result.data;
}

export async function findByIdMovieHasGenre(idMovie) {
    const result = await axios.get(`http://localhost:8080/genre/findMovie/${idMovie}`)
    return result.data;
}

export async function findAll() {
    const result = await axios.get("http://localhost:8080/movie/list")
    return result.data;
}

export const getAllMovieHot = async () => {
    const rest = await axios.get("http://localhost:8080/movie");
    return rest.data;
}

export const getAllMovieCurrent = async () => {
    const rest = await axios.get("http://localhost:8080/movie/current");
    return rest.data;
}

export const searchName = async (name, page) => {
    const rest = await axios.get(`http://localhost:8080/movie/search?name=${name}&page=${page}`);
    return rest.data;
}

export async function getAllMovieAttributes() {
    try {
        const result = await axios.get("http://localhost:8080/movie/attributes")
        return result.data
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function getAllCountries() {
    try {
        const result = await axios.get("https://restcountries.com/v3.1/all")
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export async function getScheduleByHallId(id) {
    try {
        console.log("http://localhost:8080/schedule/hall/" + id)
        const result = await axios.get("http://localhost:8080/schedule/hall/" + id)
        console.log(result.data)
        return result.data
    } catch (e) {
        console.log(e)
    }
}