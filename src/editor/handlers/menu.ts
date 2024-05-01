import { EditorLayoutService } from "../editorlayout.service";

export async function openFile() {
  await EditorLayoutService.instance?.openFile();
}

export async function saveFile() {
  await EditorLayoutService.instance?.saveFile();
}
