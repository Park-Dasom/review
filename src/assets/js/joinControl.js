import $ from "jquery";

const joinPage = document.getElementById("join__page");

const init = () => {
  $(() => {
    $("button.btn__submit-form").on("click", (e) => {
      e.preventDefault();
      const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      const numberReg = /[0-9]/;
      const specReg = /[~!@#$%^&*()_+|<>?:{}]/;
      const engReg = /[a-zA-Z]/;

      const userID = $("input.userID__input").val();
      const userName = $("input.userName__input").val();
      const password = $("input.pw__input").val();
      const passwordCheck = $("input.pwcheckw__input").val();

      if (userID === "") {
        // email 공란 시 alert
        alert("이메일을 입력해주세요.");
      } else if (!emailReg.test(userID)) {
        // email 형식 검증
        alert("이메일 형식이 올바르지 않습니다.");
      } else if (userName === "") {
        // 이름 공란 시 alert
        alert("사용하실 이름을 입력해주세요.");
      } else if (numberReg.test(userName) || specReg.test(userName)) {
        // 이름에 숫자, 특수문자 입력 시 alert
        alert("이름에는 숫자나 특수 문자를 사용할 수 없습니다.");
      } else if (password === "") {
        // 비밀번호 공란 시 alert
        alert("비밀번호를 입력해주세요.");
      } else if (!numberReg.test(password) || !engReg.test(password)) {
        // 비밀번호에 영문, 숫자 미입력 시 alert
        alert("비밀번호에는 영문과 숫자가 반드시 포함되어야합니다.");
      } else if (password.length < 8) {
        // 비밀번호 8글자 미만 시 alert
        alert("비밀번호는 최소 8자 이상이어야합니다.");
      } else if (passwordCheck === "") {
        // 비밀번호 확인란 공란 시 alert
        alert("비밀번호 확인란을 입력해주세요.");
      } else if (!engReg.test(passwordCheck) || !numberReg.test(passwordCheck)) {
        // 비밀번호 확인란 영문, 숫자 미입력시 alert
        alert("비밀번호 확인란에는 영문과 숫자가 반드시 포함되어야합니다.");
      } else if (password !== passwordCheck) {
        // 비밀번호와 비밀번호 확인란의 값이 일치하지 않으면 alert
        alert("비밀번호와 비밀번호 확인란의 값이 일치하지 않습니다.");
      } else {
        // email 중복 체크, 아닐 경우 회원가입
        $.ajax({
          url: "/api/id-double-check",
          type: "POST",
          data: { userID },
          success: (result) => {
            console.log(result);
            if (result.msg === "user exist") {
              alert("이미 존재하는 아이디입니다.");
            } else if (result.msg === "create user") {
              $("form.join__form").trigger("submit");
            }
          },
          error: (err) => {
            alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
          },
        });
      }
    });
  });
};

if (joinPage) {
  init();
}
