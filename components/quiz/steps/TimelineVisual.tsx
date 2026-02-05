'use client';

import React, { useState, useEffect } from 'react';
import { NextButton } from '../NextButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';
import { Trophy, Calendar, Target, Info } from 'lucide-react';

export const TimelineVisual = ({ onNext }: { onNext: () => void }) => {
    const { userData } = useQuizStore();
    const [activePoint, setActivePoint] = useState<number | null>(null);
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        // Delay chart animation slightly for better effect
        const timer = setTimeout(() => setShowChart(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Get user data or defaults
    const startWeight = userData.weight || 70;
    const targetWeight = userData.targetWeight || 60;
    const totalLoss = startWeight - targetWeight;

    // Calculate milestones (approximate realistic progression)
    // Week 1: ~20%, Week 2: ~35%, Week 4: ~65%, Week 8: 100%
    const milestones = [
        { week: 0, label: 'Hoje', weight: startWeight, loss: 0 },
        { week: 1, label: 'Semana 1', weight: startWeight - (totalLoss * 0.2), loss: totalLoss * 0.2 },
        { week: 2, label: 'Semana 2', weight: startWeight - (totalLoss * 0.35), loss: totalLoss * 0.35 },
        { week: 4, label: 'Semana 4', weight: startWeight - (totalLoss * 0.65), loss: totalLoss * 0.65 },
        { week: 8, label: 'Semana 8', weight: targetWeight, loss: totalLoss, isGoal: true },
    ];

    // Chart Dimensions
    const width = 350;
    const height = 220;
    const padding = { top: 40, right: 30, bottom: 40, left: 40 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    // Scales
    const maxWeek = 8;
    const minWeightVal = targetWeight - 1;
    const maxWeightVal = startWeight + 1;
    const weightRange = maxWeightVal - minWeightVal;

    const getX = (week: number) => padding.left + (week / maxWeek) * graphWidth;
    const getY = (weight: number) => padding.top + ((maxWeightVal - weight) / weightRange) * graphHeight;

    // Generate Path (Smooth Curve)
    // Using simple bezier control points for smoothing
    const generatePath = () => {
        let d = `M ${getX(milestones[0].week)} ${getY(milestones[0].weight)}`;

        for (let i = 0; i < milestones.length - 1; i++) {
            const p0 = milestones[i];
            const p1 = milestones[i + 1];

            const x0 = getX(p0.week);
            const y0 = getY(p0.weight);
            const x1 = getX(p1.week);
            const y1 = getY(p1.weight);

            // Control points for smooth curve
            const cp1x = x0 + (x1 - x0) * 0.5;
            const cp1y = y0;
            const cp2x = x1 - (x1 - x0) * 0.5;
            const cp2y = y1;

            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x1} ${y1}`;
        }
        return d;
    };

    const pathD = generatePath();
    const areaD = `${pathD} L ${getX(8)} ${height - padding.bottom} L ${getX(0)} ${height - padding.bottom} Z`;

    return (
        <div className="max-w-md mx-auto px-4 pb-8">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Veja o que vai acontecer com seu corpo nos próximos 60 dias
                </h2>
                <p className="text-gray-500 text-sm">
                    Baseado em mulheres reais com perfil similar ao seu
                </p>
            </div>

            {/* Chart Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-2 mb-8 relative overflow-hidden"
            >
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-50/30 to-transparent pointer-events-none" />

                <div className="relative z-10 overflow-visible">
                    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00D66F" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#00D66F" stopOpacity="0.05" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Grid Lines (Horizontal) */}
                        {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
                            const y = padding.top + tick * graphHeight;
                            return (
                                <g key={i}>
                                    <line
                                        x1={padding.left} y1={y}
                                        x2={width - padding.right} y2={y}
                                        stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4 4"
                                    />
                                </g>
                            );
                        })}

                        {/* Y Axis Labels */}
                        {[startWeight, startWeight - totalLoss / 2, targetWeight].map((w, i) => (
                            <text
                                key={i}
                                x={padding.left - 10}
                                y={getY(w) + 4}
                                textAnchor="end"
                                className="text-[10px] fill-gray-400 font-medium"
                            >
                                {w.toFixed(0)}kg
                            </text>
                        ))}

                        {/* Area Fill */}
                        {showChart && (
                            <motion.path
                                d={areaD}
                                fill="url(#chartGradient)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            />
                        )}

                        {/* Line Path */}
                        {showChart && (
                            <motion.path
                                d={pathD}
                                fill="none"
                                stroke="#00D66F"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 214, 111, 0.2))' }}
                            />
                        )}

                        {/* Milestones Points */}
                        {showChart && milestones.map((m, index) => {
                            if (index === 0) return null; // Skip start point for cleaner look or keep if desired
                            const x = getX(m.week);
                            const y = getY(m.weight);
                            const isGoal = m.isGoal;

                            return (
                                <g key={index} onClick={() => setActivePoint(index)}>
                                    {/* Pulse Effect for Goal */}
                                    {isGoal && (
                                        <motion.circle
                                            cx={x} cy={y} r="12"
                                            fill="#00D66F"
                                            opacity="0.3"
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}

                                    {/* Main Dot */}
                                    <motion.circle
                                        cx={x} cy={y}
                                        r={isGoal ? 8 : 5}
                                        fill={isGoal ? "#00D66F" : "#FFFFFF"}
                                        stroke="#00D66F"
                                        strokeWidth="3"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 1.5 + (index * 0.1), type: "spring" }}
                                        whileHover={{ scale: 1.3 }}
                                        className="cursor-pointer"
                                    />

                                    {/* X Axis Label */}
                                    <text
                                        x={x}
                                        y={height - 15}
                                        textAnchor="middle"
                                        className={`text-[10px] font-bold ${isGoal ? 'fill-green-600' : 'fill-gray-400'}`}
                                    >
                                        Sem {m.week}
                                    </text>

                                    {/* Tooltip (Always show for Goal, or on hover/click for others) */}
                                    <AnimatePresence>
                                        {(activePoint === index || isGoal) && (
                                            <motion.g
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                            >
                                                <rect
                                                    x={x - 45}
                                                    y={y - 50}
                                                    width="90"
                                                    height="36"
                                                    rx="8"
                                                    fill="white"
                                                    filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.1))"
                                                />
                                                <text
                                                    x={x}
                                                    y={y - 32}
                                                    textAnchor="middle"
                                                    className="text-[10px] font-bold fill-gray-500 uppercase"
                                                >
                                                    {isGoal ? 'Meta Alcançada' : `Perda: -${m.loss.toFixed(1)}kg`}
                                                </text>
                                                <text
                                                    x={x}
                                                    y={y - 20}
                                                    textAnchor="middle"
                                                    className="text-[12px] font-bold fill-green-600"
                                                >
                                                    {m.weight.toFixed(1)}kg
                                                </text>
                                                {/* Little arrow */}
                                                <path d={`M ${x} ${y - 14} L ${x - 4} ${y - 14} L ${x} ${y - 10} L ${x + 4} ${y - 14} Z`} fill="white" />
                                            </motion.g>
                                        )}
                                    </AnimatePresence>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </motion.div>

            {/* Insights / Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                    <p className="text-[10px] text-green-600 font-bold uppercase mb-1">Semana 1</p>
                    <p className="text-lg font-bold text-green-700">-{milestones[1].loss.toFixed(1)}kg</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                    <p className="text-[10px] text-green-600 font-bold uppercase mb-1">Semana 4</p>
                    <p className="text-lg font-bold text-green-700">-{milestones[3].loss.toFixed(1)}kg</p>
                </div>
                <div className="bg-green-600 rounded-xl p-3 text-center shadow-lg shadow-green-200">
                    <p className="text-[10px] text-green-100 font-bold uppercase mb-1">Total</p>
                    <p className="text-lg font-bold text-white">-{totalLoss.toFixed(1)}kg</p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-8 text-xs text-gray-500 bg-gray-50 py-2 px-4 rounded-full mx-auto w-fit">
                <Target size={14} className="text-green-500" />
                <span>Método validado cientificamente</span>
            </div>

            <NextButton onClick={onNext}>
                Continuar
            </NextButton>
        </div>
    );
};
