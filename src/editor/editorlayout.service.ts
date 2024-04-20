export class EditorLayoutService {
  currentFile: File | undefined;
  currentLayout: Object | undefined;
  static _instance: EditorLayoutService | undefined;
  layoutChangeListeners: ((layout: Object) => void)[] = [];

  constructor() {
    EditorLayoutService._instance = this;
  }

  async openFile() {
    const pickerOpts = {
      types: [
        {
          description: "JSON Files",
          accept: {
            "text/json": [".json"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };

    try {
      // Opens the file picker dialog allowing the user to select files
      const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
      const file = await fileHandle.getFile();
      this.currentFile = file;
      const contents = await file.text();
      this.currentLayout = JSON.parse(contents);
      this.layoutChangeListeners.forEach((listener) =>
        listener(this.currentLayout ?? {})
      );
    } catch (e) {
      // Handle any errors here
      console.error(e);
    }
  }

  async saveFile() {
    if (this.currentFile) {
      const writable = await this.currentFile.createWritable();
      await writable.write(JSON.stringify(this.currentLayout));
      await writable.close();
    }
  }

  get layout() {
    return this.currentLayout ?? {};
  }

  static get instance() {
    return EditorLayoutService._instance;
  }

  addLayoutChangeListener(listener: (layout: Object) => void) {
    this.layoutChangeListeners.push(listener);
  }
}
