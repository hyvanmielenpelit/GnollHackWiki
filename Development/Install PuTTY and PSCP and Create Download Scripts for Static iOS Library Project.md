## 1. Overview

This is needed to download the library file from Mac to Windows using **pscp** that comes with PuTTY.

## 2. Installation

Install PuTTY on your Windows computer from [www.putty.org](http://www.putty.org/).

## 3. Create PSCP Download Scripts

Write **two download scripts** for **pscp** to download libgnollhackios.a from the Mac computer. You need put the two scripts in `win32\winclisrv\GnollHackClient\gnollhackios` directory. They are:

1. Download-Debug-ARM64.bat
2. Download-Release-ARM64.bat

Both of the scripts have just one line like follows (this one is for Debug configuration and ARM64 platform):

`pscp -pw [mac-login-password-here] [userid@ip-address]:/Users/[userid]/vcremote/C/hmp/GnollHack/tools/[debug-release]/ARM64/libgnollhackios.a c:\mac-out`

where
- [mac-login-password-here] is your login password on the Mac.
- [userid] is your user ID on the Mac.
- [ip-address] is the IP addres of the Mac or DNS name.
- [debug-release] is either `Debug` or `Release`, depending on the script.

The command can be, for example:

`pscp -pw mypassword123 tommi@192.168.0.21:/Users/tommi/vcremote/C/hmp/GnollHack/tools/Debug/ARM64/libgnollhackios.a c:\mac-out`

### Notes on Download Scripts

Note that the IP Address can change depending on which network you are connected to. You may need to create separate download scripts for each network environment, for example, workplace and home.

## 4. Run Download script

Run the appropriate download script in **Windows PowerShell** and answer y to store the key to cache. *(You may need to create the downloadable library first.)*
