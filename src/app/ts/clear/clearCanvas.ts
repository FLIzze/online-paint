import clearHistory from "./clearHistory";
import ActionHistory from "../class/history";

export default function clearCanvas() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
}