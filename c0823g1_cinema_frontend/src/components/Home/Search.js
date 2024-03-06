import React, { useEffect, useState } from 'react';
import '../Home/Home.css'
import { searchName } from '../../service/MovieService';
import { useLocation } from 'react-router-dom';
import HeaderTemplateAdmin from './HeaderTemplateAdmin';
import Footer from './Footer';

const Search = () => {
    const location = useLocation();
    const data = location.state?.movies || [];
    const wordSearch = location.state?.search || "";
    const [search, setSearch] = useState(wordSearch || "");
    const [movies, setMovies] = useState(data.content || []);
    const [pageCurrent, setPageCurrent] = useState(data.pageable.pageNumber || 0);
    const [totalPages, setTotalPages] = useState(data.totalPages || 0);
    const [messageError, setMessageError] = useState("Không có kết quả tìm kiếm !");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const onHandleSearch = () => {
        console.log(search);
        searchName(search, 0)
            .then(res => {
                setMovies(res.content);
                setTotalPages(res.totalPages);
                setPageCurrent(res.pageable.pageNumber);
                setMessageError("");
                if(res.content.length === 0) {
                    console.log("a");
                    setMessageError("Không có kết quả tìm kiếm !");
                    setMovies([]);
                    setTotalPages(0);
                    setPageCurrent(0);
                }
            })
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
            <HeaderTemplateAdmin/>
            <section style={{ position: 'relative', marginTop: '16%' }} className="newIn container py-5">
                <h3 style={{ position: 'absolute', top: '-70px', transform: 'translateX(109%)', fontWeight: 'bold', fontSize: 35 }}>KẾT QUẢ TÌM KIẾM PHIM</h3>
                <div className="container__input">
                    <input onChange={handleSearch} name='name' placeholder=" Tìm kiếm phim ..." type="text" />
                    <button onClick={onHandleSearch} className="btn__edit-search">
                        Tìm
                        <i className="fas fa-search" />
                    </button>
                </div>
                {movies.length === 0 && <p className='message_error'>{messageError}</p>}
                {!messageError && (
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
                                                <a className="btn__edit">Chi tiết</a>
                                                <a className="btn__add" href="../template/TuanNM_detailcnm.html">Đặt vé</a>
                                            </div>
                                        </div>
                                    </div>
                                    <a className="container-title" href="*">
                                        <h3 className="title__name-film">{value.name}</h3>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className='container_pageable'>
                    <button className='btn_pageable' onClick={prevPage} disabled={pageCurrent === 0}>Prev</button>
                    <button className='btn_pageable' onClick={nextPage} disabled={pageCurrent === totalPages - 1}>Next</button>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Search;
