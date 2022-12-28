const { app, BrowserWindow, BrowserView, ipcMain } = require("electron");
const os = require("os")
const path = require("path");
const ejse = require('ejs-electron')
let mainWin, loaderView;
///////////////////////////
var APPDATAS = {
  version: app.getVersion(),
  user: {
    name: os.hostname()
  },
  todoList: []
}

///////////////////////////
app.whenReady().then(async () => {
  mainWin = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      devTools: true,
      preload: path.join(__dirname, "preload.js")
    },
  });
  loaderView = new BrowserView({
    webPreferences: {
      devTools: true
    }
  });

  ///////
  ejse.data({
    APPDATAS
  })

  loaderView.setBounds({ x: 0, y: 0, width: mainWin.getBounds().width, height: mainWin.getBounds().height })
  await loaderView.webContents.loadFile(path.join(__dirname, '/views/loading.html'))
  setTimeout(() => {
    mainWin.loadFile(path.join(__dirname, `/views/landing.ejs`), { query: { 'URIdatas': JSON.stringify(APPDATAS), route: "landing" } })
    if (!app.isPackaged) {
      //loaderView.webContents.openDevTools({ mode: "detach" })
      mainWin.webContents.openDevTools({ mode: "detach" })
    }
  }, 500);
  ///////

  mainWin.on('resized', () => {
    loaderView.setBounds({ x: 0, y: 0, width: mainWin.getBounds().width, height: mainWin.getBounds().height })
  })
})

////////// ROUTING ////////////
ipcMain.on('route', async (e, nextRoute) => {
  await mainWin.loadFile(path.join(__dirname, `/views/${nextRoute}.ejs`), { query: { 'URIdatas': JSON.stringify(APPDATAS), route: nextRoute } })
})
////////// UPDATE APPDATAS ////////////
ipcMain.on('fetch', async (e, [key, val]) => {
  APPDATAS[`${key}`] = val
  e.reply(`return:${key}`, val)
})

////////// LOADER ////////////
ipcMain.on('loading', async (e, status) => {
  switch (status) {
    case true:
      mainWin.addBrowserView(loaderView)
      loaderView.setBounds({ x: 0, y: 0, width: mainWin.getBounds().width, height: mainWin.getBounds().height })
      break;
    case false:
      mainWin.removeBrowserView(loaderView)
      break;
  }
})