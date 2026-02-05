'use client';

import React from 'react';
import { Star, Filter, Check } from 'lucide-react';
import { useQuizStore } from '@/store/quizStore';

export const SocialProof = () => {
    const { userData, answers } = useQuizStore();

    // Fallbacks and Calculations
    const ageRange = answers[2] || '30-49';
    const currentWeight = userData.weight || 70;
    const targetWeight = userData.targetWeight || 60;
    const metaKg = Math.max(0, currentWeight - targetWeight).toFixed(1);

    // Convert age range to display format
    const ageDisplay = ageRange === '18-29' ? '25-35 anos'
        : ageRange === '30-49' ? '30-40 anos'
            : ageRange === '50-59' ? '45-55 anos'
                : '50+ anos';

    // Infer routine or use generic
    const routine = "Rotina Corrida";

    return (
        <section className="py-16 md:py-24 px-4 bg-white border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3 uppercase">
                        <span className="text-3xl"></span> {userData.name ? `${userData.name}, ` : ''}MULHERES SEMELHANTES A VOCÊ
                    </h2>

                    <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-6 py-2 text-sm text-gray-600 font-medium shadow-sm">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <span>Filtro aplicado: <span className="text-gray-900 font-bold">{ageDisplay}</span> | Meta <span className="text-gray-900 font-bold">{metaKg}kg</span> | <span className="text-gray-900 font-bold">{routine}</span></span>
                    </div>

                    <p className="mt-6 text-gray-600 text-lg">Veja quem tem <span className="font-bold text-gray-900 bg-yellow-100 px-1">SEU PERFIL</span> e conseguiu:</p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Carolina M. */}
                    <TestimonialCard
                        image="https://i.imgur.com/zuHAXt7.jpeg"
                        quote="Eu também achava impossível aos 34 anos com rotina corrida. Mas perdi 11kg em 30 dias. Meu marido não acredita que sou a mesma pessoa!"
                        name="Carolina M."
                        age={34}
                        location="São Paulo"
                        details="Rotina: Trabalha fora, 2 filhos"
                        result="-11kg em 30 dias"
                    />

                    {/* Card 2: Juliana S. */}
                    <TestimonialCard
                        image="https://i.imgur.com/jSxfNJx.jpeg"
                        quote="Também tinha tentado 5 dietas antes. Achei que era problema meu. Mas era o MÉTODO que estava errado. -9kg!"
                        name="Juliana S."
                        age={36}
                        location="Rio de Janeiro"
                        details="Tentativas anteriores: 5 métodos"
                        result="-9kg em 28 dias"
                    />

                    {/* Card 3: Fernanda L. */}
                    <TestimonialCard
                        image="https://i.imgur.com/TuiZoEL.jpeg"
                        quote="Com 32 anos e metabolismo travado, pensei que seria impossível. Este protocolo destravou TUDO. -10kg!"
                        name="Fernanda L."
                        age={32}
                        location="BH"
                        details="Problema: Metabolismo lento"
                        result="-10kg em 42 dias"
                    />

                    {/* Card 4: Patrícia D. */}
                    <TestimonialCard
                        image="https://i.imgur.com/F0o26HC.jpeg"
                        quote="Depois dos 35, nada funcionava. Tentei de tudo. Com o protocolo, eliminei 8kg sem passar fome e minha energia voltou!"
                        name="Patrícia D."
                        age={38}
                        location="Curitiba"
                        details="Metabolismo lento, mãe de 2"
                        result="-8kg em 40 dias"
                    />
                </div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ image, quote, name, age, location, details, result }: any) => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
        <div className="p-5 flex-grow flex flex-col">
            <div className="flex text-yellow-400 mb-4 gap-0.5">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>

            <div className="mb-5 rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 relative group">
                <img src={image} alt="Antes e Depois" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">Resultado Real</div>
            </div>

            <p className="text-gray-700 italic text-[15px] mb-6 leading-relaxed flex-grow">
                "{quote}"
            </p>

            <div className="border-t border-gray-100 pt-4 mt-auto">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="font-bold text-gray-900 text-sm">{name}</p>
                        <p className="text-xs text-gray-500">{age} anos, {location}</p>
                    </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 bg-gray-50 p-2 rounded border border-gray-100">
                    <span className="font-semibold">Perfil:</span> {details}
                </p>

                <div className="bg-green-50 text-green-700 text-sm font-bold px-3 py-2.5 rounded-xl flex items-center gap-2 border border-green-100">
                    <div className="bg-green-200 rounded-full p-0.5">
                        <Check className="w-3 h-3 text-green-700" strokeWidth={3} />
                    </div>
                    {result}
                </div>
            </div>
        </div>
    </div>
);
