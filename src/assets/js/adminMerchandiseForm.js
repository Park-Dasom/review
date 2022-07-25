import $ from "jquery";

const adminMerchandiseForm = document.getElementById("admin__merchandiseForm-page");

const init = () => {
  $(() => {
    $("#thumbnail1").on("input", (event) => {
      event.preventDefault();
      const data = new FormData();
      data.append("thumbnail1Image", event.originalEvent.dataTransfer.files);
      console.log(data);
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
