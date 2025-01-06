//<--------@/preload.ts-------------------------------------------------------->
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    invokeGoProgram: () => ipcRenderer.invoke('invoke-go-program'),
    listFiles: () => ipcRenderer.invoke('list-files'),
    invokeListFilesGo: () => ipcRenderer.invoke('invoke-list-files-go')
});
//<--------@/preload.ts-------------------------------------------------------->