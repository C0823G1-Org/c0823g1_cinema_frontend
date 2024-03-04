import axios from "axios";

export async function getAllMovieAttributes() {
    try {
        const result = await axios.get("http://localhost:8080/movie/attributes")
        return result.data
    } catch (e) {
        console.log(e)
    }
}