'use client';

import React from 'react';
import { useQuizStore } from '@/store/quizStore';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export const AgeSelector = ({ config, onNext }: { config: any, onNext: () => void }) => {
    const { setAnswer } = useQuizStore();

    const handleSelect = (value: string) => {
        setAnswer(config.id.toString(), value);
        // Also set 'gender' if this was the gender step, but it's age. 
        // Just standard setAnswer.
        setTimeout(onNext, 300);
    };

    return (
        <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-2 leading-tight px-4">
                {config.title}
            </h2>
            {config.subtitle && (
                <p className="text-gray-500 text-center mb-8 px-4">
                    {config.subtitle}
                </p>
            )}

            <div className="grid grid-cols-2 gap-4 px-2">
                {config.options?.map((option: any) => (
                    <div
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className="flex flex-col bg-white rounded-3xl overflow-hidden cursor-pointer group shadow-md hover:shadow-lg transition-all border border-gray-100"
                    >
                        {/* Image Container */}
                        <div className="w-full aspect-[4/5] bg-gray-100 relative">
                            <img
                                src={option.image}
                                alt={option.label}
                                className="w-full h-full object-cover"
                                loading="eager"
                            />
                        </div>

                        {/* Bottom Content */}
                        <div className="p-4 flex items-center justify-between bg-white">
                            <span className="text-gray-900 font-bold text-sm md:text-lg truncate">
                                {option.label}
                            </span>
                            <div className="bg-green-50 rounded-full p-2 w-8 h-8 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                                <ChevronRight className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
