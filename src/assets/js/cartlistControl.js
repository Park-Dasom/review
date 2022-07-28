import $ from "jquery";

const cartlistPage = document.getElementById("cartlist__page");

const init = () => {
  $(() => {
    // 장바구니의 상품 삭제 버튼 Click event
    $("button.checkBox__deletBtn").each((i, elem) => {
      $(elem).on("click", (e) => {
        e.preventDefault();
        const merchandiseID = $(elem).attr("data-item");
        console.log(merchandiseID);
        $.ajax({
          url: "/api/delete-cartlist",
          type: "POST",
          data: { merchandiseID },
          success: (result) => {
            if (result.msg === "cookie deleting") {
              $(elem).on("click");
              alert("해당 상품이 삭제되었습니다.");
              window.location.reload();
            }
          },
          error: (err) => {
            alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
          },
        });
      });
    });

    // 장바구니의 상품 구매 input 체크 event 시 총 금액, 총 개수 값 변경
    const totalpriceArray = [];
    let totalNumber = 0;
    $("input.checkBox__input#cartList").each((i, elem) => {
      // 구매 check box 체크 시 총 금액, 총 개수 값에 추가
      $(elem).on("change", () => {
        const merchandiseID = $(elem).parents(".checkBox__buying").siblings("button.checkBox__deletBtn").attr("data-item");
        if ($(elem).is(":checked")) {
          $.ajax({
            url: "/api//post-buyingCheck",
            type: "POST",
            data: { merchandiseID },
            success: (result) => {
              if (result.msg === "extraDiscount price") {
                const extraDiscountPrice = $(elem).parents(".cartlist__wrap ").find("span.merchandise__extraDiscountPrice-price").text();
                const extraDiscountPriceVal = Number(extraDiscountPrice);
                totalpriceArray.push(extraDiscountPriceVal);
              } else if (result.msg === "discountRate price") {
                const discountPrice = $(elem).parents(".cartlist__wrap ").find("span.merchandise__discountPrice-price").text();
                const discountPriceval = Number(discountPrice);
                totalpriceArray.push(discountPriceval);
              } else if (result.msg === "nomal price") {
                const nomalPrice = $(elem).parents(".cartlist__wrap ").find("span.merchandiese__price-price").text();
                const nomalPriceval = Number(nomalPrice);
                totalpriceArray.push(nomalPriceval);
              }
              totalNumber += 1;
              $("p.payment__totalNumber").text(`총 개수 : ${totalNumber} 개`);
              const totalPrice = totalpriceArray.reduce((a, b) => a + b);
              $(elem).parents(".cartlist__page-wrap").find(".cartlist__payment-wrap ").find("p.payment__totalPrice").text(`총 금액 : ${totalPrice} 원`);
            },
            error: (err) => {
              alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
            },
          });
          // // 구매 check box 클릭 해제 시 총 금액, 총 개수 값에서 제외
        } else {
          $.ajax({
            url: "/api//post-buyingCheck-off",
            type: "POST",
            data: { merchandiseID },
            success: (result) => {
              if (result.msg === "extraDiscount price") {
                const extraDiscountPrice = $(elem).parents(".cartlist__wrap ").find("span.merchandise__extraDiscountPrice-price").text();
                const extraDiscountPriceVal = -Number(extraDiscountPrice);
                totalpriceArray.push(extraDiscountPriceVal);
              } else if (result.msg === "discountRate price") {
                const discountPrice = $(elem).parents(".cartlist__wrap ").find("span.merchandise__discountPrice-price").text();
                const discountPriceval = -Number(discountPrice);
                totalpriceArray.push(discountPriceval);
              } else if (result.msg === "nomal price") {
                const nomalPrice = $(elem).parents(".cartlist__wrap ").find("span.merchandiese__price-price").text();
                const nomalPriceval = -Number(nomalPrice);
                totalpriceArray.push(nomalPriceval);
              }
              totalNumber -= 1;
              $("p.payment__totalNumber").text(`총 개수 : ${totalNumber} 개`);
              const totalPrice = totalpriceArray.reduce((a, b) => a + b);
              $(elem).parents(".cartlist__page-wrap").find(".cartlist__payment-wrap ").find("p.payment__totalPrice").text(`총 금액 : ${totalPrice} 원`);
            },
            error: (err) => {
              alert(`오류가 발생했습니다:\r\n${JSON.stringify(err)}`);
            },
          });
        }
      });
    });
  });
};
if (cartlistPage) {
  init();
}
