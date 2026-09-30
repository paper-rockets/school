const ENGINE_LABELS = {
  "number-sync": "Three-way number lab", "place-slider": "Place-value slider", unbundle: "Block unbundler",
  decompose: "Number tree", compare: "Balance comparison", symmetry: "Folding canvas",
  "addition-table": "Interactive addition grid", "number-line": "Number-line jumper",
  "column-add": "Regrouping simulator", "column-subtract": "Unbundling simulator",
  coordinate: "Coordinate plotter", "missing-term": "Inverse-operation solver", angle: "Paper-corner tester",
  polygon: "Polygon classifier", estimate: "Sample estimator", bundle: "Collection bundler",
  array: "Array rotator", division: "Equal-group sharing", fraction: "Fraction builder",
  "fraction-compare": "Fraction-bar comparer", "decimal-place": "Decimal magnifier", money: "Coin sorting mat",
  metric: "Metric slider", perimeter: "Perimeter tracer", "bar-graph": "Data converter",
  solid: "Solid inspector", net: "Net folder", "multiplication-table": "Times-table explorer",
  area: "Area counter", "equivalent-fractions": "Equivalent fraction strips",
  "decimal-operation": "Decimal aligner", "partial-products": "Partial-products box",
  rounding: "Rounding number line", pairing: "Pairing inspector", factors: "Factor organizer",
  pattern: "Pattern machine", clock: "Interactive clock", "measure-sort": "Measurement sorter",
  probability: "Probability lab", combinations: "Combination builder", expressions: "Expression connector",
  scratchpad: "Grid scratchpad", mental: "Strategy table", "make-ten": "Ten-frame snapper",
  grouping: "Friendly-number grouper", transition: "Source checkpoint",
};

function renderActivity(lesson) {
  const engines = {
    "number-sync": renderNumberSync, "place-slider": renderPlaceSlider, unbundle: renderUnbundle,
    decompose: renderDecompose, compare: renderCompare, symmetry: renderSymmetry,
    "addition-table": renderAdditionTable, "number-line": renderNumberLine,
    "column-add": renderColumnAlgorithm, "column-subtract": renderColumnAlgorithm,
    coordinate: renderCoordinate, "missing-term": renderMissingTerm, angle: renderAngle,
    polygon: renderPolygon, estimate: renderEstimate, bundle: renderBundle, array: renderArray,
    division: renderDivision, fraction: renderFraction, "fraction-compare": renderFractionCompare,
    "decimal-place": renderDecimalPlace, money: renderMoney, metric: renderMetric,
    perimeter: renderPerimeter, "bar-graph": renderBarGraph, solid: renderSolid, net: renderNet,
    "multiplication-table": renderMultiplicationTable, area: renderArea,
    "equivalent-fractions": renderEquivalentFractions, "decimal-operation": renderDecimalOperation,
    "partial-products": renderPartialProducts, rounding: renderRounding, pairing: renderPairing,
    factors: renderFactors, pattern: renderPattern, clock: renderClock, "measure-sort": renderMeasureSort,
    probability: renderProbability, combinations: renderCombinations, expressions: renderExpressions,
    scratchpad: renderScratchpad, mental: renderMental, "make-ten": renderMakeTen,
    grouping: renderGrouping, transition: renderTransition,
  };
  return (engines[lesson.engine] || renderFallback)(lesson);
}

function renderNumberSync() {
  const number = clamp(Number(state.activity.number || 1246), 0, 9999);
  const mode = state.activity.mode || "chart";
  const digits = paddedDigits(number);
  return `<div class="engine-shell number-sync">${segmented(["chart", "blocks", "abacus"], mode, "representation")}
    <div class="big-number">${number.toLocaleString()}</div>
    <div class="step-control"><button type="button" data-adjust="number" data-delta="-1" aria-label="Decrease number">−</button><input data-range="number" type="range" min="0" max="9999" value="${number}" aria-label="Number from zero to 9999" /><button type="button" data-adjust="number" data-delta="1" aria-label="Increase number">+</button></div>
    ${mode === "chart" ? placeChart(digits) : mode === "blocks" ? baseTenGroups(digits) : abacus(digits)}</div>`;
}

function renderPlaceSlider() {
  const position = clamp(Number(state.activity.position ?? 2), 0, 3);
  const digit = Number(state.activity.digit || 2);
  const values = [1000, 100, 10, 1];
  const names = ["thousands", "hundreds", "tens", "ones"];
  const digits = [0, 0, 0, 0];
  digits[position] = digit;
  return `<div class="engine-shell"><div class="place-slider-number">${digits.map((value, index) => `<button type="button" class="place-digit ${index === position ? "is-active" : ""}" data-action="set-position" data-position="${index}" aria-label="Move ${digit} to ${names[index]}">${value}</button>`).join("")}</div><div class="value-reveal"><span>The digit ${digit} is in the ${names[position]} place.</span><strong>Its value is ${(digit * values[position]).toLocaleString()}.</strong></div><div class="scale-block ${names[position]}"><i>${digit}</i><span>${names[position]}</span></div></div>`;
}

function renderUnbundle() {
  const level = clamp(Number(state.activity.level || 0), 0, 3);
  const labels = ["1 thousand", "10 hundreds", "100 tens", "1,000 ones"];
  const visualCounts = [1, 10, 20, 25];
  return `<div class="engine-shell unbundle-engine"><div class="unbundle-equation">1,000 = <strong>${labels[level]}</strong></div><div class="unbundle-field level-${level}" aria-label="${labels[level]}">${Array.from({ length: visualCounts[level] }, (_, index) => `<span style="--i:${index}" aria-hidden="true"></span>`).join("")}</div><div class="button-row"><button class="primary-button" type="button" data-action="unbundle" ${level === 3 ? "disabled" : ""}>Open into ${["hundreds", "tens", "ones", "ones"][level]}</button><button class="secondary-button" type="button" data-action="bundle-back" ${level === 0 ? "disabled" : ""}>Bundle back</button></div><p class="visual-scale-note">The groups are scaled to fit. Their labels preserve the exact quantity.</p></div>`;
}

function renderDecompose() {
  const number = clamp(Number(state.activity.number || 273), 100, 999);
  const [h, t, o] = paddedDigits(number).slice(1);
  const mode = state.activity.mode || "tree";
  const parts = [h * 100, t * 10, o];
  const alternate = [50, 50, 100, number - 200];
  return `<div class="engine-shell">${segmented(["tree", "blocks", "another way"], mode, "representation")}<div class="number-tree ${mode.replace(" ", "-")}"><strong>${number}</strong><div class="tree-branches" aria-hidden="true"><i></i><i></i><i></i></div><div class="tree-parts">${(mode === "another way" ? alternate : parts).map((part, index) => `<span>${mode === "blocks" ? `${[h, t, o][index]} × ${[100, 10, 1][index]}` : part}</span>`).join("")}</div></div><div class="equation-ribbon">${(mode === "another way" ? alternate : parts).join(" + ")} = ${number}</div></div>`;
}

function renderCompare() {
  const left = clamp(Number(state.activity.left || 346), 0, 999);
  const right = clamp(Number(state.activity.right || 379), 0, 999);
  const sign = left === right ? "=" : left > right ? ">" : "<";
  const tilt = left === right ? 0 : left > right ? -4 : 4;
  return `<div class="engine-shell compare-engine"><div class="compare-controls">${miniStepper("left", left, "Left number")}<strong class="compare-sign">${sign}</strong>${miniStepper("right", right, "Right number")}</div><div class="balance" style="--tilt:${tilt}deg" aria-label="${left} ${spokenSign(sign)} ${right}"><div class="balance-beam"><span>${left}</span><span>${right}</span></div><i></i></div><div class="place-compare">${comparisonReason(left, right)}</div></div>`;
}

