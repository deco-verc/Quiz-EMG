'use client';

import React, { useState, useEffect } from 'react';
import { GamifiedCTAButton } from '@/components/ui/GamifiedCTAButton';
import { motion, AnimatePresence } from 'framer-motion';

import { useQuizStore } from '@/store/quizStore';

const testimonials = [
    {
        image: "https://i.imgur.com/5kFmrl0.jpeg",
        name: "Maria Santos, 36 anos",
        location: "São Paulo",
        quote: "Me sinto mais nova, uso aquelas roupas que não cabiam mais, meu marido hoje pede pra namorar todo diaaaa, eu nem sei oque dizer, foi um alívio muito grande.",
        result: "-11kg em 30 dias"
    },
    {
        image: "https://i.imgur.com/oA5WoG9.jpeg",
        name: "Ana Paula Sobreira, 35 anos",
        location: "Rio de Janeiro",
        quote: "Depois de 3 filhos, eu achava que nunca mais conseguiria ter aquele meu corpinho de volta, Mas nesses 2 meses, perdi 10kg, minhas amigas ficaram morrendo de inveja, os homens não param de ficar me olhando Carol mulher eu te agradeço INFINITAMENTE!",
        result: "-10kg em 2 meses"
    },
    {
        image: "https://i.imgur.com/jkxdPyL.jpeg",
        name: "Carla Mendes, 32 anos",
        location: "Belo Horizonte",
        quote: "Perdi 13kg em 45 dias sem passar fome, não sei que mágica tem nessa bebidinha mas sinceramente, não troco mais POR NADA! Avisa a Dra que eu to muito feliz usando minhas roupas pp",
        result: "-13kg em 45 dias"
    }
];

export const RealStories = ({ onNext }: { onNext: () => void }) => {
    const { userData } = useQuizStore();
    const firstName = userData?.name?.split(' ')[0] || 'Amiga';
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000); // 6 seconds delay
        return () => clearInterval(interval);
    }, []);

    const current = testimonials[currentIndex];

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-6">
                Aqui estão 3 transformações das nossas pacientes.
            </h2>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg border border-gray-100 mb-6 aspect-[4/5]">
                        <img
                            src={current.image}
                            alt={`Transformação ${currentIndex + 1}`}
                            className="w-full h-full object-cover"
                            loading="eager"
                        />
                    </div>

                    <div className="flex justify-center mb-2 text-yellow-warn text-xl">⭐⭐⭐⭐⭐</div>

                    <p className="font-bold text-lg text-black">{current.name} — {current.location}</p>

                    <p className="italic text-black font-bold mb-4 text-sm px-4">
                        "{current.quote}"
                    </p>

                    <p className="text-green-500 font-bold text-2xl mb-8">{current.result}</p>
                </motion.div>
            </AnimatePresence>

            <GamifiedCTAButton onClick={onNext} />
        </div>
    );
};
