> 👉 **How GnollHack is built inside, and why: the architecture of the modern clients, and the pages that explain each part's design and the decisions behind it.**

## 🏗️ Architecture

Every modern client is the same .NET MAUI app on top of the same game engine. From the bottom up:

| Layer | What It Is | Where in the GnollHack Repository |
|:------|:-----------|:----------------------------------|
| **Game engine** | The C core, forked from NetHack 3.6.2 | `src\` and `include\`, built per platform as `gnollhackwin.dll`, `libgnollhackdroid.so`, `libgnollhackios.a`, `libgnollhacklinux.so` and `libgnollhackmac.dylib` |
| **Native bridge** | The C functions that the C# code calls | `win\win32\xpl\libshare\` |
| **Shared game pages and logic** | The C# and XAML that every modern client shares | `win\win32\xpl\GnollHackX\GnollHackX\` |
| **App** | The .NET MAUI app, `GnollHackM` | `win\win32\xpl\GnollHackM\` |
| **UI backend** | WinUI 3, Android, iOS, or Avalonia.Controls.Maui for Linux and macOS | `Platforms\Windows\`, `Platforms\Android\`, `Platforms\iOS\` and `Platforms\Avalonia\` in `GnollHackM` |
| **Drawing and sound** | SkiaSharp and FMOD | |

The native solution `GnollHack.sln` and the app solution `GnollHackM.sln` are built one after the other, and the shared XAML files are edited in `GnollHackX` and converted for `GnollHackM` by the native build. Both follow from the time when the Xamarin.Forms and .NET MAUI clients shared their code; [[/Development/Overview of Building GnollHack with .NET MAUI]] and [[/Development/Instructions for Developing GnollHackM Project (.NET MAUI)]] explain what that means for a developer today.

## 🧱 Code Base

- [[/Development/Repository Structure]] — The solutions, their projects and the directory layout
- [[/Development/Related Repositories]] — The tile set, sound set, tile set compiler, server and wiki repositories
- [[/Development/Native Libraries]] — The native libraries that the clients use

## 🖥️ Avalonia Port

The Avalonia port runs the modern client on Avalonia UI, which brings it to Linux, the Steam Deck and macOS.

- [[/Development/Avalonia Port]] — What the port is, its three flavors, and how it is built
- [[/Development/Design Details of Avalonia Port]] — The design shared by all flavors of the Avalonia port, its decisions and its shared files
- [[/Development/Design Details of Linux Avalonia Port]] — The Linux version's own design, including CEF, crash handling and the packages
- [[/Development/Design Details of macOS Avalonia Port]] — The macOS version's own design, including Metal, WKWebView and the app bundle
- [[/Development/Design Details of Windows Avalonia Port]] — The Windows flavor, for development and testing, and an alternative Windows version

## 🖥️ WinUI 3 Version

- [[CPU and GPU Usage Modes in Modern Windows Port|/Development/CPU and GPU Usage Modes in Modern Windows Port (.NET MAUI ∕ WinUI 3)]] — How the Windows version draws with and without GPU acceleration
- [[System Requirements for Modern Windows Port|/Development/System Requirements for Modern Windows Port (.NET MAUI ∕ WinUI 3)]]

## 🧩 Cross-Platform Systems

- [[/Development/Design Details of Native Crash Reporting]] — How native crashes are reported to Sentry on every client, how the parts fit together, and why
- [[/Development/Gamepad Support]] — How game controller support works, and what it covers and does not cover
- [[/Technical Systems]] — How save recovery, save transfer and the other technical systems work, explained for players

## 📜 History

- [[/Development/Mobile Version Development History (Xamarin.Forms)]] — The history of the early mobile versions of GnollHack
- [[/Development Timeline]] — The important events in GnollHack's development
- [[/How Modern Windows Version Differs from Legacy Windows Version]]

## 🐺 Gnoll Overseer

- [[/Guides/Technological Overview of Gnoll Overseer]] — The technology stack of the Gnoll Overseer, the game's AI-powered advisor

## 📖 Learn More

- [[/Development Information]]
- [[/Development/Build Instructions]]

## 🔗 External Links

- [GnollHack workaround register](https://github.com/hyvanmielenpelit/GnollHack/tree/master/DEVEL/workarounds)
