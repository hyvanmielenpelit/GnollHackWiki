> 👉 **These instructions build the macOS version of GnollHack: a signed and notarized `GnollHack.app` for Apple Silicon Macs, packaged as a DMG download and as Steam depot content. The build runs on a Windows computer, which uses a Mac over SSH for the game engine, the signing and Apple's notarization.**

For what the Avalonia port is and how its flavors differ, see [[/Development/Avalonia Port]]. The macOS version is the same port, published with the runtime identifier `osx-arm64`.

## 📋 Prerequisites

### 💻 Devices

- **Windows computer** with an x64 processor, as for the [[Linux version|/Development/Build Instructions for Avalonia Linux Version on Windows]].
- **Mac with Apple Silicon** running macOS 15 or later, with Xcode installed. It compiles the game engine, signs and notarizes the app, and runs it for testing. .NET 11 does not run on older macOS versions, and the release is for Apple Silicon only.

### 🛠️ Software

1. [[/Development/Install Visual Studio 2026 for .NET MAUI Development]], with the **Linux and embedded development with C++** workload: the game data is compiled by Visual Studio Linux projects in WSL.
2. The .NET SDK and the .NET MAUI workload of the Avalonia port, pinned in `win\win32\xpl\GnollHackM\Platforms\Avalonia\global.json`. Install them as described for the [[Linux version|/Development/Build Instructions for Avalonia Linux Version on Windows]].
3. Clone the [GnollHack repository](https://github.com/hyvanmielenpelit/GnollHack) — [[/Development/Clone Repository in Visual Studio]].
4. [[/Development/Install Tile Sets and FMOD Sound Banks]]. The macOS version uses the **Desktop** sound banks.
5. [[/Development/Install Secrets File]].
6. A WSL distribution set up as Visual Studio's Linux build host: steps 1–3 of [[WSL Distribution|/Development/Build Instructions for Avalonia Linux Version on Windows#wsl-distribution]]. The glibc sysroot and the AppImage tools on that page are only for the Linux version.
7. [[/Development/Set Up SSH Access to the Mac for Native Libraries]], including Xcode's command-line tools. The same alias, `gnollhack-mac`, is used for packaging.

### 🍎 Apple Developer Account

Releases are signed with the team's **Developer ID Application** certificate and notarized by Apple. Both need membership of the team's Apple Developer Program; see [[/Development/Enroll for Apple Development Program (Mac)]]. The one-time setup on the Mac is described below in [[Signing Setup on the Mac|#signing-setup-on-the-mac]]. Test builds do not need it.

## 🛠️ Building

Run the commands from the repository root in PowerShell, unless a step says otherwise.

### 1. Start the SSH Server in WSL

```powershell
wsl -u root -e /usr/sbin/service ssh start
```

### 2. Build the Native Solution

Open `win\win32\vs\GnollHack.sln` — [[/Development/Open GnollHack Solution in Visual Studio]] — choose the **Release** configuration and the **macOS** solution platform, and build the solution. It compiles the game data in WSL, the same `nhdat` file as the Android and Linux versions, and then the game engine `libgnollhackmac.dylib` on the Mac. The engine is copied to `win\win32\xpl\GnollHackM\Platforms\MacOS\libs\`.

### 3. Build a Test App

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacPackage.ps1 -Targets App -DevCopy
```

The script publishes the game for `osx-arm64` as a single executable, copies it to the Mac, and builds `GnollHack.app` there. The game data, sound banks and tile sets go to `Contents/Resources`. Without signing options, the app is signed *ad hoc*: it runs on the Mac that built it, but not on other Macs. `-DevCopy` puts it at `~/gnollhack-dev/GnollHack.app` on the Mac.

The app icon comes from `Resources\AppIcon\macOS\appicon-macos.png` in `GnollHackM`. `Platforms\MacOS\Packaging\New-MacAppIcon.ps1` composes it from the two layers of the iOS icon, the gradient and the shield, as the rounded square that macOS expects. If either layer changes, run the script again and commit the new image.

> ℹ️ **Note:** If the `SENTRY_AUTH_TOKEN` environment variable is set, the publish uploads the debug symbols of the release to Sentry. Add `-NoSentryUpload` for test builds.

## 🧪 Testing on the Mac

- **Start the test app** in Finder: right-click `GnollHack.app` in your home folder's `gnollhack-dev` folder → **Open**. The first start of an ad-hoc app needs this.
- **Saved games and settings** are in `~/Library/Application Support/GnollHack`.
- **The log:** when the game is not started from Terminal, its output goes to `~/Library/Logs/GnollHack/GnollHack.log`, which Console.app also shows. The previous run's log is `GnollHack.previous.log`.
- **Sentry:** to check that crash reports arrive, start the game once with a test message:

    ```bash
    GNOLLHACK_SENTRY_TEST=1 ~/gnollhack-dev/GnollHack.app/Contents/MacOS/GnollHackM
    ```

## 🔏 Signing Setup on the Mac

This setup is done once, by a team member with access to the Apple Developer account, in **Terminal on the Mac**.

The build signs over SSH, but an SSH session cannot use the login keychain: it stays locked there, and signing fails with `errSecInternalComponent`. The certificate and the notarization credentials therefore go into a **signing keychain** of their own, whose password is in a file only your user can read. The build script unlocks that keychain for each build. Your login password is never used.

> ⚠️ **Warning:** Terminal may not read files on the Desktop or in Downloads. A command that reads a file there stops with "Operation not permitted". Keep the certificate and key files in a folder of your own, for example `~/DeveloperIDMac`, and move them there in Finder.

### 1. Create the Developer ID Certificate

In Xcode, open **Settings → Accounts**, select the team, click **Manage Certificates…**, then **+** → **Developer ID Application**. Alternatively, make a certificate signing request in Keychain Access (**Certificate Assistant → Request a Certificate From a Certificate Authority…**, saved to disk), create a **Developer ID Application** certificate (profile type G2 Sub-CA) with it under **Certificates, Identifiers & Profiles** on [developer.apple.com](https://developer.apple.com/account), and double-click the downloaded `.cer` on the same Mac. Only the team's Account Holder can create the certificate. Check that it exists:

```bash
security find-identity -v -p codesigning
```

The list must contain `Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)`.

### 2. Create the Signing Keychain

Run these in one Terminal window:

```bash
mkdir -p ~/.gnollhack && chmod 700 ~/.gnollhack
openssl rand -base64 32 > ~/.gnollhack/signing-keychain-password && chmod 600 ~/.gnollhack/signing-keychain-password
KC=~/Library/Keychains/gnollhack-signing.keychain-db
security create-keychain -p "$(cat ~/.gnollhack/signing-keychain-password)" "$KC"
security set-keychain-settings "$KC"
security list-keychains -d user -s $(security list-keychains -d user | tr -d '"') "$KC"
```

### 3. Copy the Certificate into It

1. In **Keychain Access**, open **login → My Certificates**, right-click **Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)** and choose **Export…**. Save it as `~/DeveloperIDMac/Certificates.p12` with a password. Keep this file safe as a backup.
2. In the same Terminal window, import it, allow `codesign` to use its key without asking, and add Apple's Developer ID intermediate certificate:

    ```bash
    security import ~/DeveloperIDMac/Certificates.p12 -k "$KC" -T /usr/bin/codesign
    security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k "$(cat ~/.gnollhack/signing-keychain-password)" "$KC" > /dev/null
    curl -fsSL -o /tmp/DeveloperIDG2CA.cer https://www.apple.com/certificateauthority/DeveloperIDG2CA.cer && security import /tmp/DeveloperIDG2CA.cer -k "$KC"
    ```

    The import asks for the `.p12` password. Run `set-key-partition-list` only after the import has succeeded: it applies to the keys in the keychain at that moment.

### 4. Store the Notarization Credentials

Create an API key in [App Store Connect](https://appstoreconnect.apple.com): **Users and Access → Integrations → App Store Connect API → Team Keys → +**, with **Developer** access. Download its `AuthKey_<Key ID>.p8` file into `~/DeveloperIDMac`; Apple lets you download it only once. The **Issuer ID** is shown above the list of keys. Then:

```bash
xcrun notarytool store-credentials gnollhack-notary --keychain ~/Library/Keychains/gnollhack-signing.keychain-db --key ~/DeveloperIDMac/AuthKey_<Key ID>.p8 --key-id <Key ID> --issuer <Issuer ID>
```

It checks the key with Apple and ends with "Credentials saved to Keychain".

### 5. Check the Setup

From Windows, the build script's own check is the release build below. On the Mac, these must work:

```bash
security unlock-keychain -p "$(cat ~/.gnollhack/signing-keychain-password)" ~/Library/Keychains/gnollhack-signing.keychain-db
security find-identity -v -p codesigning ~/Library/Keychains/gnollhack-signing.keychain-db
xcrun notarytool history --keychain-profile gnollhack-notary --keychain ~/Library/Keychains/gnollhack-signing.keychain-db
```

## 📦 Release Build

After the native build in step 2 of [[Building|#building]]:

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacPackage.ps1 -Targets App,Dmg,Steam -SigningIdentity "Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)" -NotaryProfile gnollhack-notary -SteamAppId <app id> -SteamDepotId <macOS depot id> -SteamBranch <branch>
```

The script signs every program file of the app with the hardened runtime, sends the app and the DMG to Apple for notarization, and staples Apple's ticket to both. It stops if Apple rejects either, and prints Apple's log of the problems. Uploading and notarizing take several minutes.

The results are copied to `win\win32\xpl\GnollHackM\bin\MacPackages\<version>-<build>\`:

- `GnollHack-<version>-macos-arm64.dmg`: the download, with the app and a link to Applications;
- `GnollHack-<version>-macos-arm64.zip`: the zipped app;
- `SHA256SUMS`, and `BUILD-INFO` with the commit, the signing identity and Apple's notarization submission ids.

The Steam depot content stays on the Mac, in `~/gnollhack-build/package/<version>-<build>/steam`. Leave out `Steam` from `-Targets`, and the Steam options, to build only the app and the DMG.

> 💡 **Tip:** `spctl --assess --type execute -vv GnollHack.app` on the Mac must say `source=Notarized Developer ID`. A notarized app opens on any Mac with macOS 15 or later after the usual "downloaded from the Internet" question.

## 🎮 Steam Upload

The script never uploads anything. The Steam build is uploaded from the Mac, in Terminal:

```bash
steamcmd +login <Steam account> +run_app_build ~/gnollhack-build/package/<version>-<build>/steam/app_build_mac.vdf +quit
```

Steamworks needs these settings for the macOS depot, once:

- a **macOS depot** under SteamPipe → Depots;
- a **launch option** with executable `GnollHack.app`, arguments `-store steam`, and operating system macOS;
- **macOS** ticked among the app's platforms, together with **App Bundles Are Notarized**.

> 📢 **Important:** A beta branch build must also list the current Windows and Linux depots in `app_build_mac.vdf`, so that their players on that branch keep a working game. The template has a comment at the right place.

## ❓ Troubleshooting

| Problem | Solution |
|:--|:--|
| `errSecInternalComponent` when signing | The key cannot be used without a prompt. Run `set-key-partition-list` from step 3 of the signing setup again, after the import. The build script also puts the signing keychain first in the keychain search list while it signs, because a second copy of the identity in the locked login keychain would otherwise be found first. |
| `keychainLocked` from `notarytool`, or `GNHMP114` / `GNHMP115` | The signing keychain or its password file is missing, or the password does not match. Repeat step 2 of the signing setup. |
| `No Keychain password item found for profile: gnollhack-notary` | Step 4 of the signing setup has not been done for the signing keychain. |
| "Operation not permitted" in Terminal | Terminal may not read the Desktop or Downloads. Move the file in Finder to a folder of your own. |
| `GNHMP109`: notarization ended as `Invalid` | Apple's log is printed above the error. It names the file that is not signed correctly. |
| "GnollHack cannot be opened" or "is damaged" on another Mac | The app was signed ad hoc. Make a release build with the Developer ID identity and notarization. |
| `GNHMP002`: `libgnollhackmac.dylib` or `nhdat` is missing | Do step 2 of [[Building|#building]]. |
| `GNHMP008` or `GNHAB006`: cannot connect to the Mac | The Mac is asleep, Remote Login is off, or the SSH key is not set up. See [[/Development/Set Up SSH Access to the Mac for Native Libraries]]. |

For general build problems, see [[/Development/Troubleshooting Building GnollHack with .NET MAUI]].

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Set Up SSH Access to the Mac for Native Libraries]]
- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Development/Enroll for Apple Development Program (Mac)]]

## 🔗 External Links

- [Notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)
- [Developer ID](https://developer.apple.com/developer-id/)
- [Avalonia: macOS deployment](https://docs.avaloniaui.net/docs/deployment/macos)
- [SteamPipe documentation](https://partner.steamgames.com/doc/sdk/uploading)
