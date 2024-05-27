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
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  PoweroffOutlined
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
const AdminUser = () => {
  const { Option } = Select;
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
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
      name: stateProductDetail.name,
      price: stateProductDetail.price,
      color: stateProductDetail.color,
      slug: stateProductDetail.namePath,
      size: stateProductDetail.size,
      category: stateProductDetail.idCategory,
      description: stateProductDetail.description,
      namePath: stateProductDetail.namePath
      // ... các trường khác
    });
  }, [stateProductDetail, form]);
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
      title: "Tên đăng nhập",
      dataIndex: "username",
    },
    // {
    //   title: "Category Slug",
    //   dataIndex: "categorySlug",
    // },
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
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const isChecked = record.status === 2 ? true : false; // Giả sử trạng thái hoạt động là 'active'
        return (
          <Tooltip title={isChecked ? 'Tắt' : 'Mở'}>
            <Switch
              checked={isChecked}
              onChange={() => handleToggleStatus(record.id, !isChecked)}
            // Bạn có thể thêm thuộc tính style để tùy chỉnh màu sắc nếu muốn
            />
          </Tooltip>
        );
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Tooltip title="Sửa">
    //         <EditOutlined onClick={() => handleGetDetailProduct(record)} style={{ cursor: "pointer" }} />
    //       </Tooltip>
    //       <Tooltip title="Xóa">
    //         <DeleteOutlined onClick={() => {
    //           setIsOpenModalDelete(true)
    //           setIdProduct(record.id)
    //         }} style={{ color: "red", cursor: "pointer" }} />
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
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

    const imageUploadFormat = imageUpload.map((item) => {
      const base64String = item.split(',')[1];
      return {
        base64String
      }
    })
    const imageReq = imageUploadFormat.map(item => item.base64String);
    const data = {
      name: stateProduct.name,
      description: stateProduct.description,
      price: stateProduct.price,
      slug: "ao-thun",
      idCategory: 1,
      idSize: stateProduct.size,
      idColor: stateProduct.color,
      base64String: imageReq,
    }
    await createProduct(data).then((res) => {
      toast.success("Thêm thành công sản phẩm mới !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
      getListProduct()

    })

    setImageUrls([]);
    setIsOpenModalCreate(false);
    setStateProduct({
      title: null,
      price: null,
      categorySlug: null,
      color: [],
      slug: null,
      size: [],
      description: null,
    })
    form.resetFields();
  }
  const getListProduct = async () => {
    const data = {
      name: searchTerm
    }
    await getAllUser(data).then((res) => {
      const dataFormat = res.map((data) => {
        return {
          id: data.id,
          name: data.fullname,
          username: data.username,
          email: data.email,
          phone: data.phone,
          address: data.address,
          status: data.status,
        }
      })
      setListProduct(dataFormat);
    })
  }
  const handleRemoveProduct = async (record) => {
    await removeProductById(idProduct).then((res) => {
      setIsOpenModalDelete(false)
      toast.success("Xóa thành công sản phẩm !", 2000, {
        position: toast.POSITION.TOP_RIGHT,
      });
      getListProduct();
    }).catch((err) => {
      console.log(err);
    })
  }
  const handleUpdateProduct = async () => {
    const imageUploadFormat = imageUpload.map((item) => {
      const base64String = item.split(',')[1];
      return {
        base64String
      }
    })
    const imageReq = imageUploadFormat.map(item => item.base64String);
    console.log(imageReq)
    console.log(stateProductUpdate);
    const data = {
      id: stateProductUpdate.id,
      name: stateProductUpdate.name,
      description: stateProductUpdate.description,
      price: stateProductUpdate.price,
      slug: "ao-thun",
      idCategory: stateProductUpdate.idCategory,
      idSize: stateProductUpdate.size,
      idColor: stateProductUpdate.color,
      base64String: imageReq,
    }
    await updateProduct(data).then((res) => {
      toast.success("Update thành công sản phẩm mới !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
      setIsOpenModalEdit(false);
      getListProduct()

    })

    setImageUrls([]);
    setStateProduct({
      title: null,
      price: null,
      categorySlug: null,
      color: [],
      slug: null,
      size: [],
      description: null,
    })
    form.resetFields();

  }
  // const handleGetDetailProduct = useCallback(async () => {

  //   if (idProduct) {
  //     await getProductById(idProduct).then((res) => {
  //       setStateProductDetail({
  //         id: res.id,
  //         name: res.name,
  //         price: res.price,
  //         color: res.idColor,
  //         size: res.idSize,
  //         idCategory: res.idCategory,
  //         namePath: res.namePath,
  //         description: res.description,
  //         namePath: res.namePath
  //       });
  //     });
  //     setIsOpenModalEdit(true);
  //   }

  // }, [idProduct]);
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

  // useEffect(() => {
  //   handleGetDetailProduct();
  // }, [handleGetDetailProduct]);

  useEffect(() => {
    getAllColorName();
    getAllSizeName();
    getAllCategoryDrop();
    getListProduct();
  }, [])
  return (
    <div>
      <WrapperHeader>Quản lý tài khoản khách hàng</WrapperHeader>


      <form onSubmit={e => handleSearch(e)}>
        <input
          type="text"
          className="search-input"
          placeholder="Nhập tên người dùng cần tìm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <ModalComponent
        title="Tạo sản phẩm mới"
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
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input title product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Giá tiền"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
            />
          </Form.Item>



          <Form.Item
            label="Màu sắc"
            name="color"
            rules={[
              {
                required: true,
                message: "Please input color product!",
              },
            ]}
          >
            <Select
              value={selectedColors}
              onChange={handleOncChangeDropColor}
              name="color"
              mode="multiple"
            >
              {
                color ? color.map(opt => (
                  <Option key={opt.id} value={opt.id}>{opt.name}</Option>
                )) : <></>
              }
            </Select>
          </Form.Item>



          <Form.Item
            label="Size"
            name="size"
            rules={[
              {
                required: true,
                message: "Please input size product!",
              },
            ]}
          >
            <Select
              value={selectedColors}
              onChange={handleOncChangeDropSize}
              name="color"
              mode="multiple"
            >
              {
                size ? size.map(opt => (
                  <Option key={opt.id} value={opt.id}>{opt.name}</Option>
                )) : <></>
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="Loại sản phẩm"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input size product!",
              },
            ]}
          >
            <Select
              value={selectCategory}
              onChange={handleOncChangeDropCategory}
              name="color"
            >
              {
                category ? category.map(opt => (
                  <Option key={opt.id} value={opt.id}>{opt.name}</Option>
                )) : <></>
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.description}
              onChange={handleOnChange}
              name="description"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
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
          >{`Bạn có chắc chắn muốn xóa sản phẩm có name "${isNameUser}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>


      <DrawerComponent
        title="Thông tin sản phẩm"
        open={isOpenModalEdit}
        onClose={() => {
          setIsOpenModalEdit(false);
          setCheckChange(false);
          setStateProductDetail({
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
        }}
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
            onFinish={() => { }}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input title product!",
                },
              ]}
            >
              <InputComponent
                value={stateProductUpdate.name}
                onChange={handleOnChangeUpdate}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input price product!",
                },
              ]}
            >
              <InputComponent
                value={stateProductUpdate.price}
                onChange={handleOnChangeUpdate}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Màu sắc"
              name="color"
              rules={[
                {
                  required: true,
                  message: "Please input color product!",
                },
              ]}
            >
              <Select
                value={stateProductUpdate.color}
                onChange={handleOncChangeDropColorUpdate}
                name="color"
                mode="multiple"
              >
                {
                  color ? color.map(opt => (
                    <Option key={opt.id} value={opt.id}>{opt.name}</Option>
                  )) : <></>
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="Size"
              name="size"
              rules={[
                {
                  required: true,
                  message: "Please input size product!",
                },
              ]}
            >
              <Select
                value={stateProductUpdate.size}
                onChange={handleOncChangeDropSizeUpdate}
                name="size"
                mode="multiple"
              >
                {
                  size ? size.map(opt => (
                    <Option key={opt.id} value={opt.id}>{opt.name}</Option>
                  )) : <></>
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="Loại sản phẩm"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please input size product!",
                },
              ]}
            >
              <Select
                value={stateProductUpdate.idCategory}
                onChange={handleOnChangeUpdate}
                name="category"
              >
                {
                  category ? category.map(opt => (
                    <Option key={opt.id} value={opt.id}>{opt.name}</Option>
                  )) : <></>
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input description product!",
                },
              ]}
            >
              <InputComponent
                value={stateProductUpdate.description}
                onChange={handleOnChangeUpdate}
                name="description"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 21,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={handleUpdateProduct}>
                Update
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>



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
