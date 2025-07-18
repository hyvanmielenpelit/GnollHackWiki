## Installation

### Install Visual Studio Code

[Download Visual Studio Code](https://code.visualstudio.com/)

### Install Visual Studio Code Extensions

- [Foam](https://marketplace.visualstudio.com/items?itemName=foam.foam-vscode)
- [Markdown Preview Enhanced]( https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

### Add Workspace Settings

1. **Open Workspace Settings (JSON)** by clicking **Ctrl+Shift+P** and searching for it.
2. Add the following configuration there (to upload files under `/upload/`):
    ```
    "markdown.copyFiles.destination": {
        "/**/*": "uploads/${documentBaseName}/"
    }
    ```

### Add User Settings (Optional)

Click **Ctrl+Shift+P** and search for:

- **Markdown All in One: Toggle Code Span**, and click the gear icon and set its key binding to **Win+Shift+C**.
- **Markdown All in One: Toggle Code Block**, and click the gear icon and set its key binding to **Win+Alt+C**.

## How-To-Do Guide

### Creating New Page from Wiki Link

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

## Forking GnollHack Wiki Repository and Making Pull Request

If you have no write rights to the [GnollHack Wiki repository](https://github.com/hyvanmielenpelit/GnollHackWiki), before making changes you should:

1. Fork the [GnollHack Wiki repository](https://github.com/hyvanmielenpelit/GnollHackWiki) on GitHub.
2. [Install Git on the local machine](https://git-scm.com/downloads). 
   - You can also install [GitHub Desktop](https://desktop.github.com/download/) for a GUI.
3. [Clone the forked repository to the local machine](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
4. Make changes and commit them.
5. Push changes the forked repository.
6. Make a pull request to the GnollHack Wiki repository from the forked repository on GitHub.

### Additional Information

You can read more about forking repositories and making pull requests in GitHub documentation:

- [Creating a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
