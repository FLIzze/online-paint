import undo from "@/app/ts/historyManagement/undo"
import redo from "@/app/ts/historyManagement/redo"
import ActionHistory from "@/app/ts/class/history"
import Image from "next/image"

interface UndoProps {
    history: ActionHistory;
    setHistory: React.Dispatch<React.SetStateAction<ActionHistory>>;
    zoom: number;
}

export default function Undo({ history, setHistory, zoom }: Readonly<UndoProps>) {
    return (
        <div className="h-full items-center flex">
            {history.undoStack.length > 0 ? (
                <button
                    onClick={() => undo(history, setHistory, zoom)}>
                    <Image
                        src="/undo.png"
                        alt="undo"
                        className="mr-4"
                        height={24}
                        width={24}
                    />
                </button>
            ) : (
                <button
                    onClick={() => undo(history, setHistory, zoom)}>
                    <Image
                        src="/undo.png"
                        alt="undo"
                        className="mr-4 grayscale"
                        height={24}
                        width={24}
                    />
                </button>
            )}

            {history.redoStack.length > 0 ? (
                <button
                    onClick={() => redo(history, setHistory, zoom)}>
                    <Image
                        src="/redo.png"
                        alt="redo"
                        className="mr-4"
                        height={24}
                        width={24}
                    />
                </button>
            ) : (
                <button
                    onClick={() => redo(history, setHistory, zoom)}>
                    <Image
                        src="/redo.png"
                        alt="redo"
                        className="mr-4 grayscale"
                        height={24}
                        width={24}
                    />
                </button>
            )}
        </div>
    )
}