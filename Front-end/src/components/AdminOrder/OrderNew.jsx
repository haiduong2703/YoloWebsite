import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Space, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import DetailModal from "../ModalView";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import { Tabs } from "antd";
import { getAllOrder, ConfirmOrder, CancelOrder } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OrderNew = ({ reload }) => {
  console.log("Hello", reload);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [lyDo, setLyDo] = useState("");
  const [stateOrder, setStateOrder] = useState({
    codeOrder: "",
    dateBook: "",
    dateDelivery: "",
    totalPrice: "",
    status: "",
    code: "",
  });
  const [stateOrderDetail, setStateOrderDetail] = useState({
    codeOrder: "",
    dateBook: "",
    dateDelivery: "",
    totalPrice: "",
    status: "",
    code: "",
  });
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameUser, setIsNameUser] = useState("");
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [idChange, setIdChange] = useState();
  const [order, setOrder] = useState();
  const [message, setMessage] = useState("");
  const [idView, setIdView] = useState();
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const user = useSelector((state) => state.user);

  const [form] = Form.useForm();

  const data = [
    {
      key: "1",
      code: 93248,
      name: "Nguyễn Hải Dương",
      address: "thôn Bình Tân, xã Công Lý, huyện Lý Nhân, tỉnh Hà Nam",
      totalPrice: "3500000",
      totalProduct: "10",
      created: "13/5/2024",
      typePay: "VNPay",
    },
  ];

  const handleOnChangeDetail = (e) => {
    setStateOrderDetail({
      ...stateOrderDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetDetailProduct = () => {
    setIsOpenModalEdit(true);
  };
  const getOrderProcess = async () => {
    const data = {
      status: [1],
    };
    await getAllOrder(data).then((res) => {
      setOrder(res);
    });
  };
  useEffect(() => {
    getOrderProcess();
    console.log(order);
  }, [reload]);
  const onChangeLyDo = (e) => {
    setLyDo(e.target.value);
  };
  const renderIcons = () => {
    return (
      <div>
        <DeleteOutlined
          style={{
            fontSize: "26px",
            color: "red",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={() => setIsOpenModalDelete(true)}
        />
        <EditOutlined
          style={{ fontSize: "26px", color: "orange", cursor: "pointer" }}
          onClick={handleGetDetailProduct}
        />
      </div>
    );
  };
  const handleConfirm = (record) => {
    setIsModalConfirm(true);
  };
  const handleCancelOrder = () => {
    setIsOpenModalDelete(true);
  };
  const formatDateV2 = (date) => {
    const dateObj = date.split("T")[0];
    const arrDate = dateObj.split("-");

    // Lấy ra ngày, tháng và năm
    const ngay = arrDate[2];
    const thang = arrDate[1]; // Lưu ý: getMonth() trả về index của tháng (từ 0 đến 11)
    const nam = arrDate[0];

    // Định dạng lại chuỗi ngày tháng năm
    const ngayThangNam = ngay + "/" + thang + "/" + nam;

    return ngayThangNam;
    //return date.split("T")[0];
    //return moment(date).format("DD/MM/yyyy");
  };
  const handleTypePay = (record) => {
    switch (record.typePay) {
      case 1:
        return "Đã thanh toán bằng VNPay";
      case 2:
        return "Thanh toán COD";
    }
  };
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
    },
    {
      title: "Người nhận",
      dataIndex: "customerName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
    },
    {
      title: "Tổng sản phẩm",
      dataIndex: "quantiny",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdBy",
      render: (text, record) => {
        return <Space>{formatDateV2(record.createdBy)}</Space>;
      },
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "typePay",
      render: (text, record) => {
        return (
          <Space>
            {record.typePay === 1
              ? "Thanh toán VNPay"
              : "Thanh toán khi nhận hàng"}
          </Space>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Xem">
            <EyeOutlined
              onClick={() => handleOpenModal(record)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Nhận đơn">
            <CheckCircleOutlined
              onClick={() => handleConfirm(record)}
              style={{ cursor: "pointer", color: "green" }}
            />
          </Tooltip>
          <Tooltip title="Hủy đơn">
            <CloseCircleOutlined
              onClick={() => handleCancelOrder(record)}
              style={{ cursor: "pointer", color: "red" }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const onFinish = () => {};

  const handleOnChange = (e) => {
    setStateOrder({
      ...stateOrder,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancel = () => {
    setIsModal(false);
  };
  const handleOpenModal = (record) => {
    setIsModal(true);
    setIdView(record.id);
  };
  const confirmOrderNew = async (record) => {
    await ConfirmOrder(idChange)
      .then((res) => {
        if (res === true) {
          toast.success("Đã nhận đơn hàng !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          console.log("Ddax xac nhan ");
          setIsModalConfirm(false);
          getOrderProcess();
        }
      })
      .catch((err) => {
        toast.error("Xảy ra lỗi!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      });
  };
  const cancelOrrderNew = async () => {
    console.log(lyDo);
    if (lyDo === "") {
      setMessage("Vui lòng nhập lý do hủy hàng");
    } else {
      await CancelOrder(idChange, lyDo)
        .then((res) => {
          toast.success("Đã hủy đơn hàng thành công !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setIsOpenModalDelete(false); //
          getOrderProcess();
        })
        .catch((err) => {
          toast.error("Đã xảy ra lỗi, vui lòng thử lại !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        });
    }
  };
  return (
    <div>
      <ModalComponent
        title="Hủy đơn hàng"
        open={isOpenModalDelete}
        onCancel={() => {
          setIsOpenModalDelete(false);
          setMessage("");
          setLyDo("");
        }}
        onOk={() => cancelOrrderNew()}
      >
        <LoadingComponent isLoading={false}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn hủy đơn hàng này không?`}</div>
          <input
            type="text"
            placeholder="Nhập lý do hủy đơn hàng"
            value={lyDo}
            onChange={(e) => onChangeLyDo(e)}
          />
          {message && <div className="errorSignUp">{message}</div>}
        </LoadingComponent>
      </ModalComponent>
      <ModalComponent
        title="Xác nhận đơn hàng"
        open={isModalConfirm}
        onCancel={() => setIsModalConfirm(false)}
        onOk={(e) => confirmOrderNew(e)}
      >
        <LoadingComponent isLoading={false}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn nhận đơn hàng này không?`}</div>
        </LoadingComponent>
      </ModalComponent>
      <DrawerComponent
        title="Thông tin đơn hàng"
        open={isOpenModalEdit}
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={false}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 20,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={() => {}}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Date book"
              name="dateBook"
              rules={[
                {
                  required: true,
                  message: "Please input date book!",
                },
              ]}
            >
              <InputComponent
                value={stateOrderDetail.dateBook}
                onChange={handleOnChangeDetail}
                name="dateBook"
              />
            </Form.Item>

            <Form.Item
              label="Date Delivery"
              name="dateDelivery"
              rules={[
                {
                  required: true,
                  message: "Please input dateDelivery!",
                },
              ]}
            >
              <InputComponent
                value={stateOrderDetail.dateDelivery}
                onChange={handleOnChangeDetail}
                name="dateDelivery"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="totalPrice"
              rules={[
                {
                  required: true,
                  message: "Please input total price!",
                },
              ]}
            >
              <InputComponent
                value={stateOrderDetail.totalPrice}
                onChange={handleOnChangeDetail}
                name="totalPrice"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 21,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>
      <DetailModal
        isVisible={isModal}
        idView={idView}
        handleCancel={handleCancel}
      />
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          isLoading={false}
          columns={columns}
          data={order}
          handleDelete={() => {}}
          onRow={(record) => {
            console.log(record);
            return {
              onClick: (event) => {
                setIsRowSelected(record._id);
                setIsNameUser(record.name);
                setIdChange(record.id);
              },
            };
          }}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderNew;
