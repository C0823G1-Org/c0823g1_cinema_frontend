import '../Movie/MovieList.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteMovie, fillAllMovie} from "../../../service/MovieService";
import ReactPaginate from "react-paginate";
import MySwal from "sweetalert2";
import {format} from 'date-fns';
import {Sidebar} from "../Sidebar/Sidebar";


export default function MovieList() {
    const navigate = useNavigate();
    useEffect(() => {
        const roleUser = sessionStorage.getItem("roleUser");
        if (roleUser !== "ROLE_ADMIN") {
            navigate(`/login`);
        }
    }, []);
    const [movies, setMovies] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [accessToken, setAccessToken] = useState("");
    const fetchApi = async (page, name, publisher, startDate, endDate,token) => {
        try {

            console.log(accessToken);

            const result = await fillAllMovie(page, name, publisher, startDate, endDate, token);
            setMovies(result.content);
            setTotalPages(result.totalPages);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        setAccessToken(token);
        fetchApi(0, nameSearch, nameSearch, startDate, endDate, token);
    }, []);
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
    const handleStartDate = (value) => {
        setStartDate(value);
    }
    const handleEndDate = (value) => {
        setEndDate(value);
    }

    const submitSearch = async () => {
        try {
            if (new Date(endDate) < new Date(startDate)) {
                MySwal.fire({
                    text: "Ngày kết thúc không được nhỏ hơn ngày bắt đầu",
                    icon: "warning"
                });
            }else if(new Date(startDate)<new Date("2001-01-01")){
                MySwal.fire({
                    text: "Ngày bắt đầu không được nhỏ hơn 01-01-2001",
                    icon: "warning"
                });
            }else if(new Date(endDate)>new Date("2100-01-01")){
                MySwal.fire({
                    text: "Ngày kết thúc không được lớn hơn 01-01-2100",
                    icon: "warning"
                });
            } else {
                let res = await fillAllMovie(0, nameSearch, nameSearch, startDate, endDate, accessToken)
                setMovies(res.content);
                setTotalPages(res.totalPages);
                setCurrentPage(0);
            }
        } catch (e) {
            console.log(e)
        }
    }
    const handlePageClick = async (event) => {
        try {
            const pageNumber = event.selected;
            setCurrentPage(pageNumber);
            const result = await fillAllMovie(pageNumber, nameSearch, nameSearch, startDate, endDate, accessToken);
            setMovies(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteClick = async (movie) => {
        MySwal.fire({
            title: "Xóa phim",
            text: `Bạn muốn xóa phim ${movie.name} này?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy bỏ"
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (movies.length === 1){
                    await deleteMovie(movie, accessToken);
                    MySwal.fire(
                        "Xóa thành công!",
                        `${movie.name} đã được xóa.`,
                        "success"
                    );
                    if(currentPage>0) {
                        const result = await fillAllMovie(currentPage - 1, nameSearch, nameSearch, startDate, endDate, accessToken);
                        setMovies(result.content);
                        setTotalPages(result.totalPages);
                        setCurrentPage(currentPage - 1);
                    }else{
                        const result = await fillAllMovie(0, nameSearch, nameSearch, startDate, endDate, accessToken);
                        setMovies(result.content);
                        setTotalPages(result.totalPages);
                        setCurrentPage(0);
                    }
                }else {
                    await deleteMovie(movie, accessToken);
                    MySwal.fire(
                        "Xóa thành công!",
                        `${movie.name} đã được xóa.`,
                        "success"
                    );
                    const result = await fillAllMovie(currentPage, nameSearch, nameSearch, startDate, endDate, accessToken);
                    setMovies(result.content);
                    setTotalPages(result.totalPages);
                }
            }
        });
    }
    const formatDuration = (durationInMinutes) => {
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    }
    return (
        <>
            <Sidebar/>
            <section className="home-section">
                <div className="container body_movie">
                    <h1 style={{paddingTop:"20px"}}>Quản lý phim</h1>
                    <div className="table-wrapper_movie">
                        <div className="table-title_movie">
                            <div className="row">
                                {/* Col 9 */}
                                <div className="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"  style={{height: "5.2rem"}}>
                                    <form className="form-group my-2 my-lg-0 p-0 m-0 ">
                                        <h5 style={{color: "white",paddingLeft:"15px"}}>Chọn ngày khởi chiếu</h5>
                                        <div className="d-flex flex-wrap">
                                            <div className="col-3">
                                                <div className="d-flex">
                                                    <label className="from-start-date_movie">Từ</label>
                                                    <input id="startDate" className="form-control mr-sm-2 w-100 mb-2" type="date"
                                                           onChange={(event => handleStartDate(event.target.value))}
                                                           name="startDate"
                                                           max={endDate}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="d-flex">
                                                    <label className="from-end-date_movie"> Đến </label>
                                                    <input id="endDate" className="form-control mr-sm-2 w-100 mb-2" type="date"
                                                           onChange={(event => handleEndDate(event.target.value))}
                                                           name="endDate"
                                                           min={startDate}/>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <input className="form-control mr-sm-2 w-100 mb-2" type="search"
                                                       placeholder="Nhập tên phim, hãng phim"
                                                       name="name"
                                                       aria-label="Search"
                                                       value={nameSearch || ''}
                                                       onChange={(event => handleNameSearch(event.target.value))}
                                                       id="name"/>
                                            </div>
                                            <div className="col-2">
                                                <button style={{paddingTop:"13px"}} className="btn F my-sm-0 btn__search_movie w-100" type="button"
                                                        onClick={() => submitSearch()}
                                                >Tìm kiếm
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* Col 3 */}
                                <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3" style={{marginTop: "19px"}}>
                                    <Link to={"/movie/create"} className="btn btn__add_movie">
                                        <i style={{float: "left", fontSize: "21px", marginRight: "5px"}} className="material-icons">&#xE147;</i>
                                        <span>Thêm mới phim</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table_movie table-striped_movie table-hover_movie ">
                                <thead>
                                <tr>
                                    <th style={{width:"5%"}}>STT</th>
                                    <th style={{width:"30%"}}>Phim</th>
                                    <th style={{width:"15%"}}>Ngày khởi chiếu</th>
                                    <th style={{width:"15%"}}>Hãng phim</th>
                                    <th style={{width:"15%"}}>Thời lượng (giờ)</th>
                                    <th style={{width:"10%"}}>Phiên bản</th>
                                    <th style={{width:"10%"}}>Chức năng</th>
                                </tr>
                                </thead>
                                <tbody>
                                {movies ? (
                                    movies.map((movie, index) => (
                                        <tr key={movie.id}>
                                            <td>{index + 1}</td>
                                            <td className="table_movie_ellipsis">{movie.name}</td>
                                            <td>{format(new Date(movie.startDate), 'dd/MM/yyyy')}</td>
                                            <td className="table_movie_ellipsis">{movie.publisher}</td>
                                            <td>{formatDuration(movie.duration)}</td>
                                            <td>{movie.versions}</td>
                                            <td>
                                                <Link to={`/movie/edit/${movie.id}`} className="edit"><i
                                                    style={{color: "#FFC107"}} className="material-icons"
                                                    data-toggle="tooltip"
                                                    title="Chỉnh sửa">&#xE254;</i></Link>
                                                <Link onClick={() => handleDeleteClick(movie)} className="delete"
                                                      data-toggle="modal" to={""}><i style={{color: "#F44336"}}
                                                                                     className="material-icons"
                                                                                     data-toggle="tooltip"
                                                                                     title="Xóa">&#xE872;</i></Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (<tr>
                                    <td colSpan="7" className="text-danger h5">Không tìm thấy dữ liệu</td>
                                </tr>)}
                                </tbody>
                            </table>
                            {movies ?(
                                <div className="clearfix">
                                    <div style={{float: "right"}} className="page">
                                        <ReactPaginate
                                            forcePage = {currentPage}
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
                                </div>
                            ):<div></div>}

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}