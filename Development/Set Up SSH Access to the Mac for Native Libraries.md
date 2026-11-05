> 👉 **The Windows build of GnollHack compiles the iOS and macOS engine libraries, and packages the macOS app, on a Mac over SSH. This page sets up the key-based SSH access that the build needs, once for each Windows computer.**

## 📖 Overview

When you build `GnollHack.sln` with a solution platform that includes an Apple engine library, such as **iPhone** for `libgnollhackios.a`, **macOS** for `libgnollhackmac.dylib`, or **Any CPU** for both, Visual Studio copies the engine sources to the Mac over SSH, compiles them there with Xcode's clang, and copies the library back to Windows. No `vcremote` and no PuTTY or PSCP download scripts are needed. **Pair to Mac** is still needed for the .NET MAUI iOS app itself, as described in [[/Development/Build Instructions for iOS Version on Windows (.NET MAUI)]].

The build connects to the Mac under the SSH host alias `gnollhack-mac`. It never prompts for anything, so it needs a key without a passphrase, and the Mac's host key must already be accepted.

## 📋 Prerequisites

- A Mac with [Xcode](https://apps.apple.com/us/app/xcode/id497799835) installed, reachable from the Windows computer over the network.
- The OpenSSH Client on Windows. It is part of Windows: if `ssh` is not found in PowerShell, install it under **Settings → System → Optional features**.

## 1. Turn On Remote Login on the Mac

1. On the Mac, open **System Settings → General → Sharing** and turn on **Remote Login** if it is off.
2. Note your user name on the Mac. It is the short name that `whoami` prints in Terminal, not your full name.

## 2. Create a Key on Windows

In PowerShell on Windows, create a key used only for this. When `ssh-keygen` asks for a passphrase, press `Enter` twice for none: the build connects without prompting, so it cannot type one.

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.ssh" | Out-Null
```

```powershell
ssh-keygen -t ed25519 -f "$env:USERPROFILE\.ssh\gnollhack_mac" -C gnollhack-mac
```

## 3. Add the Host Alias

Create or extend the file `config` in the `.ssh` folder of your Windows user profile (`%USERPROFILE%\.ssh\config`) with this entry:

```text
Host gnollhack-mac
    HostName <the Mac's host name or IP address>
    HostKeyAlias gnollhack-mac
    User <your Mac user name>
    IdentityFile ~/.ssh/gnollhack_mac
    IdentitiesOnly yes
```

`HostKeyAlias` makes `ssh` remember the Mac's host key under the alias instead of under its address, so the Mac stays trusted when its address changes, for example when you take it to another network. See [[When the Mac's Address Changes|#when-the-macs-address-changes]].

> 💡 **Tip:** Replace both placeholders, angle brackets included. An unreplaced `<...>` makes `ssh` stop with "invalid quotes" or "extra arguments at end of line". The user name is the short name that `whoami` prints on the Mac.

> ⚠️ **Warning:** The file must be saved without a BOM. Edit it in Notepad and save it as UTF-8, which Notepad writes without a BOM. Do not write it with PowerShell's `>` or `Out-File`, whose BOM `ssh` cannot read.

## 4. Install the Key on the Mac

Copy the public key to the Mac and add it to the authorized keys. Each command asks for your Mac password once, and the first one asks you to accept the Mac's host key: answer `yes`.

```powershell
scp "$env:USERPROFILE\.ssh\gnollhack_mac.pub" gnollhack-mac:gnollhack_mac.pub
```

```powershell
ssh gnollhack-mac "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat gnollhack_mac.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && rm gnollhack_mac.pub"
```

## 5. Test the Connection

Test that the build can connect without a password and that Xcode's SDKs are there:

```powershell
ssh -o BatchMode=yes gnollhack-mac "xcrun --sdk iphoneos --show-sdk-path; xcrun --sdk macosx --show-sdk-path"
```

The command prints two paths, one ending in `iPhoneOS<version>.sdk` and one in `MacOSX<version>.sdk`, with no password prompt. If it does, the setup is done.

## 6. Set Up Xcode's Command-Line Tools

If the test prints an `xcrun` error instead of the paths, Xcode is not selected or its license has not been accepted. Run these in Terminal on the Mac, then repeat the test:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

```bash
sudo xcodebuild -license accept
```

## 🌐 When the Mac's Address Changes

The Mac's address is entered in one place only: the `HostName` line of the `gnollhack-mac` entry in `%USERPROFILE%\.ssh\config`. Nothing in the GnollHack repository or in Visual Studio holds it. When the address changes, for example because you moved to another location:

1. Find the Mac's new IP address on the Mac under **System Settings → Network**, or with `ipconfig getifaddr en0` in Terminal (`en1` if `en0` prints nothing).
2. Open `%USERPROFILE%\.ssh\config` in Notepad, replace the address on the `HostName` line, and save.
3. Run the test in step 5.

No rebuild or Visual Studio restart is needed: `ssh` reads the config file on every connection.

If your entry has no `HostKeyAlias` line, because you set it up before this page recommended one, the Mac's key is trusted under the old address only, and the build fails with `error GNHAB006` until the key is accepted again. Add the `HostKeyAlias gnollhack-mac` line now, then run `ssh gnollhack-mac` once and answer `yes`. After that, address changes need only the `HostName` edit.

> 💡 **Tip:** To avoid editing the address at all, give the Mac a fixed address on each network you use, for example a DHCP reservation on your router, or set `HostName` to the Mac's local network name, shown under **System Settings → General → Sharing → Local hostname**, such as `Your-MacBook.local`. Windows resolves `.local` names on most home networks, but not on all of them, so an IP address is the more reliable choice.

## ⚙️ Using Another Alias

The build uses the alias `gnollhack-mac` unless you name another one, for example to build on a second Mac. Add a second `Host` entry to the config file, with its own `HostKeyAlias` set to the new alias, set it up as above, and tell the build which alias to use in either of these ways:

- Set the environment variable `GNOLLHACK_MAC_SSH_HOST` to the alias (see [[/Development/How to Add Environment Variable on Windows]]), then restart Visual Studio.
- When building from the command line with MSBuild, add `/p:GnhAppleExtraArgs="-SshHost <alias>"`.

The alias may contain only letters, digits, and the characters `.`, `_`, `@` and `-`. The macOS packaging script does not accept `@`, so give a Mac you package on a plain alias.

## ❓ Troubleshooting

- **`Permission denied`** in the test: the key is not in `~/.ssh/authorized_keys` on the Mac. Repeat step 4.
- **The test asks for a password**: the `IdentityFile` line does not point to the key, or the key is not installed on the Mac. Check step 3, then repeat step 4.
- **`ssh` reports a bad configuration option, "invalid quotes" or "extra arguments at end of line"**: the config file has a BOM or an unreplaced placeholder. Check step 3.
- **The build stops with `error GNHAB006: Cannot connect to the Mac`**: the Mac is asleep or unreachable, its address has changed, Remote Login is off, or the alias does not log in without a password. Check the address as in [[When the Mac's Address Changes|#when-the-macs-address-changes]], then run the test in step 5.
- **`ssh` warns that the remote host identification has changed**: with `HostKeyAlias` set, another computer answered at that address, or the Mac's system was reinstalled. Find out which before you remove the old key with `ssh-keygen -R gnollhack-mac` and accept the new one.
- **The build stops with `error GNHAB007`**: the SDK is not available on the Mac. Follow step 6.

On the Mac, the build works in the `gnollhack-build` folder of your home folder, in one subfolder for each platform, configuration and checkout, such as `ios-Debug-mypc-1a2b3c4d`. Deleting any of them is safe: the next build recreates it and compiles everything again. The macOS packaging uses `package-in` and `package` in the same folder. `package/<version>-<build>` holds the build results, the Steam depot content included, until the next build of the same version replaces them.
