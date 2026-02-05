'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GamifiedCTAButtonProps {
    onClick: () => void;
    text?: string;
    className?: string;
}

export const GamifiedCTAButton = ({ onClick, text = "CONTINUAR", className }: GamifiedCTAButtonProps) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(16, 185, 129, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className={clsx(
                "w-full max-w-[400px] mx-auto",
                "bg-[#10B981] hover:bg-[#059669]",
                "text-white font-poppins font-bold text-lg",
                "py-4 px-10 rounded-xl",
                "shadow-lg shadow-green-500/30",
                "flex items-center justify-center",
                "transition-all duration-200",
                className
            )}
        >
            <span className="z-20">{text}</span>
        </motion.button>
    );
};
