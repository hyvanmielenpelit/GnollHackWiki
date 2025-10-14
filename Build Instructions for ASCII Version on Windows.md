## Preparation

1. Install Visual Studio — [[Visual Studio Installation for ASCII and Windows GUI Version Development]].
2. Clone Repository — [[Clone Repository in Visual Studio]].
3. **NEW** — If you are using an old version of the repository, you may need to [[delete old directories]], because we have changed some paths.

## Build

1. [[Open GnollHack Solution in Visual Studio]].
2. In Solution Explorer, right-click on GnollHack solution and select Properties at the end of the pop-up menu. This opens a window entitled "Solution 'GnollHack' Property Pages". In the list box on the left, select Configuration Properties > Configuration. A table of projects in the solution should appear. In Build column, untick **GnollHackW** from being built, unless you have the requisite tilemap and FMOD sound banks.
3. If you need tiles to be on, for example, for generating the tileset definition file, then also do the following: In Solution Explorer, right-click on GnollHack project and select Properties at the end of the pop-up menu. This opens a window entitled "GnollHack Property Pages". In the list box on the left, select Configuration Properties > C/C++ > Preprocessor > Preprocessor Definitions. There should be a semicolon-separated list of various definitions, starting with NO_TILES. Delete the NO_TILES and the ensuing semicolon, and keep the rest.
4. Select **x64** as your solution platform.
5. Select **Debug** as your solution configuration. You can also use **Release**, when you plan to build a release build.
6. Build GnollHack using **Rebuild Solution**.
7. You should now be able to find **GnollHack.exe** at `bin\Debug\x64`. Double-click on it to play.

## Debugging

After building the solution according to the above instructions (using the **Debug** solution configuration):

1. Set **GnollHack** as **startup project**.
2. Hit the green **Start button** to debug the program.

## Troubleshooting

If the game reports `clang_rt.asan_dynamic-x86_64.dll was not found` when starting in the Debug mode, you need to add `C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.44.35207\bin\Hostx64\x64` to **PATH** in your **system environmental variables**:

- Please see [[Add New Path to PATH Environment Variable on Windows]] for how to do it.
- Please also check that the path exists on the disk and that the MSVC version number is the same on your system.
