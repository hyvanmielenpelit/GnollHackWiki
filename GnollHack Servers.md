![gnollhack-servers-4k-512](https://github.com/hyvanmielenpelit/GnollHack/assets/16661034/b2a33e50-656f-4ef8-baf4-faeb58c203b2)

You can play the ASCII version of GnollHack on our proprietary public server through SSH:
* `play@server.gnollhack.com` (Ohio, USA)

## Curses Interface

We recommend that you activate also the **Curses interface**. Here are instructions for the following operating systems:

- [[Windows|Activating Curses Interface on Public Servers]]
- [[macOS|Activating Curses Interface on Public Servers for macOS Terminal]]
- [[Linux|Activating Curses Interface on Public Servers for Linux Terminal]]

## Options

You should play GnollHack with at least 4 status lines. If you are using the Curses interface, we recommend setting the following in your options file:

`OPTIONS=autostatuslines,statuslines:4`

This will enable automatic adjustment of status lines for you, with a minimum of 4 status lines.

_The default GnollHack Curses Interface Options files have these settings set correctly._

## Unicode Support

You can set `OPTIONS=symset:UnicodeGraphics` in the options file to enable Unicode support in GnollHack. You must use TTY interface for playing. Curses interface does not support Unicode at the moment. This allows you to use UTF-8 encoding in your terminal. This can be helpful when your terminal does not support CP437.

## Arrow key support for TTY

If you want to use arrow keys while playing with TTY graphics (especially using UnicodeGraphics), you can set `OPTIONS=enablettyarrowkeys` in the options file or activate it through Options (O). This has a drawback that you need to press ESC twice to register the ESC key. Luckily, you need to do it seldom in GnollHack.

## Watching Games

You can watch games on public servers live by clicking 'w' in the main menu. After that you can select a game, if there are any, and finally you can press 'r' to resize the terminal. When you want to quit watching the game, press 'q'.

Sometimes the games you watch do not look right, depending on the settings what the player is using. Here, you can find instructions how to make games look right.
- [[Solving Problems Watching Games Using PuTTY]] (Windows)