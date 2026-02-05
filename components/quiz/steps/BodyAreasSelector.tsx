'use client';

import React, { useState, useEffect } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { NextButton } from '../NextButton';
import { motion } from 'framer-motion';

export const BodyAreasSelector = ({ config, onNext }: { config: any, onNext: () => void }) => {
    const { setAnswer } = useQuizStore();
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const allBodyParts = config.options
        .filter((opt: any) => opt.value !== 'corpo_todo')
        .map((opt: any) => opt.value);

    const handleToggle = (value: string) => {
        if (value === 'corpo_todo') {
            // If "Corpo Todo" is selected, select all other options
            if (selectedValues.includes('corpo_todo')) {
                // Deselect all
                setSelectedValues([]);
            } else {
                // Select all including corpo_todo
                setSelectedValues([...allBodyParts, 'corpo_todo']);
            }
        } else {
            // Toggle individual option
            if (selectedValues.includes(value)) {
                // Remove this value and corpo_todo if it was selected
                setSelectedValues(prev => prev.filter(v => v !== value && v !== 'corpo_todo'));
            } else {
                const newValues = [...selectedValues, value];
                // Check if all body parts are now selected
                const allSelected = allBodyParts.every((part: string) => newValues.includes(part));
                if (allSelected) {
                    setSelectedValues([...newValues, 'corpo_todo']);
                } else {
                    setSelectedValues(newValues);
                }
            }
        }
    };

    const handleNext = () => {
        if (selectedValues.length > 0) {
            setAnswer(config.id.toString(), selectedValues);
            onNext();
        }
    };

    const isValid = selectedValues.length >= (config.validation?.min || 1);

    return (
        <div className="text-center max-w-2xl mx-auto pb-64">
            <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-2 leading-tight px-4">
                {config.title}
            </h2>
            {config.subtitle && (
                <p className="text-gray-500 text-center mb-8 px-4">
                    {config.subtitle}
                </p>
            )}

            <div className="grid grid-cols-2 gap-3 px-2">
                {config.options?.map((option: any, index: number) => {
                    const isSelected = selectedValues.includes(option.value);
                    const isCorpoTodo = option.value === 'corpo_todo';

                    return (
                        <motion.div
                            key={option.value}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleToggle(option.value)}
                            className={`
                                relative cursor-pointer rounded-2xl overflow-hidden transition-all
                                ${isSelected
                                    ? 'ring-4 ring-green-500 shadow-lg shadow-green-500/30'
                                    : 'ring-2 ring-gray-200 hover:ring-gray-300'
                                }
                            `}
                        >
                            {option.image && (
                                <div className="w-full aspect-square bg-gray-100">
                                    <img
                                        src={option.image}
                                        alt={option.label}
                                        className="w-full h-full object-cover"
                                        loading="eager"
                                    />
                                </div>
                            )}

                            <div className="p-4 bg-white">
                                <div className="flex items-center gap-3">
                                    {/* Checkbox Removed */}
                                    {isSelected && (
                                        <div className="text-green-500">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                    <span className={`font-bold text-sm md:text-base ${isSelected ? 'text-green-600' : 'text-gray-900'}`}>
                                        {option.label}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <NextButton onClick={handleNext} disabled={!isValid} />
        </div>
    );
};
