import React from 'react';

const Podium = ({ winners }) => {
    // winners array: [1st, 2nd, 3rd]
    if (!winners || winners.length < 3) return null;

    return (
        <div className="flex justify-center items-end space-x-4 h-48 mb-8">
            {/* 2nd Place */}
            <div className="flex flex-col items-center w-24">
                <div className="text-gray-300 font-bold mb-2 text-center text-sm">{winners[1].name}</div>
                <div className="w-full h-24 bg-gradient-to-t from-gray-400 to-gray-200 rounded-t-lg shadow-lg flex items-center justify-center border-t border-white/50 relative">
                    <span className="text-3xl font-bold text-gray-700">2</span>
                    <div className={`absolute -top-6 w-12 h-12 rounded-full border-4 border-gray-300 ${winners[1].color} shadow-lg`} />
                </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center w-28">
                <div className="text-yellow-300 font-bold mb-2 text-center text-lg">{winners[0].name}</div>
                <div className="w-full h-32 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-lg shadow-xl flex items-center justify-center border-t border-white/50 relative z-10">
                    <span className="text-5xl font-bold text-yellow-800">1</span>
                    <div className={`absolute -top-8 w-16 h-16 rounded-full border-4 border-yellow-300 ${winners[0].color} shadow-xl flex items-center justify-center`}>
                        <span className="text-2xl">🏆</span>
                    </div>
                </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center w-24">
                <div className="text-orange-300 font-bold mb-2 text-center text-sm">{winners[2].name}</div>
                <div className="w-full h-16 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-lg shadow-lg flex items-center justify-center border-t border-white/50 relative">
                    <span className="text-3xl font-bold text-orange-900">3</span>
                    <div className={`absolute -top-6 w-12 h-12 rounded-full border-4 border-orange-400 ${winners[2].color} shadow-lg`} />
                </div>
            </div>
        </div>
    );
};

export default Podium;
