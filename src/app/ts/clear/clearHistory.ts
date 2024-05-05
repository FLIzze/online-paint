import ActionHistory from "../class/history";

export default function clearHistory(setHistory: React.Dispatch<React.SetStateAction<ActionHistory>>) {
    setHistory(new ActionHistory (
        [],
        [],
        [],
        0
    ));
}