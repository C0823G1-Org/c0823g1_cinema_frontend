import "./TicketList.css"
import {useEffect, useState} from "react";
import {EmployeeService} from "../../service/EmployeeService";
import ReactPaginate from "react-paginate";
import {Link, useNavigate} from "react-router-dom";
import SweetAlert from "sweetalert";
import {Sidebar} from "../Admin/Sidebar/Sidebar";
import {format} from "date-fns";
import MySwal from "sweetalert2";
export default function TicketList() {
    const navigate = useNavigate();
    const [token,setToken] = useState("");
    useEffect(() => {
        const roleUser = sessionStorage.getItem("roleUser");
        const accessToken = sessionStorage.getItem("accessToken");
        setToken(accessToken);
        if (roleUser === "ROLE_CUSTOMER" || roleUser === null) {
            navigate(`/login`);
        }
    }, []);
    const[listBooking,setListBooking] = useState([]);
    const[search,setSearch] = useState("");
    const[searchDate,setSearchDate] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [searchPage, setSearchPage] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);

    const handleChangeValue =   (e) => {
        const specialCharsRegex = /[!@#$%^&*()~+-]/;
        if (specialCharsRegex.test(e.target.value)) {
            MySwal.fire({
                text: "Không được nhập các ký tự đặt biệt",
                icon: "warning"
            });
            setSearch(search)
        } else if (e.target.value.length > 100){
            MySwal.fire({
                text: "Không được nhập quá 100 ký tự",
                icon: "warning"
            });
            setSearch("")
        }
        else {
            setSearch(e.target.value);
        }
    }

    const handleChangeDate =  (e) => {
        setSearchDate(e.target.value);
    }

    const handleDetailExport = async (bookingId) => {
        let result = await EmployeeService.findBookingDetail(bookingId, token);


        if (result.flag === "FOUND"){
            navigate("/employee/exportDetail",{state:{listBooking:result.data,idBooking:bookingId}})
        } else if (result.flag === "BAD_REQUEST"){
            await SweetAlert("Vé không tồn tại hoặc đã được in rồi!","", "error")
            setListBooking(result.data.content);
            setTotalPages(result.data.totalPages);
        }
    }

    const handleSearch = async () => {
        console.log(token)
        let result;
        if (search && searchDate) {
            result = await EmployeeService.searchWithParamDateAndValue(search, searchDate,0,token);
        } else if (search && !searchDate) {
            result = await EmployeeService.searchWithParamInput(search,0,token);
        } else if (!search && searchDate) {
            result = await EmployeeService.searchWithParamDate(searchDate,0,token);
        } else {
            result = await EmployeeService.searchWithoutParam(0,token);
        }

        if (result.flag === "FOUND") {
            console.log(result.flag)
            setListBooking(result.data.content);
            setTotalPages(result.data.totalPages);
            setSearchPage(true);
        }
        else {
            console.log(result.flag)
            setListBooking([]);
            setTotalPages(result.data.totalPages);
        }
        setCurrentPage(0)
        console.log(currentPage)
        console.log(result.data.content);

    }

    const handlePageClick = async (event) => {
        let result;
        try {
            const pageNumber = event.selected;
            setCurrentPage(pageNumber);
            if (searchPage){
                if (search && searchDate) {
                    result = await EmployeeService.searchWithParamDateAndValue(search, searchDate,pageNumber,token);
                } else if (search && !searchDate) {
                    result = await EmployeeService.searchWithParamInput(search,pageNumber,token);
                } else if (!search && searchDate) {
                    result = await EmployeeService.searchWithParamDate(searchDate,pageNumber,token);
                } else {
                    result = await EmployeeService.searchWithoutParam(pageNumber,token);
                }
                setListBooking(result.data.content);
                setTotalPages(result.data.totalPages);

            } else {
                const listData = await EmployeeService.listBooking(pageNumber,token);
                setListBooking(listData.data.content);
                setTotalPages(listData.data.totalPages);
            }

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken")
        const  fetchData = async (page,token) => {
            try {
                const listData = await EmployeeService.listBooking(page,token);
                setListBooking(listData.data.content);
                setTotalPages(listData.data.totalPages);
            } catch (e){
                console.log(e)
            }
        }
        fetchData(currentPage, accessToken)
        console.log("Current Page:", currentPage);
    }, []);
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    };
    return (
        <>
            <Sidebar />
            <section className="home-section">
                <div className="container body_movie">
                    <h1 style={{paddingTop:"20px"}}>Quản lý đặt vé</h1>
                    <div className="table-wrapper_movie">
                        <div className="table-title_movie">
                            <div className="row">
                                {/* Col 9 */}
                                <div className="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9" style={{height: "5.2rem"}}>
                                    <form className="form-group my-2 my-lg-0 p-0 m-0 ">
                                        <h5 style={{color: "white",paddingLeft:"15px"}}>Nhập ngày</h5>
                                        <div className="d-flex flex-wrap">
                                            <div className="col-12 d-flex">
                                                <div className="col-6">
                                                    <div className="d-flex">
                                                        <input id="dateInput2" className="form-control mr-sm-2 w-100 mb-2" type="date" style={{marginLeft: "-1rem"}}
                                                               onChange={handleChangeDate}
                                                               name="startDate"
                                                               min={new Date().toISOString().split("T")[0]}
                                                        />
                                                        <input className="form-control mr-sm-2 w-100 mb-2" type="search"  placeholder="Thông tin khách hàng"
                                                               onChange={handleChangeValue}
                                                               aria-label="Search"
                                                               value={search}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    <button style={{paddingTop:"13px"}} className="btn F my-sm-0 btn__search_movie w-100" type="button"
                                                            onClick={handleSearch}
                                                    >Tìm kiếm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table_movie table-striped_movie table-hover_movie ">
                                <thead>
                                <tr>
                                    <th style={{width:"5%"}}>STT</th>
                                    <th style={{width:"10%"}}>Mã đặt vé</th>
                                    <th style={{width:"20%"}}>Họ tên</th>
                                    <th style={{width:"10%"}}>CMND</th>
                                    <th style={{width:"10%"}}>Số điện thoại</th>
                                    <th style={{width:"10%"}}>Ngày đặt</th>
                                    <th style={{width:"25%"}}>Phim</th>
                                    <th style={{width:"10%"}}>Chức năng</th>
                                </tr>
                                </thead>
                                <tbody>
                                { listBooking.length !== 0 ? ( listBooking.map((item,index) => (
                                        <tr key={item.bookingCode}>
                                            <td>{index + 1}</td>
                                            <td>DV-{item.bookingCode}</td>
                                            <td>{item.nameCustomer}</td>
                                            <td>{item.idNumber || "Đang cập nhật"}</td>
                                            <td>{item.phoneNumber ? formatPhoneNumber(item.phoneNumber) : "Đang cập nhật"}</td>
                                            <td>{format(new Date(item.dateBooking), 'dd/MM/yyyy')}</td>
                                            <td className="table_movie_ellipsis">{item.nameMovieFilm}</td>

                                            <td>
                                                <Link onClick={() => handleDetailExport(`${item.bookingCode}`)} className="edit" to={"#"}><i
                                                    style={{color: "#FFC107"}} className="material-icons"
                                                    data-toggle="tooltip"
                                                    title="Xuất PDF"><span
                                                    className="material-icons">
                          exit_to_app
                          </span></i></Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (<tr>
                                    <td colSpan="7" className="text-danger h5">Không tìm thấy dữ liệu</td>
                                </tr>)

                                }
                                </tbody>
                            </table>
                            { listBooking.length !== 0 ?  <div className="clearfix">
                                <div style={{float: "right"}} className="page">
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="Trang sau"
                                        onPageChange={handlePageClick}

                                        pageRangeDisplayed={2}
                                        marginPagesDisplayed={2}
                                        pageCount={totalPages}
                                        previousLabel="Trang trước"
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
                                        initialPage={currentPage}
                                    />
                                </div>
                            </div> : ""}
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}