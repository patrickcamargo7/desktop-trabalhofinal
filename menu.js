const { Menu, ipcMain } = require('electron');

let mainMenu;

const fileActions = require('./menu/file_actions');
const actions = require('./menu/actions');

exports.appMenu = (window, filePath, createWindow) => {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          id: 'new',
          label: 'New',
          click: () => {
            createWindow();
          },
          accelerator: 'CommandOrControl+N',
        },
        {
          id: 'open',
          label: 'Open',
          click: () => {
            fileActions.open(window);
          },
          accelerator: 'CommandOrControl+O',
        },
        {
          id: 'save',
          label: 'Save',
          click: () => {
            fileActions.save(window, filePath);
          },
          accelerator: 'CommandOrControl+S',
        },
        {
          id: 'close',
          label: 'Close',
          click: () => {
            fileActions.close(window);
          },
          accelerator: 'CommandOrControl+W',
        },
      ],
    },
    {
      label: 'Action',
      submenu: [
        {
          id: 'clearall',
          label: 'Clear All',
          click: () => {
            actions.clearAll(window);
          },
          accelerator: 'CommandOrControl+R',
        },
      ],
    },
    {
      role: 'editMenu',
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      role: 'appMenu',
    });
  }

  this.mainMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(this.mainMenu);
};
