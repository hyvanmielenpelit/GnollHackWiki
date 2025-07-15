Normally, playing GnollHack over SSH does not look as nice as playing GnollHack on Windows.

![Normal SSH](https://images.gnollhack.com/wiki/IBMGraphicsWithPuTTY/NormalSSH.png)

If you use [PuTTY](https://www.putty.org/), you can configure it to show better IBM Graphics.

## 1. Configuring PuTTY

You need to set Window → Translation → Remote Character Set to "CP437".

![Normal SSH](https://images.gnollhack.com/wiki/IBMGraphicsWithPuTTY/PuTTYWindowTranslation.png)

## 2. Activate IBM Graphics

There are two ways of activating the IBM graphics.

### 2.1 In GnollHack Options (O), set "symset" to "IBMgraphics"

![Normal SSH](https://images.gnollhack.com/wiki/IBMGraphicsWithPuTTY/ServerOptions1.png)

Here choose 'h' - IBMgraphics:

![Normal SSH](https://images.gnollhack.com/wiki/IBMGraphicsWithPuTTY/ServerOptions2.png)

### 2.2 Edit the options file

Instead of setting the IBMgraphics option everytime through Options 'O', you can edit the options file and add the following declaration to its end:

`OPTIONS=IBMgraphics`

You can find the option to edit the options file in the game menu after you have logged in.

## 3. It works

Now it looks like this:

![Normal SSH](https://images.gnollhack.com/wiki/IBMGraphicsWithPuTTY/ServerOptions3.png)
