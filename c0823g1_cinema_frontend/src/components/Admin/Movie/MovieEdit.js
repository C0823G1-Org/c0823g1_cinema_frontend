import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import {
    editMovie, getAllCountries,
    getAllMovieAttributes, getMovieInfoById,
    getScheduleByHallId
} from "../../../service/MovieService";
import {Sidebar} from "../Sidebar/Sidebar";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../config/config";
import {v4} from "uuid";
import Swal from 'sweetalert2'
import {ThreeCircles} from "react-loader-spinner";
import {getScheduleByMovieId} from "../../../service/BookingService";
import css from "./movie.module.css"

function MovieEdit({scheduleTab}) {
    const params = useParams();
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
    const [editingMovie, setEditingMovie] = useState({})
    const [imagePreview, setImagePreview] = useState(null)
    const [submitData, setSubmitData] = useState({})

    const posterFileSizeLimit = 5242880
    const initialValue = {
        id: editingMovie.id,
        poster: editingMovie.poster,
        name: editingMovie.name,
        actor: editingMovie.actor,
        publisher: editingMovie.publisher,
        director: editingMovie.director,
        country: editingMovie.country,
        startDate: editingMovie.startDate,
        duration: editingMovie.duration,
        version: editingMovie.versionsString,
        trailer: editingMovie.trailer,
        genre: editingMovie.genresString,
        description: editingMovie.description,
        ticketPrice: editingMovie.ticketPrice,
    }

    const validationObject = {
        poster: Yup.mixed().required("Phải có poster"),
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
        async function continueSubmit() {
            if (imageDownloaded == null) return
            submitData.poster = imageDownloaded
            console.log(submitData.name)
            let jsonObject = {}
            jsonObject.movieDTO = submitData
            jsonObject.scheduleDTO = newSchedule
            console.log(jsonObject)
            try {
                const result = await editMovie(jsonObject);
                Swal.close()
                console.log("Result code: " + result)
                if (result < 400) {
                    let timerInterval;
                    Swal.fire({
                        title: "Phim đã được lưu thành công!",
                        html: "Trở về màn hình danh sách phim sau <b></b>s.",
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                timer.textContent = `${Math.ceil(Swal.getTimerLeft() / 1000)}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                            navigate("/movie")
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log("I was closed by the timer");
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Lỗi...",
                        text: "Lưu phim vào database không thành công...",
                    });
                }
            } catch (e) {
                console.log(e)
            }
        }

        continueSubmit()
    }, [imageDownloaded]);
    useEffect(() => {
        function clickScheduleTab() {
            if (isLoading || !scheduleTab) return
            document.getElementById("schedule-tab").click()
        }

        clickScheduleTab()
    }, [isLoading]);
    useEffect(() => {
        updateScheduleTable();
        setIsTableUpdating(false)
    }, [schedulesList])

    useEffect(() => {
        async function fetchApi() {
            try {
                const attributes = await getAllMovieAttributes()
                const countriesData = await getAllCountries()
                const movieData = await getMovieInfoById(params.id)
                const movieSchedule = await getScheduleByMovieId(params.id)
                if (!attributes || !movieData) {
                    Swal.fire({
                        icon: "error",
                        title: "API lỗi",
                        text: "Lỗi khi lấy thông tin phim"
                    });
                    return
                }
                setMovieAtt(attributes)
                setCountries(countriesData)
                setEditingMovie(movieData)
                let convertedSchedule = []
                if (movieSchedule.length > 0) {
                    movieSchedule.forEach((schedule) => {
                        let scheduleValue = schedule.date + "," + schedule.scheduleTime.id
                        let valueArray = scheduleValue.split(",")
                        let idTempValue = scheduleValue + "," + schedule.hall.id
                        let newScheduleDTO = {
                            "idFind": scheduleValue,
                            "idTemp": idTempValue,
                            "date": valueArray[0],
                            "scheduleTime": valueArray[1],
                            "hall": schedule.hall.id.toString()
                        }
                        convertedSchedule.push(newScheduleDTO)
                    })
                }
                setNewSchedule(convertedSchedule)
                setIsLoading(false);
            } catch (e) {
                console.log(e)
            }
        }

        fetchApi().then(() => {
        })
    }, []);

    function tdOnClickHandler(event) {
        if (hallId < 0) {
            return;
        }
        let cell = event.target
        if (cell.style.backgroundColor === "grey" || cell.parentElement.style.backgroundColor === "grey") {
            return
        }
        if (cell.nodeName !== "TD") {
            cell = cell.parentElement
        }
        let checkbox = cell.children[0]
        let array = cell.id.split(",")
        let scheduleTimeId = array[1]
        checkbox.checked = !checkbox.checked
        if (checkbox.checked) {
            let durationCheck = 150
            let currentDuration = editingMovie.duration
            let currentScheduleTimeId = Number(scheduleTimeId)
            while (currentDuration > durationCheck && currentScheduleTimeId < 9) {
                console.log("2")
                currentDuration -= durationCheck
                currentScheduleTimeId++
                let nextCell = document.getElementById(array[0] + "," + currentScheduleTimeId + ",cell")
                if (nextCell.children[1].innerText !== "") {
                    Swal.fire({
                        icon: "error",
                        title: "Suất chiếu bị trùng!",
                    });
                    checkbox.checked = !checkbox.checked
                    return;
                }
                nextCell.style.backgroundColor = "grey"
            }
            cell.children[1].innerText = editingMovie.name
            cell.children[1].style.color = "white"
            cell.style.backgroundColor = "lightblue"
        } else {
            let durationCheck = 150
            let currentDuration = editingMovie.duration
            let currentScheduleTimeId = Number(scheduleTimeId)
            while (currentDuration > durationCheck && currentScheduleTimeId < 9) {
                console.log("2")
                currentDuration -= durationCheck
                currentScheduleTimeId++
                let nextCell = document.getElementById(array[0] + "," + currentScheduleTimeId + ",cell")
                nextCell.style.backgroundColor = "white"
            }
            cell.children[1].innerText = ""
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
            "idFind": scheduleValue,
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
        if (found < 0) {
            setNewSchedule((prevState) => [newScheduleDTO, ...prevState])
        } else {
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
        if (schedulesList.length === 0) return
        //update table
        let id
        let label
        let cell
        schedulesList.forEach((scheduleList) => {
            id = scheduleList.date + "," + scheduleList.scheduleTime.id
            label = document.getElementById(id + " title")
            label.innerText = scheduleList.movie.name
            label.style.color = "white"
            cell = label.parentElement
            cell.style.backgroundColor = "grey";
        })
        if (newSchedule.length === 0) return
        newSchedule.forEach((element) => {
            if (element.hall !== hallId) return
            cell = document.getElementById(element.idFind).parentElement
            cell.style.backgroundColor = "lightblue"
            cell.children[0].checked = true
        })
    }

    function uploadImage() {
        if (imageUpload === null) return
        const imageRefLocal = ref(storage, `poster/${imageUpload.name + v4()}`)
        uploadBytes(imageRefLocal, imageUpload).then(() => {
            getDownloadURL(imageRefLocal).then((url) => {
                setImageDownloaded(url)
            })
        })
    }

    function previewImage(event) {
        let reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                // convert image file to base64 string
                setImagePreview(reader.result);
            },
            false,
        );
        let file = event.target.files[0]
        if (file.size > posterFileSizeLimit) {
            Swal.fire({
                icon: "error",
                title: "Dung lượng quá lớn",
                text: "File ảnh không được quá 5MB"
            });
            event.target.value = ""
            return
        }
        reader.readAsDataURL(file)
        setImageUpload(file)
    }


    return (
        <>
            <Sidebar/>
            {
                isLoading ? <ThreeCircles
                        visible={true}
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /> :
                    <section className="home-section">
                        <div className="container body_movie bg-white">
                            <h1 style={{paddingTop: "20px"}}>Chỉnh sửa phim {editingMovie.name}</h1>
                            <Formik initialValues={initialValue}
                                    validationSchema={Yup.object(validationObject)}
                                    onSubmit={async (data) => {
                                        Swal.fire({
                                            title: "Phim đang được lưu!",
                                            timerProgressBar: true,
                                            didOpen: () => {
                                                Swal.showLoading();
                                            }
                                        })
                                        data.name = data.name.replace(/\s+/g, ' ')
                                        data.actor = data.actor.replace(/\s+/g, ' ')
                                        data.director = data.director.replace(/\s+/g, ' ')
                                        data.publisher = data.publisher.replace(/\s+/g, ' ')
                                        data.description = data.description.replace(/\s+/g, ' ')
                                        setSubmitData(data)
                                        if (imageUpload == null) {
                                            setImageDownloaded(editingMovie.poster)
                                            return
                                        }
                                        uploadImage()
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
                                                                className={css.dot}>&nbsp;*</span>
                                                            </div>
                                                            <div className="col row"
                                                                 style={{marginLeft: "initial"}}>
                                                                <div className="custom-file col">
                                                                    <input
                                                                        onChange={previewImage}
                                                                        type="file"
                                                                        className="custom-file-input"
                                                                        id="inputPoster"
                                                                        name="poster"
                                                                        accept="image/*"
                                                                    />
                                                                    <label
                                                                        className="custom-file-label"
                                                                        htmlFor="inputPoster">Chọn ảnh</label>
                                                                </div>
                                                                <ErrorMessage name="poster" component='p'
                                                                              className="form-err"
                                                                              style={{color: 'red'}}/>
                                                            </div>
                                                        </div>
                                                        {imagePreview == null ?
                                                            <div className="row mt-3 d-flex justify-content-center">
                                                                <div className="col-3">
                                                                </div>
                                                                <div className="col">
                                                                    <img style={{maxWidth: "300px"}}
                                                                         src={editingMovie.poster}
                                                                         alt=""/>
                                                                </div>
                                                            </div> :
                                                            <div className="row mt-3 d-flex justify-content-center">
                                                                <div className="col-3">
                                                                </div>
                                                                <div className="col">
                                                                    <img style={{maxWidth: "300px"}}
                                                                         src={imagePreview}
                                                                         alt=""/>
                                                                </div>
                                                            </div>}
                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex align-items-center">
                                                                <b>Tên phim</b><span
                                                                className={css.dot}>&nbsp;*</span>
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
                                                                className={css.dot}>&nbsp;*</span>
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
                                                                className={css.dot}>&nbsp;*</span>
                                                            </div>
                                                            <div className="col">
                                                                <Field type="text" className="form-control"
                                                                       name="publisher"
                                                                />
                                                                <ErrorMessage name="publisher" component='p'
                                                                              className="form-err"
                                                                              style={{color: 'red'}}/>
                                                            </div>
                                                        </div>

                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex align-items-center">
                                                                <b>Đạo diễn</b><span
                                                                className={css.dot}>&nbsp;*</span>
                                                            </div>
                                                            <div className="col">
                                                                <Field type="text" className="form-control"
                                                                       name="director"
                                                                />
                                                                <ErrorMessage name="director" component='p'
                                                                              className="form-err"
                                                                              style={{color: 'red'}}/>
                                                            </div>
                                                        </div>

                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex align-items-center">
                                                                <b>Quốc gia</b><span
                                                                className={css.dot}>&nbsp;*</span>
                                                            </div>
                                                            <div className="col">
                                                                <Field as="select" className="custom-select"
                                                                       name="country">
                                                                    {countries.map((country) => (
                                                                        country
                                                                            .name.common === editingMovie.country ?
                                                                            <option key={country.name.common}
                                                                                    value={country.name.common}
                                                                                    defaultValue>{country.name.common}</option> :
                                                                            <option key={country.name.common}
                                                                                    value={country.name.common}>{country.name.common}</option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </div>

                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex align-items-center">
                                                                <b>Ngày bắt đầu chiếu</b><span
                                                                className={css.dot}>&nbsp;*</span>
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
                                                                className={css.dot}>&nbsp;*</span>
                                                            </div>
                                                            <div className="col">
                                                                <Field type="number" className="form-control"
                                                                       name="duration"
                                                                       disabled/>
                                                                <ErrorMessage name="duration" component='p'
                                                                              className="form-err"
                                                                              style={{color: 'red'}}/>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex align-items-center">
                                                                <b>Phiên bản</b><span
                                                                className={css.dot}>&nbsp;*</span>
                                                            </div>
                                                            <div className="col">
                                                                {movieAtt.versions.map((version) => (
                                                                        <div
                                                                            className="form-check form-check-inline"
                                                                            key={version.id}>
                                                                            <Field className="form-check-input"
                                                                                   id={"version" + version.id}
                                                                                   type="checkbox"
                                                                                   name="version"
                                                                                   value={version.id.toString()}
                                                                            />
                                                                            <label className="form-check-label"
                                                                                   htmlFor={"version" + version.id}>{version.name}</label>
                                                                        </div>
                                                                    )
                                                                )}
                                                                <ErrorMessage name="version" component='p'
                                                                              className="form-err"
                                                                              style={{color: 'red'}}/>
                                                            </div>
                                                        </div>

                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex align-items-center">
                                                                <b>Trailer</b><span
                                                                className={css.dot}>&nbsp;*</span>
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
                                                                className={css.dot}>&nbsp;*</span>
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
                                                                                   value={genre.id.toString()}/>
                                                                            <label className="form-check-label"
                                                                                   htmlFor={"genre" + genre.id}>{genre.name}</label>
                                                                        </div>
                                                                    )
                                                                )}
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
                                                                       className="form-control"
                                                                />
                                                                <ErrorMessage name="description" component='p'
                                                                              className="form-err"
                                                                              style={{color: 'red'}}/>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex align-items-center">
                                                                <b>Giá vé (VND)</b><span
                                                                className={css.dot}>&nbsp;*</span>
                                                            </div>
                                                            <div className="col">
                                                                <Field type="number" className="form-control"
                                                                       name="ticketPrice"
                                                                />
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
                                                                    {hall.name}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>
                                                </div>

                                                <div className="row mt-2 d-flex justify-content-center">
                                                    {isTableUpdating ? <ThreeCircles
                                                        visible={true}
                                                        height="100"
                                                        width="100"
                                                        color="#4fa94d"
                                                        ariaLabel="three-circles-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                    /> : <></>}
                                                    <table className="table table-bordered" id="scheduleTable">
                                                        <thead>
                                                        <tr>
                                                            <th style={{width: "3%"}}></th>
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
                                                                    <th style={{width: "13%"}}
                                                                        key={i}>{dayResult + ` / Ngày ${curDate.getDate() + i}`}</th>)
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
                                                                    let idValue = dayIncrease.getFullYear() + "-" + ("0" + (dayIncrease.getMonth() + 1)).slice(-2) + "-" + ("0" + dayIncrease.getDate()).slice(-2) + "," + scheduleTime.id
                                                                    return (
                                                                        <td id={idValue + ",cell"} key={i}
                                                                            onClick={tdOnClickHandler}>
                                                                            <input id={idValue}
                                                                                   hidden={true}
                                                                                   type="checkbox"
                                                                                   name="schedules"
                                                                                   value={idValue}/>
                                                                            <p id={idValue + " title"}></p>
                                                                        </td>
                                                                    )
                                                                })}
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mt-3">
                                                <div>
                                                    <button type="submit" className="btn__add mr-2">
                                                        Lưu lại
                                                    </button>
                                                </div>
                                                <div>
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
            }
        </>
    )
}

export default MovieEdit
