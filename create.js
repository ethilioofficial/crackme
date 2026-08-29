// CrackMe — create.js
// One question at a time, with Back / Next, and the ability to change
// an answer at any point before generating the link.

const answers = new Array(QUESTIONS.length).fill(null);
let current = 0;
let creatorNameValue = "";

function renderDots() {
  const el = document.getElementById("progressDots");
  let html = "";
  QUESTIONS.forEach((_, i) => {
    let cls = "dot";
    if (i === current) cls += " current";
    else if (answers[i] !== null) cls += " done";
    html += `<span class="${cls}"></span>`;
  });
  el.innerHTML = html;
  document.getElementById("progressLabel").textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
}

function renderQuestionCard() {
  const q = QUESTIONS[current];
  const accent = ACCENTS[current % ACCENTS.length];
  const slot = document.getElementById("q-card-slot");

  let optsHtml = "";
  q.options.forEach((opt, oi) => {
    const selected = answers[current] === oi;
    optsHtml += `<button type="button" class="opt-btn ${selected ? "selected" : ""}" data-oi="${oi}"
      style="${selected ? `--accent:${accent}; --accent-soft:${accent}22;` : ""}">
      <span class="opt-emoji">${opt.emoji}</span>
      <span class="opt-text">${opt.text}</span>
    </button>`;
  });

  slot.innerHTML = `
    <div class="q-card">
      <div class="q-emoji-badge" style="background:${accent}33;">${q.options[0].emoji}</div>
      <p class="q-tag">Evidence ${String(current + 1).padStart(2, "0")} / ${String(QUESTIONS.length).padStart(2, "0")}</p>
      <p class="q-text">${personalize(q.text, creatorNameValue)}</p>
      <div class="opt-grid">${optsHtml}</div>
    </div>`;

  slot.querySelectorAll(".opt-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      answers[current] = Number(btn.dataset.oi);
      renderQuestionCard();
      renderDots();
      updateNav();
    });
  });

  stickerize(slot);
}

function updateNav() {
  document.getElementById("prevBtn").disabled = current === 0;
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.disabled = answers[current] === null;
  nextBtn.textContent = current === QUESTIONS.length - 1 ? "Finish 🔓" : "Next →";
}

function goTo(index) {
  current = Math.max(0, Math.min(QUESTIONS.length - 1, index));
  renderQuestionCard();
  renderDots();
  updateNav();
}

async function finishQuiz() {
  const btn = document.getElementById("nextBtn");
  btn.disabled = true;
  btn.textContent = "Locking the vault…";
  document.getElementById("prevBtn").disabled = true;

  const payload = {
    kind: "crackme",
    name: document.getElementById("creatorName").value.trim(),
    createdAt: Date.now(),
    answers: answers,
    submissions: [],
  };

  try {
    const res = await fetch(CONFIG.JSONBIN_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": CONFIG.JSONBIN_KEY,
        "X-Bin-Private": "false",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Storage error (${res.status})`);
    const data = await res.json();
    const binId = data.metadata.id;

    const shareUrl = `${window.location.origin}${window.location.pathname.replace("index.html", "")}play.html?id=${binId}`;
    const boardUrl = `${shareUrl}&board=1`;

    document.getElementById("quiz-stage").classList.add("hidden");
    document.getElementById("result-stage").classList.remove("hidden");
    document.getElementById("shareLink").value = shareUrl;
    document.getElementById("openBoardLink").href = boardUrl;
  } catch (err) {
    document.getElementById("error-stage").classList.remove("hidden");
    document.getElementById("errorText").textContent =
      "😬 Couldn't save your CrackMe. Check that config.js has a valid jsonbin.io key, then try again.";
    btn.disabled = false;
    btn.textContent = "Finish 🔓";
    document.getElementById("prevBtn").disabled = false;
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  stickerize(document.body);

  const nameInput = document.getElementById("creatorName");
  const startBtn = document.getElementById("startBtn");

  nameInput.addEventListener("input", () => {
    startBtn.disabled = nameInput.value.trim().length === 0;
  });

  startBtn.addEventListener("click", () => {
    creatorNameValue = nameInput.value.trim();
    document.getElementById("name-stage").classList.add("hidden");
    document.getElementById("quiz-stage").classList.remove("hidden");
    goTo(0);
  });

  document.getElementById("prevBtn").addEventListener("click", () => goTo(current - 1));
  document.getElementById("nextBtn").addEventListener("click", () => {
    if (current === QUESTIONS.length - 1) {
      finishQuiz();
    } else {
      goTo(current + 1);
    }
  });

  document.getElementById("copyBtn").addEventListener("click", () => {
    const input = document.getElementById("shareLink");
    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
      const btn = document.getElementById("copyBtn");
      const old = btn.textContent;
      btn.textContent = "COPIED ✓";
      setTimeout(() => (btn.textContent = old), 1500);
    });
  });
});
