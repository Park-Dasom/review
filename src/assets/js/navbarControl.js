import $ from "jquery";

const profileNavbar = document.getElementById("profile__navbar");

const init = () => {
  $(() => {
    if (window.location.pathname.includes("/user/update-profile")) {
      $("li.nav-item").removeClass("active");
      $("ul.navbar-nav li:first-child").addClass("active");
    } else if (window.location.pathname.includes("/user/cartlist")) {
      $("li.nav-item").removeClass("active");
      $("ul.navbar-nav li:nth-child(2)").addClass("active");
    } else if (window.location.pathname.includes("/user/wishlist")) {
      $("li.nav-item").removeClass("active");
      $("ul.navbar-nav li:last-child").addClass("active");
    }
  });
};
if (profileNavbar) {
  init();
}
