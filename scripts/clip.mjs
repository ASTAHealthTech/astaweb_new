// node scripts/clip.mjs <route> <prefix> [--mobile]  — screenshots each <section> separately
import puppeteer from "puppeteer-core";

const [, , rawRoute = ".", prefix = "sec", flag] = process.argv;
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
await page.goto(`http://localhost:${process.env.SHOT_PORT ?? "3000"}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3000));
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  await new Promise((r) => {
    let y = 0;
    const step = () => {
      y += 500;
      window.scrollTo({ top: y, behavior: "instant" });
      if (y < document.body.scrollHeight) setTimeout(step, 200);
      else { window.scrollTo({ top: 0, behavior: "instant" }); setTimeout(r, 600); }
    };
    step();
  });
});
await new Promise((r) => setTimeout(r, 1000));
const sections = await page.$$("main section, main > div > section");
let i = 0;
for (const s of sections) {
  const box = await s.boundingBox();
  if (!box || box.height < 40) continue;
  i++;
  await page.evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }), s);
  await new Promise((r) => setTimeout(r, 400));
  try {
    await s.screenshot({ path: `C:\\tmp\\asta-shots\\${prefix}-${String(i).padStart(2, "0")}.png` });
    console.log(`${prefix}-${String(i).padStart(2, "0")}.png h=${Math.round(box.height)}`);
  } catch (e) {
    console.log(`skip ${i}: ${e.message}`);
  }
}
await browser.close();
