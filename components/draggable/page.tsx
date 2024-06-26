import React, { useState, useEffect, useRef } from 'react';

interface DraggableProps {
    children: React.ReactNode;
    name: string;
    posX: number;
    posY: number;
}

export default function Draggable({ children, name, posX, posY }: Readonly<DraggableProps>) {
    const [position, setPosition] = useState({ x: posX, y: posY });
    const [isDragging, setIsDragging] = useState(false);
    const initialClickRef = useRef({ offsetX: 0, offsetY: 0 });

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    function handleMouseMove(e: MouseEvent) {
        if (isDragging) {
            const offsetX = e.clientX - initialClickRef.current.offsetX;
            const offsetY = e.clientY - initialClickRef.current.offsetY;
            setPosition({ x: offsetX, y: offsetY });
        }
    };

    function handleMouseUp() {
        setIsDragging(false);
    };

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        if (name == 'None' && e.button != 1) { return; }
        e.preventDefault();
        
        setIsDragging(true);
        const boundingRect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.left;
        const offsetY = e.clientY - boundingRect.top;
        initialClickRef.current = { offsetX, offsetY };
    };

    return (
        <>
            {name == "None" ? (
                <div
                    style={{ left: position.x, top: position.y }}
                    onMouseDown={handleMouseDown}
                    className='absolute'
                    role='button'
                    tabIndex={0}
                >
                    {children}
                </div>
            ) : (
                <div
                    style={{ left: position.x, top: position.y }}
                    onMouseDown={handleMouseDown}
                    className='absolute cursor-move'
                    role='button'
                    tabIndex={0}
                >
                    <div className='border border-black pb-2 bg-[#494949]'>
                        <p className='bg-[#494949] text-sm p-1 mb-2 text-white'>{name}</p>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};
