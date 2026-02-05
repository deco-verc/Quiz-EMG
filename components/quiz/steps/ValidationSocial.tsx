'use client';

import React, { useMemo } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { GamifiedCTAButton } from '@/components/ui/GamifiedCTAButton';

export const ValidationSocial = ({ onNext }: { onNext: () => void }) => {
    const { userData, answers } = useQuizStore();

    const { score, topPercent, chanceSuccess, reasons } = useMemo(() => {
        let currentScore = 0;
        const activeReasons: string[] = [];

        // 1. IMC (25-35)
        const imc = userData.bmi || 0;
        if (imc >= 25 && imc <= 35) {
            currentScore += 20;
            activeReasons.push(`📊 IMC <span class="text-green-500 font-bold">${imc.toFixed(1)}</span> — Seu corpo está na zona de resposta rápida`);
        }

        // 2. Meta (5-15kg)
        const currentWeight = userData.weight || 0;
        const targetWeight = userData.targetWeight || 0;
        const weightLossGoal = currentWeight - targetWeight;
        if (weightLossGoal >= 5 && weightLossGoal <= 15) {
            currentScore += 20;
            activeReasons.push(`🎯 Meta <span class="text-green-500 font-bold">${weightLossGoal.toFixed(1)}kg</span> — Meta perfeitamente e facilmente alcançável`);
        }

        // 3. Tentativas (3+)
        const attempts = answers['15'] as string[] || [];
        if (attempts.length >= 3) {
            currentScore += 15;
            activeReasons.push(`🧠 <span class="text-green-500 font-bold">${attempts.length}</span> tentativas — Você agora sabe o que não fazer`);
        }

        // 5. Idade (30-49)
        const ageRange = answers['2'] as string || '';
        if (ageRange === '30-49') {
            currentScore += 10;
            activeReasons.push(`⭐ <span class="text-green-500 font-bold">30-49</span> anos — Faixa de Idade com maior quantidade de sucesso`);
        }

        // 6. Hormonal
        const events = answers['14'] as string[] || [];
        const isHormonal = events.some(e => ['medicamento', 'menopausa', 'hormonal'].includes(e));
        if (isHormonal) {
            currentScore += 10;
            activeReasons.push(`🔬 Desbalanço hormonal — Com esse método, você vai corrigir e ter mudanças incríveis!`);
        }

        // 7. Motivação Alta
        const motivation = answers['35'] as string || '';
        if (['muito', 'essencial'].includes(motivation)) {
            currentScore += 10;
            if (motivation === 'essencial') {
                activeReasons.push(`🔥 Determinação máxima — fator #1`);
            }
        }

        // Other Reasons (No score impact defined in prompt, but in reason list)
        // G. Metabolismo travado
        const metabolism = answers['13'] as string || '';
        if (metabolism === 'travado') {
            activeReasons.push(`🔓 Metabolismo travado — Vamos te ajudar a acelerar seu metabolismo!`);
        }

        // H. Foco barriga
        const bodyAreas = answers['10'] as string[] || [];
        if (bodyAreas.includes('barriga')) {
            activeReasons.push(`🔥 Barriga — primeira área a perder `);
        }

        // J. Rotina corrida
        const routine = answers['22'] as string || '';
        if (['agitada', 'trabalho_fora'].includes(routine)) {
            activeReasons.push(`⚡ Rotina corrida — Vou ajustar exatamente para sua rotina!`);
        }

        // Determine Percentile & Chance
        let percent = 9;
        let chance = 92;

        if (currentScore >= 85) { percent = 2; chance = 98; }
        else if (currentScore >= 75) { percent = 5; chance = 96; }
        else if (currentScore >= 65) { percent = 7; chance = 94; }
        else if (currentScore >= 55) { percent = 9; chance = 92; }
        else { percent = 9; chance = 90; } // Fallback ensures compliance

        // Select Top 3 Reasons
        // The prompt implies a priority order A->J. My activeReasons array is roughly in that order (Score ones first, then others).
        // I will take the first 3.
        const selectedReasons = activeReasons.slice(0, 3);

        // Fallback if less than 3 reasons (unlikely but possible)
        if (selectedReasons.length < 3) {
            if (!selectedReasons.some(r => r.includes('IMC'))) selectedReasons.push(`📊 IMC <span class="text-green-500 font-bold">${imc.toFixed(1)}</span> — analisado`);
            if (selectedReasons.length < 3) selectedReasons.push(`Perfil analisado — 100% compatível`);
        }

        return { score: currentScore, topPercent: percent, chanceSuccess: chance, reasons: selectedReasons.slice(0, 3) };
    }, [userData, answers]);

    return (
        <div className="text-center flex flex-col items-center max-w-md mx-auto pt-4">
            {/* LINHA 1: Ícone */}
            <div className="mb-4">
                <span className="text-[48px]">🎯</span>
            </div>

            {/* LINHA 2: VOCÊ ESTÁ NO TOP X% */}
            <h2 className="text-[26px] font-bold text-black leading-tight mb-1">
                VOCÊ ESTÁ NO <span className="text-[#10B981]">TOP {topPercent}%</span>
            </h2>

            {/* LINHA 3: Perfil de Alta Compatibilidade */}
            <p className="text-[16px] text-[#6B7280] font-normal mb-4">
                Seu perfil é semelhante a muitas mulheres que tiveram os melhores resultados!
            </p>

            {/* LINHA 4: Espaço 16px (handled by mb-4 above) */}

            {/* LINHAS 5-7: 3 Razões */}
            <div className="w-full space-y-2 mb-3 px-2">
                {reasons.map((reason, index) => (
                    <div
                        key={index}
                        className="text-left text-black text-[15px] leading-tight flex items-start"
                    >
                        <span dangerouslySetInnerHTML={{ __html: reason }} />
                    </div>
                ))}
            </div>

            {/* LINHA 8: Espaço 12px (handled by mb-3 above) */}

            {/* LINHA 9: Chance de sucesso */}
            <p className="text-[18px] text-black font-normal mb-8">
                Chance de sucesso: <span className="text-[#10B981] font-bold">{chanceSuccess}%</span>
            </p>

            {/* LINHA 10: Botão */}
            <div className="w-full px-4">
                <GamifiedCTAButton onClick={onNext} text="CONTINUAR MINHA JORNADA →" />
            </div>
        </div>
    );
};
