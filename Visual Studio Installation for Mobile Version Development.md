## Download Visual Studio 2022 Community

- [Download Visual Studio](https://visualstudio.microsoft.com/vs/community/)
- These installation instructions pertain to Visual Studio 2022 Community 17.3.2 and later

### Last Known Working Version

If you run into problems building GnollHack, it might be that there's some problem with the Visual Studio version you are using. The last known working version ***(this info might be old)*** is **Visual Studio 2022 Community 17.6.5**. You can install it from [here](https://learn.microsoft.com/en-us/visualstudio/releases/2022/release-history). You need to download the Enterprise version installer, close the first window, and then select Visual Studio Community.

You can also install this version side-by-side with your normal Visual Studio installation in the case you need the latest version of Visual Studio for some other tasks. The instructions for side-by-side installation can be found [here](https://learn.microsoft.com/en-us/visualstudio/install/install-visual-studio-versions-side-by-side?view=vs-2022).

## Workloads

Install the following workloads:

1. Desktop development with C++
2. .NET Multi-platform App UI Development
3. .NET desktop development
4. Universal Windows Platform development
5. Mobile development with C++
6. Linux and embedded development with C++

### Optional Workload Components

Click on **Installation details → .NET Multi-platform App UI development** on the right hand side of the screen and make sure that **Optional → Xamarin** is checked.

![image](https://user-images.githubusercontent.com/16661034/184302350-8a1e552e-5aad-4a55-91bf-58d4847c46db.png)


## Individual components

Install the following individual components:

1. Windows 10 SDK 10.0.19041.0
2. Windows 11 SDK 10.0.22621
3. .NET Core 3.1 Runtime (LTS)
4. C++ iOS development tools *(under Development activities)*
