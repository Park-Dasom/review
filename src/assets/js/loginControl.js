import $ from "jquery";

const loginPage = document.getElementById("login__page");

const init = () => {
  $(() => {
    $("button.btn__submit-form").on("click", () => {
      const userID = $("input.userID__input").val();
      
    })
    

  });
};

if (loginPage) {
  init();
}