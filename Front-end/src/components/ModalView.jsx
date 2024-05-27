import React, { useEffect, useState } from "react";
import { Modal, Button, Descriptions } from "antd";
import img from "../assets/images/products/product-01(1).jpg";
import { getAllOrder } from "../api/api";
const DetailModal = ({ isVisible, handleCancel, idView }) => {
  // Giả sử đây là dữ liệu bạn muốn hiển thị
  const orderInfo = {
    name: "Nguyễn Hải Dương",
    email: "duongnguyen270302@gmail.com",
    phone: "0367805247",
    address: "thôn Bình Tân, xã Công Lý, huyện Lý Nhân, tỉnh Hà Nam",
    orderDate: "13/5/2024",
    totalPrice: "3.500.000 VNĐ",
    typePay: "Đã thanh toán qua VNPay",
  };
  const [order, setOrder] = useState([]);
  const productInfo = {
    name: "Áo thun basic 02 ",
    price: "350.000 VND",
    quantity: "10   ",
  };
  console.log(idView);
  const getAll = async () => {
    const data = {
      idOrder: idView,
    };
    await getAllOrder(data).then((res) => {
      console.log(res);
      setOrder(res[0]);
    });
  };
  useEffect(() => {
    getAll();
    console.log(order);
  }, [idView]);
  const handleTypePay = (type) => {
    switch (type) {
      case 1:
        return "Thanh toán VNPay";
      case 2:
        return "Thanh toán khi nhận hàng";
      default:
        break;
    }
  };
  const formatDateV2 = (date) => {
    const dateObj = date.split("T")[0];
    const arrDate = dateObj.split("-");

    const ngay = arrDate[2];
    const thang = arrDate[1];
    const nam = arrDate[0];

    const ngayThangNam = `${ngay}/${thang}/${nam}`;
    return ngayThangNam;
  };
  return (
    <Modal
      title="Thông tin chi tiết đơn hàng"
      visible={isVisible}
      onCancel={handleCancel}
      footer={null} // Không hiển thị footer
    >
      <div className="modal-header">Thông tin người nhận</div>
      <div className="modal-content">
        <div className="info-section">
          <div className="order-detail-table">
            <table>
              <tbody>
                <tr>
                  <td>Họ tên:</td>
                  <td>{order.customerName}</td>
                </tr>

                <tr>
                  <td>Số điện thoại:</td>
                  <td>{order.customerPhone}</td>
                </tr>
                <tr>
                  <td>Địa chỉ:</td>
                  <td>{order.address}</td>
                </tr>
                <tr>
                  <td>Ngày mua:</td>
                  <td>
                    {order.createdBy ? formatDateV2(order.createdBy) : ""}
                  </td>
                </tr>
                <tr>
                  <td>Tổng tiền thanh toán:</td>
                  <td>{order.totalPrice}</td>
                </tr>
                <tr>
                  <td>Hình thức thanh toán</td>
                  <td>{handleTypePay(order.typePay)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-header">Chi tiết sản phẩm</div>
        <div className="product-section">
          {order.listProducts &&
            order.listProducts.length > 0 &&
            order.listProducts.map((item, index) => (
              <div key={index} className="product-item">
                <img src={item.namePath[0]} alt="Product" />
                <div className="product-info">
                  <div>{item.name}</div>
                  <div>Giá: {item.price}</div>
                  <div>Màu: {item.color}</div>
                  <div>Size: {item.size}</div>
                  <div>Số lượng: {item.quantiny}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="modal-footer">
        <button>In thông tin đơn hàng</button>
      </div>
    </Modal>
  );
};

export default DetailModal;
