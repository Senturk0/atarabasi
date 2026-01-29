import React, { useState, useEffect, useRef } from 'react';
import TopBar from './components/TopBar';
import RaceTrack from './components/RaceTrack';
import BettingPanel from './components/BettingPanel';
import ResultModal from './components/ResultModal';
import { generateHorses, getNormalRandom } from './utils/gameLogic';

function App() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(100);

  const [horses, setHorses] = useState([]);
  const [selectedHorseId, setSelectedHorseId] = useState(null);
  const [raceStatus, setRaceStatus] = useState('idle'); // idle, racing, finished
  const [result, setResult] = useState(null); // { winner, profit }

  const raceInterval = useRef(null);

  // Initialize horses on mount
  useEffect(() => {
    setHorses(generateHorses());
  }, []);

  const handleStartRace = () => {
    if (!selectedHorseId) {
      alert("Lütfen bahis oynamak için bir at seçin!");
      return;
    }
    if (betAmount <= 0) {
      alert("Geçersiz bahis tutarı!");
      return;
    }
    if (betAmount > balance) {
      alert("Yetersiz bakiye!");
      return;
    }

    // Deduct balance
    setBalance(prev => prev - betAmount);
    setRaceStatus('racing');
    setResult(null);
  };

  // Race Loop
  useEffect(() => {
    if (raceStatus === 'racing') {
      raceInterval.current = setInterval(() => {
        setHorses(prevHorses => {
          let hasFinished = false;
          let winner = null;

          const updatedHorses = prevHorses.map(horse => {
            if (horse.finished) return horse;

            // Speed Calculation
            // Base speed correlated to Power (0.2 to 0.7 per tick)
            const baseSpeed = 0.2 + (horse.power / 200);
            // Random Shock
            const shock = getNormalRandom(0, 0.15); // Mean 0, StdDev 0.15

            let move = baseSpeed + shock;
            if (move < 0) move = 0; // Can't go backwards

            let newProgress = horse.progress + move;
            if (newProgress >= 100) {
              newProgress = 100;
              if (!hasFinished) { // First to cross logic (simplified)
                hasFinished = true;
                winner = horse;
              }
            }

            return { ...horse, progress: newProgress, finished: newProgress >= 100 };
          });

          // Check if race ended (someone finished)
          if (hasFinished) {
            clearInterval(raceInterval.current);
            setRaceStatus('finished');
            handleRaceEnd(winner);
          }

          return updatedHorses;
        });
      }, 50); // 20 FPS updates
    }

    return () => clearInterval(raceInterval.current);
  }, [raceStatus]);

  const handleRaceEnd = (winner) => {
    // Determine payout
    const selectedHorse = horses.find(h => h.id === selectedHorseId);
    let profit = -betAmount;

    if (winner.id === selectedHorseId) {
      const payout = betAmount * selectedHorse.odds;
      profit = payout - betAmount;
      setBalance(prev => prev + payout);
    }

    setResult({ winner, profit });
  };

  const resetGame = () => {
    setHorses(generateHorses());
    setRaceStatus('idle');
    setResult(null);
    setSelectedHorseId(null);
    // Bet amount stays same or reset? Keeping same for convenience.
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-yellow-500 selection:text-black">
      <TopBar
        balance={balance}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        raceStatus={raceStatus}
      />

      <main className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Race Track Section */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Canlı Yarış
            </h2>
            <div className="text-sm text-gray-400">
              {raceStatus === 'idle' ? 'Bahislerinizi yapın...' : raceStatus === 'racing' ? 'Yarış Başladı! 🏁' : 'Yarış Sona Erdi'}
            </div>
          </div>
          <RaceTrack horses={horses} />
        </section>

        {/* Betting Controller */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Bahis Bülteni</h2>
            {raceStatus === 'idle' && (
              <button
                onClick={handleStartRace}
                disabled={!selectedHorseId}
                className={`
                  px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95
                  ${selectedHorseId
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:shadow-orange-500/50'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
                `}
              >
                YARIŞI BAŞLAT 🏇
              </button>
            )}
          </div>

          <BettingPanel
            horses={horses}
            selectedHorse={selectedHorseId}
            onSelectHorse={setSelectedHorseId}
            raceStatus={raceStatus}
          />
        </section>
      </main>

      <ResultModal
        winner={result?.winner}
        profit={result?.profit}
        onReset={resetGame}
      />
    </div>
  );
}

export default App;
