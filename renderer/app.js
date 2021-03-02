const { ipcRenderer } = require('electron');

var editor = new Quill('#editor', {
  theme: 'snow',
});

document.addEventListener('drop', async (e) => {
  e.preventDefault(); 
  e.stopPropagation(); 

  editor.root.innerHTML = await ipcRenderer.invoke('file:load-content', e.dataTransfer.files[0].path);
});

ipcRenderer.on('render:load-content', (e, content) => {
  editor.root.innerHTML = content;
}); 