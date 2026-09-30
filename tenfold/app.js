const lessonRoot = document.querySelector("#lesson");
const liveRegion = document.querySelector("#live-region");
const xpValue = document.querySelector("#xp-value");
const curriculum = window.TENFOLD_CURRICULUM || [];

const STORAGE_KEY = "tenfold-curriculum-v2";
const groupOrder = [
  "Number foundations", "Operations", "Multiplication & division",
  "Fractions & decimals", "Geometry", "Measurement & data",
  "Patterns & properties", "Mental math", "Tools",
];
const groupCopy = {
  "Number foundations": "Build numbers, compare them, and see what every digit is worth.",
  Operations: "Make addition and subtraction visible, one place at a time.",
  "Multiplication & division": "Arrange equal groups, arrays, products, quotients, and area.",
  "Fractions & decimals": "Touch parts of a whole and connect them to decimal places and money.",
  Geometry: "Fold, plot, classify, and inspect shapes in two and three dimensions.",
  "Measurement & data": "Measure real things, organize information, and reason about chance.",
  "Patterns & properties": "Find the rules hiding inside numbers and equivalent expressions.",
  "Mental math": "Practice friendly strategies that make facts faster to understand.",
  Tools: "Sketch freely and see what source material comes next.",
};

const state = {
  view: "home",
  lessonId: curriculum[0]?.id || null,
  filter: "All",
  xp: 0,
  completed: [],
  lastLessonId: curriculum[0]?.id || null,
  activity: {},
  practice: null,
  stageHeight: 0,
  dyslexic: false,
};

const isLesson = (item) => item.group !== "Tools";
const lessonTotal = curriculum.filter(isLesson).length;
const exploredCount = () => curriculum.filter((item) => isLesson(item) && state.completed.includes(item.id)).length;

loadProgress();
applyReadingFont();
if (state.dyslexic) loadReadingFont().then(refitLessonStage);
bindApp();
if (location.hash.length > 2) followRoute();
else render();

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;
    state.xp = Number(saved.xp) || 0;
    state.completed = Array.isArray(saved.completed)
      ? saved.completed.filter((id) => curriculum.some((item) => item.id === id)) : [];
    state.lastLessonId = curriculum.some((item) => item.id === saved.lastLessonId)
      ? saved.lastLessonId : state.lastLessonId;
    state.lessonId = state.lastLessonId;
    state.dyslexic = saved.dyslexic === true;
  } catch {
    // A blocked storage API should never stop a lesson.
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      xp: state.xp,
      completed: state.completed,
      lastLessonId: state.lastLessonId,
      dyslexic: state.dyslexic,
    }));
  } catch {
    // Progress remains available for this session.
  }
}

function bindApp() {
  document.addEventListener("click", (event) => {
    const nav = event.target.closest("[data-nav]");
    if (nav) return navigate(nav.dataset.nav);
    const lessonButton = event.target.closest("[data-open-lesson]");
    if (lessonButton) return openLesson(lessonButton.dataset.openLesson);
    const filter = event.target.closest("[data-filter]");
    if (filter) {
      state.filter = filter.dataset.filter;
      renderLibrary(false);
      return;
    }
    if (event.target.closest("[data-reading-toggle]")) return setReadingFont(!state.dyslexic);
    const adjust = event.target.closest("[data-adjust]");
    if (adjust) return adjustActivity(adjust.dataset.adjust, Number(adjust.dataset.delta));
    const action = event.target.closest("[data-action]");
    if (action) handleAction(action.dataset.action, action);
  });

  document.addEventListener("input", (event) => {
    const control = event.target.closest("[data-range]");
    if (!control) return;
    state.activity[control.dataset.range] = Number(control.value);
    renderLesson();
  });

  document.addEventListener("submit", (event) => {
    if (event.target.matches("#missing-form")) checkMissingAnswer(event);
    if (event.target.matches("#practice-form")) checkPractice(event);
  });

  window.addEventListener("popstate", followRoute);
}

