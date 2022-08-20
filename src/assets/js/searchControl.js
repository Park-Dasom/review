import $ from "jquery";

const searchPage = document.getElementById("search__page");

const init = () => {
  $(() => {
    $("a.search__rate-3").on("click", (e) => {
      e.preventDefault();
      const avgRate = $("p.star__average").attr("data-set");
      console.log(avgRate);
    });
  });
};

if (searchPage) {
  init();
}
