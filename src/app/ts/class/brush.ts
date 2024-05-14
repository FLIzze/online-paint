export default class Brush {
  tool: string;
  eraser: boolean;
  color: string;
  brushSize: number;
  cursorPos: { x: number, y: number };
  toolImg: string;
  opacity: number;

  constructor(tool: string, eraser: boolean, color: string, brushSize: number, cursorPos: { x: number, y: number }, toolImg: string, opacity: number) {
    this.tool = tool;
    this.eraser = eraser;
    this.color = color;
    this.brushSize = brushSize;
    this.cursorPos = cursorPos;
    this.toolImg = toolImg;
    this.opacity = opacity
  }
}
