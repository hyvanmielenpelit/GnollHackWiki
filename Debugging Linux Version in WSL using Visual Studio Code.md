## Overview

You can install the Linux version of GnollHack to Windows Subsystem for Linux and then debug it using these instructions.

- [[Build Instructions for ASCII Version on Linux]]

## Installing Visual Studio Code for Debugging

### 1. Install [Visual Studio Code](https://code.visualstudio.com/) on Windows.

### 2. In WSL

Type `code` in WSL to install vscode server in Ubuntu.

### 3. In Windows VS Code

1. Install Remote – WSL Extension.
2. Install C/C++ Extension (for Debugging) for your user
3. Open remote GnollHack folder on WSL side
4. Start Debug should work if GnollHack is compiled
5. Close VS Code

### 4. In WSL (open in Windows by typing wsl, if not already open)

Set root password in WSL by

1. `sudo –i`
2. `passwd`

### 5. In Windows Command Prompt

Change default user to root by typing `ubuntu2004 config --default-user root`.

### 6. In Windows VS Code

1. Open VS Code
2. Open GnollHack remote location in WSL (opens automatically due to step 4, or if not, open from green toolbar box in left bottom corner):

    ![image](https://user-images.githubusercontent.com/16661034/184309614-780605a1-1ddd-417b-8b47-306af9735dd1.png)

3. This should install vs code server for root
4. Install C/C++ Extension (for Debugging in VS Code) for root. The end result in Extensions window:

    ![image](https://user-images.githubusercontent.com/16661034/184309762-08405f76-d200-4405-bb80-f12c01bd0733.png)
