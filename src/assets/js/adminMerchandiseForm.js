import $ from "jquery";

const adminMerchandiseForm = document.getElementById("admin__merchandiseForm-page");

const init = () => {
  $(() => {
    $("#thumbnail1").on("change", (e) => {
      // e.preventDefault();
      const data = new FormData();
      data.append("thumbnail1Image", e.originalEvent.dataTransfer.files[0]);
      // console.log(data);
      $.ajax({
        url: `/api/admin-post-thumbnail-preview`,
        enctype: "multipart/form-data",
        type: "POST",
        data,
        processData: false,
        contentType: false,
      });
      console.log(data);
    });
  });
};
if (adminMerchandiseForm) {
  init();
}
