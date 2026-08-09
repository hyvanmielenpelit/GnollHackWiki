## Preparations

### Devices

You need the following devices to follow these instructions:
1. **Windows computer** — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.
2. **Mac computer** — macOS 26 (Tahoe) or later, M1 processor or better, 16 GB or more RAM, 512 GB or more SSD space.
3. **iPhone or iPad** — iOS 26.5 or later, 3 GB or more RAM, 4 GB or more free storage space.

### Build Native Library and Assets (GnollHack.sln)

1. Connect to your Mac build host using the **Pair to Mac** wizard in Visual Studio.
2. Open the native solution `win\win32\vs\GnollHack.sln`.
3. Rebuild the solution. Visual Studio will delegate compilation of the C core to the paired Mac, producing the static library `libgnollhackios.a` and running the XAML translation.

### Software Installation for .NET MAUI

1. On Windows, install the latest Visual Studio version with up-to-date support for .NET MAUI.
2. On Mac, install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) 26.5 (or whatever is the newest supported by .NET MAUI) from App Store or from [xcodereleases.com](https://xcodereleases.com/).
    - You can do this just by drag-and-dropping the downloaded Xcode from Downloads or where it is unpacked to Applications folder

When building the native iOS library from the GnollHack solution, the build process copies the tile sets and sound banks to the appropriate `GnollHackM` directories (see [[Install Tile Sets and FMOD Sound Banks]]). Also, you must copy the secrets file separately (see [[Install Secrets File]]).

### Provisioning

1. Create an Apple developer account if you don't already have one (already needed for the Xamarin iOS version) at [developer.apple.com](https://developer.apple.com/)
2. Create provisioning profiles for GnollHackM at [developer.apple.com](https://developer.apple.com/)
    - Development profile for debugging on your device
    - If need be, distribution profile for distribution on App Store
3. In Visual Studio > Tools > Options > Xamarin > Apple Accounts
    - Add your developer AppleID
    - Then select your team on the right-hand side box and press View Details
    - The dialog box should show all of your certificates and provisioning profiles
    - Click Download All Profiles
4. Set the provisioning profile information in `GnollHackM.csproj` project file to your profiles
    - Debug configuration should use Development profile
    - Release configuration can use either Development profile (if you do not plan to distribute on App Store) or Distribution profile
5. On Mac, open Xcode and add your Apple developer account to Xcode 26.5 in Xcode > Settings > Accounts if it is not already there
    - Press the + in the left bottom corner of the dialog box
    - You can also download the manual profiles by clicking Download Manual Profiles and adding them then to Keychain Access, but this may not be necessary

## Starting Debugging or Creating Archive

1. [[Open GnollHackM Solution in Visual Studio]]. This is different from the normal GnollHack solution.
2. Select the right solution configuration in the menu bar:
    - **Debugging** — Select **Debug**.
    - **Archiving** — Select **Release**.

## Debugging

1. Attach your iOS device to your Mac using a USB cable.
2. Connect to Mac via Pair to Mac button in the toolbar
3. Select your device from the dropdown menu associated with the green **Start button** (it normally says something like Windows Machine), from under iOS Remote Devices
    - If your connected device does not show up there, then there is a problem with the Mac connection
4. Hit the green **Start button** to start debugging.

## Troubleshooting

If you run into trouble, you can try any of the following:

1. On Windows, delete `obj `and `bin `directories under `win\win32\xpl\GnollHackM`
2. On Windows, run `dotnet restore` command via Tools > Command Line > Developer PowerShell
3. On Windows, Visual Studio > Build > Clean Solution
4. On Windows, Visual Studio > Build > Rebuild Solution
5. On Mac, delete `Users/[username]/Library/Caches/mtbs` directory
6. On Mac, if the build tools are broken, then deleting some directories under `Users/[username]/Library/Caches/XMA` directory can help, too.