'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface BodyZonesProps {
    selectedZones: string[];
    onToggleZone: (zone: string) => void;
}

export const BodyZones = ({ selectedZones, onToggleZone }: BodyZonesProps) => {
    // Simplified SVG paths for body zones
    // These are placeholders. In a real app, precise paths would be used.
    const zones = [
        { id: 'barriga', label: 'Barriga', path: 'M40,40 Q50,35 60,40 L60,60 Q50,65 40,60 Z', cx: 50, cy: 50 },
        { id: 'culotes', label: 'Culotes', path: 'M35,55 Q30,60 35,70 L35,55 M65,55 Q70,60 65,70 L65,55', cx: 70, cy: 60 }, // Split path logic needed or separate elements
        { id: 'coxas', label: 'Coxas', path: 'M38,70 L35,90 L48,90 L45,70 Z M52,70 L55,90 L62,90 L65,70 Z', cx: 50, cy: 80 },
        { id: 'bracos', label: 'Braços', path: 'M25,35 L20,50 L30,50 L32,35 Z M75,35 L80,50 L70,50 L68,35 Z', cx: 20, cy: 40 },
        { id: 'costas', label: 'Costas', path: 'M40,20 Q50,15 60,20 L60,35 Q50,40 40,35 Z', cx: 50, cy: 25 },
    ];

    return (
        <div className="relative w-64 h-96 mx-auto">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl">
                {/* Base Body Silhouette */}
                <path
                    d="M50,10 Q65,10 70,25 Q85,25 85,35 L80,55 Q85,65 80,75 L75,100 L65,100 L60,75 L55,75 L50,100 L45,100 L40,75 L35,75 L25,100 L15,100 L20,75 Q15,65 20,55 L15,35 Q15,25 30,25 Q35,10 50,10 Z"
                    fill="#F3F4F6"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                />

                {/* Interactive Zones */}
                {zones.map((zone) => {
                    const isSelected = selectedZones.includes(zone.id);
                    return (
                        <g key={zone.id} onClick={() => onToggleZone(zone.id)} className="cursor-pointer group">
                            <motion.path
                                d={zone.path} // Using simplified paths for demo
                                fill={isSelected ? '#10B981' : 'transparent'}
                                stroke={isSelected ? '#059669' : 'transparent'}
                                strokeWidth="1"
                                className="group-hover:fill-yellow-200/50 transition-colors"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                            {/* Label on Hover/Select */}
                            {(isSelected) && (
                                <text x={zone.cx} y={zone.cy} textAnchor="middle" fontSize="4" fill="white" fontWeight="bold">
                                    ✓
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Helper Text */}
            <div className="absolute bottom-0 w-full text-center text-xs text-gray-400">
                Toque nas áreas para selecionar
            </div>
        </div>
    );
};
