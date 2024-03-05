import React, { useEffect, useState } from 'react'
import '../Home/Home.css'
import { getAllMovieCurrent, getAllMovieHot, searchName } from '../../service/MovieService'
import Header from '../Home/Header'
import Footer from '../Home/Footer'
import {Link, useNavigate} from 'react-router-dom'
import HeaderTemplateAdmin from './HeaderTemplateAdmin'


const Home = () => {
    const [movies, setMovies] = useState();
    const [listMovie, setListMovie] = useState()
    const [moviesCurrent, setMoviesCurrent] = useState([]);
    const [search, setSearch] = useState("")
    const [page, setPage] = useState("0");
    const native = useNavigate();

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
            <HeaderTemplateAdmin />
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
                                        <img className="img-fluid" src={value.poster} alt />
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
                    <div data-slick="{slidesToShow:'4', slidesToScroll:'4'}" className="row text-center" id="slick-slider">
                        {
                            moviesCurrent.map(value => (
                                <div className="col-6 col-md-3">
                                    <div className="newIn__img">
                                        <img className="img-fluid" src={value.poster} alt />
                                        <div className="newIn__overlay" />
                                        <div className="newIn__play text-white">
                                            <span className="format-description">{value.description}</span>
                                            <div className="container__button-position">
                                                <Link  className="btn__edit" to={`/home/detail/${value.movieId}`}>Chi tiết</Link>
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
                        {/* <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                            <div className="newIn__img">
                                <img className="img-fluid" src alt />
                                <div className="newIn__overlay" />
                                <div className="newIn__play text-white">
                                    <span className="format-description">\AAAAA</span>
                                    <div className="container__button-position">
                                        <a className="btn__edit">Chi tiết</a>
                                        <a className="btn__add" href="http://127.0.0.1:5500/template/TuanNM_detailcnm.html">Đặt
                                            vé</a>
                                    </div>
                                </div>
                            </div>
                            <a className="container-title" href="*">
                                <h3 className="title__name-film">ĐẤU TRƯỜNG MUÔN THÚ</h3>
                            </a>
                        </div> */}

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
                                <img className="img-fluid" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fslide-3-video.png?alt=media&token=9cb30ce8-f0be-4aca-9948-76406530b1c2" alt />
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
                                <img className="img-fluid" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fmovie-6.jpg?alt=media&token=1474d22c-9ffc-4b7f-bd96-0cb4f4b5625c,https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fmovie-7.jpg?alt=media&token=a44f907a-55d3-4ff3-ab4b-513962c8c625,https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fmovie-8.jpg?alt=media&token=eda1ff4f-bf93-4a22-bce8-20ed085c9481,https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fmovie-9.jpg?alt=media&token=48c6293b-75ec-496f-b492-1f7a1b37977c" alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>Too fast</h5>
                                    <span>15 Tháng 3, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-sm-3 col-md-2 movieList__item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fmovie-7.jpg?alt=media&token=4b500324-8cb6-47e2-a919-f235c5e23b5b" alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>The Hangover: Part III</h5>
                                    <span>30 Tháng 9, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-sm-3 col-md-2 movieList__item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fmovie-9.jpg?alt=media&token=48c6293b-75ec-496f-b492-1f7a1b37977c" alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>Transformers: Age of Extinction</h5>
                                    <span>15 Tháng 3, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-md-2 movieList__item rp__none-item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fmovie-8.jpg?alt=media&token=eda1ff4f-bf93-4a22-bce8-20ed085c9481" alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>End of an empire</h5>
                                    <span>19 Tháng 3, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-md-2 movieList__item rp__none-item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fmovie-12.jpg?alt=media&token=bd16a756-9527-44da-a20a-161ddaf28b94" alt />
                                <div className="movieList__Name-Date my-3 text-white">
                                    <h5>The comedian</h5>
                                    <span>21 Tháng 3, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-md-2 movieList__item rp__none-item">
                            <div className="movieList__detail">
                                <img className="img-fluid" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fmovie-14.jpg?alt=media&token=9df9f33d-1763-49f0-bdb2-40887b1f6b70" alt />
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
