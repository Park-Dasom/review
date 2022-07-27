import $ from "jquery";
import routes from "../../routes";

const merchandisePage = document.getElementById("merchandise__page");

const init = () => {
  $(() => {
    // 좋아요 버튼 post
    $("img.heart__regular").on("click", () => {
      const merchandiseID = $("img.heart__regular").parents("section.merchandise__icon").attr("data-id");
      // 좋아요 활성화
      $.ajax({
        url: "/api/check-heart",
        type: "POST",
        data: { merchandiseID },
        success: (result) => {
          const msg = result.msg;
          if (msg === "fill heart") {
            $("img.heart__regular").attr("src", "/images/public/heart-solid.svg");
          } else if (msg === "empty heart") {
            $("img.heart__regular").attr("src", "/images/public/heart-regular.svg");
          }
        },
      });
    });

    // 별점 버튼 post
    $("img.star__regular").each((i, elem) => {
      const merchandiseID = $("section.merchandise__icon").attr("data-id");
      const rate = $(elem).index() + 1;
      $(elem).on("click", () => {
        $.ajax({
          url: "/api/rating",
          type: "POST",
          data: { merchandiseID, rate },
          success: (result) => {
            const msg = result.msg;
            if (msg === "success rating") {
              $(elem).addClass("solid");
              $(elem).prevAll().addClass("solid");
            }
          },
          error: (err) => {
            alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
          },
        });
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

    // 장바구니 cartlist 로 상품 넣기
    $("button.merchandise__cartList-btn").on("click", () => {
      const merchandiseID = $(".merchandise__cartList-btn").attr("data-merchandiseID");
      alert("해당 상품을 장바구니에 넣으시겠습니까?");
      $.ajax({
        url: "/api/post-cartlist",
        type: "POST",
        data: { merchandiseID },
        success: (result) => {
          if (result.msg === "cookie sending") {
            alert("해당 상품이 장바구니에 담겼습니다.");
          }
        },
        error: (err) => {
          alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
        },
      });
    });

    // 모달 창의 특별회원 가입하기 클릭 시 해당 화면으로 이동 (현재는 홈 화면으로 지정했음)
    $("button.btn.btn-primary").on("click", () => {
      window.location.href = `${routes.home}`;
    });
  });
};

if (merchandisePage) {
  init();
}
