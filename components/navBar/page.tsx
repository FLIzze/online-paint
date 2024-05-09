import Brush from "@/app/ts/class/brush";
import ActionHistory from "@/app/ts/class/history";
import { Dispatch, SetStateAction } from "react";
import Opacity from "./opacity/page";
import Undo from "./undo/page";

export default function NavBar({ setDraw, history, setHistory }: { setDraw: Dispatch<SetStateAction<Brush>>, history: ActionHistory, setHistory: React.Dispatch<React.SetStateAction<ActionHistory>> }) {
    return (
        <div className="w-full flex border-black border-b flex-wrap gap-5 pl-8 bg-white h-10 text-sm items-center">
            <Undo history={history} setHistory={setHistory}/>
            <Opacity setDraw={setDraw}/>
        </div>
    )
}