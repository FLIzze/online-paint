import React, { useState, useEffect, useRef } from 'react';
import Utils from "../utils/page";
import Colors from "../colors/page";
import SideNavBarInterface from "@/app/ts/interface/sideNavBar";

export default function SideNavBar({ data, setDraw, history, setHistory }: SideNavBarInterface) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const sideNav = document.getElementById('sideNavBar');
    

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (dragging) {
            setPosition({ x: e.clientX - sideNav!.clientWidth / 2, y: e.clientY - sideNav!.clientHeight / 2 });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div
            className="gap-0 top-0 left-0 absolute border-black border bg-white p-2 h-fit rounded-lg"
            style={{ left: position.x, top: position.y }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            id='sideNavBar'
        >
            <Utils setDraw={setDraw} setHistory={setHistory} history={history} />
            <Colors data={data} setDraw={setDraw} />
        </div>
    )
}