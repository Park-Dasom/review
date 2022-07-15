import $ from "jquery";
import routes from "../../routes";

const homePage = document.getElementById("home__page");

const init = () => {
  $(() => {
    // 추천 버튼 post
    $("img.heart__regular").each((i, elem) => {
      $(elem).on("click", () => {
        const merchandiseID = $(elem).parents(".marchandise__icon").attr("data-id");
        $.ajax({
          url: "/api/check-heart",
          type: "POST",
          data: { merchandiseID },
          success: (result) => {
            const msg = result.msg;
            if (msg === "not login") {
              alert(`로그인이 필요한 영역입니다.`);
              window.location.href = `${routes.user}${routes.login}`;
            } else if (msg === "fill heart") {
              // 좋아요 활성화
              $(elem).attr("src", "/images/public/heart-solid.svg");
            } else if (msg === "empty heart") {
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
    $(".marchandise__wrap").each((i, elem) => {
      $(elem)
        .find("img.star__regular")
        .each((i2, elem2) => {
          $(elem2).on("click", function () {
            const merchandiseID = $(this).parents(".marchandise__icon").attr("data-id");
            const rate = $(this).index() + 1;
            $.ajax({
              url: "/api/rating",
              type: "POST",
              data: { merchandiseID, rate },
              success: (result) => {
                const msg = result.msg;
                if (msg === "not login") {
                  alert("로그인이 필요한 영역입니다.");
                  window.location.href = `${routes.user}${routes.login}`;
                } else if (msg === "success rating") {
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

    //
    // if ($(location).attr("href").includes("createdAt")) {
    //   $("li.sorting__item").each((i, elem) => {
    //     const a = $(elem).find("a");
    //   });
    // }
  });
};

if (homePage) {
  init();
}
