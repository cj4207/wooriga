import React, { useEffect, useRef } from "react";

class CustomOverlay {
  constructor(map, position) {
    const { naver } = window;

    this.overlay = new naver.maps.OverlayView();
    this.overlay.onAdd = this.onAdd;
    this.overlay.draw = this.draw;
    this.overlay.onRemove = this.onRemove;

    this.element = document.createElement("div");
    this.element.style =
      "position:absolute;left:0;top:0;width:120px;height:30px;line-height:30px;text-align:center;background-color:#fff;border:2px solid #f00;";
    this.element.innerHTML = "커스텀오버레이";

    this.setPosition(position);
    this.setMap(map || null);
  }

  onAdd = () => {
    var overlayLayer = this.overlay.getPanes().overlayLayer;
    overlayLayer.appendChild(this.element);
  };

  draw = () => {
    if (!this.overlay.getMap()) {
      return;
    }

    var projection = this.overlay.getProjection(),
      position = this.getPosition();

    var pixelPosition = projection.fromCoordToOffset(position);

    this.element.style.left = `${pixelPosition.x}px`;
    this.element.style.top = `${pixelPosition.y}px`;
  };

  onRemove = () => {
    this.element.remove();
  };

  setPosition = (position) => {
    this._position = position;
    this.draw();
  };

  getPosition = () => {
    return this._position;
  };

  setMap = (map) => {
    this.overlay.setMap(map);
  };
}

function App() {
  const mapElement = useRef();
  const overlay = useRef();

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const mapPosition = new naver.maps.LatLng(37.3849483, 127.1229117);
    const map = new naver.maps.Map(mapElement.current, {
      center: mapPosition,
      zoom: 19,
    });

    overlay.current = new CustomOverlay(map, mapPosition);

    naver.maps.Event.addListener(map, "click", function (e) {
      overlay.current.setPosition(e.coord);
    });
  }, []);

  return <div ref={mapElement} style={{ minHeight: "400px" }} />;
}

export default App;
