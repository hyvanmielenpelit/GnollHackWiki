> 👉 **These instructions build the macOS version of GnollHack on a Windows computer: a signed and notarized `GnollHack.app` for Apple Silicon Macs, as a DMG download and as Steam depot content. A Mac, reached over SSH, builds the game engine, signs the app and sends it to Apple for notarization.**

For what the Avalonia port is, see [[/Development/Avalonia Port]]. How the macOS version works inside, and why it is built this way, is on [[/Development/Design Details of macOS Avalonia Port]].

| Goal | Sections |
|:-----|:---------|
| **Build and test an app on the Mac** | 1.1 and 1.2, then 2 and 3 |
| **Set up signing, once** | 4 |
| **Release a new version** | 5, then 6 |
| **Rebuild the app icon or the native crash reporter** | 7 |

## 1. Prerequisites

### 1.1. Devices

- **Windows computer** with an x64 processor, as for the [[Linux version|/Development/Build Instructions for Avalonia Linux Version on Windows#1-1-devices]].
- **Mac with Apple Silicon** running macOS 15 or later, with Xcode installed. It compiles the game engine, signs and notarizes the app, and runs it for testing. .NET 11 does not run on older macOS versions, and the release is for Apple Silicon only.
- Sign in to the Mac as the user that the SSH alias logs in as: the build folders and the signing keychain are in that user's home folder.

### 1.2. Software

**1.2.1. Install Visual Studio 2026** as described in [[/Development/Install Visual Studio 2026 for .NET MAUI Development]], with the **Linux and embedded development with C++** workload. The game data is compiled by Visual Studio Linux projects in WSL.

**1.2.2. Install the .NET SDK of the Avalonia port.** Its version is `sdk.version` in `win\win32\xpl\GnollHackM\Platforms\Avalonia\global.json`, and is newer than that of the other modern clients. Download that version from the [.NET download page](https://dotnet.microsoft.com/en-us/download/dotnet) and install it. It can be a preview or a release candidate.

**1.2.3. Install the .NET MAUI workload** from the same folder, so that the workload version pinned in `global.json` is used:

```powershell
cd win\win32\xpl\GnollHackM\Platforms\Avalonia
dotnet workload install maui
```

**1.2.4. Clone the [GnollHack repository](https://github.com/hyvanmielenpelit/GnollHack)** as described in [[/Development/Clone Repository in Visual Studio]].

**1.2.5. Install the tile sets and the Desktop sound banks** as described in [[/Development/Install Tile Sets and FMOD Sound Banks]].

**1.2.6. Install the secrets file** as described in [[/Development/Install Secrets File]]. A release needs the team's own secrets file, which a team member gives you: the template on that page has empty values, which turn off crash reporting and the game's online services.

**1.2.7. Set up a WSL distribution as Visual Studio's Linux build host** with steps 1.3.1 to 1.3.3 of [[WSL Distribution|/Development/Build Instructions for Avalonia Linux Version on Windows#1-3-wsl-distribution]]. The glibc sysroot and the AppImage tools on that page are only for the Linux version.

**1.2.8. Prepare the Mac** as in [[Prepare the Mac|/Development/Building iOS and macOS Native Libraries over SSH#1-prepare-the-mac]]: install Xcode, accept its license, turn on Remote Login, and keep the Mac awake while you build.

**1.2.9. Set up SSH access to the Mac** as described in [[/Development/Set Up SSH Access to the Mac for Native Libraries]]. The packaging uses the same host alias, `gnollhack-mac`, as the engine build.

✅ The command in [[Test the Connection|/Development/Set Up SSH Access to the Mac for Native Libraries#5-test-the-connection]] prints two paths, one ending in `iPhoneOS<version>.sdk` and one in `MacOSX<version>.sdk`, without asking for anything.

### 1.3. Apple Developer Account

Test builds need none of this. Releases are signed with the **Developer ID Application** certificate of the team Hyvan mielen pelit ry (Team ID `CUG8RS847T`) and notarized by Apple. You do not enroll or pay yourself: the team's Account Holder or an Admin invites you under **Users and Access** in App Store Connect. [[/Development/Enroll for Apple Development Program (Mac)]] is only for creating a new team.

- Only the **Account Holder** can create the Developer ID certificate.
- The Account Holder or an **Admin** creates the App Store Connect API key for notarization.
- After the one-time [[Signing Setup on the Mac|#4-signing-setup-on-the-mac]], builds need no Apple account: everything is in the signing keychain on the Mac.

## 2. Building a Test App

Run the commands from the repository root in PowerShell, unless a step says otherwise.

### 2.1. Start the SSH Server in WSL

Start the SSH server in the WSL distribution. It must run while the native solution builds:

```powershell
wsl -u root -e /usr/sbin/service ssh start
```

### 2.2. Build the Native Solution

The **macOS** solution platform compiles the game data in WSL, the same `nhdat` file as the Android and Linux versions, and then the game engine `libgnollhackmac.dylib` on the Mac. How the Mac build works is on [[/Development/Building iOS and macOS Native Libraries over SSH]]. Repeat this section whenever the C code or the game data in `dat\` changes.

**2.2.1. Open `win\win32\vs\GnollHack.sln`** as described in [[/Development/Open GnollHack Solution in Visual Studio]].

**2.2.2. Select the macOS solution platform and the Release configuration.**

**2.2.3. Build the solution.** Or, from the command line, with the 64-bit MSBuild that Visual Studio itself uses:

```powershell
$msbuild = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\amd64\MSBuild.exe
& $msbuild win/win32/vs/GnollHack.sln /t:Build /p:Configuration=Release /p:Platform=macOS
```

**2.2.4. Check the results.** ✅ These files exist under `win\win32\xpl\GnollHackM\Platforms\`:

- `Android\gnh\nhdat`
- `MacOS\libs\libgnollhackmac.dylib`, with `libgnollhackmac.dylib.dSYM` beside it

> ⚠️ **Warning:** Every build, Debug or Release, copies its game engine to `Platforms\MacOS\libs\`, and the packages ship whichever engine is there. You can test either configuration, but build Release last before a release.

### 2.3. Build the Test App

**2.3.1. Run the packaging script** with the test options:

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacPackage.ps1 -Targets App -DevCopy -NoSentryUpload
```

It publishes the game for `osx-arm64` as a single executable, copies it to the Mac, and builds `GnollHack.app` there, laid out as described in [[App Bundle|/Development/Design Details of macOS Avalonia Port#app-bundle]]. Without signing options, the app is signed *ad hoc*: it runs on the Mac that built it, but not on other Macs. Its options are in [[Packaging Script Options|#packaging-script-options]].

✅ The script ends with `Test copy: ~/gnollhack-dev/GnollHack.app`, where `-DevCopy` put the app on the Mac.

> ℹ️ **Note:** If the `SENTRY_AUTH_TOKEN` environment variable is set, the publish uploads the debug symbols of the release to Sentry, including the game engine's `.dSYM`. `-NoSentryUpload` keeps a test build from uploading.

## 3. Testing on the Mac

**3.1. Start the test app** at the Mac: double-click `GnollHack.app` in the `gnollhack-dev` folder of your home folder. It was made on this Mac, so Gatekeeper does not stop it. Never start the game over SSH: its window and alerts open on the screen of whoever is at the Mac.

**3.2. Find the saved games and the log** on the Mac:

| File | Location |
|:-----|:---------|
| **Saved games and settings** | `~/Library/Application Support/GnollHack` |
| **Log** | `~/Library/Logs/GnollHack/GnollHack.log`, written when the game is not started from Terminal. Console.app also shows it |
| **Log of the previous run** | `~/Library/Logs/GnollHack/GnollHack.previous.log` |

**3.3. Check crash reporting** by starting the game once in Terminal on the Mac with a test message. It needs the team's secrets file in the build, or a DSN in the `SENTRY_DSN` environment variable for that run:

```bash
GNOLLHACK_SENTRY_TEST=1 ~/gnollhack-dev/GnollHack.app/Contents/MacOS/GnollHackM
```

✅ The event appears in Sentry as "Sentry test from …" with the tag `macos.package=bundle`.

To check native crash reports, build the engine in Debug, the only configuration with `#crashtest`, then start a wizard-mode game and use `#crashtest`. The report reaches Sentry at the next start.

## 4. Signing Setup on the Mac

This setup is done once, by a team member with access to the Apple Developer account, in **Terminal on the Mac**. Sign in to the Mac as the user that the SSH alias `gnollhack-mac` logs in as: the signing keychain is in that user's home folder.

An SSH session cannot use the login keychain, which stays locked there, so signing over SSH would fail with `errSecInternalComponent`. The certificate and the notarization credentials therefore go into a **signing keychain** of their own, whose password is in a file only your user can read. The build script unlocks that keychain for each build; your login password is never used.

> 🛑 **Caution:** These steps are for a person at the Mac. An AI agent must never run them, read `~/.gnollhack/signing-keychain-password`, or handle the `.p12`, the `.p8` or any password. Once the setup is done, the build script uses the signing keychain without anyone typing a password.

> ⚠️ **Warning:** Terminal may not read files on the Desktop or in Downloads. A command that reads a file there stops with "Operation not permitted". Keep the certificate and key files in a folder of your own, for example `~/DeveloperIDMac`, and move them there in Finder.

### 4.1. Create the Developer ID Certificate

The team's **Account Holder** does this, on the Mac you sign on: the certificate's private key is made there, and leaves it only in the `.p12` backup of step 4.3.1. The **Apple Development** and **Apple Distribution** certificates of the iOS version cannot sign a Mac app for download. Apple allows only five Developer ID Application certificates per team, so for another Mac, import the `.p12` instead of making a new certificate.

> ⚠️ **Warning:** Do not create the certificate with Xcode's **Manage Certificates**. Depending on your role, Xcode makes a cloud-managed certificate whose private key stays with Apple and cannot be exported, so the build could not use it.

**4.1.1. Make a certificate request.** Open **Keychain Access** (Spotlight: `Cmd+Space`, then type `Keychain Access`) and choose **Keychain Access → Certificate Assistant → Request a Certificate From a Certificate Authority…**. Enter your email address and a name such as `GnollHack Developer ID`, leave the CA email address empty, choose **Saved to disk**, and save the `.certSigningRequest` file in `~/DeveloperIDMac`.

**4.1.2. Create the certificate** on [developer.apple.com](https://developer.apple.com/account): open **Certificates, Identifiers & Profiles → Certificates → +**, select **Developer ID Application**, choose the **G2 Sub-CA** profile type, upload the request file, and download the `.cer` file.

**4.1.3. Install the certificate** by double-clicking the `.cer` file on the same Mac. Keychain Access puts it in the **login** keychain, beside the private key that the request made.

**4.1.4. Check the certificate:**

```bash
security find-identity -v -p codesigning
```

✅ The list contains `Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)`.

### 4.2. Create the Signing Keychain

Run these in one Terminal window:

```bash
mkdir -p ~/.gnollhack && chmod 700 ~/.gnollhack
openssl rand -base64 32 > ~/.gnollhack/signing-keychain-password && chmod 600 ~/.gnollhack/signing-keychain-password
KC=~/Library/Keychains/gnollhack-signing.keychain-db
security create-keychain -p "$(cat ~/.gnollhack/signing-keychain-password)" "$KC"
security set-keychain-settings "$KC"
security list-keychains -d user -s $(security list-keychains -d user | tr -d '"') "$KC"
```

`set-keychain-settings` without options turns off automatic locking, so the keychain stays unlocked until the Mac restarts; the build unlocks it again each time. The last command adds the keychain to your search list, so that Keychain Access and `security find-identity` show it.

### 4.3. Copy the Certificate into It

**4.3.1. Export the certificate.** In **Keychain Access**, open **login → My Certificates**, right-click **Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)** and choose **Export…**. Save it as `~/DeveloperIDMac/Certificates.p12` with a password. Keep this file as a backup; see section 4.6.

**4.3.2. Import it into the signing keychain**, allow `codesign` to use its key without asking, and add Apple's Developer ID G2 intermediate certificate, which `codesign` needs to build the chain to Apple's root:

```bash
KC=~/Library/Keychains/gnollhack-signing.keychain-db
security unlock-keychain -p "$(cat ~/.gnollhack/signing-keychain-password)" "$KC"
security import ~/DeveloperIDMac/Certificates.p12 -k "$KC" -T /usr/bin/codesign
security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k "$(cat ~/.gnollhack/signing-keychain-password)" "$KC" > /dev/null
curl -fsSL -o /tmp/DeveloperIDG2CA.cer https://www.apple.com/certificateauthority/DeveloperIDG2CA.cer && security import /tmp/DeveloperIDG2CA.cer -k "$KC"
```

The import asks for the `.p12` password. Run `set-key-partition-list` only after the import has succeeded: it applies to the keys in the keychain at that moment.

### 4.4. Store the Notarization Credentials

**4.4.1. Create an API key.** The Account Holder or an Admin creates it in [App Store Connect](https://appstoreconnect.apple.com): **Users and Access → Integrations → App Store Connect API → Team Keys → +**, with **Developer** access. If the page asks you to request access first, the Account Holder must do that once. Download the key's `AuthKey_<Key ID>.p8` file, which Apple lets you download only once, and move it in Finder to `~/DeveloperIDMac`. The **Key ID** is in the keys table, and the **Issuer ID** is shown above it.

**4.4.2. Store the credentials** in the signing keychain:

```bash
security unlock-keychain -p "$(cat ~/.gnollhack/signing-keychain-password)" ~/Library/Keychains/gnollhack-signing.keychain-db
xcrun notarytool store-credentials gnollhack-notary --keychain ~/Library/Keychains/gnollhack-signing.keychain-db --key ~/DeveloperIDMac/AuthKey_<Key ID>.p8 --key-id <Key ID> --issuer <Issuer ID>
```

✅ It checks the key with Apple and ends with "Credentials saved to Keychain".

### 4.5. Check the Setup

On the Mac, these must work:

```bash
security unlock-keychain -p "$(cat ~/.gnollhack/signing-keychain-password)" ~/Library/Keychains/gnollhack-signing.keychain-db
security find-identity -v -p codesigning ~/Library/Keychains/gnollhack-signing.keychain-db
xcrun notarytool history --keychain-profile gnollhack-notary --keychain ~/Library/Keychains/gnollhack-signing.keychain-db
```

From Windows, the release build of section 5 is the full check.

### 4.6. Back Up the Credentials

| Item | What it is for | Where to find it | Backup |
|:--|:--|:--|:--|
| **Team ID** | Part of the signing identity's name, `(CUG8RS847T)` | developer.apple.com → Account → Membership details | Not secret |
| **Developer ID Application certificate** | Signs the app and the DMG | Certificates, Identifiers & Profiles → Certificates | Covered by the `.p12` |
| **`Certificates.p12` and its password** | The certificate with its private key, from step 4.3.1 | `~/DeveloperIDMac` | In the team's secure storage, such as a password manager. Without it, another Mac needs a new certificate |
| **API key `AuthKey_<Key ID>.p8`** | Lets `notarytool` send builds to Apple | App Store Connect → Users and Access → Integrations → App Store Connect API → Team Keys. It can be downloaded only once | In the team's secure storage, with its Key ID and Issuer ID. If it is lost, revoke the key and make a new one |
| **Key ID** | Names the API key | The Team Keys table | With the `.p8` |
| **Issuer ID** | Names the team's API account | Above the Team Keys table | With the `.p8` |
| **Signing keychain password** | Lets the build unlock the signing keychain | `~/.gnollhack/signing-keychain-password`, made in section 4.2 | None needed: if it is lost, make a new keychain with sections 4.2 to 4.4 |
| **SSH alias `gnollhack-mac`** | Lets the Windows computer reach the Mac | `%USERPROFILE%\.ssh\config` on Windows. Its `HostName` line is the Mac's address, the only place it is entered | — |
| **Steam app ID and macOS depot ID** | Fill in the SteamPipe build scripts | Steamworks → the app → SteamPipe → Depots | Not secret |

When the setup works, move the `.p12`, the `.p8` and the request file into the team's secure storage, and delete them from `~/DeveloperIDMac`: the signing keychain holds everything the build needs.

## 5. Release Build

**5.1. Build the native solution in Release from a clean working tree**, as in sections 2.1 and 2.2. `BUILD-INFO` records the commit, and adds `-dirty` when there are uncommitted changes.

**5.2. Run the packaging script** with the Developer ID identity and the notarization profile:

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacPackage.ps1 -Targets App,Dmg -SigningIdentity "Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)" -NotaryProfile gnollhack-notary
```

Or, for Steam too, add the `Steam` target and the app and depot IDs:

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacPackage.ps1 -Targets App,Dmg,Steam -SigningIdentity "Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)" -NotaryProfile gnollhack-notary -SteamAppId 3558190 -SteamDepotId 3558193 -BuildDescription '<description>'
```

`-SteamBranch` names a beta branch, or is left out: Steam cannot set the default branch live from a build script.

The script signs every program file of the app with the hardened runtime, sends the app and the DMG to Apple for notarization, and staples Apple's ticket to both. It stops if Apple rejects either, and prints Apple's log of the problems. Uploading and notarizing take several minutes.

**5.3. Check the results.** ✅ They are in `win\win32\xpl\GnollHackM\bin\MacPackages\<version>-<build>\`, where the version and the build are `ApplicationDisplayVersion` and `ApplicationVersion` from `GnollHackM.csproj`:

| Output | Contents |
|:-------|:---------|
| **GnollHack-&lt;version&gt;-macos-arm64.dmg** | The download, with the app and a link to Applications |
| **GnollHack-&lt;version&gt;-macos-arm64.zip** | The zipped app |
| **SHA256SUMS** | Checksums of the DMG and the zip |
| **BUILD-INFO** | The commit, the signing identity and Apple's notarization submission IDs |
| **steam\\** | With the `Steam` target: the depot content in `steam\content\`, and the build scripts `app_build_mac.vdf` and `depot_build_mac.vdf` |

Both the app and the DMG are notarized: the app for the zip and the Steam depot, the DMG for the download.

> ⚠️ **Warning:** A build of the same version and build number replaces the previous one, on the Mac and in this folder, Steam content included. Upload it, or keep a copy, before you build again.

**5.4. Test the DMG as a player gets it** before publishing: download it onto a Mac through a browser, open it, drag the game to Applications and start it. macOS must only ask whether to open an app downloaded from the Internet. ✅ In Terminal, this says `source=Notarized Developer ID`:

```bash
spctl --assess --type open --context context:primary-signature -vv <file>.dmg
```

## 6. Steam Upload

The script never uploads anything.

**6.1. Check the Steamworks settings**, once:

- a **macOS depot** under **SteamPipe → Depots**, with macOS as its operating system. Its ID is `-SteamDepotId`;
- that depot added to the app's **packages**, the store package and any beta or developer package. Without this, Steam installs nothing for it;
- a **launch option** under **Installation → General Installation**: executable `GnollHack.app`, arguments `-store steam`, operating system macOS. The arguments tell the game that Steam started it, and Steam starts the game's executable inside the bundle directly;
- under **Supported Operating Systems**, **macOS** with **64 Bit Binaries Included** and **App Bundles Are Notarized**, for Apple Silicon only. Tick macOS for the store only when the release is ready;
- the store page's macOS requirements: macOS 15 or later on a Mac with Apple Silicon.

> 📢 **Important:** A beta branch build must also list the current Windows and Linux depots in `app_build_mac.vdf`, so that their players on that branch keep a working game. The template has a comment at the right place.

**6.2. Upload the content** with ContentBuilder or `steamcmd` on Windows, from `<results>\steam\`, where `<results>` is the folder of step 5.3. The script has checked every file there against the Mac's copy:

```powershell
steamcmd +login <Steam user> +run_app_build "<results>\steam\app_build_mac.vdf" +quit
```

A depot uploaded from Windows installs with every file marked executable, which macOS needs for the game's program files. The code signature does not cover file permissions, so the app stays valid. Or upload with `steamcmd` on the Mac, from `~/gnollhack-build/package/<version>-<build>/steam`.

## 7. Maintenance

**7.1. Rebuild the app icon** when either layer of the iOS icon, the gradient or the shield, changes, and commit the image:

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\New-MacAppIcon.ps1
```

It composes `Resources\AppIcon\macOS\appicon-macos.png` in `GnollHackM` from the two layers, as the rounded square that macOS expects. The packaging turns it into `GnollHack.icns`.

**7.2. Rebuild the native crash reporter** `Platforms\MacOS\libs\libgnhsentry.dylib` after a Sentry upgrade, or after an edit of `gnhsentry.def` in `win\win32\xpl\gnhsentrywin\` or of `gnhsentry.exports` in `Platforms\MacOS\Packaging\`. Follow `win\win32\xpl\gnhsentrywin\README.md`, which runs:

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacSentryNative.ps1
```

It links `libsentry-native.a` from the Sentry NuGet package into a universal arm64 and x86_64 dylib on the Mac, over the same SSH alias as the packaging, checks it, and copies it back with sentry-native's license to `Platforms\MacOS\licenses\sentry-native\`. It downloads nothing: GnollHackM must have been restored first, so that the Sentry package is in the NuGet package folder. Its errors are printed as `Build-MacSentryNative.ps1 : error GNHMS0nn: ...`.

It also writes `libgnhsentry.build.props` beside the library, which every macOS build of GnollHackM checks against the Sentry package: a mismatch is an error in a Release publish or a package build, and a warning otherwise.

## ⚙️ Packaging Script Options

The parameters of `Build-MacPackage.ps1`:

| Parameter | Effect |
|:----------|:-------|
| **-Targets** | `App` (the zipped `GnollHack.app`), `Dmg`, `Steam`, or several separated by commas. Default: `App`. |
| **-SigningIdentity** | The `codesign` identity, `"Developer ID Application: Hyvan mielen pelit ry (CUG8RS847T)"` for a release. Default: `-`, ad hoc signing, for builds that run only on the Mac that made them. |
| **-NotaryProfile** | The `notarytool` keychain profile on the Mac, `gnollhack-notary` from section 4.4. Needs a Developer ID `-SigningIdentity`. Default: empty, no notarization. |
| **-Keychain** | The keychain on the Mac with the identity and the notarization profile, used when `-SigningIdentity` is not `-`. Default: `~/Library/Keychains/gnollhack-signing.keychain-db`. Normally not changed: an empty value passes no keychain, and signing over SSH then fails on the locked login keychain. |
| **-KeychainPasswordFile** | The file on the Mac with the signing keychain's password. Default: `~/.gnollhack/signing-keychain-password`. Normally not changed. |
| **-BundleId** | The bundle identifier, `CFBundleIdentifier`. Default: `com.soundmindgames.GnollHackMac`. Normally not changed. |
| **-SteamAppId**, **-SteamDepotId** | The Steam app ID and the macOS depot ID. Required with the `Steam` target. |
| **-SteamBranch** | The branch the Steam build is set live on. Default: empty, which sets nothing live. |
| **-BuildDescription** | The Steam build description. |
| **-SkipPublish** | Packages the previous publish in `<OutputRoot>\stage\publish\` instead of publishing again. |
| **-NoSentryUpload** | Publishes without uploading debug symbols to Sentry. Has no effect with `-SkipPublish`. |
| **-DevCopy** | Also copies the app to `~/gnollhack-dev/GnollHack.app` on the Mac, for testing. |
| **-SshHost** | The SSH host alias of the Mac. Default: the environment variable `GNOLLHACK_MAC_SSH_HOST`, else `gnollhack-mac`. |
| **-RemoteRoot** | The working folder on the Mac, relative to the home folder. Default: `gnollhack-build`. |
| **-OutputRoot** | The folder that receives the `<version>-<build>` folder of results. Default: `win\win32\xpl\GnollHackM\bin\MacPackages`. |

For example, to package the previous publish again as a test app:

```powershell
win\win32\xpl\GnollHackM\Platforms\MacOS\Packaging\Build-MacPackage.ps1 -Targets App -DevCopy -SkipPublish
```

## ❓ Troubleshooting

For general build problems, such as a locked file, see [[/Development/Troubleshooting Building GnollHack with .NET MAUI]]. The packaging script prints its errors as `Build-MacPackage.ps1 : error GNHMP0nn: ...`, and the packaging on the Mac prints its own as `package-mac.sh : error GNHMP1nn: ...`.

### 🔧 Native Build and the Mac

| Problem | Fix |
|:--------|:----|
| **`GNHMP008`** or **`GNHAB006`**: cannot connect to the Mac, or another **`GNHAB`** error | See [[Troubleshooting|/Development/Building iOS and macOS Native Libraries over SSH#troubleshooting]], and [[/Development/Set Up SSH Access to the Mac for Native Libraries]], which also tells where to enter a new address for the Mac. |
| **`GNHMP001`**: `ssh`, `scp` or `tar` was not found | Install the **OpenSSH Client** under **Settings → System → Optional features**. |
| **`GNHMP002`**: `libgnollhackmac.dylib`, `nhdat` or the icon is missing | Do section 2.2. For the icon, do step 7.1. |
| **`GNHNI001`** | The game engine or the game data has not been built. Do section 2.2. |
| **`GNHMP005`** | A path or the SSH alias contains a space or another character the script does not accept. The alias may not contain `@`. |
| **`GNHMP009`**: preparing the folder on the Mac, or copying or unpacking the stage there, failed | The connection dropped, or the Mac's disk is full; `df -h ~` on the Mac shows the free space. A build uses about 3 GB in `~/gnollhack-build`. Run the build again. |
| **`GNHMP011`**: copying the results back failed | The connection dropped. Run the build again, or copy the results from `~/gnollhack-build/package/<version>-<build>/` on the Mac. |

### 🔧 Packaging

| Problem | Fix |
|:--------|:----|
| **`A compatible .NET SDK was not found`** | The SDK pinned in `Platforms\Avalonia\global.json` is not installed. Do step 1.2.2. |
| **`NETSDK1147`**: a workload must be installed | The .NET MAUI workload was installed from another folder, so for another SDK. Do step 1.2.3. |
| **`GNHNI002`** or **`GNHNI003`** | A sound bank or tile set file is missing. Do step 1.2.5. |
| **`GNHMP003`**: `ApplicationDisplayVersion or ApplicationVersion was not found in GnollHackM.csproj` | The script takes the version and the build number from these two properties. Check that `GnollHackM.csproj` has both, each with a value. |
| **`GNHMP004`**, or **`GNHMP103`**: `notarization needs a Developer ID identity, not ad-hoc signing` | `-Targets Steam` without `-SteamAppId` and `-SteamDepotId`, or `-NotaryProfile` without a Developer ID `-SigningIdentity`. See [[Packaging Script Options|#packaging-script-options]]. |
| **`GNHMP006`** | `dotnet publish` failed; its errors are above. |
| **`GNHMP007`**: packing the stage failed | `tar` could not pack the publish; its message above the error gives the reason. |
| **`GNHMP010`** | Packaging on the Mac failed. The `GNHMP1nn` error above it names the step. |
| **`GNHMP102`**: `.../GnollHackM is missing`, or a packaging file is missing | The stage copied to the Mac is incomplete. Run the build again without `-SkipPublish`. |
| **`GNHMP104`**: `the generated Info.plist is not valid` | Check any edit to `Platforms\MacOS\Packaging\Info.plist.template`, and the `-BundleId` value. |
| **`GNHMP105`**: `iconutil could not make the icon` | `appicon-macos.png` cannot be turned into an icon. Make it again with step 7.1. |
| **`GNHMP112`**: `hdiutil` failed | A GnollHack volume from an earlier DMG is still mounted, or the Mac's disk is full. Eject it in Finder, or free space: a build uses about 3 GB in `~/gnollhack-build`. |
| **`GNHSN021`** to **`GNHSN026`** errors or warnings about `libgnhsentry.dylib` | `libgnhsentry.dylib` does not match the Sentry version the project uses. Do step 7.2. For a local test build only, `-p:GnhAllowStaleSentryNative=true` turns the errors into warnings. |

### 🔧 Signing and Notarization

| Problem | Fix |
|:--------|:----|
| **`errSecInternalComponent`** when signing, or **`GNHMP106`** | `codesign` cannot use the private key. Check, in order: the `set-key-partition-list` of step 4.3.2 ran after the import (run it again); `security find-identity -v -p codesigning ~/Library/Keychains/gnollhack-signing.keychain-db` lists the identity; and you signed through the build script. Signing by hand over SSH fails, because the login keychain is locked there and its copy of the identity is found first. |
| **`keychainLocked`** from `notarytool`, or **`GNHMP108`** | `notarytool` used the locked login keychain, usually when run by hand over SSH. Use the build script, or unlock the signing keychain and pass `--keychain` as in section 4.5. |
| **`GNHMP114`** | The signing keychain or its password file does not exist. Do sections 4.2 to 4.4. |
| **`GNHMP115`** | The password file does not unlock the keychain. If the password is lost, delete the keychain with `security delete-keychain ~/Library/Keychains/gnollhack-signing.keychain-db` and do sections 4.2 to 4.4 again from the `.p12` and `.p8` backups. |
| **`A keychain with the same name already exists`** in section 4.2 | The keychain exists already. Continue with section 4.3, or delete it as for `GNHMP115` to start over. |
| **`unable to build chain to self-signed root`** when signing | Apple's Developer ID G2 intermediate certificate is not in the signing keychain. Run the last command of step 4.3.2 again. |
| **`The specified item could not be found in the keychain`** when signing | The name in `-SigningIdentity` does not match the certificate. Copy it from `security find-identity`, as in section 4.5. |
| **`No Keychain password item found for profile: gnollhack-notary`** | The notarization credentials are not in the signing keychain. Do section 4.4. |
| **"Operation not permitted"** in Terminal | Terminal may not read the Desktop or Downloads. Move the file in Finder to a folder of your own. Do not give Terminal Full Disk Access for this. |
| **`GNHMP107`**: `codesign --verify rejects the bundle` | The signed app fails `codesign`'s strict check. Its message above the error names the file. |
| **`GNHMP109`**: notarization ended as `Invalid` | Apple's log is printed above the error. It names the file that is not signed correctly. |
| **`GNHMP110`**: stapling failed after an accepted notarization | Apple's ticket may not be available yet. Wait a few minutes and run the build again. |
| **`GNHMP111`**: `Gatekeeper rejects the stapled app` | Apple notarized the app, but Gatekeeper on the Mac does not accept it; the `spctl` message above the error gives the reason. Do not publish the build. |

### 🔧 Testing and Steam

| Problem | Fix |
|:--------|:----|
| **"GnollHack cannot be opened"** or **"is damaged"** on another Mac | The app was signed ad hoc. Make a release build as in section 5. |
| **`GNHMP012`** | A file of the Steam content differs after the copy to Windows. Run the build again. |
| **`GNHMP113`** | For `the steam target needs --steam-app-id and --steam-depot-id`, pass `-SteamAppId` and `-SteamDepotId` as in step 5.2. For `the Steam content could not be packed for the copy to Windows`, the `tar` message above the error gives the reason. |
| **The game started from Steam is not treated as the Steam version** | The launch option has no arguments. Set them to `-store steam`, as in step 6.1. |
| **`steamcmd` asks for a Steam Guard code or reports a login failure** | Enter the code from the Steam Guard email or the Steam Mobile App. Valve's upload documentation describes `set_steam_guard_code`. |

## 📖 Learn More

- [[/Development/Avalonia Port]]
- [[/Development/Design Details of macOS Avalonia Port]]
- [[/Development/Set Up SSH Access to the Mac for Native Libraries]]
- [[/Development/Building iOS and macOS Native Libraries over SSH]]
- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Development/Enroll for Apple Development Program (Mac)]]

## 🔗 External Links

- [Notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)
- [Developer ID](https://developer.apple.com/developer-id/)
- [Avalonia: macOS deployment](https://docs.avaloniaui.net/docs/deployment/macos)
- [SteamPipe documentation](https://partner.steamgames.com/doc/sdk/uploading)
- [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD)
