1. Right-click the **Windows Start** button and select **System**.
2. Click **Advanced system settings**.
3. Click **Environment Variables...**.
4. Click **New...** for user variables or system variables (it does not usually matter).
5. Set the variable name and the variable value.
6. Restart Visual Studio and all command/PowerShell prompts.
7. Open PowerShell.
8. Write `echo $Env:Environment_Variable_Name` to check that it is set. For example, `echo $Env:ANDROID_NDK_HOME`.