import {useEffect, useState} from "react"
import MovieStatisticChart from "./MovieStatisticChart"
import {fillAllMovie, getTopMovie} from "../../../service/MovieService"
import ReactPaginate from "react-paginate";
import {Sidebar} from "../Sidebar/Sidebar";
import MySwal from "sweetalert2";

export default function MovieStatistic() {
    const [movies, setMovies] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [nameSearch, setNameSearch] = useState('');
    const topMovies = async () => {
        let temp = await getTopMovie(currentPage, nameSearch)
        setMovies(temp.content)
        setTotalPages(temp.totalPages);
    }

    const handlePageClick = async (event) => {
        try {
            const pageNumber = event.selected;
            setCurrentPage(pageNumber);
            const result = await getTopMovie(pageNumber, nameSearch);
            setMovies(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        topMovies()
    }, [])
    const handleNameSearch = (value) => {
        if (value.length > 100) {
            MySwal.fire({
                text: "Không được nhập quá 100 ký tự",
                icon: "warning"
            });
            setNameSearch('');
        } else {
            setNameSearch(value);
        }
    }
    const submitSearch = async () => {
        try {
            const result = await getTopMovie(0, nameSearch);
            setMovies(result.content);
            setTotalPages(result.totalPages);
            setCurrentPage(0);
        } catch (e) {
            console.log(e)
        }
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    return (
        <>
            <Sidebar/>
            <section className="home-section">
                <div className="container mt-3">
                    <div className="row mb-3">
                        <h1>Thống kê phim</h1>
                    </div>
                    <div className="row">
                        <div>
                            <form className="d-flex form-inline" role="search" style={{float: "right"}}>
                                <input style={{width: "50%"}}
                                       className="form-control me-2"
                                       type="search"
                                       placeholder="Nhập tên phim"
                                       aria-label="Search"
                                       name="name"
                                       id="name"
                                       value={nameSearch || ''}
                                       onChange={(event => handleNameSearch(event.target.value))}
                                />
                                <button className="btn btn-outline-success" type="submit"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            submitSearch();}}>
                                    Tìm kiếm
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col lg-6">
                            <MovieStatisticChart/>
                        </div>
                        <div className="col lg-6">
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th style={{width:"60%"}}>Tên phim</th>
                                    <th style={{width:"20%"}}>Tổng số vé</th>
                                    <th style={{width:"20%"}}>Doanh thu</th>
                                </tr>
                                </thead>
                                <tbody>
                                {movies ?(movies.map(movie => (
                                    <tr>
                                        <td>{movie.movie_name}</td>
                                        <td>{movie.sold_ticket}</td>
                                        <td>{formatCurrency(movie.revenue)}</td>
                                    </tr>
                                ))): (<tr>
                                        <td colSpan="3" className="text-danger h5">Không tìm thấy dữ liệu</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {movies?(<div className="clearfix">
                        <div style={{float: "right"}} className="page">
                            <ReactPaginate
                                forcePage={currentPage}
                                breakLabel="..."
                                nextLabel="Trang Sau"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="Trang Trước"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                            />
                        </div>
                    </div>):(<div></div>)}
                </div>
            </section>
        </>
    )
}