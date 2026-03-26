// ===========================
// Timing constants
// ===========================
const TYPING_SPEED_MS = 38;
const LINE_PAUSE_MS = 600;
const CLUE_STAGGER_MS = 450;
const QUIZ_ANSWER_DELAY_MS = 1200;
const MEMORY_STAGGER_MS = 400;
const ENVELOPE_OPEN_MS = 900;
const ENVELOPE_FINAL_MS = 1400;

// ===========================
// SPA State
// ===========================
const screenIds = [
  "screen-mystery",
  "screen-investigation",
  "screen-confession",
  "screen-quiz",
  "screen-timeline",
  "screen-letter",
  "screen-locked",
  "screen-final"
];

// ===========================
// Screen 1 — Mystery content
// ===========================
const mysteryLines = [
  "Welcome, detective.",
  "We have a special case only you can solve.",
  "Are you ready... Anushka?"
];

// ===========================
// Screen 3 — Confession
// ===========================
const confessionText =
  "Okay, secret\u2019s out \u2014 it\u2019s me, Bickyy \uD83D\uDD75\uFE0F\u200D\u2642\uFE0F<br/>" +
  "I\u2019ve put together a little adventure for your birthday.<br/>Ready?";

// ===========================
// Screen 4 — Quiz
// ===========================
const quizQuestions = [
  {
    q: "What\u2019s Anushka\u2019s favorite midnight snack?",
    options: ["Ice Cream", "Chocolates", "Chips"],
    answer: 1
  },
  {
    q: "Which city would Anushka love to visit next?",
    options: ["Paris", "Tokyo", "London"],
    answer: 2
  }
];

// ===========================
// Screen 5 — Timeline
// ===========================
const memories = [
  { text: "That time we pranked Mom and couldn\u2019t stop laughing.", date: "2015" },
  { text: "Locked ourselves out and danced in the rain.", date: "2017" },
  { text: "Your epic birthday scavenger hunt.", date: "2021" }
];

// ===========================
// Utilities
// ===========================
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function showScreen(idx) {
  screenIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (i === idx) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  });
}

// ===========================
// Screen 1 — Mystery typing
// ===========================
function typeLine(container, text) {
  return new Promise(resolve => {
    const p = document.createElement("p");
    container.appendChild(p);
    let i = 0;
    (function loop() {
      p.textContent = text.slice(0, i++);
      if (i <= text.length) {
        setTimeout(loop, TYPING_SPEED_MS);
      } else {
        resolve();
      }
    })();
  });
}

(async function startMystery() {
  showScreen(0);
  const textEl = document.getElementById("mystery-text");
  for (const line of mysteryLines) {
    await typeLine(textEl, line);
    await sleep(LINE_PAUSE_MS);
  }
  const arrowBtn = document.getElementById("to-investigation");
  arrowBtn.classList.remove("hidden");
})();

// ===========================
// Navigation — Screen 1 → 2
// ===========================
document.getElementById("to-investigation").addEventListener("click", async () => {
  showScreen(1);
  const cards = document.querySelectorAll(".clue-card");
  for (const card of cards) {
    await sleep(CLUE_STAGGER_MS);
    card.classList.remove("hidden");
    card.classList.add("visible");
  }
});

// ===========================
// Navigation — Screen 2 → 3
// ===========================
document.getElementById("to-confession").addEventListener("click", () => {
  showScreen(2);
  document.querySelector(".confession-text").innerHTML = confessionText;
});

// ===========================
// Navigation — Screen 3 → 4
// ===========================
document.getElementById("to-quiz").addEventListener("click", () => {
  showScreen(3);
  startQuiz();
});

// ===========================
// Screen 4 — Quiz logic
// ===========================
function startQuiz() {
  let qIdx = 0;

  function renderQuestion() {
    const q = quizQuestions[qIdx];
    document.querySelector(".quiz-q").textContent = q.q;
    const opts = document.querySelector(".quiz-options");
    opts.innerHTML = "";
    document.querySelector(".quiz-feedback").textContent = "";
    q.options.forEach((option, i) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.addEventListener("click", () => handleAnswer(i));
      opts.appendChild(btn);
    });
  }

  function handleAnswer(idx) {
    const correct = idx === quizQuestions[qIdx].answer;
    document.querySelectorAll(".quiz-options button")[idx].classList.add("selected");
    document.querySelector(".quiz-feedback").textContent =
      correct ? "Yay, you know yourself well! \uD83C\uDF89" : "Hmm, not quite! But good try!";
    setTimeout(() => {
      qIdx++;
      if (qIdx < quizQuestions.length) {
        renderQuestion();
      } else {
        startTimeline();
      }
    }, QUIZ_ANSWER_DELAY_MS);
  }

  renderQuestion();
}

// ===========================
// Screen 5 — Timeline
// ===========================
function startTimeline() {
  showScreen(4);
  const t = document.querySelector(".timeline");
  t.innerHTML = "";
  (async function renderCards() {
    for (const m of memories) {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.innerHTML =
        `<div class="date">${m.date}</div><div>${m.text}</div>`;
      t.appendChild(card);
      await sleep(MEMORY_STAGGER_MS);
      card.classList.add("visible");
    }
  })();
}

// ===========================
// Navigation — Screen 5 → 6
// ===========================
document.getElementById("to-letter").addEventListener("click", () => {
  showScreen(5);
  document.querySelector(".letter-message").innerHTML =
    "Dear Anushka,<br/><br/>" +
    "I\u2019m so lucky to be your brother! Hope this has made you smile today.<br/><br/>" +
    "Love, Bickyy \uD83D\uDC96";
  document.querySelector(".letter-anim").innerHTML =
    `<div style="margin:18px auto 0;font-size:2em;">&#128196;</div>`;
});

// ===========================
// Navigation — Screen 6 → 7
// ===========================
document.getElementById("to-locked").addEventListener("click", () => {
  showScreen(6);
});

// ===========================
// Screen 7 — Envelope tap
// ===========================
document.getElementById("envelope").addEventListener("click", () => {
  const env = document.getElementById("envelope");
  env.textContent = "\uD83D\uDCE8";
  setTimeout(() => {
    document.querySelector(".locked-msg").innerHTML =
      "You unlocked the surprise!<br/>Almost there...";
    setTimeout(() => showFinalScreen(), ENVELOPE_FINAL_MS);
  }, ENVELOPE_OPEN_MS);
});

// ===========================
// Screen 8 — Final
// ===========================
function showFinalScreen() {
  showScreen(7);
  document.querySelector(".final-msg").textContent =
    "Hope you loved this little adventure. Happy Birthday, superstar! \uD83C\uDF82";
  confettiBurst();
}

function confettiBurst() {
  const container = document.getElementById("confetti");
  container.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = [
      "position:absolute",
      `left:${Math.random() * 90 + 5}vw`,
      "top:-5vh",
      `width:${Math.random() * 12 + 8}px`,
      `height:${Math.random() * 12 + 8}px`,
      `background:hsl(${Math.random() * 360},90%,60%)`,
      "border-radius:50%",
      "opacity:0.9"
    ].join(";");
    dot.animate(
      [
        { top: "-5vh", opacity: 1 },
        { top: `${Math.random() * 60 + 30}vh`, opacity: 0.2 }
      ],
      { duration: Math.random() * 900 + 1100, fill: "forwards" }
    );
    container.appendChild(dot);
  }
}
