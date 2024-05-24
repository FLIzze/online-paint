"use client";

import { useEffect, useState } from "react";
import useMouseHandlers from "./ts/mouseEvents";
import pixelsDraw from "./ts/draw/drawPixels";
import NavBar from "../../components/navBar/page";
import Utils from "../../components/utils/page";
import Colors from "../../components/colors/page";
import handleWheel from "./ts/utils/zoom";
import Draggable from "../../components/draggable/page";

export default function Home() {
  const size = { x: 800, y: 800 };
  const [zoom, setZoom] = useState(1);
  const { handleMouseMove, handleMouseDown, handleMouseUp, leftClick, lastPosition, draw, setDraw, setLastPosition, history, setHistory } = useMouseHandlers(zoom);

  useEffect(() => {
    window.addEventListener('wheel', (e) => handleWheel(e, zoom, setZoom));

    return () => {
      window.removeEventListener('wheel', (e) => handleWheel(e, zoom, setZoom));
    };

  }, [zoom]);

  useEffect(() => {
    if (leftClick) {
      pixelsDraw(draw, lastPosition, setLastPosition, history, setHistory, zoom);
    }
  }, [draw]);

  return (
    <div
      className="h-screen overflow-hidden bg-[#808080]"
      style={{ cursor: `url(${draw.toolImg}) 0 32, auto` }}
    >
      <Draggable name="None" posX={1920/2-(size.x/2)} posY={1080/2-(size.y/2)}>
        <canvas
          className="border border-black bg-white shadow-lg z-0"
          id="canvas"
          width={size.x}
          height={size.y}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={(e) => handleMouseUp(e)}
          style={{ cursor: `url(${draw.toolImg}) 0 32, auto`, transform: `scale(${zoom})` }}

        />
      </Draggable>

      <Utils setDraw={setDraw} history={history} />
      <Colors setDraw={setDraw} />
      <NavBar setDraw={setDraw} draw={draw} history={history} setHistory={setHistory} zoom={zoom} />
    </div>
  );
}