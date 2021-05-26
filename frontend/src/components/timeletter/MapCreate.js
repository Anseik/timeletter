import React, { useState, useEffect } from 'react';
import bgImage from 'pages/images/sky2.jpg'

const { kakao } = window

let map = null
let marker = null

const MapCreate = (props) => {
  // console.log('map-create')
  
  const [lat, setLat] = useState()
  const [lng, setLng] = useState()
  const [isCurLoc, setIsCurLoc] = useState(false)

  // 현재 위치 확인
  const getCurLoc = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
        props.onChangeLat(lat)
        props.onChangeLng(lng)
        setIsCurLoc(true)
      })
    } else {
      console.log('위치 확인 불가')
    }
  }

  // 지도 생성
  const createMap = (props) => {
    //지도를 담을 영역의 DOM 레퍼런스
    const container = document.getElementById('map'); 

    //지도를 생성할 때 필요한 기본 옵션
    const options = { 
      center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
      level: 5 //지도의 레벨(확대, 축소 정도)
    };

    //지도 생성 및 객체 리턴
    map = new kakao.maps.Map(container, options); 

    // 지도를 클릭한 위치에 표출할 마커입니다
    marker = new kakao.maps.Marker({ 
      // 지도 중심좌표에 마커를 생성합니다 
      position: map.getCenter() 
    });
  }

  // 마커 표시 및 클릭이벤트 등록
  const showMarker = () => {
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
        
      // 클릭한 위도, 경도 정보를 가져옵니다 
      let latlng = mouseEvent.latLng; 
      // console.log(latlng)
      
      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      // 위경도를 갱신
      if (isNaN(latlng.getLat()) || isNaN(latlng.getLng())) {
        setLat(0)
        setLng(0)
      } else {
        setLat(latlng.getLat())
        setLng(latlng.getLng())
      }
    })
  }

  useEffect(() => {
    getCurLoc()
    createMap()
    showMarker()
  }, [isCurLoc])

  useEffect(() => {
    showMarker()
  }, [lat])

  return (
    <div style={{width: '100%', height: '100%', backgroundImage: `url(${bgImage})`, paddingTop: '60px'}}>
      <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
        <div style={{color: 'white'}}>- 위도 : {lat}</div>
        <div style={{color: 'white'}}>- 경도 : {lng}</div>
      </div>
      
      <div
        id="map" 
        style={{width: '80%', height: '85%', marginLeft: "auto", marginRight: "auto", borderRadius:"10px"}}
        onClick={() => {
          if (isNaN(lat) || isNaN(lng)) {
            props.onChangeLat(0)
            props.onChangeLng(0)
          } else {
            props.onChangeLat(lat)
            props.onChangeLng(lng)
          }
        }}
      ></div>
    </div>
  );
};

export default MapCreate;