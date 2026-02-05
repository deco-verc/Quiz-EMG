'use client';

import React from 'react';
import { Check } from 'lucide-react';

export const WhoIsDra = () => {
    return (
        <section className="py-16 px-4 bg-[#F9FAFB]">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                        QUEM É A NUTRÓLOGA?
                    </h2>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-100 mb-4 shadow-md">
                            <img
                                src="https://i.imgur.com/wpkseiG.png"
                                alt="Dra. Carolina Mendes"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Dra. Carolina Mendes</h3>
                        <p className="text-green-600 font-medium">Nutróloga Especializada</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                                <Check className="w-3 h-3 text-green-700" strokeWidth={3} />
                            </div>
                            <p className="text-gray-700 text-sm text-left">
                                15 anos de experiência em emagrecimento saudável
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                                <Check className="w-3 h-3 text-green-700" strokeWidth={3} />
                            </div>
                            <p className="text-gray-700 text-sm text-left">
                                Ajudou mais de 427.000 mulheres a transformarem seus corpos
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                                <Check className="w-3 h-3 text-green-700" strokeWidth={3} />
                            </div>
                            <p className="text-gray-700 text-sm text-left">
                                Especialista em metabolismo feminino e reequilíbrio hormonal
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                                <Check className="w-3 h-3 text-green-700" strokeWidth={3} />
                            </div>
                            <p className="text-gray-700 text-sm text-left">
                                Desenvolveu o Segredinho das Japonesas após ver que métodos tradicionais e genéricos falhavam com 94% das pacientes
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
