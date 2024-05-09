import Brush from "../class/brush";
import { Dispatch, SetStateAction } from "react";
import ActionHistory from "../class/history";

export default interface UtilsInterface {
    setDraw: Dispatch<SetStateAction<Brush>>; 
    history: ActionHistory;
    setHistory: Dispatch<SetStateAction<ActionHistory>>;
    name: string;
}