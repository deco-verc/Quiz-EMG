'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileStickyCTAProps {
    price?: string;
    buttonText?: string;
    onCTAClick?: () => void;
}

export const MobileStickyCTA = ({
    price = 'R$ 47,90',
    buttonText = 'Comprar com Desconto',
    onCTAClick
}: MobileStickyCTAProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky CTA after scrolling 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        if (onCTAClick) {
            onCTAClick();
        } else {
            // Default behavior: scroll to checkout
            const checkoutSection = document.getElementById('checkout');
            if (checkoutSection) {
                checkoutSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed top-0 left-0 right-0 z-50 md:hidden"
                >
                    <div className="bg-white border-t-2 border-gray-200 shadow-2xl p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-medium">Apenas hoje</span>
                                <span className="text-2xl font-bold text-[#10B981]">{price}</span>
                            </div>
                            <motion.button
                                onClick={handleClick}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-base font-bold py-3 px-6 rounded-xl shadow-lg shadow-green-500/30 transition-all"
                            >
                                {buttonText}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
