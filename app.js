// Lucky Number Generator: fair random numbers with the browser's crypto API.

const $ = (id) => document.getElementById(id);

// A random integer from min to max (both included), without bias.
function randomInt(min, max) {
  const range = max - min + 1;
  const limit = Math.floor(2 ** 32 / range) * range;   // reject values above this
  const buf = new Uint32Array(1);
  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= limit);
  return min + (buf[0] % range);
}

// Pick `count` numbers between start and end.
function pickNumbers(start, end, count, unique) {
  const picked = [];
  while (picked.length < count) {
    const n = randomInt(start, end);
    if (unique && picked.includes(n)) continue;
    picked.push(n);
  }
  return picked;
}

// Check the inputs and return an error message, or "" if all is fine.
function validate(start, end, count, unique) {
  if (![start, end, count].every(Number.isInteger)) return "Please enter whole numbers.";
  if (start >= end) return "The range end must be bigger than the start.";
  if (end - start >= 1e9) return "Please keep the range under one billion numbers.";
  if (count < 1 || count > 50) return "Choose between 1 and 50 numbers.";
  if (unique && count > end - start + 1) return `Only ${end - start + 1} different numbers fit in this range.`;
  return "";
}

function showBalls(numbers) {
  const box = $("balls");
  box.innerHTML = "";
  numbers.forEach((n, i) => {
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.textContent = n;
    ball.style.animationDelay = `${i * 0.12}s`;
    box.appendChild(ball);
  });
}

// The last 5 picks are kept in this browser only (localStorage).
function loadHistory() {
  try { return JSON.parse(localStorage.getItem("lucky-history")) || []; } catch (e) { return []; }
}

function renderHistory(list) {
  const ol = $("history");
  ol.innerHTML = "";
  list.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    ol.appendChild(li);
  });
}

function addToHistory(text) {
  const list = [text, ...loadHistory()].slice(0, 5);
  try { localStorage.setItem("lucky-history", JSON.stringify(list)); } catch (e) {}
  renderHistory(list);
}

$("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const start = Number($("start").value);
  const end = Number($("end").value);
  const count = Number($("count").value);
  const unique = $("unique").checked;

  const error = validate(start, end, count, unique);
  $("error").textContent = error;
  if (error) return;

  const numbers = pickNumbers(start, end, count, unique);
  if ($("sorted").checked) numbers.sort((a, b) => a - b);

  const text = numbers.join(" - ");
  $("result").value = text;
  showBalls(numbers);
  addToHistory(text);
});

// Preset buttons fill in the three inputs.
document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    const [start, end, count] = button.dataset.preset.split(",");
    $("start").value = start;
    $("end").value = end;
    $("count").value = count;
    $("go").click();
  });
});

$("copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText($("result").value);
    $("copy").textContent = "Copied!";
  } catch (e) {
    $("result").select();
  }
  setTimeout(() => ($("copy").textContent = "Copy"), 1500);
});

renderHistory(loadHistory());
