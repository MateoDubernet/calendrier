"use strict";
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
let mainWindow;
let childWindow;
let detailsWindow;
let windowMain;
const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile('./dist/html/index.html');
};
const createChildWindow = (filePath) => {
    childWindow = new BrowserWindow({
        width: 800,
        height: 600,
        parent: mainWindow,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    childWindow.loadFile(filePath);
};
app.whenReady().then(() => {
    createMainWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createMainWindow();
    });
});
ipcMain.on('activate', function (event, message) {
    createChildWindow('./dist/html/singleEvent.html');
    detailsWindow = childWindow;
    detailsWindow.once('show', function () {
        detailsWindow.send('activate', message);
    });
    detailsWindow.once('ready-to-show', () => {
        detailsWindow.show();
    });
});
ipcMain.on('formWindow', function (event, events) {
    createChildWindow('./dist/html/eventForm.html');
    childWindow.once('show', function () {
        childWindow.send('activate', events);
    });
    childWindow.once('ready-to-show', () => {
        childWindow.show();
    });
});
const template = [
    {
        label: "Ajouter",
        submenu: [
            {
                label: "Evènement",
                click: () => {
                    createChildWindow('./dist/html/eventForm.html');
                    childWindow.once('show', function () {
                        childWindow.send('activate');
                    });
                    childWindow.once('ready-to-show', () => {
                        childWindow.show();
                    });
                }
            },
            {
                label: "Quitter",
                role: "quit"
            }
        ]
    },
    {
        label: "Outils",
        role: "toggleDevTools"
    }
];
ipcMain.on('refresh', function (event, edit) {
    childWindow.close();
    if (edit) {
        detailsWindow.close();
    }
    mainWindow.loadFile('./dist/html/index.html');
});
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
//# sourceMappingURL=main.js.map