function renderSymmetry() {
  const folded = state.activity.folded;
  const repeated = state.activity.repeated;
  return `<div class="engine-shell symmetry-engine"><div class="mirror-board ${folded ? "is-folded" : ""}"><svg viewBox="0 0 420 240" role="img" aria-label="Triangle reflected across a vertical line"><path class="grid-lines" d="M0 40H420M0 80H420M0 120H420M0 160H420M0 200H420M40 0V240M80 0V240M120 0V240M160 0V240M200 0V240M220 0V240M260 0V240M300 0V240M340 0V240M380 0V240" /><path class="mirror-shape original" d="M90 70 L170 120 L110 190 Z" /><path class="mirror-line" d="M210 12V228" /><path class="mirror-shape reflected" d="M330 70 L250 120 L310 190 Z" /></svg></div><div class="frieze-strip ${repeated ? "is-repeated" : ""}" aria-label="Repeating reflection pattern">${Array.from({ length: 8 }, (_, index) => `<i style="--i:${index}"></i>`).join("")}</div><div class="button-row"><button class="primary-button" type="button" data-action="fold-symmetry">${folded ? "Open the fold" : "Fold across the line"}</button><button class="secondary-button" type="button" data-action="repeat-frieze">${repeated ? "Show one reflection" : "Build a frieze"}</button></div></div>`;
}

function renderAdditionTable(lesson) {
  const a = clamp(Number(state.activity.a ?? lesson.config.a ?? 6), 0, 10);
  const b = clamp(Number(state.activity.b ?? lesson.config.b ?? 7), 0, 10);
  return `<div class="engine-shell table-engine"><div class="table-equation"><span>${a}</span><b>+</b><span>${b}</span><b>=</b><strong>${a + b}</strong></div><div class="math-table-scroll" tabindex="0" role="region" aria-label="Addition table, scrollable horizontally"><div class="math-table addition-grid" role="grid">${mathGrid("+", a, b)}</div></div><p>Row ${a} and column ${b} meet at ${a + b}. Tap any square to explore another fact.</p></div>`;
}

function renderNumberLine() {
  const start = Number(state.activity.start ?? 7);
  const jump = Number(state.activity.jump ?? 9);
  const backwards = Boolean(state.activity.backwards);
  const from = backwards ? start + jump : start;
  const to = backwards ? start : start + jump;
  return `<div class="engine-shell number-line-engine"><div class="number-line-equation">${backwards ? `${start + jump} − ${jump} = ${start}` : `${start} + ${jump} = ${start + jump}`}</div><div class="number-line-track" aria-label="Jump from ${from} to ${to}">${Array.from({ length: 21 }, (_, n) => `<span class="tick ${n === from || n === to ? "is-key" : ""}" style="--x:${n / 20}"><i></i><b>${n}</b></span>`).join("")}<i class="jump-arc ${backwards ? "backwards" : ""}" style="--from:${from / 20};--to:${to / 20}"></i><i class="jump-dot" style="--x:${to / 20}"></i></div><button class="primary-button" type="button" data-action="reverse-number-line">${backwards ? "Show the addition" : "Undo it with subtraction"}</button></div>`;
}

function renderColumnAlgorithm(lesson) {
  const adding = lesson.engine === "column-add";
  const step = clamp(Number(state.activity.step || 0), 0, 4);
  const { a, b, answer } = lesson.config;
  const activeColumn = Math.max(0, 3 - step);
  const labels = ["thousands", "hundreds", "tens", "ones"];
  const aDigits = paddedDigits(a);
  const bDigits = paddedDigits(b);
  const answerDigits = paddedDigits(answer);
  const displayA = adding ? aDigits : [2, 2, step > 0 ? 4 : 5, step > 0 ? 12 : 2];
  const carry = adding && step > 0 ? ["", "", "1", ""] : ["", "", "", ""];
  return `<div class="engine-shell algorithm-engine"><div class="column-board">${labels.map((label, index) => `<div class="column-cell ${index === activeColumn && step < 4 ? "is-active" : ""} ${index > activeColumn || step === 4 ? "is-done" : ""}"><span>${label}</span><i class="carry">${carry[index]}</i><b>${displayA[index]}</b><b class="bottom"><em>${index === 0 ? (adding ? "+" : "−") : ""}</em>${bDigits[index]}</b><strong>${step === 4 || index > activeColumn ? answerDigits[index] : "·"}</strong></div>`).join("")}</div><div class="exchange-stage ${step > 0 ? "is-exchanged" : ""}">${adding ? `${Array.from({ length: 10 }, (_, i) => `<i style="--i:${i}"></i>`).join("")}<span class="exchange-bundle">10 ones → 1 ten</span>` : `<span class="ten-rod">1 ten</span>${Array.from({ length: 10 }, (_, i) => `<i style="--i:${i}"></i>`).join("")}<span class="exchange-bundle">1 ten → 10 ones</span>`}</div><div class="algorithm-step-copy"><strong>${algorithmStepText(lesson.engine, step)}</strong><span>${step === 4 ? `${a.toLocaleString()} ${adding ? "+" : "−"} ${b.toLocaleString()} = ${answer.toLocaleString()}` : `Working in the ${labels[activeColumn]} place`}</span></div><button class="primary-button" type="button" data-action="algorithm-next">${step === 4 ? "Replay the exchange" : "Show the next step"}</button></div>`;
}

function renderCoordinate() {
  const x = clamp(Number(state.activity.x ?? 5), 0, 7);
  const y = clamp(Number(state.activity.y ?? 2), 0, 7);
  return `<div class="engine-shell coordinate-engine"><div class="coordinate-readout">Point A = <strong>(${x}, ${y})</strong><span>horizontal first, vertical second</span></div><div class="coordinate-grid" role="grid" aria-label="Coordinate grid from zero to seven">${Array.from({ length: 8 }, (_, rowIndex) => 7 - rowIndex).flatMap((row) => Array.from({ length: 8 }, (_, col) => `<button type="button" role="gridcell" data-action="plot-point" data-x="${col}" data-y="${row}" class="${col === x && row === y ? "is-point" : ""} ${col === x || row === y ? "is-guide" : ""}" aria-label="Plot point ${col}, ${row}"></button>`)).join("")}</div><div class="axis-label x-axis">horizontal x</div><div class="axis-label y-axis">vertical y</div></div>`;
}

function renderMissingTerm(lesson) {
  const index = clamp(Number(state.activity.problem || 0), 0, lesson.config.problems.length - 1);
  const answers = [30, 14, 79, 24];
  const inverse = ["69 − 39 = 30", "72 − 58 = 14", "57 + 22 = 79", "49 − 25 = 24"];
  return `<div class="engine-shell missing-engine"><div class="problem-tabs">${lesson.config.problems.map((_, i) => `<button type="button" data-action="missing-problem" data-index="${i}" class="${i === index ? "is-active" : ""}">${i + 1}</button>`).join("")}</div><div class="missing-equation">${lesson.config.problems[index].replace("□", "<span>?</span>")}</div><form id="missing-form" class="missing-form"><label for="missing-answer">What number belongs in the box?</label><div><input id="missing-answer" data-key="missing-${index}" inputmode="numeric" autocomplete="off" aria-describedby="missing-feedback" /><button class="primary-button" type="submit">Check</button></div></form><div class="inverse-reveal ${state.activity.revealed ? "is-visible" : ""}" id="missing-feedback">${state.activity.result || `Use the inverse: ${inverse[index]}. The missing number is ${answers[index]}.`}</div><button class="text-button" type="button" data-action="reveal-missing">Show the inverse step</button></div>`;
}

