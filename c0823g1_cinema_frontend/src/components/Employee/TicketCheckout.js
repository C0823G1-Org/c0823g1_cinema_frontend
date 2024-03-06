export default function TicketList(){
    return(
        <>
            <h1 className="h1 text-center">Xuất Vé Phim</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <img src="https://cdn.galaxycine.vn/media/2024/1/24/madame-web-500_1706063512367.jpg" alt="Madame Web

                Xem thêm tại: https://www.galaxycine.vn/"/>
                    </div>
                    <div className="col-6">

                        <table className="table">
                            <tr>
                                <th colSpan="2">
                                    <h4>Movie: Madame Web</h4>
                                </th>
                            </tr>
                            <tr>
                                <th>Màn hình</th>
                                <td>Scrn 02</td>
                            </tr>
                            <tr className="tr">
                                <th>Ngày chiếu</th>
                                <td>22/02/2024</td>
                            </tr>
                            <tr>
                                <th>Giờ chiếu</th>
                                <td>08:20</td>
                            </tr>
                            <tr>
                                <th>Ghế</th>
                                <td>B8</td>
                            </tr>
                            <tr>
                                <th>Giá</th>
                                <td>
                                    <p>B8: 60000đ</p>

                                </td>
                            </tr>
                            <tr >
                                <th>Tổng cộng</th>
                                <td>60.000 đ</td>
                            </tr>

                        </table>
                        <div style= {{display: "flex",
                            justifyContent: "center"}}>
                            <button type="button" className="btn btn-primary">
                                <svg style={{width: "20",height: "20",paddingTop: 5}}
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 576 512">
                                    <path
                                        d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"/>

                                </svg>
                                Xuất Vé
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}