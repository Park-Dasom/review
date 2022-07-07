import $ from "jquery";

const homePage = document.getElementById("home__page");

const init = () => {
  $(() => {
    // 코드 작성
    // 로그인 
    // 추천 버튼 post
    $("img.heart__regular").each((i, elem) => {
      $(elem).on("click", () => {
        const choiceID = $(elem).parents(".marchandise__icon").attr("data-id");
        $.ajax({
          url: "/api/check-heart",
          type: "POST",
          data: { choiceID },
          success: (result) => {
            const msg = result.msg;
            if (msg === "fill heart") {
              // 좋아요 활성화
              $(elem).attr("src", "/images/public/heart-solid.svg");
            } else {
              // 좋아요 취소
              $(elem).attr("src", "/images/public/heart-regular.svg");
            }
          },
          error: (err) => {
            alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
          },
        });
      });
    });
    // 벌점 버튼 post
    $("li.list__merchandise").each((i, elem) => {
      $(elem).find("img.star__regular").each((i2, elem2) => {
        $(elem2).on("click", function () {
          const choiceID = $(this).parents(".marchandise__icon").attr("data-id");
          const rate = $(this).index()+1;
          console.log(choiceID, rate);
          $.ajax({
            url: "/api/rating",
            type: "POST",
            data: { choiceID, rate },
            success: (result) => {
              const msg = result.msg;
              if (msg === "success rating") {
                // do it your code.
                $(this).addClass("solid");
                $(this).prevAll().addClass("solid");
              }
            },
            error: (err) => {
              alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
            },
          });
        });
      });
    });

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

    // click시 별 활성화, 그 외의 별 비활성화
    $(".star__regular").each((i, elem) => {
      $(elem).on("click", function () {
        $(this).attr("src", "/images/public/star-solid.svg");
        $(this).addClass("solid");
        $(this).prevAll().addClass("solid");
        $(this).prevAll().attr("src", "/images/public/star-solid.svg");
        $(this).nextAll().removeClass("solid");
        $(this).nextAll().attr("src", "/images/public/star-regular.svg");
      });
      // mouseenter시 별 활성화
      $(".star__regular").on("mouseenter", function () {
        $(this).attr("src", "/images/public/star-solid.svg");
        $(this).prevAll().attr("src", "/images/public/star-solid.svg");
        $(this).nextAll().attr("src", "/images/public/star-regular.svg");
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
  });
};

if (homePage) {
  init();
}
