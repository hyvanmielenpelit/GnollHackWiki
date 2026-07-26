Normally, playing GnollHack over SSH does not look as nice as playing GnollHack on Windows.

![Normal SSH](/uploads/Configuring%20PuTTY%20for%20IBM%20Graphics/NormalSSH.webp)

If you use [PuTTY](https://www.putty.org/), you can configure it to show better IBM Graphics.

## 1. Configuring PuTTY

You need to set Window → Translation → Remote Character Set to "CP437".

![Normal SSH](/uploads/Configuring%20PuTTY%20for%20IBM%20Graphics/PuTTYWindowTranslation.webp)

## 2. Activate IBM Graphics

There are two ways of activating the IBM graphics.

### 2.1 In GnollHack Options (Shift+o), set "symset" to "IBMgraphics"

![Normal SSH](/uploads/Configuring%20PuTTY%20for%20IBM%20Graphics/ServerOptions1.webp)

Here choose 'h' - IBMgraphics:

![Normal SSH](/uploads/Configuring%20PuTTY%20for%20IBM%20Graphics/ServerOptions2.webp)

### 2.2 Edit the options file

Instead of setting the IBMgraphics option everytime through Options (Shift+o), you can edit the options file and add the following declaration to its end:

`OPTIONS=IBMgraphics`

You can find the option to edit the options file in the game menu after you have logged in.

## 3. It works

Now it looks like this:

![Normal SSH](/uploads/Configuring%20PuTTY%20for%20IBM%20Graphics/ServerOptions3.webp)
