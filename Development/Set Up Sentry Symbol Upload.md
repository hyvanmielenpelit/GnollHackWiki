> 👉 **A computer that makes release builds of GnollHack needs this setup once, so that the crash reports from those builds show file names and line numbers. A build for testing does not need it.**

## 📖 Overview

A Release publish of a modern client uploads its debug symbols to Sentry when three environment variables are set: the token that allows the upload, and the Sentry organization and project to upload to. Without them the build works as usual and uploads nothing. What is uploaded for each client, and how the upload is turned off, is in [[Upload Debug Symbols|/Development/Build Instructions for Native Crash Reporting#8-upload-debug-symbols]].

## 📋 Prerequisites

- Membership of the GnollHack organization in Sentry, with permission to create organization tokens.

## 1. Create an Organization Token

1. In Sentry, open **Settings → Developer Settings → Organization Tokens**, and click **Create New Token**.
2. Give it a name that tells which computer uses it, such as `GnollHack symbol upload, <computer>`.
3. Copy the token at once: Sentry shows it only once.

> ⚠️ **Warning:** The token gives access to the organization's Sentry. Never paste it into a chat, an issue or a file. Keep it on the clipboard only until you finish step 2.

## 2. Set the Variables

Open an ordinary PowerShell window, not one opened as administrator, and run each command:

```powershell
[Environment]::SetEnvironmentVariable('SENTRY_ORG', 'hyvan-mielen-pelit-ry', 'User')
```

```powershell
[Environment]::SetEnvironmentVariable('SENTRY_PROJECT', 'gnollhack', 'User')
```

The last command asks for the token and shows nothing while you paste it:

```powershell
$t = Read-Host 'Sentry auth token' -AsSecureString; [Environment]::SetEnvironmentVariable('SENTRY_AUTH_TOKEN', [System.Net.NetworkCredential]::new('', $t).Password, 'User'); Remove-Variable t
```

User-level variables are enough, because the build reads the environment of the program that runs it. They are also the better choice: setting them needs no administrator rights, and other Windows accounts on the computer cannot read them.

The organization's Sentry is in Sentry's EU region. The token carries its region, so no `SENTRY_URL` is needed.

## 3. Restart Your Programs

Programs started before step 2 do not see the new variables. Close and reopen Visual Studio, every PowerShell and terminal window, and any agent session that builds.

## 4. Check the Upload

Make a Release publish, for example the Linux packages as described in [[/Development/Build Instructions for Avalonia Linux Version on Windows]]. Its output has an `UPLOADED` line for each debug file; for the Linux packages, `GnollHackM.pdb` and `libgnollhacklinux.so`. The files also appear in Sentry, in the project's **Settings → Debug Files**.

## ⚙️ Turning the Upload Off for One Build

- The Linux and macOS packaging scripts: add `-NoSentryUpload`.
- `dotnet publish` and MSBuild: add `-p:GnhSentryUpload=false`.

See [[Upload Debug Symbols|/Development/Build Instructions for Native Crash Reporting#8-upload-debug-symbols]] for what each client uploads.

## ❓ Troubleshooting

| Problem | Fix |
|:--------|:----|
| **A Release publish prints no `UPLOADED` lines** | The variables are not in the environment of the program that ran the build: restart it, as in step 3. Or the build was not a Release publish, archive or package. |
| **The upload fails with an authentication error** | The token was revoked or mistyped. Create a new one (step 1) and set it again (step 2). |
| **A new computer makes release builds** | Do this setup on it with a new token. Each computer has its own token, so that one can be revoked alone. |

## 📖 Learn More

- [[/Development/Build Instructions for Native Crash Reporting]]
- [[/Development/Build Instructions]]
