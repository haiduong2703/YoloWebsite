import React, { useRef, useState } from "react";
const Pagination = (props) => {
  const currentPage = props.currentPage;

  const totalPages = props.totalPages;
  console.log(currentPage);
  console.log(totalPages);
  // Hàm tạo chỉ số trang
  const generatePagination = () => {
    let pagination = [];

    // Trường hợp đặc biệt: chỉ có một trang
    if (totalPages === 1) {
      return pagination;
    }

    // Trường hợp hiển thị trang đầu tiên
    if (currentPage === 1) {
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pagination.push(i);
      }
      if (totalPages > 5) {
        pagination.push("...");
        pagination.push(totalPages);
      }
      return pagination;
    }

    // Trường hợp hiển thị trang cuối cùng
    if (currentPage === totalPages) {
      pagination.push(1);
      pagination.push("...");
      for (let i = Math.max(1, totalPages - 4); i <= totalPages; i++) {
        pagination.push(i);
      }
      return pagination;
    }

    // Trường hợp hiển thị trang ở giữa
    pagination.push(1);
    pagination.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(currentPage + 2, totalPages);
      i++
    ) {
      pagination.push(i);
    }
    pagination.push("...");
    pagination.push(totalPages);
    return pagination;
  };
  return (
    <div>
      {generatePagination().map((page, index) => (
        <span key={index} onClick={() => props.onChangePage(page)}>
          <button style={{ width: 30, height: 30 }}>{page}</button>
          {"     "}
        </span>
      ))}
    </div>
  );
};
export default Pagination;
