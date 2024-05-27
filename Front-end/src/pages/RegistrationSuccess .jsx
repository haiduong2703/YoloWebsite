import React from "react";

const RegistrationSuccess = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "green", fontSize: "18px", marginBottom: "20px" }}>
        Hãy kiểm tra Gmail của bạn để kích hoạt tài khoản.
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="green"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
};

export default RegistrationSuccess;
