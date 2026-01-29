import React from 'react';

const RaceTrack = ({ horses }) => {
    return (
        <div className="w-full bg-gray-900/50 backdrop-blur rounded-2xl p-6 border border-white/10 shadow-inner">
            <div className="flex flex-col space-y-4">
                {horses.map((horse) => (
                    <div key={horse.id} className="relative group">
                        {/* Lane Markers */}
                        <div className="absolute inset-x-0 top-1/2 h-px bg-white/5 z-0 group-hover:bg-white/10 transition-colors"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-red-500/30 z-0"></div> {/* Finish Line */}

                        <div className="relative z-10 flex items-center h-12">
                            {/* Horse & Jockey Avatar/Icon */}
                            <div
                                className="absolute transition-all duration-300 ease-linear flex flex-col items-center"
                                style={{ left: `${Math.min(horse.progress, 96)}%` }} // Cap at 96% to keep inside
                            >
                                <div className={`p-1.5 rounded-full ${horse.color} shadow-lg shadow-${horse.color.split('-')[1]}-500/50 transform -translate-y-1/2`}>
                                    <span className="text-xl filter drop-shadow">🐎</span>
                                </div>
                                {/* Tooltip on hover or racing */}
                                <span className="text-[10px] text-white/50 bg-black/50 px-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {horse.name}
                                </span>
                            </div>

                            {/* Progress Trail (Optional - styling pref) */}
                            <div
                                className={`h-0.5 rounded-full opacity-30 ${horse.color}`}
                                style={{ width: `${horse.progress}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Finish Line Label */}
            <div className="flex justify-between text-xs text-gray-500 mt-2 px-2 font-mono">
                <span>START</span>
                <span className="text-red-400">FINISH</span>
            </div>
        </div>
    );
};

export default RaceTrack;
