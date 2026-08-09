## Overview

You build the .NET MAUI version of GnollHack with a two-step process. This is because we are keeping the Xamarin.Forms version of GnollHack for compatibility reasons and we are sharing code between both architectures. This allows us to maintain both Xamarin.Forms and .NET MAUI versions of GnollHack at the same time.

## 1. Build Native Libraries and Core Assets (GnollHack.sln)

Building the native solution compiles the C core game engine and prepares the translated UI files.

### Prerequisites

Check [[appropriate build instructions|Development Information]] for prerequisites.

### Building

1. Start **Visual Studio Community 2026**.
2. Open `GnollHack.sln` located in the `win\win32\vs` directory.
3. Select the **Android+Windows** configuration (or another configuration that matches your target platform).
4. Rebuild the solution. 

This builds the necessary native libraries (e.g., `gnollhackwin.dll` for Windows, `libgnollhackdroid.so` for Android, etc.) and copies them along with the core assets to the respective platform folders of the `GnollHackM` project. This also runs `makedefsdroid`, which converts the shared XAML files from `GnollHackX` to `GnollHackM` format. You must repeat this step whenever you change code in the native C core or modify XAML files in the `GnollHackX` folder.


## 2. Build GnollHackM

GnollHackM is the .NET MAUI version of GnollHack.

### Prerequisites

- Install .NET SDK 10.0 from https://dotnet.microsoft.com/en-us/download/dotnet/10.0
- Install .NET MAUI 10.0 workload using `dotnet workload install maui` in PowerShell
- [[Install Visual Studio 2026 for .NET MAUI Development]]

### Building

1. Start **Visual Studio Community 2026**.
2. Open `GnollHackM.sln` that is located in the `win\win32\xpl\GnollHackM` directory.
3. Build `GnollHackM`, which is the .NET MAUI version of GnollHack, using [[appropriate build instructions|Development Information]].

This builds the .NET MAUI version of the game. You need to repeat this step whenever you change things in XAML or the managed C# code.

## Remarks

### Changing Solution Configuration

If you change the solution configuration between **Debug** and **Release**, you need to rebuild both **GnollHack** solution and **GnollHackM** solution with the appropriate solution configuration. This is because you need appropriately built libraries for the **GnollHackM** solution from the **GnollHack** solution. So, you need to:

1. Build the **GnollHack** solution first.
2. Then, build the **GnollHackM** solution.