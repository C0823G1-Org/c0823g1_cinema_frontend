import React, {useEffect, useState} from "react";
import {
    checkIfMovieDuplicated,
    createMovie,
    getAllCountries,
    getAllMovieAttributes,
} from "../../../service/MovieService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import {storage} from "../../config/config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {Sidebar} from "../Sidebar/Sidebar";
import Swal from "sweetalert2";
import {ThreeCircles} from "react-loader-spinner";
import css from "./movie.module.css"

export default function MovieCreate() {
    const navigate = useNavigate();
    const [movieAtt, setMovieAtt] = useState({})
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageUpload, setImageUpload] = useState(null)
    const [imageDownloaded, setImageDownloaded] = useState(null)
    const [submitData, setSubmitData] = useState({})
    const [toSchedule, setToSchedule] = useState(false)

    const posterFileSizeLimit = 5242880
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
        name: Yup.string().required("Tên không được để trống").min(2, "Tên phim ít nhất 2 ký tự").max(255, "Tên phim tối đa 255 ký tự").trim("Ký tự trống"),
        actor: Yup.string().required("Tên diễn viên không được để trống").min(2, "Tên diễn viên ít nhất 2 ký tự").max(255, "Tên phim tối đa 255 ký tự"),
        publisher: Yup.string().required("Tên nhà sản xuất không được để trống").min(2, "Tên nhà sản xuất ít nhất 2 ký tự").max(255, "Tên nhà sản xuất tối đa 255 ký tự"),
        director: Yup.string().required("Tên đạo diễn không được để trống").min(2, "Tên đạo diễn ít nhất 2 ký tự").max(255, "Tên đạo diễn tối đa 255 ký tự"),
        country: Yup.string().required("Vui lòng chọn quốc gia"),
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
            let jsonObject = {}
            jsonObject = submitData
            console.log(jsonObject)
            try {
                const result = await createMovie(jsonObject);
                Swal.close()
                console.log(result)
                if (result.status < 400) {
                    let timerInterval;
                    Swal.fire({
                        title: "Phim đã được lưu thành công!",
                        html: "Chuyển hướng màn hình sau <b></b>s.",
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
                            if (toSchedule) {
                                console.log(result.data)
                                navigate(`/movie/edit/${result.data}/schedule`)
                            } else {
                                console.log("Failed")
                                navigate("/movie")
                            }

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
                                <h1 style={{paddingTop: "20px"}}>Thêm mới phim</h1>
                                <Formik initialValues={initialValue}
                                        validationSchema={Yup.object(validationObject)}
                                        onSubmit={async (data) => {
                                            let isDuplicated = await checkIfMovieDuplicated(data)
                                            if (isDuplicated) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Lỗi...",
                                                    text: "Đã có phim trùng tên và ngày trong cơ sở dữ liệu!",
                                                });
                                                return
                                            }
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
                                                                            required={true}
                                                                        />
                                                                        <label
                                                                            className="custom-file-label"
                                                                            htmlFor="inputPoster">Chọn ảnh</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {imagePreview == null ? null :
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
                                                                           name="publisher"/>
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
                                                                           name="director"/>
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
                                                                            <option key={country.name.common}
                                                                                    value={country.name.common}>{country.name.common}</option>
                                                                        ))}
                                                                    </Field>
                                                                    <ErrorMessage name="country" component='p'
                                                                                  className="form-err"
                                                                                  style={{color: 'red'}}/>
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
                                                                           name="duration"/>
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
                                                                    className={css.dot}>&nbsp;*</span>
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
                                                <div className="d-flex justify-content-center mt-3">
                                                    <div>
                                                        <button type="submit" className="btn__add mr-2">
                                                            Lưu lại
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => {
                                                            setToSchedule(true)
                                                        }} type="submit" className="btn__add mr-2">
                                                            Lưu lại và thêm suất chiếu
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

