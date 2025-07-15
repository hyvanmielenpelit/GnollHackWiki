## Problem: Error — Another Process is Locking a File or Folder (During Build or Deployment)

- Find out which process is interfering with the build process with **Process Explorer**, using these instructions: https://superuser.com/a/399660/2026464
- In **Task Manager**, kill the interfering process.

## Problem: Building Builds All Platforms and is Therefore Slow

Try building on the command line:

### 1. Open Developer PowerShell

- In Visual Studio, open Developer PowerShell using the menu with **View → Terminal**
- Ensure that you are in the `GnollHackM` base directory.

### 2.1 Build Project Only

In the Developer PowerShell, type:

`dotnet build .\GnollHackM.csproj -f:net9.0-windows10.0.19041.0 -c:Debug --no-incremental`

### 2.2 Build Solution

In the Developer PowerShell, type:

`dotnet build .\GnollHackM.sln -f:net9.0-windows10.0.19041.0 -c:Debug --no-incremental`

### Parameter Descriptions

- `-f` defines the target framework you are building for.
- `-c` defines the build configuration.
- `--no-incremental` defines that it is rebuilding. You can omit this, if you want incremental building, which can be faster.

## Problem: Build Process Does Not Find Splash Screen Icon

Please rebuild again until it works.
