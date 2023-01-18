import $ from "jquery";

const chatPage = document.getElementById("chat__page");

const init = () => {
  $(() => {
    // $("textarea.chat__input").keyup((e) => {
    //   if (e.originalEvent.key === "Shift") {
    //     pressShift = false;
    //   }
    // });
    const chatID = $("ul.chat__items#chatBody").attr("data-chatID");
    // $("button.header__link").on("click", () => {
    //   $.ajax({
    //     url: "/api/chat-delete",
    //     type: "POST",
    //     data: { chatID },
    //     success: (result) => {
    //       if (result.msg === "success") {
    //         // do it your code.
    //         window.location.href = `/`;
    //         $("p.chat__delete-msg").addClass("active");
    //       }
    //     },
    //     error: (err) => {
    //       alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
    //     },
    //   });
    // });
  });
};

if (chatPage) {
  init();
}
