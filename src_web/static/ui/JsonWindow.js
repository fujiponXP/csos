// JsonWindow.ts
import { Window } from "./Window.js";
import { JsonUIBuilder } from "./JsonParser.js";
export class JsonWindow {
    win;
    container;
    builder;
    constructor(title) {
        this.win = new Window(title);
        this.container = document.createElement("div");
        this.win.setContent(this.container);
        this.builder = new JsonUIBuilder(this.container);
    }
    setJsonObjects(jsonArray) {
        this.builder.build(jsonArray);
    }
    show(parent = document.body) {
        this.win.show(parent);
    }
}
