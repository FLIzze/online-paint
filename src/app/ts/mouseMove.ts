import { useState, useEffect } from "react";
import Brush from "./class/brush"
import LinesHistory from "./class/history";

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
    setDraw(prevDraw => ({ ...prevDraw, cursorPos: { x: e.clientX - rect.left, y: e.clientY - rect.top } }));
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setLastPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setLeftClick(true);
  }

  function handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && y >= 0 && x <= canvas.width && y <= canvas.height) {
      history.append(
        {
          tool: 'new line',
          color: 'new line',
          brushSize: 0,
          from: { x: 0, y: 0 },
          to: { x: 0, y: 0 }
        }
      );
      history.addLine();
      setHistory(history);
    }

    setLeftClick(false);
  }

  return { handleMouseMove, handleMouseDown, handleMouseUp, leftClick, lastPosition, draw, setDraw, setLastPosition, history, setHistory };
}