import { useLocation, useNavigate } from "react-router-dom"
import "./CheckoutStyle.css"
import { useState } from "react";
import * as bookingService from "../../service/BookingService"
import { Paypal } from "./Paypal";
import CountdownClock from "./CountdownClock";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

export default function Checkout() {
    document.title = "Xác Nhận & Thanh Toán"
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state.myResult;
    const price = data.price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    const totalAmount = data.sum.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const handleBack = async () => {
        let movieId = await bookingService.handleFail({
            "totalAmount": data.sum,
            "accountId": data.accountId,
            "scheduleId": data.scheduleId,
            "seat": data.seat,
            "bookingId": data.bookingId
        });
        navigate(`/home/detail/${movieId}`)
    }

    const [checkout, setCheckOut] = useState(false)
    return (
        <>
            <Header />
            <div className="mt">
                <h1 className="h1 text-center">Thông Tin Đặt Vé</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 col-md-2 col-sm-12"></div>
                        <div className="col-12 col-md-3 col-sm-12">
                            <img src={data.image} alt="Madame Web

                Xem thêm tại: https://www.galaxycine.vn/" />
                        </div>
                        <div className="col-12 col-md-5 col-sm-12">

                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th colSpan="2" >
                                            <h4 style={{ fontWeight: "bold" }}>{data.movieName}</h4>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Phòng chiếu</th>
                                        <td>{data.screen}</td>
                                    </tr>
                                    <tr>
                                        <th>Ngày chiếu</th>
                                        <td>{data.date}</td>
                                    </tr>
                                    <tr>
                                        <th>Giờ chiếu</th>
                                        <td>{data.time}</td>
                                    </tr>
                                    <tr>
                                        <th>Ghế</th>
                                        <td>
                                            {data.seat.map((seatN, index) => (
                                                seatN + " "

                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Giá</th>
                                        <td style={{ whiteSpace: 'pre-line' }}>
                                            {data.seat.map((seatN, index) => (
                                                `${seatN} : ${price} \n`

                                            ))}
                                        </td>

                                    </tr>
                                    <tr>
                                        <th>Tổng cộng</th>
                                        <td>{totalAmount}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={2}>
                                            {checkout ? <CountdownClock information={{
                                                "totalAmount": data.sum,
                                                "accountId": data.accountId,
                                                "scheduleId": data.scheduleId,
                                                "seat": data.seat,
                                                "bookingId": data.bookingId
                                            }} /> : null}

                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button className="btn btn__delete" onClick={() => handleBack()}>Quay lại</button>
                                        </td>

                                        <td>
                                            {checkout ? (
                                                <Paypal
                                                    information={{
                                                        "totalAmount": data.sum,
                                                        "accountId": data.accountId,
                                                        "scheduleId": data.scheduleId,
                                                        "seat": data.seat,
                                                        "bookingId": data.bookingId
                                                    }

                                                    }
                                                />
                                            ) : (
                                                <button className="btn btn__edit"
                                                    onClick={() => {
                                                        setCheckOut(true);
                                                    }}
                                                >
                                                    Xác nhận
                                                </button>
                                            )}


                                        </td>
                                    </tr>

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}