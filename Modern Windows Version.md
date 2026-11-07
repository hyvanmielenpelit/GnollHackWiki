## 1. Download Options

GnollHack's modern Windows version has the following download options:

- **Steam** — Recommended download option.
- **MSIX installer** — You can try this if the Steam version doesn't work for you.

### 1.1. Steam

<a href="https://store.steampowered.com/app/3558190/GnollHack/?utm_source=wiki">![Available on Steam](/uploads/Download/steam-q90.webp)</a><br />

#### 1.1.1. Auto-Update Can't Be Disabled

You can't disable auto-update in Steam, but if your saved games become invalid, you can revert to a compatible version of GnollHack as follows:

1. [[Contact the GnollHack Dev Team|Contact Information]] and ask that the previous game version will be made available. They will give you a code. 
2. Go to GnollHack Properties in Steam.
3. Go to the Game Versions & Betas tab.
4. Enter the code to Private Versions and click Check Code.
5. The requested game version should become available for choosing.

#### 1.1.2. Steam Platform Features

- **Revert to Old Version** — You can revert to an old version using the Game Versions & Betas tab in the GnollHack properties in Steam *(see above)*.

#### 1.1.3. Troubleshooting

Click 🛠️ [[Troubleshooting Modern Windows Version (Steam)]] 🛠️ for troubleshooting information.

### 1.2. MSIX Installer

<a href="https://github.com/hyvanmielenpelit/GnollHack/releases">![Download on GitHub](/uploads/Download/github-download-q90.webp)</a><br />

- The MSIX package has the **.msix extension**.
- Install the game using these instructions: [[/Development/Installing MSIX Packages on Windows 10 and 11]]
    - You need admin rights to do so.
- The icon of GnollHack installed using the MSIX package will have a blue background.
- The MSIX version of the game *doesn't* have auto-update. You update it manually by installing a newer version.

## 2. Dedicated GPU Used by Default

If your computer has both an integrated and a dedicated GPU, GnollHack draws the game on the dedicated (high-performance) GPU by itself, as long as **GPU Acceleration** is on in GnollHack's settings, which it is by default. You don't need to change anything in Windows.

With **GPU Acceleration** off, GnollHack uses the GPU Windows chooses for it, usually the integrated one.

## 3. Choosing the GPU in Windows

You can still choose the GPU for GnollHack in **Windows Settings → System → Display → Graphics**:

- **Power Saving** — GnollHack uses the integrated GPU, which saves battery.
- **High Performance** — GnollHack uses the dedicated GPU, also with **GPU Acceleration** off.

### 3.1. Steam Version

Add the desktop app `C:\Program Files (x86)\Steam\steamapps\common\GnollHack\GnollHackM.exe` there and choose its **GPU Preference**.

### 3.2. MSIX Version

Add **GnollHack (Microsoft Store App)** there and choose its **GPU Preference**.

## 4. Recommended GnollHack Graphics Settings

- **GPU Acceleration:** On
- **Map FPS:** 60
- **Screen Resolution:** Recommended (Default) — _Maximum Resolution @ Maximum Refresh Rate_
- **Screen Scale:** Default
- **Platform Render Loop:** On

### 4.1. Notes

- Screen resolution and refresh rate can only be adjusted in the full-screen mode.

## 5. Game Controllers

You can play the modern Windows version with an Xbox controller or another XInput-compatible controller. Connect the controller and press any button, and the game switches to controller mode. The controls are the same as on the Steam Deck; see [[Steam Deck Controls]].

- Up to four controllers can be connected, and they can be plugged in while the game is running. The last controller you use is the active one.
- Only XInput controllers are supported. PlayStation and Nintendo controllers may work if Steam presents them as XInput controllers, but this has not been tested.
- There is no on-screen keyboard, so type text, such as a wish or a name, on a keyboard.

## 6. More Information

- [[System Requirements for Modern Windows Port|/Development/System Requirements for Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[CPU and GPU Usage Modes in Modern Windows Port|/Development/CPU and GPU Usage Modes in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[Known Issues in Modern Windows Port|Known Issues in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[How Modern Windows Version Differs from Legacy Windows Version]]
- [[Hotkey Support in Modern Windows Port]]
