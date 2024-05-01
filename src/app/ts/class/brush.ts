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

  setTool(tool: string) {
    this.tool = tool;
  }

  setColor(color: string) {
    this.color = color;
  }

  setBrushSize(brushSize: number) {
    this.brushSize = brushSize;
  }

  setCursorPos(cursorPos: { x: number, y: number }) {
    this.cursorPos = cursorPos;
  }

  setToolImg(toolImg: string) {
    this.toolImg = toolImg;
  }

  getTool() {
    return this.tool;
  }

  getColor() {
    return this.color;
  }

  getBrushSize() {
    return this.brushSize;
  }

  getCursorPos() {
    return this.cursorPos;
  }

  getToolImg() {
    return this.toolImg;
  }
}
