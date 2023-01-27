import $ from "jquery";
import Quill from "quill";
import { ImageResize } from "quill-image-resize";

const adminMerchandiseForm = document.getElementById("admin__merchandiseForm-page");

const init = () => {
  $(() => {
    // 페이지 로드 시 quill editor 값 불러오기
    const value = $("input#textEditor").val();
    $(".form-group#editor").children().first().html(value);
    // if ($("input#textEditor").val() !== "") {
    // }
    // form submit시 에디터의 내용을 input 값에 넣고 저장
    $("button#formSubmitBtn").on("click", (e) => {
      e.preventDefault();
      const value = $(".form-group#editor").children().first().html();
      $("input#textEditor").val(value);
      if ($("input#textEditor").val() !== "") {
        $("form#merchandiseForm").trigger("submit");
      }
    });

    // thumbnail1 사진 미리보기 delete 함수
    const deleteThumbnail1 = () => {
      $(".item__delete-img").on("click", () => {
        $(".item__delete-img").parents(".uploaded__thumbnail1-items").remove();
        $("input#thumbnail1").val("");
        $(".custom-file-thumbnail1").css("display", "block");
      });
    };
    // thumbnail2 사진 미리보기 delete 함수
    const deleteThumbnail2 = () => {
      $(".item__delete-img").on("click", () => {
        $(".item__delete-img").parents(".uploaded__thumbnail2-items").remove();
        $("input#thumbnail2").val("");
        $(".custom-file-thumbnail2").css("display", "block");
      });
    };

    // thumbnail1 사진 업로드 미리보기 post
    $("#thumbnail1").on("change", () => {
      // const reader = new FileReader();
      // reader.onload = function (event) {
      //   const img = document.createElement("img");
      //   img.setAttribute("src", event.target.result);
      //   img.setAttribute("class", "thumbnail1");
      //   document.querySelector("#merchandiseForm").innerHTML = " ";
      //   document.querySelector("#merchandiseForm").appendChild(img);
      // };
      // reader.readAsDataURL(e.target.files[0]);
      const data = new FormData($(`#merchandiseForm`)[0]);
      $.ajax({
        url: `/api/admin-post-thumbnail1-preview`,
        enctype: "multipart/form-data",
        type: "POST",
        data,
        processData: false,
        contentType: false,
        success: (result) => {
          const location = result.location;
          const thumbnail1HTML = `
                <div class="uploaded__thumbnail1-items">
                  <input class="item__location" type="hidden" name="thumbnailUrl1" value=${location}>
                  <div class="item__flex">
                    <img class="item__img" src=${location}>
                    <img class="item__delete-img" src="/images/admin/delete.png">
                  </div>
                </div>
              `;
          $(".form-group-thumbnail1-preview").append(thumbnail1HTML);
          $(".custom-file-thumbnail1").css("display", "none");
          deleteThumbnail1();
        },
      });
    });

    // thumbnail2 사진 업로드 미리보기 post
    $("#thumbnail2").on("change", () => {
      const data = new FormData($(`#merchandiseForm`)[0]);
      $.ajax({
        url: `/api/admin-post-thumbnail2-preview`,
        enctype: "multipart/form-data",
        type: "POST",
        data,
        processData: false,
        contentType: false,
        success: (result) => {
          const location = result.location;
          const thumbnail2HTML = `
                <div class="uploaded__thumbnail2-items">
                  <input class="item__location" type="hidden" name="thumbnailUrl2" value=${location}>
                  <div class="item__flex">
                    <img class="item__img" src=${location}>
                    <img class="item__delete-img" src="/images/admin/delete.png">
                  </div>
                </div>
              `;
          $(".form-group-thumbnail2-preview").append(thumbnail2HTML);
          $(".custom-file-thumbnail2").css("display", "none");
          deleteThumbnail2();
        },
      });
    });
    let scrollHeight;
    $("body").on("scroll", () => {
      scrollHeight = $("body").scrollTop();
      // console.log(scrollHeight);
    });

    let menuHeight;
    // console.log($(".tox-editor-header"));
    $(".tox-editor-header").on("click", () => {
      console.log("hi");
      menuHeight = $(".tox-menu.tox-collection.tox-collection--list").css("top");
      menuHeight = menuHeight.split("-")[1];
      menuHeight = Number(menuHeight.split("px")[0]);
      console.log(menuHeight);
    });
    // // if ($(".tox.tox-silver-sink.tox-tinymce-aux").children("div")) {
    // //   console.log("hi");
    // // }
    // // $(".tox-editor-header").on("click", () => {
    // //   console.log("hi");
    // //   let menuHeight = 0;
    // //   menuHeight = $(".tox-menu.tox-collection.tox-collection--list").css("top");
    // //   menuHeight = menuHeight.split("-")[1];
    // //   const totalHeight = Number(menuHeight.split("px")[0]);
    // //   // $(".tox-menu.tox-collection.tox-collection--list").css("top", scrollHeight);
    // //   // console.log(menuHeight, scrollHeight);
    // //   // console.log(menuHeight + scrollHeight);
    // //   const currentHeight = -(totalHeight + scrollHeight);
    // //   console.log(menuHeight);
    // //   $(".tox-menu.tox-collection.tox-collection--list").css("top", `${currentHeight}px`);
    // });
  });
};
if (adminMerchandiseForm) {
  init();
}
