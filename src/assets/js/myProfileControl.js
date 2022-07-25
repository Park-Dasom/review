import $ from "jquery";

const myProfilePage = document.getElementById("myProfile__page");

const init = () => {
  $(() => {
    // 회원정보 수정 post
    $("button.form__button").on("click", (e) => {
      e.preventDefault();
      const userID = $("h1.form__userID").text();
      const name = $("input.form__name").val();
      const password = $("input.form__password").val();
      const passwordConfirm = $("input.form__password-confirm").val();

      const numberReg = /[0-9]/;
      const specReg = /[~!@#$%^&*()_+|<>?:{}]/;
      const engReg = /[a-zA-Z]/;

      if (name === "") {
        alert("이름을 입력해주세요.");
      } else if (numberReg.test(name) || specReg.test(name)) {
        // 이름에 숫자, 특수문자 입력 시 alert
        alert("이름에는 숫자나 특수 문자를 사용할 수 없습니다.");
      } else if (password === "") {
        // 비밀번호 공란 시 alert
        alert("비밀번호를 입력해주세요.");
      } else if (!passwordConfirm) {
        alert("비밀번호 확인란을 입혁해주세요");
      } else if (!numberReg.test(password) || !engReg.test(password)) {
        // 비밀번호에 영문, 숫자 미입력 시 alert
        alert("비밀번호에는 영문과 숫자가 반드시 포함되어야합니다.");
      } else if (password.length < 8) {
        // 비밀번호 8글자 미만 시 alert
        alert("비밀번호는 최소 8자 이상이어야합니다.");
      } else if (passwordConfirm === "") {
        // 비밀번호 확인란 공란 시 alert
        alert("비밀번호 확인란을 입력해주세요.");
      } else if (!engReg.test(passwordConfirm) || !numberReg.test(passwordConfirm)) {
        // 비밀번호 확인란 영문, 숫자 미입력시 alert
        alert("비밀번호 확인란에는 영문과 숫자가 반드시 포함되어야합니다.");
      } else if (password !== passwordConfirm) {
        // 비밀번호와 비밀번호 확인란의 값이 일치하지 않으면 alert
        alert("비밀번호와 비밀번호 확인란의 값이 일치하지 않습니다.");
      } else {
        $.ajax({
          url: `/api/update-profile`,
          type: "POST",
          data: { userID, name, password },
          success: (result) => {
            if (result.msg === "user-update") {
              alert("회원정보가 변경되었습니다.");
              window.location.reload();
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

if (myProfilePage) {
  init();
}
