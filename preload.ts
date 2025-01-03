import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    invokeGoProgram: () => ipcRenderer.invoke('invoke-go-program'),
    listFiles: () => ipcRenderer.invoke('list-files')
});