import './DetailMovie.css'
import {useEffect, useState} from "react";
import {findAll, findByIdMovie, findByIdMovieHasGenre} from "../../service/MovieService";
import {useNavigate, useParams} from "react-router-dom";
import {getScheduleByMovieId} from "../../service/BookingService";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

export default function DetailMovie() {
    const [movie, setMovie] = useState([]);
    const [typeMovie, setTypeMovie] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [actor, setActor] = useState([]);
    const {id} = useParams();
    const [selectedDateTime, setSelectedDateTime] = useState({
        movieId: id,
        date: null,
        scheduleTimeId: null
    });
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const movie1 = await findByIdMovie(id);
            const movie2 = await findByIdMovieHasGenre(id);
            const dataResult = await getScheduleByMovieId(id)
            setSchedule(dataResult)
            setMovie(movie1);
            setTypeMovie(movie2);
            const listActor = movie1.actor.split(',');
            setActor(listActor);
        };
        fetchData();
    }, []);
    console.log(schedule)
    const formatTime = (timeString, currentDate, scheduleTimeId) => {
        const [hours, minutes] = timeString.split(':');
        const formattedHours = parseInt(hours, 10).toString();
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const showtimeDate = new Date(currentDate);
        showtimeDate.setHours(hours, minutes, 0, 0);

        const isDisabled = showtimeDate < new Date();

        return (
            <button
                key={scheduleTimeId}
                className={`active1 ${isDisabled ? "disabled" : ""}`}
                onClick={() => handleClickScheduleTime(currentDate, scheduleTimeId)}
                disabled={isDisabled}
            >
                {`${formattedHours}h${formattedMinutes}`}
            </button>
        );
    };
    //Format dates
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleClickScheduleTime = (date, scheduleTimeId) => {
        setSelectedDateTime(prevState => ({
            ...prevState,
            date,
            scheduleTimeId
        }));
        console.log(selectedDateTime);
    };
    useEffect(() => {
        console.log(selectedDateTime);
        if (selectedDateTime.movieId !== null && selectedDateTime.date !== null && selectedDateTime.scheduleTimeId !== null) {
            navigate("/booking/seat", {state: {myResult: selectedDateTime}});
        }
    }, [selectedDateTime]);
    return (
        <><Header/>
            <div style={{position: "absolute", top: "-39%", transform: "translateY(50%)", minWidth: "100%"}}>
                <div className="fontText">
                    <div className="movie-details">
                        <div className="left_detail"></div>
                        <div>
                            <iframe className="mid_detail" src={movie.trailer}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen></iframe>
                        </div>
                        <div className="right_detail"></div>

                        <div className="left1_detail"></div>
                        <div className="mid_detail">
                            <div className="picture_detail">
                                <img style={{width: '300px', height: '400px'}}
                                     src={movie.poster}
                                     alt="Movie Poster"/>
                            </div>
                            <div style={{
                                float: 'left',
                                width: 'calc(100% - 220px)',
                                marginLeft: '200px',
                                marginTop: '0px'
                            }}>
                                <h1>{movie.name}</h1>
                                <div style={{fontSize: 'large'}}>
                                    <div style={{marginTop: "13px"}}>
                                        <i style={{color: 'orange'}} className="far fa-clock"></i>
                                        <p style={{display: 'inline-block', marginRight: '10px'}}><p
                                            style={{marginLeft: '10px'}}>{movie.duration} Phút</p></p>
                                        <i style={{color: 'orange'}} className="fas fa-calendar-alt"></i>
                                        <p style={{display: 'inline-block'}}><p
                                            style={{marginLeft: '10px'}}>{formatDate(movie.startDate)}</p>
                                        </p>
                                    </div>
                                    <p>Quốc gia: {movie.country}</p>
                                    <p>Nhà sản xuất: {movie.publisher}</p>
                                    <p>
                                        Thể loại:
                                        {typeMovie.map((type) => (

                                            <button style={{marginLeft: "10px"}} type="button" className="btn btn-light"
                                            >{type[1]}</button>
                                        ))}
                                    </p>

                                    <p>Đạo diễn:
                                        <button style={{marginLeft: "10px"}} type="button"
                                                className="btn btn-light">{movie.director}</button>
                                    </p>
                                    <p>Diễn viên:
                                        {actor.map((at) => (
                                            <button style={{marginLeft: "10px"}} type="button"
                                                    className="btn btn-light">{at}</button>
                                        ))}
                                    </p>
                                    <button className="btn btn__add_detail my-2 my-sm-0" type="submit">Đặt
                                        vé
                                    </button>
                                </div>
                                <hr/>
                                <h3>Nội dung phim</h3>
                                <p style={{fontSize: "20px"}}>{movie.description}
                                </p>
                                <hr/>
                                <h3>Lịch chiếu</h3>
                                <div className="showtime_detail">
                                    {schedule.reduce((result, time) => {
                                        const currentDate = time.date;
                                        const existingDateIndex = result.findIndex(item => item.date === currentDate);

                                        if (existingDateIndex === -1) {
                                            result.push({
                                                date: currentDate,
                                                showtimes: [{
                                                    scheduleTimeId: time.scheduleTime.id,
                                                    time: time.scheduleTime.scheduleTime
                                                }]
                                            });
                                        } else {
                                            result[existingDateIndex].showtimes.push({
                                                scheduleTimeId: time.scheduleTime.id,
                                                time: time.scheduleTime.scheduleTime
                                            });
                                        }

                                        return result;
                                    }, []).map(({date, showtimes}) => (
                                        <div key={date}>
                                            <div>Ngày {formatDate(date)}</div>
                                            <div className="showtime_detail">
                                                {showtimes.map(({scheduleTimeId, time}) => (
                                                    formatTime(time, date, scheduleTimeId)
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{borderTop: "170vh solid white"}}>
                <Footer/>
            </div>
        </>

    )
}