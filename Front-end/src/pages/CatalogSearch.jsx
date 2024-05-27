import React, { useCallback, useRef, useState, useEffect } from "react";

import Helmet from "../components/Helmet";
//import Grid from "../components/Grid";
//import ProductCard from "../components/ProductCard";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";

//import productData from "../assets/fake-data/products";
import category from "../assets/fake-data/catagory";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";
import { getProductAPI } from "../api/product";

const CatalogSearch = () => {
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };
  const [products, setProducts] = useState([]);

  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState(initFilter);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const keyword = sessionStorage.getItem("keyword");

    if (keyword && productList.length > 0) {
      const keywordString = keyword.toString();
      setProducts(productList.filter((p) => p.title.includes(keywordString)));
    }
  }, [products]);
  const fetchData = async () => {
    var list = await getProductAPI();
    setProductList(list);
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
          setFilter({
            ...filter,
            color: [...filter.color, item.color],
          });

          break;

        case "SIZE":
          setFilter({
            ...filter,
            size: [...filter.size, item.size],
          });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCatagory = filter.category.filter(
            (e) => e !== item.categorySlug
          );
          setFilter({ ...filter, category: newCatagory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.color);
          setFilter({ ...filter, color: newColor });

          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item.size);
          setFilter({ ...filter, size: newSize });
          break;
        default:
      }
    }
  };
  const clearFilter = () => setFilter(initFilter);

  const updateProducts = useCallback(() => {
    let temp = productList;
    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categorySlug));
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors
          .split(",")
          .find((color) => filter.color.includes(color));
        return check !== undefined;
      });
    }
    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size
          .split(",")
          .find((size) => filter.size.includes(size));
        return check !== undefined;
      });
    }

    setProducts(temp);
  }, [filter, productList]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

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
        </div>
      </div>
    </Helmet>
  );
};

export default CatalogSearch;
