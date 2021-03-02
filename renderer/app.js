const { ipcRenderer } = require('electron');

var editor = new Quill('#editor', {
  theme: 'snow',
});