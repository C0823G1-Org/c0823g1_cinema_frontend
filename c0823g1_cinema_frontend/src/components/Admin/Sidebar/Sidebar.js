import "../Sidebar/Sidebar.css";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

export function Sidebar() {
    let [role,setRole] = useState("");
    useEffect(() => {
        const roleUser = sessionStorage.getItem("roleUser");
        setRole(roleUser);
    }, [])
    return (
        <>
            <div className="sidebar">
                <div className="logo-details">
                    <i className='bx bxl-c-plus-plus'></i>
                    <span className="logo_name">C08 CINEMA</span>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to={"/statistic/movie"}>
                            <i className='bx bx-line-chart'></i>
                            <span className="link_name">Thống kê phim</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/statistic/member"}>
                            <i className="bx bx-line-chart"></i>
                            <span className="link_name">Thống kê thành viên</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/employee/ticketList"}>
                            <i className='bx bxs-credit-card'></i>
                            <span className="link_name">Quản lý đặt vé</span>
                        </Link>
                    </li>
                    {role === "ROLE_ADMIN" && (<li>
                        <Link to={"/employee"}>
                            <i className='bx bxs-user-circle'></i>
                            <span className="link_name">Quản lý nhân viên</span>
                        </Link>
                    </li>)}
                    {role === "ROLE_ADMIN" && (<li>
                        <Link to={"/movie"}>
                            <i className='bx bx-video'></i>
                            <span className="link_name">Quản lý phim</span>
                        </Link>
                    </li>)}
                    <li>
                        <div className="profile-details">
                            <div className="profile-content" style={{paddingLeft: "4rem"}}>
                                <img src="https://thcsgiangvo-hn.edu.vn/wp-content/uploads/2023/09/anh-mac-dinh-7.jpg"
                                     alt="profileImg"/>
                            </div>
                            <Link to={"/home"} style={{paddingRight: "4rem"}}>
                                <i className="fas fa-sign-out-alt" style={{fontSize: "2rem", marginTop:"0.5rem" , color: "white"}}></i>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}