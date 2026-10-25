## Download Visual Studio 2026 Community

- [Download Visual Studio 2026 Installer](https://visualstudio.microsoft.com/vs/community/)
- Use **Visual Studio Installer** to install Visual Studio Community 2026
- These installation instructions pertain to Visual Studio Community 2026 18.7.1 and later

## Visual Studio 2022 and the Legacy Projects

`GnollHack.sln` still contains the legacy Xamarin projects `GnollHackX.Android`, `GnollHackX.Android.Bindings` and `GnollHackX.iOS`. Visual Studio 2026 has no Xamarin, so it cannot build them. To build them, open the solution in Visual Studio 2022, which still has Xamarin. In Visual Studio 2026, unload them instead: right-click each one in Solution Explorer and choose **Unload Project**.

The modern .NET MAUI clients and the Avalonia port need none of them. The **MauiAndroid**, **MauiAll**, **Linux** and **x64** solution platforms do not build them, so they work in Visual Studio 2026 as is, also from the command line. **Android+Windows**, **ARM64** and **iPhone** do build them.

## Workloads

Install the following workloads:

1. Desktop development with C++
2. .NET Multi-platform App UI Development
3. .NET desktop development
4. Universal Windows Platform development
5. Mobile development with C++ *(required for building native Android C++ library gnollhackdroid.vcxproj)*
6. Linux and embedded development with C++

## Individual components

Install the following individual components:

1. Windows 10 SDK 10.0.19041.0
2. Windows 11 SDK 10.0.22621
3. C++ iOS development tools *(under Development activities)*
4. MSVC v143 - VS 2022 C++ x64/x86 build tools
