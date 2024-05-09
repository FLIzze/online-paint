import React, { useState, useEffect, useRef } from 'react';

export default function Draggable({ children, name, posX, posY }: { children: React.ReactNode, name: string, posX: number, posY: number }): JSX.Element {
    const [position, setPosition] = useState({ x: posX, y: posY });
    const [isDragging, setIsDragging] = useState(false);
    const initialClickRef = useRef({ offsetX: 0, offsetY: 0 });

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            if (isDragging) {
                const offsetX = e.clientX - initialClickRef.current.offsetX;
                const offsetY = e.clientY - initialClickRef.current.offsetY;
                setPosition({ x: offsetX, y: offsetY });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleMouseDown = (e: any) => {
        e.preventDefault();
        setIsDragging(true);
        const boundingRect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.left;
        const offsetY = e.clientY - boundingRect.top;
        initialClickRef.current = { offsetX, offsetY };
    };

    return (
        <div
            style={{ position: 'absolute', left: position.x, top: position.y, cursor: 'move' }}
            onMouseDown={handleMouseDown}
        >
            <div className='border border-black pb-2 bg-white'>
                <p className='bg-slate-300 text-sm p-1 mb-2'>{name}</p>
                {children}
            </div>
        </div>
    );
};