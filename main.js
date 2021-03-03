const { app, BrowserWindow, ipcMain } = require('electron');
const { appMenu } = require('./menu');
const fileUtil = require('./util/file');
const fileActions = require('./menu/file_actions');

let mainWindow;
let filePath = false;

const getFilePath = () => filePath;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    show: false, 
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('renderer/app.html');

  //mainWindow.webContents.openDevTools();

  appMenu(mainWindow, getFilePath, createWindow); 

  mainWindow.on('close', onCloseWindow);
 
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}
 
let onCloseWindow = async (e) => { 
  const option = await fileActions.close(mainWindow);

  if (option === 2) {
    e.preventDefault();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

ipcMain.handle('file:load-content', async (event, filePath) => {
  console.log(filePath);
  const content = await fileUtil.read(filePath);
  return content;
})