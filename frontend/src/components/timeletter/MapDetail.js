import React, { useEffect } from 'react';

const { kakao } = window

const MapDetail = (props) => {
  // 위경도
  const lat = props.lat
  const lng = props.lng

  useEffect(() => {
    //지도를 담을 영역의 DOM 레퍼런스
    const container = document.getElementById('map'); 

    //지도를 생성할 때 필요한 기본 옵션
    const options = { 
      center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    //지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container, options);     

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(lat, lng)
    })
  })


  return (
    <div
      id="map"
      style={{width: '100%', height: '300px', marginBottom: '20px', borderRadius:"10px"}}
    ></div>
  );
};

export default MapDetail;