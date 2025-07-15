You need to clone the GnollHack repository and install it in a short path to circumvent problems that arise from having a long path. We recommend installing the repository to:

- `C:\hmp\GnollHack`

Please also ensure that the path has **no spaces** in it (or anything like that). Letters and numbers are fine.

You can do it as follows:
1. Start Visual Studio and select Clone Repository.
2. Enter `https://github.com/hyvanmielenpelit/GnollHack.git` as **repository location**.
3. Enter `C:\hmp\GnollHack` as **path**.
4. Click "Clone" to download the sources from GitHub.

Note that previously we recommended to have a slightly longer path, but starting from Visual Studio 17.6.5 the path needs to be really short.

## Windows Long Path Support

Another way to solve the long path errors is to enable **long path support** in Windows, which removes the maximum length limitation of paths, which is usually 260. You need to be running **Windows 10 Version 1607 or later**. Then, you can enable long paths as follows:

1. Change the registry key `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem\LongPathsEnabled` (Type: `REG_DWORD`) to **1**.
2. Reboot your computer.

You can do this by using **Registry Editor**, which comes installed with all Windows computers.
