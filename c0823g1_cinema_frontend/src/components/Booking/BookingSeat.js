import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as bookingService from "../../service/BookingService"
export default function BookingSeat() {
    const [abc, setAbc] = useState({})
    const navigate = useNavigate()
    const [info, setInfo] = useState({
        "seatList": [20, 21, 22, 23],
        "scheduleId": 1,
        "accountId": 9
    })


    let getData = async () => {
        let data = await bookingService.selectTicket(info)
        setAbc({
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
    }
    const handleClick = async () => {
        console.log(info)
        console.log(abc)
        navigate("/booking/checkout", { state: { myResult: abc } })

    }
    useEffect(() => {
        console.log(info)
        console.log(abc)
        getData()
    }, [])
    return (
        <>
            <h1>Sau khi chọn ghế</h1>
            <button onClick={() => handleClick()}>Submit</button>
        </>
    )
}