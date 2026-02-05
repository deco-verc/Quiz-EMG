'use client';

import React from 'react';
import { Download, BookOpen, TrendingUp } from 'lucide-react';

export const HowItWorks = () => {
    return (
        <section className="py-16 px-4 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                        COMO FUNCIONA (3 PASSOS SIMPLES)
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Download className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">ACESSE AGORA</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Receba tudo no seu e-mail em 1 Minuto.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">SIGA O PROTOCOLO</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Nos próximos 60 dias você vai ter acesso a tudo que precisa para atingir sua meta.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">VEJA OS RESULTADOS</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Em poucos dias você verá resultados reais e duradouros.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
