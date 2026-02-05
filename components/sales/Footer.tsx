import React from 'react';
import { Shield, Lock } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-12 px-4">
            <div className="max-w-3xl mx-auto text-center">
                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 mb-8 text-gray-400">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">Ambiente 100% Seguro</span>
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-sm text-gray-500 font-medium">
                    <a href="#" className="hover:text-green-600 transition-colors">Termos de Uso</a>
                    <span className="text-gray-300">|</span>
                    <a href="#" className="hover:text-green-600 transition-colors">Política de Privacidade</a>
                </div>

                {/* Disclaimer */}
                <div className="mb-8">
                    <p className="text-xs text-gray-400 leading-relaxed max-w-2xl mx-auto">
                        Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook.
                        Fazemos todos os esforços para indicar claramente e mostrar todas as provas do produto e usar resultados reais.
                        Nós não vendemos suas informação para terceiros.
                        Jamais fazemos nenhum tipo de spam.
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-2xl mx-auto mt-4">
                        Os resultados podem variar de pessoa para pessoa.
                        As informações fornecidas neste site destinam-se ao seu conhecimento geral e não garantem um resultado específico.
                    </p>
                </div>

                {/* Copyright */}
                <div className="text-xs text-gray-400">
                    <p>&copy; 2019-{currentYear} Segredinho das Japonesas. Todos os direitos reservados.</p>
                    <p className="mt-2 text-[10px] text-gray-300">CNPJ: 00.000.000/0000-00</p>
                </div>
            </div>
        </footer>
    );
};
