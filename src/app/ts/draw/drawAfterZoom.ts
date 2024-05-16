import drawPixelsFromUndoStack from "./drawPixelsFromUndoStack";

export default function drawPixelsAfterZoom(undoStack: StackInterface[]) {
    for (const action of undoStack) {
        drawPixelsFromUndoStack(action)
    }
}