// Each screen gets its own address, so the tablet's Back button steps back
// through the app instead of closing it.
function followRoute() {
  const [, view = "", id] = location.hash.split("/");
  if (view === "lesson" && curriculum.some((item) => item.id === id)) return openLesson(id, { fromHistory: true });
  navigate(["library", "practice", "progress"].includes(view) ? view : "home", { fromHistory: true });
}

function rememberRoute() {
  const hash = state.view === "lesson" ? `#/lesson/${state.lessonId}` : state.view === "home" ? "#/" : `#/${state.view}`;
  if (location.hash !== hash) history.pushState(null, "", hash);
}

function navigate(view, options = {}) {
  state.view = view;
  if (view === "practice" && !state.practice) resetPractice();
  if (!options.fromHistory) rememberRoute();
  updateNavigation();
  render();
  focusMain();
}

function openLesson(id, options = {}) {
  const lesson = curriculum.find((item) => item.id === id);
  if (!lesson) return;
  state.lessonId = id;
  state.lastLessonId = id;
  state.view = "lesson";
  state.activity = initialActivity(lesson);
  saveProgress();
  if (!options.fromHistory) rememberRoute();
  updateNavigation("library");
  renderLesson({ fresh: true });
  focusMain();
  announce(`Opened ${lesson.title}.`);
}

