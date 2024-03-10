import "../Booking/BookingSeat.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSchedule, getSeat } from "../../service/BookingService";
import classNames from 'classnames';
import Figure from 'react-bootstrap/Figure';
import Footer from "../Home/Footer";
import HeaderTemplateAdmin from "../Home/HeaderTemplateAdmin";

export default function BookingSeat() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    useEffect(() => {
        const roleUser = sessionStorage.getItem("roleUser");
        if (roleUser === null) {
            navigate(`/login`);
        } else {
            setRole(roleUser);
        }
    }, []);
    const [tickets, setTickets] = useState([])
    const [totalSeat, setTotalSeat] = useState(0)
    const [selected, setSelected] = useState([])
    const [schedule, setSchedule] = useState(null)
    const [result, setResult] = useState({})
    const location = useLocation()
    const data = location.state.myResult;

    const [userId, setUserId] = useState(0);

    useEffect(() => {
        const id = sessionStorage.getItem("userId");
        setUserId(id);
        const fetchData = async () => {
            try {
                const scheduleResult = await getSchedule(data.movieId, data.date, data.scheduleTimeId);
                const seatResult = await getSeat(scheduleResult.id);
                if (seatResult) {
                    const seatNumbers = seatResult.map((ticket) => ticket.seatNumber);
                    setTickets(seatNumbers);
                }

                setTotalSeat(scheduleResult.hall.totalSeat);
                setSchedule(scheduleResult)

            } catch (error) {
                // setLoading(false)
            }
        };

        fetchData();

    }, []);
    const handleBack = () => {
        if (data.backId === 1) {
            navigate(`/home/detail/${data.movieId}`)
        } else if (data.backId === 2) {
            navigate("/booking")
        }

    }

    const handleSubmit = async () => {
        const newResult = {
            "seatList": selected,
            "scheduleId": schedule.id,
            "accountId": userId,
            "backId": data.backId,
            "movieId": data.movieId,
            "date": data.date,
            "scheduleTimeId": data.scheduleTimeId
        };

        setResult(newResult);

        try {
            // Example: await someAsyncFunction();
            // You can perform API calls, data fetching, etc.
            // Once the asynchronous operations are done, navigate
            // navigate("/booking/checkout", { state: { myResult: newResult } });
            navigate("/booking/checkout", { state: { myResult: newResult } });
        } catch (error) {
            console.error("Error during asynchronous operations:", error);
        }
    };
    console.log(result)
    const handleClick = (e, seatNumber) => {
        if ((e.target.classList.contains('seat')
            || e.target.classList.contains('vip')
            || e.target.classList.contains('couple'))
            && !e.target.classList.contains('occupied')) {
            const isCoupleSeat = e.target.classList.contains('couple');
            if (isCoupleSeat) {
                if (seatNumber % 2 !== 0) {
                    const isSelected = selected.includes(seatNumber) && selected.includes(seatNumber + 1);

                    e.target.classList.toggle('selected', !isSelected);
                    e.target.nextSibling.classList.toggle('selected', !isSelected);

                    if (isSelected) {
                        setSelected(selected.filter((seat) => seat !== seatNumber && seat !== seatNumber + 1));
                    } else {
                        setSelected([...selected, seatNumber, seatNumber + 1]);
                    }
                } else {
                    const isSelected = selected.includes(seatNumber) && selected.includes(seatNumber - 1);

                    e.target.classList.toggle('selected', !isSelected);
                    e.target.previousSibling.classList.toggle('selected', !isSelected);

                    if (isSelected) {
                        setSelected(selected.filter((seat) => seat !== seatNumber && seat !== seatNumber - 1));
                    } else {
                        setSelected([...selected, seatNumber, seatNumber - 1]);
                    }
                }

            } else {
                e.target.classList.toggle('selected');
                const isSelected = selected.includes(seatNumber);

                if (isSelected) {
                    setSelected(selected.filter((seat) => seat !== seatNumber));
                } else {
                    setSelected([...selected, seatNumber]);
                }
            }
        }
    }
    const getRowLabel = (rowIndex) => {
        const alphabetIndex = Math.floor((rowIndex - 1) / 10);
        return String.fromCharCode(65 + alphabetIndex);
    };
    const getSeatPositionInRow = (seatNumber) => {
        return seatNumber % 10 === 0 ? 10 : seatNumber % 10;
    };
    const renderSeats = () => {
        const seats = [];
        let rowSeats = [];

        for (let i = 1; i <= totalSeat; i++) {
            const isCoupleSeat = i > totalSeat - 10;
            const isOccupied = tickets.some((ticket) => ticket === i);
            const shouldAddCoupleClass = isCoupleSeat && !isOccupied && i > totalSeat - 10;
            rowSeats.push(
                <div
                    className={classNames({
                        seat: true,
                        occupied: isOccupied,
                        selected: selected.includes(i),
                        couple: shouldAddCoupleClass
                    })}
                    onClick={(e) => handleClick(e, i)}
                    key={i}
                >
                    {getSeatPositionInRow(i)}
                </div>
            );

            if (i % 10 === 0) {
                seats.push(
                    <div className="rowBS" key={i / 10}>
                        <div className="rowSeat">{getRowLabel(i)}</div>
                        {rowSeats}
                    </div>
                );
                rowSeats = [];
            }
        }

        if (rowSeats.length > 0) {
            seats.push(
                <div className="rowBS" key={totalSeat / 10 + 1}>
                    <div className="rowSeat">{getRowLabel(totalSeat)}</div>
                    {rowSeats}
                </div>
            );
        }

        return <div style={{ marginTop: "3rem" }}>{seats}</div>;
    };
    if (!schedule) return "loading"
    console.log(schedule)
    //Format dates
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    // Format time
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const formattedHours = parseInt(hours, 10).toString();
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}h${formattedMinutes}`;
    };
    // Format price
    const formatNumberWithThousandSeparator = (number) => {
        return number.toLocaleString('en-US');
    };
    return (

        <>
            <HeaderTemplateAdmin />
            <div style={{ marginTop: "20vh" }}>
                <div className="row m-0">
                    <div className=" map1 col-8 p-0 mx-0">
                        <ul className="showcase" style={{ backgroundColor: 'white' }}>
                            <li>
                                <div className="seat"></div>
                                <small style={{ color: 'black' }}>Ghế trống</small>
                            </li>
                            <li>
                                <div className="seat selected"></div>
                                <small style={{ color: 'black' }}>Ghế đang chọn</small>
                            </li>
                            <li>
                                <div className=" occupied"></div>
                                <small style={{ color: 'black' }}>Ghế đã có người đặt</small>
                            </li>
                            <li>
                                <div className=" couple"></div>
                                <small style={{ color: 'black' }}>Ghế đôi</small>
                            </li>
                        </ul>
                        <div className="containerBS" id="container1">
                            <div className=" screen" style={{ fontSize: '200%', paddingTop: '10px' }}> MÀN HÌNH</div>

                            {
                                renderSeats()
                            }
                        </div>
                    </div>
                    <div className=" col-4 p-0 mx-0" style={{ boxShadow: '10px 10px 20px black' }}>
                        <div className="col-span-1 xl:pl-4 xl:order-none order-first">
                            <div className="booking__summary md:mb-4">
                                <div className="bg-white px-4 grid grid-cols-3 xl:gap-2 items-center"
                                    style={{ paddingRight: '0 !important' }}>
                                    <div
                                        className="row-span-2 md:row-span-1 xl:row-span-2 block md:hidden xl:block d-flex justify-content-center"
                                        style={{ marginTop: '7%' }}>

                                        <Figure>
                                            <Figure.Image
                                                width={190}
                                                height={300}
                                                alt="171x180"
                                                src={schedule.movie.poster}
                                            />
                                        </Figure>
                                    </div>
                                    <div className="flex-1 col-span-2 md:col-span-1 row-span-1 xl:col-span-2"><h3
                                        className="text-sm xl:text-base font-bold xl:mb-0 d-flex justify-content-center mt-2 text-align-center">
                                        {schedule.movie.name}</h3>
                                        <p className="text-sm inline-block">{schedule.hall.id === 1 || schedule.hall.id === 2 ? "2D Phụ đề" : "3D Phụ đề"}</p>
                                        <hr className="my-0" />
                                    </div>
                                    <div className="col-span-2 md:col-span-1 xl:col-span-3">
                                        <div>
                                            <div className="xl:mt-0  xl:text-base">
                                                <strong>Suất: </strong>
                                                <strong>{formatTime(schedule.scheduleTime.scheduleTime)}</strong><strong> - </strong><strong>{formatDate(schedule.date)}</strong><br />
                                                <strong>Phòng: {schedule.hall.name}</strong>
                                            </div>
                                        </div>
                                        <div
                                            className="my-2 border-t border-grey-60 border-dashed xl:block hidden"></div>
                                    </div>
                                    <div className="xl:flex hidden justify-between col-span-3"><strong
                                        className="text-base"> Bạn đã chọn <span
                                            className="inline-block font-bold text-primary "
                                            style={{ fontSize: "large" }}>&nbsp;{selected.length}</span> vé.
                                        Tổng
                                        cộng</strong><strong
                                            className="inline-block font-bold text-primary " style={{ fontSize: "large" }}>&nbsp;{formatNumberWithThousandSeparator(schedule.movie.ticketPrice * selected.length)}</strong> VNĐ
                                    </div>
                                    <div
                                        className="xl:flex mt-5 px-5 hidden d-flex justify-content-between align-items-center col-span-3">

                                        <button style={{ width: '100px' }} className="btn__back" onClick={handleBack}>Quay lại</button>

                                        <button style={{ width: '100px' }} className="btn__booking"
                                            disabled={selected.length === 0} onClick={() => handleSubmit()}>Đặt vé
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
                <Footer />
            </div>

        </>
    )
}