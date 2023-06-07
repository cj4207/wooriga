import React, { useEffect, useRef } from "react";
import "../styles/customButton.css"
import Customoverlay from "./Customoverlay";

export default function CustomButton({map, twoBtn, text, className}) {
  const { naver } = window;
  const customBtnRef = useRef(null)
  const mapTypeBtnRef = useRef([])
  const cadastralLayerBtnRef = useRef(null)
  const myLocationBtnRef = useRef(null)
  const cadastralLayer = new naver.maps.CadastralLayer();

  const zoomControl = (cmd) => {
    const currentZommLv = map.getZoom()
    const changZoomLv = cmd === 'in' ? currentZommLv + 1 : currentZommLv - 1
    map.setZoom(changZoomLv, true)
  }

  const mapTypeControl = (type) => {
    if(type !== "일반"){
      mapTypeBtnRef.current[0].classList.remove('active')
      mapTypeBtnRef.current[1].classList.add('active')
      map.setMapTypeId(naver.maps.MapTypeId.HYBRID)
    }else if(type !== "위성"){
      mapTypeBtnRef.current[1].classList.remove('active')
      mapTypeBtnRef.current[0].classList.add('active')
      map.setMapTypeId(naver.maps.MapTypeId.NORMAL)
    }
  }

  const cadastralLayerControl = () => {
    if(cadastralLayer.getMap()){
      cadastralLayerBtnRef.current.classList.remove('active')
      cadastralLayer.setMap(null)
    }else {
      cadastralLayerBtnRef.current.classList.add('active')
      cadastralLayer.setMap(map)
    }
  }

  const myLocationControl = () => {
    function success(pos) {
      const crd = pos.coords;
      console.log(crd)
      return <Customoverlay map={map} data={crd} isLocation/>
    };
    
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    navigator.geolocation.getCurrentPosition(success, error)
  }

  return (
    <div className="tool" ref={customBtnRef}>
      {twoBtn ?
        <>
          {text ? text.map((text)=>
            <button type="button" className={text === "일반" ? `${className} active` : className} onClick={()=>mapTypeControl(text)} ref={(e)=>mapTypeBtnRef.current.push(e)}>
              <div>{text}</div>
              <div>지도</div>
            </button>
          )
          :
          <>
            <button type="button" className={`${className} btn-zoom-in`} onClick={()=>zoomControl('in')}></button>
            <button type="button" className={`${className} btn-zoom-out`} onClick={zoomControl}></button>
          </>
        }
        </>
        :
        <>
          <button type="button" className={className} onClick={text === "내위치" ? myLocationControl : cadastralLayerControl} ref={text === "내위치" ? myLocationBtnRef : cadastralLayerBtnRef}>
            {text &&
              <>
                <div className="ico"></div>
                <div className="tit">{text}</div>
              </>
            }
          </button>
        </>
      }
    </div>
  )
}