import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "../Home/Home.css"
import { getAllMovieCurrentTo3Day} from "../../service/MovieService";
import {getDate, getScheduleTime} from "../../service/BookingService";
import "../Booking/BookingMovieSchedule.css"
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import SweetAlert from "sweetalert";
import HeaderTemplateAdmin from "../Home/HeaderTemplateAdmin";
//Format dates
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function BookingMovieSchedule() {
    const navigate = useNavigate();
    useEffect(() => {
        const roleUser = sessionStorage.getItem("roleUser");
        if (roleUser === null) {
            sessionStorage.setItem("buttonTicket","buttonTicket");
            navigate(`/login`);
        }
        const isLogin = sessionStorage.getItem("isLogin");
        if (isLogin !== null){
            SweetAlert("Đăng nhập thành công!", `Chào mừng ${sessionStorage.getItem("user")} đến với hệ thống!`, "success")
        }
        sessionStorage.removeItem("isLogin");
    }, []);
    const [movies, setMovies] = useState([])
    const [listDate, setListDate] = useState([])
    const [scheduleTime, setScheduleTime] = useState([])
    const [result, setResult] = useState({})
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [activeSchedule, setActiveSchedule] = useState(null);
    const [status, setStatus] = useState({
        chonPhim: "0",
        chonNgay: '1',
        chonSuat: '1'
    });

    console.log({selectedMovie})
    const handleMovieSelection = (movie) => {
        console.log(movie)
        setSelectedMovie(movie);
        if (selectedMovie) {
            setStatus({...status, chonNgay: '0', chonSuat: '1'});
        } else {
            setStatus({...status, chonNgay: '0'});
        }
    };

    const handleDateSelection = (date) => {
        setSelectedDate(date);
        setStatus({...status, chonSuat: '0'})
    };

    const handleScheduleSelection = (schedule) => {
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        const isCurrentDate = selectedDate && formatDate(selectedDate.dateTime) === formatDate(new Date());

        if (isCurrentDate && schedule.scheduleTime <= currentTime) {
            return;
        }

        setSelectedSchedule(schedule);
        setActiveSchedule(schedule.id);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesResult = await getAllMovieCurrentTo3Day();
                console.log(moviesResult)
                setMovies(moviesResult)
            } catch (error) {
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchDates = async () => {
            if (selectedMovie) {
                try {
                    const datesResult = await getDate(selectedMovie.movieId);
                    console.log(selectedMovie.movieId)
                    setListDate(datesResult);
                    setScheduleTime([])
                    setSelectedSchedule(null)
                } catch (error) {
                    // Lỗi
                }
            }
        };

        fetchDates();
    }, [selectedMovie]);
    useEffect(() => {
        const fetchScheduleTime = async () => {
            if (selectedDate && selectedMovie) {
                try {
                    const dateString = selectedDate.dateTime;
                    const scheduleTimeResult = await getScheduleTime(selectedMovie.movieId, dateString);
                    setScheduleTime(scheduleTimeResult);
                } catch (error) {
                    console.error('Lỗi', error);
                }
            }
        };

        fetchScheduleTime();
    }, [selectedDate, selectedMovie]);

    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const isCurrentDate = selectedDate && formatDate(selectedDate.dateTime) === formatDate(new Date());

    // Format time
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const formattedHours = parseInt(hours, 10).toString();
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}h${formattedMinutes}`;
    };
    const handleSubmit = () => {
        const newResult = {
            movieId: selectedMovie.movieId,
            date: selectedDate.dateTime,
            scheduleTimeId: selectedSchedule.id,
            backId: 2
        };
        setResult(newResult);
    };

    useEffect(() => {
        if (result.movieId && result.date && result.scheduleTimeId) {
            navigate("/booking/seat", {state: {myResult: result}});
        }
    }, [result]);
    return (
        <>
            <HeaderTemplateAdmin />
            <div style={{marginTop: "25vh"}}>
                <div className="row">
                    <div className=" map col-8 p-0 mx-0">
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey={status.chonPhim}>
                                <Accordion.Header>Chọn phim</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        {movies.map((movie) => (
                                            <div
                                                key={movie.movieId}
                                                className="movie"
                                                onClick={() => {
                                                    handleMovieSelection(movie);
                                                    setSelectedDate(null);
                                                    setSelectedSchedule(null);
                                                }}
                                            >
                                                <h4>{movie.name}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey={status.chonNgay}>
                                <Accordion.Header>Chọn ngày</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        {listDate.map((date, index) => (
                                            <div
                                                key={index}
                                                className="movie"
                                                onClick={() => {
                                                    handleDateSelection(date);
                                                    setSelectedSchedule(null);
                                                }}
                                            >
                                                <h4>{formatDate(date.dateTime)}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey={status.chonSuat}>
                                <Accordion.Header>Chọn suất</Accordion.Header>
                                <Accordion.Body>
                                    <div className="d-flex flex-wrap">
                                        {scheduleTime && scheduleTime.length > 0 ? (
                                            scheduleTime.map((time) => (
                                                <button
                                                    key={time.id}
                                                    className={`movie-item ${activeSchedule === time.id ? 'active' : ''}`}
                                                    onClick={() => handleScheduleSelection(time)}
                                                    disabled={isCurrentDate && time.scheduleTime <= currentTime}
                                                >
                                                    <h4>{formatTime(time.scheduleTime)}</h4>
                                                </button>
                                            ))
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className=" col-4 p-0 mx-0" style={{boxShadow: '10px 10px 20px black'}}>
                        <div className="col-span-1 xl:pl-4 xl:order-none order-first">
                            <div className="booking__summary md:mb-4">
                                <div className="bg-white px-4 grid grid-cols-3 xl:gap-2 items-center"
                                     style={{paddingRight: '0 !important', height: '700px'}}>
                                    <div
                                        className="row-span-2 md:row-span-1 xl:row-span-2 block md:hidden xl:block d-flex justify-content-center"
                                        style={{marginTop: '7%'}}>
                                        <img alt="Madame Web"
                                             loading="lazy"
                                             width="60%"
                                             height="auto"

                                             decoding="async"
                                             data-nimg="1"
                                             className="xl:w-full xl:h-full md:w-[80px] md:h-[120px] w-[90px] h-[110px] rounded object-cover object-cover duration-500 ease-in-out group-hover:opacity-100
                                scale-100 blur-0 grayscale-0)"
                                             src={selectedMovie && selectedMovie.poster !== null ? selectedMovie.poster : "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"}
                                             style={{color: 'transparent'}}/>
                                    </div>
                                    <div className="flex-1 col-span-2 md:col-span-1 row-span-1 xl:col-span-2"><h3
                                        className="text-sm xl:text-base font-bold xl:mb-0 d-flex justify-content-center mt-2 text-align-center">
                                        {selectedMovie ? selectedMovie.name : "Phim"}
                                    </h3>
                                        <hr className="my-0"/>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 xl:col-span-3">
                                        <div>
                                            <div className="xl:mt-0  xl:text-base">
                                                <strong>Ngày:{selectedDate ? formatDate(selectedDate.dateTime) : "------"} </strong>
                                                <strong>-</strong><strong>Suất: {selectedSchedule ? formatTime(selectedSchedule.scheduleTime) : "----"}</strong><strong></strong>
                                            </div>
                                        </div>
                                        <div
                                            className="my-2 border-t border-grey-60 border-dashed xl:block hidden"></div>
                                    </div>

                                    <div
                                        className="xl:flex mt-5 px-5 hidden d-flex justify-content-between align-items-center col-span-3">
                                        <Link to="/home">
                                            <button style={{width: '100px'}} className="btn__edit">Quay lại</button>
                                        </Link>
                                        <button style={{width: '100px'}} className="btn__add"
                                                disabled={selectedDate === null} onClick={handleSubmit}>Đặt vé
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}