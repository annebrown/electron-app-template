//--------@/script.js---------------------------------------------------------->
// Listen for button click
document.getElementById('testButton').addEventListener('click', async () => {
  const messageBox = document.getElementById('messageBox');
  try {
      console.log('Button clicked');
      const output = await window.electronAPI.invokeGoProgram();
      console.log('Output received:', output);
      messageBox.textContent = `Go Program Output: ${output}`;
  } catch (error) {
      console.error('Error:', error);
      messageBox.textContent = `Error calling Go program: ${error}`;
  }
});

document.getElementById('listFilesButton').addEventListener('click', async () => {
    const fileList = document.getElementById('fileList');
    try {
        console.log('List Files button clicked');
        const files = await window.electronAPI.listFiles();
        console.log('Files received:', files);
        fileList.textContent = `Files: ${files.join(', ')}`;
    } catch (error) {
        console.error('Error:', error);
        fileList.textContent = `Error listing files: ${error}`;
    }
});

console.log('script.js loaded');
//--------@/script.js---------------------------------------------------------->