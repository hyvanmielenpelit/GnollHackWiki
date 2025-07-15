![technological-features-512](https://github.com/user-attachments/assets/f88e109a-571a-47c0-96df-5444046fde79)

## GnollHack Client Software

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