function renderAngle() {
  const angle = clamp(Number(state.activity.angle ?? 90), 20, 160);
  const type = angle === 90 ? "right" : angle < 90 ? "acute" : "obtuse";
  return `<div class="engine-shell angle-engine"><div class="angle-stage"><i class="angle-ray fixed"></i><i class="angle-ray moving" style="transform:rotate(${-angle}deg)"></i><span class="angle-arc">${angle}°</span><span class="paper-corner ${angle === 90 ? "fits" : ""}"></span></div><input data-range="angle" type="range" min="20" max="160" value="${angle}" aria-label="Angle in degrees" /><div class="classification"><strong>${capitalize(type)} angle</strong><span>${angle < 90 ? "smaller than" : angle > 90 ? "larger than" : "exactly"} a paper corner</span></div><div class="line-pair ${type}"><i></i><i></i><span>${type === "right" ? "perpendicular" : "not perpendicular"}</span></div></div>`;
}

function renderPolygon() {
  const shapes = [
    { name: "triangle", points: "100,25 180,165 30,165", sides: 3, convex: true },
    { name: "quadrilateral", points: "40,40 175,30 160,165 25,145", sides: 4, convex: true },
    { name: "convex pentagon", points: "100,20 180,80 150,170 50,170 20,80", sides: 5, convex: true },
    { name: "nonconvex pentagon", points: "25,30 180,30 95,90 180,165 25,165", sides: 5, convex: false },
  ];
  const index = clamp(Number(state.activity.shape || 0), 0, shapes.length - 1);
  const shape = shapes[index];
  return `<div class="engine-shell polygon-engine"><div class="polygon-stage"><svg viewBox="0 0 200 190" role="img" aria-label="${shape.name}"><polygon points="${shape.points}" /></svg></div><div class="shape-picker">${shapes.map((_, i) => `<button type="button" class="${i === index ? "is-active" : ""}" data-action="pick-shape" data-index="${i}">${i + 1}</button>`).join("")}</div><div class="classification"><strong>${capitalize(shape.name)}</strong><span>${shape.sides} straight sides · ${shape.convex ? "no inward points" : "one part points inward"}</span></div></div>`;
}

function renderEstimate() {
  const sample = clamp(Number(state.activity.sample ?? 50), 10, 80);
  return `<div class="engine-shell estimate-engine"><div class="gem-field">${Array.from({ length: 4 }, (_, q) => `<button class="gem-quadrant ${q === (state.activity.quadrant || 0) ? "is-sample" : ""}" type="button" data-action="sample-quadrant" data-index="${q}">${Array.from({ length: 20 }, () => "<i></i>").join("")}</button>`).join("")}</div><div class="estimate-formula"><span>about ${sample} in one sample</span><b>×</b><span>4 equal samples</span><b>=</b><strong>about ${sample * 4}</strong></div><input data-range="sample" type="range" min="10" max="80" step="5" value="${sample}" aria-label="Estimated objects in one sample" /><p>Representative marks keep the field readable; the labels preserve the estimated counts.</p></div>`;
}

function renderBundle() {
  const step = clamp(Number(state.activity.step || 0), 0, 2);
  const labels = ["Start with 743 loose coins", "Bundle tens into 74 sacks, with 3 coins left", "Bundle hundreds into 7 chests, 4 sacks, and 3 coins"];
  return `<div class="engine-shell bundle-engine"><div class="bundle-stage step-${step}">${Array.from({ length: step === 0 ? 24 : step === 1 ? 14 : 7 }, () => `<span class="${step === 2 ? "chest" : step === 1 ? "sack" : "coin"}"></span>`).join("")}${step === 2 ? `${Array.from({ length: 4 }, () => "<span class=\"sack\"></span>").join("")}${Array.from({ length: 3 }, () => "<span class=\"coin\"></span>").join("")}` : ""}</div><div class="classification"><strong>${labels[step]}</strong><span>${step === 2 ? "700 + 40 + 3 = 743" : "Ten equal smaller groups make one larger group."}</span></div><button class="primary-button" type="button" data-action="bundle-coins">${step === 2 ? "Start again" : step === 1 ? "Make hundreds" : "Make tens"}</button><p class="visual-scale-note">Objects are scaled symbolically; each container keeps its exact value.</p></div>`;
}

function renderArray() {
  const rows = clamp(Number(state.activity.rows || 2), 1, 10);
  const cols = clamp(Number(state.activity.cols || 4), 1, 10);
  return `<div class="engine-shell array-engine"><div class="array-equation"><span>${rows}</span><b>×</b><span>${cols}</span><b>=</b><strong>${rows * cols}</strong></div><div class="counter-array" style="--cols:${cols}" aria-label="${rows} rows of ${cols}">${Array.from({ length: rows * cols }, () => "<i></i>").join("")}</div><div class="dual-steppers">${miniStepper("rows", rows, "Rows")}${miniStepper("cols", cols, "Columns")}</div><button class="secondary-button" type="button" data-action="rotate-array">${replayIcon()} Rotate the array</button></div>`;
}

function renderDivision() {
  const total = Number(state.activity.total || 18);
  const groups = clamp(Number(state.activity.groups || 3), 1, 6);
  const quotient = total / groups;
  const even = Number.isInteger(quotient);
  return `<div class="engine-shell division-engine"><div class="array-equation"><span>${total}</span><b>÷</b><span>${groups}</span><b>=</b><strong>${even ? quotient : `${Math.floor(quotient)} r ${total % groups}`}</strong></div><div class="division-groups" style="--groups:${groups}">${Array.from({ length: groups }, (_, group) => `<div><span>group ${group + 1}</span>${Array.from({ length: Math.ceil(total / groups) }, (_, i) => group * Math.ceil(total / groups) + i < total ? "<i></i>" : "").join("")}</div>`).join("")}</div>${miniStepper("groups", groups, "Equal groups")}<p>${even ? `Every group contains ${quotient}.` : `${total % groups} counter${total % groups === 1 ? " is" : "s are"} left over.`}</p></div>`;
}

function renderFraction() {
  const denominator = clamp(Number(state.activity.denominator || 4), 2, 12);
  const numerator = clamp(Number(state.activity.numerator || 1), 0, denominator);
  return `<div class="engine-shell fraction-engine"><div class="fraction-number"><strong>${numerator}</strong><i></i><strong>${denominator}</strong></div><div class="fraction-bar" style="--den:${denominator}">${Array.from({ length: denominator }, (_, i) => `<span class="${i < numerator ? "is-shaded" : ""}"></span>`).join("")}</div><div class="fraction-collection">${Array.from({ length: denominator }, (_, i) => `<i class="${i < numerator ? "is-shaded" : ""}"></i>`).join("")}</div><div class="dual-steppers">${miniStepper("numerator", numerator, "Numerator")}${miniStepper("denominator", denominator, "Denominator")}</div><p>${numerator} of ${denominator} equal parts are considered.</p></div>`;
}

function renderFractionCompare() {
  const denominator = Number(state.activity.denominator || 4);
  const left = clamp(Number(state.activity.left || 1), 0, denominator);
  const right = clamp(Number(state.activity.right || 2), 0, denominator);
  const sign = left === right ? "=" : left > right ? ">" : "<";
  return `<div class="engine-shell fraction-compare-engine">${fractionCompareBar(left, denominator)}<strong class="compare-sign">${sign}</strong>${fractionCompareBar(right, denominator)}<div class="dual-steppers">${miniStepper("left", left, "Left numerator")}${miniStepper("right", right, "Right numerator")}</div><p>The wholes are identical and both use ${denominator} equal parts, so compare ${left} with ${right}.</p></div>`;
}

