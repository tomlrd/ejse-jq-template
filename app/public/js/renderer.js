var URIdatas = {}
var route = ""
var fetch;
window.addEventListener("DOMContentLoaded", async () => {
    URIdatas = JSON.parse(await api.URIdatas())
    route = await api.route()
    fetch = function fetch(key, val, save) {
        api.send("fetch", [key, val])
        if (save === true) {
            localStorage.setItem(`${key}`, val)
        }
    }
});