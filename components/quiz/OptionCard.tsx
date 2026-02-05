'use client';

import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface OptionCardProps {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
    multiSelect?: boolean;
}

export const OptionCard = ({ selected, onClick, children, multiSelect, image }: OptionCardProps & { image?: string }) => {
    return (
        <motion.div
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
            className={clsx(
                "relative rounded-2xl border-2 cursor-pointer transition-all duration-200 overflow-hidden",
                "flex items-center gap-4 p-3", // Horizontal layout
                selected
                    ? "border-[#10B981] bg-[#ECFDF5] shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            )}
        >
            {image && (
                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden">
                    <img
                        src={image}
                        alt={typeof children === 'string' ? children : 'Option image'}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="flex-1 text-left">
                <span
                    className={clsx(
                        "font-bold text-base md:text-lg transition-colors",
                        selected ? "text-black" : "text-black"
                    )}
                    dangerouslySetInnerHTML={typeof children === 'string' ? { __html: children } : undefined}
                >
                    {typeof children === 'string' ? null : children}
                </span>
            </div>

            {/* Checkbox/Radio Indicator */}
            {/* Checkbox/Radio Indicator Removed */}
            {selected && (
                <div className="text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </motion.div>
    );
};
