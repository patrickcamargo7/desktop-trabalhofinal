const { dialog } = require('electron')
const fileUtil = require('../util/file');

const close = () => {
    dialog.showOpenDialog({
        title: 'Tem certeza que deseja sair sem salvar?',
    });
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
                    fileUtil.write(data.filePath, content);
                })
        })
}



exports.close = close;
exports.open  = open;
exports.save  = save;