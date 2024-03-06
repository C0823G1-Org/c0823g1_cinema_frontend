import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import '../Home/Header.css'
import Header from "./Header";
import { LoginLogoutService } from "../../service/LoginLogoutService";
import SweetAlert from "sweetalert";


export default function HeaderTemplateAdmin() {
    const navigate = useNavigate();
    const [roleUser, setRoleUser] = useState("");
    const [userName, setUserName] = useState("");
    const [isLogin, setIsLogin] = useState(false)
    const [img, setImg] = useState("");


    useEffect(() => {
        const token = sessionStorage.getItem('accessToken')
        const role = sessionStorage.getItem('roleUser');
        const user = sessionStorage.getItem('user');
        const userPhoto = sessionStorage.getItem('userPhoto')
        if (user !== null) {
            setIsLogin(true);
        }
        setRoleUser(role);
        setUserName(user);
        setImg(userPhoto);

        console.log(img)
    }, []);


    const logout = async () => {
        const accessTokenFB = sessionStorage.getItem("accessTokenFB")
        if (accessTokenFB !== undefined) {
            try {
                const req = await LoginLogoutService.logout(accessTokenFB);
            } catch (err) {
                console.log(err)
            }
        }
        sessionStorage.clear();
        setUserName("");
        setRoleUser("");
        setIsLogin(false);
        setImg("");
        await SweetAlert(
            "Đăng xuất thành công",
            `Cám ơn bạn đã có những trải nghiệm với hệ thống của chúng tôi!`,
            "success"
        );
        console.log(sessionStorage.getItem("user"))
        navigate('/home')
    }

    return (
        <>
            {isLogin ?
                <div className="hide-menubar" id="hide-navbar">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-dark px-0 navbar-onscroll-by-user">
                            <a className="navbar-brand" href="#"><img className="img__logo"
                                src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2FRemove-bg.ai_1708658790252.png?alt=media&token=93446917-2643-47f6-b15d-244b61f0adab"
                                alt /></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#hideNavbar" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <a href="" className="buy__ticket">
                                <img className="picture__ticket" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fbtn-ticket.42d72c96.webp?alt=media&token=614961a8-60e0-4e18-a9b4-bd733eda0537"></img>
                            </a>
                            {/* Admin */}
                            {roleUser === "ROLE_ADMIN" && (
                                <div className="collapse navbar-collapse" id="hideNavbar">
                                    <ul className="navbar-nav text-center ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/home'}>Trang Chủ</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Hổ Trợ</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Liên Hệ</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Quản Lý</a>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav text-center ml-auto checkunder">
                                        <p style={{ color: "white", marginRight: "1rem", marginTop: "0.6rem" }} className="name--user">{userName}</p>
                                        <div className="container__logout">
                                            <img src={`${img}`} alt="Profile" style={{ borderRadius: "50%", height: "3rem", marginRight: "1rem",marginTop:"20px" }} />
                                            <i onClick={logout} className="fas fa-sign-out-alt" style={{ fontSize: "2rem", marginTop: "17px", color: "#EE5A24",position: "absolute" }}></i>
                                        </div>
                                    </ul>
                                </div>
                            )}
                            {roleUser === "ROLE_EMPLOYEE" && (
                                <div className="collapse navbar-collapse" id="hideNavbar">
                                    <ul className="navbar-nav text-center ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/home'}>Trang Chủ</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Hổ Trợ</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Liên Hệ</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Quản Lý Vé Phim</a>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav text-center ml-auto checkunder">
                                        <p style={{ color: "white", marginRight: "1rem", marginTop: "0.6rem" }} className="name--user">{userName}</p>
                                        <div className="container__logout">
                                            <img src={`${img}`} alt="Profile" style={{ borderRadius: "50%", height: "3rem", marginRight: "1rem",marginTop:"20px" }} />
                                            <i onClick={logout} className="fas fa-sign-out-alt" style={{ fontSize: "2rem", marginTop: "17px", color: "#EE5A24",position: "absolute" }}></i>
                                        </div>
                                    </ul>
                                </div>
                            )}
                            {roleUser === "ROLE_CUSTOMER" && (
                                <div className="collapse navbar-collapse" id="hideNavbar">
                                    <ul className="navbar-nav text-center ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/home'}>Trang Chủ</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Hổ Trợ</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Liên Hệ</a>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav text-center ml-auto checkunder">
                                        <p style={{ color: "white", marginRight: "1rem", marginTop: "0.6rem" }} className="name--user">{userName}</p>
                                        <div className="container__logout">
                                            <img src={`${img}`} alt="Profile" style={{ borderRadius: "50%", height: "3rem", marginRight: "1rem",marginTop:"20px" }} />
                                            <i onClick={logout} className="fas fa-sign-out-alt" style={{ fontSize: "2rem", marginTop: "17px", color: "#EE5A24",position: "absolute" }}></i>
                                        </div>
                                    </ul>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
                :
                <Header />
            }
        </>
    )
}