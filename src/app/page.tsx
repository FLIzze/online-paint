"use client";

import { useEffect, useState } from "react";
import Brush from "./draw"
import Utils from "./components/utils/page";

export default function Home() {
  const width = 800;
  const height = 800;
  const [draw, setDraw] = useState(new Brush('brush', 'red', 10, { x: 0, y: 0 }));
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [leftClick, setLeftClick] = useState(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setLeftClick(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    if (leftClick) {
      console.log(draw.tool);
      
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(draw.cursorPos.x, draw.cursorPos.y);
      ctx.lineWidth = draw.brushSize;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = draw.color;

      if (draw.tool === 'brush') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = draw.color;
      } else if (draw.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)'; 
      }
      
      ctx.stroke();
      setLastPosition(draw.cursorPos);
    }
  }, [draw, leftClick]);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDraw(prevDraw => ({ ...prevDraw, cursorPos: { x: e.clientX - rect.left, y: e.clientY - rect.top } }));
  }
  
  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setLastPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setLeftClick(true);
  }

  function handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    setLeftClick(false);
  }

  function clear() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, width, height);
  }

  return (
    <div className="h-screen">
      <div className="w-full justify-center flex">
        <canvas
          className="border-2 border-black"
          id="canvas"
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}>
        </canvas>
      </div>
      <button
        className="bg-black text-white"
        onClick={clear}>
        Clear
      </button>
      <Utils data={draw} setDraw={setDraw} />
    </div>
  );
}