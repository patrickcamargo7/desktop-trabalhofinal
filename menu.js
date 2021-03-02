const { Menu, ipcMain } = require('electron');

let mainMenu;

const fileActions = require('./menu/file_actions');

exports.appMenu = (window, filePath) => {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          id: 'new',
          label: 'New',
          click: () => {
            window.webContents.send('menu-add-click');
          },
          accelerator: 'CommandOrControl+N',
        },
        {
          id: 'new',
          label: 'Open',
          click: () => {
            fileActions.open(window);
          },
          accelerator: 'CommandOrControl+O',
        },
        {
          id: 'new',
          label: 'Save',
          click: () => {
            fileActions.save(window, filePath);
          },
          accelerator: 'CommandOrControl+S',
        },
        {
          id: 'delete',
          label: 'Close',
          click: () => {
            fileActions.close();
          },
          accelerator: 'CommandOrControl+W',
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
