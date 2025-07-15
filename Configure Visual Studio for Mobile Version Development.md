## Add Cross Platform Connection to WSL

1. Open **Visual Studio → Tools → Options → Cross Platform → Connection Manager**
2. Add a new connection:
    - **Host Name:** localhost
    - **Port:** 22
    - **User Name:** [Your WSL User Name] *(This is the user name you created the WSL with.)*
    - **Password:** [Your WSL Password] *(This is the password you created the WSL with.)*
3. Click **Verify** to verify the connection. Please make sure that WSL and SSH are running when you do this.

Note that WSL can accept this connection,  SSH in WSL must be configured to allow password authentication. 

## Set Up Visual Studio Linux Remote Debugger for Linux Projects

There are 4 Linux projects in the GnollHack solution:
- dgncompdroid
- dlbdroid
- levcompdroid
- makedefsdroid

In these projects:
- Debugging settings are not saved in the project file.
- Go to the project properties page of each project.
- **Debugging → Program** must be set to: `$(RemoteProjectDir)/./tools/$(TargetFileName)`
- There is a bug with expanding the string, hence `/./` and also otherwise written out in detail, rather than using `$(TargetPath)`.

![image](https://user-images.githubusercontent.com/16661034/184308608-da3c1aa5-d090-42c2-99e7-402ab3add735.png)

