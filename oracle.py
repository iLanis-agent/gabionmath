import json, random

def dec2(n):
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)

def baskets(r, b, h, g):
    percourse = (r + b - 1) // b
    courses = (h + g - 1) // g
    cw = "course" if courses == 1 else "courses"
    return (f"The wall of {dec2(r)} ft by {dec2(h)} ft with baskets of {dec2(b)} ft by {dec2(g)} ft takes "
            f"{percourse} per course over {courses} {cw}, {percourse*courses} baskets in all.")
def volume(r, h, d):
    cuft100 = hu(r*h*d, 10000)
    yd100 = hu(cuft100, 27)
    return (f"The wall of {dec2(r)} ft by {dec2(h)} ft by {dec2(d)} ft holds {dec2(cuft100)} cu ft, "
            f"or {dec2(yd100)} cu yd of fill.")
def stone(y, s):
    tons100 = hu(y*s, 100)
    return f"The fill of {dec2(y)} cu yd at {dec2(s)} tons per cubic yard takes {dec2(tons100)} tons of stone."
def cost(n, bp, t, tp):
    cents = n*bp + hu(t*tp, 100)
    bw = "basket" if n == 1 else "baskets"
    return (f"The {n} {bw} at ${dec2(bp)} each and {dec2(t)} tons at ${dec2(tp)} a ton "
            f"cost ${money(cents)} in all.")

random.seed(747)
cases = [
  dict(fn="baskets", args=["36","3","3","1"], expect=baskets(3600,300,300,100)),
  dict(fn="volume", args=["36","3","1.5"], expect=volume(3600,300,150)),
  dict(fn="stone", args=["6","1.4"], expect=stone(600,140)),
  dict(fn="cost", args=["36","25","8.4","60"], expect=cost(36,2500,840,6000)),
]
for _ in range(25):
    while True:
        r = random.randint(1,1000000); b = random.randint(1,1200)
        h = random.randint(1,2000); g = random.randint(1,300)
        if b <= r and g <= h: break
    cases.append(dict(fn="baskets", args=[dec2(r),dec2(b),dec2(h),dec2(g)], expect=baskets(r,b,h,g)))
for _ in range(25):
    r = random.randint(1,1000000); h = random.randint(1,2000); d = random.randint(1,1000)
    cases.append(dict(fn="volume", args=[dec2(r),dec2(h),dec2(d)], expect=volume(r,h,d)))
for _ in range(20):
    y = random.randint(1,100000000); s = random.randint(1,300)
    cases.append(dict(fn="stone", args=[dec2(y),dec2(s)], expect=stone(y,s)))
for _ in range(20):
    n = random.randint(1,100000); bp = random.randint(1,100000)
    t = random.randint(1,10000000); tp = random.randint(1,100000)
    cases.append(dict(fn="cost", args=[str(n),dec2(bp),dec2(t),dec2(tp)], expect=cost(n,bp,t,tp)))
errcases = [
  ["baskets", ["0","3","3","1"]], ["baskets", ["36","0","3","1"]],
  ["baskets", ["36","3","0","1"]], ["baskets", ["36","3","3","0"]],
  ["baskets", ["2","3","3","1"]], ["baskets", ["36","3","0.5","1"]],
  ["volume", ["0","3","1.5"]], ["volume", ["36","0","1.5"]], ["volume", ["36","3","0"]],
  ["stone", ["0","1.4"]], ["stone", ["6","0"]],
  ["cost", ["0","25","8.4","60"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")
