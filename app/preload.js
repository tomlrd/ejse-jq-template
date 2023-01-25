const { ipcRenderer, contextBridge } = require('electron');
const todolistCTX = require('./contexts/todolist')
////////////////////////////////////////////////
const params = new URLSearchParams(window.location.search)
const APPDATAS = JSON.parse(params.get('APPDATAS'))
////////////////////////////////////////////////
ipcRenderer.send('loading', true)
////////////////////////////////////////////////
window.addEventListener("DOMContentLoaded", async() => {
  contextBridge.exposeInMainWorld("api", {
    ctx: async ()=> {
      return {todolistCTX}
    },
    appdatas: async () => {
      return APPDATAS
    },
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(
      channel,
      (event, ...args) => func(args)
    )
  })
});