import $ from "jquery";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const mapPage = document.getElementById("map__page");

const init = () => {
  $(() => {
    // swiper 영역
    // 홈 화면 국기 사진 Swiper
    const mapSiteSwiper = new Swiper(".swiper", {
      spaceBetween: 30,
      loop: true,
      autoHeight: true,
      slideToClickedSlide: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    // 구글 맵 영역
    const locations = [
      { lat: 37.57983067651972, lng: 126.97705471430477 },
      { lat: 37.58042912198211, lng: 126.99497882522293 },
      { lat: 37.56640142863811, lng: 126.97609124540196 },
      { lat: 37.55253543301184, lng: 126.987683216992 },
      { lat: 37.567776206460834, lng: 127.00948421170528 },
      { lat: 37.60263612006517, lng: 127.00573732078404 },
      { lat: 37.49883471563753, lng: 126.97212743329486 },
      { lat: 37.511362961845634, lng: 126.995853686761 },
      { lat: 37.48019094714025, lng: 127.01081952912442 },
      { lat: 37.483454381221264, lng: 127.12314354768957 },
      { lat: 37.33979437432622, lng: 127.27449552137861 },
      { lat: 37.351211375553326, lng: 127.33847529934772 },
    ];

    const kyoungbokgong = { lat: 37.57983067651972, lng: 126.97705471430477 };
    // The map, centered at kyoungbokgong
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: locations[0],
    });
    // const marker = new google.maps.Marker({
    //   position: kyoungbokgong,
    //   map: map,
    // });
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    const labels = ["경복궁", "창경궁", "덕수궁", "남산타워", "DDP", "정릉", "현충원", "반포 한강공원", "예술의 전당", "코드스페이스", "마음의 고향", "곤지암 리조트"];
    // Add some markers to the map.
    const markers = locations.map((position, i) => {
      const label = labels[i % labels.length];
      const marker = new google.maps.Marker({
        position,
        // label,
      });

      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(label);
        infoWindow.open(map, marker);
        console.log();

        const clickedLabelNumber = labels.indexOf(label);
        // 마커 클릭 시 해당 사진으로 스와이핑
        $("span.swiper-pagination-bullet").each((index, elem) => {
          if (index === clickedLabelNumber) {
            $(elem).trigger("click");
          }
        });
      });
      return marker;
    });

    const markerCluster = new MarkerClusterer({ map, markers });

    // 스와이트 전/후 버튼 클릭 시 해당 마커로 이동
    $(".swiper-button-prev, .swiper-button-next").on("click", () => {
      console.log("hi");
      $("span.swiper-pagination-bullet").each((i, elem) => {
        if ($(elem).hasClass("swiper-pagination-bullet-active")) {
          console.log(i);
          console.log(markers[0]);
        }
      });
    });
  });
};

if (mapPage) {
  init();
}
