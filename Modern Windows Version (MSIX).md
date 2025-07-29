## Download

<a href="https://github.com/hyvanmielenpelit/GnollHack/releases">![Get release on GitHub](/uploads/Download/github-q90.webp)</a><br />

- The MSIX package has a **.msix extension**.
- Install the game using these instructions: [[Installing MSIX Packages on Windows 10 and 11]]
    - You need admin rights to do so.
- The icon of GnollHack installed using the MSIX package will have a blue background.

## GPU Acceleration Supported

- GPU Acceleration can be enabled, which means that GnollHack can render its graphics using OpenGL.
- With GPU Acceleration enabled, GnollHack should be able to render its graphics on high resolution screens.

## Integrated GPU Used by Default

- Be default, GnollHack uses the integrated GPU to render its graphics.
- You can activate the dedicated GPU in Windows' Settings → System → Display → Graphics. Please see [[Selecting GPU for Modern Windows Port (MSIX)]] how to do it.

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

- **GnollHack (Microsoft Store App) → GPU Preference:** High Performance — _Uses the dedicated GPU_

## More Information

- [[System Requirements for Modern Windows Port|System Requirements for Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[CPU and GPU Usage Modes in Modern Windows Port|CPU and GPU Usage Modes in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[Known Issues in Modern Windows Port|Known Issues in Modern Windows Port (.NET MAUI ∕ WinUI 3)]]
- [[How Modern Windows Version Differs from Legacy Windows Version]]
- [[Hotkey Support in Modern Windows Port]] 