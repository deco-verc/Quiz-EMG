'use client';

import React from 'react';

export const VSLPlayer = ({ onEnd }: { onEnd: () => void }) => {
    return (
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative group">
            {/* Placeholder for Video Player */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm mb-4 mx-auto group-hover:scale-110 transition-transform cursor-pointer">
                        <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-2" />
                    </div>
                    <p className="text-gray-400 text-sm">Vídeo Explicativo (5:00)</p>
                </div>
            </div>

            {/* Simulation Button for "Video End" */}
            <button
                onClick={onEnd}
                className="absolute bottom-4 right-4 text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded hover:bg-gray-700"
            >
                Simular Fim do Vídeo
            </button>
        </div>
    );
};
