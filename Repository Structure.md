# Platform Support on Windows using Visual Studio

GnollHack is compiled on Windows using Visual Studio. The Visual Studio solution is used to compile the following versions of GnollHack:

- Windows/ASCII *(Windows console)*
- Windows/GUI *(ComCtl32)*
- Android/Xamarin.Forms
- iOS/Xamarin.Forms
- Android/.NET MAUI
- iOS/.NET MAUI
- Windows/.NET MAUI

# Solutions

## GnollHack Solution

The Visual Studio 2022 solution `GnollHack.sln` is found under `win\win32\vs`.

### Projects

The solution contains the following projects:

#### dgncomp

- Dungeon compiler for Windows

#### dgncompdroid

- Dungeon compiler for Android and iOS
- Linux C project

#### dlb
- GnollHack data librarian
- File archiving tool in the spirit of tar. It is used to maintain the archive files from which GnollHack reads special level files and other read-only information.
- For Windows

#### dlbdroid

- dlb for Android and iOS
- Linux C project

#### GnollHack

- ASCII version of GnollHack on Windows
- Win32 console application

#### gnollhackdroid

- GnollHack C library for Android
- Compiles into a .so file

#### gnollhackios

- GnollHack C library for iOS
- Compiles into a .a file

#### gnollhackwin

- GnollHack C library for .NET MAUI Windows (WinUI 3)
- Compiles into a .dll file

#### GnollHackW

- Graphical version of GnollHack on Windows
- Win32 project using ComCtl32 controls
- See https://learn.microsoft.com/en-us/windows/win32/controls/window-controls

#### GnollHackX

- Xamarin.Forms common project (for Android and iOS)

#### GnollHackX.Android

- Xamarin.Forms / Xamarin.Android project (main project for Android)

#### GnollHackX.Android.Bindings

- Xamarin.Forms / Xamarin.Android Bindings project (for FMOD on Android)

#### GnollHackX.iOS

- Xamarin.Forms / Xamarin.iOS project (main project for iOS)

#### levcomp

- Special level compiler for Windows

#### levcompdroid

- Special level compiler for Android and iOS
- Linux C project

#### makedefs

- GnollHack miscellaneous build-time functions
- For Windows

#### makedefsdroid

- GnollHack miscellaneous build-time functions
- For Android and iOS
- Linux C project

#### nh340key

- Keyboard input handler

#### nhdefkey

- Keyboard input handler

#### nhraykey

- Keyboard input handler

#### PDCurses

- PDCurses is a public domain curses library for DOS, OS/2, Windows console, X11, and SDL, implementing most of the functions available in X/Open and System V R4 curses.
- See https://pdcurses.org/

#### recover

- Crash recovery utility

#### SourceFileTimeStamper

- C# project for time stamping source files
- C# console application

## GnollHackM — .NET MAUI Solution

The Visual Studio 2022 Preview solution `GnollHackM.sln` is found under `win\win32\vs\xpl\GnollHackM`.

### Projects

#### GnollHackM

- .NET MAUI project for all platforms (Android, iOS, macOS, Windows)

#### gnollhackwin

- GnollHack C library project for .NET MAUI Windows (WinUI 3)
- The same project as the one that is part of GnollHack Solution (GnollHack.sln)

# Folders

Root
- bin — Output files for GnollHack Windows
- binary
- dat — Data files
- DEVEL
- doc — Manuals
- include — .h files
- src — Source .c and .cpp files
- sys — Operating system specific files
- tools — Output files for tools on Windows
- util — Source files for utilities
- win — Source files for windowing systems
   - win32 — Source files for Windows
       - bank — FMOD sound banks *(not included in the repository)*
       - dll — GnollHack C library for Windows *(unused)*
       - fmod — FMOD libraries and wrapper files for Windows
       - vs — Visual Studio related files
       - xpl — Source files for Android and iOS ports
           - GnollHackX — Xamarin.Forms solution folder
               - GnollHackX — Xamarin.Forms common project
               - GnollHackX.Android — Xamarin.Android project
               - GnollHackX.Android.Bindings — Xamarin.Android bindings project for FMOD Android
               - GnollHackX.Android.GooglePlay — Tools and files needed for publishing GnollHack to Google Play
               - GnollHackX.Common — Common source files shared by for GnollHackX.Android and GnollHack.iOS
               - GnollHackX.FMOD — FMOD libraries, wrapper files, and common source files for Android and iOS
               - GnollHackX.iOS — Xamarin.iOS project
           - gnollhackdroid — GnollHack C library for Android
           - gnollhackios – GnollHack C library for iOS
           - libshare — GnollHack C library files shared by gnollhackdroid and gnollhackios
           - SourceFileTimeStamper — Console C# project, [see above](#sourcefiletimestamper).
           - GnollHackM — .NET MAUI solution and project folder
               - GnollHackM.sln — .NET MAUI solution
               - GnollHackM.csproj — .NET MAUI project for all platforms
           - gnollhackwin — GnollHack C library for .NET MAUI Windows (WinUI 3)
