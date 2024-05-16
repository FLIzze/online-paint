import undo from "@/app/ts/historyManagement/undo"
import redo from "@/app/ts/historyManagement/redo"
import ActionHistory from "@/app/ts/class/history"
import Image from "next/image"

interface UndoProps {
    history: ActionHistory;
    setHistory: React.Dispatch<React.SetStateAction<ActionHistory>>;
}

export default function Undo({ history, setHistory }: Readonly<UndoProps>) {
    return (
        <div className="h-full items-center flex">
            {history.undoStack.length > 0 ? (
                <div>
                    <button
                        onClick={() => undo(history, setHistory)}>
                        <Image
                            src="/undo.png"
                            alt="undo"
                            className="mr-4"
                            height={24}
                            width={24}
                        />
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => undo(history, setHistory)}>
                        <Image
                            src="/undo.png"
                            alt="undo"
                            className="mr-4 grayscale"
                            height={24}
                            width={24}
                        />
                    </button>
                </div>
            )}

            {history.redoStack.length > 0 ? (
                <div>
                    <button
                        onClick={() => redo(history, setHistory)}>
                        <Image
                            src="/redo.png"
                            alt="redo"
                            className="mr-4"
                            height={24}
                            width={24}
                        />
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => redo(history, setHistory)}>
                        <Image
                            src="/redo.png"
                            alt="redo"
                            className="mr-4 grayscale"
                            height={24}
                            width={24}
                        />
                    </button>
                </div>
            )}
        </div>
    )
}