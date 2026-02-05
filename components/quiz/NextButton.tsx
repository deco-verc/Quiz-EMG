'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface NextButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

export const NextButton = ({ onClick, disabled = false, children = 'CONTINUAR' }: NextButtonProps) => {
    return (
        <div className="fixed bottom-0 left-0 w-full p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white border-t border-gray-100 flex justify-center z-40">
            <motion.button
                onClick={onClick}
                disabled={disabled}
                whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
                whileTap={!disabled ? { scale: 0.98 } : {}}
                className={clsx(
                    "w-full max-w-md py-4 px-8 rounded-full font-bold text-lg text-white transition-all duration-200",
                    disabled
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#10B981] to-[#059669] shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40"
                )}
            >
                {children}
            </motion.button>
        </div>
    );
};
