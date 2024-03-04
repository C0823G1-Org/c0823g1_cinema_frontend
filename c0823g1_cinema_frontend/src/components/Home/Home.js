import React, { useEffect, useState } from 'react'
import '../Home/Home.css'
// import quythaydau from '../img/quaythaydau.jpg'
// import quatmotrungma from '../img/quatmotrungma.jpg'
// import truocgioyeu from '../img/truocgioyeu.jpg'
// import bietdoisanma from '../img/bietdoisanma.jpg'
// import kong from '../img/kong.jpg'
// import sangden from '../img/sangden.png'
// import movie3 from '../img/slide-3-video.png'
// import movie4 from '../img/movie-5.jpg'
// import movie5 from '../img/movie-6.jpg'
// import movie6 from '../img/movie-7.jpg'
// import movie7 from '../img/movie-8.jpg'
// import movie8 from '../img/movie-9.jpg'
// import movie9 from '../img/movie-13.jpg'
import { getAllMovieCurrent, getAllMovieHot, searchName } from '../../service/MovieService'
import Header from '../Home/Header'
import Footer from '../Home/Footer'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const [movies, setMovies] = useState();
    const [listMovie, setListMovie] = useState()
    const [moviesCurrent, setMoviesCurrent] = useState([]);
    const [search, setSearch] = useState("")
    const [page, setPage] = useState("0");
    const native = useNavigate();
    sessionStorage.clear();
    useEffect(() => {
        getAllMovieHot().then(res => {
            setMovies(res)
        })
    }, [])
    useEffect(() => {
        getAllMovieCurrent().then(res => {
            setMoviesCurrent(res)
        })
    }, [])

    useEffect(() => {
        console.log(listMovie);
        if (listMovie) {
            native("/search", { state: { movies: listMovie, search } });
        }
    }, [listMovie]);

    const handleSearch = () => {
        searchName(search, page).then(res => {
            console.log(res)
            setListMovie(res)
        }
        )
    }

    if (!movies) return <div>Loading...</div>
    if (!moviesCurrent) return <div>Loading...</div>
    return (
        <div>
            <Header />

            {/* Carousel */}
            <section className="movieCarousel">
                <div id="movieCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators container">
                        <li data-target="#movieCarousel" data-slide-to={0} className="active" />
                        <li data-target="#movieCarousel" data-slide-to={1} />
                        <li data-target="#movieCarousel" data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active hero1">
                            <div className="carousel-item__overlay" />
                            <div className="container carousel-caption d-md-block">
                                <p>Hành Động, Thám Hiểu, Tình Cảm</p>
                                <h2 className="display-4">End of the World: Part I</h2>
                                <p>Rõ ràng là một quy trình động, theo sau sự biến đổi của thói quen của người đọc. Điều đáng
                                    ngạc nhiên là chúng ta chú ý rằng chữ Gothic, mà chúng ta hiện nay cho là ít quan trọng
                                </p>
                                <div className="carousel-item__trailer mt-4">
                                    <span className="d-inline-block mr-2 text-white rounded-circle text-center">CO8</span>
                                    <button className="btn-playTrailer"><i className="fa fa-play mr-2 playtrailer" /><span>XEM
                                        TRAILER</span>
                                        <div className="btn__overlay" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item hero2">
                            <div className="carousel-item__overlay" />
                            <div className="container carousel-caption d-md-block">
                                <p>Hành Động, Thám Hiểu, Tình Cảm</p>
                                <h2 className="display-4">End of the World: Part II</h2>
                                <p>Rõ ràng là một quy trình động, theo sau sự biến đổi của thói quen của người đọc. Điều đáng
                                    ngạc nhiên là chúng ta chú ý rằng chữ Gothic, mà chúng ta hiện nay cho là ít quan trọng
                                </p>
                                <div className="carousel-item__trailer mt-4">
                                    <span className="d-inline-block mr-2 text-white rounded-circle text-center">C08</span>
                                    <button className="btn-playTrailer"><i className="fa fa-play mr-2 playtrailer" /><span>XEM
                                        TRAILER</span>
                                        <div className="btn__overlay" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item hero3">
                            <div className="carousel-item__overlay" />
                            <div className="container carousel-caption d-md-block">
                                <p>Hành Động, Thám Hiểu, Tình Cảm</p>
                                <h2 className="display-4">End of the World: Part III</h2>
                                <p>Rõ ràng là một quy trình động, theo sau sự biến đổi của thói quen của người đọc. Điều đáng
                                    ngạc nhiên là chúng ta chú ý rằng chữ Gothic, mà chúng ta hiện nay cho là ít quan trọng
                                </p>
                                <div className="carousel-item__trailer mt-4">
                                    <span className="d-inline-block mr-2 text-white rounded-circle text-center">C08</span>
                                    <button className="btn-playTrailer"><i className="fa fa-play mr-2 playtrailer" /><span>XEM
                                        TRAILER</span>
                                        <div className="btn__overlay" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{ position: 'relative', marginTop: 50 }} className="newIn container py-5">
                <div className="container__search-ticket">
                    <label>
                        <select className="custom-select" style={{ width: 200 }}>
                            <option selected>Chọn phim</option>
                            <option value={1}>Mai</option>
                            <option value={2}>Madame Web</option>
                            <option value={3}>Cua lại chị bầu </option>
                        </select>
                    </label>
                    <label>
                        <label>
                            <select className="custom-select" style={{ width: 200 }}>
                                <option selected>Chọn ngày</option>
                                <option value={1}>23/02/2024</option>
                                <option value={2}>24/02/2024</option>
                                <option value={3}>25/02/2024</option>
                            </select>
                        </label>
                    </label>
                    <label>
                        <select className="custom-select" style={{ width: 200 }}>
                            <option selected>Chọn suất</option>
                            <option value={1}>9h30</option>
                            <option value={2}>12h</option>
                            <option value={3}>14h30</option>
                        </select>
                    </label>
                    <a href="../template/HuuPT_BookingSeat.html" style={{ borderRadius: 3, fontWeight: 500 }} className="btn__edit-new">Đặt vé</a>
                </div>
                {/* LIST PHIM HOT */}
                <h2 className="content__after">Phim Hot</h2>
                <div className="container__input">
                    <input name='search' value={search} onChange={e => setSearch(e.target.value)} placeholder=" Tìm kiếm phim ..." type="text" />
                    <button onClick={handleSearch} className="btn__edit-search">
                        Tìm
                        <i style={{ marginLeft: '4px' }} className="fas fa-search" />
                    </button>
                </div>
                <div className="newIn__content">
                    <div className="row text-center">
                        {
                            movies.map(value => (
                                <div key={value.name} className="col-6 col-md-3 list__film">
                                    <div className="newIn__img">
                                        <img className="img-fluid" src alt />
                                        <div className="newIn__overlay" />
                                        <div className="newIn__play text-white">
                                            <span className="format-description">{value.description}</span>
                                            <div className="container__button-position">
                                                <a className="btn__edit">Chi tiết</a>
                                                <a className="btn__add" href="../template/TuanNM_detailcnm.html">Đặt vé</a>
                                            </div>
                                        </div>
                                    </div>
                                    <a className="container-title" href="*">
                                        <h3 className="title__name-film">{value.name}</h3>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            {/* Phim Hom Nay */}
            <section style={{ position: 'relative' }} className="newIn container ">
                <h2 className="content__after">Phim Hôm Nay</h2>
                <div className="newIn__content">
                    <div data-slick="{&quot;slidesToShow&quot;: 4, &quot;slidesToScroll&quot;: 4}" className="row text-center" id="slick-slider">
                        <div className="col-6 col-md-3">
                            <div className="newIn__img">
                                <img className="img-fluid" src alt />
                                <div className="newIn__overlay" />
                                <div className="newIn__play text-white">
                                    <span className="format-description"></span>
                                    <div className="container__button-position">
                                        <a className="btn__edit">Chi tiết</a>
                                        <a className="btn__add" href="../template/TuanNM_detailcnm.html">Đặt vé</a>
                                    </div>
                                </div>
                            </div>
                            <a className="container-title" href="*">
                                <h3 className="title__name-film">QUẬT MỘ TRÙNG MA</h3>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* Comming Son */}
            <section className="comingSoon">
                <div className="comingSoon__bg" />
                <div className="comingSoon__content container">
                    <h2 className="content__after position-relative py-4">
                        SẮP RA MẮT</h2>
                    <div className="row d-flex align-items-center py-5">
                        <div className="col-12 col-md-6 col-lg-6 coming__detail">
                            <p>
                                Hài kịch, tội phạm</p>
                            <h3>The Hangover Part III</h3>
                            <p>
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <span className="coming__date">
                                    <i className="fa fa-calendar" />
                                    30 Tháng 9, 2024
                                </span>
                            </p>
                            <p>Khi một người trong số họ bị bắt cóc bởi một tên xã hội đen giận dữ, Bầy Sói phải truy lùng ông
                                Chow,
                                người có
                                đã trốn khỏi nhà tù và đang lẩn trốn.</p>
                            <a href>Thông Tin Thêm <i className="fa fa-angle-right" /></a>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className="comingSoon__trailer">
                                <img className="img-fluid" src alt />
                                <span className="d-inline-block rounded-circle"><i className="fa fa-play" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* List Film Coming Soon */}
            <section className="movieList py-5">
                <div className="movieList__content container">
                    <div className="row text-center">
                        <div className="col-4 col-sm-3 col-md-2 movieList__item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>Too fast</h5>
                                    <span>15 Tháng 3, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-sm-3 col-md-2 movieList__item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>The Hangover: Part III</h5>
                                    <span>30 Tháng 9, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-sm-3 col-md-2 movieList__item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>Transformers: Age of Extinction</h5>
                                    <span>15 Tháng 3, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-md-2 movieList__item rp__none-item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>End of an empire</h5>
                                    <span>19 Tháng 3, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-md-2 movieList__item rp__none-item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>The comedian</h5>
                                    <span>21 Tháng 3, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-md-2 movieList__item rp__none-item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>Locked out</h5>
                                    <span>01 Tháng 4, 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    )
}

export default Home
