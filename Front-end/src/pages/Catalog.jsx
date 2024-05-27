import React, { useCallback, useRef, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import Helmet from "../components/Helmet";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import Pagination from "../components/Pagination";
import { getAllProduct } from "../api/api";
import { getAllCategory } from "../api/api";
import { getAllColor } from "../api/color";
import { getAllSize } from "../api/size";

const Catalog = () => {
  const initFilter = {
    name: "",
    category: [],
    color: [],
    size: [],
  };

  const location = useLocation();
  const params = useParams();
  const urlParams = new URLSearchParams(location.search);
  const keysearch = urlParams.get("keysearch") || "";

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState({ ...initFilter, name: keysearch });
  const [category, setCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);

  useEffect(() => {
    setFilter((prevFilter) => ({ ...prevFilter, name: keysearch }));
  }, [keysearch]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getProductlist();
  }, [filter]);

  const getProductlist = async () => {
    await getAllProduct(filter).then((res) => {
      setProducts(res);
    });
  };

  const fetchData = async () => {
    await getAllCategory().then((res) => {
      setCategory(
        res.map((item) => ({
          display: item.name,
          categorySlug: item.id,
        }))
      );
    });
    await getAllColor().then((res) => {
      setColors(
        res.map((item) => ({
          display: item.name,
          color: item.id,
        }))
      );
    });
    await getAllSize().then((res) => {
      setSize(
        res.map((item) => ({
          display: item.name,
          size: item.id,
        }))
      );
    });
  };

  const filterSelected = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categorySlug],
          });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item.color] });
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item.size] });
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: filter.category.filter((e) => e !== item.categorySlug),
          });
          break;
        case "COLOR":
          setFilter({
            ...filter,
            color: filter.color.filter((e) => e !== item.color),
          });
          break;
        case "SIZE":
          setFilter({
            ...filter,
            size: filter.size.filter((e) => e !== item.size),
          });
          break;
        default:
          break;
      }
    }
  };

  const clearFilter = () => {
    setFilter(initFilter);
    getProductlist();
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const filterRef = useRef(null);
  const showHideFilter = () => filterRef.current.classList.toggle("active");

  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div className="catalog__filter__close">
            <i
              className="bx bx-left-arrow-alt"
              onClick={() => showHideFilter()}
            ></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              Danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {category.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelected("CATEGORY", input.checked, item)
                    }
                    checked={filter.category.includes(item.categorySlug)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">Màu sắc</div>
            <div className="catalog__filter__widget__content">
              {colors.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelected("COLOR", input.checked, item)
                    }
                    checked={filter.color.includes(item.color)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">Kích thước</div>
            <div className="catalog__filter__widget__content">
              {size.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelected("SIZE", input.checked, item)
                    }
                    checked={filter.size.includes(item.size)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size="sm" onClick={clearFilter}>
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            Bộ lọc
          </Button>
        </div>
        <div className="catalog__content">
          <InfinityList data={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
