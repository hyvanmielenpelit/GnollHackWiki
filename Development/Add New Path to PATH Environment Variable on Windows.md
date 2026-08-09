1. Right-click the **Windows Start** button and select **System**.
2. Click **Advanced system settings**.
3. Click **Environment Variables...**.
4. Double-click **Path** in the system variables list.
5. Click **New**.
6. Write the new path to the last line.
7. Click Ok 3 times to close all windows.
8. Restart Visual Studio and all command/PowerShell prompts.
9. Open PowerShell.
10. Write `echo $Env:Path` to check the path.
11. You can also try to run an executable in the new path to see if PowerShell finds it.