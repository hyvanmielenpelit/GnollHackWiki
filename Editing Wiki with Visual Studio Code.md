## Installation

### Install Visual Studio Code

[Download Visual Studio Code](https://code.visualstudio.com/)

### Install Visual Studio Code Extensions

- [Foam](https://marketplace.visualstudio.com/items?itemName=foam.foam-vscode)
- [Markdown Preview Enhanced]( https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
- [Mark All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

### Add Workspace Settings

1. **Open Workspace Settings (JSON)** by clicking **Shift+Ctrl+P** and searching for it.
2. Add the following configuration there (to upload files under `/upload/`):
    ```
    "markdown.copyFiles.destination": {
        "/**/*": "uploads/${documentBaseName}/"
    }
    ```

### Add User Settings (Optional)

Click **Shift+Ctrl+P** and search for:

- **Markdown All in One: Toggle Code Span**, and click the gear icon and set its key binding to **Shift+Win+C**.
- **Markdown All in One: Toggle Code Block**, and click the gear icon and set its key binding to **Alt+Win+C**.

## How-To-Do Guide

### Creating a New Page from a Wiki Link

You can create a new Markdown page by **holding Ctrl down while clicking a wiki link** (e.g. `[[New Page]]`).

### Open Preview Pane

Click **Ctrl+Shift+V**.

### Add File or Image

1. Start dragging a file or an image in File Explorer.
2. Before dropping hold **Shift** down.
3. Drop the file into a Markdown file.
4. It should automatically upload it and create an appropriate tag for it.

### Publish Changes

1. Commit changes using the Source Control view.
2. Sync them.
3. It takes up to 5 minutes for them to appear online.
