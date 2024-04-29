import DrawingInfos from "../../draw";
import Brush from "../../draw";
import React, { useState } from "react";

interface UtilsProps {
    data: DrawingInfos;
    setDraw: React.Dispatch<React.SetStateAction<Brush>>;
}

export default function Utils({ data, setDraw }: UtilsProps) {
    const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white']

    function colorFocus(color: string) {
        setDraw(prevDraw => ({ ...prevDraw, color: color }));
      }
      
      function widthBrush(e: React.ChangeEvent<HTMLInputElement>) {
        setDraw(prevDraw => ({ ...prevDraw, brushSize: Number(e.target.value) }));
      }

    function brush() {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'brush' }));
    }

    function eraser() {
        setDraw(prevDraw => ({ ...prevDraw, tool: 'eraser' }));
    }

    return (
        <div>
            <p>x : {data.cursorPos.x}</p>
            <p>y : {data.cursorPos.y}</p>
            <div className="flex">
                {colors.map((color, index) => (
                    <div key={index}>
                        <button
                            style={{ backgroundColor: color }}
                            className="w-14 h-14"
                            onClick={() => colorFocus(colors[index])}>
                        </button>
                    </div>
                ))}
            </div>
            <input 
                type="number"
                className="bg-red-200"
                onChange={widthBrush}
            />
            <div>
                <button
                    className="mr-10"
                    onClick={brush}>
                    Brush
                </button>
                <button
                    onClick={eraser}>
                    Eraser
                </button>
            </div>
        </div>
    )
}