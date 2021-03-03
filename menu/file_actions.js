const { dialog } = require('electron')
const fileUtil = require('../util/file');

const close = async (window) => {
    const choice = dialog.showMessageBoxSync(
        window,
        {
          type: 'question',
          buttons: ['Sair e salvar', 'Sair e descartar', 'Cancelar'],
          title: 'Sair',
          message: 'Tem certeza que deseja sair do app?'
        }
      );
    
    if (choice === 0) {
        save(window);
    }

    return choice; 
}

const open = (window) => {
    dialog.showOpenDialog({ properties: ['openFile'] })
        .then(data => {
            fileUtil.read(data.filePaths[0])
                .then((data) => {
                    window.webContents.send('render:load-content', data);
                })
        })
}

const save = (window, fileStatus) => {
    dialog.showSaveDialog({ properties: ['promptToCreate', 'createDirectory'] })
        .then(data => {
            window.webContents.executeJavaScript('editor.root.innerHTML')
                .then((content) => {
                    fileUtil.save(data.filePath, content);
                })
        })
}

exports.close = close;
exports.open  = open;
exports.save  = save;