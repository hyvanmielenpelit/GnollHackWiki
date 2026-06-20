# Repository Structure

This document outlines the organization of the GnollHack repository, including its build solutions, component projects, and directory layout.

> 📢 **Important:** The Visual Studio 2026 IDE is used for compiling all versions of GnollHack on Windows.

---

## Solutions

| Solution | Path | Description |
| :--- | :--- | :--- |
| **GnollHack.sln** | `win\win32\vs\GnollHack.sln` | Main C core solution, containing build utilities, compilers, ASCII/GUI Windows frontends, and Xamarin platform projects. |
| **GnollHackM.sln** | `win\win32\xpl\GnollHackM\GnollHackM.sln` | Modern .NET MAUI solution targeting Android, iOS, and Windows (WinUI 3). |

---

## GnollHack.sln Projects

| Project | Target / Platform | Description |
| :--- | :--- | :--- |
| **dgncomp** | Windows | Dungeon compiler for compiling custom dungeon layouts on Windows. |
| **dgncompdroid** | Android / iOS | Dungeon compiler for mobile platforms (compiled via Linux C compiler). |
| **dlb** | Windows | Data librarian / archiver. Packages level descriptions and game data into the read-only `nhdat` archive. |
| **dlbdroid** | Android / iOS | Data librarian for mobile platforms (compiled via Linux C compiler). |
| **GnollHack** | Windows (Console) | The classic ASCII version of GnollHack running as a Win32 console application. |
| **gnollhackdroid** | Android C Library | The C game engine core compiled into a native Android library (`.so`). |
| **gnollhackios** | iOS C Library | The C game engine core compiled into a native iOS static library (`.a`). |
| **gnollhackwin** | Windows C Library | The C game engine core compiled into a dynamic library (`.dll`) for the .NET MAUI Windows port. |
| **GnollHackW** | Windows (GUI) | Graphical Win32 version of GnollHack using native `ComCtl32` controls. |
| **GnollHackX** | Shared C# | Legacy Xamarin.Forms common library containing shared frontend logic. |
| **GnollHackX.Android** | Android (Xamarin) | Main project for the legacy Xamarin.Android frontend. |
| **GnollHackX.Android.Bindings** | Android (Xamarin) | C# bindings project wrapping FMOD native audio library for Android. |
| **GnollHackX.iOS** | iOS (Xamarin) | Main project for the legacy Xamarin.iOS frontend. |
| **levcomp** | Windows | Special level description compiler. |
| **levcompdroid** | Android / iOS | Special level description compiler for mobile platforms (compiled via Linux C compiler). |
| **makedefs** | Windows | Miscellaneous build-time code generator and database builder. |
| **makedefsdroid** | Android / iOS | Miscellaneous build-time generator for mobile platforms (compiled via Linux C compiler). |
| **nh340key** / **nhdefkey** / **nhraykey** | Windows | Keyboard input handlers for curses interface. |
| **PDCurses** | Windows Console | Public domain curses library used for console rendering on Windows. |
| **recover** | Windows | Game crash recovery utility. |
| **SourceFileTimeStamper** | C# Console | Utility tool for updating source file timestamps. |

---

## GnollHackM.sln (.NET MAUI) Projects

| Project | Target / Platform | Description |
| :--- | :--- | :--- |
| **GnollHackM** | .NET 10.0 MAUI | Core cross-platform app project targeting Android, iOS, and Windows (WinUI 3). |
| **gnollhackwin** | Windows C Library | Native C game engine core library (`.dll`) used by the Windows WinUI 3 build. |

---

## Directory Layout

```
GnollHack/ (Root)
├── bin/                 # Compiled binaries and build output for Windows.
├── binary/              # Configuration folder (NOT the build output folder).
├── dat/                 # Game data files, dungeon compile targets (.des files).
├── DEVEL/               # Development documentation and coding style guides.
├── doc/                 # Manual pages and user guides.
├── include/             # C core engine header files (.h).
├── src/                 # C core engine source files (.c, .cpp).
├── sys/                 # Operating system-specific bootstrap files.
├── tools/               # Output directories for helper tools on Windows.
├── util/                # Source code for build utilities (makedefs, levcomp, etc.).
└── win/                 # Frontend and UI implementation source files.
    └── win32/           # Windows-specific files, FMOD libraries, and solutions.
        ├── bank/        # FMOD sound banks (not tracked in Git repository).
        ├── fmod/        # FMOD library wrappers and headers for Windows.
        ├── vs/          # Visual Studio 2026 files (contains GnollHack.sln).
        └── xpl/         # Cross-platform frontend implementations.
            ├── GnollHackM/      # .NET MAUI solution & project folders.
            ├── GnollHackX/      # Legacy Xamarin solution & project folders.
            ├── gnollhackdroid/  # C core wrapper project for Android.
            ├── gnollhackios/    # C core wrapper project for iOS.
            ├── gnollhackwin/    # C core wrapper project for WinUI 3.
            └── libshare/        # C native bridge code connecting C engine and C# frontend.
```

> 🛑 **Caution:** The `binary/` directory is **not** the build output directory. Build outputs are generated under the `bin/$(Configuration)/$(Platform)/` folder.
