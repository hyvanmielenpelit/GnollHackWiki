![Development information](/uploads/Development%20Information/development-information.webp)

## ℹ️ Overview

GnollHack is actively developed for **Android**, **iOS**, and **Windows** using a modern **.NET MAUI** codebase. Legacy versions of the game (such as Xamarin.Forms and native Win32/ASCII clients) are deprecated and no longer active.

Here is a quick directory of key design and structure documentation:

* [[Repository Structure]]
* [[Related Repositories]]

## 🧑‍💻 Modern Client Development (.NET MAUI)

This is the primary technology stack for GnollHack development. It compiles a single C# codebase targeting mobile and desktop platforms.

> 📢 **Important:** If you are new to the codebase, **you must read this first**:
> - **[[Overview of Building GnollHack with .NET MAUI]]** — Explains how the native C library, the C# wrapper, and build-time tools interact. Skipping this is the #1 reason developers struggle to build the game.

### ⚙️ Essential Guides & Setup

These files contain complex development instructions that may require some time to digest:

* [[Instructions for Developing GnollHackM Project (.NET MAUI)]]
* [[Updating Tileset for GnollHackM (.NET MAUI)]]
* [[Known Working Build Setups]]

> 💡 **Tip:** Before setting up your machine, check the [[Known Working Build Setups]] to ensure your OS and SDK versions match a verified configuration.

### 🛠️ Modern Client Build Instructions

Detailed, step-by-step guides for compiling the modern application:

* **Windows:** [[Build Instructions for WinUI3 Version on Windows (.NET MAUI)]]
* **Android:** [[Build Instructions for Android Version on Windows (.NET MAUI)]]
* **iOS:** [[Build Instructions for iOS Version on Windows (.NET MAUI)]]

> ⚠️ **Warning (Common Pitfall):** Ensure that the .NET MAUI workload is fully installed inside Visual Studio. Missing platform workloads (Android/iOS) will cause project loading errors.

### ❓ Troubleshooting & Technical Reference

* [[Troubleshooting Building GnollHack with .NET MAUI]] — Covers Xamarin-to-MAUI SDK issues, MSBuild path conflicts, and keystore errors.
* [[Data File Locations (WinUI 3 Version – .NET MAUI)]] — Shows where settings and save files are saved.
* [[System Requirements for Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
* [[CPU and GPU Usage Modes in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]

### 📋 Publishing Checklist

* [[Steam Version Publishing Checklist]] — Covers codesigning, packaging, and Steamworks integration.

### ℹ️ Additional Information

* [[Installing MSIX Packages on Windows 10 and 11]]

## 🖥️ Modern Client Supported Platforms

The table below summarizes support for the modern client. Note that emulator performance varies, and platform support is subject to CPU architecture availability.

| Platform | Technology | CPU Arch | Solution | Projects | Emulator Support<sup>1</sup> |
|:---------|:-----------|:---------|:---------|:---------|:----------------------------:|
| Android | .NET MAUI | Arm64, x64<sup>2</sup> | GnollHackM | GnollHackM | Yes<sup>4</sup> |
| iOS | .NET MAUI | Arm64 | GnollHackM | GnollHackM | Yes<sup>4</sup> |
| Windows | .NET MAUI | x64, (Arm64<sup>3</sup>) | GnollHackM | GnollHackM | No<sup>5</sup> |

- <sup>1</sup> Emulator support refers to whether the port is supported by popular cross-operating-system emulators.
- <sup>2</sup> Android x64 binaries are used by Android emulators running on a Windows machine with an x64 CPU, such as the Google Play Games for PC emulator.
- <sup>3</sup> .NET MAUI supports Arm64 on Windows but we have not built Arm64 binaries, because we do not have a Windows test device with an Arm64 CPU.
- <sup>4</sup> May have odd behavior or crash.
- <sup>5</sup> GnollHack's modern Windows port (.NET MAUI) doesn't run on Wine or Proton, because they don't have support for running WinUI 3 apps.

### 💻 Future Platform Support

- Support for **macOS** using **.NET MAUI / Mac Catalyst** or **Avalonia UI** is planned for the future, but it may take a while.
- **Linux** support for the modern client is planned using **Avalonia UI**, pending maturity of the technology stack.
- At the moment, we do not plan to support *gaming consoles* or *controllers* (such as Steam Deck).

## 📖 Background Articles

These articles provide historical context and technical background. They are easy to digest and highly recommended for developers wanting to understand the choices behind our architecture.

* [[Mobile Version Development History (Xamarin.Forms)]] — The history of the early versions of the mobile clients of GnollHack.
* [[Benefits of .NET MAUI over Xamarin.Forms]] — Explains the single-project benefits and performance gains of modernizing the UI.

## 📋 Additional Technical Information

* [[Release Checklist]]
* [[Native Libraries]]
* [[Debugging Linux Version in WSL using Visual Studio Code]]
* [[SkiaSharp Build Instructions]] — Describes custom SkiaSharp compilations (primarily for reference).

## 🛑 Legacy Clients (Obsolete)

> 🛑 **Caution:** The following sections describe legacy versions and ports that are no longer actively supported or maintained. They are kept here for historical reference only. Do not use these targets for active feature development.

### 📱 Legacy Mobile Ports (Xamarin.Forms)

* [[Build Instructions for Android Version on Windows]]
* [[Android Version Building Checklist]]
* [[Build Instructions for iOS Version on Windows]]

### 🖥️ Legacy Windows Ports (1990s UI Style)

* [[Build Instructions for ASCII Version on Windows]] — Win32 Console Application
* [[Build Instructions for Windows GUI Version on Windows]] — Win32 Application with ComCtl32 Controls

### 💻 Legacy Linux Port

* [[Build Instructions for ASCII Version on Linux]]

### 📋 Legacy Clients Support Table

| Platform | Technology | CPU Arch | Solution | Projects | Emulator Support<sup>1</sup> |
|:---------|:-----------|:---------|:---------|:---------|:----------------------------:|
| Android | Xamarin.Forms | Arm64 | GnollHack | GnollHackX, GnollHackX.Android | Yes<sup>3</sup> |
| iOS | Xamarin.Forms | Arm64 | GnollHack | GnollHackX, GnollHackX.iOS | Yes<sup>3</sup> |
| Windows | ASCII | x64 | GnollHack | GnollHack | Yes |
| Windows | ComCtl32 Controls | x64 | GnollHack | GnollHackW | Yes |
| Linux | ASCII | x64 | N/A<sup>2</sup> | N/A<sup>2</sup> | N/A |

- <sup>1</sup> Emulator support refers to whether the port is supported by popular cross-operating-system emulators.
- <sup>2</sup> The Linux version is built on Linux as described in [[Build Instructions for ASCII Version on Linux]].
- <sup>3</sup> May have odd behavior or crash.

## AI Agents

- [[AI Skills]] — GnollHack development related skills to be used with AI agents
