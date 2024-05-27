import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Offline = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 2000);
  });
  return (
    <div className="thank">
      Cảm ơn bạn đã đặt hàng, bạn sẽ được chuyển hướng về <span>TRANG CHỦ</span>{" "}
      trong giây lát
    </div>
  );
};
export default Offline;
