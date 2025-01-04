//--------@/main.ts------------------------------------------------------------>
// filepath: /home/anne/electron/electron-app-template/electron-app-template/main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

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
        const helloPath = path.join(__dirname, '../hello');
        console.log(`Executing: ${helloPath}`);
        fs.access(helloPath, fs.constants.X_OK, (err) => {
            if (err) {
                console.error(`No execute permission for ${helloPath}`);
                reject(`No execute permission for ${helloPath}`);
                return;
            }
            exec(helloPath, (error, stdout, stderr) => {
                if (error) {
                    reject(`exec error: ${error}`);
                    return;
                }
                if (stderr) {
                    reject(`stderr: ${stderr}`);
                    return;
                }
                resolve(stdout);
            });
        });
    });
});

ipcMain.handle('list-files', async () => {
    const { readdir } = require('fs/promises');
    try {
        const files = await readdir('.');
        return files;
    } catch (error) {
        console.error(`readdir error: ${error}`);
        throw error;
    }
});

ipcMain.handle('invoke-list-files-go', async () => {
    return new Promise((resolve, reject) => {
        const listFilesPath = path.join(__dirname, '../listFiles/listFiles');
        console.log(`Executing: ${listFilesPath}`);
        fs.access(listFilesPath, fs.constants.X_OK, (err) => {
            if (err) {
                console.error(`No execute permission for ${listFilesPath}`);
                reject(`No execute permission for ${listFilesPath}`);
                return;
            }
            exec(listFilesPath, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    reject(`exec error: ${error}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    reject(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                resolve(stdout.split('\n').filter(line => line));
            });
        });
    });
});
//--------@/main.ts------------------------------------------------------------>