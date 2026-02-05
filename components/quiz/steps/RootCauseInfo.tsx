'use client';

import React from 'react';
import { NextButton } from '../NextButton';
import { GamifiedCTAButton } from '@/components/ui/GamifiedCTAButton';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';

export const RootCauseInfo = ({ onNext }: { onNext: () => void }) => {
    const { userData } = useQuizStore();
    const firstName = userData?.name?.split(' ')[0] || 'Amiga';

    return (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h3 className="text-2xl font-bold text-black mb-6">
                <span className="text-green-600">{firstName}</span>, descobri 3 coisas CRÍTICAS sobre você:
            </h3>

            <div className="space-y-4 text-left bg-gray-50 p-6 rounded-2xl mb-8">
                <div className="flex items-start gap-3">
                    <div className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">1</div>
                    <p className="text-gray-700 text-sm">Seu metabolismo está <span className="font-bold text-red-500">bloqueado</span> e não queima gordura como deveria.</p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">2</div>
                    <p className="text-gray-700 text-sm">Seu corpo está em <span className="font-bold text-red-500">modo de alerta</span>, acumulando cada caloria que você ingere.</p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">3</div>
                    <p className="text-gray-700 text-sm">Você precisa de um <span className="font-bold text-green-600">reset metabólico</span> urgente para destravar a queima de gordura.</p>
                </div>
            </div>

            <GamifiedCTAButton onClick={onNext} />
        </motion.div>
    );
};
