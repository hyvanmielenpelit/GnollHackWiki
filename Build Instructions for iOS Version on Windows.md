## 1. Preparations

### 1.1. Devices

You need the following devices to follow these instructions:
1. **Windows computer** — Windows 10 or later, 16 GB or 32 GB RAM, 512 GB or 1 TB SSD space.
2. **Mac computer** — macOS 12 (Monterey) or later, M1 processor or better, 16 GB or more RAM, 512 GB or more SSD space.
3. **iPhone or iPad** — iOS 15 or later, 3 GB or more RAM, 4 GB or more free storage space.

### 1.2. Software Installation and Configuration on Windows Computer

On the Windows computer, do the following:

1. Install Visual Studio — [[Visual Studio Installation for Mobile Version Development]]
2. Clone Repository — [[Clone Repository in Visual Studio]]
3. Install WSL and Required Programs — [[Install Windows Subsystem for Linux]]
4. [[Configure Visual Studio for Mobile Version Development]]
5. Create `C:\Xamarin\iOSArchive` in File Explorer and set **Archives Location** to it in **Visual Studio → Tools → Options → Xamarin → iOS Settings**.
6. In Windows, browse for environmental variables. Change both `TEMP` to `C:\Temp` and `TMP` to `C:\Temp`. Create the `C:\Temp` directory.
7. Restart Visual Studio 2022 and the computer.
8. **NEW** — If you are using an old version of the repository, you may need to [[delete old directories]], because we have changed some paths.

### 1.3. Software Installation and Configuration on Mac Computer

1. Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) 15.2 from App Store or [xcodereleases.com](https://xcodereleases.com/).
2. Install [Visual Studio for Mac 2022](https://visualstudio.microsoft.com/vs/mac/).
3. [[Install Bison and Flex on Mac]].
4. [[Enable Xamarin.iOS Connections]].
5. [[Install vcremote for Static iOS Library Project]].
6. [[Enroll for Apple Development Program (Mac)]].

### 1.4. Additional Configuration in Visual Studio on Windows

#### 1.4.1. Enable C++ Mac Pairing (vcremote)

In Visual Studio, go to **Options → Cross Platform → C++ → iOS → Pairing** and:

1. Set **Host** to the **IP Address** or **DNS name** of the Mac computer. You can find this on the Mac computer's **System → Preferences → Sharing** page.
2. Set **Port** to 3030.
3. Check the **Secure** check box. 
4. Write to the **Pin** field the pin you got from [[installing vcremote on Mac|Install vcremote for Static iOS Library Project]].
5. Set **Remote Root** to `/Users/[user-id-on-mac]/vcremote`, where `[user-id-on-mac]` is your user id on the Mac computer.
6. Then, click **Pair**.

![build-ios-windows-1](/uploads/Build%20Instructions%20for%20iOS%20Version%20on%20Windows/build-ios-windows-1.webp)

#### 1.4.2. Install PuTTY and PSCP and Create Download Scripts for Static iOS Library Project

- [[Install PuTTY and PSCP and Create Download Scripts for Static iOS Library Project]]
- Note that you need to create new Download Scripts and store them into the cache everytime your network environment changes.

#### 1.4.3. Install Tile Sets, Sound Banks, and the Secrets File

Some files are not directly in the repository, because they are too big or they contain nonpublic information.

1. [[Install Tile Sets and FMOD Sound Banks]].
2. [[Install Secrets File]].

### 1.5. Create Development Certificate and Profile

You should use **Manual Provisioning** in the Xamarin iOS project, found in Project Properties page’s iOS Bundle Signing tab on the Windows computer.

#### 1.5.1. Create Development Certificate

In Visual Studio on the Windows computer,
1. Go to **Certificates, Identifiers & Profiles**. **Create a new Device** by pressing + next to the **Certificates** title.
2. Select **Apple Development Certificate**.

In Xcode on the Mac computer, 
1. Use **Keychain Access → Certificate Assistant → Request a Certificate from a Certificate Authority…** menu command to create a Certificate Signing Request.
    - **User Email Address** is the email address associated with your AppleID
    - **Common Name** is the name for private key in the certificate. Name it something like “Janne Gustafsson Development Key” for development (and Distribution Key for distribution)
    - **CA Email Address** is blank
    - **Request is Saved** to disk
    - Press **Continue** and save to the `Development` folder
    - Upload to **Apple Developer Center** in Safari by Choose File

2. Download the certificate and put it into the `Development` folder. Double-click on it to add to KeyChain Access. (This should open and the certificate should appear on the Certificates page.)
3. Right-click on the certificate and **Export** it to create a **.p12** file into the `Development` directory.

On the Windows computer,
1. Copy the .p12 file to Windows and import it to Visual Studio 2022 using **Tools → Xamarin → Apple Accounts**.
2. Select first to **Add to add your apple developer account**.
3. Then select it, and press **View Details**. (Nothing is showing up because of some bugs.)
4. Click **Import Certificate** and select your .p12 file. Nothing is still showing up because of some bugs, but you now have the Developer Certificate installed. 
5. The Provisioning Profile will be just copied to the right directory below.

#### 1.5.2. Create Identifier

In Visual Studio on Windows,
- **Create a new Device** by pressing + next to the **Identifiers** title. This is the same as the BundleID for the game, e.g. `com.soundmindgames.GnollHack`, which can be set in Visual Studio 2022 in **Info.plist** in the Xamarin.iOS project's main directory.

#### 1.5.3. Create Device

In Visual Studio on Windows,
- **Create a new Device** by pressing + next to the **Devices** title. You can get the **UDID** for a connected device to Mac from XCode from **Window → Devices and Simulators**.

#### 1.5.4. Create Provisioning Profile on Mac

This links four things together:

1. You (the Development Certificate)
2. Development Computer (Mac you are using the Safari on)
3. iOS Device (in the Device section)
4. GnollHack (in the Identifier section)

On the Mac computer,
1. Select **Exact Provisioning for a single project**. *(Wildcard Provisioning can be used for all projects in a company, but it does not enable any special features.)*
2. **Name the profile** like something "GnollHack HMP iPad".
3. **Download the profile** and save it into `Development` directory. Copy the profile to Windows to
`C:\Users\[loginname]\AppData\Local\Xamarin\iOS\Provisioning\Profiles`
    - where `[loginname]` is your login name on Windows

You do *not* need to change the file name. The profile should now appear to Visual Studio 2022 in **Manual Provisioning**.

#### 1.5.5 Set Manual Provisioning for Xamarin iOS Project

In Visual Studio on Windows,
1. Go to **Project Properties** page’s iOS Bundle Signing tab.
2. Select **Manual Provisioning**. *(Automatic provisioning is something a bit too automatic. Manual provisioning is the way it should work, as long as you can get .p12 and .mobileprovision files to Windows.)*
3. Select **Signing Identity** to be your Development Certificate, or the respective Team.
4. Select **Provisioning Profile** that matches the BundleID in Info.plist and that has been copied to **Xamarin/iOS/Provisioning/Profiles** folder in your AppData folder.
5. Do this for both Debug and Release configurations.

![build-ios-windows-2](/uploads/Build%20Instructions%20for%20iOS%20Version%20on%20Windows/build-ios-windows-2.webp)

### 1.6. Disable Virus Protection for Source, Build and Cache Folders

Disable Virus Protection in the source, build and cache folders on both Windows and Mac. The virus protection often interferes with the building process by deleting intermediate files on the fly.

### 1.7. Clear Cache

It is often useful to clear the Xamarin build cache on Mac at `~/Library/Caches/Xamarin/mtbs` by moving it to bin. Do this if you update the files with the same name such as static libraries.

## 2. Debugging

On the Mac computer,

1. Attach your **iOS device** to the Mac computer using a USB cable.
2. Start **vcremote** by typing `vcremote` in Terminal.

On the Windows computer,

1. [[Open GnollHack Solution in Visual Studio]].
2. Start **Windows Subsystem for Linux (WSL)** from the start menu.
3. In WSL, **start SSH** by typing `sudo service ssh start`.
4. Set **GnollHackX.iOS** as a startup project. If you need to do this, you need also restart Visual Studio.
5. Select **iPhone** or **Any CPU** as your solution platform in the menu bar. Any CPU will also [[build the Android project|Build Instructions for Android Version on Windows]].
6. Select **Debug** as your solution configuration in the menu bar.
7. Select your **iOS device** in the menu bar.
8. [[Rebuild Solution]].
9. Hit the green **Start button** to start debugging.

Note that C++ debugging does not work with the iOS project (but you get good stack traces, though). The Xamarin debugger works also with iOS projects. If you want to debug C++, you need to use the Android project.

## 3. Notes

### 3.1. Connecting Static Libraries to Xamarin

#### 3.1.1. FMOD

Include `UNITY_IPHONE` preprocessor definition in both Debug and Release configurations in Xamarin.iOS. You must open **Xamarin.iOS csproj file** and add there a line in the right property group (for debug configuration):

`<DefineConstants>DEBUG;UNITY_IPHONE</DefineConstants>`
 
**FMOD libraries** use **AudioToolbox** and **CoreAudio** frameworks. Write on the frameworks line: `AudioToolbox CoreAudio`:
 
![build-ios-windows-3](/uploads/Build%20Instructions%20for%20iOS%20Version%20on%20Windows/build-ios-windows-3.webp)

Also, you should add the following lines to [fmod.cs](https://github.com/hyvanmielenpelit/GnollHack/blob/5d64ddb653363bf4e08380f3e6e2cb712e1211c7/win/win32/xam/GnollHackX/GnollHackX.FMOD/fmod.cs#L23) and [fmod_studio.cs](https://github.com/hyvanmielenpelit/GnollHack/blob/5d64ddb653363bf4e08380f3e6e2cb712e1211c7/win/win32/xam/GnollHackX/GnollHackX.FMOD/fmod_studio.cs#L18), if they are not there:

```
#if (UNITY_IPHONE || UNITY_TVOS || UNITY_SWITCH || UNITY_WEBGL) && !UNITY_EDITOR
        public const string dll    = "__Internal";
#elif !UNITY_2019_4_OR_NEWER
        public const string dll     = "fmodstudio";
#endif
```

Otherwise, the iOS version does not work. It comes where this line is:

```
        public const string dll     = "fmodstudio";
```

The two files that need to be changed are in this folder: `win/win32/xam/GnollHackX/GnollHackX.FMOD`

#### 3.1.2. Other Libraries

Import other C/C++ libraries using **right-click on Xamarin.iOS Project → Add Native Reference → Add Static Native Library** menu command. They go to **Native References** folder. Then in **Properties** mark them as **Force Load**. The **GnollHack library** must be marked as **Is C++**, as it contain a bit of C++ code.

## 4. Uploading to App Store

On Windows,
1. Follow the instructions for debugging steps 1–7.
2. Select **Release** as your solution configuration in the menu bar.
3. **Rebuild solution**.
4. Create an archive on Visual Studio 2022 using **right-click on the GnollHackX.iOS project** and select **Archive…**
5. Wait until the Archive process completes.

On Mac,
1. Start XCode. Then, open **XCode → Window → Organizer**. If Xcode was already open, please restart it.
2. There should be a new archive under **Archives** in the left pane.
3. Select **GnollHackX**.
4. Press first **Validate App** on the right pane.
5. If ok, then click **Distribute App** on the right pane.
