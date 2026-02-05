'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { MoveHorizontal } from 'lucide-react';

export const BeforeAfterSlider = () => {
    const { answers, userData } = useQuizStore();
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mapeamento das imagens baseado na resposta do Step 5
    const bodyType = answers[5] as string || 'levemente'; // Fallback para levemente

    const beforeImages: Record<string, string> = {
        'levemente': 'https://i.imgur.com/pUBWZEg.png',
        'moderadamente': 'https://i.imgur.com/DZ5Uyop.png',
        'muito': 'https://i.imgur.com/BSSBFzD.png',
        'obesidade': 'https://i.imgur.com/eWisbt1.jpeg'
    };

    const beforeImage = beforeImages[bodyType] || beforeImages['levemente'];
    const afterImage = 'https://i.imgur.com/qb7lwvK.png';

    const handleMove = (event: MouseEvent | TouchEvent) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;

        const position = ((clientX - containerRect.left) / containerRect.width) * 100;
        setSliderPosition(Math.min(Math.max(position, 0), 100));
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <section className="py-12 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 uppercase">
                        {userData.name ? `${userData.name}, ` : ''}SUA TRANSFORMAÇÃO VISUAL
                    </h2>
                    <p className="text-gray-600">
                        Arraste para ver o resultado esperado em 60 dias
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full aspect-[3/4] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl border-4 border-white"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                >
                    {/* Imagem Depois (Fundo) */}
                    <img
                        src={afterImage}
                        alt="Depois"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                        className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg transition-opacity duration-300"
                        style={{ opacity: sliderPosition > 90 ? 0 : 1 }}
                    >
                        DEPOIS (60 DIAS)
                    </div>

                    {/* Imagem Antes (Sobreposta com clip-path) */}
                    <div
                        className="absolute inset-0 w-full h-full overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                        <img
                            src={beforeImage}
                            alt="Antes"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div
                            className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg transition-opacity duration-300"
                            style={{ opacity: sliderPosition < 10 ? 0 : 1 }}
                        >
                            HOJE
                        </div>
                    </div>

                    {/* Linha Divisória e Manipulador */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-green-600">
                            <MoveHorizontal size={20} />
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100 text-sm font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Resultado projetado para o seu perfil
                    </div>
                </div>
            </div>
        </section>
    );
};
