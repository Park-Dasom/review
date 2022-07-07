import $ from "jquery";

const joinPage = document.getElementById("join__page");

const init = () => {
  $(() => {
    $("button.btn__submit-form").on("submit", () => {
      // email (email) 검증
      const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      const userEmail = $("input.user__input").val();
      // email 공란 시 alert
      if (userEmail === "") {
        alert("이메일을 입력해주세요.");
      }
      // email 형식 오류 시 alert
      if (!emailReg.test(userEmail)) {
        alert("이메일 형식이 올바르지 않습니다.");
      }
      // email 중복 사용 시 alert
      $.ajax({
        url: "/api/user-id/check",
        type: "POST",
        data: { userEmail },
        success: (result) => {
          if (result.msg === "no data") {
            // ID 중복 없음
          } else {
            alert("이미 사용중인 이메일입니다.");
          }
        }
      });

      // 이름에 숫자, 특수문자 입력 시 alert
      const userName = $("input.user__input").val();
      const nameRegNum = /[0-9]/;
      const nameRegspec = /[~!@#$%^&*()_+|<>?:{}]/;
      if (userName.test(nameRegNum) || userEmail.test(nameRegspec)) {
        alert("이름에 숫자나 특수 문자를 사용할 수 없습니다.");
      }

      // 비밀번호에 영문, 숫자 입력 시 alert

      // 비밀번호 8글자 미만 시 alert
    });
  });
};

if (joinPage) {
  init();
}
