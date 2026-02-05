'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQ = () => {
    return (
        <section className="py-16 md:py-24 px-4 bg-white">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
                    Perguntas Frequentes
                </h2>

                <div className="space-y-4">
                    <FAQItem
                        question="Como funciona o acesso ao Segredinho das Japonesas?"
                        answer="Assim que o pagamento for confirmado, você receberá um e-mail com seu login e senha. O acesso é imediato e vitalício, você pode acessar quando quiser, de qualquer dispositivo."
                    />
                    <FAQItem
                        question="Preciso fazer exercícios pesados?"
                        answer="Não! O Segredinho das Japonesas foca na alimentação. Os exercícios são opcionais e leves (15 minutos), apenas para acelerar os resultados."
                    />
                    <FAQItem
                        question="E se eu não gostar ou não funcionar pra mim?"
                        answer="Você tem 7 dias de garantia total. Se não ver resultados, basta enviar um e-mail e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia."
                    />
                    <FAQItem
                        question="As receitas são complicadas?"
                        answer="Não! Todas as receitas são simples, com ingredientes que você encontra em qualquer mercado ou tem em casa. A maioria leva menos de 20 minutos para preparar."
                    />
                    <FAQItem
                        question="Funciona para quem tem mais de 40 anos?"
                        answer="Sim! O Segredinho das Japonesas foi criado justamente pensando em mulheres com metabolismo mais lento. Mais de 60% das nossas alunas têm mais de 40 anos."
                    />
                </div>
            </div>
        </section>
    );
};

const FAQItem = ({ question, answer }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:border-gray-300 hover:shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 text-left bg-white"
            >
                <span className={`font-bold text-base pr-4 ${isOpen ? 'text-green-600' : 'text-gray-900'}`}>{question}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-green-600' : 'text-gray-500'}`}
                    />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-5 pb-5 pt-0">
                            <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
