import ActionHistory from "@/app/ts/class/history";
import redo from "@/app/ts/historyManagement/redo";
import undo from "@/app/ts/historyManagement/undo";

export default function NavBar({ history, setHistory }: { history: ActionHistory, setHistory: React.Dispatch<React.SetStateAction<ActionHistory>> }) {
    return (
        <div className="w-full flex bg-black text-white flex-wrap gap-9 pl-8">
                <button
                    onClick={() => undo(history, setHistory)}>
                    Undo
                </button>
                <button
                    onClick={() => redo(history, setHistory)}>
                    Redo
                </button>
        </div>
    )
}