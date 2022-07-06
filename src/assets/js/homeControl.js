import $ from "jquery";

const homePage = document.getElementById("home__page");

const init = () => {
  $(() => {
    // 코드 작성
    $("img.heart__regular").each((i, elem) => {
      $(elem).on("click", () => {
        const choiceID = $(elem).parents(".marchandise__icon").attr("data-id");
        let status
        // 비활성화 === 좋아요 전
if(!$(elem).hasClass("clicked")){
  status = "unlike"
  $.ajax({
    url: "/api/check-heart",
    type: "POST",
    data: { choiceID, status },
    success: (result) => {
      $(elem).attr("src", "/images/public/heart-solid.svg");
      $(elem).addClass("clicked");
      console.log("hi");
    },
    error: (err) => {
      alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
    }
  });
}else{
status = "like"
}
        // 활성화 === 좋아요인 상태
        
       
      });
    });

    $(".star__regular").each((i, elem) => {
      $(elem).on("click", () => {
        const ratingItem = $(this).val();
        $.ajax({
          url: "/api/rating",
          type: "POST",
          data: { ratingItem },
          success: (result) => {
            if (result.status === "success") {
              // do it your code.
              $(this).attr("src", "/images/public/star-solid.svg");
              $(this).addClass("solid");
              $(this).prevAll().addClass("solid");
              $(this).prevAll().attr("src", "/images/public/star-solid.svg");
              $(this).nextAll().removeClass("solid");
              $(this).nextAll().attr("src", "/images/public/star-regular.svg");
            }
          },
          error: (err) => {
            alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
          },
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
