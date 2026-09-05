import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
for (const route of ["/", "/solutions", "/use-cases", "/contact", "/platform", "/about"]) {
  await p.goto(`http://localhost:3001${route}`, { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 2500));
  const info = await p.evaluate(() => {
    const h1 = document.querySelector("h1");
    const h1s = h1 ? getComputedStyle(h1).fontSize : "none";
    const eyebrows = [...document.querySelectorAll("span")].map(s => s.textContent || "").filter(t =>
      /[a-z][A-Z]{2}/.test(t) && t.length < 60);
    const badTokens = [...document.body.innerText.matchAll(/\b\w*(?:moNIT|bilIT|bilLT|suiTe|ENT fIT|abilLTy|ITy)\w*/g)].map(m=>m[0]).slice(0,5);
    return { h1size: h1s, h1text: h1?.textContent?.slice(0,50), mangled: [...new Set([...eyebrows, ...badTokens])].slice(0,6) };
  });
  console.log(route, JSON.stringify(info));
}
await b.close();