function focusMain() {
  lessonRoot.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

function updateNavigation(forceView = null) {
  const activeView = forceView || (state.view === "lesson" ? "library" : state.view);
  document.querySelectorAll("[data-nav]").forEach((item) => {
    const active = item.dataset.nav === activeView;
    item.classList.toggle("is-active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  xpValue.textContent = state.xp;
}

function render() {
  updateNavigation();
  if (state.view === "home") renderHome();
  if (state.view === "library") renderLibrary();
  if (state.view === "lesson") renderLesson({ fresh: true });
  if (state.view === "practice") renderPractice(true);
  if (state.view === "progress") renderProgress();
}

// A fresh screen replaces the page and plays its entrance. Anything else only
// updates what changed, so panels don't flash or jump, scroll positions stay,
// and a slider keeps following the finger mid-drag.
function paint(html, fresh = true) {
  const next = document.createElement("div");
  next.innerHTML = html;
  const viewOf = (element) => element?.classList[0];
  if (fresh || viewOf(lessonRoot.firstElementChild) !== viewOf(next.firstElementChild)) {
    lessonRoot.replaceChildren(...next.childNodes);
    return;
  }
  morphChildren(lessonRoot, next);
}

function morphChildren(from, to) {
  const oldNodes = [...from.childNodes];
  const newNodes = [...to.childNodes];
  newNodes.forEach((node, i) => {
    const old = oldNodes[i];
    if (!old) from.appendChild(node);
    else if (sameKind(old, node)) morphNode(old, node);
    else from.replaceChild(node, old);
  });
  oldNodes.slice(newNodes.length).forEach((node) => node.remove());
}

function sameKind(a, b) {
  if (a.nodeType !== b.nodeType || a.nodeName !== b.nodeName) return false;
  if (a.nodeType !== Node.ELEMENT_NODE) return true;
  return a.id === b.id && a.getAttribute("data-key") === b.getAttribute("data-key")
    && (a.nodeName !== "INPUT" || a.type === b.type);
}

function morphNode(old, node) {
  if (old.nodeType !== Node.ELEMENT_NODE) {
    if (old.nodeValue !== node.nodeValue) old.nodeValue = node.nodeValue;
    return;
  }
  [...old.attributes].forEach(({ name }) => { if (!node.hasAttribute(name)) old.removeAttribute(name); });
  [...node.attributes].forEach(({ name, value }) => { if (old.getAttribute(name) !== value) old.setAttribute(name, value); });
  if (old.nodeName === "INPUT") {
    // Typed answers stay put; sliders and ticks follow the new state.
    if (old.type === "range" && old.value !== node.getAttribute("value")) old.value = node.getAttribute("value");
    if (old.type === "checkbox" || old.type === "radio") old.checked = node.hasAttribute("checked");
    return;
  }
  if (old.nodeName === "CANVAS" || old.nodeName === "TEXTAREA") return;
  morphChildren(old, node);
}

function renderHome() {
  const next = curriculum.find((item) => !state.completed.includes(item.id) && isLesson(item)) || curriculum[0];
  const explored = exploredCount();
  const percent = Math.round((explored / lessonTotal) * 100);
  paint(`
    <section class="home-view" aria-labelledby="home-title">
      <div class="home-intro">
        <div class="home-copy">
          <h1 id="home-title">Math makes sense when you can move it.</h1>
          <p>Explore every Grade 3 idea with blocks, grids, number lines, clocks, fraction bars, and more. Nothing is timed. Try, notice, and try again.</p>
          <div class="home-actions">
            <button class="primary-button" type="button" data-open-lesson="${next.id}">${explored ? "Continue my path" : "Start with numbers"}</button>
            <button class="secondary-button" type="button" data-nav="library">See all ${lessonTotal} lessons</button>
          </div>
        </div>
        <div class="home-model" aria-label="Animated place-value model for 1,246">
          <div class="model-number"><span>1</span><span>2</span><span>4</span><span>6</span></div>
          <div class="model-labels"><span>thousands</span><span>hundreds</span><span>tens</span><span>ones</span></div>
          <div class="model-pieces" aria-hidden="true">
            <i class="model-thousand"></i>
            <span class="model-hundreds"><i></i><i></i></span>
            <span class="model-tens">${Array.from({ length: 4 }, () => "<i></i>").join("")}</span>
            <span class="model-ones">${Array.from({ length: 6 }, () => "<i></i>").join("")}</span>
          </div>
          <div class="model-equation">1,000 + 200 + 40 + 6</div>
        </div>
      </div>
      <div class="continue-band">
        <div><strong>${explored} of ${lessonTotal}</strong><span>lessons explored</span></div>
        <div class="progress-track" aria-label="${percent}% complete"><i style="transform:scaleX(${percent / 100})"></i></div>
        <span>${percent}%</span>
      </div>
      <section class="journey-section" aria-labelledby="journeys-title">
        <div class="section-heading"><h2 id="journeys-title">Choose a way into the math</h2><button class="text-button" type="button" data-nav="library">Browse every lesson</button></div>
        <div class="journey-list">${groupOrder.filter((group) => group !== "Tools").map(journeyRow).join("")}</div>
      </section>
    </section>`);
}

function journeyRow(group) {
  const lessons = curriculum.filter((item) => item.group === group);
  const done = lessons.filter((item) => state.completed.includes(item.id)).length;
  const firstOpen = lessons.find((item) => !state.completed.includes(item.id)) || lessons[0];
  return `<article class="journey-row">
    <button class="journey-main" type="button" data-open-lesson="${firstOpen.id}"><span class="journey-name">${group}</span><span class="journey-copy">${groupCopy[group]}</span><span class="journey-arrow" aria-hidden="true">${arrowIcon()}</span></button>
    <div class="journey-meta"><strong>${done}/${lessons.length}</strong><span>explored</span></div>
  </article>`;
}

function renderLibrary(fresh = true) {
  const groups = ["All", ...groupOrder.filter((group) => curriculum.some((item) => item.group === group))];
  const visible = state.filter === "All" ? curriculum : curriculum.filter((item) => item.group === state.filter);
  const lessons = visible.filter(isLesson).length;
  const tools = visible.length - lessons;
  const count = [lessons && `${lessons} visual lessons`, tools && `${tools} ${tools === 1 ? "tool" : "tools"}`].filter(Boolean).join(" and ");
  paint(`
    <section class="library-view" aria-labelledby="library-title">
      <header class="library-heading"><div><h1 id="library-title">Every lesson, ready to touch.</h1><p>${count}. Pick any idea; the app remembers where you explored.</p></div>${coach("You do not have to go in order. Choose the idea you are curious about today.")}</header>
      <div class="filter-scroll" role="group" aria-label="Filter lessons by topic">${groups.map((group) => `<button type="button" class="filter-button ${state.filter === group ? "is-active" : ""}" data-filter="${group}">${group}</button>`).join("")}</div>
      <div class="lesson-list">${visible.map(lessonRow).join("")}</div>
    </section>`, fresh);
}

function lessonRow(lesson) {
  const completed = state.completed.includes(lesson.id);
  return `<article class="lesson-row ${completed ? "is-complete" : ""}"><button type="button" class="lesson-row-button" data-open-lesson="${lesson.id}">
    <span class="lesson-page">${String(lesson.page).padStart(2, "0")}</span>
    <span class="lesson-row-content"><strong>${lesson.title}</strong><span>${lesson.summary}</span></span>
    <span class="lesson-engine">${engineLabel(lesson.engine)}</span>
    <span class="completion-mark" aria-label="${completed ? "Explored" : "Not yet explored"}">${completed ? checkIcon() : arrowIcon()}</span>
  </button></article>`;
}

function renderLesson(options = {}) {
  const lesson = curriculum.find((item) => item.id === state.lessonId) || curriculum[0];
  if (!lesson) return;
  if (!Object.keys(state.activity).length) state.activity = initialActivity(lesson);
  const index = curriculum.indexOf(lesson);
  const completed = state.completed.includes(lesson.id);
  paint(`
    <section class="lesson-player" data-lesson="${lesson.id}" aria-labelledby="lesson-title">
      <nav class="lesson-crumbs" aria-label="Lesson navigation"><button class="text-button" type="button" data-nav="library">${backIcon()} All lessons</button><span>Source page ${lesson.page}</span><span>${lesson.source}</span></nav>
      <header class="player-heading"><div><h1 id="lesson-title">${lesson.title}</h1><p>${lesson.summary}</p></div><div class="lesson-position"><strong>${index + 1}</strong><span>of ${curriculum.length}</span></div></header>
      <div class="player-grid">
        <section class="activity-panel" aria-label="Interactive visual">
          <div class="activity-bar"><span>${engineLabel(lesson.engine)}</span><button class="replay-button" type="button" data-action="reset-activity">${replayIcon()} Reset</button></div>
          <div class="activity-stage" id="activity-stage">${renderActivity(lesson)}</div>
          <div class="activity-help" id="activity-help" aria-live="polite">${activityInstruction(lesson)}</div>
        </section>
        <aside class="lesson-notes">
          ${coach(coachCopy(lesson), "Notice this")}
          <div class="fact-block"><span>Keep this idea</span><strong>${lesson.fact}</strong></div>
          <div class="source-block"><span>Visual source</span><p>${lesson.visual}</p></div>
          <button class="${completed ? "secondary-button completed-button" : "primary-button"}" type="button" data-action="complete-lesson">${completed ? `${checkIcon()} Explored` : "I explored this lesson"}</button>
        </aside>
      </div>
      <nav class="lesson-pager" aria-label="Previous and next lesson">
        ${index > 0 ? `<button type="button" class="pager-button previous" data-open-lesson="${curriculum[index - 1].id}">${backIcon()}<span><small>Previous</small>${curriculum[index - 1].title}</span></button>` : "<span></span>"}
        ${index < curriculum.length - 1 ? `<button type="button" class="pager-button next" data-open-lesson="${curriculum[index + 1].id}"><span><small>Next</small>${curriculum[index + 1].title}</span>${arrowIcon()}</button>` : ""}
      </nav>
    </section>`, Boolean(options.fresh));
  if (lesson.engine === "scratchpad") setupScratchpad();
  keepStageHeight(lesson, options.fresh);
}

// Within one lesson the activity area may grow but never shrinks back,
// so the notes and buttons below it don't jump up and down while playing.
// On opening, every view of a switchable model is measured, so switching
// between them later doesn't push the page either. The measuring copies are
// thrown away and the real model put back untouched, so a slider position or
// a half-typed answer survives being re-measured after a font change.
function keepStageHeight(lesson, fresh) {
  const stage = lessonRoot.querySelector("#activity-stage");
  if (!stage) return;
  stage.style.minHeight = "";
  let tallest = stage.offsetHeight;
  const modes = [...stage.querySelectorAll("[data-action='representation']")].map((button) => button.dataset.value);
  if (fresh && modes.length) {
    const live = [...stage.childNodes];
    const mode = state.activity.mode;
    modes.forEach((value) => {
      state.activity.mode = value;
      stage.innerHTML = renderActivity(lesson);
      tallest = Math.max(tallest, stage.offsetHeight);
    });
    state.activity.mode = mode;
    stage.replaceChildren(...live);
  }
  state.stageHeight = Math.max(fresh ? 0 : state.stageHeight, tallest);
  stage.style.minHeight = `${state.stageHeight}px`;
}

function initialActivity(lesson) {
  return {
    ...JSON.parse(JSON.stringify(lesson.config || {})),
    mode: lesson.config?.mode || null,
    step: 0, folded: false, rotated: false, revealed: false,
    selected: null, result: null, draws: [], scratchColor: "#2557d6",
  };
}

function completeLesson(lesson) {
  if (!state.completed.includes(lesson.id)) {
    state.completed.push(lesson.id);
    state.xp += 20;
    saveProgress();
    celebrate(lessonRoot.querySelector("[data-action='complete-lesson']"));
    announce(`${lesson.title} explored. Twenty experience points earned.`);
  }
  updateNavigation();
  renderLesson();
}

function renderPractice(fresh = false) {
  if (!state.practice) resetPractice();
  const p = state.practice;
  if (p.round >= 5) {
    paint(`<section class="practice-view complete-practice" aria-labelledby="practice-title"><div class="practice-complete-mark">${checkIcon()}</div><h1 id="practice-title">You finished the set.</h1><p>${p.correct} of 5 correct. The important part is that you used a strategy and kept going.</p><div class="practice-summary"><span><strong>${p.correct}</strong> correct</span><span><strong>${5 - p.correct}</strong> to revisit</span><span><strong>+${p.correct * 5}</strong> XP</span></div><div class="home-actions"><button class="primary-button" type="button" data-action="practice-next">Play another set</button><button class="secondary-button" type="button" data-nav="library">Choose a lesson</button></div></section>`, fresh);
    return;
  }
  const problem = p.problems[p.round];
  paint(`<section class="practice-view" aria-labelledby="practice-title">
    <header class="practice-heading"><div><h1 id="practice-title">Five thoughtful moves.</h1><p>There is no timer. Use the hint whenever a visual would help.</p></div><span>${p.correct} correct</span></header>
    <div class="practice-workbench"><div class="round-track" aria-label="Question ${p.round + 1} of 5">${Array.from({ length: 5 }, (_, i) => `<i class="${i < p.round ? "done" : i === p.round ? "current" : ""}"></i>`).join("")}</div><div class="practice-problem">${problem.label}</div><form id="practice-form"><label for="practice-answer">Your answer</label><div><input id="practice-answer" data-key="question-${p.set}-${p.round}" inputmode="numeric" autocomplete="off" autofocus /><button class="primary-button" type="submit"${p.locked ? " disabled" : ""}>Check</button></div></form><div class="practice-message" aria-live="polite">${p.message || "Take your time and make the quantities visible in your mind."}</div>${p.hint ? practiceHint(problem) : `<button class="text-button" type="button" data-action="practice-hint">Show a visual hint</button>`}</div>
  </section>`, fresh);
}

function resetPractice() {
  const set = (state.practice?.set || 0) + 1;
  state.practice = { set, round: 0, correct: 0, tries: 0, hint: false, locked: false, message: "", problems: makeProblems() };
}

// A new mix of the same five kinds of question for every set.
function makeProblems() {
  const pick = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const base = pick(7, 9);
  const add = pick(11 - base, 9);
  const rows = pick(2, 9);
  const cols = pick(2, 9);
  const start = pick(21, 95);
  const minus = pick(8, 9);
  const width = pick(2, 9);
  const height = pick(1, width);
  let round = pick(11, 98);
  while (round % 5 === 0) round = pick(11, 98);
  const down = round - (round % 10);
  const nearest = round % 10 > 5 ? down + 10 : down;
  const other = nearest === down ? down + 10 : down;
  return [
    { label: `${base} + ${add}`, answer: base + add, kind: "make-ten", a: base, b: add,
      hint: "Fill ten first, then count what remains.",
      explain: `Move ${10 - base} to the ${base} to make 10, then add the remaining ${add - (10 - base)}.` },
    { label: `${rows} × ${cols}`, answer: rows * cols, kind: "array", a: rows, b: cols,
      explain: `${rows} rows of ${cols} make ${rows * cols} counters.` },
    { label: `${start} − ${minus}`, answer: start - minus, kind: "number-line", a: start, b: minus,
      hint: `Start at ${start} and make one jump back ${minus} spaces.`,
      explain: `Move back 10 to ${start - 10}, then forward ${10 - minus} to ${start - minus}.` },
    { label: `Perimeter of ${width} cm by ${height} cm`, answer: 2 * (width + height), kind: "perimeter", a: width, b: height,
      hint: `${width} + ${height} + ${width} + ${height}`,
      explain: `Add all four outside edges: ${width} + ${height} + ${width} + ${height}.` },
    { label: `Round ${round} to the nearest ten`, answer: nearest, kind: "round", a: round, b: 10,
      hint: `${round} is between ${down} and ${down + 10}. Which one is closer?`,
      explain: `${round} is closer to ${nearest} than to ${other}.` },
  ];
}

function checkPractice(event) {
  event.preventDefault();
  const p = state.practice;
  if (!p || p.locked || p.round >= 5) return;
  const input = document.querySelector("#practice-answer");
  const typed = input.value.trim();
  const problem = p.problems[p.round];
  if (!typed) {
    p.message = "Type your answer in the box first.";
    renderPractice();
    input.focus();
    return;
  }
  if (Number(typed) === problem.answer) {
    // Lock until the next question shows, so repeated taps count once.
    p.locked = true;
    p.correct += 1;
    state.xp += 5;
    p.message = `Exactly. ${problem.explain}`;
    saveProgress();
    updateNavigation();
    renderPractice();
    window.setTimeout(() => {
      p.round += 1;
      p.tries = 0;
      p.hint = false;
      p.locked = false;
      p.message = "";
      if (state.view === "practice" && state.practice === p) {
        renderPractice();
        document.querySelector("#practice-answer")?.focus();
      }
    }, prefersReducedMotion() ? 20 : 850);
  } else {
    p.tries += 1;
    p.message = p.tries === 1 ? "Not yet. Have another go. The picture below can help." : `Not yet. ${problem.explain}`;
    p.hint = true;
    renderPractice();
    input.focus();
  }
}

function practiceHint(problem) {
  if (problem.kind === "make-ten") return `<div class="practice-visual ten-hint">${Array.from({ length: 10 }, (_, i) => `<i class="${i < problem.a ? "filled" : "moved"}"></i>`).join("")}<span>${problem.hint}</span></div>`;
  if (problem.kind === "array") return `<div class="practice-visual mini-array" style="--cols:${problem.b}">${Array.from({ length: problem.a * problem.b }, () => "<i></i>").join("")}</div>`;
  return `<div class="practice-visual"><span>${problem.hint}</span></div>`;
}

function renderProgress(fresh = true) {
  const explored = exploredCount();
  const percent = Math.round((explored / lessonTotal) * 100);
  paint(`<section class="progress-view" aria-labelledby="progress-title"><header class="progress-heading"><div><h1 id="progress-title">Your path is taking shape.</h1><p>Exploration counts here. Revisit any lesson whenever a model would help.</p></div>${coach("A lesson is never used up. Returning with a new question is part of learning.")}</header><div class="progress-overview"><div><strong>${explored}</strong><span>lessons explored</span></div><div class="large-progress"><i style="transform:scaleX(${percent / 100})"></i></div><strong>${percent}%</strong><div><strong>${state.xp}</strong><span>experience points</span></div></div>${readingSetting()}<div class="progress-groups">${groupOrder.map(progressGroup).join("")}</div></section>`, fresh);
}

function readingSetting() {
  const on = state.dyslexic;
  return `<section class="reading-setting" aria-labelledby="reading-title">
    <span class="reading-sample" aria-hidden="true">Aa</span>
    <div><h2 id="reading-title">Dyslexia-friendly text</h2><p>Do letters seem to wiggle or swap places? Switch this on. All the words change to OpenDyslexic letters, with more space between letters, words and lines.</p></div>
    <button class="reading-switch" type="button" role="switch" aria-checked="${on}" aria-labelledby="reading-title" data-reading-toggle><span class="switch-track" aria-hidden="true"><i></i></span><span class="reading-switch-state">${on ? "On" : "Off"}</span></button>
  </section>`;
}

// Dyslexia-friendly text swaps every font for OpenDyslexic and opens up the
// spacing. The font file is fetched before the page switches, so the text
// changes once rather than twice, and nothing on screen is rebuilt: typed
// answers and slider positions stay exactly where they were.
function setReadingFont(on) {
  state.dyslexic = on;
  saveProgress();
  (on ? loadReadingFont() : Promise.resolve()).then(() => {
    if (state.dyslexic !== on) return;
    applyReadingFont();
    if (state.view === "progress") renderProgress(false);
    refitLessonStage();
    announce(`Dyslexia-friendly text ${on ? "on" : "off"}.`);
  });
}

function applyReadingFont() {
  document.documentElement.classList.toggle("dyslexic-text", state.dyslexic);
  document.querySelector("#reading-toggle").setAttribute("aria-checked", String(state.dyslexic));
}

function loadReadingFont() {
  try {
    return Promise.all(["400", "700"].map((weight) => document.fonts.load(`${weight} 1em OpenDyslexic`))).catch(() => {});
  } catch {
    return Promise.resolve();
  }
}

// Bigger or smaller letters change how tall each view of the model is, so
// measure them again for the new font.
function refitLessonStage() {
  const lesson = curriculum.find((item) => item.id === state.lessonId);
  if (state.view === "lesson" && lesson) keepStageHeight(lesson, true);
}

function progressGroup(group) {
  const lessons = curriculum.filter((item) => item.group === group);
  if (!lessons.length) return "";
  const done = lessons.filter((item) => state.completed.includes(item.id));
  const next = lessons.find((item) => !state.completed.includes(item.id)) || lessons[0];
  return `<article class="progress-group"><div><h2>${group}</h2><p>${done.length} of ${lessons.length} explored</p></div><div class="lesson-dots" aria-label="${done.length} of ${lessons.length} explored">${lessons.map((item) => `<i class="${state.completed.includes(item.id) ? "done" : ""}"></i>`).join("")}</div><button class="secondary-button" type="button" data-open-lesson="${next.id}">${done.length === lessons.length ? "Revisit" : "Continue"}</button></article>`;
}

function coach(message, label = "Pip's tip") {
  return `<aside class="coach" aria-label="Learning coach"><img src="assets/pip-mascot.png" alt="Pip, a blue felt counting helper holding a red cube" /><div class="coach-bubble"><strong>${label}</strong>${message}</div></aside>`;
}

function arrowIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>`; }
function backIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M10 7l-5 5 5 5" /></svg>`; }
function replayIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M19 12a7 7 0 1 1-2-5" /></svg>`; }
function checkIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7" /></svg>`; }
function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }
function capitalize(text) { return text.charAt(0).toUpperCase() + text.slice(1); }
function prefersReducedMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
function announce(message) { liveRegion.textContent = ""; window.setTimeout(() => { liveRegion.textContent = message; }, 20); }
