import { useState, useEffect } from "react";
import Brush from "./class/brush"
import ActionHistory from "./class/history";
import historyAddNewActionBreak from "./historyManagement/historyAddNewActionBreak";

export default function useMouseHandlers(zoom: number) {
  const [leftClick, setLeftClick] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [draw, setDraw] = useState(new Brush('brush', false, 'red', 5, { x: 0, y: 0 }, '/brush.png', 1));
  const [history, setHistory] = useState<ActionHistory>(new ActionHistory([], [], [], 0));

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setLeftClick(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDraw(prevDraw => new Brush(
      prevDraw.tool,
      prevDraw.eraser,
      prevDraw.color,
      prevDraw.brushSize,
      { x: e.clientX - rect.left, y: e.clientY - rect.top },
      prevDraw.toolImg,
      prevDraw.opacity
    ));
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (e.button != 0) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    console.log(zoom);

    setLastPosition({ x: (e.clientX - rect.left) / zoom, y: (e.clientY - rect.top) / zoom });
    setLeftClick(true);
  }

  function handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    if (e.button != 0) return;
    if (e.target == document.getElementById('canvas')) {
      historyAddNewActionBreak(history, setHistory);
      setLeftClick(false);
    }
  }

  return { handleMouseMove, handleMouseDown, handleMouseUp, leftClick, lastPosition, draw, setDraw, setLastPosition, history, setHistory };
}