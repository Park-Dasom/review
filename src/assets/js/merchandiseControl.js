import $ from "jquery";
import routes from "../../routes";

const merchandisePage = document.getElementById("merchandise__page");

const init = () => {
  $(() => {
    // 장바구니 cartlist 로 상품 넣기
    $(".merchandise__cartList-btn").on("click", () => {
      alert("해당 상품을 장바구니에 넣으시겠습니까?");
    });
  });
};
if (merchandisePage) {
  init();
}
