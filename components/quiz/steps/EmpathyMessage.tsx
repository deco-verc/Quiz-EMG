'use client';

import React, { useState, useRef, useEffect } from 'react';
import { NextButton } from '../NextButton';
import { Play, Pause, Mic } from 'lucide-react';
import { useQuizStore } from '@/store/quizStore';
import { useRouter } from 'next/navigation';

export const EmpathyMessage = ({ onNext }: { onNext: () => void }) => {
    const { userData } = useQuizStore();
    const firstName = userData?.name?.split(' ')[0] || 'Amiga';
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [canContinue, setCanContinue] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const setAudioData = () => {
                setDuration(audio.duration);
            };

            const setAudioTime = () => {
                setCurrentTime(audio.currentTime);
            };

            const handleEnded = () => {
                setIsPlaying(false);
                setCurrentTime(0);
            };

            audio.addEventListener('loadedmetadata', setAudioData);
            audio.addEventListener('timeupdate', setAudioTime);
            audio.addEventListener('ended', handleEnded);

            return () => {
                audio.removeEventListener('loadedmetadata', setAudioData);
                audio.removeEventListener('timeupdate', setAudioTime);
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, []);

    // 60 seconds timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setCanContinue(true);
        }
    }, [timeLeft]);

    const handleNext = () => {
        onNext();
    };

    return (
        <div className="text-center max-w-2xl mx-auto pb-48">
            <h2 className="text-2xl font-bold text-black mb-8 px-4">
                {firstName}, você é especial, e eu vou te explicar o porque nesse audio.
            </h2>

            {/* WhatsApp Style Audio Player */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 w-full max-w-sm mx-auto mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                        <img
                            src="https://i.imgur.com/wpkseiG.png"
                            alt="Dra. Carolina"
                            className="w-full h-full object-cover"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-bold text-black">Dra. Carolina Mendes</p>
                        <p className="text-xs text-gray-500">Áudio • 0:30</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-[#f0f2f5] p-3 rounded-xl w-full">
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-gray-600 hover:bg-gray-400 transition-colors flex-shrink-0"
                    >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                    </button>

                    <div className="flex-1 min-w-0">
                        <div className="h-1 bg-gray-300 rounded-full overflow-hidden w-full">
                            <div
                                className="h-full bg-green-500 transition-all duration-100"
                                style={{ width: `${(currentTime / (duration || 45)) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="relative flex-shrink-0">
                        <Mic className={`w-5 h-5 ${isPlaying ? 'text-green-500' : 'text-gray-400'}`} />
                    </div>
                </div>

                <div className="flex justify-between px-1 mt-1">
                    <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
                    <span className="text-xs text-gray-500">0:30</span>
                </div>

                {/* Hidden Audio Element */}
                <audio ref={audioRef} src="/audios/recado_dra.mp3" />
            </div>

            {canContinue ? (
                <NextButton onClick={handleNext}>
                    CONTINUAR
                </NextButton>
            ) : (
                <div className="bg-gray-100 text-gray-400 font-bold py-4 px-8 rounded-xl cursor-not-allowed inline-block w-full max-w-xs">
                    LIBERANDO EM {timeLeft}s
                </div>
            )}
        </div>
    );
};
