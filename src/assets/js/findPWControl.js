import $ from "jquery";
import routes from "../../routes";

const findPage = document.getElementById("find__page");

const init = () => {
  $(() => {
    // SendGrid 비밀번호 찾기 이메일 post
    $("button.findPW__button").on("click", (e) => {
      e.preventDefault();
      const userID = $("input.findPW__userID").val();
      $.ajax({
        url: "/api/post-findPW",
        type: "POST",
        data: { userID },
        success: (result) => {
          if (result.msg === "E-mail sending") {
            alert("입력해주신 이메일을 통해 비밀번호를 재설정해주세요.");
            window.location.href = `${routes.user}${routes.login}`;
          }
        },
        error: (err) => {
          alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
        },
      });
    });
  });
};
if (findPage) {
  init();
}
