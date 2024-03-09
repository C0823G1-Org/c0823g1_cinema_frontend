import {useLocation, useNavigate} from "react-router-dom";
import '../../index.css';
import {EmployeeService} from "../../service/EmployeeService";
import SweetAlert from "sweetalert";
import Footer from "../Home/Footer";
import HeaderTemplateAdmin from "../Home/HeaderTemplateAdmin";
import {useEffect, useState} from "react";




export  default function ExportDetail(){
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state.listBooking;
    const [token,setToken] = useState("");
    useEffect(() => {
        const roleUser = sessionStorage.getItem("roleUser");
        const accessToken = sessionStorage.getItem("accessToken");
        setToken(accessToken);
        if (roleUser === "ROLE_CUSTOMER" || roleUser === null) {
            navigate(`/login`);
        }
    }, []);
    const handleExportFile = async(id) => {
        const rs = await EmployeeService.exportFile(id,token);
        navigate("/employee/ticketList");
        if (rs.flag === "OK"){
            const a = document.createElement("a");
            a.href = "data:application/pdf;base64," + rs.base64;
            a.download = ""
            a.click()
            navigate("/employee/ticketList");
            SweetAlert("Vé  được in thành công","", "success")
        } else {
            navigate("/employee/ticketList");
            await SweetAlert("Vé đã có người in hoặc không tồn tại!","", "error");
        }
    }
    return(
        <>
            <HeaderTemplateAdmin />
            <h1 className="h1 text-center" style={{marginTop:"26vh"}}>Thông tin đặt vé</h1>
            {data.map((item) => (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-3">
                            <img style={{width: "80%", height: "70%", marginTop: "1em"}}
                                 src={`${item.posterFilm}`}/>
                        </div>
                        <div className="col-6">
                            <table className="table">
                                <tr>
                                    <th>Phòng</th>
                                    <td>{item.cinemaHall}</td>
                                </tr>
                                <tr>
                                    <th>Phim</th>
                                    <td>{item.nameMovieFilm}</td>
                                </tr>
                                <tr className="tr">
                                    <th>Tên khách hàng</th>
                                    <td>{item.nameCustomer}</td>
                                </tr>
                                <tr className="tr">
                                    <th>Ngày chiếu</th>
                                    <td>{item.scheduleDate}</td>
                                </tr>


                                <tr>
                                    <th>Giờ chiếu</th>
                                    <td>{item.scheduleTime}</td>
                                </tr>
                                <tr>
                                    <th>Ghế</th>
                                    <td>{item.seatNumber}</td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>
            ))}
            <button style={{marginLeft: "46%"}} className={"btn btn-danger"}
                    onClick={() => handleExportFile(`${location.state.idBooking}`)}
            >Xuất file
            </button>
            <div style={{borderTop: "5vh solid white"}}>
                <Footer/>
            </div>
        </>
    )
}