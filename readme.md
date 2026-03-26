# 🖤 Birthday Surprise for Anushka

A cinematic, story-driven interactive birthday website built with pure **HTML, CSS, and JavaScript** — no frameworks, no page reloads. Everything lives in a single self-contained `index.html`.

---

## 🚀 How to Run

No build step needed. Just open `index.html` in any modern browser:

```
Double-click index.html
```

It works best on a **mobile screen** (or resize your browser to ~420px wide).

---

## 📁 Files

| File | What it does |
|------|--------------|
| `index.html` | The complete site — all HTML, CSS, and JS inlined |
| `style.css` | *(legacy — styles are now inlined in index.html)* |
| `script.js` | *(legacy — scripts are now inlined in index.html)* |

---

## 🎬 The 8 Screens

| # | Screen | Highlights |
|---|--------|-----------|
| 1 | **Mystery** | Lines fade in one-by-one with a blinking cursor |
| 2 | **Investigation** | Case File #001 — 3 clue cards slide in, then a choice appears |
| 3 | **Confession** | Bickyy reveals himself, lines stagger in dramatically |
| 4 | **Challenge / Quiz** | 3 questions with progress bar; wrong answers make you retry |
| 5 | **Timeline** | 4 memory cards animate in from the left along a glowing line |
| 6 | **Letter + Chibi** | Animated chibi character walks in, receives letter from bird, reads it |
| 7 | **Locked Gift** | Tap the envelope twice to open; a heartfelt note appears |
| 8 | **Finale** | Canvas confetti burst + "Happy Birthday Anushka 🎂" |

---

## ✏️ How to Customize

Open `index.html` and find these sections:

### Typed mystery lines (Screen 1)
```js
// in initS1()
const delays = [800, 1400, 1900, 2400, 3000];
// Edit the text in the HTML: <div class="mline" id="ml0">…</div>
```

### Quiz questions (Screen 4)
```js
const qs = [
  { q: "Who still wins most arguments?", opts: [ … ] },
  …
];
```

### Timeline memories (Screen 5)
```html
<div class="tl-item" id="tl0">
  <div class="tl-label">The beginning</div>
  <div class="tl-text">…</div>
</div>
```

### Letter lines (Screen 6)
```html
<div class="lline" id="ll0">I'm not good at saying things out loud.</div>
```

### Colors
All colors are CSS variables at the top of the `<style>` block:
```css
:root {
  --purple: #a78bfa;
  --rose: #f472b6;
  --bg: #07060f;
  …
}
```

---

## 🎨 Design

- **Aurora background** — 3 floating gradient orbs + 30 dust particles
- **Typography** — Caveat (handwritten), DM Sans (clean), Instrument Serif (elegant)
- **Chibi character** — custom SVG, animated walk-in + bird delivery scene
- **Canvas confetti** — physics-based rectangles and circles
- **Mobile-first** — max-width 420px, no horizontal scroll
