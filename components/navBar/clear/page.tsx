import clearCanvas from "@/app/ts/clear/clearCanvas";
import clearHistory from "@/app/ts/clear/clearHistory";
import ActionHistory from "@/app/ts/class/history";

interface ClearProps {
    setHistory: React.Dispatch<React.SetStateAction<ActionHistory>>;
}

export default function Clear({ setHistory }: Readonly<ClearProps>) {
    return (
        <button
            onClick={() => {
                clearCanvas();
                clearHistory(setHistory);
            }}>
            <p>Clear</p>
        </button>
    )
}