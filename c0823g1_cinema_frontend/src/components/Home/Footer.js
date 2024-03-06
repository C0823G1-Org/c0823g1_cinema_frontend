import React from 'react'
import '../Home/Footer.css'
const Footer = () => {
  return (
    <>
      <footer className="pt-5 border__footer">
        <div className="container">
          <div className="row pt-2">
            <div className="col-sm-12 col-md-3">
              <div className="col-detail">
                <h5>Liên Lạc</h5>
                <ul>
                  <li><a href=''>
                    Câu Hỏi Thường Gặp</a></li>
                  <li><a href=''>Gửi Phản Hồi Cho Chúng Tôi</a></li>
                  <li><a href=''>Liên Lạc</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="col-detail">
                <h5>Thông Tin Rạp Phim</h5>
                <ul>
                  <li><a href=''>Về Chúng Tôi</a></li>
                  <li><a href=''>Tìm Kiếm</a></li>
                  <li><a href=''>Lịch Trình</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="col-detail">
                <h5>Thủ Tục Pháp Lý</h5>
                <ul>
                  <li><a href=''>Điều Khoảng &amp; Điều Kiện</a></li>
                  <li><a href=''>Chính Sách Bảo Mật</a></li>
                  <li><a href=''>Chính Sách Pháp Lý</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="col-detail">
                <h5>Kết Nối Với Chúng Tôi</h5>
                <ul>
                  <li><a href=''><i className="fab fa-facebook-f" /><span className="px-3">Facebook</span></a></li>
                  <li><a href=''><i className="fab fa-twitter" /><span className="px-3">Twitter</span></a></li>
                  <li><a href=''><i className="fab fa-google-plus-g" /><span className="px-3">Google</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
