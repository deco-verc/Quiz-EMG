'use client';

import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

interface RulerSliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    unit: string;
    step?: number;
    majorTickInterval?: number;
}

export const RulerSlider = ({
    value,
    onChange,
    min,
    max,
    unit,
    step = 1,
    majorTickInterval = 10,
}: RulerSliderProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const PIXELS_PER_UNIT = 10; // 1 unit = 10px

    // Calculate total width based on range
    const range = max - min;
    const totalWidth = range * PIXELS_PER_UNIT;

    // Center offset (half the screen width) to allow scrolling to edges
    // We'll calculate this dynamically or use a safe estimate
    const [centerOffset, setCenterOffset] = useState(0);

    useEffect(() => {
        if (scrollRef.current) {
            setCenterOffset(scrollRef.current.clientWidth / 2);
        }

        const handleResize = () => {
            if (scrollRef.current) {
                setCenterOffset(scrollRef.current.clientWidth / 2);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sync scroll position with value
    useEffect(() => {
        if (scrollRef.current && !isDragging) {
            const targetScroll = (value - min) * PIXELS_PER_UNIT;
            scrollRef.current.scrollLeft = targetScroll;
        }
    }, [value, min, centerOffset, isDragging]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const newValue = min + (scrollLeft / PIXELS_PER_UNIT);
            const clampedValue = Math.min(Math.max(newValue, min), max);
            const roundedValue = Math.round(clampedValue / step) * step;

            // Only update if changed significantly to avoid jitter
            if (Math.abs(roundedValue - value) >= step) {
                onChange(roundedValue);
            }
        }
    };

    // Generate ticks
    const ticks = [];
    for (let i = min; i <= max; i += step) {
        ticks.push(i);
    }

    return (
        <div className="relative w-full select-none">
            {/* Value Display */}
            <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                    <span className="text-6xl font-bold text-black">{Math.round(value)}</span>
                    <span className="text-xl text-gray-500 ml-1">{unit}</span>
                </div>
            </div>

            {/* Ruler Container */}
            <div className="relative h-32 overflow-hidden">
                {/* Center Indicator */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-red-500 z-10 transform -translate-x-1/2 flex flex-col items-center justify-end pb-2">
                    <div className="w-4 h-4 bg-red-500 transform rotate-45 translate-y-2"></div>
                </div>

                {/* Scrollable Area */}
                <div
                    ref={scrollRef}
                    className="absolute inset-0 overflow-x-auto hide-scrollbar flex items-end"
                    onScroll={handleScroll}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
                >
                    <div
                        className="flex items-end h-full relative"
                        style={{
                            paddingLeft: centerOffset,
                            paddingRight: centerOffset,
                            width: 'fit-content',
                        }}
                    >
                        {ticks.map((tickValue) => {
                            const isMajor = tickValue % majorTickInterval === 0;
                            return (
                                <div
                                    key={tickValue}
                                    className="flex flex-col items-center justify-end flex-shrink-0"
                                    style={{ width: `${PIXELS_PER_UNIT}px` }}
                                >
                                    {isMajor && (
                                        <span className="mb-4 text-gray-400 text-xs font-medium absolute -top-2">
                                            {tickValue}
                                        </span>
                                    )}
                                    <div
                                        className={clsx(
                                            "w-px bg-gray-300",
                                            isMajor ? "h-12" : "h-6"
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <p className="text-center text-gray-300 text-sm mt-4">
                arraste para ajustar
            </p>

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
