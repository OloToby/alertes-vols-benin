"""Musique (120 BPM, groove afro-house) + sound design, calés sur le plan de montage.
Sortie : audio/music.wav, audio/sfx.wav, audio/mix_raw.wav (48 kHz stéréo)."""
import numpy as np, wave, os
SR = 48000
DUR = 17.5
BEAT = 0.5
N = int(SR * (DUR + 1.0))
rng = np.random.default_rng(7)
os.makedirs("audio", exist_ok=True)

def buf(): return np.zeros((N, 2))
def add(b, sig, t, pan=0.0, gain=1.0):
    i = int(t * SR)
    if i >= N: return
    s = sig[: N - i] * gain
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    b[i:i + len(s), 0] += s * l * 1.414
    b[i:i + len(s), 1] += s * r * 1.414
def env(n, a=0.002, d=0.2):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
def lp(x, fc):  # passe-bas 1 pôle
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc = (1 - a) * x[i] + a * acc; y[i] = acc
    return y
def hp(x, fc): return x - lp(x, fc)
def noise(n): return rng.standard_normal(n)
def note(m): return 440 * 2 ** ((m - 69) / 12)

# ---------- instruments ----------
def kick(g=1.0):
    n = int(.45 * SR); t = np.arange(n) / SR
    f = 45 + 110 * np.exp(-t * 28)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)
    s += noise(n) * np.exp(-t * 400) * .15
    return np.tanh(s * 1.6) * g
def shaker():
    n = int(.08 * SR); x = lp(hp(noise(n), 6000), 11000) * env(n, .004, .025); return x
def clap():
    n = int(.25 * SR); x = hp(lp(noise(n), 3500), 900)
    e = sum(np.roll(env(n, .001, .012), int(k * .011 * SR)) for k in range(3)) + env(n, .001, .09) * .8
    return x * e * .9
def marimba(m, d=.35):
    n = int(1.2 * SR); t = np.arange(n) / SR; f = note(m)
    s = np.sin(2 * np.pi * f * t) * np.exp(-t / d) + .35 * np.sin(2 * np.pi * f * 3.93 * t) * np.exp(-t / (d * .18))
    s += .12 * np.sin(2 * np.pi * f * 9.1 * t) * np.exp(-t / .01)
    return s * np.minimum(1, t / .002)
def logdrum(m, d=.28):
    n = int(.8 * SR); t = np.arange(n) / SR; f0 = note(m)
    f = f0 * (1 + .6 * np.exp(-t * 40))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / d)
    return np.tanh(s * 2.2) * .8
def pad(ms, dur):
    n = int(dur * SR); t = np.arange(n) / SR; s = np.zeros(n)
    for m in ms:
        for det in (-.07, .07):
            ph = 2 * np.pi * note(m) * (1 + det / 100) * t
            s += np.sign(np.sin(ph)) * .15 + np.sin(ph) * .6
    s = lp(s, 1400) / len(ms)
    e = np.minimum(1, t / .25) * np.minimum(1, (dur - t) / .3)
    return s * e

music = buf()
# accords (1 mesure = 2 s) : Am F C G
CH = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
BASS = [45, 41, 48, 43]
def bar(t): return int(t // 2) % 4

# Intro 0–2.5 : kick léger + marimba
# Tension 2.5–5 : pouls grave, pas de marimba
# Montée 5–7.5 : shaker + clap, marimba revient
# Drop 7.5–14.5 : groove complet
# Fin 14.5–17 : groove, arrêt sec 17.0 + accord tenu
for b in range(int(17.0 / BEAT)):
    t = b * BEAT
    sec = 0 if t < 2.5 else 1 if t < 5 else 2 if t < 7.5 else 3 if t < 14.5 else 4
    if sec in (0,): add(music, kick(.55), t)
    if sec == 1: add(music, kick(.9), t); add(music, logdrum(33, .35), t + .25, gain=.5)
    if sec in (2, 3, 4): add(music, kick(1.0), t)
    if sec in (2, 3, 4) and b % 2 == 1: add(music, clap(), t, pan=.1, gain=.55)
    for s16 in range(4):
        ts = t + s16 * BEAT / 4
        if sec in (2, 3, 4): add(music, shaker(), ts, pan=.35, gain=(.35 if s16 % 2 else .2))
        if sec == 0 and s16 == 2: add(music, shaker(), ts, pan=.35, gain=.15)
    # log drum syncopé (drop)
    if sec in (3, 4):
        root = BASS[bar(t)]
        pat = [(0, 0), (.375, 0), (.625, 7), (.875, 12)] if b % 2 == 0 else [(.25, 0), (.75, -2)]
        for off, dm in pat:
            add(music, logdrum(root + dm), t + off * BEAT, gain=.55)
# marimba : motif en croches sur les accords
MOT = [0, 2, 1, 2, 0, 2, 1, 2]
for b in range(int(17.0 / BEAT)):
    t = b * BEAT
    if 2.5 <= t < 5: continue
    c = CH[bar(t)]
    for e8 in range(2):
        idx = MOT[(b * 2 + e8) % 8]
        m = c[idx] + 12
        g = .32 if t < 2.5 else .42
        add(music, marimba(m), t + e8 * BEAT / 2, pan=-.3 + .6 * ((b * 2 + e8) % 2), gain=g)
    if b % 4 == 3 and t >= 7.5:
        add(music, marimba(c[2] + 24, .25), t + .375, pan=.4, gain=.25)
# pads
for i in range(9):
    t = i * 2.0
    if t >= 17: break
    g = .18 if 2.5 <= t < 5 else .12
    add(music, pad([m + 12 for m in CH[i % 4]], 2.05), t, gain=g)
# accord final tenu
add(music, pad([69, 72, 76, 81], 1.2), 17.0 - .02, gain=.2)
add(music, marimba(81, .6), 17.0, gain=.4); add(music, marimba(76, .6), 17.0, gain=.3)
# silence musical ultra-bref avant le drop (7.25–7.5) : on atténue
i0, i1 = int(7.28 * SR), int(7.5 * SR)
music[i0:i1] *= np.linspace(1, .15, i1 - i0)[:, None]

# ---------- SFX ----------
sfx = buf()
def whoosh(d=.45, f0=300, f1=4000, g=1.0):
    n = int(d * SR); t = np.arange(n) / SR; x = noise(n)
    # balayage de passe-bande approximé
    y = np.zeros(n); acc1 = acc2 = 0.0
    fc = f0 * (f1 / f0) ** (t / d)
    for i in range(n):
        a = np.exp(-2 * np.pi * fc[i] / SR); acc1 = (1 - a) * x[i] + a * acc1; acc2 = (1 - a) * acc1 + a * acc2
        y[i] = acc1 - acc2
    e = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    return y * e * g * 2
def click(f=2500, d=.012, g=.5):
    n = int(.03 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) * .5 + noise(n) * .5) * np.exp(-t / d * 3) * g
