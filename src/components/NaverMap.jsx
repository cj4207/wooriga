import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Customoverlay from "./Customoverlay";
import "../styles/naverMap.css"
import CustomButton from "./CustomButton";

function NaverMap() {
  const mapElement = useRef();
  const [data, setData] = useState(null)
  const [naverMap, setNaverMap] = useState(null)
  const [locationData, setLocationData] = useState({isOpen:false})

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const mapPosition = new naver.maps.LatLng(37.3849483, 127.1229117);
    const map = new naver.maps.Map(mapElement.current, {
      center: mapPosition,
      zoom: 8,
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

  return(
    <main>
      <section>
        <div ref={mapElement} className="map"/>
        {data &&
          <>
            {
              data.map((districtData)=>
                <Customoverlay map={naverMap} data={districtData} />
              )
            }
            {
              locationData.isOpen &&
                <Customoverlay map={naverMap} data={locationData.data} isLocation />
            }
            <div className="map-tools">
              <CustomButton map={naverMap} text={"내위치"} className={"btn-location"} setLocationData={setLocationData}/>
              <CustomButton map={naverMap} text={"지적도"} className={"btn-type"}/>
              <CustomButton map={naverMap} text={["일반", "위성"]} twoBtn className={"map-type"}/>
              <CustomButton map={naverMap} twoBtn className={"btn-zoom"}/>
            </div>
          </>
        }
      </section>
    </main>
  )
}

export default NaverMap;
