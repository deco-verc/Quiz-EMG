import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizState {
    currentStep: number;
    totalSteps: number;
    answers: Record<string, any>;
    badges: string[];
    xp: number;
    userData: {
        name: string;
        gender: string;
        age: string;
        weight: number;
        height: number;
        targetWeight: number;
        bmi: number;
        [key: string]: any;
    };

    // Actions
    setAnswer: (key: string, value: any) => void;
    addBadge: (badge: string) => void;
    addXp: (amount: number) => void;
    setUserData: (data: Partial<QuizState['userData']>) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
    persist(
        (set) => ({
            currentStep: 1,
            totalSteps: 40,
            answers: {},
            badges: [],
            xp: 0,
            userData: {
                name: '',
                gender: '',
                age: '',
                weight: 65,
                height: 160,
                targetWeight: 60,
                bmi: 0,
            },

            setAnswer: (key, value) =>
                set((state) => ({
                    answers: { ...state.answers, [key]: value },
                })),
            addBadge: (badge) =>
                set((state) => ({
                    badges: [...state.badges, badge],
                })),
            addXp: (amount) =>
                set((state) => ({
                    xp: state.xp + amount,
                })),
            setUserData: (data) =>
                set((state) => ({
                    userData: { ...state.userData, ...data },
                })),
            nextStep: () =>
                set((state) => ({
                    currentStep: Math.min(state.currentStep + 1, state.totalSteps),
                })),
            prevStep: () =>
                set((state) => ({
                    currentStep: Math.max(state.currentStep - 1, 1),
                })),
            goToStep: (step) => set({ currentStep: step }),
            resetQuiz: () =>
                set({
                    currentStep: 1,
                    answers: {},
                    userData: {
                        name: '',
                        gender: '',
                        age: '',
                        weight: 70,
                        height: 165,
                        targetWeight: 60,
                        bmi: 0,
                    },
                }),
        }),
        {
            name: 'quiz-storage',
        }
    )
);
