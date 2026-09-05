import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:3001", { waitUntil: "domcontentloaded" });
await new Promise(r => setTimeout(r, 3500));
const info = await p.evaluate(() => {
  return [...document.querySelectorAll("h2")].slice(0,4).map(h => {
    const cs = getComputedStyle(h);
    return { text: h.textContent.slice(0,40), size: cs.fontSize, family: cs.fontFamily.slice(0,24), cls: h.className.slice(0,90) };
  });
});
console.log(JSON.stringify(info, null, 1));
await b.close();
