import { Link, useNavigate } from "react-router-dom";
import React from 'react'
import '../Home/Header.css'

export default function Header() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="hide-menubar" id="hide-navbar">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark px-0 navbar-onscroll-by-user">
                        <a className="navbar-brand" href="#"><img className="img__logo" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2FRemove-bg.ai_1708658790252.png?alt=media&token=93446917-2643-47f6-b15d-244b61f0adab" /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#hideNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <a href="" className="buy__ticket">
                            <img className="picture__ticket" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2Fbtn-ticket.42d72c96.webp?alt=media&token=614961a8-60e0-4e18-a9b4-bd733eda0537"></img>
                        </a>
                        <div className="collapse navbar-collapse" id="hideNavbar">
                            <ul className="navbar-nav text-center ml-auto">
                                <li className="nav-item">
                                    <Link to={'/home'} className="nav-link" >Trang Chủ</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="">Hổ Trợ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="">Liên Hệ</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav text-center ml-auto">
                                <li className="nav-item">
                                    <Link to={'/login'} className="btn__edit-login" href="">Đăng Nhập</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}