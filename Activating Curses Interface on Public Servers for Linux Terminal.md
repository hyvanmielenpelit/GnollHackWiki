Curses interface is an alternative user interface for GnollHack, which

- Adds multiple info text lines, and thus there is no need anymore to press enter continuously to get rid off long messages.
- Supports arrow keys for movement on public servers.
- Adds a support for permanent inventory on the right hand side of the screen.
- Adds a support for popup dialogs.

This is a guide how to get it working on public servers using **Ubuntu Linux Terminal** for SSH.

## 1. Increase the Size of the Terminal Window to 120x33 or so.

Increase the size of your terminal to 120x33 or so by dragging its border.

## 2. Set the Options to Curses interface defaults on the Public Server

Login to the public server using the `ssh` command. After you have logged in, select a game to play, and then select 'd' to go to the default options menu:

![Game Menu](https://images.gnollhack.com/wiki/Curses/interface2/gamemenu-red.png)

Then, select 'c' to go to the Curses interface defaults menu:

![Defaults Menu](https://images.gnollhack.com/wiki/Curses/interface2/defaults-menu-red.png)

Finally, select 's' to set the defaults to ones that work with the `ssh` command (OpenSSH):

![Defaults Menu](https://images.gnollhack.com/wiki/Curses/interface2/curses-defaults-menu-red-ssh.png)

## 3. Everything Works

Now, you can play the game and the arrow keys work for movement and everything looks pretty!

![It works on Linux](https://images.gnollhack.com/wiki/Curses/curses-linux-works.png)

## 4. Solving a Rendering Problem

If your terminal does not render the Curses interface correctly, you need to update your Linux installation and the Terminal app to the latest version. Things are working at least on **GNOME Terminal 3.28.2 using VTE version 0.52.2**. You can check your terminal version in Help → About in the menu.

Alternatively, you can set your `TERM` variable to `gnome`, `gnome-256color` or `xterm-color` before starting an SSH connection. You can do it like this in the Terminal prompt:

`TERM=gnome`
