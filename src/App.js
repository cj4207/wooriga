import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Customoverlay from "./components/Customoverlay";
import "./App.css"

function App() {
  const mapElement = useRef();
  const [data, setData] = useState(null)
  const [naverMap, setNaverMap] = useState(null)

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const mapPosition = new naver.maps.LatLng(37.3849483, 127.1229117);
    const map = new naver.maps.Map(mapElement.current, {
      center: mapPosition,
      zoom: 8
    });
    setNaverMap(map)
    const ne = map.getBounds()._ne
    const sw = map.getBounds()._sw
    axios.post("https://dev-api.wooriga.kr/api/web/bizZone/list/district",{
        level: 1,
        neLat: ne._lat,
        neLng: ne._lng,
        swLat: sw._lat,
        swLng: sw._lng
      })
      .then((res)=>{
        setData(res.data)
      })
  }, []);

  return <>
    <div ref={mapElement} style={{ minHeight: "1080px" }} />;
    {data &&
      data.map((districtData)=>
        <Customoverlay map={naverMap} data={districtData} />
      )
    }
  </>
}

export default App;
