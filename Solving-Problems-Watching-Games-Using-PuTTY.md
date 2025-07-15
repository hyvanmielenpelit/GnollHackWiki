When you are using PuTTY configured for Curses Interface to view games on the Windows operating system, you can run into following problems:

## 1. Lines look like l, q, k , x, m, and j (Solution 1)

![Lines as letters](https://images.gnollhack.com/wiki/WatchingGames/watch-problem-3.png)

The problem may be that you are using UTF-8 as your remote character set while the player is using CP437. Just change your remote character set in Window → Translation to CP437:

![Solution 1 to lines look like l, q, k, x, m, and j](https://images.gnollhack.com/wiki/WatchingGames/watch-problem-3-solution.png) 

## 2. Lines look like l, q, k, x, m, and j (Solution 2)

![Lines as letters](https://images.gnollhack.com/wiki/WatchingGames/lines-as-letters.png)

The problem is that the player is using some old terminal-type string in his or her SSH client, and you need to configure PuTTY for the same (or similar) terminal-type string. In PuTTY configuration, You can try to set Connection → Data → Terminal Details → Terminal-type string to `xterm-color`. 

![Terminal-type string as xterm-color](https://images.gnollhack.com/wiki/WatchingGames/putty-xterm-color.png)

When you log into the server again, you may see the game look like this:

![Game watching works with terminal-type string set to xterm-color](https://images.gnollhack.com/wiki/WatchingGames/putty-xterm-color-game-works.png)


## 3. All the characters on screen look wrong

![All the characters on screen look wrong](https://images.gnollhack.com/wiki/WatchingGames/watch-problem-2.png)

The problem is that the player is using UTF-8 as the remote character set and you are using CP437. Just change your remote character set in Window → Translation to UTF-8:

![Solution to all the characters on screen look wrong](https://images.gnollhack.com/wiki/WatchingGames/watch-problem-2-solution.png)


## 4. Lines are not drawing correctly (= repeat characters do not work)

![Lines are not drawing correctly, repeat characters do not work](https://images.gnollhack.com/wiki/WatchingGames/XTermProblem.png)

The problem is that your SSH Client (e.g. PuTTY) is too old. The specs of repeat character drawing have changed and you need to update your SSH Client to the latest version. PuTTY version 0.73 or later will do.