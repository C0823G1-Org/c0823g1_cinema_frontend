import {useEffect, useState} from "react";
import ".//css/movie.css"
import {createMovie, getAllCountries, getAllMovieAttributes, getScheduleByHallId} from "../../../service/MovieService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import {storage} from "../../config/config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {Sidebar} from "../Sidebar/Sidebar";


export default function MovieCreate() {
    const navigate = useNavigate();
    const curDate = new Date()
    const sevenLoop = [0, 1, 2, 3, 4, 5, 6]
    const [movieAtt, setMovieAtt] = useState({})
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [schedulesList, setSchedulesList] = useState([])
    const [isTableUpdating, setIsTableUpdating] = useState(false)
    const [hallId, setHallId] = useState(-1)
    const [newSchedule, setNewSchedule] = useState([])
    const [imageUpload, setImageUpload] = useState(null)
    const [imageDownloaded, setImageDownloaded] = useState(null)


    const initialValue = {
        name: "",
        actor: "",
        publisher: "",
        director: "",
        country: "",
        startDate: "",
        duration: "",
        version: "",
        trailer: "",
        genre: "",
        description: "",
        ticketPrice: "",
    }

    const validationObject = {
        name: Yup.string().required("Tên không được để trống").min(2, "Tên phim ít nhất 2 ký tự").max(255, "Tên phim tối đa 255 ký tự"),
        actor: Yup.string().required("Tên diễn viên không được để trống").min(2, "Tên diễn viên ít nhất 2 ký tự").max(255, "Tên phim tối đa 255 ký tự"),
        publisher: Yup.string().required("Tên nhà sản xuất không được để trống").min(2, "Tên nhà sản xuất ít nhất 2 ký tự").max(255, "Tên nhà sản xuất tối đa 255 ký tự"),
        director: Yup.string().required("Tên đạo diễn không được để trống").min(2, "Tên đạo diễn ít nhất 2 ký tự").max(255, "Tên đạo diễn tối đa 255 ký tự"),
        country: null,
        startDate: Yup.date().required("Ngày khởi chiếu không được để trống"),
        duration: Yup.number().required("Thời lượng phim không được để trống"),
        version: Yup.array().required("Vui lòng chọn ít nhất một phiên bản"),
        trailer: Yup.string().required("Trailer không được để trống"),
        genre: Yup.array().required("Vui lòng chọn ít nhất một thể loại"),
        description: Yup.string().max(65535, "Nội dung tối đa 65535 ký tự"),
        ticketPrice: Yup.number().required("Giá vé không được để trống").min(1, "Giá vé phải lớn hơn 0").max(10000000, "Giá vé không quá 10 triệu VND"),
    }

    useEffect(() => {
        updateScheduleTable();
        setIsTableUpdating(false)
        console.log("Suất chiếu lưu")
        console.log(newSchedule)
    }, [schedulesList])

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

    function tdOnClickHandler(event) {
        if (hallId < 0) {
            return;
        }
        let cell = event.target
        if (cell.style.backgroundColor === "grey") {
            console.log("DISABLE!")
            return
        }
        let checkbox = cell.children[0]
        checkbox.checked = !checkbox.checked
        if (checkbox.checked) {
            cell.style.backgroundColor = "lightblue"
        } else {
            cell.style.backgroundColor = "white"
        }
        updateNewSchedule(checkbox.value)
    }

    function updateNewSchedule(scheduleValue) {
        if (hallId < 0) {
            return
        }
        let valueArray = scheduleValue.split(",")
        let idTempValue = scheduleValue + "," + hallId
        let newScheduleDTO = {
            "idTemp": idTempValue,
            "date": valueArray[0],
            "scheduleTime": valueArray[1],
            "hall": hallId
        }
        if (newSchedule.length === 0) {
            setNewSchedule((prevState) => [newScheduleDTO, ...prevState])
            return
        }

        const found = newSchedule.findIndex((element) => element.idTemp === idTempValue)
        console.log("length: " + newSchedule.length)
        if (found < 0) {
            setNewSchedule((prevState) => [newScheduleDTO, ...prevState])
        } else {
            console.log("index to remove: " + found)
            newSchedule.splice(found, 1)
        }
    }

    async function hallOnChangeHandler(event) {
        try {
            setIsTableUpdating(true)
            let id = event.target.value
            setHallId(id)
            if (id < 0) {
                resetScheduleTable()
                setIsTableUpdating(false)
                return
            }
            const scheduleData = await getScheduleByHallId(id)
            setSchedulesList(scheduleData)
        } catch (e) {
            console.log(e)
        }
    }

    function resetScheduleTable() {
        let table = document.getElementById("scheduleTable")
        if (table == null) {
            return;
        }
        for (let row of table.rows) {
            if (row === table.rows[0]) {
                continue
            }
            for (let cell of row.cells) {
                if (cell === row.cells[0]) {
                    continue
                }
                cell.children[0].checked = false
                cell.children[1].innerText = ""
                cell.children[1].style.color = "black"
                cell.style.backgroundColor = "white"
            }
        }
    }

    function updateScheduleTable() {
        resetScheduleTable()
        //update table
        let id
        let label
        let cell
        schedulesList.forEach((scheduleList) => {
            id = scheduleList.date + "," + scheduleList.scheduleTime.scheduleTime
            label = document.getElementById(id + " title")
            label.innerText = scheduleList.movie.name
            label.style.color = "white"
            cell = label.parentElement
            cell.style.backgroundColor = "grey";
        })
    }

    function uploadImage() {
        if (imageUpload === null) return
        console.log(imageUpload.name)
        const imageRefLocal = ref(storage, `poster/${imageUpload.name + v4()}`)
        uploadBytes(imageRefLocal, imageUpload).then(() => {
            getDownloadURL(imageRefLocal).then((url) => {
                setImageDownloaded(url)
                // document.getElementById("inputPoster").value = url
            })
        })
    }

    return (
        <>
            {
                isLoading ? <h2>Loading...</h2> :
                    <>
                        <Sidebar/>
                        <section className="home-section">
                            <div className="container body_movie bg-white">
                                <h1 style={{paddingTop: "20px"}}>Thêm mới phim</h1>
                                <Formik initialValues={initialValue}
                                        validationSchema={Yup.object(validationObject)}
                                        onSubmit={async (data) => {
                                            data.poster = imageDownloaded
                                            let jsonObject = {}
                                            jsonObject.movieDTO = data
                                            jsonObject.scheduleDTO = newSchedule
                                            console.log(jsonObject)
                                            await createMovie(jsonObject);
                                            navigate("/movie")
                                        }}>
                                <div className="container-fluid mb-5">
                                        <Form>
                                            <ul className="nav nav-tabs d-flex justify-content-center" id="myTab"
                                                role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" id="info-tab" data-toggle="tab"
                                                       href="#info"
                                                       role="tab"
                                                       aria-controls="home"
                                                       aria-selected="true">Thông tin phim</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="schedule-tab" data-toggle="tab"
                                                       href="#schedule"
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
                                                                    <b>Poster phim</b><span
                                                                    className="red-dot">&nbsp;*</span>
                                                                </div>
                                                                <div className="col row"
                                                                     style={{marginLeft: "initial"}}>
                                                                    <div className="custom-file col">
                                                                        <input
                                                                            onChange={(event) => {
                                                                                setImageUpload(event.target.files[0])
                                                                            }}
                                                                            type="file"
                                                                            className="custom-file-input"
                                                                            id="inputPoster"
                                                                            name="poster"
                                                                        />
                                                                        <label
                                                                            className="custom-file-label"
                                                                            htmlFor="inputPoster">Chọn ảnh</label>
                                                                    </div>
                                                                    <div className="col-md-auto">
                                                                        <button type="button" onClick={uploadImage}
                                                                                className="btn btn-outline-secondary ">Up
                                                                            ảnh
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {imageDownloaded === null ? null :
                                                                <div className="row mt-3 d-flex justify-content-center">
                                                                    <img style={{maxWidth: "400px"}}
                                                                         src={imageDownloaded}
                                                                         alt=""/>
                                                                </div>}
                                                            <div className="row mt-3">
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <b>Tên phim</b><span
                                                                    className="red-dot">&nbsp;*</span>
                                                                </div>
                                                                <div className="col">
                                                                    <Field type="text" className="form-control"
                                                                           name="name"/>
                                                                    <ErrorMessage name="name" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
                                                                </div>

                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <b>Diễn viên</b><span
                                                                    className="red-dot">&nbsp;*</span>
                                                                </div>
                                                                <div className="col">
                                                                    <Field type="text" className="form-control"
                                                                           name="actor"/>
                                                                    <ErrorMessage name="actor" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-3">
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <b>Hãng phim</b><span
                                                                    className="red-dot">&nbsp;*</span>
                                                                </div>
                                                                <div className="col">
                                                                    <Field type="text" className="form-control"
                                                                           name="publisher"/>
                                                                    <ErrorMessage name="publisher" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-3">
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <b>Đạo diễn</b><span
                                                                    className="red-dot">&nbsp;*</span>
                                                                </div>
                                                                <div className="col">
                                                                    <Field type="text" className="form-control"
                                                                           name="director"/>
                                                                    <ErrorMessage name="director" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-3">
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <b>Quốc gia</b><span
                                                                    className="red-dot">&nbsp;*</span>
                                                                </div>
                                                                <div className="col">
                                                                    <Field as="select" className="custom-select"
                                                                           name="country">
                                                                        {countries.map((country) => (
                                                                            <option key={country.name.common}
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
                                                                    <ErrorMessage name="startDate" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
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
                                                                    <ErrorMessage name="duration" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <b>Phiên bản</b><span
                                                                    className="red-dot">&nbsp;*</span>
                                                                </div>
                                                                <div className="col">
                                                                    {movieAtt.versions.map((version) => (
                                                                        <div className="form-check form-check-inline"
                                                                             key={version.id}>
                                                                            <Field className="form-check-input"
                                                                                   id={"version" + version.id}
                                                                                   type="checkbox"
                                                                                   name="version"
                                                                                   value={"" + version.id}/>
                                                                            <label className="form-check-label"
                                                                                   htmlFor={"version" + version.id}>{version.name}</label>
                                                                        </div>
                                                                    ))}
                                                                    <ErrorMessage name="version" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-3">
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <b>Trailer</b><span
                                                                    className="red-dot">&nbsp;*</span>
                                                                </div>
                                                                <div className="col">
                                                                    <Field type="text" className="form-control"
                                                                           name="trailer"/>
                                                                    <ErrorMessage name="trailer" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-3">
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <b>Thể loại</b><span
                                                                    className="red-dot">&nbsp;*</span>
                                                                </div>
                                                                <div className="col row"
                                                                     style={{marginLeft: "initial"}}>
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
                                                                    <ErrorMessage name="genre" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <b>Nội dung</b>
                                                                </div>
                                                                <div className="col">
                                                                    <Field name="description" type="text"
                                                                           className="form-control"/>
                                                                    <ErrorMessage name="description" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col-3 d-flex align-items-center">
                                                                    <b>Giá vé (VND)</b><span
                                                                    className="red-dot">&nbsp;*</span>
                                                                </div>
                                                                <div className="col">
                                                                    <Field type="number" className="form-control"
                                                                           name="ticketPrice"/>
                                                                    <ErrorMessage name="ticketPrice" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="schedule" role="tabpanel"
                                                     aria-labelledby="schedule-tab">
                                                    <div>
                                                        <h2>
                                                            <b>Tháng {curDate.getMonth() + 1}</b> {curDate.getFullYear()}
                                                        </h2>
                                                        <div className="input-group mb-3">
                                                            <Field as="select" className="custom-select" name="hall"
                                                                   onChange={hallOnChangeHandler}>
                                                                <option defaultValue value="-1">Chọn sảnh chiếu
                                                                    phim...
                                                                </option>
                                                                {movieAtt.halls.map((hall) => (
                                                                    <option key={hall.id} value={"" + hall.id}>
                                                                        Sảnh {hall.name}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-2 d-flex justify-content-center">
                                                        {isTableUpdating ? <h2>Updating table...</h2> : <></>}
                                                        <table className="table table-bordered" id="scheduleTable">
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
                                                                    return (
                                                                        <th key={i}>{dayResult + ` / Ngày ${curDate.getDate() + i}`}</th>)
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
                                                                        let idValue = dayIncrease.getFullYear() + "-" + ("0" + (dayIncrease.getMonth() + 1)).slice(-2) + "-" + ("0" + dayIncrease.getDate()).slice(-2) + "," + scheduleTime.scheduleTime
                                                                        return (
                                                                            <td key={i} onClick={tdOnClickHandler}>
                                                                                <input id={idValue}
                                                                                       hidden="true"
                                                                                       type="checkbox"
                                                                                       name="schedules"
                                                                                       value={dayIncrease.getFullYear() + "-" + ("0" + (dayIncrease.getMonth() + 1)).slice(-2) + "-" + ("0" + dayIncrease.getDate()).slice(-2) + "," + scheduleTime.id}/>
                                                                                <label id={idValue + " title"}></label>
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
                                                            <button type="button" className="btn__back">Quay lại
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2"></div>
                                        </Form>
                                    </div>
                                </Formik>
                            </div>
                        </section>
                    </>
            }
        </>
    )
}

