// Dev screenshot helper: node scripts/shot.mjs <path> <outname> [--mobile]
import puppeteer from "puppeteer-core";

// pass route WITHOUT leading slash ("" or "." = home) to dodge MSYS path mangling
const [, , rawRoute = ".", name = "page", flag] = process.argv;
const route = rawRoute === "." ? "/" : `/${rawRoute.replace(/^\/+/, "")}`;
const mobile = flag === "--mobile";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport(
  mobile
    ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { width: 1440, height: 900, deviceScaleFactor: 1 }
);
page.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE ERROR:", m.text());
});
page.on("pageerror", (e) => console.log("PAGE ERROR:", e.message));

await page.goto(`http://localhost:${process.env.SHOT_PORT ?? "3000"}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));
// let animations/reveals settle and lazy content mount
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  await new Promise((r) => {
    let y = 0;
    const step = () => {
      y += 500;
      window.scrollTo({ top: y, behavior: "instant" });
      if (y < document.body.scrollHeight) setTimeout(step, 250);
      else { window.scrollTo({ top: 0, behavior: "instant" }); setTimeout(r, 600); }
    };
    step();
  });
});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: `C:\\tmp\\asta-shots\\${name}.png`, fullPage: true });
console.log(`saved ${name}.png`);
await browser.close();
