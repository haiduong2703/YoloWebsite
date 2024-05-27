import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

import Grid from "./Grid";
import ProductCard from "./ProductCard";
import { Pagination } from "antd";
//import "antd/dist/antd.css";
const InfinityList = (props) => {
  const perLoad = 9;
  const listRef = useRef(null);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [index, setIndex] = useState(0);
  const perPage = 6; // Định nghĩa biến perPage ở đây
  const [currentPage, setCurrentPage] = useState(1); // Sử dụng useState
  const [loading, setLoading] = useState(false); // Sử dụng useState
  // useEffect(() => {
  //   setData(props.data.slice(0, perLoad));
  //   setIndex(1);
  // }, [props.data]);
  // useEffect(() => {
  //   // Thiết lập dữ liệu ban đầu và lắng nghe sự kiện scroll
  //   setData(props.data.slice(0, perPage));
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [props.data]);
  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //       document.documentElement.offsetHeight ||
  //     loading
  //   ) {
  //     return;
  //   }
  //   setLoading(true);
  // };

  // useEffect(() => {
  //   // Xử lý tải dữ liệu khi scroll đến cuối trang
  //   const loadMoreData = () => {
  //     const startIndex = (currentPage - 1) * perPage;
  //     const endIndex = startIndex + perPage;
  //     if (endIndex >= props.data.length) {
  //       return;
  //     }
  //     const newData = props.data.slice(0, endIndex);
  //     setData([...data, ...newData]);
  //     setCurrentPage(currentPage + 1);
  //     setLoading(false);
  //   };

  //   if (!loading) {
  //     return;
  //   }

  //   loadMoreData();
  // }, [loading]);
  useEffect(() => {
    // Thiết lập dữ liệu ban đầu
    setData(props.data.slice(0, perPage));
  }, [props.data]);
  const totalPages = Math.ceil(props.data.length / perPage);

  const changePage = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    setData(props.data.slice(startIndex, endIndex));
  };
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (listRef && listRef.current) {
  //       if (
  //         window.scrollY + window.innerHeight >=
  //         listRef.current.clientHeight + listRef.current.offsetTop + 200
  //       ) {
  //         setLoad(true);
  //       }
  //     }
  //   });
  // }, [listRef]);

  // useEffect(() => {
  //   const getItems = () => {
  //     const pages = Math.floor(props.data.length / perLoad);
  //     const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

  //     if (load && index <= maxIndex) {
  //       const start = perLoad + index;
  //       const end = start + perLoad;

  //       setData(data.concat(props.data.slice(start, end)));
  //       setIndex(index + 1);
  //     }
  //   };
  //   getItems();
  //   setLoad(false);
  // }, [load, index, data, props.data]);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data.map((item, index) => (
          <ProductCard
            key={index}
            id={item.id}
            img01={item.namePath[0]}
            img02={item.namePath[1]}
            name={item.name}
            price={Number(item.price)}
            //slug={item.slug}
          />
        ))}
      </Grid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          total={props.data.length}
          pageSize={perPage}
          onChange={changePage}
        />
      </div>
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
