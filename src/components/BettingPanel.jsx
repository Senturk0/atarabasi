import React from 'react';

const BettingPanel = ({ horses, selectedHorse, onSelectHorse, raceStatus, betType, setBetType, targetRank, setTargetRank }) => {

    const BET_TYPES = [
        { id: 'WIN', label: 'Ganyan (1. Gelir)' },
        { id: 'PLACE', label: 'Plase (İlk 2)' },
        { id: 'RANK', label: 'Sıralama (Tam Sıra)' }
    ];

    return (
        <div className="space-y-4">
            {/* Bet Type Selector */}
            <div className="flex space-x-2 bg-gray-800 p-2 rounded-lg">
                {BET_TYPES.map(type => (
                    <button
                        key={type.id}
                        onClick={() => raceStatus === 'idle' && setBetType(type.id)}
                        className={`flex-1 py-2 rounded-md font-bold text-sm transition-all ${betType === type.id
                                ? 'bg-yellow-500 text-black shadow'
                                : 'text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        {type.label}
                    </button>
                ))}
            </div>

            {/* Target Rank Selector (Only for RANK bet) */}
            {betType === 'RANK' && (
                <div className="flex items-center justify-center space-x-4 bg-gray-800/50 p-4 rounded-lg border border-white/5">
                    <label className="text-gray-300">Hedef Sıralama:</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5, 6].map(rank => (
                            <button
                                key={rank}
                                onClick={() => setTargetRank(rank)}
                                className={`w-10 h-10 rounded-full font-bold transition-all ${targetRank === rank
                                        ? 'bg-blue-500 text-white scale-110 shadow-lg'
                                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                            >
                                {rank}.
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Horse Grid */}
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
                                <span className="text-xs text-gray-400 block px-1">
                                    {betType === 'WIN' ? 'Ganyan' : betType === 'PLACE' ? 'Plase' : `${targetRank}. Sıra`}
                                </span>
                                <span className={`text-2xl font-bold ${selectedHorse === horse.id ? 'text-yellow-400' : 'text-white'}`}>
                                    {betType === 'WIN' && horse.odds?.win.toFixed(2)}
                                    {betType === 'PLACE' && horse.odds?.place.toFixed(2)}
                                    {betType === 'RANK' && horse.odds?.rank.toFixed(2)}
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
        </div>
    );
};

export default BettingPanel;
