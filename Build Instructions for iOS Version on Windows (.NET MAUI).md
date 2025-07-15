## Preparations


### Devices


You need the following devices to follow these instructions:
1. **Windows computer** — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.
2. **Mac computer** — macOS 12 (Monterey) or later, M1 processor or better, 16 GB or more RAM, 512 GB or more SSD space.
3. **iPhone or iPad** — iOS 15 or later, 3 GB or more RAM, 4 GB or more free storage space.


### Build Xamarin.Forms Version (GnollHackX) for iOS


1. Follow the instructions to build Xamarin.Forms version (GnollHackX) of the game using [[Build Instructions for iOS Version on Windows]].
    - Note that this uses Xcode 15.2. Make sure that Xcode is set to the 15.2 version in Tools > Options > Xamarin > iOS Settings > Apple SDK / Xcode Path
    - If you needed to change the Xcode for the Xamarin build, then after the change is done, disconnect from Mac and reconnect again.
    - Note that you can use different Visual Studio versions to build Xamarin and .NET MAUI via a side-by-side installation of Visual Studio, if need be. These, however, share the same Xcode settings.
2. Rebuild the Xamarin.Forms app. This will create various files for the .NET MAUI app based on Xamarin.Forms files.


### Software Installation for .NET MAUI


1. On Windows, install the latest Visual Studio version with up-to-date support for .NET MAUI.
2. On Mac, install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) 15.4 (or whatever is the newest supported by .NET MAUI) from App Store or from [xcodereleases.com](https://xcodereleases.com/) as a side-by-side installation with XCode 15.2.
    - You can do this just by drag-and-dropping the downloaded Xcode from Downloads or where it is unpacked to Applications folder


### Switch to the Right Xcode for .NET MAUI in Visual Studio on Windows


1. If you are using a different Visual Studio to build MAUI than Xamarin, then connect to Mac in the .NET MAUI version of Visual Studio
2. Change Xcode to 15.4 (might be named something like "Xcode 2") in Tools > Options > Xamarin > iOS Settings > Apple SDK / Xcode Path
3. Disconnect from Mac and then connect to Mac again


### Verify that Tile Sets, Sound Banks, and the Secrets File Have Been Installed for GnollHackM


When building Xamarin iOS version of GnollHack (GnollHackX), the build process should have already copied the tile sets and sound banks to the right GnollHackM directories (see [[Install Tile Sets and FMOD Sound Banks]]). Also, in [[Install Secrets File]], the secrets file should already have been copied to the GnollHackM directory.


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
5. On Mac, open Xcode and add your Apple developer account to Xcode 15.4 in Xcode > Settings > Accounts if it is not already there
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