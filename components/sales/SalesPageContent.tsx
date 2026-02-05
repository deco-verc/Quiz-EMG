'use client';

import React from 'react';
import { HeroCTA } from './HeroCTA';
import { QuizRecap } from './QuizRecap';
import { ComparisonTable } from './ComparisonTable';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { OfferBundle } from './OfferBundle';
import { HowItWorks } from './HowItWorks';
import { WhoIsDra } from './WhoIsDra';
import { SocialProof } from './SocialProof';
import { Guarantee } from './Guarantee';
import { DynamicFAQ } from './DynamicFAQ';
import { FinalCTA } from './FinalCTA';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import { Footer } from './Footer';

export const SalesPageContent = () => {
    return (
        <div className="bg-white">
            <HeroCTA />
            <QuizRecap />
            <ComparisonTable />
            <BeforeAfterSlider />
            <OfferBundle />
            <HowItWorks />
            <WhoIsDra />
            <SocialProof />
            <Guarantee />
            <DynamicFAQ />
            <FinalCTA />
            <Footer />
            <MobileStickyCTA />
        </div>
    );
};
