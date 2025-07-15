## Preparations

### Devices

You need the following devices to follow these instructions:
1. **Windows computer** — Windows 10 or later, 16 GB or more RAM, 512 GB or more SSD space.
2. **Android device** — Android 12 or later, 4 GB or more RAM, 8 GB or more free storage space.

### Software Installation

On the Windows computer, do the following:

1. Install Visual Studio — [[Visual Studio Installation for Mobile Version Development]]
2. Clone Repository — [[Clone Repository in Visual Studio]]
3. Install WSL and Required Programs — [[Install Windows Subsystem for Linux]]
4. [[Configure Visual Studio for Mobile Version Development]]
5. Create `C:\Xamarin\Archives` in File Explorer and set **Archives Location** to it in **Visual Studio → Tools → Options → Xamarin**.
6. If you are using an old version of the repository, you may need to [[delete old directories]], because we have changed some paths.
7. [[Install Tile Sets and FMOD Sound Banks]].
8. [[Install Secrets File]].

### Android Device Preparation

1. Enable **Developer Mode** and **USB Debugging** — [Configure on-device developer options in Android](https://developer.android.com/studio/debug/dev-options)

## Starting Debugging or Creating Archive

1. [[Open GnollHack Solution in Visual Studio]].
2. Set **GnollHackX.Android** as a startup project.
3. Select **Android+Windows** as your solution platform in the menu bar.
4. Select the right solution configuration in the menu bar:
    - **Debugging** — Select **Debug**.
    - **Archiving** — Select **Release**.
5. Start Windows Subsystem for Linux (WSL) from the start menu.
6. In WSL, start SSH by typing `sudo service ssh start`.

## Debugging

1. Attach your Android device to your computer using a USB cable.
2. Allow **USB debugging** on the device if asked.
3. Select your **Android device** in the menu bar.
4. Select the **debugger** in the Android options:
    - **Xamarin debugger** (for C# code) — Enable **Fast Deployment** in the Android options.
    - **C++ debugger** — Works with and without **Fast Deployment** in the Android options. *(See notes 1 and 2 below.)*
5. Select the package format in the Android options:
    - **APK** — It's faster to deploy but sound and music streaming has noticeable lag (up to several seconds). 
    - **AAB (bundle)** — It's slower to deploy but sound and music streaming has no noticeable lag.
6. [[Rebuild Solution]].
7. Hit the green **Start button** to start debugging.
    - If the deployment succeeds but debugging does not start, please just try again. It works at some point.
    - When you are about to start debugging, please ensure that the solution configuration is at `Android + Windows`. Visual Studio sometimes reverts it to `Any CPU` that is not what we want.
    - If the build succeeds but the deployment fails promptly in an error, please restart Visual Studio.


### Notes

#### Note 1

You need to have [Visual Studio 2019](https://visualstudio.microsoft.com/vs/older-downloads/) with the same workloads as Visual Studio 2022 installed that you may use the C++ debugger. Note that there's no **.NET Multi-platform App UI development** workload in VS 2019, but you must install the **Mobile development with .NET** workload instead. You do not actually need to start VS 2019, but it is enough to have it installed.

This bug is reported [here](https://developercommunity.visualstudio.com/t/XamarinForms-Android-C-debugger-does/10132674) and [here](https://developercommunity.visualstudio.com/t/Xamarin-Android-NDK-missing-registry-key/10044363).

This bug should be fixed in Visual Studio 17.7.

#### Note 2

If the C++ debugger crashes with `SIGPWR`, you need to stop the debugging process in an early breakpoint and write the following in the **Command Window**:

```
Debug.MIExec handle SIGPWR nostop noprint
Debug.MIExec handle SIGXCPU nostop noprint
```

#### Note 3

FMOD sounds do not work correctly while debugging or when running a debug build. To make them work normally, you need to enable **Streaming Banks to Memory** in GnollHack's settings. This will consume some 500 MB of RAM. FMOD sounds work fine in release builds, though.


## Troubleshooting Android Build Errors and Runtime Errors

If you run into a strange compile time error or a runtime error, where the game does not find a Java wrapper class, you can see the following instructions:

- [[Troubleshooting Android Build Errors and Runtime Errors]]


## Creating APK/AAB Archive Package

1. Select the desired package format (**APK** or **"bundle"** for **AAB**) in the Android options.
    - Note that **Google Play Store** accepts only **AAB** packages.
2. Disable **Fast deployment** in the Android options.
3. [[Rebuild Solution]].
4. Select **Build → Archive** or right-click on the project and select **Archive**.

This will create an unsigned APK/AAB package. 


## Preparations for Signing APK/AAB

### 1. Creating the Keystore File

1. In the Archive Manager, find the created archive and select **Distribute**.
2. Select **Ad Hoc**.
3. Click the green plus sign to add a new **signing identity**.
4. Fill all the fields and hit Create.
5. Write down the **password** used to create the signing identity.
6. Double-click the created identity in the identity list.
7. Select **View in Explorer**.
8. Write down the full path to the keystore file. You will need it later, when you sign archives with **jarsigner**.

### 2. Download Java Development Kit for Windows

- [Download JDK for Windows](https://www.oracle.com/java/technologies/javase-downloads.html)


## Signing APK/AAB

Once the APK/AAB package has been created, you need to sign it with **jarsigner**.

1. In the Archive Manager, find the created archive and select **Open Folder**.
2. Open **Windows Powershell** (Windows 10) or **Terminal** (Windows 11)
    - **Windows 10:** In the File Explorer menu, click **File → Open in Windows Powershell**.
    - **Windows 11:** You can right-click on free space in the File Explorer window and select **Open in Terminal**.

Then write:

`&"C:\Program Files\Java\jdk-[jdk-version]\bin\jarsigner" -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore "[created-key-store-location]" ./com.soundmindentertainment.gnollhack.aab [your-keystore-identity]`

where:
- [jdk-version] is the version of JDK installed, for example, `16.0.2`.
- [created-key-store-location] is the location of the keystore created above, for example, `C:\Users\tommi\AppData\Local\Xamarin\Mono for Android\Keystore\tommi-hmp\tommi-hmp.keystore`
- [your-keystore-identity] is the name of the identity for which the keystore file was created, for example, `tommi-hmp`.

For example, our command is:

`&"C:\Program Files\Java\jdk-16.0.2\bin\jarsigner" -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore "C:\Users\tommi\AppData\Local\Xamarin\Mono for Android\Keystore\tommi-hmp\tommi-hmp.keystore" ./com.soundmindentertainment.gnollhack.aab tommi-hmp`

When asked, please provide the password used to create the signing identity.

The package is now signed and ready to be uploaded to Google Play Store.


## Uploading to Google Play Store

When you publish a new version of the game to Google Play Store, you need to increase **android:versionCode** in the **[Android manifest](https://github.com/hyvanmielenpelit/GnollHack/blob/master/win/win32/winclisrv/GnollHackClient/GnollHackClient.Android/Properties/AndroidManifest.xml)** by 1.