function renderDecimalPlace() {
  const selected = clamp(Number(state.activity.position || 0), 0, 4);
  const digits = [2, 3, 1, 1, 1];
  const labels = ["hundreds", "tens", "ones", "tenths", "hundredths"];
  const values = [200, 30, 1, 0.1, 0.01];
  return `<div class="engine-shell decimal-engine"><div class="decimal-chart">${digits.map((digit, index) => `<button type="button" class="${selected === index ? "is-active" : ""}" data-action="decimal-position" data-index="${index}"><span>${labels[index]}</span><b>${index === 3 ? "." : ""}${digit}</b></button>`).join("")}</div><div class="decimal-magnifier scale-${selected}"><i></i><span>${digits[selected]} ${labels[selected]} = ${values[selected]}</span></div><div class="equation-ribbon">231.11 = 200 + 30 + 1 + 0.1 + 0.01</div></div>`;
}

function renderMoney() {
  const cents = clamp(Number(state.activity.cents || 0), 0, 500);
  const target = 145;
  return `<div class="engine-shell money-engine"><div class="money-total"><span>Your amount</span><strong>$${(cents / 100).toFixed(2)}</strong><small>Target: $1.45</small></div><div class="coin-tray"><button type="button" class="coin dollar" data-action="add-coin" data-cents="100">$1</button><button type="button" class="coin dime" data-action="add-coin" data-cents="10">10¢</button><button type="button" class="coin nickel" data-action="add-coin" data-cents="5">5¢</button></div><div class="money-columns"><span><b>${Math.floor(cents / 100)}</b> ones</span><span><b>${Math.floor((cents % 100) / 10)}</b> tenths</span><span><b>${cents % 10}</b> hundredths</span></div><div class="button-row"><button class="secondary-button" type="button" data-action="reset-money">Clear</button><span class="money-feedback">${cents === target ? "Exactly $1.45." : cents > target ? "You passed $1.45. Clear and try again." : `$${((target - cents) / 100).toFixed(2)} to go.`}</span></div></div>`;
}

function renderMetric() {
  const units = ["m", "dm", "cm", "mm"];
  const target = state.activity.targetUnit || "cm";
  const conversions = { m: 1.24, dm: 12.4, cm: 124, mm: 1240 };
  return `<div class="engine-shell metric-engine"><div class="metric-ruler">${units.map((unit, index) => `<button type="button" data-action="metric-unit" data-unit="${unit}" class="${target === unit ? "is-active" : ""}"><span>${unit}</span><b>${conversions[unit]}</b><i style="--shift:${index}"></i></button>`).join("")}</div><div class="metric-result"><strong>${conversions[target]} ${target}</strong><span>has the same length as 124 cm</span></div><p>Moving one column right multiplies by 10. Moving left divides by 10.</p></div>`;
}

function renderPerimeter() {
  const width = clamp(Number(state.activity.width || 4), 1, 10);
  const height = clamp(Number(state.activity.height || 2), 1, 8);
  const perimeter = 2 * width + 2 * height;
  return `<div class="engine-shell perimeter-engine"><div class="perimeter-shape" style="--w:${width};--h:${height}"><span class="top">${width} cm</span><span class="right">${height} cm</span><span class="bottom">${width} cm</span><span class="left">${height} cm</span><i></i></div><div class="equation-ribbon">${width} + ${height} + ${width} + ${height} = <strong>${perimeter} cm</strong></div><div class="dual-steppers">${miniStepper("width", width, "Width")}${miniStepper("height", height, "Height")}</div><button class="secondary-button" type="button" data-action="trace-perimeter">Trace the outside edge</button></div>`;
}

function renderBarGraph() {
  const mode = state.activity.mode || "table";
  const values = [5, 2, 8];
  const labels = ["Cats", "Dogs", "Fish"];
  const visual = mode === "table"
    ? `<table><caption>Animals at the pet shop</caption><thead><tr><th>Animal</th><th>Quantity</th></tr></thead><tbody>${labels.map((label, i) => `<tr><td>${label}</td><td>${values[i]}</td></tr>`).join("")}</tbody></table>`
    : `<div class="bar-chart" aria-label="Bar graph: cats 5, dogs 2, fish 8">${labels.map((label, i) => `<div><i style="transform:scaleY(${values[i] / 8})"></i><b>${values[i]}</b><span>${label}</span></div>`).join("")}</div>`;
  return `<div class="engine-shell graph-engine">${segmented(["table", "bar graph"], mode, "representation")}${visual}<p>The data stays the same. Only its representation changes.</p></div>`;
}

function renderSolid() {
  const type = state.activity.solid || "prism";
  const feature = state.activity.feature || "bases";
  return `<div class="engine-shell solid-engine"><div class="solid-stage ${type} feature-${feature}"><div class="solid-shape"><i class="front"></i><i class="back"></i><i class="side-a"></i><i class="side-b"></i><i class="top"></i><i class="bottom"></i></div></div>${segmented(["prism", "pyramid"], type, "solid")}<div class="feature-buttons">${["bases", "faces", "edges", "vertices"].map((item) => `<button type="button" data-action="solid-feature" data-feature="${item}" class="${feature === item ? "is-active" : ""}">${item}</button>`).join("")}</div><p>${type === "prism" ? "A prism has two identical, parallel bases." : "A pyramid has one base and triangular faces meeting at one vertex."}</p></div>`;
}

function renderNet() {
  return `<div class="engine-shell net-engine"><div class="net-stage ${state.activity.folded ? "is-folded" : ""}"><i class="net-face f1"></i><i class="net-face f2"></i><i class="net-face f3"></i><i class="net-face f4"></i><i class="net-face triangle t1"></i><i class="net-face triangle t2"></i></div><div class="classification"><strong>Triangular prism net</strong><span>2 triangle bases + 3 rectangle faces</span></div><button class="primary-button" type="button" data-action="fold-net">${state.activity.folded ? "Lay the net flat" : "Fold the net"}</button></div>`;
}

function renderMultiplicationTable() {
  const a = clamp(Number(state.activity.a ?? 3), 0, 10);
  const b = clamp(Number(state.activity.b ?? 4), 0, 10);
  return `<div class="engine-shell table-engine"><div class="table-equation"><span>${a}</span><b>×</b><span>${b}</span><b>=</b><strong>${a * b}</strong></div><div class="math-table-scroll" tabindex="0" role="region" aria-label="Multiplication table, scrollable horizontally"><div class="math-table multiplication-grid" role="grid">${mathGrid("×", a, b)}</div></div><div class="mini-array" style="--cols:${Math.max(1, b)}">${Array.from({ length: a * b }, () => "<i></i>").join("")}</div></div>`;
}

function renderArea() {
  const rows = clamp(Number(state.activity.rows || 2), 1, 8);
  const cols = clamp(Number(state.activity.cols || 3), 1, 8);
  return `<div class="engine-shell area-engine"><div class="area-grid" style="--cols:${cols}">${Array.from({ length: rows * cols }, (_, i) => `<button type="button" class="${i < (state.activity.counted || 0) ? "is-counted" : ""}" data-action="count-area" data-index="${i}">${i + 1}</button>`).join("")}</div><div class="array-equation"><span>${rows}</span><b>×</b><span>${cols}</span><b>=</b><strong>${rows * cols} square units</strong></div><div class="dual-steppers">${miniStepper("rows", rows, "Rows")}${miniStepper("cols", cols, "Columns")}</div><p>Tap the squares to count the area one unit at a time.</p></div>`;
}

function renderEquivalentFractions() {
  const sets = [[1, 3], [2, 6], [4, 12]];
  return `<div class="engine-shell equivalent-engine"><div class="equivalent-strips">${sets.map(([num, den]) => `<div><span>${num}/${den}</span><div style="--den:${den}">${Array.from({ length: den }, (_, i) => `<i class="${i < num ? "is-shaded" : ""}"></i>`).join("")}</div></div>`).join("")}</div><button class="secondary-button" type="button" data-action="pulse-equivalent">Highlight the equal length</button><p>Each bar is the same whole. All three shade exactly one third.</p></div>`;
}

