import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Space, Select, Tooltip } from "antd";
import { useEffect, useRef, useState, useCallback } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { getAllColor } from "../../api/color";
import { useSelector } from "react-redux";
import { getAllSize } from "../../api/size";
import { Input } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  PoweroffOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { Upload, message, Image } from 'antd';
import axios from 'axios';
import { createProduct, getAllCategory, getAllProduct, removeProductById, getProductById, updateProduct } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "antd/es/form/Form";
import { getAllUser } from "../../api/user";
import { Switch } from 'antd';
import { changeStatusUser } from "../../api/user";
import { GetAllContact } from "../../api/api";
import { GetContactById } from "../../api/api";
import { ReplyContact } from "../../api/api";
import { DeletedContact } from "../../api/api";

const AdminUser = () => {
  const { Option } = Select;
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [reply, setReply] = useState({
    id: "",
    email: "",
    reply: ""
  });
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    request: "",
    sendDate: "",
  })
  const [contactGet, setContactGet] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    request: "",
    sendDate: "",
  })
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    categorySlug: "",
    color: [],
    slug: "",
    idCategory: 0,
    size: [],

    description: "",
    namePath: [],
  });
  const [stateProductDetail, setStateProductDetail] = useState({
    id: 0,
    name: "",
    price: "",
    categorySlug: "",
    idCategory: 0,
    color: [],
    slug: "",
    size: [],
    namePath: [],
    description: "",
  });
  const [stateProductUpdate, setStateProductUpdate] = useState({
    id: 0,
    name: "",
    price: "",
    categorySlug: "",
    idCategory: 0,
    color: [],
    slug: "",
    size: [],
    namePath: [],
    description: "",
  });
  const [category, setCategory] = useState([]);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameUser, setIsNameUser] = useState("");
  const [size, setSize] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [color, setColor] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUpload, setImageUpload] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [selectCategory, setSelectCategory] = useState(0);
  const [idProduct, setIdProduct] = useState(null);
  const [checkChange, setCheckChange] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    getListProduct();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const user = useSelector((state) => state.user);

  const [form] = Form.useForm();


  const handleToggleStatus = async (id, isChecked) => {
    console.log(isChecked);
    if (isChecked) {
      await changeStatusUser(id, 2).then((res) => {
        getListProduct();
      });
    } else {
      await changeStatusUser(id, 1).then((res) => {
        getListProduct();
      });;
    }
  }
  const handleOnChangeUpdate = (e) => {
    console.log(e.target.name);
    console.log(e.target.value)
    setStateProductUpdate({
      ...stateProductDetail,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Cập nhật giá trị form với trạng thái mới
    form.setFieldsValue({
      id: contactGet.id,
      name: contactGet.name,
      email: contactGet.email,
      phone: contactGet.phone,
      request: contactGet.request,
      sendDate: contactGet.sendDate,
      reply: contactGet.reply
      // ... các trường khác
    });
    console.log("Hello", contactGet)
  }, [contactGet, form]);
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
          onClick={() => {
            setIsOpenModalDelete(true)
            setIsOpenModalEdit(true)
          }}
        />
        <EditOutlined
          style={{ fontSize: "26px", color: "orange", cursor: "pointer" }}
          onClick={handleGetDetailProduct}
        />
      </div>
    );
  };
  const handleEdit = (record) => {
    console.log(record)
  }
  const handleDelete = (record) => {
    console.log(record);
  }
  const handleView = async (record) => {
    setIsOpenModalCreate(true)
    setIdProduct(record.id)
    await GetContactById(record.id).then((res) => {
      console.log(res)
      const format = {

        id: res.id,
        name: res.customerName,
        email: res.customerEmail,
        phone: res.customerPhone,
        request: res.request,
        sendDate: res.sendDate,
        reply: res.reply,
        status: res.status,
      }
      console.log(format)
      setContactGet(format);
    }

    );
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    // {
    //   title: "Slug",
    //   dataIndex: "slug",
    // },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Nội dung",
      dataIndex: "request",
      render: (text) => {
        if (text.length > 6) {
          return text.slice(0, 50) + "...";
        }
        return text;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "request",
      render: (text, record) => {
        if (record.status == 1) {
          return "Chưa trả lời";
        }
        if (record.status == 2) {
          return "Đã trả lời";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Xem">
            <EyeOutlined onClick={() => handleView(record)} style={{ cursor: "pointer" }} />
          </Tooltip>
          {record.status === 2 ? <Tooltip title="Xóa">
            <DeleteOutlined onClick={() => {
              setIsOpenModalDelete(true)
              setIdProduct(record.id)
            }} style={{ color: "red", cursor: "pointer" }} />
          </Tooltip> : <></>}
        </Space>
      ),
    },
  ];
  const getAllColorName = async () => {
    getAllColor().then((res) => {

      setColor(res);
    })
  }
  const getAllSizeName = async () => {
    getAllSize().then((res) => {

      setSize(res);
    })
  }
  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancel = () => {
    setIsOpenModalCreate(false);
    setStateProduct({
      name: null,
      price: null,
      categorySlug: null,
      color: [],
      slug: null,
      size: [],
      description: null,
    })
    form.resetFields();
    setImageUrls([]);
  };

  const onFinish = () => { };

  const handleOnChange = (e) => {

    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const getAllCategoryDrop = async () => {
    await getAllCategory().then((res) => {
      setCategory(res);
    });
  }
  const handleOncChangeDropColor = (selectedValues) => {

    setStateProduct({
      ...stateProduct,
      color: selectedValues,
    });

  }
  const handleOncChangeDropColorUpdate = (selectedValues) => {

    setStateProductUpdate({
      ...stateProductDetail,
      color: selectedValues,
    });
  }
  const handleOncChangeDropSizeUpdate = (selectedValues) => {

    setStateProductUpdate({
      ...stateProductUpdate,
      size: selectedValues,
    });

  }
  const handleOncChangeDropSize = (selectedValues) => {

    setStateProduct({
      ...stateProduct,
      size: selectedValues,
    });

  }
  const handleOncChangeDropCategory = (selectedValues) => {

    setStateProduct({
      ...stateProduct,
      category: selectedValues,
    });

  }
  const handleSubmit = async () => {
    console.log("hello")
    console.log(reply)
    console.log(contactGet.id)
    const data = {
      id: contactGet.id,
      email: contactGet.email,
      reply: reply.reply
    }
    await ReplyContact(data).then(res => {
      if (res) {
        toast.success("Gửi phản hồi thành công !", 1000, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsOpenModalCreate(false);
        getListProduct()
      } else {
        toast.success("Gửi phản hồi thất bại !", 1000, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    })
    //form.resetFields();
  }
  const getListProduct = async () => {

    await GetAllContact().then((res) => {
      const dataFormat = res.map((data) => {
        return {
          id: data.id,
          name: data.customerName,
          email: data.customerEmail,
          phone: data.customerPhone,
          request: data.request,
          sendDate: data.sendDate,
          status: data.status,
          reply: data.reply
        }
      })
      setListProduct(dataFormat);
    })
  }
  const handleRemoveProduct = async (record) => {
    await DeletedContact(idProduct).then((res) => {
      setIsOpenModalDelete(false)
      toast.success("Xóa thành công liên hệ !", 1000, {
        position: toast.POSITION.TOP_RIGHT,
      });
      getListProduct();
    }).catch((err) => {
      console.log(err);
    })
  }
  const handleGetDetailProduct = async (record) => {
    console.log(record);
    setIsOpenModalEdit(true);

    await getProductById(record.id).then((res) => {
      setStateProductDetail({
        id: res.id,
        name: res.name,
        price: res.price,
        color: res.idColor,
        size: res.idSize,
        idCategory: res.idCategory,
        namePath: res.namePath,
        description: res.description,
        namePath: res.namePath
      });
    });
    setIsOpenModalEdit(true);


  };

  const onChangeReply = (e) => {

    setReply({ ...reply, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    getAllColorName();
    getAllSizeName();
    getAllCategoryDrop();
    getListProduct();
  }, [])
  return (
    <div>
      <WrapperHeader>Quản lý liên hệ</WrapperHeader>
      <ModalComponent
        title="Thông tin chi tiết liên hệ"
        open={isOpenModalCreate}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={null}
      >
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
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Họ và tên"
            name="name"


          >
            <InputComponent
              value={contact.name}
              name="name"
              disabled="true"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"

          >
            <InputComponent
              value={contact.email}
              name="email"
              disabled="true"
            />
          </Form.Item>



          <Form.Item
            label="Số điện thoại"
            name="phone"

          >
            <InputComponent
              value={contact.phone}
              name="phone"
              disabled="true"
            />
          </Form.Item>



          <Form.Item
            label="Nội dung"
            name="request"

          >
            <Input.TextArea
              value={contact.request}
              name="request"
              type="textarea"
              disabled="true"
            />
          </Form.Item>
          {
            contact.reply ? (<Form.Item
              label="Nội dung trả lời"
              name="reply"

            >
              <Input.TextArea
                value={contact.reply}
                name="reply"
                type="textarea"
                disabled="true"
              />
            </Form.Item>) : (<Form.Item
              label="Nội dung trả lời"
              name="reply"
              rules={[
                {
                  required: true,
                  message: "Please input color product!",
                },
              ]}
            >
              <Input.TextArea
                value={reply.reply}
                name="reply"
                type="textarea"
                onChange={e => onChangeReply(e)}
              />
            </Form.Item>)
          }

          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Trả lời
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>

      <ModalComponent
        title="Xóa sản phẩm"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={() => { handleRemoveProduct(idProduct) }}
      >
        <LoadingComponent isLoading={false}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa phản hồi này không?`}</div>
        </LoadingComponent>
      </ModalComponent>


      <div style={{ marginTop: "20px", width: "75vw" }}>
        <TableComponent
          isLoading={false}
          columns={columns}
          data={listProduct}
          handleDelete={() => { }}
          onRow={(record) => {
            return {
              onClick: (event) => {
                console.log(event);
                setIsRowSelected(record.id);
                setIsNameUser(record.name);

                // setIdProduct(record.id);

              },
            };
          }}
          pagination={{ pageSize: 5 }}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminUser;
