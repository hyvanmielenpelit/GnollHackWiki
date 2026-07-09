---
name: build_ios_client
description: Instructions for pairing with a Mac host, configuring provisioning profiles, and building the .NET MAUI iOS app on Windows.
---

> 👉 **This skill outlines the process of building the GnollHack iOS client from Windows, utilizing a paired Mac for native compilation and deployment.**

## 🍎 Prerequisites and Mac Setup

### 1. Mac Build Host

- A Mac computer running macOS with Xcode installed.
- The Mac must be accessible over the network from your Windows machine.
- Apple Developer account credentials added to Xcode.

### 2. Windows Setup

- Visual Studio with .NET MAUI workloads.
- Pair to Mac: In Visual Studio, use the **Pair to Mac** button in the toolbar to connect to your Mac build host.

### 3. Provisioning Profiles

- Create an Apple Developer account.
- Generate development and distribution provisioning profiles for the App ID `com.soundmindgames.GnollHackM` on the Apple Developer portal.
- In Visual Studio, navigate to **Tools -> Options -> Xamarin -> Apple Accounts**, add your account, and download all profiles.
- Configure `GnollHackM.csproj` to use your provisioning profiles for Debug and Release configurations.

## 📱 Building the Native iOS Library

1. Open the native solution `win\win32\vs\GnollHack.sln` in Visual Studio.
2. Ensure you are paired to the Mac.
3. Rebuild the solution.
   - Visual Studio delegates the compilation of the C core to the paired Mac, producing the static library `libgnollhackios.a`.
   - MSBuild targets (`aftergnollhackios.proj`) automatically copy `libgnollhackios.a` from the Mac output (`C:\mac-out\`) to the appropriate native references directory in `win\win32\xpl\GnollHackM\Platforms\iOS\libs\`.
   - Other necessary assets (`nhdat`, tilesets) are also copied over via MSBuild tasks.

## 🚀 Building the MAUI iOS Client

1. Open the MAUI solution `win\win32\xpl\GnollHackM\GnollHackM.sln`.
2. Connect your iOS device to the Mac via USB.
3. In Visual Studio (Windows), select your iOS device from the iOS Remote Devices dropdown.
4. Select the desired configuration (**Debug** or **Release**).
5. Rebuild the `GnollHackM.sln` solution.
6. Start debugging. The application will be deployed to the device connected to the Mac.

## 🔧 Troubleshooting

- If builds fail or hang, try cleaning the solution, or deleting the `obj` and `bin` directories in `GnollHackM`.
- On the Mac host, clearing the `~/Library/Caches/mtbs` or `~/Library/Caches/XMA` directories can resolve stale build states.