function renderDecimalOperation() {
  const examples = [{ a: "2.32", op: "+", b: "4.86", answer: "7.18" }, { a: "4.31", op: "−", b: "2.19", answer: "2.12" }, { a: "25.0", op: "−", b: "4.8", answer: "20.2" }];
  const index = clamp(Number(state.activity.example || 0), 0, examples.length - 1);
  const item = examples[index];
  return `<div class="engine-shell decimal-operation-engine"><div class="decimal-columns"><span>tens</span><span>ones</span><span>.</span><span>tenths</span><span>hundredths</span></div><div class="decimal-stack"><b>${padDecimal(item.a)}</b><b><i>${item.op}</i>${padDecimal(item.b)}</b><strong>${state.activity.step ? padDecimal(item.answer) : "___.__"}</strong></div><p>Every decimal point stays in the same vertical column.</p><div class="button-row"><button class="primary-button" type="button" data-action="solve-decimal">${state.activity.step ? "Hide the result" : "Bring down the decimal and solve"}</button><button class="secondary-button" type="button" data-action="next-decimal">Another example</button></div></div>`;
}

function renderPartialProducts() {
  const factor = clamp(Number(state.activity.factor || 4), 2, 9);
  const value = clamp(Number(state.activity.value || 23), 10, 99);
  const tens = Math.floor(value / 10) * 10;
  const ones = value % 10;
  return `<div class="engine-shell partial-engine"><div class="area-box"><div style="flex:${tens}"><span>${factor} × ${tens}</span><strong>${factor * tens}</strong></div><div style="flex:${Math.max(ones, 2)}"><span>${factor} × ${ones}</span><strong>${factor * ones}</strong></div></div><div class="equation-ribbon">${factor} × ${value} = ${factor * tens} + ${factor * ones} = <strong>${factor * value}</strong></div><div class="dual-steppers">${miniStepper("factor", factor, "One-digit factor")}${miniStepper("value", value, "Two-digit factor")}</div></div>`;
}

function renderRounding() {
  const place = Number(state.activity.place || 10);
  const value = clamp(Number(state.activity.value || 583), place, place * 20);
  const lower = Math.floor(value / place) * place;
  const upper = lower + place;
  const rounded = value - lower < place / 2 ? lower : upper;
  const position = (value - lower) / place;
  return `<div class="engine-shell rounding-engine"><div class="rounding-line"><span>${lower.toLocaleString()}</span><i class="rounding-point" style="--x:${position}"><b>${value.toLocaleString()}</b></i><span>${upper.toLocaleString()}</span></div><div class="rounding-result"><span>${value.toLocaleString()} rounds to</span><strong>${rounded.toLocaleString()}</strong></div>${segmented(["10", "100", "1000"], String(place), "rounding")}<input data-range="value" type="range" min="${place}" max="${place * 20}" step="${Math.max(1, place / 10)}" value="${value}" aria-label="Number to round" /></div>`;
}

function renderPairing() {
  const number = clamp(Number(state.activity.number || 16), 0, 30);
  const odd = number % 2 === 1;
  return `<div class="engine-shell pairing-engine"><div class="pair-field">${Array.from({ length: number }, (_, index) => `<i class="${odd && index === number - 1 ? "is-leftover" : ""}"></i>`).join("")}</div><div class="classification"><strong>${number} is ${odd ? "odd" : "even"}</strong><span>${Math.floor(number / 2)} complete pair${Math.floor(number / 2) === 1 ? "" : "s"}${odd ? " and 1 left over" : " and no remainder"}</span></div>${miniStepper("number", number, "Number of counters")}</div>`;
}

function renderFactors() {
  const number = clamp(Number(state.activity.number || 9), 0, 30);
  const factors = factorPairs(number);
  const classification = number < 2 ? "neither prime nor composite" : factors.length === 1 ? "prime" : "composite";
  return `<div class="engine-shell factor-engine"><div class="factor-number">${number}</div><div class="factor-arrangements">${number < 2 ? "<span>No equal group of 2 or more applies.</span>" : factors.map(([a, b]) => `<div><span>${a} × ${b}</span><div style="--cols:${b}">${Array.from({ length: number }, () => "<i></i>").join("")}</div></div>`).join("")}</div><div class="classification"><strong>${capitalize(classification)}</strong><span>${factors.length ? factors.map((pair) => pair.join(" × ")).join(" · ") : "0 and 1 are special cases"}</span></div>${miniStepper("number", number, "Number")}</div>`;
}

function renderPattern() {
  const patterns = [{ values: [15, 25, 35, 45, 55, 65], rule: "+10" }, { values: [100, 200, 175, 275, 250, 350, 325], rule: "+100, then −25" }, { values: [2, 4, 8, 16, 32], rule: "×2" }];
  const index = clamp(Number(state.activity.pattern || 0), 0, patterns.length - 1);
  const pattern = patterns[index];
  return `<div class="engine-shell pattern-engine"><div class="pattern-track">${pattern.values.map((value, i) => `<span class="${i === pattern.values.length - 1 && !state.activity.revealed ? "is-hidden" : ""}">${i === pattern.values.length - 1 && !state.activity.revealed ? "?" : value}</span>${i < pattern.values.length - 1 ? "<i></i>" : ""}`).join("")}</div><div class="classification"><strong>Rule: ${state.activity.revealed ? pattern.rule : "look for what repeats"}</strong><span>Ask what happens between each pair of numbers.</span></div><div class="button-row"><button class="primary-button" type="button" data-action="reveal-pattern">${state.activity.revealed ? "Hide the rule" : "Reveal the rule"}</button><button class="secondary-button" type="button" data-action="next-pattern">Try another pattern</button></div></div>`;
}

function renderClock() {
  const hour = clamp(Number(state.activity.hour || 10), 1, 12);
  const minute = clamp(Number(state.activity.minute || 20), 0, 59);
  const second = clamp(Number(state.activity.second || 5), 0, 59);
  return `<div class="engine-shell clock-engine"><div class="clock-face" aria-label="${hour}:${String(minute).padStart(2, "0")} and ${second} seconds">${Array.from({ length: 12 }, (_, i) => `<span style="--i:${i + 1}">${i + 1}</span>`).join("")}<i class="clock-hand hour" style="transform:rotate(${hour * 30 + minute * 0.5}deg)"></i><i class="clock-hand minute" style="transform:rotate(${minute * 6}deg)"></i><i class="clock-hand second" style="transform:rotate(${second * 6}deg)"></i><b></b></div><div class="digital-time">${hour}:${String(minute).padStart(2, "0")}<small>:${String(second).padStart(2, "0")}</small></div><div class="clock-controls"><label>hour<input data-range="hour" type="range" min="1" max="12" value="${hour}" /></label><label>minute<input data-range="minute" type="range" min="0" max="59" value="${minute}" /></label><label>second<input data-range="second" type="range" min="0" max="59" value="${second}" /></label></div></div>`;
}

function renderMeasureSort() {
  const scenes = [{ label: "car and motorcycle", answer: "volume", copy: "The car occupies more three-dimensional space." }, { label: "jug and glass", answer: "capacity", copy: "The jug can hold more liquid." }, { label: "adult and child", answer: "mass", copy: "The adult contains more matter." }];
  const index = clamp(Number(state.activity.scene || 0), 0, scenes.length - 1);
  const scene = scenes[index];
  return `<div class="engine-shell measure-engine"><div class="measure-scene scene-${index}"><i></i><i></i><span>${scene.label}</span></div><div class="sort-options">${["volume", "capacity", "mass"].map((option) => `<button type="button" data-action="sort-measure" data-option="${option}" class="${state.activity.selected === option ? (option === scene.answer ? "is-correct" : "is-wrong") : ""}">${option}</button>`).join("")}</div><p>${state.activity.selected ? (state.activity.selected === scene.answer ? scene.copy : `Try again. Think about what ${scene.answer} measures.`) : "Which property is this comparison about?"}</p><button class="text-button" type="button" data-action="next-measure">Next comparison</button></div>`;
}

