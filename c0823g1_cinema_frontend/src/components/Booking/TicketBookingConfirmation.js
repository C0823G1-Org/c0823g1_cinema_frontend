import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as bookingService from "../../service/BookingService"
export default function TicketBookingConfirmation() {
    const [abc, setAbc] = useState({})
    const navigate = useNavigate()
    const [info, setInfo] = useState({
        "seatList": [15, 16, 17],
        "scheduleId": 1,
        "accountId": 4
    })
    const handleClick = async () => {
        console.log(info)
        console.log(abc)
        navigate("/booking/checkout", { state: { myResult: info } })

    }
    return (
        <>
            <h1>Sau khi chọn ghế</h1>
            <button onClick={() => handleClick()}>Submit</button>
        </>
    )
}