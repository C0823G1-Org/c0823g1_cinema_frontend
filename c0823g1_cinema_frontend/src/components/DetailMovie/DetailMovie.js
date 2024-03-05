import './DetailMovie.css'
import {useEffect, useState} from "react";
import {findAll, findByIdMovie, findByIdMovieHasGenre} from "../../service/MovieService";
import {useParams} from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

export default function DetailMovie() {
    const [movie, setMovie] = useState([]);
    const [typeMovie, setTypeMovie] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const movie1 = await findByIdMovie(id);
            const movie2 = await findByIdMovieHasGenre(id);
            setMovie(movie1);
            setTypeMovie(movie2);
            document.title = movie1.name;
        };
        console.log(id)
        fetchData();
    }, []);
    return (
        <>
            <Header/>
            <div style={{position: "absolute", top: "-39%", transform: "translateY(50%)", minWidth: "100%"}}>
                <div className="fontText">
                    <div className="movie-details">
                        <div>
                            <div className="left_detail"></div>
                            <div>
                                <iframe className="mid_detail" src={movie.trailer}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen></iframe>
                            </div>
                            <div className="right_detail"></div>

                            <div className="left1_detail"></div>
                        </div>
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
                                    <i style={{color: 'orange'}} className="far fa-clock"></i>
                                    <p style={{display: 'inline-block', marginRight: '10px'}}><p
                                        style={{marginLeft: '10px'}}>{movie.duration} Phút</p></p>
                                    <i style={{color: 'orange'}} className="fas fa-calendar-alt"></i>
                                    <p style={{display: 'inline-block'}}><p
                                        style={{marginLeft: '10px'}}>{movie.startDate}</p>
                                    </p>
                                    <p>Quốc gia: {movie.country}</p>
                                    <p>Nhà sản xuất: {movie.director}</p>
                                    <p>
                                        Thể loại:
                                        {typeMovie.map((type) => (

                                            <button style={{marginLeft: "10px"}} type="button" className="btn btn-light"
                                            >{type[1]}</button>
                                        ))}
                                    </p>

                                    <p>Đạo diễn:
                                        <button style={{marginLeft: "10px"}} type="button"
                                                className="btn btn-light">{movie.publisher}</button>
                                    </p>
                                    <p>Diễn viên:
                                        <button style={{marginLeft: "10px"}} type="button"
                                                className="btn btn-light">{movie.actor}</button>
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
                                <div>Hôm nay, ngày 22/02</div>
                                <div className="showtime_detail">
                                    <button className="active1">9h30</button>
                                    <button className="active1">12h</button>
                                    <button className="active1">14h30</button>
                                    <button className="active1">17h</button>
                                    <button className="active1">19h30</button>
                                    <button className="active1">21h00</button>
                                    <button className="active1">22h30</button>
                                </div>
                                <div>Ngày 23/02</div>
                                <div>
                                    <button className="active1">9h30</button>
                                    <button className="active1">12h
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{borderTop: "171vh solid white"}}>
                <Footer/>
            </div>
        </>

    )
}
