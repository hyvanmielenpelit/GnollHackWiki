Because how the things are set up, there are some limitations on how you can develop the **GnollHackM (.NET MAUI)** project right now.


## 1. Edit XAML in GnollHackX (Xamarin.Forms)


- XAML files are copied from the **GnollHackX (Xamarin.Forms)** project, so you need to edit them there.
- If you edit them in the **GnollHackM (.NET MAUI)** project, your changes will be overwritten.


## 2. Write C# that is Compliant with .NET Core 3.1 (Xamarin.Forms)


- Because .cs files are shared between **GnollHackX (Xamarin.Forms)** and **GnollHackM (.NET MAUI)**, you need to write C# that is compliant with **GnollHackX (Xamarin.Forms)**, that is, with .NET Core 3.1.


## Future


These things will change in the future, when the **GnollHackX (Xamarin.Forms)** project is no longer needed and **GnollHackM (.NET MAUI)** becomes the only project for developing the Android and iOS ports.