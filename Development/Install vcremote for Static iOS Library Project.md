## Overview

**vcremote** is needed for building iOS Static Library projects.

## Prerequisites on Mac

Before installing `vcremote`, ensure the following are installed on macOS:
1. **Xcode Command Line Tools** — run `xcode-select --install` in Terminal.
2. **Node.js and npm** — download from [nodejs.org](https://nodejs.org/) or install via Homebrew (`brew install node`).

## Installation

Install **vcremote** globally on the Mac computer using npm:

```bash
sudo npm install -g vcremote --unsafe-perm=true --allow-root
```

For official Microsoft instructions, see:
- [Install And Configure Tools to Build using iOS](https://docs.microsoft.com/en-us/cpp/cross-platform/install-and-configure-tools-to-build-using-ios?view=msvc-170)

## Generate PIN

1. Generate PIN by running `vcremote generateClientCert` in Terminal.
2. **Write the PIN down**. You will need to enter it to Visual Studio on Windows.

## ⚙️ Configure Visual Studio

1. In Visual Studio on Windows, go to **Tools** → **Options** → **Cross Platform** → **C++** → **iOS**.
2. Enter the Mac's IP address or hostname, the port number, and the PIN generated in the previous step.

## Run vcremote

1. Run **vcremote** by writing `vcremote` in Terminal.
2. Now vcremote is listening to connections.