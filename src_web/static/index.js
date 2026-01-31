// ./ui/index.js
import { Window } from "./ui/index.js";
async function main() {
    const res = await fetch("/api/files");
    const files = await res.json();
    const win = new Window("src 配下ファイル");
    win.setContent("<ul>" +
        files
            .map((f) => `<li class="${f.type}">${f.name}${f.ext ?? ""}</li>`)
            .join("") +
        "</ul>");
    win.setStatus("Ready");
    win.show(document.getElementById("app"));
}
main();
