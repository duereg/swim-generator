// Warmup options based on various sources [2, 5, 7, 8, 11, 13, 15, 17, 19, 20]
const warmups = [
    { desc: "200 no fins, 200 w fins swim", dist: 400, type: "swim" }, //[2]
    { desc: "400 warmup (75 kick, 25 under)", dist: 400, type: "kick" }, //[5]
    { desc: "250 pull warmup, 250 swim warmup", dist: 500, type: "pull/swim" }, //[20]
    { desc: "250 warmup", dist: 250, type: "general" }, //[8, 13]
    { desc: "200 warm up", dist: 200, type: "general" }, //[7]
    { desc: "500 warmup", dist: 500, type: "general" }, //[11, 17]
    { desc: "300 warm up", dist: 300, type: "general" }, //[15]
    { desc: "150 warm up", dist: 150, type: "general" }, //[19]
];

// Option for no warmup, as seen in some sources [1, 9]
const NO_WARM_UP_BITCHES = { desc: "No warmup bitches", dist: 0, type: "none" }; //[1]

/**
 * Selects a warmup routine.
 * There's a 90% chance of selecting a warmup from the availableWarmups array,
 * and a 10% chance of selecting the noWarmupOption.
 *
 * @param {Array<Object>} availableWarmups - An array of warmup objects. Each object should have at least 'desc' and 'dist' properties.
 * @param {Object} noWarmupOption - An object representing the option of no warmup. Should have 'desc' and 'dist'.
 * @returns {Object} The selected warmup object.
 */
function selectWarmup() {
    const useWarmup = Math.random() > 0.1; // 90% chance of including a warmup

    if (useWarmup) {
        return warmups[Math.floor(Math.random() * warmups.length)];
    } else {
        return NO_WARM_UP_BITCHES;
    }
}

function generateWarmup(totalDistanceYards, shortWorkoutThreshold) {
    let selectedWarmup;

    if (totalDistanceYards < shortWorkoutThreshold) {
        selectedWarmup = { ...NO_WARM_UP_BITCHES, desc: "No warmup (short workout)" };
    } else {
        selectedWarmup = selectWarmup(); 

        if (selectedWarmup && selectedWarmup.dist > 0) {
            const minMainSetThreshold = 200;
            let maxAllowedWarmupDist = totalDistanceYards - minMainSetThreshold;

            // Apply the more stringent percentage cap: 0.4 (40%) instead of 0.6
            maxAllowedWarmupDist = Math.min(maxAllowedWarmupDist, totalDistanceYards * 0.4);

            if (maxAllowedWarmupDist < 0 && totalDistanceYards > 0) {
                maxAllowedWarmupDist = totalDistanceYards * 0.4; // Fallback for small total distances if threshold makes it negative
            } // End of the "maxAllowedWarmupDist < 0" check

            if (maxAllowedWarmupDist < 50 && totalDistanceYards >= 50) {
                maxAllowedWarmupDist = 50;
            }
            // Add a final guard if maxAllowedWarmupDist somehow ended up negative (e.g. if totalDistanceYards was < 50 but > 0)
            if (maxAllowedWarmupDist < 0) maxAllowedWarmupDist = 0;

            if (selectedWarmup.dist > maxAllowedWarmupDist) {
                const suitableWarmups = warmups.filter(wu => wu.dist <= maxAllowedWarmupDist && wu.dist > 0);
                if (suitableWarmups.length > 0) {
                    selectedWarmup = suitableWarmups[Math.floor(Math.random() * suitableWarmups.length)];
                } else {
                    selectedWarmup = NO_WARM_UP_BITCHES;
                }
            }
        } else if (!selectedWarmup || selectedWarmup.dist === 0) {
            selectedWarmup = NO_WARM_UP_BITCHES;
        }
    }

    return selectedWarmup;
}

export { generateWarmup, warmups, NO_WARM_UP_BITCHES };
