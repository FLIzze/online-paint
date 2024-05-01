import LinesHistory from "./class/history";

export default function appendHistory(history: LinesHistory, e: React.MouseEvent<HTMLCanvasElement>, setHistory: React.Dispatch<React.SetStateAction<LinesHistory>>) {
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
}
