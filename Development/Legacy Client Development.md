> 👉 **Build instructions for GnollHack's legacy clients, which are no longer maintained: the Xamarin.Forms mobile versions and the Win32 and ASCII versions.**

> 🛑 **Caution:** The following sections describe legacy versions and ports that are no longer actively supported or maintained. They are kept here for historical reference only. Do not use these targets for active feature development.

## 📱 Legacy Mobile Ports (Xamarin.Forms)

- [[/Development/Build Instructions for Android Version on Windows]]
- [[/Development/Android Version Building Checklist]]
- [[/Development/Build Instructions for iOS Version on Windows]]
- [[/Development/Visual Studio Installation for Mobile Version Development]] — Visual Studio with Xamarin
- [[/Development/Enable Xamarin.iOS Connections]]
- [[/Development/Install Bison and Flex on Mac]]
- [[/Development/Install vcremote for Static iOS Library Project]] — No longer needed: the iOS library is now built over SSH
- [[/Development/Install PuTTY and PSCP and Create Download Scripts for Static iOS Library Project]] — No longer needed, for the same reason
- [[/Development/Delete Old Directories]] — Directories renamed in the early versions of the repository

## 🖥️ Legacy Windows Ports (1990s UI Style)

- [[/Development/Build Instructions for ASCII Version on Windows]] — Win32 Console Application
- [[/Development/Build Instructions for Windows GUI Version on Windows]] — Win32 Application with ComCtl32 Controls
- [[/Development/Visual Studio Installation for ASCII and Windows GUI Version Development]]

## 💻 Legacy Linux Port

- [[/Development/Build Instructions for ASCII Version on Linux]]
- [[/Development/Debugging Linux Version in WSL using Visual Studio Code]]

## 📋 Legacy Clients Support Table

| Platform | Technology | CPU Arch | Solution | Projects | Emulator Support<sup>1</sup> |
|:---------|:-----------|:---------|:---------|:---------|:----------------------------:|
| Android | Xamarin.Forms | Arm64 | GnollHack | GnollHackX, GnollHackX.Android | Yes<sup>3</sup> |
| iOS | Xamarin.Forms | Arm64 | GnollHack | GnollHackX, GnollHackX.iOS | Yes<sup>3</sup> |
| Windows | ASCII | x64 | GnollHack | GnollHack | Yes |
| Windows | ComCtl32 Controls | x64 | GnollHack | GnollHackW | Yes |
| Linux | ASCII | x64 | N/A<sup>2</sup> | N/A<sup>2</sup> | N/A |

- <sup>1</sup> Emulator support refers to whether the port is supported by popular cross-operating-system emulators.
- <sup>2</sup> The Linux version is built on Linux as described in [[/Development/Build Instructions for ASCII Version on Linux]].
- <sup>3</sup> May exhibit odd behavior or crash.

## 📖 Learn More

- [[/Development Information]]
- [[/Development/Build Instructions]]
