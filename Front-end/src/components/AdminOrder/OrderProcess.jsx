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

import { Tabs } from "antd";
import { getAllOrder, SuccessdOrder, DeliveredOrder } from "../../api/api";

const OrderProcess = ({ reload }) => {
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
  const [recordChange, setRecordChange] = useState(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getOrderProcess = async () => {
    const data = {
      status: [2, 3],
    };
    const res = await getAllOrder(data);
    setOrders(res);
  };

  useEffect(() => {
    getOrderProcess();
  }, [reload]);

  const user = useSelector((state) => state.user);

  const [form] = Form.useForm();

  const handleOnChangeDetail = (e) => {
    setStateOrderDetail({
      ...stateOrderDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetDetailProduct = () => {
    setIsOpenModalEdit(true);
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

  const handleMenuClick = async (e) => {
    const updatedOrders = orders.map((order) =>
      order.id === recordChange.id
        ? { ...order, status: parseInt(e.key) }
        : order
    );
    setOrders(updatedOrders);
    console.log(e);
    if (e.key === "3") {
      await DeliveredOrder(recordChange.id);
      getOrderProcess();
    }
    if (e.key === "4") {
      await SuccessdOrder(recordChange.id);
      getOrderProcess();
    }
  };

  const handleMenuClickButton = (record) => {
    setRecordChange(record);
    console.log(record);
  };

  const getMenuItems = (record) => [
    {
      label: "Đã nhận đơn",
      key: "2",
      disabled: true,
    },
    {
      label: "Giao cho ĐVVC",
      key: "3",
      disabled: record.status === 3, // Disable if status is 3
    },
    {
      label: "Giao hàng thành công",
      key: "4",
    },
  ];

  const getMenuProps = (record) => ({
    items: getMenuItems(record),
    onClick: handleMenuClick,
  });

  const handleSelect = (status) => {
    switch (status) {
      case 2:
        return "Đã nhận đơn";
      case 3:
        return "Giao cho ĐVVC";
      case 4:
        return "Giao hàng thành công";
      default:
        return "Trạng thái không xác định";
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
      title: "Ngày cập nhập",
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
      title: "Cập nhập trạng thái",
      dataIndex: "updatestatus",
      render: (text, record) => (
        <Dropdown menu={getMenuProps(record)}>
          <Button onMouseEnter={() => handleMenuClickButton(record)}>
            <Space>{handleSelect(record.status)}</Space>
          </Button>
        </Dropdown>
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
          <div style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}>
            {`Bạn có chắc chắn hủy đơn hàng này không?`}
          </div>
        </LoadingComponent>
      </ModalComponent>
      <ModalComponent
        title="Xác nhận đơn hàng"
        open={isModalConfirm}
        onCancel={() => setIsModalConfirm(false)}
        onOk={() => {}}
      >
        <LoadingComponent isLoading={false}>
          <div style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}>
            {`Bạn có chắc chắn nhận đơn hàng này không?`}
          </div>
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
            return {
              onClick: (event) => {
                setIsRowSelected(record._id);
                setIsNameUser(record.name);
              },
              onMouseEnter: (event) => {
                console.log(record);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default OrderProcess;
