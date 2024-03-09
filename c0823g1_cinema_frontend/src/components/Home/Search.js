import React, { useEffect, useState } from 'react';
import '../Home/Home.css'
import { searchName } from '../../service/MovieService';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import HeaderTemplateAdmin from './HeaderTemplateAdmin';
import Footer from './Footer';
import MySwal from "sweetalert2";


const Search = () => {
    const location = useLocation();
    const data = location.state?.movies || [];
    const wordSearch = location.state?.search || "";
    const [search, setSearch] = useState(wordSearch || "");
    const [movies, setMovies] = useState(data.content || []);
    const [pageCurrent, setPageCurrent] = useState(data.pageable?.pageNumber || 0);
    const [totalPages, setTotalPages] = useState(data.totalPages || 0);
    const [messageError, setMessageError] = useState("Không có kết quả tìm kiếm !");

    const handleSearch = (e) => {
        const check = /[!@#$%^&*()~+-_]/
        if(check.test(e.target.value)){
            MySwal.fire({
                text: "Không được nhập quá  ký tự đặt biệt",
                icon: "warning"
            }); 
            setSearch("")
        } else if(e.target.value.length > 100){
            MySwal.fire({
                text: "Không được nhập quá 100 ký tự",
                icon: "warning"
            }); 
            setSearch("")
        } else {
            setSearch(e.target.value);

        }
        
    };

    const onHandleSearch = (e) => {
        console.log(search);
        e.preventDefault();
        searchName(search, 0)
            .then(res => {
                setMovies(res.content);
                setTotalPages(res.totalPages);
                setPageCurrent(res.pageable.pageNumber);
                setMessageError("");
                if (res.content.length === 0) {
                    console.log("a");
                    setMessageError("Không có kết quả tìm kiếm !");
                    setMovies([]);
                    setTotalPages(0);
                    setPageCurrent(0);
                }
            }
            )
            console.log(movies.movieId)
    };

    const prevPage = () => {
        const pg = pageCurrent > 0 ? pageCurrent - 1 : 0;
        searchName(search, pg)
            .then(res => {
                setMovies(res.content);
                setPageCurrent(res.pageable.pageNumber);
            });
    };

    const nextPage = () => {
        const pg = pageCurrent < totalPages - 1 ? pageCurrent + 1 : pageCurrent;
        console.log(search);
        searchName(search, pg)
            .then(res => {
                setMovies(res.content);
                setPageCurrent(res.pageable.pageNumber);
            });
    };

    return (
        <>
            <HeaderTemplateAdmin />
            <section style={{ position: 'relative', marginTop: '16%',marginBottom:'100px' }} className="newIn container py-5">
                <h3 style={{ position: 'absolute', top: '-70px', transform: 'translateX(136%)', fontWeight: 'bold', fontSize: 35 }}>KẾT QUẢ TÌM KIẾM PHIM</h3>
                <form style={{top:'-25px'}} onSubmit={onHandleSearch} className="tesster" >
                    <input name='search' value={search} onChange={handleSearch} placeholder=" Tìm kiếm phim ..." type="text" className="input_tesst" />
                    <button type="submit"  className="new_btnn"><i className="fas fa-search" /></button>
                </form>
                {movies.length === 0 && <p className='message_error'>{messageError}</p>}
                {movies.length > 0 && (
                    <div>
                        <div className="newIn__content">
                            <div className="row text-center">
                                {movies.map(value => (
                                    <div key={value.name} className="col-6 col-md-3 list__film">
                                        <div className="newIn__img">
                                            <img className="img-fluid" src={value.poster} alt={value.name} />
                                            <div className="newIn__overlay" />
                                            <div className="newIn__play text-white">
                                                <span className="format-description">{value.description}</span>
                                                <div className="container__button-position">
                                                <Link style={{fontSize:'18px'}} className="btn__add-book" to={`/home/detail/${value.movieId}`}>ĐẶT VÉ</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={`/home/detail/${value.movieId}`} className="container-title" >
                                            <h3 style={{height:'100px'}} className="title__name-film">{value.name}</h3>
                                        </Link>
                                    </div>

                                ))}

                            </div>
                        </div>
                        <div className='container_pageable'>
                            <button className='btn_pageable' onClick={prevPage} disabled={pageCurrent === 0}>Trước</button>
                            <button className='btn_pageable' onClick={nextPage} disabled={pageCurrent === totalPages - 1}>Sau</button>
                        </div>
                    </div>
                )
                }
            </section>
            <Footer />
        </>
    );
};

export default Search;
