import axios from "axios";

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