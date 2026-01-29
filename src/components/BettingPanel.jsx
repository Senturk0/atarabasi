import React from 'react';

const BettingPanel = ({ horses, selectedHorse, onSelectHorse, raceStatus }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {horses.map((horse) => (
                <div
                    key={horse.id}
                    onClick={() => raceStatus === 'idle' && onSelectHorse(horse.id)}
                    className={`
            relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 border
            ${selectedHorse === horse.id
                            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)] scale-105'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }
            ${raceStatus !== 'idle' ? 'opacity-75 cursor-not-allowed' : ''}
          `}
                >
                    {/* Silk Color Strip */}
                    <div className={`absolute top-0 left-0 w-2 h-full ${horse.color}`}></div>

                    <div className="ml-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-white">{horse.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-400">Güç:</span>
                                <div className="h-1.5 w-16 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${horse.power}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <span className="text-xs text-gray-400 block">Oran</span>
                            <span className={`text-2xl font-bold ${selectedHorse === horse.id ? 'text-yellow-400' : 'text-white'}`}>
                                {horse.odds.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {selectedHorse === horse.id && (
                        <div className="absolute top-2 right-2">
                            <span className="flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BettingPanel;
