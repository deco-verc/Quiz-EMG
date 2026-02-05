'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const BrainStomachSVG = () => {
    return (
        <div className="w-full max-w-xs mx-auto h-64 relative">
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Connection Line */}
                <motion.path
                    d="M60,60 Q100,100 140,140"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Brain (Top Left) */}
                <g transform="translate(20, 20)">
                    <circle cx="40" cy="40" r="30" fill="#1E40AF" opacity="0.1" />
                    <text x="40" y="45" textAnchor="middle" fontSize="30">🧠</text>
                    <text x="40" y="80" textAnchor="middle" fontSize="12" fill="#1E40AF" fontWeight="bold">Cérebro</text>
                </g>

                {/* Stomach (Bottom Right) */}
                <g transform="translate(100, 100)">
                    <circle cx="40" cy="40" r="30" fill="#10B981" opacity="0.1" />
                    <text x="40" y="45" textAnchor="middle" fontSize="30">🧬</text>
                    <text x="40" y="80" textAnchor="middle" fontSize="12" fill="#10B981" fontWeight="bold">Estômago</text>
                </g>

                {/* Signal Particles - usando animação de cx/cy */}
                <motion.circle
                    r="4"
                    fill="#EF4444"
                    animate={{
                        cx: [60, 80, 100, 120, 140],
                        cy: [60, 75, 100, 125, 140]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </svg>
        </div>
    );
};

