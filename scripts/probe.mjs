import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
const errs = [];
p.on("pageerror", e => errs.push(e.message.slice(0,150)));
p.on("console", m => { if (m.type()==="error") errs.push("console: "+m.text().slice(0,150)); });
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await new Promise(r => setTimeout(r, 4000));
const sections = await p.evaluate(() => {
  return [...document.querySelectorAll("main section, main > div > section")].map(s => {
    const r = s.getBoundingClientRect();
    const st = getComputedStyle(s);
    return { top: Math.round(r.top + window.scrollY), h: Math.round(r.height), op: st.opacity, text: (s.textContent||"").trim().slice(0,40) };
  });
});
console.log(JSON.stringify({ errs, sections }, null, 1));
await b.close();
