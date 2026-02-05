'use client';

import React from 'react';
import { ProgressBar } from './ProgressBar';

interface QuizContainerProps {
    children: React.ReactNode;
}

export const QuizContainer = ({ children }: QuizContainerProps) => {
    return (
        <div className="h-[100dvh] bg-white flex flex-col overflow-hidden">
            <ProgressBar />
            <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 pb-32 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};
