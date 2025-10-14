![Development information](/uploads/Development%20Information/development-information.webp)

## Overview

GnollHack can be built for several platforms using either a Linux or Windows development machine.

* [[Repository Structure]]
* [[Overview of Building GnollHack with .NET MAUI]] — Please read this first before building anything with .NET MAUI.
* [[Troubleshooting Building GnollHack with .NET MAUI]]
* [[Instructions for Developing GnollHackM Project (.NET MAUI)]]
* [[Updating Tileset for GnollHackM (.NET MAUI)]]
* [[Known Working Build Setups]]

## Supported Platforms

| Platform | Technology | CPU Architectures | Solution | Projects | Emulator Support<sup>1</sup> |  Status |
|:---------|:-----------|:------------------|:---------|:---------|:-----------------------------|:--------|
| Android | Xamarin.Forms | Arm64 | GnollHack | GnollHackX, GnollHackX.Android | Yes, but may have odd behavior or crash | Legacy |
| **Android** | **.NET MAUI** | **Arm64, x64<sup>2</sup>** | **GnollHackM** | **GnollHackM** | **Yes, but may have odd behavior or crash** | **Current** | 
| iOS | Xamarin.Forms | Arm64 | GnollHack | GnollHackX, GnollHackX.iOS | Yes, but may have odd behavior or crash | Legacy |
| **iOS** | **.NET MAUI** | **Arm64** | **GnollHackM** | **GnollHackM** | **Yes, but may have odd behavior or crash** | **Current** |
| Windows | ASCII | x64 | GnollHack | GnollHack | Yes | Legacy | 
| Windows | ComCtl32 Controls | x64 | GnollHack | GnollHackW | Yes | Legacy | 
| **Windows** | **.NET MAUI** | **x64, (Arm64<sup>3</sup>)** | **GnollHackM** | **GnollHackM** | **No<sup>4</sup>** | **Current** |
| **Linux** | **ASCII** | **x64** | **N/A<sup>5</sup>** | **N/A<sup>5</sup>** | **N/A** | **Current** |

- <sup>1</sup> Emulator support refers to the fact that if the port is supported by popular cross-operating-system emulators.
- <sup>2</sup> Android x64 binaries are used by Android emulators running on a Windows machine with an x64 CPU, such as Google Games for PC emulator.
- <sup>3</sup> .NET MAUI supports Arm64 on Windows but we have not built Arm64 binaries, because we do not have a Windows test device with an Arm64 CPU.
- <sup>4</sup> GnollHack's modern Windows port (.NET MAUI) doesn't run on Wine or Proton, because they don't have support for running WinUI 3 apps.
- <sup>5</sup> The Linux version is built on Linux as described in [[Build Instructions for ASCII Version on Linux]].

### Other Platforms

- Support for **macOS** using **.NET MAUI / Mac Catalyst** is coming in the future, but it may take a while.
- We don't plan to port our modern GUI to **Linux**, because .NET MAUI doesn't support Linux.
- We don't plan to support _gaming consoles_ or _controllers_, such as Steam Deck.

## Easy Build Repository

* [GnollHackMAUIEasyBuild Repository](https://github.com/hyvanmielenpelit/GnollHackMAUIEasyBuild) — Build GnollHack's modern ports (.NET MAUI) with ease

## Windows Development Machine

### Windows Build Target

#### Legacy Windows Ports *(from 1990s)*

* [[Build Instructions for ASCII Version on Windows]] — Win32 Console Application
* [[Build Instructions for Windows GUI Version on Windows]] — Win32 Application with ComCtl32 Controls

#### Modern Windows Port: .NET MAUI with WinUI 3 *(from 2020s)*

* [[Build Instructions for WinUI3 Version on Windows (.NET MAUI)]]
* [[Data File Locations (WinUI 3 Version – .NET MAUI)]] 
* [[Steam Version Publishing Checklist]]

### Android and iOS Build Targets

#### Xamarin.Forms (Legacy Mobile Ports)

* [[Build Instructions for Android Version on Windows]]
* [[Android Version Building Checklist]]
* [[Build Instructions for iOS Version on Windows]]

#### .NET MAUI (Current Mobile Ports)

As of March 26, 2025, .NET MAUI mobile ports are fully functional but not yet deployed to the stores.

* [[Build Instructions for Android Version on Windows (.NET MAUI)]]
* [[Build Instructions for iOS Version on Windows (.NET MAUI)]]

## Linux Development Machine

### Linux Build Target

* [[Build Instructions for ASCII Version on Linux]]

## Miscellaneous Info

### General

* [[Debugging Linux Version in WSL using Visual Studio Code]]
* [[Release Checklist]]
* [[SkiaSharp Build Instructions]]
* [[Installing MSIX Packages on Windows 10 and 11]]
* [[Native Libraries]]

### .NET MAUI

#### Windows / WinUI 3

* [[System Requirements for Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
* [[CPU and GPU Usage Modes in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]

## Articles

* [[Mobile Version Development]] — The technologies and the history of the mobile version of GnollHack.
* [[Benefits of .NET MAUI over Xamarin.Forms]] – How is .NET MAUI better than Xamarin.Forms