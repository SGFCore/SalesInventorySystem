import fs from "fs";
fs.renameSync("dist-electron/main.js", "dist-electron/main.cjs");
fs.renameSync("dist-electron/preload.js", "dist-electron/preload.cjs");
