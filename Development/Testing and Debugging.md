> 👉 **The tools for testing and debugging GnollHack: developer mode and wizard mode in the game, debuggers, device testing, and where each version keeps its files.**

## 🕹️ In the Game

- [[/Developer Mode]] — A setting of the modern clients that shows the reset menu, the options file and the Wizard Mode switch, and allows debug logging
- [[/Wizard Mode]] — The debug mode for testing: the character cannot die, and the wizard-mode commands are available

## 🐞 Debugging

- **Avalonia port on Windows**: start the game from its output folder, and attach Visual Studio's debugger to it, as in [[Run the Game|/Development/Build Instructions for Avalonia Windows Version on Windows#2-3-run-the-game]]. This is the quickest way to debug a change to the Avalonia port.
- **Linux version in WSL**: build the packages and run the game in WSL, as in [[Run the Game in WSL|/Development/Build Instructions for Avalonia Linux Version on Windows#3-1-run-the-game-in-wsl]].

## 📱 Testing on Devices

- [[/Development/Testing Avalonia Linux Version on Steam Deck]] — The Steam Deck as a test device for the Linux version, with one-command deployment and a live log
- [[Testing on the Mac|/Development/Build Instructions for Avalonia macOS Version on Windows#3-testing-on-the-mac]] — Running a test build of the macOS version on the Mac

## 📁 Files and Installs

- [[/Development/Data File Locations (WinUI 3 Version – .NET MAUI)]] — Where the Windows version keeps its settings and saved games
- [[/Development/Installing MSIX Packages on Windows 10 and 11]] — Installing a signed MSIX package of the Windows version

The Avalonia clients' data folders are listed under [[Files and Folders|/Development/Design Details of Avalonia Port#files-and-folders]].

## 📖 Learn More

- [[/Development Information]]
- [[/Development/Build Instructions]]
