import $ from "jquery";
import routes from "../../routes";

const homePage = document.getElementById("home__page");

const init = () => {
  $(() => {
    // 상품 스크롤 시 추가로 상품 load
    let sorting;
    let skip = 8;
    $(window).on("scroll", () => {
      let totalHeight = $(document).height();
      let height = $(window).height();
      let scrollHeight = $(window).scrollTop();
      console.log($(window).scrollTop());
      console.log($(document).height() - $(window).height());
      if (scrollHeight === totalHeight - height - 20) {
        $.ajax({
          url: "/api/load-merchandise",
          type: "POST",
          data: { sorting, skip },
          success: (result) => {
            if (result.msg === "success") {
              let liHTML;
              const merchandises = result.merchandises;
              merchandises.forEach((x) => {
                liHTML = `<div class="col-sm-3">
                    <div class="marchandise__wrap">
                      <div class="merchandise__thumbnail-wrap">
                        <img class="merchandise__thumbnail" src=${x.thumbnail1} href='/merchandise/${x._id}'>
                      </div>
                      <div class="merchandise__description-wrap">
                        <a class="merchandise__title" href='/merchandise/${x._id}'>${x.title}</a>
                        <div class="merchandise__price">가격 : ${x.price}원
                        </div>
                      </div>
                    </div>
                  </div>`;
                $(".row").append(liHTML);
                skip += 1;
              });
            }
          },
          error: (err) => {
            alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
          },
        });
      }
    });

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

    const sortListing = (sort) => {
      $(`a.sorting__${sort}-btn`).css("color", "cornflowerblue");
      sorting = $(`a.sorting__${sort}-btn`).closest("li.sorting__item").attr("data-sort");
    };
    // 상품 sort 클릭 시 css 적용
    if (window.location.search === "" || window.location.search.includes("createdAt")) {
      sortListing("createdAt");
    } else if (window.location.search.includes("title")) {
      sortListing("title");
      // $("a.sorting__title-btn").css("color", "cornflowerblue");
    } else if (window.location.search.includes("lowPrice")) {
      sortListing("lowPrice");
      // $("a.sorting__lowPrice-btn").css("color", "cornflowerblue");
    } else if (window.location.search.includes("highPrice")) {
      sortListing("highPrice");
      // $("a.sorting__highPrice-btn").css("color", "cornflowerblue");
    } else if (window.location.search.includes("highRate")) {
      sortListing("highRate");
      // $("a.sorting__highRate-btn").css("color", "cornflowerblue");
    } else if (window.location.search.includes("choice")) {
      sortListing("choice");
      // $("a.sorting__choice-btn").css("color", "cornflowerblue");
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
    // console.log(sum);
  });
};
if (homePage) {
  init();
}
