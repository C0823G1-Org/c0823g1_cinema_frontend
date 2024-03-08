import { Link, useNavigate } from "react-router-dom";
import * as service from "../../../service/EmployeeService";
import "./HungVXK_EmployeeList.css";
import { useEffect, useState } from "react";
import MySwal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Sidebar } from "../Sidebar/Sidebar";

export default function EmployeeList() {
  const navigate = useNavigate();
  useEffect(() => {
    const roleUser = sessionStorage.getItem("roleUser");
    if (roleUser !== "ROLE_ADMIN") {
      navigate(`/login`);
    }
  }, []);
  const [employeeList, setEmployeeList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setAccessToken(token);
    const fetchApi = async (page, searchName, token) => {
      try {
        const result = await service.getAllEmployee(page, searchName, token);
        console.log(result);
        setEmployeeList(result.content);
        setTotalPages(result.totalPages);
        document.title = "Quản lý nhân viên"
      } catch (e) {
        console.log(e);
      }
    };
    fetchApi(0, searchName, token);
  }, []);
  const handleSearchName = (value) => {
    setSearchName(value);
  };
  const submitSearch = async () => {
    try {
      let res = await service.getAllEmployee(0, searchName, accessToken);
      setEmployeeList(res.content);
      setTotalPages(res.totalPages);
      setCurrentPage(0);
    } catch (e) {
      console.log(e);
    }
  };
  const handlePageClick = async (event) => {
    try {
      const pageNumber = event.selected;
      setCurrentPage(pageNumber);
      const result = await service.getAllEmployee(pageNumber, searchName, accessToken);
      setEmployeeList(result.content);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteClick = async (employee) => {
    MySwal.fire({
      title: "Xóa nhân viên",
      text: `Bạn muốn xóa nhân viên ${employee.fullName} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await service.deleteEmployee(employee, accessToken);
        MySwal.fire(
          "Xóa thành công!",
          `${employee.fullName} đã được xóa.`,
          "success"
        );
        const result = await service.getAllEmployee(currentPage, searchName, accessToken);
        setEmployeeList(result.content);
        setTotalPages(result.totalPages);
      }
    });
  };
  return (
    <>
      <Sidebar />
      <section className="home-section">
        <div className="container body_movie">
          <h1 style={{paddingTop:"20px"}}>Quản lý nhân viên</h1>
          <div className="table-wrapper_movie">
            <div className="table-title_movie">
              <div className="row">
                {/* Col 9 */}
                <div className="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9"  style={{height: "5.2rem"}}>
                  <form className="form-group my-2 my-lg-0 p-0 m-0 ">
                    <h5 style={{color: "white",paddingLeft:"15px"}}>Nhập tên nhân viên</h5>
                    <div className="d-flex flex-wrap">
                      <div className="col-3">
                        <div className="d-flex">
                          <input id="startDate" className="form-control mr-sm-2 w-100 mb-2" type="text"
                                 onChange={(event => handleSearchName(event.target.value))}
                                 name="startDate"
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <button className="btn F my-sm-0 btn__search_movie w-100" type="button"
                                onClick={() => submitSearch()}
                        >Tìm kiếm
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {/* Col 3 */}
                <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3" style={{marginTop: "19px"}}>
                  <Link to={"/employee/create"} className="btn btn__add_movie" style={{width: "12.5rem"}}>
                    <i style={{float: "left", fontSize: "21px", marginRight: "5px"}} className="material-icons">&#xE147;</i>
                    <span>Thêm mới nhân viên</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table_movie table-striped_movie table-hover_movie ">
                <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã nhân viên</th>
                  <th>Tên nhân viên</th>
                  <th>Số CCCD</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Chức năng</th>
                </tr>
                </thead>
                <tbody>
                {employeeList ? (
                    employeeList.map((employee, index) => (
                        <tr key={employee.id}>
                          <td>{index + 1}</td>
                          <td>TV-{employee.memberCode}</td>
                          <td>{employee.fullName}</td>
                          <td>{employee.idNumber}</td>
                          <td>{employee.email}</td>
                          <td>{employee.phoneNumber}</td>
                          <td>{employee.address}</td>
                          <td>
                            <Link to={`/employee/edit/${employee.id}`} className="edit"><i
                                style={{color: "#FFC107"}} className="material-icons"
                                data-toggle="tooltip"
                                title="Chỉnh sửa">&#xE254;</i></Link>
                            <Link onClick={() => handleDeleteClick(employee)} className="delete"
                                  data-toggle="modal" to={""}><i style={{color: "#F44336"}}
                                                                 className="material-icons"
                                                                 data-toggle="tooltip"
                                                                 title="Xóa">&#xE872;</i></Link>
                          </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan="7" className="text-danger h5">
                        Không tìm thấy dữ liệu
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
              <div className="clearfix">
                <div style={{float: "right"}} className="page">
                  <ReactPaginate
                      forcePage={currentPage}
                      breakLabel="..."
                      nextLabel="Trang Sau"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={2}
                      marginPagesDisplayed={2}
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
      </section>
    </>
  );
}
