//<--------@/script.js--------------------------------------------------------->
// Listen for button clicks

// textButton 
document.getElementById('textButton').addEventListener('click', async () => {
    const goProgramOutput = document.getElementById('goProgramOutput');
    try {
        const result = await window.electronAPI.invokeGoProgram();
        goProgramOutput.textContent = `Go Program Output: ${result}`;
    } catch (error) {
        goProgramOutput.textContent = `Error: ${error}`;
    }
});

// listFilesButton
document.getElementById('listFilesButton').addEventListener('click', async () => {
    const fileListOutput = document.getElementById('fileListOutput');
    try {
        const files = await window.electronAPI.listFiles();
        fileListOutput.textContent = `Files: ${files.join(', ')}`;
    } catch (error) {
        fileListOutput.textContent = `Error listing files: ${error}`;
    }
});

// ListFilesgoButton
document.getElementById('listFilesGoButton').addEventListener('click', async () => {
    const fileListGoOutput = document.getElementById('fileListGoOutput');
    try {
        const files = await window.electronAPI.invokeListFilesGo();
        fileListGoOutput.textContent = `Files: ${files.join(', ')}`;
    } catch (error) {
        fileListGoOutput.textContent = `Error listing files: ${error}`;
    }
});
console.log('script.js loaded');
//<--------@/script.js--------------------------------------------------------->