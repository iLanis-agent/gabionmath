# Gabion Math

Gabion wall arithmetic. The wall of 36 ft by 3 ft with baskets of 3 ft by 1 ft takes 12 per course over 3 courses, 36 baskets in all.

## What it computes

- **The baskets truth** - baskets per course and courses (each rounded up, then multiplied) for a wall run (0.01 to 10000 ft) and height (0.01 to 20 ft) against basket length (0.01 to 12 ft) and height (0.01 to 3 ft).
- **The fill truth** - fill volume: run times height times depth (0.01 to 10 ft), in cubic feet and cubic yards of twenty-seven feet.
- **The stone truth** - stone tonnage: the cubic yards times the supplier's density (0.01 to 3 tons per cu yd).
- **The cost truth** - cost: the baskets at their price (0.01 to 1000 dollars) plus the stone at its price per ton.

## Boundary

Arithmetic only. Basket and fill counting, applied as written. It has not seen any slope and does not know the soil bearing, the drainage, the tie-backs or the local wall rules, and it gives no verdict that a wall stands. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/gabionmath/
Repo: https://github.com/iLanis-agent/gabionmath
