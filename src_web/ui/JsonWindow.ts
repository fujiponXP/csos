// JsonWindow.ts
import { Window } from "./Window.js";
import { JsonUIBuilder, JsonObject } from "./JsonParser.js";

export class JsonWindow {
  win: Window;
  container: HTMLDivElement;
  builder: JsonUIBuilder;

  constructor(title: string) {
    this.win = new Window(title);
    this.container = document.createElement("div");
    this.win.setContent(this.container);
    this.builder = new JsonUIBuilder(this.container);
  }

  public setJsonObjects(jsonArray: JsonObject[]) {
    this.builder.build(jsonArray);
  }

  public show(parent: HTMLElement = document.body) {
    this.win.show(parent);
  }
}
