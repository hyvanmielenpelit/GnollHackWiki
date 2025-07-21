## Visual Studio Code Installation

### Install Visual Studio Code

[Download Visual Studio Code](https://code.visualstudio.com/)

### Install Visual Studio Code Extensions

- [Foam](https://marketplace.visualstudio.com/items?itemName=foam.foam-vscode)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

### Add Workspace Settings

1. **Open Workspace Settings (JSON)** by clicking **Ctrl+Shift+P** and searching for it.
2. Add the following configuration there (to upload files under `/upload/`):
    ```
    "markdown.copyFiles.destination": {
        "/**/*": "uploads/${documentBaseName}/"
    }
    ```

### Add User Settings

1. **Open User Settings (JSON)** by clicking **Ctrl+Shift+P** and searching for it.
2. Add the following setting to the file:
    ```
    "markdown.extension.preview.autoShowPreviewToSide": true
    ```
    It will open the Markdown preview to the side.

### Add Shortcuts to User Settings (Optional)

Click **Ctrl+Shift+P** and search for:

- **Markdown All in One: Toggle Code Span**, and click the gear icon and set its key binding to **Win+Shift+C**.
- **Markdown All in One: Toggle Code Block**, and click the gear icon and set its key binding to **Win+Alt+C**.

## Accessing the Repository

### Install Git

1. [Download Git](https://git-scm.com/downloads). 
2. Install Git.

### Install GitHub Desktop (Optional)

You can also install [GitHub Desktop](https://desktop.github.com/download/) for a GUI.

### Cloning Repository

*(Use these instructions if you have write rights to the GnollHack Wiki repository. They can be granted by Sound Mind Games admins.)*

1. Open your terminal (e.g. PowerShell or bash).
2. Go to the directory under which you want to clone GnollHack wiki, e.g. type `cd C:\repos`. If the directory does not exist, you must create it.
3. Type `git clone https://github.com/hyvanmielenpelit/GnollHackWiki.git` and press Enter.
4. GnollHack wiki should now install to the `GnollHackWiki` subdirectory.

### Forking Repository and Making Pull Request

*(Use these instructions if you **don't** have write rights to the GnollHack Wiki repository but you want to do a contribution.)*

1. Go to the [GnollHackWiki repository](https://github.com/hyvanmielenpelit/GnollHackWiki) on GitHub.
2. Fork the repository by clicking the **Fork badge**. <br />
   <img src="uploads/Editing Wiki with Visual Studio Code/github-fork.png" alt="GitHub Fork" height="36" />
3. [Clone the forked repository to the local machine](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
4. Make changes and commit them.
5. Push changes the forked repository.
6. Make a pull request to the GnollHack Wiki repository from the forked repository on GitHub.

You can read more about forking repositories and making pull requests in GitHub documentation: [Creating a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

## How-To-Do Guide

### Quickly Open File by Searching

1. Click **Ctrl+G**.
2. Delete `:` in the prompt by pressing **backspace**.
3. Start to write the page name to the prompt.
4. Select the right page.

### Creating New Page from Wiki Link

You can create a new Markdown page by **holding Ctrl down while clicking a wiki link** (e.g. `[[New Page]]`).

### Add File or Image

1. Start dragging a file or an image in File Explorer.
2. Before dropping hold **Shift** down.
3. Drop the file into a Markdown file.
4. It should automatically upload it and create an appropriate tag for it.

### Publish Changes

1. Commit changes using the Source Control view.
2. Sync them.
3. If you updated the GnollHack Wiki repository directly, it takes up to 5 minutes for the changes to appear online.

## Problems

### Gollum-Style Wiki Links With Alias Not Supported

Gollum (the wiki software) expects **wiki links with an alias** to have the syntax of `[[Alias|Page Name]]` while the Foam extension uses the syntax of `[[Page Name|Alias]]`. Therefore, wiki links with an alias cannot be previewed correctly in Visual Studio Code.
