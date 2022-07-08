import $ from "jquery";

const joinPage = document.getElementById("join__page");

const init = () => {
  $(() => {
    $("button.btn__submit-form").on("click", () => {
      // email (email) 검증
      const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      const userEmail = $("input.userID__input").val();
      // email 공란 시 alert
      if (userEmail === "") {
        alert("이메일을 입력해주세요.");
        // return false;
      }

      if (!emailReg.test(userEmail)) {
        alert("이메일 형식이 올바르지 않습니다.");
        // return false;
      }

      // if (userEmail) {
      //   $.ajax({
      //     url: "/api/user-id/check",
      //     type: "POST",
      //     data: { userEmail },
      //     async: false,
      //     success: (result) => {
      //       if (result.msg === "exsiting user") {
      //         alert("이미 사용중인 이메일입니다.");
      //       }
      //     },
      //     error: (err) => {
      //       alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
      //     },
      //   });
      // }

      // 이름 공란 시 alert
      const userName = $("input.userName__input").val();
      if (userName === "") {
        alert("사용하실 이름을 입력해주세요.");
        // return false;
      }
      // 이름에 숫자, 특수문자 입력 시 alert
      const numberReg = /[0-9]/;
      const specReg = /[~!@#$%^&*()_+|<>?:{}]/;
      if (numberReg.test(userName) || specReg.test(userName)) {
        alert("이름에는 숫자나 특수 문자를 사용할 수 없습니다.");
        // return false;
      }
      // 비밀번호 공란 시 alert
      const password = $("input.pw__input").val();
      if (password === "") {
        alert("비밀번호를 입력해주세요.");
        // return false;
      }
      // 비밀번호에 영문, 숫자 미입력 시 alert
      const engReg = /[a-zA-Z]/;
      if (!numberReg.test(password) || !engReg.test(password)) {
        alert("비밀번호에는 영문과 숫자가 반드시 포함되어야합니다.");
        // return false;
      }
      // 비밀번호 8글자 미만 시 alert
      if (password.length < 8) {
        alert("비밀번호는 최소 8자 이상이어야합니다.");
        // return false;
      }
      // 비밀번호 확인란 공란 시 alert
      const passwordCheck = $("input.pwcheckw__input").val();
      if (passwordCheck === "") {
        alert("비밀번호 확인란을 입력해주세요.");
        // return false;
      }
      // 비밀번호 확인란 영문, 숫자 미입력시 alert
      if (!engReg.test(passwordCheck) || !numberReg.test(passwordCheck)) {
        alert("비밀번호 확인란에는 영문과 숫자가 반드시 포함되어야합니다.");
        // return false;
      }
      // 비밀번호와 비밀번호 확인란의 값이 일치하지 않으면 alert
      console.log(password, passwordCheck);
      if (password !== passwordCheck) {
        alert("비밀번호와 비밀번호 확인란의 값이 일치하지 않습니다.");
        // return false;
      }
      // email 중복 체크, 아닐 경우 회원가입
      if (userEmail && userName && password && passwordCheck) {
        $.ajax({
          url: "/api/user-id/check",
          type: "POST",
          async: false,
          data: { userEmail, userName, password, passwordCheck },
          success: (result) => {
            if (result.msg === "exsiting user") {
              alert("이미 사용중인 이메일입니다.");
              window.location.href = `/`;
            } else if (result.msg === "join success") {
              alert("회원가입을 성공적으로 완료하였습니다.");
              window.location.href = `/`;
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
