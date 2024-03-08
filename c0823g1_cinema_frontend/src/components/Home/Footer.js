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
                <h5>Liên lạc</h5>
                <ul>
                  <li><a href=''>
                    Câu hỏi thường gặp</a></li>
                  <li><a href=''>Gửi phản hồi cho chúng tôi</a></li>
                  <li><a href=''>Liên lạc</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="col-detail">
                <h5>Thông tin rạp phim</h5>
                <ul>
                  <li><a href=''>Về chúng tôi</a></li>
                  <li><a href=''>Tìm kiếm</a></li>
                  <li><a href=''>Lịch trình</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="col-detail">
                <h5>Thủ tục pháp lý</h5>
                <ul>
                  <li><a href=''>Điều khoảng &amp; điều kiện</a></li>
                  <li><a href=''>Chính sách bảo mật</a></li>
                  <li><a href=''>Chính sách pháp lý</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="col-detail">
                <h5>Kết nối với chúng tôi</h5>
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
