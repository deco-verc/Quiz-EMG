
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

type GTagEvent = {
    action: string;
    category: string;
    label: string;
    value?: number;
};

export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

export const event = ({ action, category, label, value }: GTagEvent) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    } else {
        // Log to console in dev mode or if GA is not loaded
        if (process.env.NODE_ENV === 'development') {
            console.log(`[GA Event]: ${action}`, { category, label, value });
        }
    }
};

export const trackQuizStep = (stepNumber: number, stepName: string) => {
    // Pad step number for sorting
    const paddedStep = stepNumber.toString().padStart(2, '0');

    event({
        action: 'view_step',
        category: 'Quiz Flow',
        label: `Step ${paddedStep} - ${stepName}`,
        value: stepNumber
    });
};
