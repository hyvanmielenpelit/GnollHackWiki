---
name: build_android_client
description: Instructions for setting up WSL, configuring SSH/localhost connection, and compiling/debugging the .NET MAUI Android app on Windows.
---

> 👉 **This skill covers the setup and compilation of the GnollHack Android client, which requires cross-compiling the native C core using Windows Subsystem for Linux (WSL).**

## 🛠️ Environment Setup

### 1. Windows Subsystem for Linux (WSL)

- Install WSL on your Windows machine with an Ubuntu distribution.
- Ensure development tools (`build-essential`, `bison`, `flex`) are installed within WSL.
- Configure SSH to start in WSL and allow password authentication (`sudo service ssh start`).

### 2. Visual Studio Cross Platform Connection

- In Visual Studio, navigate to **Tools -> Options -> Cross Platform -> Connection Manager**.
- Add a new connection to the WSL instance:
  - **Host Name:** `localhost`
  - **Port:** `22`
  - **User/Password:** Your WSL credentials.
- Verify the connection.

### 3. Visual Studio Setup

- Ensure the .NET MAUI workloads are installed.
- Set up Android SDKs via Visual Studio.
- Verify that tile sets, FMOD sound banks, and the secrets file (`Assets\ghsecrets.sjson` — a JSON file containing API keys and configuration secrets that must be copied separately by the programmer) are present in the repository.

## 📱 Building the Native Android Library

1. Open the native solution `win\win32\vs\GnollHack.sln`.
2. Select the **Android+Windows** (or similar cross-platform) solution platform.
3. Rebuild the solution. 
   - Visual Studio uses the SSH connection to WSL to compile the C core into `libgnollhackdroid.so`.
   - MSBuild targets (`afterdroidutils.proj`, `aftergnollhackdroid.proj`) will automatically copy the generated `.so` library, `nhdat`, and other assets from the WSL output (`C:\wsl-out\`) to the appropriate subdirectories in `win\win32\xpl\GnollHackM\Platforms\Android\` (specifically under `libs\` and `gnh\`).

## 🚀 Building the MAUI Android Client

1. Open the MAUI solution `win\win32\xpl\GnollHackM\GnollHackM.sln`.
2. Select the configuration (**Debug** or **Release**) that matches the native build.
3. Connect your Android device via USB and ensure USB Debugging is enabled.
4. Select your device from the deployment target dropdown.
5. Rebuild the `GnollHackM.sln` solution.
6. Start debugging.

## 🔑 Archiving and Signing (APK/AAB)

1. In Visual Studio Android options, select the package format (**APK** or **AAB**). Disable Fast deployment for release builds.
2. Rebuild the solution using the **Release** configuration.
3. Right-click the `GnollHackM` project and select **Archive**.
4. Use the Archive Manager to distribute ad-hoc, creating a signing identity and keystore.
5. Use `jarsigner` from the Java Development Kit (JDK) to sign the generated APK/AAB package.
