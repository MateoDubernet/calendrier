const {app, BrowserWindow, ipcMain, Menu}  = require('electron');
let mainWindow: typeof BrowserWindow | null
let childWindow: typeof BrowserWindow | null
let detailsWindow: typeof BrowserWindow | null

let windowMain;
const createMainWindow = () => {
 mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    mainWindow.loadFile('./dist/index.html')
}

const createChildWindow = (filePath: string) => {
    childWindow = new BrowserWindow({
        width: 800,
        height: 600,
        parent: mainWindow,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    childWindow.loadFile(filePath)
}

app.whenReady().then(() => {
    createMainWindow()
   
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
})

ipcMain.on('activate', function (event: Event, message: number) {
    createChildWindow('./dist/event.html')
    detailsWindow = childWindow
        detailsWindow.once('show', function(){
            detailsWindow.send('activate', message);
        })
        detailsWindow.once('ready-to-show', ()=>{
            detailsWindow.show()
        })
        
})

ipcMain.on('formWindow', function (event: Event, events: any) {
    createChildWindow('./dist/eventForm.html')

        childWindow.once('show', function(){
            childWindow.send('activate', events);
        })
        childWindow.once('ready-to-show', ()=>{
            childWindow.show()
        })
        
})

const template = [
    {
        label: "Ajouter",
        submenu: [
            {
                label: "Evènement",
                click: () => {
                    createChildWindow('./dist/eventForm.html')
                    childWindow.once('show', function(){
                        childWindow.send('activate');
                    })
                    childWindow.once('ready-to-show', ()=>{
                        childWindow.show()
                    })
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
]

ipcMain.on('refresh', function(event: Event, edit: boolean){
    childWindow.close()
    if (edit) {
        detailsWindow.close()
    }
    mainWindow.loadFile('./dist/index.html')
})

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})