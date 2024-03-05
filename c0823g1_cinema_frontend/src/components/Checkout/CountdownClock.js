import React, { useState, useEffect } from 'react';
import * as bookingService from "../../service/BookingService"
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function CountdownClock(props) {
    const navigate = useNavigate()
    const dataTicket = props.information;
    const [countdownTime, setCountdownTime] = useState(5 * 60); // Đếm ngược trong 5 phút (5 * 60 giây)
    const handleCountdown = async () => {
        await bookingService.handleFail(dataTicket)
        navigate("user/history")
        swal({
            title: "Thông báo",
            text: "Thanh toán không thành công!",
            type: "error",
            icon: "error",
            button: {
                text: "OK",
            },
        });
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdownTime > 0) {
                setCountdownTime(prevTime => prevTime - 1);
            }
        }, 1000);
        if (countdownTime === 0) {
            handleCountdown()
        }

        return () => clearInterval(timer);
    }, [countdownTime]);

    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    return (
        <div>
            <span style={{ color: "red", fontSize: "15px" }}>Vui lòng thanh toán trong : {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
        </div>
    );
}

export default CountdownClock;