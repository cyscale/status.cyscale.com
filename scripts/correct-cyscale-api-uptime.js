const fs = require("fs");

const correctedWeeklyUptime = "100.00%";

const summaryPath = "history/summary.json";
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
const cyscaleApi = summary.find((entry) => entry.slug === "cyscale-api");

if (!cyscaleApi) {
  throw new Error("Could not find cyscale-api in history/summary.json");
}

cyscaleApi.uptimeWeek = correctedWeeklyUptime;

fs.writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);

const badges = {
  "api/cyscale-api/uptime-week.json": {
    schemaVersion: 1,
    label: "uptime 7d",
    message: "100%",
    color: "brightgreen",
  },
};

for (const [filePath, content] of Object.entries(badges)) {
  fs.writeFileSync(filePath, JSON.stringify(content));
}

const readmePath = "README.md";
let readme = fs.readFileSync(readmePath, "utf8");
readme = readme
  .replace(/>91\.36%/g, ">100.00%")
  .replace(/7-day uptime 91\.36%/g, "7-day uptime 100.00%");
fs.writeFileSync(readmePath, readme);