function renderProbability() {
  const red = clamp(Number(state.activity.red ?? 2), 0, 5);
  const blue = clamp(Number(state.activity.blue ?? 3), 0, 5);
  const total = red + blue;
  const likelihood = red === 0 ? "impossible" : blue === 0 ? "certain" : red === blue ? "as likely" : red < blue ? "less likely" : "more likely";
  const redDraws = state.activity.draws.filter((color) => color === "red").length;
  return `<div class="engine-shell probability-engine"><div class="marble-bag">${Array.from({ length: red }, () => "<i class=\"red\"></i>").join("")}${Array.from({ length: blue }, () => "<i class=\"blue\"></i>").join("")}</div><div class="probability-line"><span>impossible</span><i style="--x:${total ? red / total : 0}"></i><span>certain</span></div><div class="classification"><strong>Red is ${likelihood}</strong><span>${red} red out of ${total} total marbles</span></div><div class="dual-steppers">${miniStepper("red", red, "Red marbles")}${miniStepper("blue", blue, "Blue marbles")}</div><div class="draw-controls"><button class="primary-button" type="button" data-action="draw-marble" ${total === 0 ? "disabled" : ""}>Draw a marble</button><span>${state.activity.draws.length ? `${redDraws} red in ${state.activity.draws.length} draw${state.activity.draws.length === 1 ? "" : "s"}` : "Make repeated draws to test your prediction."}</span></div></div>`;
}

function renderCombinations() {
  const animals = ["Squirrel", "Bird", "Chipmunk"];
  const nuts = ["Pistachio", "Cashew", "Almond", "Hazelnut"];
  const revealed = clamp(Number(state.activity.step || 0), 0, 12);
  return `<div class="engine-shell combinations-engine"><div class="combination-grid"><span></span>${nuts.map((nut) => `<b>${nut}</b>`).join("")}${animals.flatMap((animal, row) => [`<b>${animal}</b>`, ...nuts.map((nut, col) => `<i class="${row * 4 + col < revealed ? "is-revealed" : ""}">(${animal[0]}, ${nut[0]})</i>`)]).join("")}</div><div class="classification"><strong>3 × 4 = 12 combinations</strong><span>${revealed} of 12 outcomes shown</span></div><button class="primary-button" type="button" data-action="reveal-combination">${revealed === 12 ? "Clear the grid" : "Add the next outcome"}</button></div>`;
}

function renderExpressions() {
  const expressions = ["15 + 10", "20 + 5", "5 × 5", "25 + 0", "30 − 5", "10 + 10", "50 ÷ 2"];
  const values = [25, 25, 25, 25, 25, 20, 25];
  return `<div class="engine-shell expression-engine"><div class="expression-target">25</div><div class="expression-orbit">${expressions.map((expression, index) => `<button type="button" data-action="check-expression" data-index="${index}" class="${state.activity.selected === index ? (values[index] === 25 ? "is-correct" : "is-wrong") : ""}">${expression}</button>`).join("")}</div><p>${state.activity.selected == null ? "Choose an expression that connects to 25." : values[state.activity.selected] === 25 ? `${expressions[state.activity.selected]} is equivalent to 25.` : `${expressions[state.activity.selected]} equals ${values[state.activity.selected]}, not 25.`}</p></div>`;
}

function renderScratchpad() {
  return `<div class="engine-shell scratch-engine"><canvas id="scratch-canvas" width="900" height="480" aria-label="Drawing scratchpad"></canvas><div class="scratch-controls"><button class="color-dot blue ${state.activity.scratchColor === "#ed624a" ? "" : "is-active"}" type="button" data-action="scratch-color" data-color="#2557d6" aria-label="Blue pencil"></button><button class="color-dot coral ${state.activity.scratchColor === "#ed624a" ? "is-active" : ""}" type="button" data-action="scratch-color" data-color="#ed624a" aria-label="Coral pencil"></button><button class="secondary-button" type="button" data-action="clear-scratch">Clear page</button></div></div>`;
}

function renderMental(lesson) {
  const n = clamp(Number(state.activity.n ?? lesson.config.n ?? 5), 0, 10);
  const strategy = lesson.config.strategy;
  const facts = mentalFacts(strategy, n);
  return `<div class="engine-shell mental-engine"><div class="mental-focus">${n}</div><div class="mental-counters ${strategy}">${Array.from({ length: mentalCounterCount(strategy, n) }, (_, i) => `<i class="${i >= n ? "extra" : ""}"></i>`).join("")}</div><div class="fact-family">${facts.map(([label, fact]) => `<div><span>${label}</span><strong>${fact}</strong></div>`).join("")}</div>${miniStepper("n", n, "Starting number")}</div>`;
}

function renderMakeTen(lesson) {
  const base = lesson.config.base;
  const add = clamp(Number(state.activity.add ?? lesson.config.add), 10 - base, 10);
  const moved = 10 - base;
  const remainder = add - moved;
  return `<div class="engine-shell make-ten-engine"><div class="ten-frame">${Array.from({ length: 10 }, (_, i) => `<i class="${i < base ? "base" : "moved"}" style="--i:${i}"></i>`).join("")}</div><div class="leftover-counters">${Array.from({ length: remainder }, (_, i) => `<i style="--i:${i}"></i>`).join("")}</div><div class="make-ten-equation">${base} + ${add} = (${base} + ${moved}) + ${remainder} = <strong>${base + add}</strong></div>${miniStepper("add", add, "Second addend")}<p>Move ${moved} from ${add} to fill the ten-frame first.</p></div>`;
}

function renderGrouping() {
  const values = state.activity.values || [7, 3, 6];
  const selected = state.activity.selected;
  const pair = selected == null ? null : values.findIndex((value, index) => index !== selected && value + values[selected] === 10);
  return `<div class="engine-shell grouping-engine"><div class="grouping-tiles">${values.map((value, index) => `<button type="button" data-action="select-group" data-index="${index}" class="${selected === index || pair === index ? "is-selected" : ""}">${value}</button>${index < values.length - 1 ? "<span>+</span>" : ""}`).join("")}</div><div class="grouping-bracket ${pair != null ? "is-visible" : ""}"><span>${pair != null ? `${values[selected]} + ${values[pair]} = 10` : "Choose a number that has a partner making 10."}</span></div><div class="equation-ribbon">7 + 3 + 6 = (7 + 3) + 6 = <strong>16</strong></div></div>`;
}

function renderTransition() {
  const conceptLessons = curriculum.filter((item) => item.page < 60 && item.group !== "Tools");
  const done = conceptLessons.filter((item) => state.completed.includes(item.id)).length;
  return `<div class="engine-shell transition-engine"><div class="blue-grid-page"><span>${done}</span><strong>concept lessons explored</strong><i></i></div><div class="classification"><strong>Next source gap: pages 61-73</strong><span>Multiplication and division mental arithmetic will unlock after its source text and visuals are supplied.</span></div></div>`;
}

function renderFallback(lesson) {
  return `<div class="engine-shell fallback-engine"><strong>${lesson.fact}</strong><p>${lesson.visual}</p></div>`;
}

