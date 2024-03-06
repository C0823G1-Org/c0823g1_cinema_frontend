import {useEffect, useState} from "react";
import {getDate, getSchedule, getSeat} from "../../service/BookingService";

export default function BookingMovieAndDate(props) {
    const movieId = props.movie;
    const [date, setDate] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dateResult = await getDate(movieId);
                setDate(dateResult)

            } catch (error) {
                // setLoading(false)
            }
        };

        fetchData();

    }, []);
    return (
        <>
            <h3>Lịch chiếu</h3>
            <div>Hôm nay, ngày 22/02</div>
            <div className="showtime">
                <button className="active">9h30</button>

            </div>
            <div>Ngày 23/02</div>
            <div className="showtime">
                <a>
                    <button className="active">9h30</button>
                </a>
            </div>
            <div>Ngày 24/02</div>
            <div className="showtime">
                <a>
                    <button className="active">9h30</button>
                </a>

            </div>
        </>
    )
}