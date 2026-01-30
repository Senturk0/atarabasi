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

  // V2 State
  const [betType, setBetType] = useState('WIN'); // WIN, PLACE, RANK
  const [targetRank, setTargetRank] = useState(1); // For RANK bet

  const [raceStatus, setRaceStatus] = useState('idle'); // idle, racing, finished
  const [result, setResult] = useState(null); // { winners, profit, betDetails }

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
          let finishedCount = prevHorses.filter(h => h.finished).length;

          const updatedHorses = prevHorses.map(horse => {
            if (horse.finished) return horse;

            // V2: Advanced Speed Calculation
            // Base speed depends on Power
            const baseSpeed = 0.2 + (horse.power / 250);

            // Variance Logic: 
            // Shock comes from normal distribution scaled by Horse's specific Variance
            const shock = getNormalRandom(0, horse.variance);

            // Asymmetric Acceleration: 
            // Positive shocks can be bigger if momentum is high (simplified)
            let move = baseSpeed + shock;

            // Clamp min speed
            if (move < 0.05) move = 0.05;

            let newProgress = horse.progress + move;
            let isFinished = false;
            let rank = null;

            if (newProgress >= 100) {
              newProgress = 100;
              isFinished = true;
              finishedCount++; // Increment immediately for this update
              rank = finishedCount;
            }

            return {
              ...horse,
              progress: newProgress,
              finished: isFinished,
              rank: rank || horse.rank
            };
          });

          // Check if all horses finished (or enough for podium)
          const allFinished = updatedHorses.every(h => h.finished);
          if (allFinished) {
            clearInterval(raceInterval.current);
            setRaceStatus('finished');
            handleRaceEnd(updatedHorses);
          }

          return updatedHorses;
        });
      }, 50); // 20 FPS updates
    }

    return () => clearInterval(raceInterval.current);
  }, [raceStatus]);

  const handleRaceEnd = (finalHorses) => {
    // Sort by rank
    const winners = [...finalHorses].sort((a, b) => a.rank - b.rank);

    // Determine payout
    const selectedHorse = finalHorses.find(h => h.id === selectedHorseId);
    let profit = -betAmount;
    let won = false;
    let payout = 0;

    // V2 Payout Logic
    if (betType === 'WIN') {
      // Must be 1st
      if (selectedHorse.rank === 1) {
        payout = betAmount * selectedHorse.odds.win;
        won = true;
      }
    } else if (betType === 'PLACE') {
      // Must be 1st or 2nd
      if (selectedHorse.rank <= 2) {
        payout = betAmount * selectedHorse.odds.place;
        won = true;
      }
    } else if (betType === 'RANK') {
      // Must match Exact Rank
      if (selectedHorse.rank === targetRank) {
        payout = betAmount * selectedHorse.odds.rank;
        won = true;
      }
    }

    if (won) {
      profit = payout - betAmount;
      setBalance(prev => prev + payout);
    }

    const betLabel = betType === 'WIN' ? 'Ganyan (1.)'
      : betType === 'PLACE' ? 'Plase (İlk 2)'
        : `Sıralama (${targetRank}.)`;

    setResult({
      winners,
      profit,
      betDetails: {
        horseName: selectedHorse.name,
        type: betLabel
      }
    });
  };

  const resetGame = () => {
    setHorses(generateHorses());
    setRaceStatus('idle');
    setResult(null);
    setSelectedHorseId(null);
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
              Canlı Yarış Simülasyonu
            </h2>
            <div className="text-sm text-gray-400">
              {raceStatus === 'idle' ? 'Lütfen bahsinizi yapın...' : raceStatus === 'racing' ? '⚠️ YARIŞ DEVAM EDİYOR' : 'Yarış Tamamlandı'}
            </div>
          </div>
          <RaceTrack horses={horses} />
        </section>

        {/* Betting Controller */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Bahis Bileti</h2>
            {raceStatus === 'idle' && (
              <button
                onClick={handleStartRace}
                disabled={!selectedHorseId}
                className={`
                  px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95
                  ${selectedHorseId
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-green-500/50'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
                `}
              >
                YARIŞI BAŞLAT 🏁
              </button>
            )}
          </div>

          <BettingPanel
            horses={horses}
            selectedHorse={selectedHorseId}
            onSelectHorse={setSelectedHorseId}
            raceStatus={raceStatus}
            betType={betType}
            setBetType={setBetType}
            targetRank={targetRank}
            setTargetRank={setTargetRank}
          />
        </section>
      </main>

      <ResultModal
        winners={result?.winners}
        profit={result?.profit}
        betDetails={result?.betDetails}
        onReset={resetGame}
      />
    </div>
  );
}

export default App;
