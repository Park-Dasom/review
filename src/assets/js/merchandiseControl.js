import $ from "jquery";
import routes from "../../routes";

const merchandisePage = document.getElementById("merchandise__page");

const init = () => {
  $(() => {
    // 장바구니 cartlist 로 상품 넣기
    $(".merchandise__cartList-btn").on("click", () => {
      const merchandiseID = $(".merchandise__cartList-btn").attr("data-merchandiseID");
      alert("해당 상품을 장바구니에 넣으시겠습니까?");
      $.ajax({
        url: "/api/post-cartlist",
        type: "POST",
        data: { merchandiseID },
        success: (result) => {
          if (result.msg === "cookie sending") {
            alert("해당 상품이 장바구니에 담겼습니다.");
          }
        },
        error: (err) => {
          alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
        },
      });
    });
    $(".extraDiscountPrice__explain-modal").on("click", () => {
      alert("hi");
    });
  });
};
if (merchandisePage) {
  init();
}
