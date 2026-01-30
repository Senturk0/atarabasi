import React, { useEffect, useState } from 'react';
import Podium from './Podium';

const ResultModal = ({ winners, profit, onReset, betDetails }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Small delay to ensure animation plays
        const timer = setTimeout(() => setShow(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!winners || winners.length === 0) return null;
    const winner = winners[0];

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`
        bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl transform transition-all duration-500
        flex flex-col items-center text-center
        ${show ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}
      `}>
                <h2 className="text-3xl font-bold text-white mb-6">
                    Yarış Sonucu
                </h2>

                {/* Podium for Top 3 */}
                <Podium winners={winners.slice(0, 3)} />

                <div className="my-4 w-full bg-gray-800 rounded-lg p-4 border border-white/5">
                    <p className="text-gray-400 text-sm mb-1 uppercase tracking-wide">Bahis Detayı</p>
                    <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
                        <span>Seçilen At: <span className="text-white font-bold">{betDetails.horseName}</span></span>
                        <span>Tür: <span className="text-yellow-400 font-bold">{betDetails.type}</span></span>
                    </div>

                    <div className="border-t border-white/10 pt-2 mt-2">
                        <p className={`text-5xl font-mono font-bold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {profit >= 0 ? 'Tebrikler! Kazandınız.' : 'Maalesef kaybettiniz.'}
                        </p>
                    </div>
                </div>

                <button
                    onClick={onReset}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 text-lg"
                >
                    Sonraki Yarış
                </button>
            </div>
        </div>
    );
};

export default ResultModal;
