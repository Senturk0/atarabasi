import React, { useEffect, useState } from 'react';

const ResultModal = ({ winner, profit, onReset }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Small delay to ensure animation plays
        const timer = setTimeout(() => setShow(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!winner) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`
        bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl transform transition-all duration-500
        flex flex-col items-center text-center
        ${show ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}
      `}>
                <div className="text-6xl mb-4">🏆</div>

                <h2 className="text-3xl font-bold text-white mb-2">
                    {winner.name} Kazandı!
                </h2>

                <div className="my-6 w-full bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Bahis Sonucu</p>
                    <p className={`text-4xl font-mono font-bold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
                    </p>
                </div>

                <button
                    onClick={onReset}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
                >
                    Sonraki Yarış
                </button>
            </div>
        </div>
    );
};

export default ResultModal;
