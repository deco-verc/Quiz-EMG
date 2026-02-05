'use client';

import React from 'react';
import { NextButton } from '../NextButton';
import { GamifiedCTAButton } from '@/components/ui/GamifiedCTAButton';

export const RecognitionInfo = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="text-center w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-black mb-6 px-4">
                Milhares de mulheres já transformaram com método validado cientificamente.
            </h2>

            <div className="flex flex-col gap-4 mb-8">
                <img
                    src="https://i.imgur.com/cmGrAP0.png"
                    alt="Reconhecimento 1"
                    className="w-full rounded-xl shadow-sm"
                />
                <img
                    src="https://i.imgur.com/dqnTGKY.png"
                    alt="Reconhecimento 2"
                    className="w-full rounded-xl shadow-sm"
                />
            </div>

            <GamifiedCTAButton onClick={onNext} />
        </div>
    );
};
