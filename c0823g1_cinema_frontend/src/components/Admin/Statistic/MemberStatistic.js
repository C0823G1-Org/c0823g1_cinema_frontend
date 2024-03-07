import { useEffect, useState } from "react";
import "./DuyDD_style.css";
import StatisticChart from "./StatisticChart";
import { getTopAccount } from "../../../service/AccountService";
export default function MemberStatistic() {
  const [memberList, setMemberList] = useState({})

  useEffect(()  => {
    topAccount()
  }, []);

  const topAccount = async () => {
    let temp = await getTopAccount();
    setMemberList(temp);
  };
  if (!memberList) {
    return null
  }
  return (
    <>
      <div className="container mt-3">
        <div className="row mb-3">
          <h1>Top thành viên</h1>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Trang chủ</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Thống kê thành viên
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-lg-3">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col lg-6">
          {/* Chart Here */}
          </div>
          <div className="col lg-6">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Mã thành viên</th>
                  <th>Tên thành viên</th>
                  <th>Số lượng vé</th>
                  <th>Tổng tiền</th>
                  <th>Điểm tích lũy</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map(member => (
                  <tr>
                    <td>{member.account_id}</td>
                    <td>{member.account_name}</td>
                    <td>{member.ticket_count}</td>
                    <td>{member.spent}</td>
                    <td>{member.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a
                  className="page-link disabled"
                  href="#"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link active" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
