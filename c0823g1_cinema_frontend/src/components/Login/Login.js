import "./LoginRegister.css"
import {useState} from "react";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import {LoginSocialFacebook} from "reactjs-social-login";
import {useNavigate} from "react-router-dom";
import {LoginLogoutService} from "../../service/LoginLogoutService";
import {auth, provider} from "../config/config";
import {signInWithPopup} from "firebase/auth";
import SweetAlert from 'sweetalert';

export default function Login() {
    const navigate = useNavigate();
    const [status, setStatus] = useState(true);
    const handleGetRegister = () => {
        setStatus(false);
    }
    const handleGetLogin = () => {
        setStatus(true);
    }
    const [error, setError] = useState("");
    const [params, setParams] = useState({
        accountName: "",
        password: ""
    });

    const handleParamsChange = (e) => {
        const {name, value} = e.target;
        setParams((prevParams) => ({
            ...prevParams,
            [name]: value
        }));
        console.log(params);
    };

    const handleLogin = async () => {
        try {
            if (params.password === "" || params.accountName === ""){
                setError("Tên đăng nhập và mật khẩu không được để trống!")
            } else {
                const req = await LoginLogoutService.loginAccount(params);
                setError("");
                if (req.data.iAccountDTO.isDeleted === true){
                    await SweetAlert("Đăng nhập thất bại!", `Tài khoản của bạn đã bị khóa bởi hệ thống, mọi thắc mắc xin liên hệ đến số điện thoại 090564325 để được giải đáp. Trân trọng cám ơn!`, "error");
                } else {
                    sessionStorage.setItem("accessToken", req.data.accessToken);
                    sessionStorage.setItem("roleUser", req.data.roleUser);
                    sessionStorage.setItem("user", req.data.iAccountDTO.accountName);
                    sessionStorage.setItem("userId", req.data.iAccountDTO.id);
                    sessionStorage.setItem("userPhoto", req.data.iAccountDTO.profilePicture);
                    await SweetAlert("Đăng nhập thành công!", `Chào mừng ${sessionStorage.getItem("user")} đến với hệ thống!`, "success")
                    navigate('/home');
                }
            }
        } catch (err) {
            setError("Tên đăng nhập hoặc mật khẩu không chính xác!");
        }
    };
    const handleLoginGoogle = async () => {
        let param;
        try {
            const req = await signInWithPopup(auth, provider);
            sessionStorage.setItem("accessTokenGG", req.user.accessToken);
            param = {
                email: req.user.email,
                googleId: req.user.uid,
                fullName: req.user.displayName,
                phoneNumber: req.user.phoneNumber,
                profilePicture: req.user.photoURL
            }
            const req1 = await LoginLogoutService.loginGoogle(param);
            sessionStorage.setItem("accessToken", req1.data.accessToken);
            sessionStorage.setItem("roleUser", req1.data.roleUser);
            sessionStorage.setItem("user", req1.data.iAccountDTO.accountName);
            sessionStorage.setItem("userId", req1.data.iAccountDTO.id);
            await SweetAlert("Đăng nhập thành công!", `Chào mừng ${sessionStorage.getItem("user")} đến với hệ thống!`, "success")
            navigate('/home');
        } catch (err) {
            sessionStorage.clear();
            await SweetAlert("Đăng nhập thất bại!", `Tài khoản của bạn đã bị khóa bởi hệ thống, mọi thắc mắc xin liên hệ đến số điện thoại 090564325 để được giải đáp. Trân trọng cám ơn!`, "error")
        }
    }
    const handleLoginFacebookSuccess = async (response) => {
        let param;
        sessionStorage.setItem("accessTokenFB", response.data.accessToken)
        try {
            if (response.data.email === undefined) {
                param = {
                    email: "",
                    facebookId: response.data.id,
                    fullName: response.data.name,
                    profilePicture: response.data.picture.data.url
                }
            } else {
                param = {
                    email: response.data.email,
                    facebookId: response.data.id,
                    fullName: response.data.name,
                    profilePicture: response.data.picture.data.url
                }
            }
            const res = await LoginLogoutService.loginFacebook(param);
            sessionStorage.setItem("accessToken", res.data.accessToken);
            sessionStorage.setItem("roleUser", res.data.roleUser);
            sessionStorage.setItem("user", res.data.iAccountDTO.accountName);
            sessionStorage.setItem("userId", res.data.iAccountDTO.id);
            sessionStorage.setItem("userPhoto", res.data.iAccountDTO.profilePicture);
            await SweetAlert("Đăng nhập thành công!", `Chào mừng ${sessionStorage.getItem("user")} đến với hệ thống!`, "success")
            navigate('/home')
        } catch (err) {
            sessionStorage.clear();
            await SweetAlert("Đăng nhập thất bại!", `Tài khoản của bạn đã bị khóa bởi hệ thống, mọi thắc mắc xin liên hệ đến số điện thoại 090564325 để được giải đáp. Trân trọng cám ơn!`, "error")
        }
    }

    return (
        <>
            <div className={`container ${status ? "" : "right-panel-active"}`} id="container">
                <div className="form-container sign-up-container" style={{paddingTop: "3em"}}>
                    <form>
                        <h1>Đăng Kí</h1>
                        <span>Bạn Có Thể Quay Lại Trang Đăng Nhập Sử Dụng Email Và Facebook để đăng nhập</span>
                        <table style={{width: '100%'}}>
                            <tbody>
                            <tr>
                                <td style={{width: '90px'}}>
                                    <h6>Tài Khoản</h6>
                                </td>
                                <td>
                                    <input type="text" placeholder="tuan123"/>
                                </td>
                            </tr>
                            {/* các trường khác ở đây */}
                            </tbody>
                        </table>
                        <button className="button">Đăng Kí</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1 style={{marginBottom: "15px"}}>Đăng Nhập</h1>
                        <input id="accountName" type="text" placeholder="Tên đăng nhập" name="accountName"
                               onChange={handleParamsChange}/>
                        <input id="password" type="password" placeholder="Mật khẩu" name="password" onChange={handleParamsChange}/>
                        <div>
                            <span style={{color: "red", fontSize: "1em"}}>{error}</span>
                        </div>
                        <a href="#">Quên Mật Khẩu?</a>
                        <button type="button" className="button" onClick={handleLogin}>Đăng Nhập</button>
                        <hr color="black"></hr>
                        <span>hoặc sử dụng tài khoản của bạn</span>
                        <div className="social-container">
                            <div>
                                <LoginSocialFacebook
                                    appId="1535030517281067"
                                    onResolve={(response) => {
                                        handleLoginFacebookSuccess(response)
                                    }}
                                    onReject={(err) => {
                                        console.log(err);
                                    }}
                                >
                                    <FacebookLoginButton text="Đăng nhập bằng Facebook"/>
                                </LoginSocialFacebook>
                            </div>
                            <div style={{marginTop: "10px"}}>
                                <GoogleLoginButton text="Đăng nhập bằng Google" onClick={handleLoginGoogle}/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Chào Bạn !</h1>
                            <p>Hãy Điền Thông Tin Cá Nhân Đầy Đủ Để Đăng Kí Tài Khoản Nhé</p>
                            <button className="ghost button" id="signIn" onClick={handleGetLogin}>Đăng Nhập</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Chào Bạn !</h1>
                            <p>Hãy Tham Gia Cùng Chúng Tôi Và Đón Xem Những Bộ Phim Bom Tấn Nhé</p>
                            <button className="ghost button" id="signUp" onClick={handleGetRegister}>Đăng Kí</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}