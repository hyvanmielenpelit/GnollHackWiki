## Overview

**vcremote** is needed for building iOS Static Library projects.

## Installation

Install **vcremote** on the Mac computer using these instructions:

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