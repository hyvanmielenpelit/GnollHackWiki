## Preparation

1. Install Visual Studio — [[Visual Studio Installation for ASCII and Windows GUI Version Development]].
2. Clone Repository — [[Clone Repository in Visual Studio]].

## Build

1. [[Open GnollHack Solution in Visual Studio]].
2. [[Install Tile Sets and FMOD Sound Banks]]
3. Choose the **x64** solution platform in the menu bar.
4. Select **Debug** as your solution configuration. You can also use **Release**, when you plan to build a release build.
5. Right click on the GnollHackW project and choose **Rebuild**.
6. You should now be able to find **GnollHackW.exe** at [directory path of your GnollHack repository]\bin\Debug\x64. Double-click on it to play.

## Debugging

After building the solution according to the above instructions (using the **Debug** solution configuration):

1. Set **GnollHackW** as **startup project**.
2. Hit the green **Start button** to debug the program.

## Troubleshooting

If the game reports `clang_rt.asan_dynamic-x86_64.dll was not found` when starting in the Debug mode, you need to add `C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.44.35207\bin\Hostx64\x64` to **PATH** in your **system environmental variables**:

- Please see [[Add New Path to PATH Environment Variable on Windows]] for how to do it.
- Please also check that the path exists on the disk and that the MSVC version number is the same on your system.
