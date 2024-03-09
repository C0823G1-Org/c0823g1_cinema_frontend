import "./User.css";
import {useEffect, useState} from "react";
import {
    getListHistoryBooking,
} from "../../service/BookingService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {
    changeInfoUser,
    changePasswordUser,
    findAccount,
} from "../../service/AccountService";
import SweetAlert from "sweetalert";
import * as Yup from "yup";
import ReactPaginate from "react-paginate";
import Footer from "../Home/Footer";
import HeaderTemplateAdmin from "../Home/HeaderTemplateAdmin";
import {useNavigate} from "react-router-dom";

export default function UserInformation() {
    const navigate = useNavigate();
    const [forgetPassword,setForgetPassword] = useState(false);
    const [isSocial, setIsSocial] = useState(false);
    const [role,setRole] = useState("");
    const [member,setMember] = useState("Admin-");
    useEffect(() => {
        const roleUser = sessionStorage.getItem("roleUser");
        setRole(roleUser);
        if (roleUser === "ROLE_CUSTOMER"){
            setMember("TV-");
        }
        if (roleUser === "ROLE_EMPLOYEE"){
            setMember("NV-");
        }
        if (roleUser === null) {
            navigate(`/login`);
        }
        const forgetPassword = sessionStorage.getItem("forgetPassword");
        if (forgetPassword !== null){
            setForgetPassword(true);
            SweetAlert(
                "Bạn đã lấy lại mật khẩu thành công!",
                `Hãy cập nhật mật khẩu để đảm bảo an toàn bảo mật bạn nhé!`,
                "success"
            );
            sessionStorage.removeItem("forgetPassword");
        }
        const accessTokenFB = sessionStorage.getItem("accessTokenFB");
        const accessTokenGG = sessionStorage.getItem("accessTokenGG");
        if (accessTokenFB !== null || accessTokenGG !== null){
            setIsSocial(true);
        }
    }, []);
    const [accessToken, setAccessToken] = useState("");
    const [historyBooking, setHistoryBooking] = useState([]);
    const [id, setId] = useState(0);
    const [photo,setPhoto] = useState("");
    const date = new Date().toISOString().slice(0, 19);
    const dateTest = new Date().toISOString().slice(0, 10);
    console.log(date);
    const [startDate, setStartDate] = useState("2020-01-01T00:00:00");
    const [endDate, setEndDate] = useState("2024-03-10T00:00:00");
    const [totalPages, settotalPages] = useState(0);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        const userPhoto = sessionStorage.getItem("userPhoto");
        const token = sessionStorage.getItem("accessToken");
        setPhoto(userPhoto);
        setId(userId);
        const fetchApi = async (id, accessToken) => {
            try {
                const result = await getListHistoryBooking(id, startDate, endDate, 0, accessToken);
                setHistoryBooking(result.content);
                settotalPages(result.totalPages);
            } catch (e) {
                console.log(e);
            }
        };
        fetchApi(userId, token);
        console.log(historyBooking)
        const getAccountById = async (id, accessToken) => {
            try {
                const result = await findAccount(id, accessToken);
                setAccount1(result);
                console.log(result.data);
            } catch (error) {
                console.error("Error fetching account:", error);
            }
        };
        console.log(account1)
        getAccountById(userId, token);
    }, [startDate, id]);

    const handlePageClick = async (event) => {
        try {
            const result = await getListHistoryBooking(
                id,
                startDate,
                endDate,
                event.selected,
                accessToken
            );
            setHistoryBooking(result.content);
            settotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const options = {day: "2-digit", month: "2-digit", year: "numeric"};

        return date.toLocaleDateString("en-GB", options);
    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // --------------------------------------------------- Thông Tin Tài Khoản


    const [account1, setAccount1] = useState();

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        setAccessToken(token);
        const getAccountById = async (accessToken) => {
            try {
                const result = await findAccount(id, accessToken);
                setAccount1(result);
                console.log(result);
            } catch (error) {
                console.error("Error fetching account:", error);
            }
        };

        getAccountById(token);
    }, [id]);
    const handleGenderChange = (e) => {
        setAccount1({...account1 , gender: e})
        console.log(account1.gender);
    }
    const editAccount = async (values, { setErrors }) => {
        try {
            await changeInfoUser(values, accessToken);
            await SweetAlert(
                "Cập nhật thông tin thành công!",
                `Chúc bạn có những trải nghiệm vui vẻ!`,
                "success"
            );
            navigate("/home");
        } catch (error) {
            setErrors(error.data);
            await SweetAlert(
                "Cập nhật thông tin thất bại!",
                `Vui lòng điền thông tin chính xác!`,
                "error"
            );
        }
    };
    const editPassword = async (values, { setErrors }) => {
        try {
            await changePasswordUser(values,accessToken);
            await SweetAlert(
                "Sửa mật khẩu thành công!",
                `Xin mời bạn đăng nhập lại để vào hệ thống!`,
                "success"
            );
            sessionStorage.clear();
            navigate("/login")
        } catch (error) {
            setErrors(error.data);
            await SweetAlert(
                "Cập nhật mật khẩu thất bại!",
                `Xin vui lòng nhập lại mật khẩu!`,
                "error"
            );
        }

    };
    const validateObject2 = {
        currentPassword: Yup.string().required(
            "Mật khẩu hiện tại không được để trống!"
        ),
        newPassword: Yup.string().required("Mật khẩu mới không được để trống!"),
        confirmationPassword: Yup.string().required(
            "Xác nhận mật khẩu mới không được để trống!"
        ),
    };

    const validateObject = {
        accountName: Yup.string()
            .required("Tên tài khoản không được để trống!")
            .min(6, "Tên tài khoản từ 6 - 20 kí tự!")
            .max(20, "Tên tài khoản từ 6 - 20 kí tự!")
            .matches("^[a-z0-9_-]+$", "Tên tài khoản phải nhập đúng định dạng!"),
        phoneNumber: Yup.string()
            .required("Số điện thoại không được để trống!")
            .matches(
                "^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$",
                "Vui lòng nhập số điện thoại đúng định dạng!"
            ),
        email: Yup.string()
            .required("Email không được để trống!")
            .matches(
                /^[\w\-.]+@([\w\-]+\.)+[\w\-]{2,}$/,
                "Vui lòng nhập email đúng định dạng!"
            ),
        address: Yup.string().required("Địa chỉ không được để trống!"),
    };
    if (!account1) {
        return null;
    }
    return (
        <>
            <div style={{marginTop: "0px"}}>
                <HeaderTemplateAdmin />
            </div>
            {
                <div className="containerOfUser"  style={{marginTop: "10rem"}}>
                    <div className="container light-style flex-grow-1 container-p-y">
                        <h4 className="font-weight-bold py-3 mb-4">Thông tin tài khoản</h4>
                        <div className="card overflow-hidden">
                            <div className="row no-gutters row-bordered row-border-light">
                                <div className="col-md-3 pt-0">
                                    <div className="list-group list-group-flush account-settings-links">
                                        <a
                                            className="list-group-item list-group-item-action "
                                            href="#account-general"
                                        >
                                            <div style={{ textAlign: "center" }}>
                                                <figure className="image-container">
                                                    <img
                                                        style={{
                                                            borderRadius: "100%",
                                                            width: 150,
                                                            height: 150,
                                                        }}
                                                        id="chosen-image"
                                                        src={`${photo}`}
                                                     alt={"Profile"}/>
                                                    <p style={{ marginTop: 10 , fontWeight : "bold" , fontSize : "18px"}}> {!account1.gender ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-female" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/>
                                                    </svg> : <svg style={{color : "blue"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-male" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/>
                                                    </svg> } {account1.fullName}</p>
                                                    <span>
                      <i
                          style={{ color: "#EC7532" }}
                          className="fas fa-piggy-bank"
                      />{" "}
                                                        Điểm tích luỹ: {account1.point}
                    </span>
                                                    <br />{" "}
                                                </figure>
                                            </div>
                                        </a>
                                        <a
                                            className="list-group-item list-group-item-action active"
                                            data-toggle="list"
                                            href="#account-general"
                                        >
                                            <i className="far fa-address-card" /> Thông tin tài khoản
                                        </a>
                                        {isSocial ? "" :  <a
                                            className="list-group-item list-group-item-action"
                                            data-toggle="list"
                                            href="#account-change-password"
                                        >
                                            <i className="fas fa-exchange-alt" /> Đổi mật khẩu
                                        </a>}
                                        <a
                                            className="list-group-item list-group-item-action"
                                            data-toggle="list"
                                            href="#account-info"
                                        >
                                            <i className="fas fa-history" /> Lịch sử đặt vé
                                        </a>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="tab-content">
                                        <div
                                            className="tab-pane fade active show"
                                            id="account-general"
                                        >
                                            <hr className="border-light m-0" />
                                            <div className="card-body">
                                                <Formik
                                                    initialValues={{
                                                        id: account1.id,
                                                        accountName: account1.accountName,
                                                        idNumber: account1.idNumber,
                                                        email: account1.email,
                                                        password: account1.password,
                                                        fullName: account1.fullName,
                                                        birthday: account1.birthday,
                                                        gender: account1.gender,
                                                        phoneNumber: account1.phoneNumber,
                                                        address: account1.address,
                                                        verificationCode: account1.verificationCode,
                                                        point: account1.point,
                                                        role: account1.role,
                                                        memberCode: member + account1.memberCode
                                                    }}
                                                    validationSchema={Yup.object(validateObject)}
                                                    onSubmit={(values, { setErrors }) => {
                                                        values = {...values, "gender":account1.gender}
                                                        editAccount(values, { setErrors })

                                                        console.log(values)

                                                    }
                                                    }
                                                >
                                                    <Form>
                                                        <div className="form-group">
                                                            <Field name="password" type="hidden"></Field>
                                                            <Field name="fullName" type="hidden"></Field>
                                                            <Field
                                                                name="verificationCode"
                                                                type="hidden"
                                                            ></Field>
                                                            <Field name="id" type="hidden"></Field>
                                                            <div className="form-group">
                                                            <label className="form-label">
                                                                Mã thành viên
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                disabled
                                                                name="memberCode"

                                                            /></div>
                                                                <div className="form-group">
                                                                    {isSocial ? "" : <><label className="form-label">
                                                                        Tên đăng nhập
                                                                    </label>
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                        disabled
                                                                        name="accountName"
                                                                    /></>}</div>
                                                        </div>
                                                            {isSocial ?  <div className="form-group">
                                                                    <label className="form-label">Email</label>
                                                                    <Field
                                                                        type="text"
                                                                        name="email"
                                                                        className="form-control mb-1"
                                                                        disabled
                                                                    />
                                                                    <ErrorMessage
                                                                        name="email"
                                                                        component="span"
                                                                        className="form-err"
                                                                        style={{ color: "red" }}
                                                                    />
                                                                </div> : <div className="form-group">
                                                                <label className="form-label">Email</label>
                                                                <Field
                                                                    type="text"
                                                                    name="email"
                                                                    className="form-control mb-1"
                                                                />
                                                                <ErrorMessage
                                                                    name="email"
                                                                    component="span"
                                                                    className="form-err"
                                                                    style={{ color: "red" }}
                                                                />
                                                            </div>}
                                                        <div className="form-group">
                                                            <label className="form-label">Ngày sinh</label>
                                                            <Field
                                                                type="date"
                                                                className="form-control"
                                                                name="birthday"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label" style={{marginRight: "1rem"}}>Giới tính </label>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <Field type="radio" id="customRadioInline1" name="gender" value={true}
                                                                       checked={account1.gender === true}
                                                                       onChange={() => handleGenderChange(true)}
                                                                       className="custom-control-input" />
                                                                <label className="custom-control-label" htmlFor="customRadioInline1">Nam</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <Field type="radio" id="customRadioInline2" name="gender" value={false}
                                                                       checked={account1.gender === false}
                                                                       onChange={() => handleGenderChange(false)}
                                                                       className="custom-control-input"/>
                                                                <label className="custom-control-label" htmlFor="customRadioInline2">Nữ</label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label">Số CMND</label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                name="idNumber"
                                                                id="idNumber"
                                                            />
                                                            <ErrorMessage
                                                                name="idNumber"
                                                                component="span"
                                                                className="form-err"
                                                                style={{ color: "red" }}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label">Số điện thoại</label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                name="phoneNumber"
                                                            />
                                                            <ErrorMessage
                                                                name="phoneNumber"
                                                                component="span"
                                                                className="form-err"
                                                                style={{ color: "red" }}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label">Địa chỉ</label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                name="address"
                                                            />
                                                            <ErrorMessage
                                                                name="address"
                                                                component="span"
                                                                className="form-err"
                                                                style={{ color: "red" }}
                                                            />
                                                        </div>
                                                        <div className="text-right mt-3">
                                                            <button type="button" style={{width: "5rem"}} className="btn__add" onClick={() => {
                                                                navigate("/user/information");
                                                            }}>
                                                                Huỷ
                                                            </button>
                                                            &nbsp;
                                                            <button type="submit" style={{width: "5rem"}} className="btn__edit">
                                                                Lưu
                                                            </button>
                                                        </div>
                                                    </Form>
                                                </Formik>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="account-change-password">
                                            <div className="card-body pb-2">
                                                <Formik
                                                    initialValues={{
                                                        currentPassword: "",
                                                        newPassword: "",
                                                        confirmationPassword: "",
                                                        id: id
                                                    }}
                                                    validationSchema={Yup.object(validateObject2)}
                                                    onSubmit={(values, { setErrors }) =>
                                                        editPassword(values, { setErrors })
                                                    }
                                                >
                                                    <Form>
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                Mật khẩu hiện tại
                                                            </label>
                                                            <Field type="hidden" name="id" />
                                                            <Field
                                                                type="password"
                                                                name="currentPassword"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name="currentPassword"
                                                                component="span"
                                                                className="form-err"
                                                                style={{ color: "red" }}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label">Mật khẩu mới</label>
                                                            <Field
                                                                type="password"
                                                                name="newPassword"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name="newPassword"
                                                                component="span"
                                                                className="form-err"
                                                                style={{ color: "red" }}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                Xác nhận mật khẩu mới
                                                            </label>
                                                            <Field
                                                                type="password"
                                                                name="confirmationPassword"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name="confirmationPassword"
                                                                component="span"
                                                                className="form-err"
                                                                style={{ color: "red" }}
                                                            />
                                                        </div>
                                                        <div style={{marginLeft: "80%" , marginTop: "35%"}}>
                                                            <button type="button" style={{marginRight: "0.5rem",width: "5rem"}} className="btn__add">
                                                                Huỷ
                                                            </button>
                                                            <button type="submit" className="btn__edit" style={{marginRight: "0.5rem",width: "5rem"}}>
                                                                Lưu
                                                            </button>
                                                        </div>

                                                        &nbsp;
                                                    </Form>
                                                </Formik>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="account-info">
                                            <div className="card-body pb-2">
                                                <Formik
                                                    initialValues={{
                                                        startDate: "",
                                                        endDate: dateTest,
                                                    }}
                                                    validationSchema={Yup.object({
                                                        startDate: Yup.date()
                                                            .required("Vui lòng không để trống ngày bắt đầu")
                                                            .max(date, "Không được nhập quá ngày hôm nay").max(Yup.ref('endDate'), "Ngày bắt đầu không thể sau ngày kết thúc"),
                                                        endDate: Yup.date()
                                                    })}
                                                    onSubmit={(values) => {
                                                        console.log(values.endDate);
                                                        console.log(values.startDate);
                                                        const submitValue = async () => {
                                                            setEndDate(values.endDate + "T00:00:00");
                                                            setStartDate(values.startDate + "T00:00:00");
                                                        };
                                                        submitValue();
                                                    }}
                                                >
                                                    {({handleSubmit}) => (
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="d-flex">
                                                                <table>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <label htmlFor="startDate">
                                                                                Từ ngày:{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td style={{paddingLeft: "30px"}}>
                                                                            <Field
                                                                                className="form-control"
                                                                                type="date"
                                                                                id="startDate"
                                                                                name="startDate"
                                                                            />
                                                                        </td>
                                                                        <td style={{paddingLeft: "30px"}}>
                                                                            <label htmlFor="endDate">
                                                                                Đến ngày:{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td style={{paddingLeft: "30px"}}>
                                                                            <Field
                                                                                className="form-control"
                                                                                type="date"
                                                                                id="endDate"
                                                                                name="endDate"
                                                                            />
                                                                        </td>
                                                                        <td style={{paddingLeft: "30px"}}>
                                                                            <button
                                                                                className="btn__add" style={{width: "6rem"}}

                                                                                type="submit"
                                                                            >
                                                                                Tìm kiếm
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan={2}>
                                                                            <ErrorMessage name="startDate"
                                                                                          className="form-err"
                                                                                          style={{color: "red"}}
                                                                            />
                                                                        </td>
                                                                        <td
                                                                            style={{paddingLeft: "30px"}}
                                                                            colSpan={2}
                                                                        >
                                                                            <ErrorMessage name="endDate"
                                                                                          className="form-err"
                                                                                          style={{color: "red"}}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </form>
                                                    )}
                                                </Formik>
                                            </div>
                                            <hr className="border-light m-0"/>
                                            <div className="card-body pb-2">
                                                {historyBooking.length !== 0 && (
                                                    <table className="table table-bordered">
                                                        <thead>
                                                        <tr>
                                                            <th style={{width: "300px"}} scope="col">Tên phim</th>
                                                            <th scope="col">Ngày đặt vé</th>
                                                            <th scope="col">Tổng tiền</th>
                                                            <th scope="col">Điểm</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {historyBooking.map((booking) => (
                                                            <tr key={booking.id}>
                                                                <td style={{fontWeight: "bold", width: "300px"}}
                                                                    scope="row">
                                                                    {booking.nameMovie}
                                                                </td>
                                                                <td>{formatDate(booking.dateBooking)}</td>
                                                                <td>{formatNumber(booking.price)}</td>
                                                                <td>{formatNumber(booking.price / 100 * 3)}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                                {historyBooking.length === 0 && (
                                                    <>
                                                        <h4>Không tìm thấy dữ liệu</h4>
                                                    </>
                                                )}
                                                {historyBooking.length !== 0 && (
                                                    <div
                                                        className="clearfix"
                                                        style={{paddingLeft: "50%"}}
                                                    >
                                                        <div className="hint-text"></div>
                                                        <div className="page">
                                                            <ReactPaginate
                                                                breakLabel="..."
                                                                nextLabel="Trang sau"
                                                                onPageChange={handlePageClick}
                                                                pageRangeDisplayed={1}
                                                                marginPagesDisplayed={1}
                                                                pageCount={totalPages}
                                                                previousLabel="Trang trước"
                                                                pageClassName="page-item"
                                                                pageLinkClassName="page-link"
                                                                previousClassName="page-item"
                                                                previousLinkClassName="page-link"
                                                                nextClassName="page-item"
                                                                nextLinkClassName="page-link"
                                                                breakClassName="page-item"
                                                                breakLinkClassName="page-link"
                                                                containerClassName="pagination"
                                                                activeClassName="active"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                <div></div>
                                                {}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div style={{borderTop: "10vh solid #f5f5f5"}}>
                <Footer/>
            </div>
        </>
    );
}