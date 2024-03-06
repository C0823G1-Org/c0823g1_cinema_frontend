import { Link, useNavigate } from "react-router-dom";
import * as service from "../../../service/EmployeeService";
import "./HungVXK_EmployeeList.css";
import { useEffect, useState } from "react";
import MySwal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Sidebar } from "../Sidebar/Sidebar";

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchApi = async (page, searchName) => {
      try {
        const result = await service.getAllEmployee(page, searchName);
        console.log(result);
        setEmployeeList(result.content);
        setTotalPages(result.totalPages);
        document.title = "Quản lý nhân viên"
      } catch (e) {
        console.log(e);
      }
    };
    fetchApi(0, searchName);
  }, []);
  const handleSearchName = (value) => {
    setSearchName(value);
  };
  const submitSearch = async () => {
    try {
      let res = await service.getAllEmployee(0, searchName);
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
      const result = await service.getAllEmployee(pageNumber, searchName);
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
        await service.deleteEmployee(employee);
        MySwal.fire(
          "Xóa thành công!",
          `${employee.fullName} đã được xóa.`,
          "success"
        );
        const result = await service.getAllEmployee(currentPage, searchName);
        setEmployeeList(result.content);
        setTotalPages(result.totalPages);
      }
    });
  };
  return (
    <>
      <Sidebar />
      <section className="home-section">
      <div className="container body__employee">
        <h1>Quản lý nhân viên</h1>
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <form className="form-group my-2 my-lg-0 p-0 m-0">
                  <div className="d-inline">
                    <div className="d-flex">
                      <input
                        className="form-control_employee mr-sm-2"
                        type="search"
                        placeholder="Nhập tên nhân viên"
                        name="searchName"
                        aria-label="Search"
                        onChange={(event) =>
                          handleSearchName(event.target.value)
                        }
                        id="searchName"
                      />
                      <button
                        
                        className="my-2 my-sm-0 btn__search_employee"
                        type="button"
                        onClick={() => submitSearch()}
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div
                className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                style={{ width: "35px" }}
              >
                <Link to={"/employee/create"} className="btn__add_employee">
                  <i className="material-icons">&#xE147;</i>
                  <span>Thêm mới nhân viên</span>
                </Link>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
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
                    <td>{employee.memberCode}</td>
                    <td>{employee.fullName}</td>
                    <td>{employee.idNumber}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.address}</td>
                    <td>
                      <Link
                        to={`/employee/edit/${employee.id}`}
                        className="edit"
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Chỉnh sửa"
                        >
                          &#xE254;
                        </i>
                      </Link>
                      <Link
                        onClick={() => handleDeleteClick(employee)}
                        className="delete"
                        data-toggle="modal"
                        to={""}
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Xóa"
                        >
                          &#xE872;
                        </i>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-danger h5">
                    Danh sách trống
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="clearfix">
            <div className="hint-text"></div>
            <div className="page">
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
      </section>
      
    </>
  );
}
