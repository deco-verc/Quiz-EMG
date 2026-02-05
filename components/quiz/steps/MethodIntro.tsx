'use client';

import React from 'react';
import { NextButton } from '../NextButton';

export const MethodIntro = ({ config, onNext }: { config: any, onNext: () => void }) => {
    return (
        <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8 flex justify-center">
                <img
                    src="https://i.imgur.com/wpkseiG.png"
                    alt="Method Intro"
                    className="w-full max-w-md rounded-xl shadow-sm"
                />
            </div>

            <p className="text-xl md:text-2xl font-bold text-black mb-8 px-4 leading-relaxed">
                Depois de analisar seu perfil, posso afirmar:
            </p>

            <NextButton onClick={onNext} />
        </div>
    );
};
