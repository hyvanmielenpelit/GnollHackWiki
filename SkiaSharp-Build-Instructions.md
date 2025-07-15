## 1. Prerequisites
### 1.1 Visual Studio
You should have Visual Studio 2022 installed for GnollHack mobile version development.

- [[Visual Studio Installation for Mobile Version Development]]

In addition to the workloads installed in the above instructions, you need to install the following workload:

- ASP.NET and web development

### 1.2 PowerShell

Note that in the instructions below, when it says to open "PowerShell", you can either use Visual Studio's **Developer PowerShell** (View → Terminal) or you can start **Windows PowerShell** using the Windows Start button.

## 2. Clone Repository
### Using Visual Studio 2022

1. Open Visual Studio 2022.
2. Use **Clone Repository** to clone `https://github.com/mono/SkiaSharp.git`. You can clone the repository to `C:\repos\mono\SkiaSharp`.
3. Open **Developer PowerShell** (View → Terminal).
4. You should be automatically in `C:\repos\mono\SkiaSharp` (repository root directory).
5. Run `git submodule update --init --recursive`.

### Using GitHub Desktop

1. Download and install **GitHub Desktop** app from https://desktop.github.com/.
2. Start the app.
3. Use **Clone a repository from the Internet...** to clone `https://github.com/mono/SkiaSharp.git` to `C:\repos\mono\SkiaSharp`.

This will also download git submodules.

## 3. Install Tools
### 3.1 Install dotnet cake

1. Open PowerShell.
2. Run `dotnet tool install -g cake.tool`

### 3.2 Install Python 3

1. Open PowerShell.
2. Type `python3`.
3. Install **python3** from Microsoft Store. (Do not download it from the Internet.)

### 3.3. Install Tizen

1. Open Visual Studio.
2. Open **Extensions → Manage Extensions**.
3. Install **Visual Studio Tools for Tizen**.
4. Go to **Tools → Tizen → Tizen Package Manager**.
5. Install **Tizen Package Manager**.
6. Open **Tizen Package Manager**.
7. Install the **7.0 Mobile** package.

### 3.4 Install 7-zip and LLVM

1. Open PowerShell with Administrator rights. _(You can do this at least when you start PowerShell using the Windows Start button.)_
2. Go to the SkiaSharp repository root directory.
3. Run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` to grant rights to run the script. Answer Y if asked.
4. Run `.\scripts\install-7zip.ps1`.
5. [[Add New Path to PATH environment variable|Add New Path to PATH Environment Variable on Windows]]:
    - `C:\Program Files\7-Zip`
6. Run `.\scripts\install-llvm.ps1`.
7. [[Add New Environment Variable|How to Add Environment Variable on Windows]]:
    - **Variable Name:** `LLVM_HOME`
    - **Variable Value:** `C:\Program Files\LLVM`

### 3.5 Set ANDROID_NDK_HOME Environment Variable

1. [[Add New Environment Variable|How to Add Environment Variable on Windows]]:
    - **Variable Name:** `ANDROID_NDK_HOME`
    - **Variable Value:** `C:\Microsoft\AndroidNDK\android-ndk-r23c` _(If you have a different version or a different location for Android NDK, please use that instead.)_

## 4. Build Native Assets

### 4.1 Android

1. Open PowerShell.
2. Go to the `native\android` folder in the SkiaSharp repository.
3. Run `dotnet cake`.
4. This will build the native android assets — **libSkiaSharp.so** and **libHarfBuzz.so** — to the `output\native\android\{abi}\` folders.

## 5. Build Managed Code (C#)

1. Open PowerShell.
2. Go to the `source` folder in the SkiaSharp repository.
3. Run `dotnet build`.
4. This will build SkiaSharp C# DLLs to various `bin` folders.
