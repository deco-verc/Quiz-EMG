'use client';

import React, { useState } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { NextButton } from '../NextButton';
import { ScrollableRuler } from '@/components/ui/ScrollableRuler';
import clsx from 'clsx';

export const WeightHeightSliders = ({ onNext }: { onNext: () => void }) => {
    const { setUserData } = useQuizStore();
    const [internalStep, setInternalStep] = useState<'height' | 'weight'>('height');

    // State for values
    const [height, setHeight] = useState(160); // cm (Default 160)
    const [weight, setWeight] = useState(65); // kg (Default 65)

    // State for units (visual for now, logic keeps metric internally)
    const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
    const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');

    const handleNext = () => {
        if (internalStep === 'height') {
            setInternalStep('weight');
        } else {
            // Calculate BMI and finish
            const bmi = weight / ((height / 100) ** 2);
            setUserData({ weight, height, bmi });
            onNext();
        }
    };

    const handleBack = () => {
        if (internalStep === 'weight') {
            setInternalStep('height');
        }
    };

    return (
        <div className="text-center max-w-md mx-auto">
            {/* Progress Bar / Header */}
            <div className="flex items-center justify-between mb-8 px-4">
                {internalStep === 'weight' && (
                    <button
                        onClick={handleBack}
                        className="text-black hover:text-gray-700 font-bold"
                    >
                        ← Voltar
                    </button>
                )}
                <div className="flex-1"></div>
            </div>



            {internalStep === 'height' ? (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                    <h2 className="text-2xl font-bold text-black mb-8">
                        Qual é a sua altura?
                    </h2>

                    {/* Unit Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-gray-100 p-1 rounded-full flex">
                            <button
                                onClick={() => setHeightUnit('cm')}
                                className={clsx(
                                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                                    heightUnit === 'cm'
                                        ? "bg-green-500 text-white shadow-md"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                cm
                            </button>
                            <button
                                onClick={() => setHeightUnit('ft')}
                                className={clsx(
                                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                                    heightUnit === 'ft'
                                        ? "bg-green-500 text-white shadow-md"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                pol
                            </button>
                        </div>
                    </div>

                    {/* Slider Display */}
                    <div className="mb-8">
                        <div className="text-6xl font-bold text-black mb-8">{height}<span className="text-2xl text-gray-500 ml-2">cm</span></div>

                        <ScrollableRuler
                            value={height}
                            min={140}
                            max={200}
                            onChange={setHeight}
                            unit="cm"
                        />

                        <p className="text-center text-gray-300 text-sm mt-4">
                            Arraste para ajustar
                        </p>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-6 flex items-start gap-3 text-left">
                            <div className="mt-0.5 text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </div>
                            <p className="text-xs text-blue-800 leading-relaxed">
                                Seus dados são <span className="font-bold">100% confidenciais</span> e usados apenas para personalizar seu protocolo.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                    <h2 className="text-2xl font-bold text-black mb-8">
                        Qual é seu peso agora?
                    </h2>

                    {/* Unit Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-gray-100 p-1 rounded-full flex">
                            <button
                                onClick={() => setWeightUnit('kg')}
                                className={clsx(
                                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                                    weightUnit === 'kg'
                                        ? "bg-green-500 text-white shadow-md"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                kg
                            </button>
                            <button
                                onClick={() => setWeightUnit('lb')}
                                className={clsx(
                                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                                    weightUnit === 'lb'
                                        ? "bg-green-500 text-white shadow-md"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                lb
                            </button>
                        </div>
                    </div>

                    {/* Slider Display */}
                    <div className="mb-8">
                        <div className="text-6xl font-bold text-black mb-8">{weight}<span className="text-2xl text-gray-500 ml-2">kg</span></div>

                        <ScrollableRuler
                            value={weight}
                            min={45}
                            max={120}
                            onChange={setWeight}
                            unit="kg"
                        />

                        <p className="text-center text-gray-300 text-sm mt-4">
                            Arraste para ajustar
                        </p>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-6 flex items-start gap-3 text-left">
                            <div className="mt-0.5 text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </div>
                            <p className="text-xs text-blue-800 leading-relaxed">
                                Seus dados são <span className="font-bold">100% confidenciais</span> e usados apenas para personalizar seu protocolo.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12">
                <NextButton onClick={handleNext}>
                    Próximo passo
                </NextButton>
            </div>
        </div>
    );
};
