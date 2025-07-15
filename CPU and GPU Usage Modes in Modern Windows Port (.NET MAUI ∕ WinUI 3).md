There are 4 possible modes how to use CPU and GPU for rendering GnollHack on Windows (WinUI 3), when you have both an integrated GPU and a dedicated GPU in your system. The mode used depends on two settings:

1. In Windows 11, **Settings → System → Display → Graphics**
    - The Steam version of **GnollHack** needs to be added there as a desktop app, please see [[Selecting GPU for Modern Windows Port (Steam)]].
2. **GPU Acceleration** in GnollHack settings
    - This can't be turned on in the Steam version of GnollHack.


## 1. With Both CPU and Integrated GPU


- **Graphics Setting in Windows:** Let Windows decide or Power saving
- **GPU Acceleration in GnollHack Settings:** Off


## 2. Mainly on Integrated GPU


- **Graphics Setting in Windows:** Let Windows decide or Power saving
- **GPU Acceleration in GnollHack Settings:** On


## 3. With Both Integrated GPU and Dedicated GPU


- **Graphics Setting in Windows:** High performance
- **GPU Acceleration in GnollHack Settings:** Off


## 4. Mainly on Dedicated GPU


- **Graphics Setting in Windows:** High performance
- **GPU Acceleration in GnollHack Settings:** On


## Remarks


GnollHack always renders graphics on an integrated or dedicated GPU, regardless of whether **GPU Acceleration** is enabled in the game settings. This is because both controls that are used to render graphics in the On and Off modes use GPU on Windows/WinUI 3.


## Technical Details


If **GPU Acceleration** in GnollHack Settings is enabled, the game renders itself using SkiaSharp's `SKGLView`, which uses `SwapChainPanel` in WinUI 3.

If **GPU Acceleration** in GnollHack Settings is disabled, the game renders itself using SkiaSharp's `SKCanvasView`, which uses `Canvas` in WinUI 3.