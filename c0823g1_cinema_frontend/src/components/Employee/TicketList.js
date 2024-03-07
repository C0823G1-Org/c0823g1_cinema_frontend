
import '../../../src/css/HungVXK_EmployeeManager.css'
import '../../index.css'
import {useEffect, useState} from "react";
import {EmployeeService} from "../../service/EmployeeService";
import ReactPaginate from "react-paginate";
import {useNavigate} from "react-router-dom";
import SweetAlert from "sweetalert";
export default function TicketList() {
    const navigate = useNavigate();
    const[listBooking,setListBooking] = useState([]);
    const[search,setSearch] = useState("");
    const[searchDate,setSearchDate] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [searchPage, setSearchPage] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);


    const handleChangeValue =  (e) => {
        setSearch(e.target.value);
    }
    const handleChangeDate =  (e) => {
        setSearchDate(e.target.value);
    }

    const handleDetailExport = async (bookingId) => {
        let result = await EmployeeService.findBookingDetail(bookingId);


        if (result.flag === "FOUND"){
            navigate("/employee/exportDetail",{state:{listBooking:result.data,idBooking:bookingId}})
        } else if (result.flag === "BAD_REQUEST"){
            await SweetAlert("Vé không tồn tại hoặc đã được in rồi!","", "error")
            setListBooking(result.data.content);
            setTotalPages(result.data.totalPages);
        }
    }

    const handleSearch = async () => {
            let result;
            if (search && searchDate) {
                result = await EmployeeService.searchWithParamDateAndValue(search, searchDate,0);
            } else if (search && !searchDate) {
                result = await EmployeeService.searchWithParamInput(search,0);
            } else if (!search && searchDate) {
                result = await EmployeeService.searchWithParamDate(searchDate,0);
            } else {
                result = await EmployeeService.searchWithoutParam(0);
            }

            if (result.flag === "FOUND") {
                console.log(result.flag)
                setListBooking(result.data.content);
                setTotalPages(result.data.totalPages);
                setSearchPage(true);
            } else {
                console.log(result.flag)
                await SweetAlert("Thông tin khách hàng không tồn tại!", "", "error")
                setListBooking(result.data.content);
                setTotalPages(result.data.totalPages);
            }
            setCurrentPage(0)
        console.log(currentPage)

    }

    const handlePageClick = async (event) => {
        let result;
        try {
            const pageNumber = event.selected;
            setCurrentPage(pageNumber);
            if (searchPage){
                if (search && searchDate) {
                    result = await EmployeeService.searchWithParamDateAndValue(search, searchDate,pageNumber);
                } else if (search && !searchDate) {
                    result = await EmployeeService.searchWithParamInput(search,pageNumber);
                } else if (!search && searchDate) {
                    result = await EmployeeService.searchWithParamDate(searchDate,pageNumber);
                } else {
                    result = await EmployeeService.searchWithoutParam(pageNumber);
                }
                setListBooking(result.data.content);
                setTotalPages(result.data.totalPages);

            } else {
                const listData = await EmployeeService.listBooking(pageNumber);
                setListBooking(listData.data.content);
                setTotalPages(listData.data.totalPages);
            }

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const  fetchData = async (page) => {
            try {
                const listData = await EmployeeService.listBooking(page);
                setListBooking(listData.data.content);
                setTotalPages(listData.data.totalPages);
            } catch (e){
                console.log(e)
            }
        }
            fetchData(currentPage)
        console.log("Current Page:", currentPage);
    }, []);

    return (
        <>
            <div className="container">
                <h1>Quản lý vé</h1>
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <div  className="form-inline my-2 my-lg-0">
                                    <div className="d-flex">

                                        <label>
                                            Date  <input  onChange={handleChangeDate} id="dateInput2"
                                                         className="form-control mr-sm-2"
                                                        style={{marginLeft: "5px"}} type="date"
                                                         min={new Date().toISOString().split("T")[0]}
                                        />
                                        </label>
                                        <input onChange={handleChangeValue} className="form-control mr-sm-2" type="search"
                                               placeholder="Thông tin khách hàng"
                                               aria-label="Search"/>
                                        <button onClick={handleSearch} className="btn btn__search my-2 my-sm-0" type="submit">Tìm kiếm
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã đặt vé</th>
                            <th>Họ tên</th>
                            <th>CMND</th>
                            <th>Số điện thoại</th>
                            <th>Ngày Đặt</th>
                            <th>Phim</th>
                            <th>Chức năng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {

                        listBooking.map((item,index) => (
                            <tr key={item.bookingCode}>
                                <td>{index + 1}</td>
                                <td>DV {item.bookingCode}</td>
                                <td>{item.nameCustomer}</td>
                                <td>{item.idNumber}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.dateBooking}</td>
                                <td>{item.nameMovieFilm}</td>

                                <td>

                                    <a onClick={() => handleDetailExport(`${item.bookingCode}`)}  className="delete btn"><span
                                        className="material-icons">
                          exit_to_app
                          </span></a>
                                </td>
                            </tr>
                        ))


                        }

                        </tbody>
                    </table>
                    <div className="clearfix">
                        <div className="hint-text"></div>
                        <div className="page">
                            <ReactPaginate
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
                                initialPage={currentPage}
                            />
                        </div>
                    </div>

                </div>
            </div>


        </>

    )
}