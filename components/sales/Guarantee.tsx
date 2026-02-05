'use client';

import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

export const Guarantee = () => {
    return (
        <section className="py-16 md:py-24 px-4 bg-gray-50 border-t border-gray-100">
            <div className="max-w-2xl mx-auto text-center">
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-green-100 border border-green-50">
                        <ShieldCheck className="w-10 h-10 text-green-500" />
                    </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                    Você não precisa decidir agora. Só precisa experimentar.
                </h2>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Se em 7 dias você não ver suas — <span className="font-bold text-gray-900">roupas mais folgadas, mais energia, menos inchaço</span> — eu devolvo todo o seu dinheiro.
                </p>

                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                    Basta apenas <span className="font-bold text-gray-900">um e-mail.</span>
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Sem perguntas</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Sem burocracia</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
