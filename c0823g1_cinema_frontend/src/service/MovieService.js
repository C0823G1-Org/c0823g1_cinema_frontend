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
        return e.response
    }
}

export const fillAllMovie = async (page, name, publisher, startDate, endDate, accessToken) => {
    try {
        const result = await axios.get(`http://localhost:8080/movie/list?page=${page}&name=${name}&publisher=${publisher}&startDate=${startDate}&endDate=${endDate}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return result.data;
    } catch (err) {
        console.log(err);
    }
}
export const deleteMovie = async (movie, accessToken) => {
    try {
        const result = await axios.delete(`http://localhost:8080/movie/delete/${movie.id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return result.data;
    } catch (err) {
        console.log(err)
    }
}
export const getScheduleByMovieId = async (movieId) => {
    try {
        const response = await axios.get(`http://localhost:8080/schedule/movie?movieId=${movieId}`);
        return response;
    } catch (e) {
        console.log(e)
    }
}

export async function getMovieInfoById(id) {
    try {
        const result = await axios.get(`http://localhost:8080/movie/info/${id}`)
        return result.data
    } catch (e) {
        return false
    }
}

export async function editMovie(data) {
    try {
        const result = await axios.patch("http://localhost:8080/movie/edit", data)
        return result.status
    } catch (e) {
        return e.response.status
    }
}

export const getAllMovieCurrentTo3Day = async () => {
    const rest = await axios.get("http://localhost:8080/movie/current1");
    return rest.data;
}
export const getTopMovie = async (page, name) => {
    const temp = await axios.get(`http://localhost:8080/movie/statistics?page=${page}&name=${name}`);
    return temp.data;
}
export async function checkIfMovieDuplicated(movie) {
    try {
        const result = await axios.post("http://localhost:8080/movie/check", movie)
        return result.data
    } catch (e) {
        return e.response.status
    }
}