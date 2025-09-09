## Download Options

GnollHack's modern Windows version has the following download options:

- [[Steam|Modern Windows Version (Steam)]] — Recommended if it works.
- [[MSIX installer|Modern Windows Version (MSIX)]] — If the Steam version doesn't work for you, you can try this.
- [[ZIP file|Modern Windows Version (ZIP)]] — If the MSIX version doesn't work for you, you can try this.

## Integrated GPU Used by Default

By default, GnollHack uses the integrated GPU to render its graphics.

## Enabling Dedicated GPU

### Steam Version

In the case of multiple GPUs, in **Windows Settings → System → Display → Graphics**, please add:

- **Desktop App (`C:\Program Files (x86)\Steam\steamapps\common\GnollHack\GnollHackM.exe`) → GPU Preference:** **High Performance** — Uses the dedicated GPU.

### MSIX Version

In the case of multiple GPUs, in **Windows Settings → System → Display → Graphics**, please add:

- **GnollHack (Microsoft Store App) → GPU Preference:** **High Performance** — Uses the dedicated GPU.

## Recommended GnollHack Graphics Settings

- **GPU Acceleration:** On
- **Map FPS:** 60
- **Screen Resolution:** Recommended (Default) — _Maximum Resolution @ Maximum Refresh Rate_
- **Screen Scale:** Default
- **Platform Render Loop:** On

### Notes

- Screen resolution and refresh rate can only be adjusted in the full-screen mode.




## More Information

- [[System Requirements for Modern Windows Port|System Requirements for Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[CPU and GPU Usage Modes in Modern Windows Port|CPU and GPU Usage Modes in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[Known Issues in Modern Windows Port|Known Issues in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[How Modern Windows Version Differs from Legacy Windows Version]]
- [[Hotkey Support in Modern Windows Port]]
