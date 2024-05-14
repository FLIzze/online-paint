"use client";

import { useEffect } from "react";
import useMouseHandlers from "./ts/mouseMoveEvents";
import pixelsDraw from "./ts/draw/drawPixels";
import NavBar from "../../components/navBar/page";
import Utils from "../../components/utils/page";
import Colors from "../../components/colors/page";

export default function Home() {
  const width = 600;
  const height = 600;

  const { handleMouseMove, handleMouseDown, handleMouseUp, leftClick, lastPosition, draw, setDraw, setLastPosition, history, setHistory } = useMouseHandlers();

  useEffect(() => {
    if (leftClick) {
      pixelsDraw(draw, lastPosition, setLastPosition, history, setHistory);
    }
  }, [draw, leftClick, lastPosition]);

  return (
    <div className="h-screen overflow-hidden">
      <NavBar setDraw={setDraw} draw={draw} history={history} setHistory={setHistory}/>
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
      <Utils draw={draw} setDraw={setDraw} setHistory={setHistory} history={history} name="Tools" />
      <Colors setDraw={setDraw} />
    </div>
  );
}