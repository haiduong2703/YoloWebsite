import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Space, Tooltip, Dropdown, Menu } from "antd";
import { MenuProps } from "antd";
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
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { getAllOrder, SuccessdOrder, DeliveredOrder } from "../../api/api";
import { Tabs } from "antd";
const OrderSuccess = ({ reload }) => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isModal, setIsModal] = useState(false);
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
  const [orders, setOrders] = useState([]);
  const [keySelected, setKeySelected] = useState("1");
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
      update: "14/5/2024",
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
      id: Number(sessionStorage.getItem("id")),
      status: [4],
    };
    const res = await getAllOrder(data);
    setOrders(res);
  };

  useEffect(() => {
    getOrderProcess();
  }, [reload]);
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

  const menu = (record) => (
    <Menu onClick={(e) => handleMenuClick(record, e)}>
      <Menu.Item key="1">Đã nhận đơn</Menu.Item>
      <Menu.Item key="2">Giao cho ĐVVC</Menu.Item>
      <Menu.Item key="3">Giao thành công</Menu.Item>
    </Menu>
  );
  const handleMenuClick = (e) => {
    //message.info("Click on menu item.");
    setKeySelected(e.key[0]);
    console.log("click", e);
  };
  const items = [
    {
      label: "Đã nhận đơn",
      key: "1",
    },
    {
      label: "Giao cho ĐVVC",
      key: "2",
    },
    {
      label: "Giao hàng thành công",
      key: "3",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const handleSelect = () => {
    switch (keySelected) {
      case "1":
        return "Đã nhận đơn";
      case "2":
        return "Giao cho ĐVVC";
      case "3":
        return "Giao hàng thành công";
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
      title: "Ngày giao",
      dataIndex: "deliveryDate",
      render: (text, record) => {
        return <Space>{formatDateV2(record.deliveryDate)}</Space>;
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
      title: "Trạng thái",
      dataIndex: "updatestatus",
      render: (text, record) => (
        <Space size="middle">Giao hàng thành công</Space>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Xem">
            <EyeOutlined
              onClick={() => handleOpenModal()}
              style={{ cursor: "pointer" }}
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
  const handleOpenModal = () => {
    setIsModal(true);
  };
  return (
    <div>
      <ModalComponent
        title="Hủy đơn hàng"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={() => {}}
      >
        <LoadingComponent isLoading={false}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn hủy đơn hàng này không?`}</div>
        </LoadingComponent>
      </ModalComponent>
      <ModalComponent
        title="Xác nhận đơn hàng"
        open={isModalConfirm}
        onCancel={() => setIsModalConfirm(false)}
        onOk={() => {}}
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
      <DetailModal isVisible={isModal} handleCancel={handleCancel} />
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          isLoading={false}
          columns={columns}
          data={orders}
          handleDelete={() => {}}
          onRow={(record) => {
            console.log(record);
            return {
              onClick: (event) => {
                setIsRowSelected(record._id);
                setIsNameUser(record.name);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default OrderSuccess;
