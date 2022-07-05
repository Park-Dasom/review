import $ from "jquery";

const homePage = document.getElementById("home__page");

const init = () => {
  $(() => {
    // 코드 작성
    // 추천해요! 활성화 버튼
    $("img.heart__regular").each((i, elem) => {
      $(elem).on("click", () => {
        if ($(elem).hasClass("clicked")) {
          $(elem).removeClass("clicked");
          $(elem).attr("src", "/images/public/heart-regular.svg");
        } else {
          $(elem).addClass("clicked");
          $(elem).attr("src", "/images/public/heart-solid.svg");
        }
      });
    });
    // 첫 번째 별 click시 첫 번째 별 활성화, 그 외의 별 비활성화
    $("img.star__regular.one").each((i, elem) => {
      $(elem).on("click", () => {
        $(elem).addClass("solid");
        $(elem).siblings("img.star__regular.two").removeClass("solid");
        $(elem).siblings("img.star__regular.three").removeClass("solid");
        $(elem).siblings("img.star__regular.four").removeClass("solid");
        $(elem).siblings("img.star__regular.five").removeClass("solid");
        $(elem).attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.two").attr("src", "/images/public/star-regular.svg");
        $(elem).siblings("img.star__regular.three").attr("src", "/images/public/star-regular.svg");
        $(elem).siblings("img.star__regular.four").attr("src", "/images/public/star-regular.svg");
        $(elem).siblings("img.star__regular.five").attr("src", "/images/public/star-regular.svg");
      });
    });
  });
  // 두 번째 별 click시 첫 번째, 두 번째 별 활성화, 그 외의 별 비활성화
  $("img.star__regular.two").each((i, elem) => {
    $(elem).on("click", () => {
      $(elem).addClass("solid");
      $(elem).siblings("img.star__regular.one").addClass("solid");
      $(elem).siblings("img.star__regular.two").addClass("solid");
      $(elem).siblings("img.star__regular.three").removeClass("solid");
      $(elem).siblings("img.star__regular.four").removeClass("solid");
      $(elem).siblings("img.star__regular.five").removeClass("solid");
      $(elem).attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.one").attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.three").attr("src", "/images/public/star-regular.svg");
      $(elem).siblings("img.star__regular.four").attr("src", "/images/public/star-regular.svg");
      $(elem).siblings("img.star__regular.five").attr("src", "/images/public/star-regular.svg");
    });
  });
  // 세 번째 별 click시 첫 번째, 두 번째, 세 번째 별 활성화, 그 외의 별 비활성화
  $("img.star__regular.three").each((i, elem) => {
    $(elem).on("click", () => {
      $(elem).addClass("solid");
      $(elem).siblings("img.star__regular.one").addClass("solid");
      $(elem).siblings("img.star__regular.two").addClass("solid");
      $(elem).siblings("img.star__regular.four").removeClass("solid");
      $(elem).siblings("img.star__regular.five").removeClass("solid");
      $(elem).attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.one").attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.two").attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.four").attr("src", "/images/public/star-regular.svg");
      $(elem).siblings("img.star__regular.five").attr("src", "/images/public/star-regular.svg");
    });
  });
  // 네 번째 별 click시 첫 번째, 두 번째, 세 번째, 네 번째 별 활성화, 그 외의 별 비활성화
  $("img.star__regular.four").each((i, elem) => {
    $(elem).on("click", () => {
      $(elem).addClass("solid");
      $(elem).siblings("img.star__regular.one").addClass("solid");
      $(elem).siblings("img.star__regular.two").addClass("solid");
      $(elem).siblings("img.star__regular.three").addClass("solid");
      $(elem).siblings("img.star__regular.five").removeClass("solid");
      $(elem).attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.one").attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.two").attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.three").attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.five").attr("src", "/images/public/star-regular.svg");
    });
  });
  // 다섯 번째 별 click시 첫 번째, 두 번째, 세 번째, 네 번째, 다섯 번째 별 활성화
  $("img.star__regular.five").each((i, elem) => {
    $(elem).on("click", () => {
      $(elem).addClass("solid");
      $(elem).siblings("img.star__regular.one").addClass("solid");
      $(elem).siblings("img.star__regular.two").addClass("solid");
      $(elem).siblings("img.star__regular.three").addClass("solid");
      $(elem).siblings("img.star__regular.four").addClass("solid");
      $(elem).attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.one").attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.two").attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.three").attr("src", "/images/public/star-solid.svg");
      $(elem).siblings("img.star__regular.four").attr("src", "/images/public/star-solid.svg");
    });
  });

  // mouseenter시 첫 번째 별 활성화
  $("img.star__regular.one").each((i, elem) => {
    $(elem).ready(() => {
      $(elem).on("mouseenter", () => {
        $(elem).attr("src", "/images/public/star-solid.svg");
        // 두 번째, 세 번째, 네 번째, 다섯 번째 별 비활성화
        $(elem).siblings("img.star__regular.two").attr("src", "/images/public/star-regular.svg");
        $(elem).siblings("img.star__regular.three").attr("src", "/images/public/star-regular.svg");
        $(elem).siblings("img.star__regular.four").attr("src", "/images/public/star-regular.svg");
        $(elem).siblings("img.star__regular.five").attr("src", "/images/public/star-regular.svg");
      });
    });
  });
  // mouseenter시 두 번째 별 활성화
  $("img.star__regular.two").each((i, elem) => {
    $(elem).ready(() => {
      $(elem).on("mouseenter", () => {
        $(elem).attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.one").attr("src", "/images/public/star-solid.svg");
        // 세 번째, 네 번째, 다섯 번째 별 비활성화
        $(elem).siblings("img.star__regular.three").attr("src", "/images/public/star-regular.svg");
        $(elem).siblings("img.star__regular.four").attr("src", "/images/public/star-regular.svg");
        $(elem).siblings("img.star__regular.five").attr("src", "/images/public/star-regular.svg");
      });
    });
  });
  // mouseenter시 세 번째 별 활성화
  $("img.star__regular.three").each((i, elem) => {
    $(elem).ready(() => {
      $(elem).on("mouseenter", () => {
        $(elem).attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.one").attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.two").attr("src", "/images/public/star-solid.svg");
        // 네 번째, 다섯 번째 별 비활성화
        $(elem).siblings("img.star__regular.four").attr("src", "/images/public/star-regular.svg");
        $(elem).siblings("img.star__regular.five").attr("src", "/images/public/star-regular.svg");
      });
    });
  });
  // mouseenter시 네 번째 별 활성화
  $("img.star__regular.four").each((i, elem) => {
    $(elem).ready(() => {
      $(elem).on("mouseenter", () => {
        $(elem).attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.one").attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.two").attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.three").attr("src", "/images/public/star-solid.svg");
        // 다섯 번째 별 비활성화
        $(elem).siblings("img.star__regular.five").attr("src", "/images/public/star-regular.svg");
      });
    });
  });
  // mouseenter시 다섯 번째 별 활성화
  $("img.star__regular.five").each((i, elem) => {
    $(elem).ready(() => {
      $(elem).on("mouseenter", () => {
        $(elem).attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.one").attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.two").attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.three").attr("src", "/images/public/star-solid.svg");
        $(elem).siblings("img.star__regular.four").attr("src", "/images/public/star-solid.svg");
      });
    });
  });
  // mouseleave시 전체 별점 비활성화, solid된 별은 비활성화 불가
  $(".icon__stars").on("mouseleave", () => {
    $("img.star__regular").each((i, elem) => {
      if ($(elem).hasClass("solid")) {
        $(elem).attr("src", "/images/public/star-solid.svg");
      } else {
        $(elem).attr("src", "/images/public/star-regular.svg");
      }
    });
  });
};

if (homePage) {
  init();
}
