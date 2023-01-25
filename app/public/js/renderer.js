var APPDATAS = {}
var ctx;
window.addEventListener("DOMContentLoaded", async () => {
    APPDATAS = await api.appdatas()
    ctx = await api.ctx()
    setTimeout(() => {
        api.send("loading", false)
    }, 1000);
});