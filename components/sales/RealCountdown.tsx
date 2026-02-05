'use client';

import React, { useState, useEffect } from 'react';

export const RealCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const midnight = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                23, 59, 59
            );

            const difference = midnight.getTime() - now.getTime();

            if (difference > 0) {
                return {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return { hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 text-center max-w-[500px] mx-auto mb-6">
            <span className="text-3xl block mb-2">⏰</span>
            <h3 className="text-[#991B1B] font-bold text-base uppercase tracking-wide mb-4 font-poppins">
                OFERTA ESPECIAL DE ANIVERSÁRIO EXPIRA EM:
            </h3>

            <div className="flex justify-center gap-4 mb-4">
                <div className="flex flex-col items-center">
                    <div className="bg-white border-2 border-red-500 rounded-lg p-3 min-w-[60px] md:min-w-[70px]">
                        <span className="text-[#EF4444] font-bold text-2xl md:text-3xl leading-none font-poppins">
                            {formatNumber(timeLeft.hours)}
                        </span>
                    </div>
                    <span className="text-[#991B1B] font-medium text-[10px] uppercase mt-1 font-poppins">Horas</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="bg-white border-2 border-red-500 rounded-lg p-3 min-w-[60px] md:min-w-[70px]">
                        <span className="text-[#EF4444] font-bold text-2xl md:text-3xl leading-none font-poppins">
                            {formatNumber(timeLeft.minutes)}
                        </span>
                    </div>
                    <span className="text-[#991B1B] font-medium text-[10px] uppercase mt-1 font-poppins">Min</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="bg-white border-2 border-red-500 rounded-lg p-3 min-w-[60px] md:min-w-[70px]">
                        <span className="text-[#EF4444] font-bold text-2xl md:text-3xl leading-none font-poppins">
                            {formatNumber(timeLeft.seconds)}
                        </span>
                    </div>
                    <span className="text-[#991B1B] font-medium text-[10px] uppercase mt-1 font-poppins">Seg</span>
                </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed font-poppins">
                Após esse horário, o investimento volta para R$ 197 (preço normal).<br />
                Esta é sua única chance de garantir por <span className="text-[#10B981] font-bold">R$ 47,90</span>.
            </p>
        </div>
    );
};
