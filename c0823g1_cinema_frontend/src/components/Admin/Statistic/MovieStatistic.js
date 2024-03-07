import { useEffect, useState } from "react"
import MovieStatisticChart from "./MovieStatisticChart"
import { getTopMovie } from "../../../service/MovieService"
export default function MovieStatistic() {
    const [movies, setMovies] = useState([])
    const topMovies = async () => {
        let temp = await getTopMovie()
        console.log(temp.content);
        setMovies(temp.content)
    }

    useEffect(() => {
        topMovies()
    }, [])
    
    return (
        <>
        <div className="container mt-3">
          <div className="row mb-3">
            <h1>Thống kê phim</h1>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Thống kê phim
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
            <MovieStatisticChart />
          </div>
          <div className="row mt-5">
          <div className="col lg-6">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Tên phim</th>
                    <th>Tổng số vé</th>
                    <th>Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map(movie => (
                    <tr>
                      <td>{movie.movie_name}</td>
                      <td>{movie.sold_ticket}</td>
                      <td>{movie.revenue}</td>
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
    )
}