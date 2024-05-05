export default class Brush {
  tool: string;
  color: string;
  brushSize: number;
  cursorPos: { x: number, y: number };
  toolImg: string;

  constructor(tool: string, color: string, brushSize: number, cursorPos: { x: number, y: number }, toolImg: string) {
    this.tool = tool;
    this.color = color;
    this.brushSize = brushSize;
    this.cursorPos = cursorPos;
    this.toolImg = toolImg;
  }
}
