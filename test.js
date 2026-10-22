const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { baskets: basketsTruth, volume: volumeTruth, stone: stoneTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the wall run must be from 0.01 to 10000 ft with at most two decimal places",
  "the basket length must be from 0.01 to 12 ft with at most two decimal places",
  "the wall height must be from 0.01 to 20 ft with at most two decimal places",
  "the basket height must be from 0.01 to 3 ft with at most two decimal places",
  "the wall depth must be from 0.01 to 10 ft with at most two decimal places",
  "the fill volume must be from 0.01 to 1000000 cu yd with at most two decimal places",
  "the stone density must be from 0.01 to 3 tons per cubic yard with at most two decimal places",
  "the basket count must be from 1 to 100000 with no decimal places",
  "the basket price must be from 0.01 to 1000 dollars with at most two decimal places",
  "the stone amount must be from 0.01 to 100000 tons with at most two decimal places",
  "the stone price must be from 0.01 to 1000 dollars per ton with at most two decimal places",
  "the basket must not be larger than the wall in that direction"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
