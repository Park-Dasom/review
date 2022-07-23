import $ from "jquery";
import routes from "../../routes";

const merchandisePage = document.getElementById("merchandise__page");

const init = () => {
  $(() => {
    // 장바구니 cartlist 로 상품 넣기
    $("button.merchandise__cartList-btn").on("click", () => {
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

    // 모달 창의 특별회원 가입하기 클릭 시 해당 화면으로 이동 (현재는 홈 화면으로 지정했음)
    $("button.btn.btn-primary").on("click", () => {
      window.location.href = `${routes.home}`;
    });
  });
};
if (merchandisePage) {
  init();
}
