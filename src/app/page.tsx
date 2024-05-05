"use client";

import { useEffect } from "react";
import Utils from "../../components/utils/page";
import useMouseHandlers from "./ts/mouseMoveEvents";
import pixelsDraw from "./ts/draw/drawPixels";

export default function Home() {
  const width = 800;
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
          className="border border-black"
          id="canvas"
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={(e) => handleMouseUp(e)}>
        </canvas>
      </div>
      <Utils data={draw} setDraw={setDraw} history={history} setHistory={setHistory} draw={draw} lastPosition={lastPosition} setLastPosition={setLastPosition}/>
    </div>
  );
}