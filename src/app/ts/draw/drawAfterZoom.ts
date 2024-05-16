import drawPixelsFromUndoStack from "./drawPixelsFromUndoStack";

export default function drawPixelsAfterZoom(undoStack: StackInterface[], zoom: number) {
    for (const action of undoStack) {
        drawPixelsFromUndoStack(action, zoom)
    }
}