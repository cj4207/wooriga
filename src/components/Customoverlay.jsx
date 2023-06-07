import React, { useRef, useEffect } from "react";
import "../styles/customoverlay.css"

export default function Customoverlay({map, data}) {
  const overlayRef = useRef(null);
  const elementRef = useRef(null);

  console.log(map, data,'sssss')
  useEffect(() => {
    const { naver } = window;
    const mapPosition = new naver.maps.LatLng(data.latitude, data.longitude);

    const overlay = new naver.maps.OverlayView();
    overlay.onAdd = onAdd;
    overlay.draw = draw;
    overlay.onRemove = onRemove;

    overlayRef.current = overlay;

    setPosition(mapPosition);
    setMap(map || null);

    return () => {
      overlay.setMap(null);
    };
  }, [map, data]);

  const onAdd = () => {
    const overlayLayer = overlayRef.current.getPanes().overlayLayer;
    overlayLayer.appendChild(elementRef.current);
  };

  const draw = () => {
    if (!overlayRef.current.getMap()) {
      return;
    }

    const projection = overlayRef.current.getProjection();
    const position = getPosition();

    const pixelPosition = projection.fromCoordToOffset(position);

    elementRef.current.style.left = `${pixelPosition.x}px`;
    elementRef.current.style.top = `${pixelPosition.y}px`;
  };

  const onRemove = () => {
    elementRef.current.remove();
  };

  const setPosition = (position) => {
    overlayRef.current._position = position;
    draw();
  };

  const getPosition = () => {
    return overlayRef.current._position;
  };

  const setMap = (map) => {
    overlayRef.current.setMap(map);
  };

  return (
    <div ref={elementRef} className="marker">
      <div className="title">
        {data.districtNm}
      </div>
      <div className="content">
        <ul className="content_list">
          {data.allCnt !== 0 && <li className="list_item">{`전체 ${data.allCnt}`}</li>}
          {data.reDevelopmentCnt !== 0 && <li className="list_item">{`재개발 ${data.reDevelopmentCnt}`}</li>}
          {data.reConstructionCnt !== 0 && <li className="list_item">{`재건축 ${data.reConstructionCnt}`}</li>}
          {data.maintenanceSmallCnt !== 0 && <li className="list_item">{`가로주택 ${data.maintenanceSmallCnt}`}</li>}
        </ul>
      </div>
    </div>)
}