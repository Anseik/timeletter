import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const { kakao } = window

let map = null

let mapLevel = 3

const MapList = (props) => {

  const history = useHistory()


  // *********** 왜 moveDetail이 정의되지 않았다고 나올까요??????? ****************
  const moveDetail = (id) => {
    history.push('detail/' + id)
    console.log('moveDetail')
  }

  const infowindows = []

  // 모든 인포윈도우 닫는 함수
  const closeInfoWindow = () => {
    for(let i = 0; i < infowindows.length; i++) {
      infowindows[i].close()
    }
  }

  // 인포윈도우 여는 함수 
  const openInfoWindow = (map, marker, infowindow) => {
    return function() {
      closeInfoWindow()
      infowindow.open(map, marker);
    };
  }

  useEffect(() => {
    //지도를 담을 영역의 DOM 레퍼런스
    const container = document.getElementById('map'); 

    //지도를 생성할 때 필요한 기본 옵션
    const options = { 
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: mapLevel //지도의 레벨(확대, 축소 정도)
    };

    //지도 생성 및 객체 리턴
    map = new kakao.maps.Map(container, options); 

    // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
    const positions = []

    props.letters.map((letter) => {
      positions.push({
        id: letter.letterId,
        title: letter.title,
        content: '<div>' + letter.title + '</div>',
        latlng: new kakao.maps.LatLng(letter.latitude, letter.longitude)
      })
    })

    for (let i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      console.log('마커생성')
      const marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng
      })

      // 마커에 표시할 인포윈도우를 생성합니다 
      // const infowindow = new kakao.maps.InfoWindow({
      //   // content: '<div id="info">' + positions[i].content + '</div>' // 인포윈도우에 표시할 내용
      //   content: '<a href="/letter/detail/' + positions[i].id + '">' + positions[i].content + '</a>' // 인포윈도우에 표시할 내용
      // });

      // window.onload = function() {
      //   // document.getElementById("info").addEventListener("click", history.push('detail/' + positions[i].id))
      //   document.getElementById("info").addEventListener("click", moveDetail(positions[i].id))
      // }

      // kakao.maps.event.addListener(infowindow, 'click', moveDetail(positions[i].id))

      // infowindows.push(infowindow)

      // console.log(infowindow)

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다 
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      // kakao.maps.event.addListener(marker, 'click', openInfoWindow(map, marker, infowindow));
      // kakao.maps.event.addListener(marker, 'click', function() {
      //   history.push('detail/' + positions[i].id)
      // })
      // kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
      
      // 커스텀 오버레이에 표시할 컨텐츠 입니다
      const content = positions[i].title
      console.log(content)
      
      // 마커 위에 커스텀오버레이를 표시합니다
      // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition()       
      });

      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, 'click', function() {
        console.log('marker click')
        history.push('detail/' + positions[i].id)
      });

      // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
      // function closeOverlay() {
      //   overlay.setMap(null);     
      // }
    }
  }, [])

  // useEffect(() => {
  //   const level = map.getLevel()
  //   console.log(level)
  //   setMapLevel(level)
  //   console.log(mapLevel)
  // }, [mapLevel])

  return (
    <div
      id="map"
      style={{width: '100%', height: '300px', marginBottom: '20px'}}
    ></div>
  );
};

export default MapList;