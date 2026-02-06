'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useQuizStore } from '@/store/quizStore';
import { NextButton } from '../NextButton';
import clsx from 'clsx';

const dreamTypes = [
    { id: 'tonificado', label: 'Tonificado e definido', img: 'Tipo 1' },
    { id: 'magro', label: 'Magro e saudável', img: 'Tipo 2' },
    { id: 'curvilineo', label: 'Curvilíneo sem gordura extra', img: 'Tipo 3' },
    { id: 'sem_barriga', label: 'Apenas sem a barriga', img: 'Tipo 4' },
];

export const DreamBodySelector = ({ config, onNext }: { config: any, onNext: () => void }) => {
    const { setAnswer } = useQuizStore();
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelected(id);
        setAnswer(config.id.toString(), id);
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-6">{config.title}</h2>

            <div className="grid grid-cols-2 gap-4 mb-24">
                {config.options?.map((option: any) => (
                    <div
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={clsx(
                            "border-2 rounded-xl p-4 cursor-pointer transition-all",
                            selected === option.value
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 hover:border-green-500/50"
                        )}
                    >
                        <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg mb-2 overflow-hidden relative">
                            {option.image ? (
                                <Image
                                    src={option.image}
                                    alt={option.label}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">Sem imagem</div>
                            )}
                        </div>
                        <p className="font-medium text-sm text-black font-bold">{option.label}</p>
                    </div>
                ))}
            </div>

            <NextButton onClick={onNext} disabled={!selected} />
        </div>
    );
};
