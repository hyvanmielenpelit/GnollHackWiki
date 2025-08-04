## Visual Studio Code Installation

### Install Visual Studio Code

[Download Visual Studio Code](https://code.visualstudio.com/)

### Install Visual Studio Code Extensions

- [Foam for Gollum](https://marketplace.visualstudio.com/items?itemName=Hyvnmielenpelitry.foam-vscode-gollum)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

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
   <img src="/uploads/Editing Wiki with Visual Studio Code/github-fork.webp" alt="GitHub Fork" height="36" />
3. [Clone the forked repository to the local machine](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
4. Make changes and commit them.
5. Push changes the forked repository.
6. Make a pull request to the GnollHack Wiki repository from the forked repository on GitHub.

You can read more about forking repositories and making pull requests in GitHub documentation: [Creating a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

## Editing Conventions

### Place Empty Line Around Headings

- Please use an empty line before all headings, except in the very beginning of a file.
- Please use an empty line after all headings.

#### Example

```
# Heading1

Some text

## Heading2

Some text
```

### Use Subdirectories When Necessary

You should use subdirectories in the following cases:

1. Logical grouping of a large number of files.
   - There's a soft limit of 1000 files per directory on GitHub, after which directory listings are cut short.
2. To prevent naming conflicts.
   - For example, to differentiate between [[/Monsters/Grand Master]] monster and [[/Difficulties/Grand Master]] difficulty.

### Uploads Should Go Under /uploads/

Uploads, such as images, should be placed under `/uploads/`. If the document with an upload is in a subdirectory, the subdirectory name should also be included in the path. This should be handled automatically by Visual Studio Code, when you have the Foam for Gollum extension installed with the default settings.

#### Examples

- `/uploads/Races/Dwarf/image.webp` — An image in `Races/Dwarf`.
- `/uploads/Home/image.webp` — An image in `Home`.

### Use Only WebP Files as Images

Please use **WebP** encoded at **90 quality** as the image file format. Many image editing software support WebP.

- Adobe Photoshop has native WebP support since February 2022.
- For earlier versions of Adobe Photoshop and Adobe Photoshop Elements, you can download [WebPShop plugin](https://github.com/webmproject/WebPShop).

#### WebP Batch Conversion

You can use an online service to convert your images to WebP in one batch:

1. Go to [To WebP website](https://towebp.io/) with your browser.
2. First, *before adding files*, set **Quality** to **90** and **Size** to whatever scaling factor you want to use for your images.
3. Click **Add Files** and select all files you want to convert.
4. Click **Download All** to download all images in WebP format in a ZIP file. 

### Page Title Can Be Customized Using H1 Heading (#) in First Line

Page titles can be customized using an H1 heading (single #) in the first line of a page.

#### Example

```
# My Custom Page Title
```

### Use Only H2 (##) and Lower Headings

Since the H1 heading (#) is reserved for customizing page titles, please use only H2 (##) and lower headings as section headings in a page.

### Don't Put Anything Under /gollum/

`/gollum/` folder is reserved for the Gollum wiki software functions. Please don't create that folder and don't put anything under it.

### /.gollum/ Folder Is Reserved for Website Files

`/.gollum/` (note the dot `.` in the folder name) is reserved for website specific files that are not related to wiki pages. Please place all files that are related to the wiki website development under it. However, if you are only adding content to the wiki, you should not touch the files under `/.gollum/`.

## How-To-Do Guide

### Open Markdown Preview

Press **Ctrl+Shift+V**.

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

## Additional Information

### Case-Insensitive Wikilinks

Wikilinks are **case-insensitive**, so you can write `[[/Items/potion of healing]]` and it works like this:
- [[/Items/potion of healing]]

It links to [[/Items/Potion of healing.md]].
  
### Global Tag Lookup Disabled

Global tag lookup is disabled, so you need to specify the exact path to the Markdown file.

### No Need to Specify .md Extension for Markdown Files

Even though browser URLs in the wiki have the **.md extension**, you don't need to use it in wikilinks.

### Wikilinks Relative to Current Document Directory

All wikilinks are **relative to the current document directory** and not to the root directory of the wiki (as in MediaWiki), making things a bit harder than necessary. However, you can just use `/` at the start of wikilinks to make them relative to the root directory. We have adopted a convention to always use it before subdirectories, but you may need to use it when referring to a file in the root directory, when the current document is in a subdirectory.

### Changing Image and File Dropdown Templates

Gollum supports three syntaxes for image and file links. When you drop a file or image into a Markdown document, Visual Studio Code will create a template based on the chosen syntax. You can set the syntaxes, for example, in workspace settings, and then they are  specific to a repository.

#### Image Templates

Based on the `"foam.file-dropdown.image-template-format"` setting, the custom file dropdown provider will generate the following templates.

| Syntax | Setting Value | Template |
| :----- | :------------ | :------- |
| Markdown | `"markdown"` | <code>!&#91;Text&#93;&#40;/path/image.webp&#41;</code> |
| HTML | `"html"` | <code>&lt;img src="/path/image.webp" alt="Text" width="Width" height="Height" /&gt;</code> |
| Gollum | `"gollum"` | <code>&#91;&#8203;&#91;/path/image.webp&#124;alt=Text, width=Width, height=Height&#93;&#8203;&#93;</code> |

The default setting is `"markdown"`.

#### File Templates

Based on the `"foam.file-dropdown.file-template-format"` setting, the custom file dropdown provider will generate the following templates.

| Syntax | Setting Value | Template |
| :----- | :------------ | :------- |
| Markdown | `"markdown"` | <code>!&#91;Text&#93;&#40;/path/file.pdf&#41;</code> |
| HTML | `"html"` | <code>&lt;a href="/path/file.pdf"/&gt;Text&lt;/&gt;</code> |
| Gollum | `"gollum"` | <code>&#91;&#8203;&#91;/path/file.pdf&#124;alt=Text&#93;&#8203;&#93;</code> |

The default setting is `"markdown"`.
