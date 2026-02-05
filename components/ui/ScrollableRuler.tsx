'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ScrollableRulerProps {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    unit?: string;
}

export const ScrollableRuler = ({ value, min, max, onChange, unit }: ScrollableRulerProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const PIXELS_PER_UNIT = 15; // Space between ticks

    // Padding to allow scrolling to the ends (half screen width approx)
    const PADDING = 500;

    // Sync scroll position with value
    useEffect(() => {
        if (scrollRef.current && !isScrolling && !isDragging) {
            const centerOffset = scrollRef.current.clientWidth / 2;
            const position = (value - min) * PIXELS_PER_UNIT;
            scrollRef.current.scrollLeft = position;
        }
    }, [value, min, isScrolling, isDragging]);

    const handleScroll = () => {
        if (scrollRef.current && !isDragging) {
            setIsScrolling(true);
            const scrollLeft = scrollRef.current.scrollLeft;
            const newValue = Math.round(scrollLeft / PIXELS_PER_UNIT) + min;
            const clamped = Math.max(min, Math.min(max, newValue));

            if (clamped !== value) {
                onChange(clamped);
            }

            // Reset scrolling flag after a delay
            clearTimeout((window as any).scrollTimeout);
            (window as any).scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 100);
        }
    };

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
        setStartX(pageX);
        if (scrollRef.current) {
            setStartScrollLeft(scrollRef.current.scrollLeft);
        }
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || !scrollRef.current) return;

        // Prevent default only if it's a mouse event or if we want to block vertical scroll
        // e.preventDefault(); 

        const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
        const walk = (pageX - startX) * 1.5; // Multiply by 1.5 for faster scrolling
        scrollRef.current.scrollLeft = startScrollLeft - walk;

        // Update value while dragging
        const scrollLeft = scrollRef.current.scrollLeft;
        const newValue = Math.round(scrollLeft / PIXELS_PER_UNIT) + min;
        const clamped = Math.max(min, Math.min(max, newValue));
        if (clamped !== value) {
            onChange(clamped);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="relative h-32 w-full overflow-hidden select-none touch-none">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-green-600 drop-shadow-md"></div>
                <div className="h-32 w-0.5 bg-green-600/20"></div>
            </div>

            {/* Scrollable Area */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
                className="w-full h-full overflow-x-auto overflow-y-hidden hide-scrollbar flex items-center"
                style={{
                    scrollSnapType: isDragging ? 'none' : 'x mandatory',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    touchAction: 'none' // Critical for mobile drag
                }}
            >
                <div
                    className="relative h-16 flex items-end"
                    style={{
                        paddingLeft: '50%',
                        paddingRight: '50%',
                        width: 'max-content'
                    }}
                >
                    {Array.from({ length: max - min + 1 }).map((_, i) => {
                        const val = min + i;
                        const isLarge = val % 10 === 0;
                        const isMedium = val % 5 === 0 && !isLarge;

                        return (
                            <div
                                key={val}
                                className="flex flex-col items-center justify-end"
                                style={{ width: `${PIXELS_PER_UNIT}px` }}
                            >
                                {isLarge && (
                                    <span className="mb-2 text-lg font-bold text-gray-400 select-none">
                                        {val}
                                    </span>
                                )}
                                <div
                                    className={`w-0.5 rounded-full ${isLarge ? 'h-8 bg-gray-400' :
                                        isMedium ? 'h-5 bg-gray-300' :
                                            'h-3 bg-gray-200'
                                        }`}
                                ></div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>
        </div>
    );
};
