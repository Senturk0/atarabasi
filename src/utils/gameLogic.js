export const HORSE_NAMES = [
    "Thunder Bolt", "Shadow Dancer", "Crimson Fire",
    "Golden Spirit", "Wind Runner", "Night Fury",
    "Silver Arrow", "Mystic Rose", "Royal Flash", "Storm Chaser"
];

export const HORSE_COLORS = [
    "bg-red-500", "bg-blue-500", "bg-green-500",
    "bg-yellow-500", "bg-purple-500", "bg-pink-500"
];

export const generateHorses = () => {
    const selectedNames = [...HORSE_NAMES].sort(() => 0.5 - Math.random()).slice(0, 6);

    const horses = selectedNames.map((name, index) => {
        const power = Math.floor(Math.random() * 100) + 1; // 1-100

        // Variance Logic: 
        // High Power (e.g., 90) -> Low Variance (Stable performance)
        // Low Power (e.g., 20) -> High Variance (Volatile performance)
        // Map Power 1-100 to Variance 0.25 - 0.05
        const variance = 0.25 - ((power / 100) * 0.20);

        return {
            id: index + 1,
            name,
            power,
            variance, // Conserved for race logic
            color: HORSE_COLORS[index],
            progress: 0,
            finished: false,
            rank: null
        };
    });

    return calculateOdds(horses);
};

export const calculateOdds = (horses) => {
    // Apply "Longshot Bias" by flattening the power curve slightly
    // Power^0.85 makes weak horses relatively stronger in probability terms
    const biasExponent = 0.85;
    let totalPower = horses.reduce((sum, horse) => sum + Math.pow(horse.power, biasExponent), 0);

    return horses.map(horse => {
        const adjustedPower = Math.pow(horse.power, biasExponent);
        const trueProbability = adjustedPower / totalPower;

        // V2: 18% Margin (Overround)
        // Logic: Odds = 1 / (TrueProb * 1.18)
        let winOdds = 1 / (trueProbability * 1.18);
        if (winOdds < 1.05) winOdds = 1.05; // Min cap

        // Calculate other odds based on Win Odds (Approximations)
        // Place (Top 2): Roughly WinOdds / 2.5 but safer for longshots
        let placeOdds = winOdds / 2.2;
        if (placeOdds < 1.05) placeOdds = 1.05;

        // Rank (Exact Position): Much harder, higher odds
        // Simple heuristic multiplier based on rank difficulty
        let rankOdds = winOdds * 5.0;

        return {
            ...horse,
            trueProbability,
            odds: {
                win: parseFloat(winOdds.toFixed(2)),
                place: parseFloat(placeOdds.toFixed(2)),
                rank: parseFloat(rankOdds.toFixed(2))
            }
        };
    });
};

// Box-Muller transform for normal distribution
export const getNormalRandom = (mean = 0, stdDev = 1) => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num * stdDev + mean;
};
