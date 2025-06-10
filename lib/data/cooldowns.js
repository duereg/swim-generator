// Cool-down options based on various sources [2, 5, 7, 9, 10, 12, 13, 16, 17, 19-21]
const cooldowns = [
    { desc: "200 w fins (or combo)", dist: 200, type: "fins" }, //[2]
    { desc: "200 swim cooldown", dist: 200, type: "swim" }, //[5]
    { desc: "100 cool down", dist: 100, type: "general" }, //[7]
    { desc: "300 CD", dist: 300, type: "general" }, //[9]
    { desc: "200 CD", dist: 200, type: "general" }, //[10, 16, 21]
    { desc: "450 cooldown (300 swim, 150 under)", dist: 450, type: "swim/under" }, //[20]
    { desc: "100 cool", dist: 100, type: "general" }, //[17]
    { desc: "150 cooldown and 20 minutes of stick skills", dist: 150, type: "general" }, //[19]
    { desc: "100 fin swim cooldown", dist: 100, type: "fin swim" }, //[12]
    { desc: "250 cool down", dist: 250, type: "general" }, //[13]
];

export { cooldowns };
