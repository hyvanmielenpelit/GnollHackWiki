## Preparations

### Devices

You need the following devices to follow these instructions:
1. **Windows computer** — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.
2. **Android device** — Android 5.0 or later but preferably Android 12 or later, 3 GB or more RAM, 4 GB or more free storage space.

### Software Installation

1. Install the latest Visual Studio version with up-to-date support for .NET MAUI.
2. Follow the instructions to build Xamarin.Forms version of the game using [[Build Instructions for Android Version on Windows]].
3. Rebuild the Xamarin.Forms app. This will create various files for the .NET MAUI app based on Xamarin.Forms files.

### Android Device Preparation

1. Enable **Developer Mode** and **USB Debugging** — [Configure on-device developer options in Android](https://developer.android.com/studio/debug/dev-options)

## Starting Debugging or Creating Archive

1. [[Open GnollHackM Solution in Visual Studio]]. This is different from the normal GnollHack solution.
2. Select the right solution configuration in the menu bar:
    - **Debugging** — Select **Debug**.
    - **Archiving** — Select **Release**.

## Debugging

1. Attach your Android device to your computer using a USB cable.
2. Allow **USB debugging** on the device if asked.
3. Select your Android device from the **Android local devices** menu of the device dropdown list with a green start button in the menu bar.
4. [[Rebuild Solution]].
5. Hit the green **Start button** to start debugging.
    - If the deployment succeeds but debugging does not start, please just try again. It works at some point.