'use client';

import React from 'react';
import { QuizContainer } from '@/components/quiz/QuizContainer';
import { QuizStep } from '@/components/quiz/QuizStep';

export default function QuizPage() {
    return (
        <QuizContainer>
            <QuizStep />
        </QuizContainer>
    );
}
