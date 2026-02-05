'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, TrendingDown, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useQuizStore } from '@/store/quizStore';
import { useRouter } from 'next/navigation';

export const TimelineStep = ({ onNext, name }: { onNext: () => void, name: string }) => {
    const [showChart, setShowChart] = useState(false);
    const { userData } = useQuizStore();

    useEffect(() => {
        setTimeout(() => setShowChart(true), 300);
    }, []);

    // Get current weight and target weight from quiz data
    const currentWeight = userData?.weight || 70;
    const targetWeight = userData?.targetWeight || 60;
    const weightLoss = currentWeight - targetWeight;

    // Generate points for the exponential curve
    const generateCurvePoints = () => {
        const points = [];
        const numPoints = 60; // More points for smoother curve

        for (let i = 0; i <= numPoints; i++) {
            const day = i;
            // Exponential decay formula: faster loss at beginning
            // progress goes from 0 to 1
            const progress = 1 - Math.pow(1 - (i / 60), 1.5);
            const weight = currentWeight - (weightLoss * progress);
            points.push({ day, weight });
        }
        return points;
    };

    const curvePoints = generateCurvePoints();

    // Chart dimensions
    const chartHeight = 220;
    const chartWidth = 340; // Slightly wider
    const padding = { top: 40, right: 30, bottom: 40, left: 20 };
    const innerHeight = chartHeight - padding.top - padding.bottom;
    const innerWidth = chartWidth - padding.left - padding.right;

    // Y axis scale
    const minWeight = targetWeight - 2;
    const maxWeight = currentWeight + 2;
    const weightRange = maxWeight - minWeight;

    // Convert data to SVG coordinates
    const getX = (day: number) => padding.left + (day / 60) * innerWidth;
    const getY = (weight: number) => padding.top + ((maxWeight - weight) / weightRange) * innerHeight;

    // Create SVG path for the line
    const createLinePath = () => {
        if (curvePoints.length === 0) return '';
        // Simple polyline is enough with high point density, but let's use a smooth curve if needed.
        // With 60 points, L commands are smooth enough.
        return curvePoints.map((p, i) =>
            `${i === 0 ? 'M' : 'L'} ${getX(p.day)} ${getY(p.weight)}`
        ).join(' ');
    };

    // Create SVG path for the area (closed loop)
    const createAreaPath = () => {
        const linePath = createLinePath();
        if (!linePath) return '';
        return `${linePath} L ${getX(60)} ${chartHeight - padding.bottom} L ${getX(0)} ${chartHeight - padding.bottom} Z`;
    };

    const router = useRouter();

    const handleFinish = () => {
        router.push('/sales');
    };

    return (
        <div className="max-w-md mx-auto px-4 pb-8">
            {/* Header */}
            <div className="text-center mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-green-100"
                >
                    <CheckCircle2 size={12} />
                    ANÁLISE CONCLUÍDA
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight"
                >
                    Como parece sua transformação em <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">60 Dias</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 text-sm flex items-center justify-center gap-2"
                >
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                        {name.charAt(0).toUpperCase()}
                    </span>
                    Baseado no perfil de {name}
                </motion.p>
            </div>

            {/* Chart Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-2 mb-6 relative overflow-hidden"
            >
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-green-50/50 to-transparent pointer-events-none" />

                <div className="relative z-10">
                    <svg width="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#16a34a" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Grid Lines */}
                        {[0, 0.33, 0.66, 1].map((ratio, i) => {
                            const y = padding.top + ratio * innerHeight;
                            return (
                                <line
                                    key={i}
                                    x1={padding.left}
                                    y1={y}
                                    x2={chartWidth - padding.right}
                                    y2={y}
                                    stroke="#f3f4f6"
                                    strokeWidth="1"
                                />
                            );
                        })}

                        {/* Area Fill */}
                        {showChart && (
                            <motion.path
                                d={createAreaPath()}
                                fill="url(#areaGradient)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        )}

                        {/* Line */}
                        {showChart && (
                            <motion.path
                                d={createLinePath()}
                                fill="none"
                                stroke="url(#lineGradient)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                style={{ filter: 'drop-shadow(0px 4px 6px rgba(34, 197, 94, 0.2))' }}
                            />
                        )}

                        {/* Start Point (Today) */}
                        {showChart && (
                            <g>
                                <motion.circle
                                    cx={getX(0)}
                                    cy={getY(currentWeight)}
                                    r="6"
                                    fill="#fff"
                                    stroke="#9ca3af"
                                    strokeWidth="3"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                />
                                <motion.g
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <rect
                                        x={getX(0) - 25}
                                        y={getY(currentWeight) - 35}
                                        width="50"
                                        height="24"
                                        rx="12"
                                        fill="#f3f4f6"
                                    />
                                    <text
                                        x={getX(0)}
                                        y={getY(currentWeight) - 19}
                                        textAnchor="middle"
                                        className="text-[10px] font-bold fill-gray-600"
                                    >
                                        {currentWeight}kg
                                    </text>
                                    <text
                                        x={getX(0)}
                                        y={chartHeight - 15}
                                        textAnchor="middle"
                                        className="text-[10px] font-bold fill-gray-400 uppercase tracking-wider"
                                    >
                                        Hoje
                                    </text>
                                </motion.g>
                            </g>
                        )}

                        {/* End Point (Goal) */}
                        {showChart && (
                            <g>
                                <motion.circle
                                    cx={getX(60)}
                                    cy={getY(targetWeight)}
                                    r="8"
                                    fill="#10b981"
                                    stroke="#fff"
                                    strokeWidth="3"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.5, type: "spring" }}
                                />
                                <motion.g
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.6 }}
                                >
                                    <rect
                                        x={getX(60) - 30}
                                        y={getY(targetWeight) - 40}
                                        width="60"
                                        height="28"
                                        rx="14"
                                        fill="#10b981"
                                        filter="drop-shadow(0px 4px 6px rgba(16, 185, 129, 0.3))"
                                    />
                                    <text
                                        x={getX(60)}
                                        y={getY(targetWeight) - 22}
                                        textAnchor="middle"
                                        className="text-[12px] font-bold fill-white"
                                    >
                                        {targetWeight}kg
                                    </text>
                                    <text
                                        x={getX(60)}
                                        y={chartHeight - 15}
                                        textAnchor="middle"
                                        className="text-[10px] font-bold fill-green-600 uppercase tracking-wider"
                                    >
                                        60 dias
                                    </text>
                                </motion.g>
                            </g>
                        )}
                    </svg>
                </div>
            </motion.div>

            {/* Goal Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-sm relative overflow-hidden"
            >
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <Target size={80} className="text-green-600" />
                </div>

                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-green-600">
                        <Target size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-green-800 font-medium uppercase tracking-wide">Sua Meta</p>
                        <p className="text-lg font-bold text-green-700">-{weightLoss.toFixed(1)}kg <span className="text-sm font-normal text-green-600">em 8 semanas</span></p>
                    </div>
                </div>

                <div className="relative z-10 bg-white/50 px-3 py-1 rounded-lg">
                    <TrendingDown size={20} className="text-green-600" />
                </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-8"
            >
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[8px] font-bold text-gray-500 overflow-hidden">
                                <Users size={12} />
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-bold text-gray-500">+420 MIL mulheres</span>
                </div>

            </motion.div>

            {/* CTA Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleFinish}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg py-5 px-8 rounded-2xl shadow-xl shadow-green-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95"
            >
                CONTINUAR
                <ArrowRight size={20} />
            </motion.button>
        </div>
    );
};
