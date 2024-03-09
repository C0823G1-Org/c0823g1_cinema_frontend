import { useLocation, useNavigate } from "react-router-dom"
import "./CheckoutStyle.css"
import { useEffect, useState } from "react";
import * as bookingService from "../../service/BookingService"
import { Paypal } from "./Paypal";
import CountdownClock from "./CountdownClock";
import Footer from "../Home/Footer";
import axios from 'axios';
import swal from 'sweetalert';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import HeaderTemplateAdmin from "../Home/HeaderTemplateAdmin";

export default function Checkout() {
    document.title = "Xác Nhận & Thanh Toán"
    const navigate = useNavigate()
    useEffect(() => {
        const roleUser = sessionStorage.getItem("roleUser");
        if (roleUser === null) {
            navigate(`/login`);
        } else {

        }
    }, []);
    const location = useLocation()
    const [dataA, setDataA] = useState()
    const [resl, setResl] = useState();
    const [price, setPrice] = useState()
    const [totalAmount, setTotalAmount] = useState()
    const [exchangeRates, setExchangeRates] = useState(null);

    useEffect(() => {
        if (location.state.myResult) {
            setResl(location.state.myResult)
            console.log(resl);

        }

    }, [location])

    useEffect(() => {
        let getdata = async (result) => {
            return await bookingService.selectTicket(result)
        }
        getdata(resl).then((data) => {
            console.log({ data })
            setDataA({
                "accountId": data.accountId,
                "date": data.date,
                "email": data.email,
                "image": data.image,
                "movieName": data.movieName,
                "price": data.price,
                "scheduleId": data.scheduleId,
                "screen": data.screen,
                "seat": data.seat,
                "seatNumber": data.seatNumber,
                "sum": data.sum,
                "time": data.time,
                "bookingId": data.bookingId
            })
            const prc = data.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            setPrice(prc)
            const ta = data.sum.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            setTotalAmount(ta)
        }).catch((err) => {
        })
    }, [resl])
    useEffect(() => {
        console.log(exchangeRates);
        const fetchExchangeRates = async () => {
            try {
                const appId = '21e06263576c496fe2175f9d'; // Thay thế bằng App ID của bạn từ Open Exchange Rates
                const apiUrl = `
https://v6.exchangerate-api.com/v6/21e06263576c496fe2175f9d/latest/USD
`;
                const response = await axios.get(apiUrl);
                console.log(response)
                const vndRate = response.data.conversion_rates.VND;
                setExchangeRates(vndRate);
            } catch (error) {
                console.error('Lỗi khi gửi yêu cầu API:', error);
            }
        };
        fetchExchangeRates();
        console.log(exchangeRates)


    }, []);
    const vnd = exchangeRates;
    console.log(vnd)


    window.onload = function () {
        // Retrieve user name
        var user = localStorage.getItem('user');
        if (user !== "undefined" && user !== "null") {
            setResl(JSON.parse(user))
        }
        setResl(resl)
        console.log(resl);
    }


    const handleCheck = async () => {
        let res = await bookingService.checkExist({
            "totalAmount": dataA.sum,
            "accountId": dataA.accountId,
            "scheduleId": dataA.scheduleId,
            "seat": dataA.seat,
            "bookingId": dataA.bookingId,
            "seatNumber": dataA.seatNumber
        })
        if (res.response && res.response.status === 400) {
            console.log(res);
            navigate(`/booking/seat`, { state: { myResult: { "movieId": resl.movieId, "date": resl.date, "scheduleTimeId": resl.scheduleTimeId, "backId": resl.backId } } })
            swal({
                title: "loi",
                text: "Ghe da co nguoi dat!",
                type: "error",
                icon: "error",
                button: {
                    text: "OK",
                },
            });
        }
        setCheckOut(true);


    }



    const handleBack = async () => {
        let movieId = await bookingService.handleFail({
            "totalAmount": dataA.sum,
            "accountId": dataA.accountId,
            "scheduleId": dataA.scheduleId,
            "seat": dataA.seat,
            "bookingId": dataA.bookingId
        });
        navigate(`/booking/seat`, { state: { myResult: { "movieId": resl.movieId, "date": resl.date, "scheduleTimeId": resl.scheduleTimeId, "backId": resl.backId } } })
    }

    const [checkout, setCheckOut] = useState(false)
    if (!dataA) return null
    return (
        <>
            <HeaderTemplateAdmin />
            <div className="mt">
                <h1 className="h1 text-center">Thông Tin Đặt Vé</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 col-md-2 col-sm-12"></div>
                        <div className="col-12 col-md-3 col-sm-12">
                            <img className="imgMovie" src={dataA.image} alt="Madame Web
                Xem thêm tại:
https://www.galaxycine.vn/
" />
                        </div>
                        <div className="col-12 col-md-5 col-sm-12">
                            <table className="table tableTicket">
                                <tbody>
                                    <tr>
                                        <th colSpan="2" className="thTable">
                                            <h4 style={{ fontWeight: "bold" }}>{dataA.movieName}</h4>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="thTable">Phòng chiếu</th>
                                        <td className="tdTable">{dataA.screen}</td>
                                    </tr>
                                    <tr>
                                        <th className="thTable">Ngày chiếu</th>
                                        <td className="tdTable">{dataA.date}</td>
                                    </tr>
                                    <tr>
                                        <th className="thTable">Giờ chiếu</th>
                                        <td className="tdTable">{dataA.time}</td>
                                    </tr>
                                    <tr>
                                        <th className="thTable">Ghế</th>
                                        <td className="tdTable">
                                            {dataA.seat && dataA.seat.map((seatN, index) => (
                                                seatN + " "
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="thTable">Giá</th>
                                        {price && dataA.seat && <td style={{ whiteSpace: 'pre-line' }} className="tdTable">
                                            {dataA.seat.map((seatN, index) => (
                                                `${seatN} : ${price} \n`

                                            ))}
                                        </td>}
                                    </tr>
                                    <tr>
                                        <th className="thTable">Tổng cộng</th>
                                        {totalAmount && <td className="tdTable">{totalAmount}</td>}
                                    </tr>
                                    <tr>
                                        <th className="thTable">Email</th>
                                        <td className="tdTable">{dataA.email}</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={2} className="thTable">
                                            {checkout ? <CountdownClock information={{
                                                "totalAmount": dataA.sum,
                                                "accountId": dataA.accountId,
                                                "scheduleId": dataA.scheduleId,
                                                "seat": dataA.seat,
                                                "bookingId": dataA.bookingId
                                            }} /> : null}

                                        </th>
                                    </tr>
                                    <tr>
                                        <td className="tdTable">
                                            <button className="btn btn__delete" onClick={() => handleBack()}>Quay lại</button>
                                        </td>

                                        <td className="tdTable">
                                            {checkout ? (
                                                <Paypal
                                                    information={{
                                                        "totalAmount": dataA.sum,
                                                        "accountId": dataA.accountId,
                                                        "scheduleId": dataA.scheduleId,
                                                        "seat": dataA.seat,
                                                        "bookingId": dataA.bookingId,
                                                        "seatNumber": dataA.seatNumber,
                                                        "vnd": { vnd }
                                                    }

                                                    }
                                                />
                                            ) : (
                                                <button className="btn btn__edit"

                                                    onClick={() => {
                                                        handleCheck();
                                                    }}
                                                >
                                                    Xác nhận
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
            <div style={{ marginTop: "2rem" }}>
                <Footer />
            </div>
        </>
    )
}