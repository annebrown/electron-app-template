//--------@/script.js---------------------------------------------------------->
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

console.log('script.js loaded');
//--------@/script.js---------------------------------------------------------->