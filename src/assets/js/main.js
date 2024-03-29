import "../scss/styles.scss";

import "./headerControl";
import "./homeControl";
import "./joinControl";
import "./loginControl";
import "./merchandiseControl";
import "./cartlistControl";
import "./findPWControl";
import "./myProfileControl";
import "./navbarControl";
import "./searchControl";
import "./chatControl";
import "./mapControl";
// 관리자
import "./adminSidebarControl";
import "./adminExcelDownloadControl";
import "./adminControl";
import "./adminMerchandiseFormControl";

// ajax sample
// import $ from "jquery";
// $.ajax({
//   url: "/destination/url",
//   type: "POST",
//   data: { data },
//   success: (result) => {
//     if (result.status === "success") {
//       // do it your code.
//     }
//   },
//   error: (err) => {
//     alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
//   },
// });

// keyup 이벤트 걸 때 paste 이벤트 같이 생성 [모바일 복사/붙여넣기 이슈 때문에 사용]
// $("input").on("keyup paste", function () {
//   setTimeout(() => {
//     // 코드 작성
//     const inputVal = $(this).val();
//   }, 1);
// });
