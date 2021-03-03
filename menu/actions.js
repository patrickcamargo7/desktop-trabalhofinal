const clearAll = (window) => {
    window.webContents.executeJavaScript('editor.root.innerHTML = \'\'');
}

exports.clearAll   = clearAll;
