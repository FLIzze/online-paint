import React, { useState } from "react";
import setEraser from "@/app/ts/utils/setEraser";
import Brush from "@/app/ts/class/brush";

export default function Eraser({ draw, setDraw, usedTool, setUsedTool }: { draw: Brush, setDraw: React.Dispatch<React.SetStateAction<Brush>>, setUsedTool: React.Dispatch<React.SetStateAction<boolean>>, usedTool: boolean}) {
    return (
        <div>
            {usedTool == true ? (
                <div>
                    <img
                        src="eraser.png"
                        alt="eraser"
                        className="h-8 w-8 p-1 rounded-sm transition-all bg-gray-500"
                        onClick={() => {
                            setUsedTool(false);
                            setEraser(draw, setDraw);
                        }}
                    />
                </div>
            ) : (
                <div>
                    <img
                        src="eraser.png"
                        alt="eraser"
                        className="h-8 w-8 p-1 rounded-sm transition-all"
                        onClick={() => {
                            setUsedTool(true);
                            setEraser(draw, setDraw);
                        }}
                    />
                </div>
            )}
        </div>
    )
}