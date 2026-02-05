'use client';

import { MethodComparisonChart } from '@/components/ui/Charts';
import { GamifiedCTAButton } from '@/components/ui/GamifiedCTAButton';

export const ScientificMethod = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-4">
                O Segredinho das Japonesas é um método comprovado cientificamente
            </h2>

            <p className="text-black font-bold mb-6">
                Essa bebidinha com ingredientes naturais acelera seu metabolismo, te da saciedade, limpa seu organismo e regula sua microbiota intestinal.
            </p>

            <div className="mb-6">
                <MethodComparisonChart />
            </div>

            <p className="text-black font-bold mb-8">
                Uma combinação de ingredientes naturais que imita os efeitos das Canetas Emagrecedoras, mas de forma natural e sem efeitos colaterais.
            </p>

            <GamifiedCTAButton onClick={onNext} />
        </div>
    );
};
