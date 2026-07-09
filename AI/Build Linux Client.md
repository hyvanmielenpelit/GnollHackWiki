---
name: build_linux_client
description: Instructions for building the ASCII Linux client on Ubuntu/WSL and configuring remote debugging with Visual Studio Code.
---

> 👉 **This skill provides instructions for compiling the legacy ASCII console version of GnollHack for Linux, and how to debug it using Visual Studio Code and WSL.**

## 🐧 Building on Ubuntu/WSL

### 1. Prerequisites

- Ensure `build-essential`, `bison`, `flex`, and `libncurses` (`libncurses5-dev`, `libncursesw5-dev`) are installed on your Linux/WSL instance.
- Clone the GnollHack repository.

### 2. Configure the Build

1. Make the setup script executable: `sudo chmod a+rx ./sys/unix/setup.sh`
2. Run the setup script to generate the `Makefile` in the top-level directory:
   - For a standard debug build: `sudo ./sys/unix/setup.sh ./sys/unix/hints/linux-debug`
   - For a public server build (with common xlogfile): `sudo ./sys/unix/setup.sh ./sys/unix/hints/linux-gnh-debug`

### 3. Compile

1. Run `sudo make install -B`. This will compile GnollHack and install it to the `/gnh` directory.
2. Grant permissions to the install directory: `cd /gnh` and `sudo chmod -R a+rw *`.
3. Run the game: `./gnollhack`

## 🐛 Debugging with Visual Studio Code

### 1. VS Code Setup

- Install Visual Studio Code on Windows.
- Install the **Remote - WSL** extension and the **C/C++** extension.
- In WSL, run `code` to install the VS Code server.

### 2. WSL Root Configuration

Debugging typically requires root permissions to attach to the process.
1. In WSL, set a root password: `sudo -i` then `passwd`.
2. Open a Windows Command Prompt and set the default WSL user to root: `ubuntu2004 config --default-user root` (adjust the `ubuntu` command to match your installed version).

### 3. Debugging Session

1. Open VS Code and connect to the remote GnollHack folder in WSL.
2. Ensure the C/C++ extension is installed on the remote WSL (root) server.
3. Configure your `launch.json` to point to `/gnh/gnollhack` or the output executable.
4. Set breakpoints in the C code and start the debugging session.
