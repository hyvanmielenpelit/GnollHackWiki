---
name: build_system_overview
description: Overview of the multi-layered GnollHack build pipeline (C core, C# wrappers, .NET MAUI targets) and asset copy automation.
---

> 👉 **This skill provides an overview of the GnollHack build system architecture, showing the interaction between the C core game engine, native libraries, C# wrappers, and .NET MAUI projects.**

## 🏗️ Architecture Layers

The GnollHack build system is structured into several layers:
- **C Core Engine:** The original NetHack game engine, modified and extended for GnollHack. It builds native libraries (`gnollhackwin.dll` for Windows, `libgnollhackdroid.so` for Android, `libgnollhackios.a` for iOS).
- **C# Wrapper (GnollHackX / GnollHackX.Common):** The bridge that interfaces with the native C libraries via P/Invoke (defined in `GnollHackX.Common`), and the shared C# project containing UI/logic. This layer also contains legacy Xamarin.Forms UI elements.
- **.NET MAUI Client (GnollHackM):** The modern presentation layer targeting Android, iOS, and Windows. It consumes the C# wrapper and native libraries to present the game.

## 🛠️ Build Process Overview

1. **Native Compilation (`GnollHack.sln`):** 
   - You must first build the native solution located in `win\win32\vs\GnollHack.sln`.
   - Building this solution compiles the C core into native libraries.
   - MSBuild tasks in this solution (e.g., `dirs.props`, `aftergnollhackdll.proj`, `afterdroidutils.proj`, `copytilesetdroid.proj`) automatically copy the generated libraries, `nhdat` (the compiled game data), tilesets, and configuration files (`defaults.gnh`, `sysconf`, etc.) into the respective platform directories of the `GnollHackM` project.
   - For Android and iOS native libraries, this involves WSL and Mac cross-compilation respectively, managed through MSBuild.

2. **MAUI Compilation (`GnollHackM.sln`):**
   - After the native assets are copied, you build the modern client solution located in `win\win32\xpl\GnollHackM\GnollHackM.sln`.
   - This compiles the .NET MAUI application, bundling the native libraries and assets prepared in the previous step.

## ⚠️ Important Constraints

- **Do Not Edit XAML in GnollHackM:** XAML files are automatically copied from the legacy `GnollHackX` project to `GnollHackM` by MSBuild tasks in `win\win32\vs\makedefsdroid.vcxproj` during the build process, and shared C# logic is file-linked. Always make UI changes in `GnollHackX` to prevent edits from being overwritten.
- **Solution Configurations:** Ensure you match the configurations (Debug/Release) between the native `GnollHack.sln` and the MAUI `GnollHackM.sln`. If you change one, you must rebuild the other to match.
