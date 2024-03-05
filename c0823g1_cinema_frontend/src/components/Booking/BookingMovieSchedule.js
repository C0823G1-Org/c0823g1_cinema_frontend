import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
import {useState} from "react";

export default function BookingMovieSchedule(){
    const [movies,setMovies] =useState([])

    return(
        <div className="row">
            <div className=" map col-8 p-0 mx-0">
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Chọn phim</Accordion.Header>
                    <Accordion.Body>
                        <div data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'>
                            <div><h3>1</h3></div>
                            <div><h3>2</h3></div>
                            <div><h3>3</h3></div>
                            <div><h3>4</h3></div>
                            <div><h3>5</h3></div>
                            <div><h3>6</h3></div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Chọn ngày</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Chọn suất</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
            <div className=" col-4 p-0 mx-0" style={{boxShadow: '10px 10px 20px black'}}>
                <div className="col-span-1 xl:pl-4 xl:order-none order-first">
                    <div className="booking__summary md:mb-4">
                        <div className="bg-white px-4 grid grid-cols-3 xl:gap-2 items-center"
                             style={{paddingRight: '0 !important'}}>
                            <div
                                className="row-span-2 md:row-span-1 xl:row-span-2 block md:hidden xl:block d-flex justify-content-center"
                                style={{marginTop: '7%'}}>
                                <img alt="Madame Web"
                                     loading="lazy"
                                     width="60%"
                                     height="auto"

                                     decoding="async"
                                     data-nimg="1"
                                     className="xl:w-full xl:h-full md:w-[80px] md:h-[120px] w-[90px] h-[110px] rounded object-cover object-cover duration-500 ease-in-out group-hover:opacity-100
          scale-100 blur-0 grayscale-0)"
                                     src="https://cdn.galaxycine.vn/media/2024/1/24/madame-web-500_1706063512367.jpg"
                                     style={{color: 'transparent'}}/>
                            </div>
                            <div className="flex-1 col-span-2 md:col-span-1 row-span-1 xl:col-span-2"><h3
                                className="text-sm xl:text-base font-bold xl:mb-0 d-flex justify-content-center mt-2 text-align-center">
                                Madame Web</h3>
                                <p className="text-sm inline-block">2D Phụ Đề</p>
                                <hr className="my-0"/>
                            </div>
                            <div className="col-span-2 md:col-span-1 xl:col-span-3">
                                <div>
                                    <div className="xl:mt-0 text-sm xl:text-base">
                                        <span>Suất: </span><strong>20:15</strong><span> - </span><span
                                        className="capitalize text-sm">thứ năm, <strong>22/02/2024</strong></span>
                                    </div>
                                </div>
                                <div className="my-2 border-t border-grey-60 border-dashed xl:block hidden"></div>
                            </div>
                            <div className="xl:flex hidden justify-between col-span-3"><strong
                                className="text-base"> Bạn đã chọn <span
                                className="inline-block font-bold text-primary ">&nbsp;0</span> vé.
                                Tổng
                                cộng</strong><span
                                className="inline-block font-bold text-primary ">&nbsp;0 VNĐ</span></div>
                            <div
                                className="xl:flex mt-5 px-5 hidden d-flex justify-content-between align-items-center col-span-3">
                                <Link to="/home">
                                    <button style={{width: '100px'}} className="btn__back">Quay lại</button>
                                </Link>
                                <Link to="/booking/seat">
                                    <button style={{width: '100px'}} className="btn__booking">Đặt vé</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}