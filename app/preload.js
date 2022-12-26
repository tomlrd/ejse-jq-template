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
      return URIdatas
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