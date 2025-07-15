## Overview


You build the .NET MAUI version of GnollHack with a two-step process. This is because we are keeping the Xamarin.Forms version of GnollHack for compatibility reasons and we are sharing code between both architectures. This allows us to maintain both Xamarin.Forms and .NET MAUI versions of GnollHack at the same time.


## 1. Build GnollHackX


GnollHackX is the Xamarin.Forms version of GnollHack.


### Prerequisites


Check [appropriate build instructions](https://github.com/hyvanmielenpelit/GnollHack/wiki/Development-Information#xamarinforms) for prerequisites of building GnollHackX.


### Building


1. Start **Visual Studio Community 2022**.
2. Open `GnollHack.sln` that is located in the `win\win32\vs` directory.
3. Build `GnollHackX`, which is the Xamarin.Forms version of GnollHack, using [appropriate build instructions](https://github.com/hyvanmielenpelit/GnollHack/wiki/Development-Information#xamarinforms). 

This builds the necessary native libraries required by the .NET MAUI versions of the game. You need to repeat this step whenever you change code in the native libraries.


## 2. Build GnollHackM


GnollHackM is the .NET MAUI version of GnollHack.


### Prerequisites


- Install .NET SDK 9.0 Preview 5 from https://dotnet.microsoft.com/en-us/download/dotnet/9.0
- Install .NET MAUI 9.0 Preview 5 using `dotnet workload install maui` in PowerShell
- [[Install Visual Studio 2022 Preview for .NET MAUI Development]]


### Building


1. Start **Visual Studio Community 2022 *Preview***.
2. Open `GnollHackM.sln` that is located in the `win\win32\xpl\GnollHackM` directory.
3. Build `GnollHackM`, which is the .NET MAUI version of GnollHack, using [appropriate build instructions](https://github.com/hyvanmielenpelit/GnollHack/wiki/Development-Information#net-maui).

This builds the .NET MAUI version of the game. You need to repeat this step whenever you change things in XAML or the managed C# code.


## Remarks


### Changing Solution Configuration


If you change the solution configuration between **Debug** and **Release**, you need to rebuild both **GnollHack** solution and **GnollHackM** solution with the appropriate solution configuration. This is because you need appropriately built libraries for the **GnollHackM** solution from the **GnollHack** solution. So, you need to:

1. Build the **GnollHack** solution first.
2. Then, build the **GnollHackM** solution.