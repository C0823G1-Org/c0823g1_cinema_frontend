import axios from "axios";

export const getAllMovieHot = async () => {
    const rest = await axios.get("http://localhost:8080/movie");
    return rest.data;
}

export const getAllMovieCurrent = async () => {
    const rest = await axios.get("http://localhost:8080/movie/current");
    return rest.data;
}

export const searchName = async (name,page) => {
    const rest = await axios.get(`http://localhost:8080/movie/search?name=${name}&page=${page}`);
    return rest.data;
}   