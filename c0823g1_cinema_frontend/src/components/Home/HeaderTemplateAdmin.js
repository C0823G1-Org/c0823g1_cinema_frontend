import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import '../Home/Header.css'
import Header from "./Header";


export default function HeaderTemplateAdmin() {
    const navigate = useNavigate();
    const [roleUser, setRoleUser] = useState("");
    const [userName, setUserName] = useState("");
    const [isLogin, setIsLogin] = useState()


    useEffect(() => {
        const token = sessionStorage.getItem('accessToken')
        const role = sessionStorage.getItem('roleUser');
        const user = sessionStorage.getItem('user');
        setIsLogin(token)
        setRoleUser(role);
        setUserName(user);
    }, []);


    const logout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('roleUser');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userPhoto');
        alert("logout")
        navigate('/home')
    }

    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <>
            {isLogin ?
                <div className="hide-menubar" id="hide-navbar">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-dark px-0 navbar-onscroll-by-user">
                            <a className="navbar-brand" href="#"><img className="img__logo" src="https://firebasestorage.googleapis.com/v0/b/newfirebase-1fe01.appspot.com/o/images%2FRemove-bg.ai_1708658790252.png?alt=media&token=93446917-2643-47f6-b15d-244b61f0adab" alt /></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#hideNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            {/* Admin */}
                            {roleUser === "ROLE_ADMIN" && (
                                <div className="collapse navbar-collapse" id="hideNavbar">
                                    <ul className="navbar-nav text-center ml-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Trang Chủ</a>
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
                                        <p className="name--user">Hello,Admin {userName}</p>
                                        <li className="nav-item design__logout">
                                            <a className="logout-name" onClick={logout} href="">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            {roleUser === "ROLE_EMPLOYEE" && (
                                <div className="collapse navbar-collapse" id="hideNavbar">
                                    <ul className="navbar-nav text-center ml-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Trang Chủ</a>
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
                                        <p className="name--user">Hello, {userName}</p>
                                        <li className="nav-item design__logout">
                                            <a className="logout-name" onClick={logout} href="">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            {roleUser === "ROLE_CUSTOMER" && (
                                <div className="collapse navbar-collapse" id="hideNavbar">
                                    <ul className="navbar-nav text-center ml-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Trang Chủ</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Hổ Trợ</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Liên Hệ</a>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav text-center ml-auto checkunder">
                                        <p className="name--user">Hello, {userName}</p>
                                        <li className="nav-item design__logout">
                                            <a className="logout-name" onClick={logout} href="">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </nav>
                    </div >
                </div >
                :
                <Header/>
            }
        </>
    )
}