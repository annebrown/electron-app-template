//--------@/main.ts------------------------------------------------------------>
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { exec } from 'child_process';

function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 300,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, '../index.html'));
}
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('invoke-go-program', async () => {
    return new Promise((resolve, reject) => {
        exec('./hello', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(`exec error: ${error}`);
            }
            resolve(stdout);
        });
    });
});
//--------@/main.ts------------------------------------------------------------>