var URIdatas = {}
var route = ""
var fetch;
window.addEventListener("DOMContentLoaded", async () => {
    URIdatas = await api.URIdatas()
    route = await api.route()

    setTimeout(() => {
        api.send("loading", false)
    }, 1000);

    fetch = function fetch(key, val, save) {
        api.send("fetch", [key, val])
        if (save === true) {
            localStorage.setItem(`${key}`, JSON.stringify(val))
        }
    }
});