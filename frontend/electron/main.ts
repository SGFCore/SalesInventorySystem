import { app, BrowserWindow, Menu } from "electron";
import path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "SGFMS",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL("http://localhost:5173");

  // Ẩn menu bar
  Menu.setApplicationMenu(null);

  // Log lỗi nếu có
  win.webContents.on("crashed", () => {
    console.error("WebContents crashed");
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
