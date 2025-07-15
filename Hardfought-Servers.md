![hardfought-4k-512](https://github.com/hyvanmielenpelit/GnollHack/assets/16661034/99ab0b48-31db-44d7-8b0a-7b28864af4ed)

GnollHack is also available on Hardfought servers. You can play there over SSH:
* **North America:** nethack@hardfought.org (port 22)
* **Europe:** nethack@eu.hardfought.org (port 22)
* **Australia:** nethack@au.hardfought.org (port 22)

The Hardfought servers require you to setup your own configuration file, even though we have provided a good starting template.

## Setting the Editor to rnano

Before editing the configuration file, we recommend that you set the editor to `rnano`. You do this by going to **j) Manage settings** and then pressing **c) Change editor**. Then, select **n) rnano**.

## Curses Interface

We recommend to use the Curses Interface. The following options in the configuration file are necessary:

```
OPTIONS=windowtype:curses
OPTIONS=symset:default
OPTIONS=popup_dialog
OPTIONS=guicolor
OPTIONS=perm_invent
```

Please note that IBMgraphics and DECgraphics do not work on Hardfought servers. You need to use `symset:default`, which defaults to `symset:curses`.

Additionally, you need to use **CP437 code page** in your SSH client. This setting is found under **Window → Translation** named as **Remote Character Set** in PuTTY.

The recommended terminal size is something like 150 x 40, or whatever fits on your screen.

## TTY Interface

Alternatively, you can stick with the TTY interface. You can either use:
* `OPTIONS=symset:IBMgraphics` with **CP437 code page**, or
* `OPTIONS=symset:UnicodeGraphics` with **UTF-8 code page**

The former gives you the default GnollHack experience and can be used, when your SSH client supports CP437. The latter works when your SSH client does not support CP437. (Code pages are found under **Window → Translation** named as **Remote Character Set** in PuTTY.)

The recommended terminal size is 80 x 26.

Also, please note that TTY does not support movement by arrow keys by default. If your keyboard lacks a number pad and you want to use arrow keys for movement, you need to set the following in the configuration file:

`OPTIONS=enablettyarrowkeys`

This will allow you to move with arrow keys, but has the disadvantage of requiring you to press ESC twice to register the ESC key.

## Options
You should play GnollHack with at least 4 status lines. We recommend setting the following in your options file:

`OPTIONS=autostatuslines,statuslines:4`

This will enable automatic adjustment of status lines for you, with a minimum of 4 status lines.

## Terminal-type string

Hardfought recommends to use `xterm-256color` terminal-type string, but the default `xterm` also works to some extent.

The terminal-type string is found under **Connection → Data** in PuTTY and it must be set before establishing a connection.

## Watching Games

You can watch games on public servers live by clicking 'w' in the main menu. After that you can select a game, if there are any, and finally you can press 'r' to resize the terminal. When you want to quit watching the game, press 'q'.

Sometimes the games you watch do not look right, depending on the settings what the player is using. Here, you can find instructions how to make games look right.
- [[Solving Problems Watching Games Using PuTTY]] (Windows)