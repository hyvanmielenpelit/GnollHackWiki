## Technologies

**GnollHack Android** and **GnollHack iOS** are built with the following technologies:

- **[Xamarin.Forms](https://dotnet.microsoft.com/en-us/apps/xamarin/xamarin-forms)** — UI library and cross-platform development framework.
- **[SkiaSharp](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/graphics/skiasharp/)** — Game rendering with the Skia graphics library using C#.
- **[FMOD Studio](https://www.fmod.com/)** — Sound middleware and editor, used to compile and play all sounds in GnollHack.
- **[Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/about)** — Used to build assets for Google Play Store as well as some other minor tasks.
- **[TileSetCompiler](https://github.com/hyvanmielenpelit/TileSetCompiler)** — Compiles the GnollHack tileset from individual PNG files.

There's no separate game engine used for GnollHack, but the drawing is done with SkiaSharp, which runs on top of Xamarin.Forms.

## IDEs

- **[Visual Studio Community 2022](https://visualstudio.microsoft.com/vs/community/)** — Used for development for all platforms.
- **[Visual Studio for Mac 2022](https://visualstudio.microsoft.com/vs/mac/)** — Used for iOS development on a paired Mac.
- **[Xcode](https://developer.apple.com/xcode/)** — Used for iOS development on a paired Mac.
- **[Visual Studio Code](https://code.visualstudio.com/)** — Used for some minor editing.

## Devices

### Development Devices

- Windows laptop (Intel i7-11800H processor, 32 GB RAM)
- MacBook Pro (M1 processor, 16 GB RAM)

### Test Devices

GnollHack is tested on real devices during development:
- Android phone
- Android tablet
- iPad
- iPhone

They are connected to the computer through a USB cable.

## History

### Requirements

When we began developing the mobile version of GnollHack, we had some requirements:
1. The development had to be done inside *Visual Studio* so that we can build GnollHack from source.
2. It had to be *cross-platform*, supporting both Android and iOS.
3. The chosen techonolgies had to be *future-proof*, preferably supported by a big company.
4. It should be possible to use *FMOD* as sound middleware.
5. The chosen technologies should have a *UI control library* to quickly create modern mobile UIs.
6. The chosen technologies should be performant enough to draw the screen with at least 30–40 FPS.
7. It should be possible to call the GnollHack C library to run the game.

### Searching for the Right Technologies

In the beginning of the development, it took us a great deal of work to find correct technologies. There were usually a few problems:
- It could not run inside an editor, such as Unity or Godot, because we wanted to use Visual Studio exclusively.
- Many technologies did not support well Android and iOS development (especially C and C++ based ones).
- Most technologies did not have a modern UI control library suitable for game development. Usually, you had to code controls yourself. It was something we did not want to do.
- Using FMOD as sound middleware was not possible with many technologies.

### Xamarin.Forms and SkiaSharp

After a long search of about 6 months, we came upon *Xamarin.Forms* and *SkiaSharp*. They satisfied our requirements:
1. Xamarin development was done inside Visual Studio.
2. Xamarin.Forms allowed you to create both Android and iOS applications with the same code base, sharing about 95% of code.
3. At the time of us choosing the technology, Xamarin.Forms was well established and Microsoft was creating a new version of it called .NET MAUI (Multi-platform App User Interface), which meant that Xamarin.Forms would be future-proof in the form of .NET MAUI.
4. Luckily, FMOD had a full integration with Unity, which used Mono and C#, just like Xamarin.Forms did. With some help from MonoGame community efforts, we were able to piggyback the FMOD Unity integration and get FMOD working first on Android and later on iOS. Without the FMOD Unity integration, it would not have been possible.
5. Xamarin.Forms had a full UI control library and more. It had also classes to access many native features, such as file sharing. These helped us immensely to create advanced functionality to GnollHack. I would even say that developing games on an app platform, such as Xamarin, enhances the game functionality greatly. This especially true when you code the graphics engine yourself. For 3D games, which need advanced graphics functionality, this is of course not a good option, and in that case, Unity or similar technology is probably much better.
6. SkiaSharp was able to draw GnollHack's main screen at about *30 FPS using the CPU* and *60 FPS using the GPU*, even on low-end devices. Using the GPU did not require us to write any new code, since SKCanvasView and SKGLView have the same APIs.
7. Xamarin is based on Mono and .NET, which happen to have pretty good interoperability functionalities with C and C++. We were able to marshal all C objects into C# classes and thus get information from the GnollHack C library to C# and vice versa. This might not have been be possible with other languages, if their C/C++ interoperability functionalities would be lacking. Even using .NET and C#, we came upon one NotImplementedException in interop classes, but we were able to devise a workaround.

### Some Additional Boons from Using Xamarin

Using Xamarin.Forms allowed us to do things that are many times lacking in other games:
- The game would automatically support both portrait and landscape modes.
- We could easily share files (such as crash reports) using Xamarin.Essentials.
- We had access to preferences and device functionality, which allowed us to create settings for our app with ease.
- We had a text editor control to edit the Options file.

Xamarin uses C#, which is a modern language with many advanced features. We were already familiar with C# over the past 15 years, which meant that we could use our C# and .NET knowledge to develop GnollHack. C# also speeds up your coding quite a lot compared to C, which is excellent for developer productivity.

### Some Troubles

However, there were some problems that had to be solved because Xamarin.Forms was not created with games in mind.
1. Some of the more complicated screens, such as the inventory screen, were way too slow, when we programmed them using the Xamarin components. But we were able to replicate the behaviour in SkiaSharp, which was lightning-fast.
2. At start, the frame rates in Xamarin and SkiaSharp were not constant but fluctuating, which did not give a good experience. However, we were able to solve the problem using the Xamarin animation library.
3. Google Play Store accepts normally apps with a *maximum size of 150 MB*. But GnollHack was around 500 MB, because we had so many voice overs. There was a thing called *Play Asset Delivery*, which allowed you to add *up to 2 GB of assets* to your app, but it was not implemented for Xamarin. With the help from one Microsoft developer, we were able to create a system that created the required asset packs using *Windows Subsystem for Linux* and included them into our project. It turned out that you could also create the asset packs without WSL, but since we were already using it for other things, we decided to keep using it for the asset packs as well.

### Multi-Threaded (Parallel) Programming

Making GnollHack work on Android was not a simple task. We had to run the UI and the GnollHack C library in different threads, which meant that the whole application was multi-threaded. We had to use *parallel programming* and make sure that everything was thread-safe and that there were no deadlocks in the game. Luckily, C# has the *lock keyword* and *concurrent collections*, which help you to manage multi-threading pretty well.

### UI Graphics

We had to draw about 100 UI button graphics (256 x 256 PNGs) for GnollHack, which we subcontracted from one talented lady on Fiverr. Other simpler graphics we either got for free from the Internet or drew by ourselves.

### Getting Things Ready

It took us quite exactly *one year* to create the completely new touch-based UI, including drawing all UI graphics. We first launched the Android version on April 30, 2022. After doing some hot fixes to the Android version, we started looking at the iOS version on May 21, 2022. However, the iOS development started truly on May 24, 2022 after Visual Studio for Mac 2022 launched on the previous day. The iOS version was ready on June 6, 2022. So, it took us only *about 2 weeks* to create the iOS version, after the Android version was ready, thanks to Xamarin.

### Full Release

GnollHack was released on **18th March, 2023** on Google Play Store (Android) and Apple App Store (iOS) as a non-beta version. At this point, we had all voice acting lines edited and put into the game. When we consider that the development of GnollHack started on [19th July, 2019](https://github.com/hyvanmielenpelit/GnollHack/commit/6f1ef7e3073dd926c997c4f9ca93f9b6183ef27b), it took us 3 years and 8 months to get the first non-beta release out. In between, we made over 6200 commits to the repository. This exemplifies how much work had to be put into *programming only*. Additionally, we had to draw all the graphics (over 22000 tiles), find appropriate sounds and music, voice all characters (110 in total), and so on. We had a development team that varied between 5 and 10 people over time. Most of the work went into drawing graphics, even though programming and voicing were also tremendous tasks.