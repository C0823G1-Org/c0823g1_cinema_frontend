import "./LoginRegister.css";
import {useEffect, useState} from "react";
import {
    FacebookLoginButton,
    GoogleLoginButton,
} from "react-social-login-buttons";
import {LoginSocialFacebook} from "reactjs-social-login";
import {useNavigate} from "react-router-dom";
import {LoginLogoutService} from "../../service/LoginLogoutService";
import {auth, provider} from "../config/config";
import {signInWithPopup} from "firebase/auth";
import SweetAlert from "sweetalert";
import {Button, Modal} from "react-bootstrap";
import {ColorRing} from "react-loader-spinner";
import {register} from "../../service/AccountService";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function Login() {

    const navigate = useNavigate();
    useEffect(() => {
        const roleUser = sessionStorage.getItem("roleUser");
        if (roleUser !== null) {
            navigate(`/home`);
        }
    }, []);
    const [status, setStatus] = useState(true);
    const [isSubmitLogin, setIsSubmitLogin] = useState(false);

    const handleGetRegister = () => {
        setStatus(false);
    };
    const handleGetLogin = () => {
        setStatus(true);
    };
    const [error, setError] = useState("");
    const [params, setParams] = useState({
        accountName: "",
        password: "",
    });

    const handleParamsChange = (e) => {
        const {name, value} = e.target;
        setParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
        console.log(params);
    };

    const handleLogin = async () => {
        try {
            setIsSubmitLogin(true);
            if (params.password === "" || params.accountName === "") {
                setError("Tên đăng nhập và mật khẩu không được để trống!");
                setIsSubmitLogin(false);
            } else {
                const req = await LoginLogoutService.loginAccount(params);
                setError("");
                if (req.data.iAccountDTO.isDeleted === true) {
                    await SweetAlert("Đăng nhập thất bại!", `Tài khoản của bạn đã bị khóa bởi hệ thống, mọi thắc mắc xin liên hệ đến số điện thoại 090564325 để được giải đáp. Trân trọng cám ơn!`, "error");
                    setIsSubmitLogin(false);
                } else {
                    sessionStorage.setItem("accessToken", req.data.accessToken);
                    sessionStorage.setItem("roleUser", req.data.roleUser);
                    sessionStorage.setItem("user", req.data.iAccountDTO.fullName);
                    sessionStorage.setItem("userId", req.data.iAccountDTO.id);
                    sessionStorage.setItem("userPhoto", req.data.iAccountDTO.profilePicture);
                    await SweetAlert("Đăng nhập thành công!", `Chào mừng ${sessionStorage.getItem("user")} đến với hệ thống!`, "success")
                    setError("");
                    setIsSubmitLogin(false);
                    navigate('/home');
                }
            }
        } catch (err) {
            setError("Tên đăng nhập hoặc mật khẩu không chính xác!");
            setIsSubmitLogin(false);
        }
    };
    const handleLoginGoogle = async () => {
        setIsSubmitLogin(true);
        let param;
        try {
            const req = await signInWithPopup(auth, provider);
            sessionStorage.setItem("accessTokenGG", req.user.accessToken);
            param = {
                value: req._tokenResponse.oauthAccessToken
            }
            const req1 = await LoginLogoutService.loginGoogle(param);
            sessionStorage.setItem("accessToken", req1.data.accessToken);
            sessionStorage.setItem("roleUser", req1.data.roleUser);
            sessionStorage.setItem("user", req1.data.iAccountDTO.fullName);
            sessionStorage.setItem("userId", req1.data.iAccountDTO.id);
            sessionStorage.setItem("userPhoto", req1.data.iAccountDTO.profilePicture);
            await SweetAlert("Đăng nhập thành công!", `Chào mừng ${sessionStorage.getItem("user")} đến với hệ thống!`, "success")
            setIsSubmitLogin(false);
            navigate('/home');
        } catch (err) {
            sessionStorage.clear();
            await SweetAlert("Đăng nhập thất bại!", `Tài khoản của bạn đã bị khóa bởi hệ thống, mọi thắc mắc xin liên hệ đến số điện thoại 090564325 để được giải đáp. Trân trọng cám ơn!`, "error")
            setIsSubmitLogin(false);
        }
    }
    const handleLoginFacebookSuccess = async (response) => {
        let param;
        sessionStorage.setItem("accessTokenFB", response.data.accessToken);
        console.log(response);
        try {
            param = {
                value: response.data.accessToken
            }
            const res = await LoginLogoutService.loginFacebook(param);
            sessionStorage.setItem("accessToken", res.data.accessToken);
            sessionStorage.setItem("roleUser", res.data.roleUser);
            sessionStorage.setItem("user", res.data.iAccountDTO.fullName);
            sessionStorage.setItem("userId", res.data.iAccountDTO.id);
            sessionStorage.setItem("userPhoto", res.data.iAccountDTO.profilePicture);
            await SweetAlert("Đăng nhập thành công!", `Chào mừng ${sessionStorage.getItem("user")} đến với hệ thống!`, "success")
            setIsSubmitLogin(false);
            navigate('/home')
        } catch (err) {
            sessionStorage.clear();
            await SweetAlert("Đăng nhập thất bại!", `Tài khoản của bạn đã bị khóa bởi hệ thống, mọi thắc mắc xin liên hệ đến số điện thoại 090564325 để được giải đáp. Trân trọng cám ơn!`, "error")
            setIsSubmitLogin(false);
        }
    }

    const [isSubmit, setIsSubmit] = useState(false);
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [show1, setShow1] = useState(false);
    const [password, setPassword] = useState("");
    const handleClose = () => {
        setShow(false);
        setError("");
        setError1("");
        setError2("");
        setIsSubmit(false);
        setEmail("");
        setPassword("");
    };
    const handleShow = () => setShow(true);

    const handleClose1 = () => {
        setShow1(false);
        setError("");
        setError1("");
        setError2("");
        setIsSubmit(false);
        setEmail("");
        setPassword("");
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleForgetPassword = async () => {
        if (email === "") {
            setError1("Vui lòng nhập email để tìm kiếm tài khoản!");
        } else {
            try {
                setIsSubmit(true);
                const req = await LoginLogoutService.forgetPassword({email: email});
                console.log(req);
                setShow(false);
                setShow1(true);
                setError1("");
                setIsSubmit(false);
            } catch (err) {
                setIsSubmit(false);
                setError1("Email này không tồn tại trong hệ thống!");
                console.log(err);
            }
        }
    };
    const handleForgetPassword1 = async () => {
        let param = {
            email: email,
            password: password,
        };
        try {
            if (param.password === "") {
                setError2("Xin vui lòng nhập mật khẩu!");
            } else {
                setIsSubmit(true);
                const req = await LoginLogoutService.loginEmail(param);
                if (req.data.iAccountDTO.isDeleted === true) {
                    await SweetAlert(
                        "Đăng nhập thất bại!",
                        `Tài khoản của bạn đã bị khóa bởi hệ thống, mọi thắc mắc xin liên hệ đến số điện thoại 090564325 để được giải đáp. Trân trọng cám ơn!`,
                        "error"
                    );
                    setShow1(false);
                    setShow(false);
                    setError("");
                    setError1("");
                    setError2("");
                    setIsSubmit(false);
                    setEmail("");
                    setPassword("");
                } else {
                    sessionStorage.setItem("accessToken", req.data.accessToken);
                    sessionStorage.setItem("roleUser", req.data.roleUser);
                    sessionStorage.setItem("user", req.data.iAccountDTO.accountName);
                    sessionStorage.setItem("userId", req.data.iAccountDTO.id);
                    sessionStorage.setItem(
                        "userPhoto",
                        req.data.iAccountDTO.profilePicture
                    );
                    await SweetAlert(
                        "Bạn đã lấy lại mật khẩu thành công!",
                        `Hãy cập nhật mật khẩu để đảm bảo an toàn bảo mật bạn nhé!`,
                        "success"
                    );
                    setError2("");
                    setIsSubmit(false);
                    navigate("/user/information");
                }
            }
        } catch (err) {
            setIsSubmit(false);
            setError2("Mật khẩu bạn nhập không chính xác! Xin nhập lại!");
        }
    };

    //  --------------------------------------------------- Đăng Kí ---------------------------------------------------------------------------


    const registerAccount = async (values,{setErrors}) => {
        try{
          if(values.gender == "male"){
            values.gender = true;
          }else{
            values.gender = false;
          }
          const result = await register(values);
          await SweetAlert(
              "Đăng Kí Thành Công",
              `Chào mừng ${values.fullName} đến với hệ thống!`,
              "success"
          );
          navigate("/login")
        }catch(err){
          setErrors(err.data)
          await SweetAlert(
              "Đăng Kí Thất Bại",
              `Vui lòng nhập lại thông tin!`,
              "error"
          );
    
        }
    
      }
    
      const initValues = {
        accountName : "",
        fullName : "",
        password : "" ,
        idNumber : "" ,
        birthday : "",
        phoneNumber : "",
        gender : true,
        email : "",
        address : "",
        verificationCode : "1",
      }
      const validateObject = {
        accountName : Yup.string().required("Tài Khoản không được để trống").min(6,"Tài Khoản từ 6 - 20 kí tự").max(20,"Tài Khoản từ 6 - 20 kí tự").matches("^[a-z0-9_-]+$","Tài Khoản Vui Lòng Nhập Đúng Định Dạng"),
        fullName: Yup.string()
            .required("Họ Và Tên không được để rỗng")
            .min(6, "Họ và Tên từ 6 - 45 kí tự")
            .max(45, "Họ và Tên từ 6 - 45 kí tự")
            .matches(
                /^[A-Za-zÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:\s+[A-Za-zÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*\s*$/,
                "Họ Và Tên vui lòng nhập đúng định dạng"
            ),
    
        password : Yup.string().required("Mật Khẩu không được để rỗng").min(6,"Mật Khẩu độ dài từ 6-20 kí tự").max(20,"Mật Khẩu độ dài từ 6-20 kí tự"),
        phoneNumber : Yup.string().required("Số Điện Thoại không được để rỗng").matches("^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$","Số điện thoại vui lòng nhập đúng định dạng"),
        email: Yup.string()
            .required("Email Không được để rỗng")
            .matches(/^[\w\-.]+@([\w\-]+\.)+[\w\-]{2,}$/, "Email vui lòng nhập đúng định dạng"),
        address: Yup.string().required("Địa chỉ không được để rỗng"),
        birthday : Yup.string().required("Ngày Sinh không được để rỗng")
    
    
      }

    return (
        <>
            <div className="body">

            <div
          className={`containerLogin ${status ? "" : "right-panel-active"}`}
          id="container"
      >
        <Formik initialValues={initValues} validationSchema={Yup.object(validateObject)} onSubmit={(values,{setErrors}) => registerAccount(values,{setErrors})}>
          {
            ({isSubmitting}) =>(


                <div
                    className="form-container sign-up-container"
                    style={{ paddingTop: "3em" }}
                >
                  <Form className="form">
                    <h1>Đăng Kí</h1>
                    <span>
          Bạn Có Thể Quay Lại Trang Đăng Nhập Sử Dụng Email Và Facebook để
          đăng nhập
        </span>
                    <table  style={{ width: "100%" }}>
                      <tbody>
                      <tr>
                        <td style={{ width: 90 }}>
                          <h6>Tài Khoản <sup style={{color : "red"}}>*</sup> </h6>
                        </td>
                        <td>
                          <Field type="text" id="accountName" name="accountName" placeholder="Ex: example123456" className="input" /> <br></br>
                        </td>
                      </tr>
                      <tr><td></td><td className="tr-error">
                        <ErrorMessage name="accountName" component='span' className="form-err" style={{ color: 'red' }} />
                      </td></tr>
                      <tr>
                        <td>
                          <h6>Mật Khẩu <sup style={{color : "red"}}>*</sup></h6>
                        </td>
                        <td>
                          <Field type="password" id="password" name="password" className="input" /> <br></br>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="tr-error"> <ErrorMessage name="password" component='span' className="form-err" style={{ color: 'red' }} /></td>
                      </tr>
                      <tr>
                        <td>
                          <h6>Họ Và Tên <sup style={{color : "red"}}>*</sup></h6>
                        </td>
                        <td>
                          <Field type="text" id="fullName" name="fullName" placeholder="Ex: Nguyễn Văn A" className="input" /> <br></br>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                    
                        <td className="tr-error"><ErrorMessage name="fullName" component='span' className="form-err" style={{ color: 'red' }} /></td>
                      </tr>
                      <tr>
                        <td>
                          <h6>Ngày Sinh <sup style={{color : "red"}}>*</sup></h6>
                        </td>
                        <td>
                          {/* <input
        type="date"
        value={dateOfBirth}
        onChange={(event)=>handleDateChange(event)}
    /> */}
                          <Field type="date" id="birthday" name="birthday"  className="input" />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="tr-error">
                        <ErrorMessage name="birthday" component='span' className="form-err" style={{ color: 'red' }} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6>Giới Tính <sup style={{color : "red"}}>*</sup></h6>
                        </td>
                        <td style={{textAlign : "left"}}>
                          <div className="form-check form-check-inline">
                            <Field
                                className="form-check-input input"
                                type="radio"
                                name="gender"
                                id="inlineRadio1"
                                value="male"
                                checked
                            />
                            <label
                                style={{ marginBottom: 10 }}
                                className="form-check-label"
                                htmlFor="inlineRadio1"
                            >
                              Nam
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <Field
                                className="form-check-input input"
                                type="radio"
                                name="gender"
                                id="inlineRadio2"
                                value="female"
                            />
                            <label
                                style={{ marginBottom: 10 }}
                                className="form-check-label"
                                htmlFor="inlineRadio2"
                            >
                              Nữ
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6>CMND/CCCD</h6>
                        </td>
                        <td>
                          <Field className="input" type="text" id="idNumber" name="idNumber" /> <br></br>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                     
                        <td className="tr-error">
                        <ErrorMessage name="idNumber" component='span' className="form-err" style={{ color: 'red' }}  />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6>Email <sup style={{color : "red"}}>*</sup></h6>
                        </td>
                        <td>
                          <Field className="input" type="text" id="email" name="email" placeholder="Ex: example@gmail.com" /> <br></br>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                      
                        <td className="tr-error">
                        <ErrorMessage name="email" component='span' className="form-err" style={{ color: 'red' }} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6>Địa Chỉ <sup style={{color : "red"}}>*</sup></h6>
                        </td>
                        <td>
                          <Field className="input" type="text" id="address" name="address" placeholder="Ex: 295 Nguyễn Tất Thành" /> <br></br>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        
                        <td className="tr-error">
                        <ErrorMessage name="address" component='span' className="form-err" style={{ color: 'red' }} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="soDienThoaiTable" style={{width : "93px"}}>Số Điện Thoại<sup style={{color : "red"}}>*</sup></h6>
                        </td>
                        <td>
                          <Field className="input" type="text" id="phoneNumber" name="phoneNumber" placeholder="Ex:0387274038" /> <br></br>
                        </td>
                        <td>
                          <Field className="input" type="hidden" id="verificationCode" name="verificationCode"/> <br></br>
                          <ErrorMessage name="verificationCode" component='span' className="form-err" style={{ color: 'red' }} />
                        </td>
                      </tr>
                      <tr>
                        <td>

                        </td>
                       
                        <td className="tr-error">  <ErrorMessage name="phoneNumber" component='span' className="form-err" style={{ color: 'red' }} /></td>
                      </tr>
                      </tbody>
                    </table>
                    <button type="submit" className="button">Đăng Kí</button>
                  </Form>
                </div>
            )
          }

        </Formik>

                    <div className="form-container sign-in-container">
                        <form className="form" action="#">
                            <h1 style={{marginBottom: "15px"}}>Đăng Nhập</h1>
                            <input
                                className="input"
                                id="accountName"
                                type="text"
                                placeholder="Tên đăng nhập"
                                name="accountName"
                                onChange={handleParamsChange}
                            />
                            <input
                                className="input"
                                id="password"
                                type="password"
                                placeholder="Mật khẩu"
                                name="password"
                                onChange={handleParamsChange}
                            />
                            <div>
                                <span style={{color: "red", fontSize: "1em"}}>{error}</span>
                            </div>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#" onClick={handleShow}>
                                Quên Mật Khẩu?
                            </a>
                            {isSubmitLogin ? <button type="button" className="button">Đăng Nhập</button> :
                                <button type="button" className="button" onClick={handleLogin}>Đăng Nhập</button>}
                            <hr color="black"></hr>
                            <span>hoặc sử dụng tài khoản của bạn</span>
                            <div className="social-container">
                                <div>
                                    {isSubmitLogin ?
                                        <FacebookLoginButton text="Đăng nhập bằng Facebook"/>
                                        : <LoginSocialFacebook
                                            appId="1535030517281067"
                                            onResolve={(response) => {
                                                handleLoginFacebookSuccess(response)
                                            }}
                                            onReject={(err) => {
                                                console.log(err);
                                            }
                                            }
                                        >
                                            <FacebookLoginButton onClick={() => setIsSubmitLogin(true)}
                                                                 text="Đăng nhập bằng Facebook"/>
                                        </LoginSocialFacebook>}
                                </div>
                                <div style={{marginTop: "10px"}}>
                                    {isSubmitLogin ? <GoogleLoginButton text="Đăng nhập bằng Google"/> :
                                        <GoogleLoginButton text="Đăng nhập bằng Google" onClick={handleLoginGoogle}/>}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Chào Bạn !</h1>
                                <p>Hãy Điền Thông Tin Cá Nhân Đầy Đủ Để Đăng Kí Tài Khoản Nhé</p>
                                <button
                                    className="ghost button"
                                    id="signIn"
                                    onClick={handleGetLogin}
                                >
                                    Đăng Nhập
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Chào Bạn !</h1>
                                <p>
                                    Hãy Tham Gia Cùng Chúng Tôi Và Đón Xem Những Bộ Phim Bom Tấn Nhé
                                </p>
                                {isSubmitLogin ? <button className="ghost button" id="signUp">Đăng Kí</button> :
                                    <button className="ghost button" id="signUp" onClick={handleGetRegister}>Đăng
                                        Kí</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Tìm tài khoản của bạn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="email">
                            Vui lòng nhập email để tìm lại tài khoản của bạn
                        </label>
                        <input
                            className="input"
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleEmailChange}
                        />
                        <div>
                            <span style={{color: "red", fontSize: "1em"}}>{error1}</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="button1" onClick={handleClose}>
                            Đóng
                        </Button>
                        {isSubmit ? (
                            <ColorRing
                                visible={true}
                                height="40"
                                width="40"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                            />
                        ) : (
                            <Button className="button" onClick={handleForgetPassword}>
                                Gửi
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={show1}
                    onHide={handleClose1}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Xác nhận mật khẩu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="email">
                            Chúng tôi đã cung cấp mật khẩu đến {email}. Xin nhập lại mật khẩu để
                            vào hệ thống!
                        </label>
                        <input
                            className="input"
                            id="password1"
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            onChange={handlePasswordChange}
                        />
                        <div>
                            <span style={{color: "red", fontSize: "1em"}}>{error2}</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose1}>
                            Đóng
                        </Button>
                        {isSubmit ? (
                            <ColorRing
                                visible={true}
                                height="40"
                                width="40"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                            />
                        ) : (
                            <Button className="button" onClick={handleForgetPassword1}>
                                Gửi
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    );
}