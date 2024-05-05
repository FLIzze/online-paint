import LinesHistory from "./class/history";

export default function appendHistory(history: LinesHistory, setHistory: React.Dispatch<React.SetStateAction<LinesHistory>>) {
  history.append({
    tool: 'new line',
    color: 'new line',
    brushSize: 0,
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 }
  });

  setHistory(prevHistory => new LinesHistory(
    prevHistory.undoStack,
    prevHistory.redoStack,
    prevHistory.nmbPixelsInLineUndo,
    prevHistory.getCount() + 1
  ));
}
