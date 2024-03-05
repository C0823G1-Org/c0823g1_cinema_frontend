
import '../../../src/css/HungVXK_EmployeeManager.css'
import '../../index.css'
import {useEffect, useState} from "react";
import {EmployeeService} from "../../service/EmployeeService";
export default function TicketList() {
    const[listBooking,setListBooking] = useState([]);
    const[search,setSearch] = useState("");
    const[searchDate,setSearchDate] = useState("");

    const handleChangeValue =  (e) => {
        setSearch(e.target.value);
    }
    const handleChangeDate =  (e) => {
        setSearchDate(e.target.value);
    }

    const handleSearch = async () => {
            let result;
            if (search && searchDate) {
                result = await EmployeeService.searchWithParamDateAndValue(search, searchDate);
            } else if (search && !searchDate) {
                result = await EmployeeService.searchWithParamInput(search);
            } else if (!search && searchDate) {
                result = await EmployeeService.searchWithParamDate(searchDate);
            } else {
                result = await EmployeeService.searchWithoutParam();
            }

            if (result.flag === "FOUND") {
                console.log(result.flag)
                setListBooking(result.data.content);
            } else {
                console.log(result.flag)
                alert("Không tìm thấy");
                setListBooking(result.data.content);
            }

    }
    const  fetchData = async () => {
        try {
            const listData = await EmployeeService.listBooking();
            setListBooking(listData.data.content);
        } catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
            fetchData()

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

                                    <a href="../template/DoLV_ExportPDF.html" className="delete"><span
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
                        <ul className="pagination">
                            <li className="page-item disabled"><a href="#">Trang sau</a></li>
                            <li className="page-item active"><a href="#" className="page-link">1</a></li>
                            <li className="page-item"><a href="#" className="page-link">2</a></li>
                            <li className="page-item"><a href="#" className="page-link">3</a></li>
                            <li className="page-item"><a href="#" className="page-link">4</a></li>
                            <li className="page-item"><a href="#" className="page-link">5</a></li>
                            <li className="page-item"><a href="#" className="page-link">Trang trước</a></li>
                        </ul>
                    </div>
                </div>
            </div>


        </>

    )
}