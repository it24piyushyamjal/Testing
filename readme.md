# 🎂 Birthday Surprise for Anushka

A cinematic, story-driven interactive birthday website built with pure **HTML, CSS, and JavaScript** — no frameworks, no page reloads.

---

## 🚀 How to Run

No build step needed. Just open `index.html` in any browser:

```
Double-click index.html
```

Or serve it locally with Python:

```bash
python3 -m http.server 8080
# then open http://localhost:8080 in your browser
```

It works best on a **mobile screen** (or resize your browser to ~400px wide).

---

## 📁 Files

| File | What it does |
|------|--------------|
| `index.html` | All 8 screen sections of the SPA |
| `style.css` | All styles — mobile-first, dark theme |
| `script.js` | All logic — typing effect, transitions, quiz, confetti |

---

## 🎬 The 8 Screens

1. **Mystery Screen** — Black screen, text types in line by line, arrow appears to continue
2. **Investigation** — "Case File #2026", 3 clue cards appear one by one
3. **Confession** — Reveals it's from Bickyy 🕵️
4. **Quiz** — 2 fun questions about Anushka with instant feedback
5. **Timeline** — Memory cards from 2015, 2017, 2021 animate in
6. **Letter** — Personal letter from Bickyy 💖
7. **Locked Gift** — Tap the envelope to unlock
8. **Final** — Confetti 🎉 + "Happy Birthday Anushka!"

---

## ✏️ How to Customize

All the content you'd want to change is at the **top of `script.js`**:

```js
// The 3 lines that type out on Screen 1
const mysteryLines = [
  "Welcome, detective.",
  "We have a special case only you can solve.",
  "Are you ready... Anushka?"
];

// Quiz questions (change questions, options, and the correct answer index)
const quizQuestions = [ ... ];

// Timeline memories (add/remove/edit)
const memories = [ ... ];
```

Animation timing is also easy to tune at the very top of the file:

```js
const TYPING_SPEED_MS = 38;   // how fast each character types
const LINE_PAUSE_MS   = 600;  // pause between lines
```

---

## 📱 Design Notes

- **Mobile-first** — designed for ~400px width
- **No frameworks** — plain HTML + CSS + JS only
- **Cinematic pacing** — intentionally slow and emotional
- Screens transition with a smooth **fade-in** animation
