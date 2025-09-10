## 1. Download Options

GnollHack's modern Windows version has the following download options:

### 1.1. Steam

<a href="https://store.steampowered.com/app/3558190/GnollHack/?utm_source=wiki">![Available on Steam](/uploads/Download/steam-q90.webp)</a><br />

#### 1.1.2. Auto-Update Can't Be Disabled

You can't disable auto-update in Steam, but if your saved games become invalid, you can revert back to a compatible version of GnollHack as follows:
1. Go to GnollHack Properties in Steam.
2. Go to the Betas tab.
3. Select a compatible version of GnollHack there.

#### 1.1.3. Steam Platform Features

- **Save File Synchronization** — Sync your saved games across multiple PCs.
- **Revert to Old Version** — You can revert to an old version using the Betas tab in the GnollHack properties in Steam *(see above)*.

#### 1.1.4. Troubleshooting

Click 🛠️ [[Troubleshooting Modern Windows Version (Steam)]] 🛠️ for troubleshooting information.

### 1.2. MSIX Installer

<a href="https://github.com/hyvanmielenpelit/GnollHack/releases">![Get release on GitHub](/uploads/Download/github-q90.webp)</a><br />

- The MSIX package has a **.msix extension**.
- Install the game using these instructions: [[Installing MSIX Packages on Windows 10 and 11]]
    - You need admin rights to do so.
- The icon of GnollHack installed using the MSIX package will have a blue background.

### 1.3. ZIP File

<a href="https://github.com/hyvanmielenpelit/GnollHack/releases">![Get release on GitHub](/uploads/Download/github-q90.webp)</a><br />

- The ZIP file has a **.zip extension** and starts with **Hyvnmielenpelitry.889864DD5340.NoStore**.
- The ZIP file essentially contains the files installed by the MSIX package under `C:\Program Files\WindowsApps`.

#### 1.3.1. Installation

1. Download the aforementioned ZIP file.
2. Extract the files to a folder.
3. Click **GnollHackM.exe** to play.

## 2. Integrated GPU Used by Default

By default, GnollHack uses the integrated GPU to render its graphics.

## 3. Enabling Dedicated GPU

### 3.1. Steam Version

In the case of multiple GPUs, in **Windows Settings → System → Display → Graphics**, please add:

- **Desktop App (`C:\Program Files (x86)\Steam\steamapps\common\GnollHack\GnollHackM.exe`) → GPU Preference:** **High Performance** — Uses the dedicated GPU.

### 3.2. MSIX Version

In the case of multiple GPUs, in **Windows Settings → System → Display → Graphics**, please add:

- **GnollHack (Microsoft Store App) → GPU Preference:** **High Performance** — Uses the dedicated GPU.

## 4. Recommended GnollHack Graphics Settings

- **GPU Acceleration:** On
- **Map FPS:** 60
- **Screen Resolution:** Recommended (Default) — _Maximum Resolution @ Maximum Refresh Rate_
- **Screen Scale:** Default
- **Platform Render Loop:** On

### 4.1. Notes

- Screen resolution and refresh rate can only be adjusted in the full-screen mode.

## 5. More Information

- [[System Requirements for Modern Windows Port|System Requirements for Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[CPU and GPU Usage Modes in Modern Windows Port|CPU and GPU Usage Modes in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[Known Issues in Modern Windows Port|Known Issues in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[How Modern Windows Version Differs from Legacy Windows Version]]
- [[Hotkey Support in Modern Windows Port]]
