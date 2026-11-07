> 👉 **How to set up a Windows computer for GnollHack development and build every modern client, its native libraries and its assets.**

## 🏁 Start Here

The modern clients are one .NET MAUI app, `GnollHackM`, built in two steps: first the native solution `win\win32\vs\GnollHack.sln`, which compiles the game engine, makes the game data and converts the shared XAML files, and then `GnollHackM` itself. Every client is built on a Windows computer.

> 📢 **Important:** If you are new to the codebase, read [[/Development/Overview of Building GnollHack with .NET MAUI]] first. It explains how the native C library, the C# app and the build-time tools fit together. Skipping it is the most common reason a build fails.

- [[/Development/Overview of Building GnollHack with .NET MAUI]] — The two-step build, its solution platforms and its command-line alternatives
- [[/Development/Instructions for Developing GnollHackM Project (.NET MAUI)]] — Why XAML is edited in `GnollHackX`, and which C# rules the shared code follows
- [[/Development/Known Working Build Setups]] — The Visual Studio, SDK and Xcode versions known to build the game

> 💡 **Tip:** Before setting up your computer, check [[/Development/Known Working Build Setups]] to make sure your operating system and SDK versions match a verified configuration.

## 📋 Setting Up a Computer

Do these once on a new computer, in this order:

1. [[/Development/Install Visual Studio 2026 for .NET MAUI Development]]
2. [[/Development/Clone Repository in Visual Studio]]
3. [[/Development/Install Windows Subsystem for Linux]] — For the Android, iOS, Linux and macOS clients, whose game data is made in WSL
4. [[/Development/Configure Visual Studio for Mobile Version Development]] — Visual Studio's connection to WSL, for the native solution's Linux projects
5. [[/Development/Set Up SSH Access to the Mac for Native Libraries]] — For the iOS and macOS clients, whose game engine is compiled on a Mac
6. [[/Development/Install Tile Sets and FMOD Sound Banks]]
7. [[/Development/Install Secrets File]]

Smaller how-tos that the instructions refer to:

- [[/Development/Open GnollHack Solution in Visual Studio]]
- [[/Development/Open GnollHackM Solution in Visual Studio]]
- [[/Development/Rebuild Solution]]
- [[/Development/How to Add Environment Variable on Windows]]
- [[/Development/Add New Path to PATH Environment Variable on Windows]]
- [[/Development/Enroll for Apple Development Program (Mac)]] — Needed for releasing the iOS and macOS clients

## 🛠️ Building the Modern Clients

| Client | User Interface | Also Needs | Released As | Instructions |
|:-------|:---------------|:-----------|:------------|:-------------|
| **Windows (WinUI 3)** | .NET MAUI on WinUI 3 | WSL only to convert edited XAML files | Steam and an MSIX package | [[/Development/Build Instructions for WinUI3 Version on Windows (.NET MAUI)]] |
| **Android** | .NET MAUI | WSL; an Android device | Google Play | [[/Development/Build Instructions for Android Version on Windows (.NET MAUI)]] |
| **iOS** | .NET MAUI | WSL; a Mac over SSH; an iPhone or iPad | App Store | [[/Development/Build Instructions for iOS Version on Windows (.NET MAUI)]] |
| **Linux** | .NET MAUI on Avalonia | WSL; the Avalonia port's .NET SDK | Steam and an AppImage | [[/Development/Build Instructions for Avalonia Linux Version on Windows]] |
| **macOS** | .NET MAUI on Avalonia | WSL; a Mac with Apple Silicon over SSH; the Avalonia port's .NET SDK | Steam, signed and notarized | [[/Development/Build Instructions for Avalonia macOS Version on Windows]] |
| **Windows (Avalonia)** | .NET MAUI on Avalonia | The Avalonia port's .NET SDK | Not released; a folder for testers | [[/Development/Build Instructions for Avalonia Windows Version on Windows]] |

The Avalonia clients use a newer .NET SDK than the others, pinned in `win\win32\xpl\GnollHackM\Platforms\Avalonia\global.json`; see [[/Development/Avalonia Port]].

> ⚠️ **Warning (Common Pitfall):** Make sure that the .NET MAUI workload is fully installed in Visual Studio. A missing platform workload (Android or iOS) causes project loading errors.

## 🧩 Native Libraries and Assets

These are built apart from the clients, and the clients use the results:

- [[/Development/Building iOS and macOS Native Libraries over SSH]] — How the iOS and macOS game engines are compiled on a Mac over SSH, and how to fix that build
- [[/Development/Build Instructions for Native Crash Reporting]] — Rebuilding the three native crash reporting libraries, the build-time check, and updating Sentry
- [[/Development/SkiaSharp Build Instructions]] — Custom SkiaSharp builds, mainly for reference
- [[/Development/Updating Tileset for GnollHackM (.NET MAUI)]] — Making a new tile set for the modern clients
- [[/Development/Verify Mobile Sound Banks]] — Matching the mobile sound banks with the checksums the apps verify

## 🔧 Troubleshooting

- [[/Development/Troubleshooting Building GnollHack with .NET MAUI]] — Locked files, slow builds and command-line builds
- [[/Development/Troubleshooting Android Build Errors and Runtime Errors]] — Errors caused by a long repository path

Each Avalonia build page also has a Troubleshooting section of its own.

## ✅ Releasing

- [[/Development/Release Checklist]]

## 📖 Learn More

- [[/Development Information]]
- [[/Development/Design Details]]
- [[/Development/Testing and Debugging]]
