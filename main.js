const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// Module to create the application menu
const Menu = electron.Menu

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1440, height: 900})

  // Load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/content/index.html`)

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    electron.shell.openExternal(url);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // Define the menu
  let appMenu = [{
      label: "Application",
      submenu: [
          { label: "About", selector: "orderFrontStandardAboutPanel:" },
          { type: "separator" },
          { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]}, {
      label: "Edit",
      submenu: [
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]}
  ];

  // Create the menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(appMenu));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