function handleAction(action, button) {
  const lesson = curriculum.find((item) => item.id === state.lessonId);
  if (!lesson && !action.startsWith("practice")) return;
  switch (action) {
    case "reset-activity": state.activity = initialActivity(lesson); clearScratchpad(); break;
    case "complete-lesson": return completeLesson(lesson);
    case "representation": state.activity.mode = button.dataset.value; break;
    case "set-position": state.activity.position = Number(button.dataset.position); break;
    case "unbundle": state.activity.level = clamp(Number(state.activity.level || 0) + 1, 0, 3); break;
    case "bundle-back": state.activity.level = clamp(Number(state.activity.level || 0) - 1, 0, 3); break;
    case "fold-symmetry": state.activity.folded = !state.activity.folded; break;
    case "repeat-frieze": state.activity.repeated = !state.activity.repeated; break;
    case "math-cell": state.activity.a = Number(button.dataset.row); state.activity.b = Number(button.dataset.col); break;
    case "reverse-number-line": state.activity.backwards = !state.activity.backwards; break;
    case "algorithm-next": state.activity.step = state.activity.step >= 4 ? 0 : state.activity.step + 1; break;
    case "plot-point": state.activity.x = Number(button.dataset.x); state.activity.y = Number(button.dataset.y); break;
    case "missing-problem": state.activity.problem = Number(button.dataset.index); state.activity.revealed = false; state.activity.result = null; break;
    case "reveal-missing": state.activity.revealed = !state.activity.revealed; break;
    case "pick-shape": state.activity.shape = Number(button.dataset.index); break;
    case "sample-quadrant": state.activity.quadrant = Number(button.dataset.index); break;
    case "bundle-coins": state.activity.step = state.activity.step >= 2 ? 0 : state.activity.step + 1; break;
    case "rotate-array": [state.activity.rows, state.activity.cols] = [state.activity.cols, state.activity.rows]; break;
    case "decimal-position": state.activity.position = Number(button.dataset.index); break;
    case "add-coin": state.activity.cents = clamp(Number(state.activity.cents || 0) + Number(button.dataset.cents), 0, 500); break;
    case "reset-money": state.activity.cents = 0; break;
    case "metric-unit": state.activity.targetUnit = button.dataset.unit; break;
    case "trace-perimeter": return pulseClass(".perimeter-shape", "is-tracing");
    case "solid": state.activity.solid = button.dataset.value; break;
    case "solid-feature": state.activity.feature = button.dataset.feature; break;
    case "fold-net": state.activity.folded = !state.activity.folded; break;
    case "count-area": state.activity.counted = Math.max(Number(state.activity.counted || 0), Number(button.dataset.index) + 1); break;
    case "pulse-equivalent": return pulseClass(".equivalent-strips", "is-pulsing");
    case "solve-decimal": state.activity.step = state.activity.step ? 0 : 1; break;
    case "next-decimal": state.activity.example = (Number(state.activity.example || 0) + 1) % 3; state.activity.step = 0; break;
    case "rounding": state.activity.place = Number(button.dataset.value); state.activity.value = Number(button.dataset.value) === 10 ? 183 : Number(button.dataset.value) === 100 ? 1234 : 13500; break;
    case "reveal-pattern": state.activity.revealed = !state.activity.revealed; break;
    case "next-pattern": state.activity.pattern = (Number(state.activity.pattern || 0) + 1) % 3; state.activity.revealed = false; break;
    case "sort-measure": state.activity.selected = button.dataset.option; break;
    case "next-measure": state.activity.scene = (Number(state.activity.scene || 0) + 1) % 3; state.activity.selected = null; break;
    case "draw-marble": drawMarble(); break;
    case "reveal-combination": state.activity.step = state.activity.step >= 12 ? 0 : state.activity.step + 1; break;
    case "check-expression": state.activity.selected = Number(button.dataset.index); break;
    case "scratch-color": state.activity.scratchColor = button.dataset.color; document.querySelectorAll(".color-dot").forEach((item) => item.classList.toggle("is-active", item === button)); return;
    case "clear-scratch": return clearScratchpad();
    case "select-group": state.activity.selected = Number(button.dataset.index); break;
    case "practice-hint": state.practice.hint = true; return renderPractice();
    case "practice-next": resetPractice(); return renderPractice();
    default: return;
  }
  renderLesson();
}

function adjustActivity(key, delta) {
  const lesson = curriculum.find((item) => item.id === state.lessonId);
  const limits = {
    number: lesson?.engine === "pairing" || lesson?.engine === "factors" ? [0, 30] : [0, 9999],
    left: [0, lesson?.engine === "fraction-compare" ? Number(state.activity.denominator || 4) : 999],
    right: [0, lesson?.engine === "fraction-compare" ? Number(state.activity.denominator || 4) : 999],
    rows: [1, 10], cols: [1, 10], groups: [1, 6], numerator: [0, Number(state.activity.denominator || 4)],
    denominator: [2, 12], width: [1, 10], height: [1, 8], factor: [2, 9], value: [10, 99],
    red: [0, 5], blue: [0, 5], n: [0, 10], add: [2, 10],
  };
  const [min, max] = limits[key] || [0, 9999];
  state.activity[key] = clamp(Number(state.activity[key] || 0) + delta, min, max);
  if (key === "denominator") state.activity.numerator = Math.min(Number(state.activity.numerator || 0), state.activity.denominator);
  if (["rows", "cols"].includes(key)) state.activity.counted = 0;
  if (["red", "blue"].includes(key)) state.activity.draws = [];
  renderLesson();
}

function setupScratchpad() {
  const canvas = document.querySelector("#scratch-canvas");
  // The canvas now survives redraws, so hook up drawing only once.
  if (!canvas || canvas.drawingReady) return;
  canvas.drawingReady = true;
  const context = canvas.getContext("2d");
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 5;
  let drawing = false;
  const point = (event) => {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (canvas.width / rect.width), y: (event.clientY - rect.top) * (canvas.height / rect.height) };
  };
  canvas.addEventListener("pointerdown", (event) => { drawing = true; canvas.setPointerCapture(event.pointerId); const p = point(event); context.beginPath(); context.moveTo(p.x, p.y); });
  canvas.addEventListener("pointermove", (event) => { if (!drawing) return; const p = point(event); context.strokeStyle = state.activity.scratchColor; context.lineTo(p.x, p.y); context.stroke(); });
  canvas.addEventListener("pointerup", () => { drawing = false; });
}

function clearScratchpad() {
  const canvas = document.querySelector("#scratch-canvas");
  canvas?.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

function checkMissingAnswer(event) {
  event.preventDefault();
  const answers = [30, 14, 79, 24];
  const index = Number(state.activity.problem || 0);
  const input = document.querySelector("#missing-answer");
  if (!input.value.trim()) {
    state.activity.result = "Type a number in the box first.";
    state.activity.revealed = true;
    renderLesson();
    input.focus();
    return;
  }
  state.activity.result = Number(input.value) === answers[index]
    ? `Correct. ${answers[index]} makes both sides equal.`
    : "Not yet. Undo the visible operation to isolate the missing number.";
  state.activity.revealed = true;
  renderLesson();
}

function drawMarble() {
  const red = Number(state.activity.red || 0);
  const total = red + Number(state.activity.blue || 0);
  if (total) state.activity.draws.push(Math.random() * total < red ? "red" : "blue");
}

function pulseClass(selector, className) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.classList.remove(className);
  requestAnimationFrame(() => element.classList.add(className));
}

