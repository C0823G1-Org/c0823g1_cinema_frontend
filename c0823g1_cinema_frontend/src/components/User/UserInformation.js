import "./User.css"
import {useEffect, useState} from "react";
import {getHistoryBooking, searchHistoryBooking} from "../../service/BookingService";
import {Field, Formik} from "formik";

export default function UserInformation() {
    const [historyBooking, setHistoryBooking] = useState([]);
    const id = 2;
    const [page, setPage] = useState(0);
    const [showButton, setShowButtton] = useState(0)
    const date = new Date();
    const [pageSearch, setPageSearch] = useState(0);
    const [showButtonSearch, setShowButtonSearch] = useState(0);
    useEffect(() => {
        const getListHistoryBooking = async () => {
            const listBooking = await getHistoryBooking(id, page);
            setHistoryBooking(listBooking);
            if (page === 0) {
                setShowButtton(1);
            } else {
                setShowButtton(3)
            }
            getHistoryBooking(id, page + 5).then((list1) => {
                if (list1.length === 0) {
                    setShowButtton(2);
                }
            })
        }
        getListHistoryBooking();
    }, [page]);
    useEffect(() => {
        console.log(historyBooking)
    }, [historyBooking]);
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
                                                    startDate: date,
                                                    endDate: date,
                                                    type: ""
                                                }}
                                                onSubmit={values => {
                                                    const setDateStart = values.startDate + "T00:00:00";
                                                    const setDateEnd = values.endDate + "T00:00:00";
                                                    const listTicket = searchHistoryBooking(id, setDateStart, setDateEnd, pageSearch);
                                                    const setList = async () => {
                                                        await setHistoryBooking(await listTicket);
                                                        await setPage(0);
                                                    }
                                                    setList();
                                                }}
                                            >
                                                {({handleSubmit}) => (
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="d-flex">
                                                            <table>
                                                                <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <label htmlFor="startDate">Từ: </label>
                                                                    </td>
                                                                    <td>
                                                                        <Field className="form-control" type="date"
                                                                               id="startDate" name="startDate"/>
                                                                    </td>
                                                                    <td>
                                                                        <label htmlFor="endDate">Đến: </label>
                                                                    </td>
                                                                    <td>
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
                                                                    <td style={{paddingLeft: 10}}>
                                                                        <button className="btn btn__search my-2 my-sm-0"
                                                                                style={{width: 100}} type="submit">
                                                                            Tìm kiếm
                                                                        </button>
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
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Tên Phim</th>
                                                    <th scope="col">Ngày Tạo</th>
                                                    <th scope="col">Tổng tiền</th>
                                                    <th scope="col">Điểm Cộng</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {historyBooking.map((booking) => (
                                                    <tr key={booking.id}>
                                                        <td style={{fontWeight: "bold"}} scope="row">{booking.nameMovie}</td>
                                                        <td>{formatDate(booking.dateBooking)}</td>
                                                        <td>{formatNumber(booking.price)}</td>
                                                        <td>{formatNumber(booking.price / 50)}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            <div>
                                                <div style={{marginLeft: "40%"}}>

                                                    {showButton === 1 && (
                                                        <button className="btn "
                                                                onClick={() => setPage(page + 5)}>Next</button>
                                                    )}
                                                    {showButton === 3 && (
                                                        <button className="btn "
                                                                onClick={() => setPage(page + 5)}>Next</button>
                                                    )}
                                                    {showButton === 2 && (
                                                        <button className="btn "
                                                                onClick={() => setPage(page - 5)}>Back</button>
                                                    )}
                                                    {showButton === 3 && (
                                                        <button className="btn "
                                                                onClick={() => setPage(page - 5)}>Back</button>
                                                    )}
                                                </div>
                                                <div style={{marginLeft: "60%"}}>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="account-social-links">
                                        <div className="card-body pb-2">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Tên Phim</th>
                                                    <th scope="col">Ngày Đặt</th>
                                                    <th scope="col">Tổng Tiền</th>
                                                    <th scope="col">Trạng Thái</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th scope="row">Harry Potter và Bảo bối tử thần</th>
                                                    <td>21/01/2017 8:08</td>
                                                    <td>120.000</td>
                                                    <td>Đợi Nhận Vé</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Harry Potter và Bảo bối tử thần</th>
                                                    <td>21/01/2017 8:08</td>
                                                    <td>120.000</td>
                                                    <td>Đã Nhận Vé</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Harry Potter và Bảo bối tử thần</th>
                                                    <td>21/01/2017 8:08</td>
                                                    <td>120.000</td>
                                                    <td>Đợi Nhận Vé</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="account-connections">
                                        <div className="card-body">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Ngày Huỷ</th>
                                                    <th scope="col">Tên Phim</th>
                                                    <th scope="col">Trạng Thái</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th scope="row">21/01/2017 8:08</th>
                                                    <td>Harry Potter và Bảo bối tử thần</td>
                                                    <td>Đã Huỷ</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">21/01/2017 8:08</th>
                                                    <td>Harry Potter và Bảo bối tử thần</td>
                                                    <td>Đang Chờ Xác Nhận</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">21/01/2017 8:08</th>
                                                    <td>Harry Potter và Bảo bối tử thần</td>
                                                    <td>Đang Chờ Xác Nhận</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="account-notifications">
                                        <div className="card-body pb-2">
                                            <h6 className="mb-4">Activity</h6>
                                            <div className="form-group">
                                                <label className="switcher">
                                                    <input
                                                        type="checkbox"
                                                        className="switcher-input"
                                                        defaultChecked=""
                                                    />
                                                    <span className="switcher-indicator">
                    <span className="switcher-yes"/>
                    <span className="switcher-no"/>
                  </span>
                                                    <span className="switcher-label">
                    Email me when someone comments on my article
                  </span>
                                                </label>
                                            </div>
                                            <div className="form-group">
                                                <label className="switcher">
                                                    <input
                                                        type="checkbox"
                                                        className="switcher-input"
                                                        defaultChecked=""
                                                    />
                                                    <span className="switcher-indicator">
                    <span className="switcher-yes"/>
                    <span className="switcher-no"/>
                  </span>
                                                    <span className="switcher-label">
                    Email me when someone answers on my forum thread
                  </span>
                                                </label>
                                            </div>
                                            <div className="form-group">
                                                <label className="switcher">
                                                    <input type="checkbox" className="switcher-input"/>
                                                    <span className="switcher-indicator">
                    <span className="switcher-yes"/>
                    <span className="switcher-no"/>
                  </span>
                                                    <span className="switcher-label">
                    Email me when someone follows me
                  </span>
                                                </label>
                                            </div>
                                        </div>
                                        <hr className="border-light m-0"/>
                                        <div className="card-body pb-2">
                                            <h6 className="mb-4">Application</h6>
                                            <div className="form-group">
                                                <label className="switcher">
                                                    <input
                                                        type="checkbox"
                                                        className="switcher-input"
                                                        defaultChecked=""
                                                    />
                                                    <span className="switcher-indicator">
                    <span className="switcher-yes"/>
                    <span className="switcher-no"/>
                  </span>
                                                    <span className="switcher-label">News and announcements</span>
                                                </label>
                                            </div>
                                            <div className="form-group">
                                                <label className="switcher">
                                                    <input type="checkbox" className="switcher-input"/>
                                                    <span className="switcher-indicator">
                    <span className="switcher-yes"/>
                    <span className="switcher-no"/>
                  </span>
                                                    <span className="switcher-label">Weekly product updates</span>
                                                </label>
                                            </div>
                                            <div className="form-group">
                                                <label className="switcher">
                                                    <input
                                                        type="checkbox"
                                                        className="switcher-input"
                                                        defaultChecked=""
                                                    />
                                                    <span className="switcher-indicator">
                    <span className="switcher-yes"/>
                    <span className="switcher-no"/>
                  </span>
                                                    <span className="switcher-label">Weekly blog digest</span>
                                                </label>
                                            </div>
                                        </div>
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