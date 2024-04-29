class Brush {
    tool: string;
    color: string;
    brushSize: number;
    cursorPos: { x: number, y: number };
    
    constructor(tool: string, color: string, brushSize: number, cursorPos: { x: number, y: number }) {
      this.tool = tool;
      this.color = color;
      this.brushSize = brushSize;
      this.cursorPos = cursorPos;
    }
  }

export default Brush;