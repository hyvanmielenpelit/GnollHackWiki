---
name: compile_custom_skiasharp
description: Step-by-step instructions for building a custom version of Mono SkiaSharp library.
---

> 👉 **This skill outlines the specialized procedure for building custom SkiaSharp native assets and managed libraries, which GnollHack uses for its cross-platform rendering engine.**

## 🛠️ Prerequisites

1. **Visual Studio:** Install Visual Studio with mobile development workloads and the **ASP.NET and web development** workload.
2. **Tizen Extensions:**
   - Install **Visual Studio Tools for Tizen** via Extensions.
   - Install the **Tizen Package Manager** and then the **7.0 Mobile** package.
3. **Repository:** Clone `https://github.com/mono/SkiaSharp.git` to `C:\repos\mono\SkiaSharp`.
   - Run `git submodule update --init --recursive` to fetch dependencies.
4. **Tools:**
   - Install .NET Cake: `dotnet tool install -g cake.tool`
   - Install Python 3 via the Microsoft Store.
   - Install 7-zip and LLVM using the provided PowerShell scripts in `SkiaSharp\scripts\`.
   - Add 7-Zip and LLVM to your `PATH` environment variable.
5. **Environment Variables:**
   - Set `LLVM_HOME` to your LLVM installation path.
   - Set `ANDROID_NDK_HOME` to your Android NDK path (e.g., `C:\Microsoft\AndroidNDK\android-ndk-r23c`).

## ⚙️ Building Native Assets

### Android

1. Open PowerShell and navigate to `native\android` within the SkiaSharp repository.
2. Run `dotnet cake`.
3. This process invokes the NDK tools to build `libSkiaSharp.so` and `libHarfBuzz.so` for the supported Android ABIs. The output is placed in `output\native\android\{abi}\`.

## 📦 Building Managed Code (C#)

1. Open PowerShell and navigate to the `source` directory within the SkiaSharp repository.
2. Run `dotnet build`.
3. This step compiles the managed C# DLLs which wrap the native SkiaSharp implementations. The resulting libraries will be located in the respective `bin` directories and can be integrated into GnollHack.
