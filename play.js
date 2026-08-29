// CrackMe — play.js
// Loads a quiz by ?id=, lets a friend guess one question at a time
// (with Back/Next and changeable answers), scores them against the
// creator's locked-in answers, and writes the result to the shared
// leaderboard stored in jsonbin.io.

const params = new URLSearchParams(window.location.search);
const binId = params.get("id");

const guesses = new Array(QUESTIONS.length).fill(null);
let quizData = null;
let current = 0;

function showStage(id) {
  ["loading-stage", "expired-stage", "notfound-stage", "board-only-stage", "name-stage", "quiz-stage", "results-stage"].forEach((s) => {
    document.getElementById(s).classList.toggle("hidden", s !== id);
  });
}

function isExpired(createdAt) {
  const ms = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - createdAt > ms;
}

async function fetchQuiz() {
  const res = await fetch(`${CONFIG.JSONBIN_BASE}/${binId}/latest`, {
    headers: { "X-Master-Key": CONFIG.JSONBIN_KEY },
  });
  if (!res.ok) throw new Error("not found");
  const data = await res.json();
  return data.record;
}

/* ---------- question paging ---------- */

function renderDots() {
  const el = document.getElementById("progressDots");
  let html = "";
  QUESTIONS.forEach((_, i) => {
    let cls = "dot";
    if (i === current) cls += " current";
    else if (guesses[i] !== null) cls += " done";
    html += `<span class="${cls}"></span>`;
  });
  el.innerHTML = html;
  document.getElementById("progressLabel").textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
}

function renderQuestionCard() {
  const q = QUESTIONS[current];
  const accent = ACCENTS[current % ACCENTS.length];
  const slot = document.getElementById("q-card-slot");
  const answered = guesses[current] !== null;
  const correctIdx = quizData.answers[current];

  let optsHtml = "";
  q.options.forEach((opt, oi) => {
    let cls = "opt-btn";
    if (answered) {
      cls += " review";
      if (oi === correctIdx) cls += " correct";
      else if (oi === guesses[current]) cls += " wrong";
    }
    optsHtml += `<button type="button" class="${cls}" data-oi="${oi}" ${answered ? "disabled" : ""}>
      <span class="opt-emoji">${opt.emoji}</span>
      <span class="opt-text">${opt.text}</span>
    </button>`;
  });

  slot.innerHTML = `
    <div class="q-card">
      <div class="q-emoji-badge" style="background:${accent}33;">${q.options[0].emoji}</div>
      <p class="q-tag">Evidence ${String(current + 1).padStart(2, "0")} / ${String(QUESTIONS.length).padStart(2, "0")}</p>
      <p class="q-text">${personalize(q.text, quizData.name)}</p>
      <div class="opt-grid">${optsHtml}</div>
    </div>`;

  if (!answered) {
    slot.querySelectorAll(".opt-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (guesses[current] !== null) return;
        guesses[current] = Number(btn.dataset.oi);
        renderQuestionCard();
        renderDots();
        updateNav();
      });
    });
  }

  stickerize(slot);
}

function updateNav() {
  document.getElementById("prevBtn").disabled = current === 0;
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.disabled = guesses[current] === null;
  nextBtn.textContent = current === QUESTIONS.length - 1 ? "Crack it open 🔓" : "Next →";
}

function goTo(index) {
  current = Math.max(0, Math.min(QUESTIONS.length - 1, index));
  renderQuestionCard();
  renderDots();
  updateNav();
}

/* ---------- results ---------- */

function renderReview(score) {
  const list = document.getElementById("review-list");
  let html = "";
  QUESTIONS.forEach((q, qi) => {
    let optsHtml = "";
    q.options.forEach((opt, oi) => {
      let cls = "opt-btn review";
      if (oi === quizData.answers[qi]) cls += " correct";
      else if (oi === guesses[qi]) cls += " wrong";
      optsHtml += `<button type="button" class="${cls}" disabled>
        <span class="opt-emoji">${opt.emoji}</span>
        <span class="opt-text">${opt.text}</span>
      </button>`;
    });
    html += `<div class="q-card" style="margin-bottom:12px;">
      <p class="q-tag">Evidence ${String(qi + 1).padStart(2, "0")} / ${String(QUESTIONS.length).padStart(2, "0")}</p>
      <p class="q-text">${personalize(q.text, quizData.name)}</p>
      <div class="opt-grid">${optsHtml}</div>
    </div>`;
  });
  list.innerHTML = html;
  stickerize(list);
}

