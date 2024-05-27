import thanhtoan from "../assets/images/thanhtoan.jpg";
import { Link, useLocation } from "react-router-dom";
const PhanHoi = () => {
  return (
    <div className="containerPH">
      <div className="rowPH">
        <div className="block1">
          <h2>Thông tin đơn hàng</h2>
          <div className="box">
            <p>Nhà cung cấp</p>
            <h3>Sàn thương mại YOLO</h3>
          </div>
          <div className="box">
            <p>Mã đơn hàng</p>
            <h3>13689758</h3>
          </div>
          <div className="box">
            <p>Mô tả</p>
            <h3>Mua hàng tại sàn thương mại</h3>
          </div>
          <div className="box">
            <p>Số tiền</p>
            <h3>{sessionStorage.getItem("money")}</h3>
          </div>
          <Link to="/thanhtoan">
            <p className="quayve">Quay về</p>
          </Link>
        </div>
        <div className="block2">
          <div className="thanhtoanbox">
            <h3>Quét mã QR để thanh toán</h3>
            <img src={thanhtoan} alt="" />
            <h3>Sử dụng APP MOMO để thanh toán</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PhanHoi;
