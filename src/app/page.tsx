"use client";

import { useEffect, useState } from "react";
import useMouseHandlers from "./ts/mouseEvents";
import pixelsDraw from "./ts/draw/drawPixels";
import NavBar from "../../components/navBar/page";
import Utils from "../../components/utils/page";
import Colors from "../../components/colors/page";
import handleWheel from "./ts/utils/zoom";
import drawPixelsAfterZoom from "./ts/draw/drawAfterZoom";
import Draggable from "../../components/draggable/page";

export default function Home() {
  const baseSize = { baseWidht: 900, baseHeight: 800 };
  const [{ width, height }, setCanvasSize] = useState({ width: baseSize.baseWidht, height: baseSize.baseHeight });
  const [zoom, setZoom] = useState(1);
  const { handleMouseMove, handleMouseDown, handleMouseUp, leftClick, lastPosition, draw, setDraw, setLastPosition, history, setHistory } = useMouseHandlers(zoom);

  useEffect(() => {
    window.addEventListener('wheel', (e) => handleWheel(e, setCanvasSize, baseSize, zoom, setZoom));
    drawPixelsAfterZoom(history.undoStack, zoom);

    return () => {
      window.removeEventListener('wheel', (e) => handleWheel(e, setCanvasSize, baseSize, zoom, setZoom));
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
      <Draggable name="None" posX={300} posY={300}>
        <canvas
          className="border border-black bg-white shadow-lg z-0"
          id="canvas"
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={(e) => handleMouseUp(e)}
          style={{ cursor: `url(${draw.toolImg}) 0 32, auto` }}
        />
      </Draggable>
      
      <Utils setDraw={setDraw} history={history} />
      <Colors setDraw={setDraw} />
      <NavBar setDraw={setDraw} draw={draw} history={history} setHistory={setHistory} zoom={zoom} />
    </div>
  );
}