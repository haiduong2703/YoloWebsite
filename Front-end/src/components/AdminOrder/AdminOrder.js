import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import DetailModal from "../ModalView";
import OrderProcess from "./OrderProcess";
import OrderSuccess from "./OrderSuccess";
import OrderCancel from "./OrderCancel";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import OrderNew from "./OrderNew";
import { Tabs } from 'antd';
const AdminProduct = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
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
  const [reload, setReload] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameUser, setIsNameUser] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isModal, setIsModal] = useState(false);
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
      codeOrder: "1",
      dateBook: "1/1/2020",
      dateDelivery: "3/1/2020",
      totalPrice: "200000",
    },
    {
      key: "2",
      codeOrder: "2",
      dateBook: "1/1/2020",
      dateDelivery: "3/1/2020",
      totalPrice: "200000",
    },
    {
      key: "3",
      codeOrder: "3",
      dateBook: "1/1/2020",
      dateDelivery: "3/1/2020",
      totalPrice: "200000",
    },
    {
      key: "4",
      codeOrder: "4",
      dateBook: "1/1/2020",
      dateDelivery: "3/1/2020",
      totalPrice: "200000",
    },
    {
      key: "5",
      codeOrder: "5",
      dateBook: "1/1/2020",
      dateDelivery: "3/1/2020",
      totalPrice: "200000",
    }
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

  const columns = [
    {
      title: "Code Order",
      dataIndex: "codeOrder",
    },
    {
      title: "Date Book",
      dataIndex: "dateBook",
    },
    {
      title: "Date Delivery",
      dataIndex: "dateDelivery",
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancel = () => {
    setIsModal(false);

  };

  const onFinish = () => { };

  const handleOnChange = (e) => {
    setStateOrder({
      ...stateOrder,
      [e.target.name]: e.target.value,
    });
  };
  const handleOpenModal = () => {
    setIsModal(true);
  }
  const onTabChange = (key) => {
    setReload(prev => !prev); // Toggle the reload state to trigger useEffect
  };

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        <Tabs.TabPane tab="Đơn hàng mới" key="1">
          <OrderNew reload={reload} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đơn hàng đang xử lý" key="2">
          <OrderProcess reload={reload} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đơn hàng gửi thành công" key="3">
          <OrderSuccess reload={reload} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đơn hàng đã hủy" key="4">
          <OrderCancel reload={reload} />
        </Tabs.TabPane>
      </Tabs>

    </div>
  );
};

export default AdminProduct;
