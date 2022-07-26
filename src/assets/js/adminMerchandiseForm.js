import $ from "jquery";

const adminMerchandiseForm = document.getElementById("admin__merchandiseForm-page");

const init = () => {
  $(() => {
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
  });
};
if (adminMerchandiseForm) {
  init();
}
