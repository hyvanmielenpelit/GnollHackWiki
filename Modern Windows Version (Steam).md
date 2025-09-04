## Download

<a href="https://store.steampowered.com/app/3558190/GnollHack/?utm_source=wiki">![Available on Steam](/uploads/Download/steam-q90.webp)</a><br />

## Auto-Update Can't Be Disabled

You can't disable auto-update in Steam, but if your saved games become invalid, you can revert back to a compatible version of GnollHack as follows:
1. Go to GnollHack Properties in Steam.
2. Go to the Betas tab.
3. Select a compatible version of GnollHack there.

## Integrated GPU Used by Default

- By default, GnollHack uses the integrated GPU to render its graphics.
- You can activate the dedicated GPU in **Windows' Settings → System → Display → Graphics**. Please see [[Selecting GPU for Modern Windows Port (Steam)]] how to do it.

## Steam Platform Features

- **Save File Synchronization** — Sync your saved games across multiple PCs.
- **Revert to Old Version** — You can revert to an old version using the Betas tab in the GnollHack properties in Steam *(see above)*.

## Recommended Graphics Settings

### GnollHack Settings

- **GPU Acceleration:** On
- **Map FPS:** 60
- **Screen Resolution:** Recommended (Default) — _Maximum Resolution @ Maximum Refresh Rate_
- **Screen Scale:** Default
- **Platform Render Loop:** On

#### Notes

- Screen resolution and refresh rate can only be adjusted in the full-screen mode.

### Windows Settings

In the case of multiple GPUs, in **System → Display → Graphics**, please add:

- **Desktop App (`C:\Program Files (x86)\Steam\steamapps\common\GnollHack\GnollHackM.exe`) → GPU Preference:** **High Performance** — Uses the dedicated GPU.

## Troubleshooting

### ⚠️ Problem: Loading Doesn't Finish

For some people, the loading doesn't finish after they click the Play Game button. They are stuck in "Done Loading" phase.

#### ✅ Solution 1: Change Current System Locale for Non-Unicode Programs to English (United States)

If you have a non-English Windows, you can try to change **Control Panel → Region → Administrative → Change system locale** to **English (United States)**.

Here are step-by-step instructions how to do it:

1. Open **Control Panel**.
2. Click **Clock and Region**.<br />
    ![change-locale-1](/uploads/Modern%20Windows%20Version%20(Steam)/change-locale-1.webp)

3. Click **Region**.<br />
    ![change-locale-2](/uploads/Modern%20Windows%20Version%20(Steam)/change-locale-2.webp)

4. Select the **Administrative** tab and, in the **Language for non-Unicode programs** section, click **Change system locale**.<br />
    ![change-locale-3](/uploads/Modern%20Windows%20Version%20(Steam)/change-locale-3.webp)

5. Select **English (United States)** as the current system locale. Then, click OK.<br />
    ![change-locale-4](/uploads/Modern%20Windows%20Version%20(Steam)/change-locale-4.webp)

#### ✅ Solution 2: Install Game from MSIX Package

You can install the game using an MSIX package. For some reason, your system is incompatible with the _unpackaged_ Steam version.

- For more information, please see [[Modern Windows Version (MSIX)]].

## More Information

- [[System Requirements for Modern Windows Port|System Requirements for Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[CPU and GPU Usage Modes in Modern Windows Port|CPU and GPU Usage Modes in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[Known Issues in Modern Windows Port|Known Issues in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[How Modern Windows Version Differs from Legacy Windows Version]]
- [[Hotkey Support in Modern Windows Port]]