function renderBoard(submissions) {
  const sorted = [...submissions].sort((a, b) => b.score - a.score || a.timestamp - b.timestamp);
  const board = document.getElementById("board");
  let html = `<div class="board-row head"><span>#</span><span>Name</span><span>Score</span></div>`;
  sorted.forEach((s, i) => {
    html += `<div class="board-row">
      <span class="rank ${i === 0 ? "top" : ""}">${i === 0 ? "🥇" : i + 1}</span>
      <span>${escapeHtml(s.name)}</span>
      <span class="score-pill">${s.score}/${QUESTIONS.length}</span>
    </div>`;
  });
  board.innerHTML = html;
  document.getElementById("boardNote").textContent =
    `${submissions.length} attempt${submissions.length === 1 ? "" : "s"} · closes ${EXPIRY_DAYS} days after creation`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function animateScoreArc(score, total) {
  const circle = document.getElementById("scoreArc");
  const circumference = 2 * Math.PI * 78;
  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;
  circle.style.transition = "stroke-dashoffset 1.1s cubic-bezier(0.2,0.8,0.2,1)";
  const pct = score / total;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      circle.style.strokeDashoffset = `${circumference * (1 - pct)}`;
    });
  });
  document.getElementById("scoreText").textContent = `${score}/${total}`;

  const pctInt = Math.round(pct * 100);
  const headline = document.getElementById("resultHeadline");
  if (pctInt >= 80) headline.innerHTML = "They know you! 🎉";
  else if (pctInt >= 50) headline.innerHTML = "Half-cracked. 🕵️";
  else headline.innerHTML = "Still a mystery. 🔒";
}

async function submitGuess() {
  const btn = document.getElementById("nextBtn");
  btn.disabled = true;
  btn.textContent = "Cracking the vault…";
  document.getElementById("prevBtn").disabled = true;

  const name = document.getElementById("guesserName").value.trim();
  let score = 0;
  guesses.forEach((g, i) => { if (g === quizData.answers[i]) score++; });

  try {
    // Re-fetch latest before writing, to reduce (not eliminate) race conditions
    // between friends submitting at the same time.
    const fresh = await fetchQuiz();
    const submission = { name, score, timestamp: Date.now() };
    const updated = { ...fresh, submissions: [...fresh.submissions, submission] };

    await fetch(`${CONFIG.JSONBIN_BASE}/${binId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": CONFIG.JSONBIN_KEY,
      },
      body: JSON.stringify(updated),
    });

    quizData = updated;
    showStage("results-stage");
    animateScoreArc(score, QUESTIONS.length);
    renderReview(score);
    renderBoard(updated.submissions);
    stickerize(document.getElementById("results-stage"));
  } catch (err) {
    btn.disabled = false;
    btn.textContent = "Crack it open 🔓";
    document.getElementById("prevBtn").disabled = false;
    alert("Couldn't submit your score — check your connection and try again.");
    console.error(err);
  }
}

/* ---------- init ---------- */

async function init() {
  stickerize(document.body);

  if (!binId) {
    showStage("notfound-stage");
    return;
  }
  try {
    quizData = await fetchQuiz();
    if (isExpired(quizData.createdAt)) {
      showStage("expired-stage");
      return;
    }

    document.getElementById("caseTag").textContent = `Case ${binId.slice(-4).toUpperCase()}`;
    document.getElementById("ownerName").textContent = `${quizData.name}'s`;
    document.getElementById("boardOwnerName").textContent = `${quizData.name}'s`;

    const nameInput = document.getElementById("guesserName");
    const startBtn = document.getElementById("startBtn");
    nameInput.addEventListener("input", () => {
      startBtn.disabled = nameInput.value.trim().length === 0;
    });
    startBtn.addEventListener("click", () => {
      showStage("quiz-stage");
      goTo(0);
    });

    document.getElementById("viewBoardBtn").addEventListener("click", () => renderBoardOnly());
    document.getElementById("playFromBoardBtn").addEventListener("click", (e) => {
      e.preventDefault();
      showStage("name-stage");
    });
    document.getElementById("boardOnlyRefresh").addEventListener("click", async (e) => {
      e.preventDefault();
      quizData = await fetchQuiz();
      renderBoardOnly();
    });

    document.getElementById("prevBtn").addEventListener("click", () => goTo(current - 1));
    document.getElementById("nextBtn").addEventListener("click", () => {
      if (current === QUESTIONS.length - 1) {
        submitGuess();
      } else {
        goTo(current + 1);
      }
    });

    const boardOnly = params.get("board") === "1";
    if (boardOnly) {
      renderBoardOnly();
    } else {
      showStage("name-stage");
    }
  } catch (err) {
    showStage("notfound-stage");
    console.error(err);
  }
}

function renderBoardOnly() {
  showStage("board-only-stage");

  const board = document.getElementById("boardOnly");
  const submissions = quizData.submissions || [];
  if (submissions.length === 0) {
    board.innerHTML = `<div class="board-row"><span></span><span>No attempts yet — share your link!</span><span></span></div>`;
  } else {
    const sorted = [...submissions].sort((a, b) => b.score - a.score || a.timestamp - b.timestamp);
    let html = `<div class="board-row head"><span>#</span><span>Name</span><span>Score</span></div>`;
    sorted.forEach((s, i) => {
      html += `<div class="board-row">
        <span class="rank ${i === 0 ? "top" : ""}">${i === 0 ? "🥇" : i + 1}</span>
        <span>${escapeHtml(s.name)}</span>
        <span class="score-pill">${s.score}/${QUESTIONS.length}</span>
      </div>`;
    });
    board.innerHTML = html;
  }
  document.getElementById("boardOnlyNote").textContent =
    `${submissions.length} attempt${submissions.length === 1 ? "" : "s"} · closes ${EXPIRY_DAYS} days after creation`;

  stickerize(document.getElementById("board-only-stage"));
}

document.addEventListener("DOMContentLoaded", init);
