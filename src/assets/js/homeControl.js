import $ from "jquery";
import routes from "../../routes";

const homePage = document.getElementById("home__page");

const init = () => {
  $(() => {
    // 홈 화면 국기 사진 Swiper
    const nationalFlagSwiper = new Swiper(".swiper", {
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOninteraction: false,
      },
      autoHeight: true,
      slideToClickedSlide: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    // 댓글 create post
    $("button.wrtting__button").on("click", (e) => {
      const text = $("textarea.writting__textarea").val();
      e.preventDefault();
      if (text === "") {
        alert("댓글을 입력해주세요.");
      } else {
        $.ajax({
          url: "/api/creat-comment",
          type: "POST",
          data: { text },
          success: (result) => {
            if (result.msg === "comment update") {
              $("button.wrtting__button").trigger("submit");
              window.location.reload();
            }
          },
          error: (err) => {
            alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
          },
        });
      }
    });

    // 댓글 delete post
    $("button.comment__delBtn").on("click", (e) => {
      e.preventDefault();
      const userID = $("button.comment__delBtn").attr("data-userID");
      $.ajax({
        url: "/api/delete-comment",
        type: "DELETE",
        data: { userID },
        success: (result) => {
          if (result.msg === "comment delete") {
            $("button.comment__delBtn").trigger("submit");
            window.location.reload();
          }
        },
        error: (err) => {
          alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
        },
      });
    });

    // 상품 sort 클릭 시 css 적용
    if (window.location.search === "" || window.location.search.includes("createdAt")) {
      $("a.sorting__createdAt-btn").css("color", "cornflowerblue");
    } else if (window.location.search.includes("title")) {
      $("a.sorting__title-btn").css("color", "cornflowerblue");
    } else if (window.location.search.includes("lowPrice")) {
      $("a.sorting__lowPrice-btn").css("color", "cornflowerblue");
    } else if (window.location.search.includes("highPrice")) {
      $("a.sorting__highPrice-btn").css("color", "cornflowerblue");
    } else if (window.location.search.includes("highRate")) {
      $("a.sorting__highRate-btn").css("color", "cornflowerblue");
    } else if (window.location.search.includes("choice")) {
      $("a.sorting__choice-btn").css("color", "cornflowerblue");
    }

    const a = 4000000;
    const testArr = [1, 2];
    let sum = 0;
    for (let i = 0; i <= a; i += 1) {
      if (testArr[i] + testArr[i + 1] <= a) {
        testArr.push(testArr[i] + testArr[i + 1]);
      }
    }
    for (let i = 0; i < testArr.length; i += 1) {
      if (testArr[i] % 2 === 0) {
        sum += testArr[i];
      }
    }
    console.log(sum);
  });
};
if (homePage) {
  init();
}
