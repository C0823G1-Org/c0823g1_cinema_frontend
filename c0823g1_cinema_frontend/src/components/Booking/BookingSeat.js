import "../Booking/BookingSeat.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSchedule, getSeat} from "../../service/BookingService";
import classNames from 'classnames';
import Figure from 'react-bootstrap/Figure';
import Header from "../Home/Header";
import {Form} from "formik";
import Footer from "../Home/Footer";

export default function BookingSeat() {
    const [tickets, setTickets] = useState([])
    const [totalSeat, setTotalSeat] = useState(0)
    const [selected, setSelected] = useState([])
    const [schedule, setSchedule] = useState(null)
    const [result, setResult] = useState({})
    const navigate = useNavigate();
    const location = useLocation()
    const data = location.state.myResult;
    useEffect(() => {
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
    console.log(data)
    const handleSubmit = () => {
        setResult({
            "seatList": selected,
            "scheduleId": schedule.id,
            "accountId":1
        })

        navigate("/booking/checkout", {state: {myResult: result}})
    }
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
            rowSeats.push(
                <div
                    className={classNames({
                        seat: true,
                        occupied: tickets.some((ticket) => ticket === i),
                        selected: selected.includes(i),
                        couple: isCoupleSeat
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

        return seats;
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
            <Header/>
            <div style={{marginTop: "20vh"}}>
                <div  className="row m-0">
                    <div className=" map1 col-8 p-0 mx-0">
                        <ul className="showcase" style={{backgroundColor: 'white'}}>
                            <li>
                                <div className="seat"></div>
                                <small style={{color: 'black'}}>Ghế trống</small>
                            </li>
                            <li>
                                <div className="seat selected"></div>
                                <small style={{color: 'black'}}>Ghế đang chọn</small>
                            </li>
                            <li>
                                <div className=" occupied"></div>
                                <small style={{color: 'black'}}>Ghế đã có người đặt</small>
                            </li>
                            <li>
                                <div className=" couple"></div>
                                <small style={{color: 'black'}}>Ghế đôi</small>
                            </li>
                        </ul>
                        <div className="containerBS" id="container1">
                            <div className=" screen" style={{fontSize: '200%', paddingTop: '10px'}}> MÀN HÌNH</div>
                            {
                                renderSeats()
                            }
                        </div>
                    </div>
                    <div className=" col-4 p-0 mx-0" style={{boxShadow: '10px 10px 20px black'}}>
                        <div className="col-span-1 xl:pl-4 xl:order-none order-first">
                            <div className="booking__summary md:mb-4">
                                <div className="bg-white px-4 grid grid-cols-3 xl:gap-2 items-center"
                                     style={{paddingRight: '0 !important'}}>
                                    <div
                                        className="row-span-2 md:row-span-1 xl:row-span-2 block md:hidden xl:block d-flex justify-content-center"
                                        style={{marginTop: '7%'}}>
                                        {/*                          <img alt="Madame Web"*/}
                                        {/*                               loading="lazy"*/}
                                        {/*                               width="60%"*/}
                                        {/*                               height="auto"*/}

                                        {/*                               decoding="async"*/}
                                        {/*                               data-nimg="1"*/}
                                        {/*                               className="xl:w-full xl:h-full md:w-[80px] md:h-[120px] w-[90px] h-[110px] rounded object-cover object-cover duration-500 ease-in-out group-hover:opacity-100*/}
                                        {/*scale-100 blur-0 grayscale-0)"*/}
                                        {/*                               src={schedule.movie.poster}*/}
                                        {/*                               style={{color: 'transparent'}}/>*/}
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
                                        <p className="text-sm inline-block">2D Phụ Đề</p>
                                        <hr className="my-0"/>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 xl:col-span-3">
                                        <div>
                                            <div className="xl:mt-0  xl:text-base">
                                                <strong>Suất: </strong>
                                                <strong>{formatTime(schedule.scheduleTime.scheduleTime)}</strong><strong> - </strong><strong>{formatDate(schedule.date)}</strong>
                                            </div>
                                        </div>
                                        <div
                                            className="my-2 border-t border-grey-60 border-dashed xl:block hidden"></div>
                                    </div>
                                    <div className="xl:flex hidden justify-between col-span-3"><strong
                                        className="text-base"> Bạn đã chọn <span
                                        className="inline-block font-bold text-primary "
                                        style={{frontSize: '200%'}}>&nbsp;{selected.length}</span> vé.
                                        Tổng
                                        cộng</strong><span
                                        className="inline-block font-bold text-primary ">&nbsp;{formatNumberWithThousandSeparator(schedule.movie.ticketPrice * selected.length)}</span> VNĐ
                                    </div>
                                    <div
                                        className="xl:flex mt-5 px-5 hidden d-flex justify-content-between align-items-center col-span-3">
                                        <Link to="/booking">
                                            <button style={{width: '100px'}} className="btn__back">Quay lại</button>
                                        </Link>
                                            <button style={{width: '100px'}} className="btn__booking"
                                                    disabled={selected.length === 0} onClick={handleSubmit}>Đặt vé
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
