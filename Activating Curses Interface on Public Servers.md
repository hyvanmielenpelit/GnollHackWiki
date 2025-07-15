Curses interface is an alternative user interface for GnollHack, which

- Adds multiple info text lines, and thus there is no need anymore to press enter continuously to get rid off long messages.
- Supports arrow keys for movement on public servers.
- Adds a support for permanent inventory on the right hand side of the screen.
- Adds a support for popup dialogs.

This is a guide how to get it working on public servers using an SSH client (PuTTY). **This guide works only for Windows**.

## 1. Download Latest PuTTY (version 0.73 or later)

You need to have an up-to-date PuTTY, when connecting to GnollHack public servers, or the Curses interface does not work correctly.

https://www.putty.org/

**PuTTY version `0.73`** or later will do.

You can check the version of your PuTTY by clicking About in the configutation screen.

## 2. Set Remote Character Set to CP437 in the SSH client

Set the **remote chatacter set** to `CP437` on your SSH Client. If you are using PuTTY, you can set Window → Translation → Remote Character Set to "CP437".

![Normal SSH](https://images.gnollhack.com/wiki/IBMGraphicsWithPuTTY/PuTTYWindowTranslation.png)

If you are using the terminal on macOS or Linux, you can follow [these instructions](https://nethackwiki.com/wiki/IBMgraphics).

## 3. Increase the size of the SSH window to at least 110x32

Next, you need to increase the size of the SSH terminal window. Let's make it 110x32. Below is an example how to do it in PuTTY:

![SSH Window Size](https://images.gnollhack.com/wiki/Curses/putty-window-size.png)

You can also use higher numbers according to your liking, for example, 120x34, or even more, whatever can fit on your screen. The Curses interface can adjust dynamically to your terminal size.

## 4. Adjust the terminal font

Next, you can adjust the terminal font and its size to fit your needs. **Consolas** is a good choice for a font and it works well with 10, 12, and 16-point sizes. In PuTTY, you can set the font size in Window → Appearance. Below is an example of this using the font size 16:

![Terminal Font Size](https://images.gnollhack.com/wiki/Curses/putty-font-1b.png)

![Terminal Font Size 2](https://images.gnollhack.com/wiki/Curses/putty-font-2b.png)

## 5. Save settings

Next, save the session settings. Here's an example how to do it with PuTTY:

![Save Settings](https://images.gnollhack.com/wiki/Curses/putty-save-settings-2.png)

## 6. Set the Options to Curses interface defaults on the Public Server

Login to the public server. After you have logged in, select a game to play, and then select 'd' to set the defaults:

![Game Menu](https://images.gnollhack.com/wiki/Curses/interface2/gamemenu-red.png)

Then, select 'c' to the Curses interface defaults:

![Defaults Menu](https://images.gnollhack.com/wiki/Curses/interface2/defaults-menu-red.png)

Finally, select 'p' to set the options to Curses interface defaults, which work with PuTTY:

![Curses Defaults Menu](https://images.gnollhack.com/wiki/Curses/interface2/curses-defaults-menu-red-putty.png)

## 7. Everything Works

Now, you can play the game and the arrow keys work for movement and everything looks pretty!

![All options in the Curses interface](https://images.gnollhack.com/wiki/Curses/curses-works-new2.png)