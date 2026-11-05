> 👉 **These instructions build the macOS version of GnollHack: a signed and notarized `GnollHack.app` for Apple Silicon Macs, packaged as a DMG download and as Steam depot content. The build runs on a Windows computer, which uses a Mac over SSH for the game engine, the signing and Apple's notarization.**

For what the Avalonia port is and how its flavors differ, see [[/Development/Avalonia Port]]. The macOS version is the same port, published with the runtime identifier `osx-arm64`.

## 📋 Prerequisites

### 💻 Devices

- **Windows computer** with an x64 processor, as for the [[Linux version|/Development/Build Instructions for Avalonia Linux Version on Windows]].
- **Mac with Apple Silicon** running macOS 15 or later, with Xcode installed. It compiles the game engine, signs and notarizes the app, and runs it for testing. .NET 11 does not run on older macOS versions, and the release is for Apple Silicon only. Sign in to it as the user that the SSH alias logs in as, which holds the signing keychain.

### 🛠️ Software

1. [[/Development/Install Visual Studio 2026 for .NET MAUI Development]], with the **Linux and embedded development with C++** workload: the game data is compiled by Visual Studio Linux projects in WSL.
2. The .NET SDK and the .NET MAUI workload of the Avalonia port, pinned in `win\win32\xpl\GnollHackM\Platforms\Avalonia\global.json`. Install them as described for the [[Linux version|/Development/Build Instructions for Avalonia Linux Version on Windows]].
3. Clone the [GnollHack repository](https://github.com/hyvanmielenpelit/GnollHack) — [[/Development/Clone Repository in Visual Studio]].
4. [[/Development/Install Tile Sets and FMOD Sound Banks]]. The macOS version uses the **Desktop** sound banks.
5. [[/Development/Install Secrets File]]. Build a release with the team's own secrets file, which a team member gives you: the template on that page has empty values, which turn off crash reporting and the game's online services.
6. A WSL distribution set up as Visual Studio's Linux build host: steps 1–3 of [[WSL Distribution|/Development/Build Instructions for Avalonia Linux Version on Windows#wsl-distribution]]. The glibc sysroot and the AppImage tools on that page are only for the Linux version.
7. [[/Development/Set Up SSH Access to the Mac for Native Libraries]], including Xcode's command-line tools. The same alias, `gnollhack-mac`, is used for packaging.

### 🍎 Apple Developer Account

Releases are signed with the **Developer ID Application** certificate of the team Hyvan mielen pelit ry (Team ID `CUG8RS847T`) and notarized by Apple. You do not enroll or pay yourself: the team's Account Holder or an Admin invites you under **Users and Access** in App Store Connect. [[/Development/Enroll for Apple Development Program (Mac)]] is only for creating a new team.

- The Developer ID certificate can be created only by the **Account Holder**.
- The App Store Connect API key for notarization is created by the Account Holder or an **Admin**.
- After the one-time [[Signing Setup on the Mac|#signing-setup-on-the-mac]], builds need no Apple account: everything is in the signing keychain on the Mac.

Test builds need none of this.

## 🛠️ Building

Run the commands from the repository root in PowerShell, unless a step says otherwise.

### 1. Start the SSH Server in WSL

```powershell
wsl -u root -e /usr/sbin/service ssh start
```

### 2. Build the Native Solution

Open `win\win32\vs\GnollHack.sln` — [[/Development/Open GnollHack Solution in Visual Studio]] — choose the **Release** configuration and the **macOS** solution platform, and build the solution. It compiles the game data in WSL, the same `nhdat` file as the Android and Linux versions, and then the game engine `libgnollhackmac.dylib` on the Mac. The engine is copied to `win\win32\xpl\GnollHackM\Platforms\MacOS\libs\`.

The same from the command line, with the 64-bit MSBuild that Visual Studio uses:

```powershell
$msbuild = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\amd64\MSBuild.exe
& $msbuild win/win32/vs/GnollHack.sln /t:Build /p:Configuration=Release /p:Platform=macOS
```

Check that `win\win32\xpl\GnollHackM\Platforms\MacOS\libs\libgnollhackmac.dylib` and `win\win32\xpl\GnollHackM\Platforms\Android\gnh\nhdat` now exist. Every build, Debug or Release, copies its engine there, and the package takes whichever is there, so build Release last before a release.

### 3. Build a Test App

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacPackage.ps1 -Targets App -DevCopy
```

The script publishes the game for `osx-arm64` as a single executable, copies it to the Mac, and builds `GnollHack.app` there. A single executable keeps `Contents/MacOS` free of the hundreds of .NET `.dll` files, which macOS would require to be signed as code; only real program files stay there. The game data, sound banks and tile sets go to `Contents/Resources`, where a bundle keeps its other files and where the game looks for them. Without signing options, the app is signed *ad hoc*: it runs on the Mac that built it, but not on other Macs. `-DevCopy` also puts it at `~/gnollhack-dev/GnollHack.app` on the Mac.

The app icon comes from `Resources\AppIcon\macOS\appicon-macos.png` in `GnollHackM`. `Platforms\MacOS\Packaging\New-MacAppIcon.ps1` composes it from the two layers of the iOS icon, the gradient and the shield, as the rounded square that macOS expects. If either layer changes, run the script again and commit the new image.

> ℹ️ **Note:** If the `SENTRY_AUTH_TOKEN` environment variable is set, the publish uploads the debug symbols of the release to Sentry, including the game engine's `.dSYM`, which the engine build makes beside `libgnollhackmac.dylib`. Add `-NoSentryUpload` for test builds.

## 🧪 Testing on the Mac

- **Start the test app** at the Mac: double-click `GnollHack.app` in the `gnollhack-dev` folder of your home folder. It was made on this Mac, so Gatekeeper does not stop it. Never start the game over SSH: its window and alerts open on the screen of whoever is at the Mac.
- **Saved games and settings** are in `~/Library/Application Support/GnollHack`.
- **The log:** when the game is not started from Terminal, its output goes to `~/Library/Logs/GnollHack/GnollHack.log`, which Console.app also shows. The previous run's log is `GnollHack.previous.log`.
- **Sentry:** to check that crash reports arrive, start the game once in Terminal on the Mac with a test message. It needs the team's secrets file in the build, or a DSN in the `SENTRY_DSN` environment variable for that run. The event appears in Sentry as "Sentry test from …" with the tag `macos.package=bundle`:

    ```bash
    GNOLLHACK_SENTRY_TEST=1 ~/gnollhack-dev/GnollHack.app/Contents/MacOS/GnollHackM
    ```

    To check native crash reports, build the engine in Debug, the only configuration with `#crashtest`, then start a wizard-mode game and use `#crashtest`; the report reaches Sentry at the next start.

## 🔏 Signing Setup on the Mac

This setup is done once, by a team member with access to the Apple Developer account, in **Terminal on the Mac**.

The build signs over SSH, but an SSH session cannot use the login keychain: it stays locked there, and signing fails with `errSecInternalComponent`. The certificate and the notarization credentials therefore go into a **signing keychain** of their own, whose password is in a file only your user can read. The build script unlocks that keychain for each build. Your login password is never used.

> ⚠️ **Warning:** Terminal may not read files on the Desktop or in Downloads. A command that reads a file there stops with "Operation not permitted". Keep the certificate and key files in a folder of your own, for example `~/DeveloperIDMac`, and move them there in Finder.

> 🛑 **Caution:** These steps are for a person at the Mac. An AI agent must never run them, read `~/.gnollhack/signing-keychain-password`, or handle the `.p12`, the `.p8` or any password. Once the setup is done, the build script uses the signing keychain without anyone typing a password.

Sign in to the Mac as the user that the SSH alias `gnollhack-mac` logs in as: the signing keychain is in that user's home folder.

### 🔑 Credentials and Backups

| Item | What it is for | Where to find it | Backup |
|:--|:--|:--|:--|
| **Team ID** | Part of the signing identity's name, `(CUG8RS847T)` | developer.apple.com → Account → Membership details | Not secret |
| **Developer ID Application certificate** | Signs the app and the DMG | Certificates, Identifiers & Profiles → Certificates | Covered by the `.p12` |
| **`Certificates.p12` and its password** | The certificate with its private key, from step 3 | `~/DeveloperIDMac` | In the team's secure storage, such as a password manager. Without it, another Mac needs a new certificate |
| **API key `AuthKey_<Key ID>.p8`** | Lets `notarytool` send builds to Apple | App Store Connect → Users and Access → Integrations → App Store Connect API → Team Keys. It can be downloaded only once | In the team's secure storage, with its Key ID and Issuer ID. If it is lost, revoke the key and make a new one |
| **Key ID** | Names the API key | The Team Keys table | With the `.p8` |
| **Issuer ID** | Names the team's API account | Above the Team Keys table | With the `.p8` |
| **Signing keychain password** | Lets the build unlock the signing keychain | `~/.gnollhack/signing-keychain-password`, made in step 2 | None needed: if it is lost, make a new keychain with steps 2–4 |
| **SSH alias `gnollhack-mac`** | Lets the Windows computer reach the Mac | `%USERPROFILE%\.ssh\config` on Windows | — |
| **Steam app ID and macOS depot ID** | Fill in the SteamPipe build scripts | Steamworks → the app → SteamPipe → Depots | Not secret |

When the setup works, move the `.p12`, the `.p8` and the request file into the team's secure storage and delete them from `~/DeveloperIDMac`: the signing keychain holds everything the build needs.

### 1. Create the Developer ID Certificate

The team's **Account Holder** does this step: no other role can create a Developer ID certificate. Do it on the Mac you sign on, because the certificate's private key is made there and leaves it only in the `.p12` backup of step 3. The **Apple Development** and **Apple Distribution** certificates of the iOS version cannot sign a Mac app for download, and Apple allows only five Developer ID Application certificates per team: for another Mac, import the `.p12` instead of making a new one.

1. Open **Keychain Access** (Spotlight: `Cmd+Space`, then type `Keychain Access`) and choose **Keychain Access → Certificate Assistant → Request a Certificate From a Certificate Authority…**. Enter your email address and a name such as `GnollHack Developer ID`, leave the CA email address empty, choose **Saved to disk**, and save the `.certSigningRequest` file in `~/DeveloperIDMac`.
2. On [developer.apple.com](https://developer.apple.com/account), open **Certificates, Identifiers & Profiles → Certificates → +**, select **Developer ID Application**, choose the **G2 Sub-CA** profile type, upload the request file, and download the `.cer` file.
3. Double-click the `.cer` file on the same Mac. Keychain Access puts it in the **login** keychain, beside the private key that the request made.

Do not create it with Xcode's **Manage Certificates**: depending on your role, Xcode makes a cloud-managed certificate whose private key stays with Apple and cannot be exported, so the build could not use it. Check the result:

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

`set-keychain-settings` without options turns off automatic locking, so the keychain stays unlocked until the Mac restarts; the build unlocks it again each time. The last command adds it to your keychain search list, so that Keychain Access and `security find-identity` show it.

### 3. Copy the Certificate into It

1. In **Keychain Access**, open **login → My Certificates**, right-click **Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)** and choose **Export…**. Save it as `~/DeveloperIDMac/Certificates.p12` with a password. Keep this file safe as a backup.
2. In Terminal, import it, allow `codesign` to use its key without asking, and add Apple's Developer ID intermediate certificate:

    ```bash
    KC=~/Library/Keychains/gnollhack-signing.keychain-db
    security unlock-keychain -p "$(cat ~/.gnollhack/signing-keychain-password)" "$KC"
    security import ~/DeveloperIDMac/Certificates.p12 -k "$KC" -T /usr/bin/codesign
    security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k "$(cat ~/.gnollhack/signing-keychain-password)" "$KC" > /dev/null
    curl -fsSL -o /tmp/DeveloperIDG2CA.cer https://www.apple.com/certificateauthority/DeveloperIDG2CA.cer && security import /tmp/DeveloperIDG2CA.cer -k "$KC"
    ```

    The import asks for the `.p12` password. Run `set-key-partition-list` only after the import has succeeded: it applies to the keys in the keychain at that moment. Apple's Developer ID G2 intermediate certificate lets `codesign` build the chain from your certificate to Apple's root.

### 4. Store the Notarization Credentials

The Account Holder or an Admin creates an API key in [App Store Connect](https://appstoreconnect.apple.com): **Users and Access → Integrations → App Store Connect API → Team Keys → +**, with **Developer** access. If the page asks you to request access first, the Account Holder must do that once. Download the key's `AuthKey_<Key ID>.p8` file and move it in Finder to `~/DeveloperIDMac`; Apple lets you download it only once. The **Key ID** is in the keys table, and the **Issuer ID** is shown above it. Then:

```bash
security unlock-keychain -p "$(cat ~/.gnollhack/signing-keychain-password)" ~/Library/Keychains/gnollhack-signing.keychain-db
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

Build releases from a clean working tree: `BUILD-INFO` records the commit, and adds `-dirty` when there are uncommitted changes. After the native build in step 2 of [[Building|#building]]:

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacPackage.ps1 -Targets App,Dmg -SigningIdentity "Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)" -NotaryProfile gnollhack-notary
```

For Steam, add the `Steam` target and the IDs from [[Steam Upload|#steam-upload]]. `-SteamBranch` names a beta branch, or is left out: Steam cannot set the default branch live from a build script.

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacPackage.ps1 -Targets App,Dmg,Steam -SigningIdentity "Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)" -NotaryProfile gnollhack-notary -SteamAppId 3558190 -SteamDepotId 3558193 -BuildDescription '<description>'
```

The script signs every program file of the app with the hardened runtime, sends the app and the DMG to Apple for notarization, and staples Apple's ticket to both. It stops if Apple rejects either, and prints Apple's log of the problems. Uploading and notarizing take several minutes.

The results are copied to `win\win32\xpl\GnollHackM\bin\MacPackages\<version>-<build>\`:

- `GnollHack-<version>-macos-arm64.dmg`: the download, with the app and a link to Applications;
- `GnollHack-<version>-macos-arm64.zip`: the zipped app;
- `SHA256SUMS`, and `BUILD-INFO` with the commit, the signing identity and Apple's notarization submission ids;
- with the `Steam` target, `steam\`: the depot content in `steam\content\` and the build scripts `app_build_mac.vdf` and `depot_build_mac.vdf`.

Both the app and the DMG are notarized: the app for the zip and the Steam depot, the DMG for the download. A build of the same version and build number replaces the previous one, on the Mac and in this folder, Steam content included, so upload it, or keep a copy, before you build again.

> 💡 **Tip:** The script checks the stapled app with Gatekeeper itself, and stops with `GNHMP111` if it is rejected. Before publishing, test the DMG as a player gets it: download it onto a Mac through a browser, open it, drag the game to Applications and start it. macOS must only ask whether to open an app downloaded from the Internet. In Terminal, `spctl --assess --type open --context context:primary-signature -vv <file>.dmg` must say `source=Notarized Developer ID`.

## 🎮 Steam Upload

The script never uploads anything. Steamworks needs these settings, once:

- a **macOS depot** under **SteamPipe → Depots**, with macOS as its operating system. Its ID is `-SteamDepotId`;
- that depot added to the app's **packages**, the store package and any beta or developer package. Without this, Steam installs nothing for it;
- a **launch option** under **Installation → General Installation**: executable `GnollHack.app`, arguments `-store steam`, operating system macOS. The arguments tell the game that Steam started it. With them, Steam starts the game's executable inside the bundle directly;
- under **Supported Operating Systems**, **macOS** with **64 Bit Binaries Included** and **App Bundles Are Notarized**, for Apple Silicon only. Tick macOS for the store only when the release is ready;
- the store page's macOS requirements: macOS 15 or later on a Mac with Apple Silicon.

The build with the `Steam` target puts the depot content in `steam\content\` next to the other results on Windows, with the build scripts `app_build_mac.vdf` and `depot_build_mac.vdf` beside it. The script checks every file against the Mac's copy. Upload it as you upload the other depots, with ContentBuilder or `steamcmd` on Windows:

```powershell
steamcmd +login <Steam user> +run_app_build "<results>\steam\app_build_mac.vdf" +quit
```

A depot uploaded from Windows installs with every file marked executable, which macOS needs for the game's program files; the code signature does not cover file permissions, so the app stays valid. The same content is also on the Mac in `~/gnollhack-build/package/<version>-<build>/steam`, for an upload with `steamcmd` there.

> 📢 **Important:** A beta branch build must also list the current Windows and Linux depots in `app_build_mac.vdf`, so that their players on that branch keep a working game. The template has a comment at the right place.

## ❓ Troubleshooting

| Problem | Solution |
|:--|:--|
| `errSecInternalComponent` when signing, or `GNHMP106` | `codesign` cannot use the private key. Check, in order: step 3's `set-key-partition-list` ran after the import (run it again); `security find-identity -v -p codesigning ~/Library/Keychains/gnollhack-signing.keychain-db` lists the identity; and you signed through the build script. Signing by hand over SSH fails, because the login keychain is locked there and its copy of the identity is found first. The script unlocks the signing keychain and puts it first in the search list while it signs, then restores the order. |
| `keychainLocked` from `notarytool`, or `GNHMP108` | `notarytool` used the locked login keychain, usually when run by hand over SSH. Use the build script, or unlock the signing keychain and pass `--keychain` as in step 5. |
| `GNHMP114` | The signing keychain or its password file does not exist. Do steps 2–4 of the signing setup. |
| `GNHMP115` | The password file does not unlock the keychain. If the password is lost, delete the keychain with `security delete-keychain ~/Library/Keychains/gnollhack-signing.keychain-db` and do steps 2–4 again from the `.p12` and `.p8` backups. |
| `A keychain with the same name already exists` in step 2 | The keychain exists already. Continue with step 3, or delete it as for `GNHMP115` to start over. |
| `unable to build chain to self-signed root` when signing | Apple's Developer ID G2 intermediate certificate is not in the signing keychain. Run the last command of step 3 again. |
| `The specified item could not be found in the keychain` when signing | The name in `-SigningIdentity` does not match the certificate. Copy it from `security find-identity`. |
| `No Keychain password item found for profile: gnollhack-notary` | Step 4 of the signing setup has not been done for the signing keychain. |
| "Operation not permitted" in Terminal | Terminal may not read the Desktop or Downloads. Move the file in Finder to a folder of your own. Do not give Terminal Full Disk Access for this. |
| `GNHMP109`: notarization ended as `Invalid` | Apple's log is printed above the error. It names the file that is not signed correctly. |
| `GNHMP110`: stapling failed after an accepted notarization | Apple's ticket may not be available yet. Wait a few minutes and run the build again. |
| `GNHMP112`: `hdiutil` failed | A GnollHack volume from an earlier DMG is still mounted, or the Mac's disk is full. Eject it in Finder, or free space: a build uses about 3 GB in `~/gnollhack-build`. |
| "GnollHack cannot be opened" or "is damaged" on another Mac | The app was signed ad hoc. Make a release build with the Developer ID identity and notarization. |
| `GNHMP002`: `libgnollhackmac.dylib`, `nhdat` or the icon is missing | Do step 2 of [[Building|#building]]. For the icon, run `New-MacAppIcon.ps1`. |
| `GNHMP004` | `-Targets Steam` without `-SteamAppId` and `-SteamDepotId`, or `-NotaryProfile` without a Developer ID `-SigningIdentity`. |
| `GNHMP005` | A path or the SSH alias contains a space or another character the script does not accept. The alias may not contain `@`. |
| `GNHMP006` | `dotnet publish` failed; its errors are above. A missing tile set or sound bank shows as `GNHNI002` or `GNHNI003`. |
| `GNHMP008` or `GNHAB006`: cannot connect to the Mac | The Mac is asleep, Remote Login is off, or the SSH key is not set up. See [[/Development/Set Up SSH Access to the Mac for Native Libraries]]. |
| `GNHMP010` | Packaging on the Mac failed. The `GNHMP1nn` error above it names the step. |
| `GNHMP012` | A file of the Steam content differs after the copy to Windows. Run the build again. |
| The game started from Steam is not treated as the Steam version | The launch option has no arguments. Set them to `-store steam`. |
| `steamcmd` asks for a Steam Guard code or reports a login failure | Enter the code from the Steam Guard email or the Steam Mobile App. Valve's upload documentation describes `set_steam_guard_code`. |

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
- [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD)
