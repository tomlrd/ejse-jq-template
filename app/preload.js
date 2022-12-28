const { ipcRenderer, contextBridge } = require('electron');
const params = new URLSearchParams(window.location.search)
const URIdatas = params.get('URIdatas')
const route = params.get('route')
////////////////////////////////////////////////
ipcRenderer.send('loading', true)

////////////////////////////////////////////////
window.addEventListener("DOMContentLoaded", () => {
  contextBridge.exposeInMainWorld("api", {
    URIdatas: async () => {
      let checkDatas = JSON.parse(URIdatas)
      for (const [key, value] of Object.entries(checkDatas)) {
        if (localStorage.getItem(key) !== null) {
          console.log(`URIdatas.${key} found a save in localstorage`);
          checkDatas[key] = JSON.parse(localStorage.getItem(key))
        }
      }
      return checkDatas
    },
    route: async () => {
      return route
    },
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(
      channel,
      (event, ...args) => func(args)
    )
  })
});