import { useNavigate } from "react-router-dom";
import React from 'react'
import '../Home/Header.css'

export default function Header() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <>
            <div className="hide-menubar" id="hide-navbar">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark px-0 navbar-onscroll-by-user">
                        <a className="navbar-brand" href="#"><img className="img__logo" src alt /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#hideNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="hideNavbar">
                            <ul className="navbar-nav text-center ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href>Trang Chủ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href>Hổ Trợ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href>Liên Hệ</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav text-center ml-auto">
                                <li className="nav-item">
                                    <a className="btn__edit-login" href="../template/TuanTA&BaoNDT_LoginAndRegister.html">Đăng Nhập</a>
                                </li>
                            </ul>


                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}