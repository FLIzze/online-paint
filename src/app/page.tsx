"use client";

import { useEffect } from "react";
import Utils from "./components/utils/page";
import useMouseHandlers from "./ts/mouseMove";
import drawOnCanvas from "./ts/drawing";
import shortcuts from "./ts/shortcurts";

export default function Home() {
  const width = 800;
  const height = 800;
  const { handleMouseMove, handleMouseDown, handleMouseUp, leftClick, lastPosition, draw, setDraw, setLastPosition } = useMouseHandlers();

  useEffect(() => {
    if (leftClick) {
      drawOnCanvas(draw, lastPosition, setLastPosition);
    }
  }, [draw, leftClick, lastPosition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcuts(e, setDraw);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setDraw]);

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
          onMouseUp={handleMouseUp}>
        </canvas>
      </div>
      <Utils data={draw} setDraw={setDraw} />
    </div>
  );
}