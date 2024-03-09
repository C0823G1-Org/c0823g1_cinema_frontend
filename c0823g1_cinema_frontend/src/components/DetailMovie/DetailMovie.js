import './DetailMovie.css'
import {useEffect, useRef, useState} from "react";
import {findByIdMovie, findByIdMovieHasGenre} from "../../service/MovieService";
import {useNavigate, useParams} from "react-router-dom";
import {getScheduleByMovieId} from "../../service/BookingService";
import '../Home/Footer.css'
import Footer from "../Home/Footer";
import HeaderTemplateAdmin from "../Home/HeaderTemplateAdmin";
import SweetAlert from "sweetalert";

export default function DetailMovie() {
    const [movie, setMovie] = useState([]);
    const [typeMovie, setTypeMovie] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [actor, setActor] = useState([]);
    const dateToday = new Date().toISOString().slice(0, 10);
    const {id} = useParams();
    const [token,setToken] = useState("");
    const [role, setRole] = useState("");
    const [selectedDateTime, setSelectedDateTime] = useState({
        movieId: id,
        date: null,
        scheduleTimeId: null
    });
    const navigate = useNavigate();
    const showtimeSectionRef = useRef(null); // Tham chiếu đến phần tử lịch chiếu

    useEffect(()=>{
        const isLogin = sessionStorage.getItem("isLogin");
        if (isLogin !== null){
            SweetAlert("Đăng nhập thành công!", `Chào mừng ${sessionStorage.getItem("user")} đến với hệ thống!`, "success")
        }
        sessionStorage.removeItem("isLogin");
        const errTicket = sessionStorage.getItem("errTicket");
        if (errTicket !== null){
            SweetAlert("Xin lỗi!", `Những vé bạn chọn đã có khách hàng khác nhanh tay hơn xin bạn chọn lại từ đầu! Xin cám ơn!`, "error")
        }
        sessionStorage.removeItem("errTicket");
    })

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");
        const roleUser = sessionStorage.getItem("roleUser");
        setToken(accessToken);
        setRole(roleUser);
        const fetchData = async () => {
            try {
                const movie1 = await findByIdMovie(id);
                const movie2 = await findByIdMovieHasGenre(id);
                const dataResult = await getScheduleByMovieId(id)
                setSchedule(dataResult)
                setMovie(movie1);
                setTypeMovie(movie2);
                console.log(schedule)
                const listActor = movie1.actor.split(',');
                setActor(listActor);
                document.title = movie1.name;
            } catch (err) {
                navigate(`/home`);
            }
        };
        fetchData();
    }, []);

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
    const formatDuration = (durationInMinutes) => {
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    }
    //Format dates
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleClickScheduleTime = (date, scheduleTimeId) => {
        if (role === null) {
            sessionStorage.setItem("booking", "booking");
            sessionStorage.setItem("movieId", id);
            navigate(`/login`)
        } else {

            setSelectedDateTime(prevState => ({
                ...prevState,
                date,
                scheduleTimeId
            }));
            console.log(selectedDateTime);}
    };
    useEffect(() => {
        console.log(selectedDateTime);
        if (selectedDateTime.movieId !== null && selectedDateTime.date !== null && selectedDateTime.scheduleTimeId !== null) {
            navigate("/booking/seat", {state: {myResult: selectedDateTime}});
        }
    }, [selectedDateTime]);


    return (
        <div>
            <HeaderTemplateAdmin />

            <div className="page-wrapper_detail">
                <div className="container_detail ">
                    <div style={{backgroundColor: "black"}} className="column_detail column1_detail"></div>
                    <div className="column_detail column2_detail">
                        <div className="video-wrapper">
                            <div className="video-frame">
                                <iframe src={movie.trailer} style={{width: "100%"}}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen></iframe>
                            </div>
                            <table>
                                <tbody>
                                <tr>
                                    <td style={{width: '300px', height: '400px'}}>
                                        <img style={{width: '300px', height: '400px'}}
                                             src={movie.poster}
                                             alt="Movie Poster"/>
                                    </td>
                                    <td style={{ marginTop: "20px",padding: 0, paddingLeft: "10px", verticalAlign: "top"}}>
                                        <h1>{movie.name}</h1>
                                        <i style={{color: 'orange'}} className="far fa-clock"></i>
                                        <p style={{display: 'inline-block', marginRight: '10px'}}><p
                                            style={{marginLeft: '10px'}}>{formatDuration(movie.duration)}</p></p>
                                        <i style={{color: 'orange'}} className="fas fa-calendar-alt"></i>
                                        <p style={{display: 'inline-block'}}><p
                                            style={{marginLeft: '10px'}}>{formatDate(movie.startDate)}</p>
                                        </p>
                                        <p>Quốc gia: {movie.country}</p>
                                        <p>Nhà sản xuất: {movie.publisher}</p>
                                        <p>
                                            Thể loại:
                                            {typeMovie.map((type) => (

                                                <button type="button" className="btn btn-light"
                                                >{type[1]}</button>
                                            ))}
                                        </p>

                                        <p>Đạo diễn:
                                            <button type="button"
                                                    className="btn btn-light">{movie.director}</button>
                                        </p>
                                        <p>Diễn viên:
                                            {actor.map((at) => (
                                                <button style={{marginLeft: "10px"}} type="button"
                                                        className="btn btn-light">{at}</button>
                                            ))}
                                        </p>
                                        {/*<button className="btn btn__add_detail my-2 my-sm-0" type="submit"*/}
                                        {/*        onClick={handleScrollToSchedule}>Đặt*/}
                                        {/*    vé*/}
                                        {/*</button>*/}
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <hr/>
                            <h3>Nội dung phim</h3>
                            <p style={{fontSize: "20px"}}>{movie.description}</p>
                            <hr/>
                            <h3 ref={showtimeSectionRef}>Lịch chiếu</h3>
                            {schedule.length !== 0 &&
                                <div className="showtime_detail">
                                    {schedule.reduce((result, time) => {
                                        const currentDate = time.date;
                                        const existingDateIndex = result.findIndex(item => item.date === currentDate);
                                        console.log(schedule);
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
                                            <div>{dateToday === date ? <p>Hôm nay ngày: {formatDate(date)}</p> :
                                                <p>Ngày {formatDate(date)}</p>}</div>
                                            <div className="showtime_detail">
                                                {showtimes.map(({scheduleTimeId, time}) => (
                                                    formatTime(time, date, scheduleTimeId)
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {schedule.length === 0 &&
                                <div className="showtime_detail">
                                    <h5>Không có lịch chiếu</h5>
                                </div>
                            }
                        </div>
                    </div>
                    <div style={{backgroundColor: "black"}} className="column_detail column3_detail">
                    </div>
                </div>
            </div>
            {schedule.length === 0 &&
                <div style={{marginTop: "73vh"}}>
                    <Footer/>
                </div>
            }{schedule.length === 1 &&
            <div style={{marginTop: "90vh"}}>
                <Footer/>
            </div>
        }{schedule.length === 2 &&
            <div style={{marginTop: "100vh"}}>
                <Footer/>
            </div>
        }{schedule.length === 3 &&
            <div style={{marginTop: "110vh"}}>
                <Footer/>
            </div>
        }
        </div>
    )
}
