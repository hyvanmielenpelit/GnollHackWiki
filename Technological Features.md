![techological-features](/uploads/Technological%20Features/techological-features.webp)

> 👉 **GnollHack is an ambitious open-source project that bridges the gap between decades-old legacy C code and modern cross-platform development paradigms, serving as a rare and powerful showcase of .NET MAUI's capabilities in game development.**

## Engineering Achievements

GnollHack is not just another application; it is a profound technical achievement that demonstrates the true power and flexibility of modern .NET. For CTOs, technical leads, and senior developers looking to understand the limits of cross-platform UI frameworks, GnollHack stands as a testament to what is possible when legacy architecture meets state-of-the-art tooling.

- **Legacy Modernization at Scale:** We have successfully integrated NetHack's sprawling, multi-decade C codebase into a modern C#/.NET environment. This proves that vast legacy systems can be preserved, modernized, and distributed across contemporary platforms without rewriting the core business logic from scratch.
- **.NET MAUI as a Game Engine:** While .NET MAUI is traditionally seen as a framework for business apps, GnollHack pushes it to the edge. We utilize .NET MAUI to drive a complex, highly-interactive 2D game, proving its viability for high-performance, non-standard UI requirements.
- **Advanced Cross-Platform Architecture:** From a single unified .NET codebase and native bridge, GnollHack seamlessly targets Android, iOS, Windows, and macOS. This represents a massive reduction in platform-specific technical debt and maintenance overhead.
- **High-Performance Multi-Threading:** To maintain high frame rates while executing complex game logic, GnollHack implements a sophisticated multi-threaded architecture. The native C game loop is completely decoupled from the MAUI UI and the hardware-accelerated Skia rendering threads, showcasing advanced synchronization and thread-safety patterns in .NET.
- **Ecosystem Integration:** By integrating SkiaSharp for GPU-accelerated 2D rendering and FMOD for professional-grade audio middleware, GnollHack exemplifies how smoothly .NET MAUI can orchestrate industry-standard native libraries to deliver a rich multimedia experience.

## Technologies Behind GnollHack.

### UI Framework: .NET MAUI

_(Originally Xamarin.Forms)_

- https://github.com/dotnet/maui

GnollHack is one of the very few games developed with **.NET MAUI**, which is primarily a cross-platform app creation framework. GnollHack extends the boundaries of .NET MAUI by implementing a fully fledged 2D game. .NET MAUI allows GnollHack to run on Android, iOS, Windows, and macOS.

.NET MAUI allows us to quickly and effectively develop a complex UI for GnollHack, using a multitude of premade controls, such as text entries, multiline text boxes, in-game web views, and dynamically sizing layouts.

### Graphics Drawing Engine: SkiaSharp

- https://github.com/mono/SkiaSharp
- https://skia.org/

GnollHack utilizes highly effective **SkiaSharp**, which is built upon Google's **Skia** graphics drawing engine, to draw its graphics in a fast and battery-efficient way. SkiaSharp offers a developer-friendly API to draw bitmaps, shapes, and text on a canvas, which can be GPU accelerated.

### Sound Middleware: FMOD

- https://www.fmod.com/

GnollHack integrates **FMOD** — a commercial cross-platform audio library — on all platforms as a sound middleware, which is a major technological advance, exemplifying that FMOD can be integrated with .NET MAUI for playing sounds and music.

### Native C Code Integration

GnollHack integrates a native C library based on NetHack's source code to the modern frameworks. This native C library integration works on all supported platforms.

### Multi-Threaded

GnollHack runs on two or three threads depending on the operating system. This allows GnollHack to run at high performance but requires us to implement several thread-safety features.