function celebrate(origin) {
  if (prefersReducedMotion()) return;
  const rect = origin?.getBoundingClientRect?.() || { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
  const colors = ["#2557d6", "#ed624a", "#f1bd3b", "#55b995", "#8f79d4"];
  for (let index = 0; index < 14; index += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${rect.left + rect.width / 2}px`;
    piece.style.top = `${rect.top + rect.height / 2}px`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--tx", `${Math.cos((index / 14) * Math.PI * 2) * (80 + (index % 4) * 18)}px`);
    piece.style.setProperty("--ty", `${Math.sin((index / 14) * Math.PI * 2) * (70 + (index % 3) * 16) - 24}px`);
    piece.style.setProperty("--r", `${index * 51}deg`);
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function segmented(values, active, action) {
  return `<div class="segmented-control" role="group">${values.map((value) => `<button type="button" data-action="${action}" data-value="${value}" class="${String(active) === String(value) ? "is-active" : ""}">${value}</button>`).join("")}</div>`;
}

function miniStepper(key, value, label) {
  return `<div class="mini-stepper" aria-label="${label}"><span>${label}</span><div><button type="button" data-adjust="${key}" data-delta="-1" aria-label="Decrease ${label}">−</button><output>${value}</output><button type="button" data-adjust="${key}" data-delta="1" aria-label="Increase ${label}">+</button></div></div>`;
}

function placeChart(digits) {
  const labels = ["Thousands", "Hundreds", "Tens", "Ones"];
  return `<div class="place-chart">${labels.map((label, i) => `<div><span>${label}</span><strong>${digits[i]}</strong></div>`).join("")}</div>`;
}

function baseTenGroups(digits) {
  const classes = ["thousand", "hundred", "ten", "one"];
  const labels = ["thousands", "hundreds", "tens", "ones"];
  return `<div class="base-ten-groups">${digits.map((digit, i) => `<div><span>${Array.from({ length: digit }, () => `<i class="${classes[i]}"></i>`).join("") || "<em>0</em>"}</span><b>${digit} ${labels[i]}</b></div>`).join("")}</div>`;
}

function abacus(digits) {
  const labels = ["Th", "H", "T", "O"];
  return `<div class="abacus"><i class="abacus-bar"></i>${digits.map((digit, i) => `<div><span>${Array.from({ length: digit }, (_, index) => `<i style="--i:${index}"></i>`).join("")}</span><b>${labels[i]}</b></div>`).join("")}</div>`;
}

function mathGrid(operator, selectedRow, selectedCol) {
  let html = `<div class="math-cell header corner">${operator}</div>`;
  for (let col = 0; col <= 10; col += 1) html += `<div class="math-cell header ${col === selectedCol ? "in-col" : ""}">${col}</div>`;
  for (let row = 0; row <= 10; row += 1) {
    html += `<div class="math-cell header ${row === selectedRow ? "in-row" : ""}">${row}</div>`;
    for (let col = 0; col <= 10; col += 1) {
      const value = operator === "+" ? row + col : row * col;
      html += `<button type="button" class="math-cell ${row === selectedRow ? "in-row" : ""} ${col === selectedCol ? "in-col" : ""} ${row === selectedRow && col === selectedCol ? "is-selected" : ""}" data-action="math-cell" data-row="${row}" data-col="${col}" aria-label="${row} ${operator === "+" ? "plus" : "times"} ${col} equals ${value}">${value}</button>`;
    }
  }
  return html;
}

function fractionCompareBar(num, den) {
  return `<div class="compare-fraction"><div class="fraction-bar" style="--den:${den}">${Array.from({ length: den }, (_, i) => `<span class="${i < num ? "is-shaded" : ""}"></span>`).join("")}</div><strong>${num}/${den}</strong></div>`;
}

function algorithmStepText(engine, step) {
  if (step === 4) return "Every place is complete.";
  return engine === "column-add"
    ? ["6 + 7 makes 13. Ten ones must regroup.", "Write 3 ones and carry 1 ten.", "Add the hundreds.", "Add the thousands."][step]
    : ["Two ones cannot give away four. Exchange one ten.", "Now there are 12 ones and 4 tens.", "Subtract the hundreds.", "Subtract the thousands."][step];
}

function mentalFacts(strategy, n) {
  if (strategy === "zero") return [["add zero", `${n} + 0 = ${n}`], ["commute", `0 + ${n} = ${n}`], ["subtract zero", `${n} − 0 = ${n}`], ["inverse", `${n} − ${n} = 0`]];
  if (strategy === "one") return [["one more", `${n} + 1 = ${n + 1}`], ["commute", `1 + ${n} = ${n + 1}`], ["one less", `${n} − 1 = ${Math.max(0, n - 1)}`], ["inverse", `${n + 1} − ${n} = 1`]];
  if (strategy === "two") return [["two more", `${n} + 2 = ${n + 2}`], ["commute", `2 + ${n} = ${n + 2}`], ["two fewer", `${n} − 2 = ${Math.max(0, n - 2)}`], ["inverse", `${n + 2} − ${n} = 2`]];
  if (strategy === "double") return [["double", `${n} + ${n} = ${n * 2}`], ["halve", `${n * 2} − ${n} = ${n}`]];
  if (strategy === "near-one") return [["near double", `${n} + ${n + 1}`], ["double first", `${n} + ${n} + 1`], ["result", `${n * 2 + 1}`]];
  if (strategy === "near-two") return [["near double", `${n} + ${n + 2}`], ["double first", `${n} + ${n} + 2`], ["result", `${n * 2 + 2}`]];
  return [["ten more", `${n} + 10 = ${n + 10}`], ["commute", `10 + ${n} = ${n + 10}`], ["ten fewer", `${n + 10} − 10 = ${n}`], ["inverse", `${n + 10} − ${n} = 10`]];
}

function mentalCounterCount(strategy, n) {
  if (["double", "near-one", "near-two"].includes(strategy)) return Math.min(22, n * 2 + (strategy === "near-one" ? 1 : strategy === "near-two" ? 2 : 0));
  if (strategy === "ten") return Math.min(20, n + 10);
  return Math.min(20, n + (strategy === "one" ? 1 : strategy === "two" ? 2 : 0));
}

function factorPairs(number) {
  const pairs = [];
  for (let factor = 1; factor <= Math.sqrt(number); factor += 1) if (number % factor === 0) pairs.push([factor, number / factor]);
  return pairs;
}

function paddedDigits(number) { return String(Math.max(0, Math.round(number))).padStart(4, "0").slice(-4).split("").map(Number); }
function spokenSign(sign) { return sign === "=" ? "equals" : sign === ">" ? "is greater than" : "is less than"; }
function padDecimal(value) { const [whole, fraction = ""] = String(value).split("."); return `${whole.padStart(2, " ")}.${fraction.padEnd(2, "0")}`; }
function engineLabel(engine) { return ENGINE_LABELS[engine] || "Interactive lesson"; }

function comparisonReason(left, right) {
  const a = String(left).padStart(3, "0").split("").map(Number);
  const b = String(right).padStart(3, "0").split("").map(Number);
  const names = ["hundreds", "tens", "ones"];
  const index = a.findIndex((digit, i) => digit !== b[i]);
  return index === -1 ? `${left} and ${right} have the same value.` : `The ${names[index]} decide it: ${a[index]} ${a[index] > b[index] ? "is greater than" : "is less than"} ${b[index]}.`;
}

function activityInstruction(lesson) {
  const instructions = {
    "addition-table": "Tap any cell. Its row and column become the two terms.",
    coordinate: "Tap a square to move point A. Read across first, then up.",
    angle: "Drag the angle control and compare it with the paper corner.",
    scratchpad: "Draw with a finger, stylus, or mouse. Clear it whenever you want a fresh page.",
    probability: "Change the bag, predict red's likelihood, then draw several times.",
    perimeter: "Change the side lengths, then trace the full outside edge.",
  };
  return instructions[lesson.engine] || "Change the controls and watch every representation stay mathematically connected.";
}

function coachCopy(lesson) {
  if (lesson.page === 15) return "A carried 1 is one group in the next place, not one loose unit.";
  if (lesson.page === 16) return "Borrowing changes the shape of the number, never its total value.";
  if (lesson.group === "Fractions & decimals") return "Keep the whole the same before comparing its parts.";
  if (lesson.group === "Geometry") return "Move the model, then name the property that stayed the same.";
  if (lesson.group === "Mental math") return "The goal is a useful shortcut you understand, not speed.";
  return "Change one thing at a time and watch which parts of the model must change with it.";
}
