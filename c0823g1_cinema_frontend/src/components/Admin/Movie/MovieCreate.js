import {useEffect, useState} from "react";
import ".//css/movie.css"
import {getAllMovieAttributes} from "../../../service/MovieService";
import {logging} from "googleapis/build/src/apis/logging";

export default function MovieCreate() {
//     <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
//     <script>
//         function sweetAlert() {
//         Swal.fire("Thêm thành công!!").then((result) => {
//             if (result.isConfirmed) {
//                 window.location.href = "HungVXK_employeeManager.html";
//             }
//         });
//     }
//     </script>
//     <script>
//         let arrow = document.querySelectorAll(".arrow");
//         for (var i = 0; i < arrow.length; i++) {
//         arrow[i].addEventListener("click", (e) => {
//             let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
//             arrowParent.classNameList.toggle("showMenu");
//         });
//     }
//         let sidebar = document.querySelector(".sidebar");
//         let sidebarBtn = document.querySelector(".bx-menu");
//         console.log(sidebarBtn);
//         sidebarBtn.addEventListener("click", () => {
//         sidebar.classNameList.toggle("close");
//     });
//     </script>
// }
    const [movieAtt, setMovieAtt] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchApi() {
            try {
                const attributes = await getAllMovieAttributes()
                console.log(attributes)
                setMovieAtt(attributes)
            } catch (e) {
                console.log(e)
            }
        }

        fetchApi().then(r => {
            console.log("Done update movie attributes")
            setIsLoading(false);
        })
    }, []);
    return (
        <>
            {
                isLoading ? <h2>Loading...</h2> :
                    <>
                        <div className="container-fluid mb-5">
                            <h2 style={{textAlign: "center"}} className="mt-3">Thêm mới phim</h2>
                            <ul className="nav nav-tabs d-flex justify-content-center" id="myTab" role="tablist">
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
                                                        <input
                                                            type="file"
                                                            className="custom-file-input"
                                                            id="inputGroupFile01"
                                                        />
                                                        <label className="custom-file-label" htmlFor="inputGroupFile01"
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
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-3 d-flex align-items-center">
                                                    <b>Diễn viên</b><span className="red-dot">&nbsp;*</span>
                                                </div>
                                                <div className="col">
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-3 d-flex align-items-center">
                                                    <b>Hãng phim</b><span className="red-dot">&nbsp;*</span>
                                                </div>
                                                <div className="col">
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-3 d-flex align-items-center">
                                                    <b>Đạo diễn</b><span className="red-dot">&nbsp;*</span>
                                                </div>
                                                <div className="col">
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-3 d-flex align-items-center">
                                                    <b>Thời lượng (phút)</b><span className="red-dot">&nbsp;*</span>
                                                </div>
                                                <div className="col">
                                                    <input type="number" className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-3 d-flex align-items-center">
                                                    <b>Phiên bản</b><span className="red-dot">&nbsp;*</span>
                                                </div>
                                                <div className="col">
                                                    {movieAtt.versions.map((version) => (
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" id={version.name}
                                                                   type="checkbox"
                                                                   name="version"
                                                                   value={version.id}/>
                                                            <label className="form-check-label"
                                                                   htmlFor={version.name}>{version.name}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-3 d-flex align-items-center">
                                                    <b>Trailer</b><span className="red-dot">&nbsp;*</span>
                                                </div>
                                                <div className="col">
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-3 d-flex align-items-center">
                                                    <b>Thể loại</b><span className="red-dot">&nbsp;*</span>
                                                </div>
                                                <div className="col form-check">
                                                    <div className="row mt-3">
                                                        <div className="col-3">
                                                            <input id="action" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="action">Hành
                                                                động</label>
                                                        </div>
                                                        <div className="col-3">
                                                            <input id="fiction" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="fiction">Viễn
                                                                tưởng</label>
                                                        </div>
                                                        <div className="col-3">
                                                            <input id="animation" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="animation">Hoạt
                                                                hình</label>

                                                        </div>
                                                        <div className="col-3">
                                                            <input id="kungfu" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="kungfu">Võ
                                                                thuật</label>

                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col">
                                                            <input id="comedy" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="comedy">Hài
                                                                hước</label>
                                                        </div>
                                                        <div className="col">
                                                            <input id="war" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="war">Chiến
                                                                tranh</label>

                                                        </div>
                                                        <div className="col">
                                                            <input id="horror" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="horror">Kinh
                                                                dị</label>
                                                        </div>
                                                        <div className="col">
                                                            <input id="classNameic" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="classNameic">Kinh
                                                                điển</label>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col">
                                                            <input id="romance" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="romance">Lãng
                                                                mạn</label>
                                                        </div>
                                                        <div className="col">
                                                            <input id="martialArt" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="martialArt">Kiếm
                                                                hiệp</label>

                                                        </div>
                                                        <div className="col">
                                                            <input id="adventure" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="adventure">Phiêu
                                                                lưu</label>
                                                        </div>
                                                        <div className="col">
                                                            <input id="psychological" type="checkbox" name="version"/>
                                                            <label className="form-check-label" htmlFor="psychological">Tâm
                                                                lý</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-3 d-flex align-items-center">
                                                    <b>Nội dung</b>
                                                </div>
                                                <div className="col">
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="schedule" role="tabpanel"
                                     aria-labelledby="schedule-tab">
                                    <div>
                                        <h2><b>Tháng 2</b> 2024</h2>
                                        <div className="input-group mb-3">
                                            <select className="custom-select" id="inputGroupSelect02">
                                                <option selected>Chọn sảnh chiếu phim...</option>
                                                <option value="1">Sảnh Một</option>
                                                <option value="2" selected>Sảnh Hai</option>
                                                <option value="3">Sảnh Ba</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mt-2 d-flex justify-content-center">
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>23 Thứ Sáu</th>
                                                <th>24 Thứ Bảy</th>
                                                <th>25 Chủ Nhật</th>
                                                <th>26 Thứ Hai</th>
                                                <th>27 Thứ Ba</th>
                                                <th>28 Thứ Tư</th>
                                                <th>29 Thứ Năm</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>09:00</td>
                                                <td className="bg-secondary text-light">Batman</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>09:30</td>
                                                <td className="bg-secondary text-light">Batman</td>
                                                <td className="bg-primary text-light">Sus Chungus</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td>10:00</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>10:30</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>11:00</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>11:30</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>12:00</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>12:30</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>13:00</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>13:30</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row mt-3 d-flex justify-content-center">
                                    <div>
                                        <button onClick="sweetAlert()" type="button" className="btn__add">
                                            Lưu lại
                                        </button>
                                        <a href="HungVXK_employeeManager.html">
                                            <button type="button" className="btn__back">Quay lại</button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2"></div>
                        </div>
                    </>
            }
        </>
    )
}