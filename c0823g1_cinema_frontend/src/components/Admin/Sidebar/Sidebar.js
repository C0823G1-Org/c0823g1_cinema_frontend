import "../Sidebar/Sidebar.css";
import {Link} from "react-router-dom";

export function Sidebar() {
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
                    <li>
                        <Link to={"/employee"}>
                            <i className='bx bxs-user-circle'></i>
                            <span className="link_name">Quản lý nhân viên</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/movie"}>
                            <i className='bx bx-video'></i>
                            <span className="link_name">Quản lý phim</span>
                        </Link>
                    </li>
                    <li>
                        <div className="profile-details">
                            <div className="profile-content">
                                <img src="https://thcsgiangvo-hn.edu.vn/wp-content/uploads/2023/09/anh-mac-dinh-7.jpg"
                                     alt="profileImg"/>
                            </div>
                            <div className="name-job">
                                <div className="profile_name">Admin</div>
                            </div>
                            <Link to={"/login"}>
                                <i className='bx bx-log-out'></i>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}