def ding(m=88, g=.5):
    n = int(1.4 * SR); t = np.arange(n) / SR; f = note(m)
    s = np.sin(2 * np.pi * f * t) * np.exp(-t / .45) + .4 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t / .12)
    return s * np.minimum(1, t / .002) * g
def buzz(d=.3, g=.6):
    n = int(d * SR); t = np.arange(n) / SR
    s = np.sign(np.sin(2 * np.pi * 150 * t)) * .5 + np.sin(2 * np.pi * 150 * t)
    s = lp(s, 700) * (np.sin(np.pi * t / d) ** .5)
    return s * g
def thud(g=1.0):
    n = int(.6 * SR); t = np.arange(n) / SR
    f = 38 + 80 * np.exp(-t * 18)
    return np.tanh(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5) * 2) * g + lp(noise(n), 400) * np.exp(-t * 20) * .5 * g
def pop(g=.35):
    n = int(.08 * SR); t = np.arange(n) / SR; f = 900 * np.exp(-t * 30) + 300
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 60) * g

add(sfx, whoosh(.5, 200, 2500, .5), 0.0)
for i in range(3): add(sfx, pop(.18), .45 + i * .5)
add(sfx, whoosh(.3, 800, 6000, .35), 1.25, pan=.2)           # soulignement
add(sfx, whoosh(.4, 300, 5000, .8), 2.2, pan=.5)              # volet
r = np.random.default_rng(3)
for k in range(60):  # palettes route
    add(sfx, click(1800 + r.random() * 1600, .01, .22), 2.65 + r.random() * .75, pan=-.4 + r.random() * .8)
for k in range(18):  # palettes statut OUVERT
    add(sfx, click(2200 + r.random() * 900, .01, .2), 2.95 + r.random() * .35, pan=.3)
for k in range(28):  # palettes COMPLET
    add(sfx, click(1500 + r.random() * 900, .01, .28), 3.55 + r.random() * .35, pan=.3)
add(sfx, thud(.9), 3.56)
add(sfx, whoosh(.5, 150, 3000, .55), 5.05, pan=.2)            # téléphone
add(sfx, buzz(.3, .5), 5.95, pan=.2); add(sfx, ding(88, .38), 5.96, pan=.2)
add(sfx, buzz(.3, .5), 6.45, pan=.2); add(sfx, ding(91, .38), 6.46, pan=.2)
add(sfx, whoosh(.45, 150, 7000, .9), 7.1)                     # poussée dans l'icône
add(sfx, thud(.8), 7.55); add(sfx, whoosh(.35, 3000, 400, .5), 7.52, pan=-.5)
for i in range(4): add(sfx, pop(.22), 8.2 + i * .055)
add(sfx, whoosh(.4, 400, 6000, .7), 9.05, pan=-.6)
for i in range(6): add(sfx, pop(.25), 9.55 + i * .075, pan=-.4 + i * .15)
for i in range(26): add(sfx, click(3200, .006, .06), 9.9 + i * (2.2 / 26), pan=.2)  # ticks de surveillance
add(sfx, whoosh(.4, 300, 5000, .75), 12.25, pan=0)
add(sfx, pop(.22), 12.6); add(sfx, pop(.25), 13.1)
add(sfx, whoosh(.5, 200, 6000, .8), 14.22)
add(sfx, ding(93, .3), 14.5); add(sfx, pop(.3), 14.5)
for tt in (15.05, 15.2, 15.35): add(sfx, pop(.15), tt)
add(sfx, click(1500, .02, .6), 16.35); add(sfx, ding(96, .25), 16.37)

def write(path, x):
    x = np.clip(x, -1, 1); y = (x * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
music /= np.max(np.abs(music)) + 1e-9; sfx /= np.max(np.abs(sfx)) + 1e-9
cut = int(DUR * SR)
fade = np.ones(N); fade[cut - int(.3 * SR):cut] = np.linspace(1, 0, int(.3 * SR)); fade[cut:] = 0
mix = (music * .62 + sfx * .5) * fade[:, None]
write("audio/music.wav", music[:cut] * .8); write("audio/sfx.wav", sfx[:cut] * .8)
write("audio/mix_raw.wav", mix[:cut] / (np.max(np.abs(mix)) + 1e-9) * .9)
print("ok")
