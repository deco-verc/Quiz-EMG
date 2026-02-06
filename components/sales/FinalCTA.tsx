'use client';

import React from 'react';
import { ArrowRight, Check, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { RealCountdown } from './RealCountdown';

export const FinalCTA = () => {
    return (
        <section className="py-16 md:py-24 px-4 bg-white text-gray-900 text-center border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold mb-12 leading-tight text-gray-900">
                    Daqui a 60 dias, você vai olhar para trás e pensar em uma de duas coisas:
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <div className="bg-gray-50 p-8 rounded-2xl text-left border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">"Por que eu não consigo emagrecer?"</h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Continuar adiando, fazendo dietas e métodos que não funcionam vai continuar vendo o tempo passar sem resultados.
                        </p>
                    </div>
                    <div className="bg-green-50 p-8 rounded-2xl text-left shadow-lg shadow-green-900/5 transform md:-translate-y-4 border border-green-100">
                        <h3 className="text-xl font-bold text-green-700 mb-4">"Por que eu não comecei antes?"</h3>
                        <p className="text-green-800 text-base leading-relaxed">
                            Dar o primeiro passo agora e seguir um método comprovado que já transformou mais de 427k+ mulheres.
                        </p>
                    </div>
                </div>

                <p className="text-xl font-medium mb-10 text-gray-600 max-w-2xl mx-auto">
                    A escolha é sua, o método está aqui, pronto, esperando para te transformar.
                </p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 mb-8 max-w-xl mx-auto shadow-xl shadow-gray-200/50"
                >
                    <div className="mb-8">
                        <RealCountdown />
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className="text-gray-400 line-through text-xl font-medium">R$ 185</span>
                        <span className="text-6xl font-extrabold text-green-600 tracking-tight">R$ 47,90</span>
                    </div>

                    <a href="https://www.ggcheckout.com/checkout/v2/GHCIiLZmZ2CDKA6RelQa" className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold h-16 px-8 rounded-xl shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group mb-8">
                        QUERO MUDAR MINHA VIDA
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="bg-green-100 p-1 rounded-full">
                                <Check className="w-3 h-3 text-green-600" />
                            </div>
                            Acesso Imediato
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-green-100 p-1 rounded-full">
                                <Shield className="w-3 h-3 text-green-600" />
                            </div>
                            Garantia de 7 Dias
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-green-100 p-1 rounded-full">
                                <Check className="w-3 h-3 text-green-600" />
                            </div>
                            Pagamento Seguro
                        </div>
                    </div>
                </motion.div>

                <p className="text-gray-400 text-sm hover:text-gray-600 transition-colors">
                    Dúvidas? Nos chame no email entregainfoprodutores@gmail.com
                </p>
            </div>
        </section>
    );
};
