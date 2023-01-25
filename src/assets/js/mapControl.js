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
    // 마커가 찍힐 장소 위도, 경도 array
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

    // 마커 아이콘 기본 셋팅
    const newIcon = {
      url: "/images/public/star-solid.svg",
      size: new google.maps.Size(20, 20),
      scaledSize: new google.maps.Size(20, 20),
    };

    // 마커 클릭 시 아이콘 resize
    const clickedIcon = {
      url: "/images/public/star-solid.svg",
      size: new google.maps.Size(40, 40),
      scaledSize: new google.maps.Size(40, 40),
    };

    // 구글 맵 초기 설정
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: locations[0],
    });
    const infoWindow = new google.maps.InfoWindow({
      content: "",
    });

    const labels = ["경복궁", "창경궁", "덕수궁", "남산타워", "DDP", "정릉", "현충원", "반포 한강공원", "예술의 전당", "코드스페이스", "마음의 고향", "곤지암 리조트"];

    // Add some markers to the map.
    const markers = locations.map((position, i) => {
      const label = labels[i % labels.length];
      const marker = new google.maps.Marker({
        position,
        icon: newIcon,
      });

      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", (e) => {
        infoWindow.setContent(label);
        infoWindow.open(map, marker);
        const clickedLabelNumber = labels.indexOf(label);
        // 마커 클릭 시 해당 사진으로 스와이핑, scale 2배
        // 해당 마커를 지도의 중심으로 이동
        $("span.swiper-pagination-bullet").each((index, elem) => {
          markers[index].setIcon(newIcon);
          map.setCenter(marker.getPosition());
          if (index === clickedLabelNumber) {
            $(elem).trigger("click");
            markers[index].setIcon(clickedIcon);
          }
        });
      });
      return marker;
    });

    const markerCluster = new MarkerClusterer({ map, markers });

    // 스와이트 전/후 버튼 클릭 시 해당 마커로 이동
    $(".swiper-button-prev, .swiper-button-next").on("click", () => {
      $("span.swiper-pagination-bullet").each((i, elem) => {
        if ($(elem).hasClass("swiper-pagination-bullet-active")) {
          // 클릭 이벤트 강제 발생
          new google.maps.event.trigger(markers[i], "click");
        }
      });
    });
  });
};

if (mapPage) {
  init();
}
