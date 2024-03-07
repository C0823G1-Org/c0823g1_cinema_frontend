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

export const getTopMovie = async (page = 0) => {
    const temp = await axios.get(`http://localhost:8080/movie/statistics?page=${page}`);
    return temp.data;
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
        const result = await axios.get("http://localhost:8080/schedule/hall/" + id)
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export async function createMovie(data) {
    try {
        return await axios.post("http://localhost:8080/movie/create", data)
    } catch (e) {
        console.log(e)
    }
}

export const fillAllMovie = async (page,name,publisher,startDate,endDate) => {
    try{
        const result =
            await axios.get(`http://localhost:8080/movie/list?page=${page}&name=${name}&publisher=${publisher}&startDate=${startDate}&endDate=${endDate}`);
        return result.data;
    }catch (err){
        console.log(err)
    }
}
export const deleteMovie = async (movie) => {
    try{
        const result = await axios.patch(`http://localhost:8080/movie/delete/${movie.id}`);
        return result.data;
    }catch (err){
        console.log(err)
    }
}
