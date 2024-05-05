import ActionHistory from "./class/history";

export default function historyAddNewActionBreak(history: ActionHistory, setHistory: React.Dispatch<React.SetStateAction<ActionHistory>>) {
  history.append({
    tool: 'new line',
    color: 'new line',
    brushSize: 0,
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 }
  });

  setHistory(prevHistory => new ActionHistory(
    [...prevHistory.undoStack],
    [...prevHistory.redoStack],
    [...prevHistory.nmbPixelsInLineUndo],
    prevHistory.actionCount + 1
  ));
}
