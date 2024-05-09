import undo from "@/app/ts/historyManagement/undo"
import redo from "@/app/ts/historyManagement/redo"
import ActionHistory from "@/app/ts/class/history"

export default function Undo({ history, setHistory }: { history: ActionHistory, setHistory: React.Dispatch<React.SetStateAction<ActionHistory>> }) {
    return (
        <div className="h-full items-center flex">
            <button
                onClick={() => undo(history, setHistory)}>
                <img
                    src="/undo.png"
                    alt="undo"
                    className="w-4 h-4 mr-4"
                />
            </button>
            <button
                onClick={() => redo(history, setHistory)}>
                <img
                    src="/redo.png"
                    alt="redo"
                    className="w-4 h-4"
                />
            </button>
        </div>
    )
}