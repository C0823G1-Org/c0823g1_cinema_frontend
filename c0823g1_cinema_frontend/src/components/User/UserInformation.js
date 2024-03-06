import "./User.css"
import {useEffect, useState} from "react";
import {getHistoryBooking, getListHistoryBooking, searchHistoryBooking} from "../../service/BookingService";
import {ErrorMessage, Field, Formik} from "formik";
import ReactPaginate from "react-paginate";
import * as yup from 'yup';

export default function UserInformation() {
    const [historyBooking, setHistoryBooking] = useState([]);
    const id = 2;
    const date = new Date().toISOString().slice(0, 19);
    const dateTest = new Date().toISOString().slice(0, 10);
    console.log(date)
    const [startDate, setStartDate] = useState("2020-01-01T00:00:00")
    const [endDate, setEndDate] = useState("2024-03-10T00:00:00")
    const [totalPages, settotalPages] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await getListHistoryBooking(id, startDate, endDate, 0);
                setHistoryBooking(result.content);
                settotalPages(result.totalPages); // Cập nhật giá trị của totalPages khi nhận được dữ liệu từ API
            } catch (e) {
                console.log(e);
            }
        }
        fetchApi();
    }, [startDate]);

    const handlePageClick = async (event) => {
        try {
            const result = await getListHistoryBooking(id, startDate, endDate, event.selected);
            setHistoryBooking(result.content);
            settotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
    }
    // const submitSearch = async () => {
    //     try {
    //         const result = await getListHistoryBooking(id, startDate, endDate, 0);
    //         setHistoryBooking(result.content);
    //         settotalPages(result.totalPages);
    //         console.log(result)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const options = {day: '2-digit', month: '2-digit', year: 'numeric'};

        return date.toLocaleDateString('en-GB', options);
    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>
            {historyBooking !== [] &&
                <div className="container light-style flex-grow-1 container-p-y">
                    <h4 className="font-weight-bold py-3 mb-4">Thông Tin Tài Khoản</h4>
                    <div className="card overflow-hidden">
                        <div className="row no-gutters row-bordered row-border-light">
                            <div className="col-md-3 pt-0">
                                <div className="list-group list-group-flush account-settings-links">
                                    <a
                                        className="list-group-item list-group-item-action "
                                        href="#account-general"
                                    >
                                        <div style={{textAlign: "center"}}>
                                            <figure className="image-container">
                                                <img
                                                    style={{borderRadius: "100%", width: 150, height: 150}}
                                                    id="chosen-image"
                                                    src="https://cdn.moveek.com/bundles/ornweb/img/no-avatar.png"
                                                />
                                                <p style={{marginTop: 10}}>Nguyen Minh Tuan</p>
                                                <span>
                  <i
                      style={{color: "#EC7532"}}
                      className="fas fa-piggy-bank"
                  />{" "}
                                                    Điểm tích luỹ: 120
                </span>
                                                <br/>{" "}
                                            </figure>
                                        </div>
                                    </a>
                                    <a
                                        className="list-group-item list-group-item-action active"
                                        data-toggle="list"
                                        href="#account-general"
                                    >
                                        <i className="far fa-address-card"/> Thông Tin Tài Khoản
                                    </a>
                                    <a
                                        className="list-group-item list-group-item-action"
                                        data-toggle="list"
                                        href="#account-change-password"
                                    >
                                        <i className="fas fa-exchange-alt"/> Đổi Mật Khẩu
                                    </a>
                                    <a
                                        className="list-group-item list-group-item-action"
                                        data-toggle="list"
                                        href="#account-info"
                                    >
                                        <i className="fas fa-history"/> Lịch Sử
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="tab-content">
                                    <div className="tab-pane fade active show" id="account-general">
                                        <hr className="border-light m-0"/>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <div className="form-group">
                                                    <label className="form-label">Tên đăng nhập</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="nguyenminhtuan123"
                                                        disabled=""
                                                    />
                                                </div>
                                                <label className="form-label">E-mail</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    defaultValue="gmail@gmail.com"
                                                />
                                                {/*                                <div class="alert alert-warning mt-3">*/}
                                                {/*                                    Your email is not confirmed. Please check your inbox.<br>*/}
                                                {/*                                    <a href="javascript:void(0)">Resend confirmation</a>*/}
                                                {/*                                </div>*/}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Ngày Sinh</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="dd/mm/yyyy"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Giới Tính : </label>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input
                                                        type="radio"
                                                        id="customRadioInline1"
                                                        name="customRadioInline1"
                                                        className="custom-control-input"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customRadioInline1"
                                                    >
                                                        Nam
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input
                                                        type="radio"
                                                        id="customRadioInline2"
                                                        name="customRadioInline1"
                                                        className="custom-control-input"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customRadioInline2"
                                                    >
                                                        Nữ
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">CMND</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Chứng minh nhân dân"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Số Điện Thoại</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Số Điện Thoại"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Địa Chỉ</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Địa Chỉ"
                                                />
                                            </div>
                                            <div className="text-right mt-3">
                                                <button type="button" className="btn btn__add">
                                                    Lưu
                                                </button>
                                                &nbsp;
                                                <button type="button" className="btn ">
                                                    Huỷ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="account-change-password">
                                        <div className="card-body pb-2">
                                            <div className="form-group">
                                                <label className="form-label">Mật Khẩu Hiện Tại</label>
                                                <input type="password" className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Mật Khẩu Mới</label>
                                                <input type="password" className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Xác Nhận Mật Khẩu Mới</label>
                                                <input type="password" className="form-control"/>
                                            </div>
                                            <button type="button" className="btn btn__add">
                                                Lưu
                                            </button>
                                            &nbsp;
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="account-info">
                                        <div className="card-body pb-2">
                                            <Formik
                                                initialValues={{
                                                    startDate: "",
                                                    endDate: dateTest,

                                                    // type: ""
                                                }}
                                                validationSchema={yup.object({
                                                    startDate: yup.date().required("Vui lòng không để trống ngày bắt đầu").max(date, "Không được nhập quá ngày hôm nay"),
                                                    endDate: yup.date().default(dateTest).max(startDate, "Ngày kết thúc không được lớn hơn ngày bắt đầu")
                                                })}
                                                onSubmit={values => {
                                                    console.log(values.endDate);
                                                    console.log(values.startDate);
                                                    const submitValue = async () => {
                                                        setEndDate(values.endDate + "T00:00:00");
                                                        setStartDate(values.startDate + "T00:00:00");
                                                    }
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
                                                                        <label htmlFor="startDate">Từ ngày: </label>
                                                                    </td>
                                                                    <td style={{paddingLeft: "30px"}}>
                                                                        <Field className="form-control" type="date"
                                                                               id="startDate" name="startDate"/>
                                                                    </td>
                                                                    <td style={{paddingLeft: "30px"}}>
                                                                        <label htmlFor="endDate">Đến ngày: </label>
                                                                    </td>
                                                                    <td style={{paddingLeft: "30px"}}>
                                                                        <Field className="form-control" type="date"
                                                                               id="endDate" name="endDate"/>
                                                                    </td>
                                                                    {/*<td>*/}
                                                                    {/*    <label>*/}
                                                                    {/*        <Field type="radio" name="type"*/}
                                                                    {/*               value="Lịch sử cộng điểm"/>*/}
                                                                    {/*        Lịch sử cộng điểm*/}
                                                                    {/*    </label>*/}
                                                                    {/*</td>*/}
                                                                    {/*<td>*/}
                                                                    {/*    <label>*/}
                                                                    {/*        <Field type="radio" name="type"*/}
                                                                    {/*               value="Lịch sử dùng điểm"/>*/}
                                                                    {/*        Lịch sử dùng điểm*/}
                                                                    {/*    </label>*/}
                                                                    {/*</td>*/}
                                                                    <td style={{paddingLeft: "30px"}}>
                                                                        <button className="btn btn__search my-2 my-sm-0"
                                                                                style={{width: 100}} type="submit">
                                                                            Tìm kiếm
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={2}>
                                                                        <ErrorMessage name='startDate'/>
                                                                    </td>
                                                                    <td style={{paddingLeft: "30px"}} colSpan={2}>
                                                                        <ErrorMessage name='endDate'/>
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
                                            {historyBooking.length !== 0 &&
                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Tên Phim</th>
                                                        <th scope="col">Ngày Tạo</th>
                                                        <th scope="col">Tổng tiền</th>
                                                        <th scope="col">Điểm</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {historyBooking.map((booking) => (
                                                        <tr key={booking.id}>
                                                            <td style={{fontWeight: "bold"}}
                                                                scope="row">{booking.nameMovie}</td>
                                                            <td>{formatDate(booking.dateBooking)}</td>
                                                            <td>{formatNumber(booking.price)}</td>
                                                            <td>{formatNumber(booking.price / 50)}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            }
                                            {historyBooking.length === 0 &&
                                                <h4>Không tìm thấy dữ liệu</h4>}
                                            <div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className="clearfix" style={{paddingLeft: "60%"}}>
                                    <div className="hint-text"></div>
                                    <div className="page">
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="Trang Sau"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={1}
                                            marginPagesDisplayed={1}
                                            pageCount={totalPages}
                                            previousLabel="Trang Trước"
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
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}