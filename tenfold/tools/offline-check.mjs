// Run: node tools/offline-check.mjs [screenshot.png]   (the tenfold server on port 4173 must be running)
// Opens Tenfold in a headless Chrome where every internet address is blocked
// (only localhost works), then reports fonts, console errors and failed requests.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9337;
const URL = "http://localhost:4173/";
const OUT = process.argv[2];

const profile = mkdtempSync(join(tmpdir(), "tenfold-offline-"));
const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  "--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost",
  "--no-first-run", "--no-default-browser-check", "--window-size=1280,900",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let version;
for (let i = 0; i < 50 && !version; i++) {
  try { version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); } catch { await sleep(200); }
}
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));

let id = 0;
const pending = new Map();
const events = [];
ws.addEventListener("message", ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  else if (msg.method) events.push(msg);
});
const send = (method, params = {}, sessionId) => new Promise((resolve) => {
  const n = ++id;
  pending.set(n, resolve);
  ws.send(JSON.stringify({ id: n, method, params, sessionId }));
});

const { result: { targetId } } = await send("Target.createTarget", { url: "about:blank" });
const { result: { sessionId } } = await send("Target.attachToTarget", { targetId, flatten: true });
const s = (m, p) => send(m, p, sessionId);
await s("Network.enable"); await s("Runtime.enable"); await s("Log.enable"); await s("Page.enable");
await s("Page.navigate", { url: URL });
await sleep(3000);

const evalJs = async (expression) =>
  (await s("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.result.value;

const fonts = await evalJs(`(async () => {
  await document.fonts.ready;
  const loads = await Promise.all([...document.fonts].map(f => f.load().then(() => f.family + " " + f.style + " " + f.weight + ": " + f.status, e => f.family + " " + f.style + " " + f.weight + ": FAILED " + e)));
  return {
    title: document.title,
    lessonScreenBuilt: document.querySelector("#lesson").children.length > 0,
    headingFont: getComputedStyle(document.querySelector("h1, h2")).fontFamily,
    loads,
  };
})()`);

const errorsBeforeControl = events.filter((e) =>
  (e.method === "Runtime.consoleAPICalled" && e.params.type === "error") ||
  e.method === "Runtime.exceptionThrown" ||
  (e.method === "Log.entryAdded" && e.params.entry.level === "error"));
const failedRequests = events.filter((e) => e.method === "Network.loadingFailed").map((e) => e.params.errorText);
const requested = events.filter((e) => e.method === "Network.requestWillBeSent").map((e) => e.params.request.url);

// Control: prove the internet really is blocked in this browser.
const control = await evalJs(`fetch("https://fonts.googleapis.com/css2?family=Figtree").then(() => "REACHED GOOGLE (block not working)", e => "blocked: " + e.message)`);

const shot = await s("Page.captureScreenshot", { format: "png" });
if (OUT) writeFileSync(OUT, Buffer.from(shot.result.data, "base64"));

console.log(JSON.stringify({
  fonts, requested, failedRequests,
  consoleErrors: errorsBeforeControl.map((e) => JSON.stringify(e.params).slice(0, 300)),
  internetControl: control,
}, null, 2));

ws.close();
chrome.kill();
process.exit(0);
