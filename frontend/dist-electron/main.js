"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 1000,
        height: 700,
        title: "SGFMS",
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    win.loadURL("http://localhost:5173");
    // Ẩn menu bar
    electron_1.Menu.setApplicationMenu(null);
    // Log lỗi nếu có
    win.webContents.on("crashed", () => {
        console.error("WebContents crashed");
    });
    process.on("uncaughtException", (error) => {
        console.error("Uncaught exception:", error);
    });
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
