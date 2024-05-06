"use client";

import { useEffect } from "react";
import useMouseHandlers from "./ts/mouseMoveEvents";
import pixelsDraw from "./ts/draw/drawPixels";
import SideNavBar from "../../components/sideNavbar/page";

export default function Home() {
  const width = 1200;
  const height = 800;

  const { handleMouseMove, handleMouseDown, handleMouseUp, leftClick, lastPosition, draw, setDraw, setLastPosition, history, setHistory } = useMouseHandlers();

  useEffect(() => {
    if (leftClick) {
      pixelsDraw(draw, lastPosition, setLastPosition, history, setHistory);
    }
  }, [draw, leftClick, lastPosition]);

  return (
    <div className="h-screen">
      <div
        className="w-full justify-center flex h-full items-center"
        style={{ cursor: `url(${draw.toolImg}) 0 32, auto` }}
      >
        <canvas
          className="border border-black bg-white shadow-lg"
          id="canvas"
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={(e) => handleMouseUp(e)}>
        </canvas>
      </div>
      <SideNavBar data={draw} setDraw={setDraw} history={history} setHistory={setHistory}/>
    </div>
  );
}