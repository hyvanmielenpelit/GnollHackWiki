Curses interface is an alternative user interface for GnollHack, which

- Adds multiple info text lines, and thus there is no need anymore to press enter continuously to get rid off long messages.
- Supports arrow keys for movement on public servers.
- Adds a support for permanent inventory on the right hand side of the screen.
- Adds a support for popup dialogs.

This is a guide how to get it working on public servers, when you are using **macOS Terminal** for SSH.

## 1. Increase the Size of the Terminal Window to 120x33 or so.

Increase the size of your terminal to 120x33 or so by dragging its border.

## 2. Solving a Rendering Problem

macOS does not have up-to-date `xterm` support, and therefore you probably need to do this in the terminal before connecting with SSH:

`TERM=xterm-color`

## 3. Set the Options to Curses interface defaults on the Public Server

Login to the public server using the `ssh` command in the Terminal app. After you have logged in, select a game to play, and then select 'd' to go to the default options menu:

![Game Menu](/uploads/Activating%20Curses%20Interface%20on%20Public%20Servers%20for%20macOS%20Terminal/gamemenu-red.webp)

Then, select 'c' to go to the Curses interface defaults menu:

![Defaults Menu](/uploads/Activating%20Curses%20Interface%20on%20Public%20Servers%20for%20macOS%20Terminal/defaults-menu-red.webp)

Finally, select 's' to set the defaults to ones that work with the `ssh` command (OpenSSH):

![Defaults Menu](/uploads/Activating%20Curses%20Interface%20on%20Public%20Servers%20for%20macOS%20Terminal/curses-defaults-menu-red-ssh.webp)

## 4. Everything Works

Now, you can play the game and the arrow keys work for movement and everything looks pretty!

![It works on macOS](/uploads/Activating%20Curses%20Interface%20on%20Public%20Servers%20for%20macOS%20Terminal/curses-linux-works.webp)
