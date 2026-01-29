import React from 'react';

const TopBar = ({ balance, betAmount, setBetAmount, raceStatus }) => {
    return (
        <div className="w-full bg-white/10 backdrop-blur-md border-b border-white/20 p-4 flex justify-between items-center text-white shadow-lg sticky top-0 z-50">
            <div className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    At Simülasyonu
                </span>
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Bakiye</span>
                    <span className="text-2xl font-mono text-green-400 font-bold">
                        ${balance.toFixed(2)}
                    </span>
                </div>

                <div className="flex flex-col items-end">
                    <label className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                        Bahis Tutarı
                    </label>
                    <input
                        type="number"
                        min="1"
                        max={balance}
                        value={betAmount}
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                        disabled={raceStatus === 'racing'}
                        className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-right text-white w-32 focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
