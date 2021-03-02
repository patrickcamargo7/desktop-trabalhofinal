const { app, BrowserWindow, ipcMain } = require('electron');
const { appMenu } = require('./menu');
const fileUtil = require('./util/file');

let mainWindow;
let filePath = false;

const getFilePath = () => filePath;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('renderer/app.html');

  mainWindow.webContents.openDevTools();

  appMenu(mainWindow, getFilePath); 

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  console.log(process.platform);
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