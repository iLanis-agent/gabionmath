// Gabion Math engine: baskets per course and courses for a wall run, the fill volume in cubic feet and yards, the stone tonnage at a named density, and the cost of baskets plus stone. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the wall and the supplier.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _RUN = "the wall run must be from 0.01 to 10000 ft with at most two decimal places";
var _BLEN = "the basket length must be from 0.01 to 12 ft with at most two decimal places";
var _HT = "the wall height must be from 0.01 to 20 ft with at most two decimal places";
var _BHT = "the basket height must be from 0.01 to 3 ft with at most two decimal places";
var _DEPTH = "the wall depth must be from 0.01 to 10 ft with at most two decimal places";
var _CUYD = "the fill volume must be from 0.01 to 1000000 cu yd with at most two decimal places";
var _DENS = "the stone density must be from 0.01 to 3 tons per cubic yard with at most two decimal places";
var _BASKETS = "the basket count must be from 1 to 100000 with no decimal places";
var _BPRICE = "the basket price must be from 0.01 to 1000 dollars with at most two decimal places";
var _TONS = "the stone amount must be from 0.01 to 100000 tons with at most two decimal places";
var _TPRICE = "the stone price must be from 0.01 to 1000 dollars per ton with at most two decimal places";
var _DIM = "the basket must not be larger than the wall in that direction";
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }

function basketsTruth(run, blen, ht, bht) {
  var r = _p(run, _RUN, 5, 2, 1, 1000000), b = _p(blen, _BLEN, 2, 2, 1, 1200);
  var h = _p(ht, _HT, 3, 2, 1, 2000), g = _p(bht, _BHT, 1, 2, 1, 300);
  if (b > r || g > h) throw new Error(_DIM);
  var percourse = Math.floor((r + b - 1) / b);
  var courses = Math.floor((h + g - 1) / g);
  return "The wall of " + _dec(r, 2) + " ft by " + _dec(h, 2) + " ft with baskets of " + _dec(b, 2) + " ft by " + _dec(g, 2) + " ft takes " + percourse + " per course over " + courses + (courses === 1 ? " course" : " courses") + ", " + (percourse * courses) + " baskets in all.";
}
function volumeTruth(run, ht, depth) {
  var r = _p(run, _RUN, 5, 2, 1, 1000000), h = _p(ht, _HT, 3, 2, 1, 2000), d = _p(depth, _DEPTH, 2, 2, 1, 1000);
  var cuft100 = _hu(r * h * d, 10000); // hundredths of a cu ft: (r*h*d) / 1e6 cu ft
  var yd100 = _hu(cuft100, 27);
  return "The wall of " + _dec(r, 2) + " ft by " + _dec(h, 2) + " ft by " + _dec(d, 2) + " ft holds " + _dec(cuft100, 2) + " cu ft, or " + _dec(yd100, 2) + " cu yd of fill.";
}
function stoneTruth(cuyd, density) {
  var y = _p(cuyd, _CUYD, 7, 2, 1, 100000000), s = _p(density, _DENS, 1, 2, 1, 300);
  var tons100 = _hu(y * s, 100);
  return "The fill of " + _dec(y, 2) + " cu yd at " + _dec(s, 2) + " tons per cubic yard takes " + _dec(tons100, 2) + " tons of stone.";
}
function costTruth(baskets, bprice, tons, tprice) {
  var n = _i(baskets, _BASKETS, 6, 1, 100000), bp = _p(bprice, _BPRICE, 4, 2, 1, 100000);
  var t = _p(tons, _TONS, 6, 2, 1, 10000000), tp = _p(tprice, _TPRICE, 4, 2, 1, 100000);
  var cents = n * bp + _hu(t * tp, 100);
  return "The " + n + (n === 1 ? " basket" : " baskets") + " at $" + _dec(bp, 2) + " each and " + _dec(t, 2) + " tons at $" + _dec(tp, 2) + " a ton cost $" + _money(cents) + " in all.";
}
