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
const noWarmupOption = { desc: "No warmup bitches", dist: 0, type: "none" }; //[1]

export { warmups, noWarmupOption };
