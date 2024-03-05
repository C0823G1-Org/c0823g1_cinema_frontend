import {useEffect, useState} from "react";
import ".//css/movie.css"
import {getAllCountries, getAllMovieAttributes} from "../../../service/MovieService";
import {Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import * as Yup from 'yup';
import {forEach} from "react-bootstrap/ElementChildren";

export default function MovieCreate() {
    const curDate = new Date()
    const sevenLoop = [0, 1, 2, 3, 4, 5, 6]
    const [movieAtt, setMovieAtt] = useState({})
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [schedules, setSchedules] = useState([])
    const initialValue = {
        poster: "",
        name: "",
        actor: "",
        publisher: "",
        director: "",
        country: "",
        startDate: "",
        duration: "",
        version: [],
        trailer: "",
        genre: "",
        description: "",
        ticketPrice: ""
    }
    const validationObject = {
        poster: Yup.mixed().required("Cần up ảnh poster"),
        name: Yup.string().required("Tên không được để trống").min(2, "Tên phimm ít nhất 2 ký tự").max(100, "Tên phim tối đa 100 ký tự"),
        actor: null,
        publisher: null,
        director: null,
        country: null,
        startDate: null,
        duration: null,
        version: null,
        trailer: null,
        genre: null,
        description: null,
        ticketPrice: null
    }
    useEffect(() => {
        async function fetchApi() {
            try {
                const attributes = await getAllMovieAttributes()
                const countriesData = await getAllCountries()
                if (attributes === false) {
                    return
                }
                setMovieAtt(attributes)
                setCountries(countriesData)
                setIsLoading(false);
            } catch (e) {
                console.log(e)
            }
        }

        fetchApi().then(r => {
            console.log("Done update movie attributes")
        })
    }, []);

    function bitch() {
        alert("Clicked")
    }

    return (
        <>
            {
                isLoading ? <h2>Loading...</h2> :
                    <>
                        <Formik initialValues={initialValue}
                                onSubmit={(data) => {
                                    console.log(data)
                                }}>
                            <div className="container-fluid mb-5">
                                <h2 style={{textAlign: "center"}} className="mt-3">Thêm mới phim</h2>
                                <Form>
                                    <ul className="nav nav-tabs d-flex justify-content-center" id="myTab"
                                        role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="info-tab" data-toggle="tab" href="#info"
                                               role="tab"
                                               aria-controls="home"
                                               aria-selected="true">Thông tin phim</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="schedule-tab" data-toggle="tab" href="#schedule"
                                               role="tab"
                                               aria-controls="profile"
                                               aria-selected="false">Suất chiếu</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="info" role="tabpanel"
                                             aria-labelledby="info-tab">
                                            <div className="row mt-2 d-flex justify-content-center">
                                                <div className="col-6">
                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Poster phim</b><span className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            <div className="custom-file">
                                                                <Field
                                                                    type="file"
                                                                    className="custom-file-input"
                                                                    id="inputGroupFile01"
                                                                    name="poster"
                                                                />
                                                                <label className="custom-file-label"
                                                                       htmlFor="inputGroupFile01"
                                                                >Chọn ảnh</label
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Tên phim</b><span className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            <Field type="text" className="form-control" name="name"/>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Diễn viên</b><span className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            <Field type="text" className="form-control" name="actor"/>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Hãng phim</b><span className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            <Field type="text" className="form-control"
                                                                   name="publisher"/>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Đạo diễn</b><span className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            <Field type="text" className="form-control"
                                                                   name="director"/>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Quốc gia</b><span className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            <Field as="select" className="custom-select" name="country">
                                                                {countries.map((country) => (
                                                                    <option
                                                                        value={country.name.common}>{country.name.common}</option>
                                                                ))}
                                                            </Field>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Ngày bắt đầu chiếu</b><span
                                                            className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            <Field type="date" className="form-control"
                                                                   name="startDate"/>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Thời lượng (phút)</b><span
                                                            className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            <Field type="number" className="form-control"
                                                                   name="duration"/>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Phiên bản</b><span className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            {movieAtt.versions.map((version) => (
                                                                <div className="form-check form-check-inline"
                                                                     key={version.id}>
                                                                    <Field className="form-check-input"
                                                                           id={"version" + version.id}
                                                                           type="checkbox"
                                                                           name="version" value={"" + version.id}/>
                                                                    <label className="form-check-label"
                                                                           htmlFor={"version" + version.id}>{version.name}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Trailer</b><span className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            <Field type="text" className="form-control" name="trailer"/>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Thể loại</b><span className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col row" style={{marginLeft: "initial"}}>
                                                            {movieAtt.genres.map((genre) => (
                                                                <div
                                                                    className="form-check form-check-inline col-4 col-xl-3"
                                                                    key={genre.id}>
                                                                    <Field className="form-check-input"
                                                                           id={"genre" + genre.id}
                                                                           type="checkbox"
                                                                           name="genre"
                                                                           value={"" + genre.id}/>
                                                                    <label className="form-check-label"
                                                                           htmlFor={"genre" + genre.id}>{genre.name}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Nội dung</b>
                                                        </div>
                                                        <div className="col">
                                                            <Field name="description" type="text"
                                                                   className="form-control"/>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <b>Giá vé (VND)</b><span className="red-dot">&nbsp;*</span>
                                                        </div>
                                                        <div className="col">
                                                            <Field type="number" className="form-control"
                                                                   name="ticketPrice"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="schedule" role="tabpanel"
                                             aria-labelledby="schedule-tab">
                                            <div>
                                                <h2><b>Tháng {curDate.getMonth() + 1}</b> {curDate.getFullYear()}</h2>
                                                <div className="input-group mb-3">
                                                    <Field as="select" className="custom-select" name="hall">
                                                        <option selected>Chọn sảnh chiếu phim...</option>
                                                        {movieAtt.halls.map((hall) => (
                                                            <option value={"" + hall.id}>
                                                                Sảnh {hall.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                            </div>

                                            <div className="row mt-2 d-flex justify-content-center">
                                                <table className="table table-bordered" style={{tableLayout:"fixed"}}>
                                                    <thead>
                                                    <tr>
                                                        <th></th>
                                                        {sevenLoop.map((i) => {
                                                            let dayResult;
                                                            let dayIncrease = new Date();
                                                            dayIncrease.setDate(curDate.getDate() + i)
                                                            let dayNumber = dayIncrease.getDay();
                                                            switch (dayNumber) {
                                                                case 0:
                                                                    dayResult = "Chủ Nhật";
                                                                    break;
                                                                case 1:
                                                                    dayResult = "Thứ Hai";
                                                                    break;
                                                                case 2:
                                                                    dayResult = "Thứ Ba";
                                                                    break;
                                                                case 3:
                                                                    dayResult = "Thứ Tư";
                                                                    break;
                                                                case 4:
                                                                    dayResult = "Thứ Năm";
                                                                    break;
                                                                case 5:
                                                                    dayResult = "Thứ Sáu";
                                                                    break;
                                                                case 6:
                                                                    dayResult = "Thứ Bảy";
                                                                    break;
                                                                default:
                                                                    dayResult = "Lỗi"
                                                            }
                                                            return (<th>{curDate.getDate() + i + " " + dayResult}</th>)
                                                        })}
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {movieAtt.scheduleTimes.map((scheduleTime) => (
                                                        <tr key={scheduleTime.id}>
                                                            <td>{scheduleTime.scheduleTime}</td>
                                                            {sevenLoop.map((i) => {
                                                                let dayIncrease = new Date();
                                                                dayIncrease.setDate(curDate.getDate() + i)
                                                                return (
                                                                    <td onClick={()=>{alert("Bao le ngu")}}>

                                                                    </td>
                                                                )
                                                            })}
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row mt-3 d-flex justify-content-center">
                                            <div>
                                                <button type="submit" className="btn__add mr-2">
                                                    Lưu lại
                                                </button>
                                                <Link to="/movie">
                                                    <button type="button" className="btn__back">Quay lại</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2"></div>
                                </Form>
                            </div>
                        </Formik>
                    </>
            }
        </>
    )
}

