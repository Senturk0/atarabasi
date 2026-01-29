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
        return {
            id: index + 1,
            name,
            power,
            color: HORSE_COLORS[index],
            progress: 0,
            finished: false,
            rank: null
        };
    });

    return calculateOdds(horses);
};

export const calculateOdds = (horses) => {
    const totalPower = horses.reduce((sum, horse) => sum + horse.power, 0);

    return horses.map(horse => {
        const trueProbability = horse.power / totalPower;
        // Overround: 20% margin
        // Odds = 1 / (TrueProbability * 1.20)
        let odds = 1 / (trueProbability * 1.20);

        // Clamp odds to reasonable values (e.g., minimum 1.01)
        if (odds < 1.01) odds = 1.01;

        return {
            ...horse,
            trueProbability, // Keep for debugging if needed
            odds: parseFloat(odds.toFixed(2))
        };
    });
};

// Box-Muller transform for normal distribution
export const getNormalRandom = (mean = 0, stdDev = 1) => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num * stdDev + mean;
};
