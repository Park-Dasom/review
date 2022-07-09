import $ from "jquery";

const loginPage = document.getElementById("login__page");

// 로그인 유저의 아이디, 비밀번호 존재 여부 검증
const init = () => {
  $(() => {
    $("button.btn__submit").on("click", () => {
      const userID = $("input.userID__input").val();
      const password = $("input.pw__input").val();
      if (userID === "") {
        alert("아이디를 입력해주세요.");
      } else if (password === "") {
        alert("비밀번호를 입력헤주세요");
      }
    });
  });
};

if (loginPage) {
  init();
}
