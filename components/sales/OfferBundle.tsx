'use client';

import React from 'react';
import { Check, Gift, Lock, Smartphone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';

export const OfferBundle = () => {
    const { userData } = useQuizStore();

    return (
        <section className="py-16 md:py-24 px-4 bg-gray-50">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10 leading-tight">
                    {userData.name ? `${userData.name}, ` : ''}Tudo que você vai ter acesso:
                </h2>

                <div className="space-y-4 mb-8">
                    <ListItem label="Segredinho das Japonesas" price="R$ 97" sub="Bebidinha com ingredientes naturais e fáceis de achar, com dosagem ideal para o seu corpo perder gordura." />
                    <ListItem label="Acompanhador de Medidas" price="R$ 17" sub="Acompanhe sua evolução corporal de 7 dias a 60 dias com nosso aplicativo interativo." />
                </div>

                <div className="bg-amber-50/50 rounded-3xl p-6 md:p-8 border border-amber-100 mb-10">
                    <h3 className="text-lg font-bold text-amber-700 mb-6 flex items-center gap-2 justify-center uppercase tracking-wide">
                        <Gift className="w-5 h-5" />
                        BÔNUS EXCLUSIVOS (APENAS HOJE):
                    </h3>

                    <div className="space-y-4">
                        <ListItem label="Guia da Saúde Intestinal" price="R$ 37" sub="Nunca mais tenha intestino travado ou inchaço abdominal" bonus />
                        <ListItem label="Protocolo Anti-Compulsão" price="R$ 17" sub="Saiba exatamente o que fazer quando seu corpo pede por doces" bonus />
                        <ListItem label="Cardápio de 100 Receitas Seca-Barriga" price="R$ 17" sub="Emagreça comendo o que você gosta (Inclui Doces, Salgados, Café da Manhã até janta)" bonus />
                    </div>
                </div>

                <div className="bg-white px-6 py-4 rounded-xl border border-gray-200 mb-10 flex justify-between items-center shadow-sm">
                    <span className="font-bold text-gray-600">Valor Total:</span>
                    <span className="line-through text-gray-400 font-bold text-lg">R$ 185</span>
                </div>

                <div className="relative mb-10">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-gray-50 px-4 text-sm text-gray-500 font-medium">Mas você não vai pagar isso{userData.name ? `, ${userData.name}` : ''}</span>
                    </div>
                </div>



                <div className="text-center mb-10 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden max-w-md mx-auto">
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider shadow-md">
                        84% OFF
                    </div>

                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-4">Vai pagar apenas:</p>

                    <div className="flex flex-col items-center justify-center gap-0 mb-4">
                        <span className="text-6xl font-extrabold text-green-600 tracking-tight">R$ 47,90</span>
                    </div>

                    <p className="text-green-700 font-bold text-sm bg-green-50 inline-block px-4 py-1.5 rounded-lg mb-6">
                        Você economiza R$ 137,00
                    </p>

                    <div className="flex flex-row items-center justify-center gap-4 mb-8 w-full">
                        <FeatureItem icon={<Zap className="w-5 h-5 text-green-500" />} text="Acesso Imediato" />
                        <FeatureItem icon={<Smartphone className="w-5 h-5 text-green-500" />} text="100% Digital" />
                        <FeatureItem icon={<Lock className="w-5 h-5 text-green-500" />} text="Compra Segura" />
                    </div>

                    <a href="https://www.ggcheckout.com/checkout/v2/GHCIiLZmZ2CDKA6RelQa" className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold h-16 px-8 rounded-xl shadow-lg shadow-green-500/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center">
                        COMPRAR COM DESCONTO
                    </a>

                    <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-3 h-3" />
                        Pagamento Único. Sem Mensalidades.
                    </p>
                </div>
            </div>
        </section>
    );
};

const ListItem = ({ label, price, sub, bonus }: any) => (
    <div className={`p-5 rounded-xl border shadow-sm transition-all hover:shadow-md ${bonus ? 'bg-white border-amber-100' : 'bg-white border-gray-100'}`}>
        <div className="flex items-start gap-4">
            <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${bonus ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-4">
                    <p className="font-bold text-gray-900 text-base leading-tight">{label}</p>
                    <span className={`font-bold text-base whitespace-nowrap ${bonus ? 'text-amber-600' : 'text-gray-900'}`}>
                        {price}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{sub}</p>
            </div>
        </div>
    </div>
);

const FeatureItem = ({ icon, text }: any) => (
    <div className="flex flex-col items-center justify-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
        {icon}
        <span className="font-bold text-gray-700 text-[10px] md:text-xs text-center leading-tight">{text}</span>
    </div>
);
