import { useState, useEffect } from "react";
import Brush from "./class/brush"
import LinesHistory from "./class/history";
import appendHistory from "./historyAppend";

export default function useMouseHandlers() {
  const [leftClick, setLeftClick] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [draw, setDraw] = useState(new Brush('brush', 'red', 10, { x: 0, y: 0 }, '/brush.png'));
  const [history, setHistory] = useState<LinesHistory>(new LinesHistory());

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
      prevDraw.color,
      prevDraw.brushSize,
      { x: e.clientX - rect.left, y: e.clientY - rect.top },
      prevDraw.toolImg
    ));
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setLastPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setLeftClick(true);
  }

  function handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    appendHistory(history, e, setHistory);
    setLeftClick(false);
  }

  return { handleMouseMove, handleMouseDown, handleMouseUp, leftClick, lastPosition, draw, setDraw, setLastPosition, history, setHistory };
}