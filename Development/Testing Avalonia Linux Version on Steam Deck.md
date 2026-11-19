> 👉 **These instructions set up a Steam Deck as a test device for the Linux version of GnollHack. You build the game on Windows as usual, copy it to the Deck over the network with one script, and start it from Gaming Mode, where Steam Input and the full-screen Deck experience are in play. Every run writes a log that you can follow live from Windows.**

The Steam Deck runs the same Linux build as the AppImage and the Steam depot, so this setup tests exactly what players get. It is the fastest way to develop and test [[controller support|/Development/Gamepad Support]]: after the one-time setup, a change goes from Visual Studio to the Deck in one command.

## 📋 Prerequisites

### 💻 Devices

- **Windows computer** that already builds the Linux version, as described in [[/Development/Build Instructions for Avalonia Linux Version on Windows]].
- **Steam Deck**, on the same Wi-Fi network as the computer, or connected by cable as described in [[Connecting the Deck|#connecting-the-deck]].
- **A USB or Bluetooth keyboard** for the one-time setup on the Deck. It is not strictly required, but the Deck's on-screen keyboard can be hard to use in Desktop Mode (see [[Getting a Keyboard|#2-get-a-keyboard]]). You need it only for a few commands, once.

### 🛠️ Software

Everything runs in the same WSL distribution that builds the Linux version. It needs `ssh`, `ssh-copy-id` and `rsync`. Ubuntu includes the first two, and `rsync` was installed with the packaging tools in the build instructions. Nothing needs to be installed on the Deck.

## 🔌 Connecting the Deck

The deploy script needs a network route from the computer to the Deck. All of these work with the same script and the same one-time setup:

| Connection | How | Deck address to use |
|:-----------|:----|:--------------------|
| **Wi-Fi** | The Deck and the computer are on the same network. Nothing to set up. | `steamdeck`, `steamdeck.local`, or the Deck's IP address |
| **Wired, through the router** | A USB-C Ethernet adapter or a dock on the Deck, with a cable to the router. | Same as Wi-Fi |
| **Wired, straight to the computer** | A USB-C Ethernet adapter on the Deck, with a cable to the computer's Ethernet port. On the Deck, in Desktop Mode, set the wired connection's IPv4 method to **Shared to other computers**. The Deck then gives the computer an address. | `10.42.0.1` |

> ℹ️ **Note:** The direct cable connection has not been tested yet. If it does not work as described, give both ends a static address in the same subnet instead.

A plain USB cable between the Deck and the computer does **not** work: the Deck cannot act as a network device over USB.

The script finds the Deck's address on Windows, which also understands `.local` names, so `steamdeck.local` works even when the router does not know the name `steamdeck`. The Deck's SSH identity is remembered under a fixed name, `steamdeck`, rather than under its address, so you set it up once and it keeps working when the Deck's address changes or you switch from Wi-Fi to a cable.

## 🛠️ One-Time Setup

The Deck ships with no password for its `deck` user, which also keeps SSH logins out. Steps 1 to 3 give it a password and turn on its SSH server; steps 4 to 6 let the computer log in with a key, so that you never type the password again.

### 1. Switch the Deck to Desktop Mode

Press the **Steam** button, select **Power**, and then **Switch to Desktop**. You can also hold the power button until its menu appears. After a few seconds, the Deck shows a KDE Plasma desktop.

On the desktop, the right trackpad moves the mouse pointer. Clicking the right trackpad is a primary click, and clicking the left trackpad is a secondary click.

Open **Konsole**, the terminal: click the application launcher at the left end of the taskbar, and select **System → Konsole**, or type `Konsole` in the launcher's search field.

To go back to Gaming Mode later, double-click **Return to Gaming Mode** on the desktop.

### 2. Get a Keyboard

Connect a USB keyboard through a USB-C adapter or a dock, or pair a Bluetooth keyboard from the Bluetooth icon in the taskbar's system tray.

Without one, click inside the Konsole window and press **Steam + X** to open the on-screen keyboard. Steam must be running for it to appear. In Desktop Mode, the keyboard can be wider than the screen, cutting off keys at both edges. If that happens, try setting the display scale to 100% under **System Settings → Display and Monitor**, or restart the Deck. A physical keyboard avoids the problem altogether.

### 3. Set a Password and Start the SSH Server

In Konsole, set a password for the `deck` user:

```bash
passwd
```

Then turn on the SSH server, and make it start automatically from now on:

```bash
sudo systemctl enable --now sshd
```

`sudo` asks for the password you just set.

> ℹ️ **Note:** Nothing appears while you type a password, not even dots. This is normal. Type it and press `Enter`.

> ℹ️ **Note:** If `passwd` asks for a **current** password, the `deck` user already has one. Use it if you know it. If you do not, skip `passwd`, and once the SSH server runs, follow [[6b. Without the Deck Password|#6b-without-the-deck-password]] instead of step 6. The `sudo systemctl` line needs the password too, but if the SSH server is already running (the deploy script reaches the Deck and stops only at the one-time SSH setup), you do not need it.

You do not need the Deck's keyboard after this step. The rest of the setup happens on the computer.

### 4. Create an SSH Key in WSL

If you have never created an SSH key in your WSL distribution, create one now. In PowerShell on the computer:

```powershell
wsl ssh-keygen -t ed25519
```

- When it asks **Enter file in which to save the key**, just press `Enter` to accept the default. Do not type or paste anything there: whatever you enter becomes the name of the key file, saved in your current folder.
- When it asks for a passphrase, press `Enter` twice to leave it empty. The deploy script cannot answer a passphrase prompt, so with a passphrase every deploy would fail.

Add `-d <name>` after `wsl` in this and the other commands if you build in a distribution other than the default one, for example `wsl -d Ubuntu-24.04 ssh-keygen -t ed25519`.

### 5. Find the Deck on the Network

The script uses the name `steamdeck` by default, which is the Deck's default host name. If your router does not know the name, use `steamdeck.local`, or the Deck's IP address, which you find in the Deck's **Settings → Internet**, in the details of the connected network. Pass the name or address to the script with `-DeckHost`.

### 6. Let the Computer Log In

Run the deploy script once from the repository root:

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Deploy-SteamDeck.ps1
```

On the first run, it stops at the connection check, because the Deck does not know your key yet. It prints the exact command to run, with your distribution and the Deck's current address filled in, for example:

```powershell
wsl -d Ubuntu-20.04 ssh-copy-id -o HostKeyAlias=steamdeck deck@192.168.1.20
```

Below the command, the script also prints the fingerprint of the identity it sees at that address, and the command that shows the Deck's own fingerprint.

Run the command it printed. It asks two things:

1. `Are you sure you want to continue connecting (yes/no)?` — before you answer, check that the device at that address is your Deck. On the Deck, in Konsole, run

   ```bash
   ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
   ```

   It prints a fingerprint that starts with `SHA256:`. If it equals the one the script and the question show, type `yes`. This remembers the Deck's identity under the name `steamdeck`. If it does not, type `no` and find out which device answered.
2. `deck@...'s password:` — enter the password you set in step 3. This is the last time you need it.

The setup is now done.

### 6b. Without the Deck Password

If the `deck` user already has a password that you do not know, but the SSH server is running, install the key from the Deck itself instead of with `ssh-copy-id`.

1. On the computer, show your public key. It is one line that starts with `ssh-ed25519`:

   ```powershell
   wsl -d <distro> cat ~/.ssh/id_ed25519.pub
   ```

   This is the **public** half of the key, which is safe to copy. Never copy `id_ed25519` without `.pub`.
2. Get that line to the Deck: for example, write it into a note or an email to yourself that you open in the Deck's web browser in Desktop Mode, or copy it to a USB stick.
3. On the Deck, in Konsole, add it to the keys the Deck accepts. Replace `<the line>` with the whole line, keeping the single quotes around it. To paste in Konsole, press **Ctrl+Shift+V**.

   ```bash
   mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '<the line>' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
   ```

4. Check that the Deck has the right key. On the Deck:

   ```bash
   ssh-keygen -lf ~/.ssh/authorized_keys
   ```

   and on the computer:

   ```powershell
   wsl -d <distro> ssh-keygen -lf ~/.ssh/id_ed25519.pub
   ```

   Both print the same fingerprint.
5. Trust the Deck's identity. On the computer, with the Deck's address from step 5:

   ```powershell
   wsl -d <distro> ssh -o HostKeyAlias=steamdeck deck@<address> true
   ```

   It asks `Are you sure you want to continue connecting (yes/no)?`. Compare the fingerprint it shows with the one `ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub` prints on the Deck, as in step 6, and type `yes` only if they are equal. It asks for no password.

The setup is now done.

## 🚀 Deploying the Game

### 1. Build

Build the game as described in [[/Development/Build Instructions for Avalonia Linux Version on Windows]]. The deploy script copies the staged build that `Build-LinuxPackages.ps1` leaves in the WSL distribution, so any of its targets will do. The tar.gz is the quickest:

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Build-LinuxPackages.ps1 -Targets TarGz -NoSentryUpload
```

### 2. Deploy

```powershell
win\win32\xpl\GnollHackM\Platforms\Linux\Packaging\Deploy-SteamDeck.ps1
```

The script copies the build to the folder `gnollhack-dev` in the Deck's home folder, together with the launcher script that the Steam shortcut points at. It copies only the files that changed since the last deploy, so a redeploy usually takes a few seconds. It ends with a summary of where everything is, and the command that shows the game's log.

To see what would be copied without changing anything on the Deck, add `-DryRun`. The script refuses to deploy while the game runs on the Deck; quit the game first, or add `-Force`.

| Parameter | Effect |
|:----------|:-------|
| **-DeckHost** | The Deck's host name, `.local` name or IP address. Default: `steamdeck`. |
| **-DeckUser** | The user on the Deck. Default: `deck`. |
| **-HostKeyAlias** | The name the Deck's identity is remembered under. Default: `steamdeck`. Give a second Deck its own name. |
| **-RemoteDir** | The deploy folder, relative to the Deck's home folder. Default: `gnollhack-dev`. |
| **-Version** | The staged version to deploy. Default: the version in `GnollHackM.csproj`. |
| **-SshKeyPath** | A WSL path to the SSH key to use. Default: the key from step 4 of the setup. |
| **-WslDistro** | The WSL distribution with the staged build. Default: the default distribution. |
| **-DryRun** | Shows what would be copied, and changes nothing on the Deck. |
| **-Force** | Deploys even while the game runs on the Deck. |

The deploy folder on the Deck, `/home/deck/gnollhack-dev/`, contains:

| Path | Contents |
|:-----|:---------|
| **gnollhack/** | The game. Replaced by every deploy. |
| **run-gnollhack.sh** | The launcher that the Steam shortcut starts. It writes the game's output to a log. |
| **VERSION** | The deployed version, the repository's commit, whether the game engine has debug information, and the time of the deploy. |
| **logs/** | One log per run. The last 20 are kept, and `latest.log` always points to the newest. |
| **dev.env** | Optional; see [[Environment Variables|#environment-variables]]. The deploy never touches it. |

Your saved games and settings on the Deck are in `~/.local/share/GnollHack`, outside the deploy folder, and survive every deploy.

> ℹ️ **Note:** The game is a Release build, so its crashes are reported to Sentry like any other test build. Keep this in mind when you see crash reports from Steam Deck hardware.

## 🎮 Running the Game

### 1. Add the Game to Steam

This is needed once, after the first deploy.

1. In Desktop Mode, open Steam.
2. Click **Add a Game** in the lower left corner, and then **Add a Non-Steam Game**.
3. Click **Browse**, and go to `/home/deck/gnollhack-dev/`. Change the file type filter to show all files, and select `run-gnollhack.sh`.
4. Click **Add Selected Programs**.

The shortcut is named `run-gnollhack.sh`. You can give it a better name in its **Properties** in Steam. It keeps working across deploys, since every deploy uses the same path.

### 2. Play in Gaming Mode

Return to Gaming Mode, and start the game from **Library → Non-Steam**. The game runs full screen, with Steam Input and the Deck's controls, just as a player would have it.

### 🖥️ Running in Desktop Mode

For a quick check that the game starts, you can also run it in Desktop Mode, from Konsole:

```bash
~/gnollhack-dev/run-gnollhack.sh
```

Or click `run-gnollhack.sh` in the file manager. The game then runs in a window, and the Deck's controls act as the desktop mouse and keyboard rather than as a game controller. Test controller features from Gaming Mode.

## 📜 Logs

Every run writes a log to `~/gnollhack-dev/logs/` on the Deck. The log starts with the deployed version, the SteamOS version, and the environment that matters for testing, such as whether the game was started from Gaming Mode. Then comes everything the game printed, and finally its exit status.

To follow the newest log live from Windows, run the command that the deploy summary printed, for example:

```powershell
wsl -d Ubuntu-20.04 ssh -o HostKeyAlias=steamdeck deck@192.168.1.20 tail -F /home/deck/gnollhack-dev/logs/latest.log
```

Leave it running while you play; it follows each new run as it starts. Stop it with `Ctrl+C`.

### ⚙️ Environment Variables

To start the game with extra environment variables, for example to turn on an experimental feature or extra logging, write them into `~/gnollhack-dev/dev.env` on the Deck, one `NAME=value` per line. The launcher reads the file before every run and copies it into the log. Remove the file, or the line, to go back to normal.

## 🔁 Daily Workflow

1. Build the Linux version: the native solution when the C code or game data changed, and then `Build-LinuxPackages.ps1 -Targets TarGz -NoSentryUpload`.
2. Run `Deploy-SteamDeck.ps1`.
3. Start the game from Gaming Mode, and follow the log from Windows.

The Deck can stay in Gaming Mode the whole time: deploys work in either mode, as long as the Deck is awake and the game is not running.

## ❓ Troubleshooting

| Symptom | Cause and fix |
|:--------|:--------------|
| **Cannot resolve '...' to an IPv4 address on Windows** | The computer cannot find the Deck by that name. Use `-DeckHost steamdeck.local`, or the Deck's IP address from **Settings → Internet** on the Deck. |
| **... answered, but no SSH server is running on it** (`Connection refused`) | The Deck is on the network, but its SSH server is off. Do step 3 of the setup. |
| **Cannot reach ...** (`Connection timed out`) | The Deck is asleep, on another network, or its address has changed. Wake it, check its network, and check its address in **Settings → Internet**. |
| **The one-time SSH setup ... is missing** (`Host key verification failed` or `Permission denied`) | The Deck does not know your key yet. Run the `ssh-copy-id` command that the script printed, as in step 6 of the setup. |
| `ssh-copy-id: ERROR: No identities found` | The WSL distribution has no SSH key. Do step 4 of the setup. |
| `passwd: Authentication token manipulation error`, or **Authentication failure** at the current password | The `deck` user already has a password, and this is not it. If you do not know it, install the key as in [[6b. Without the Deck Password|#6b-without-the-deck-password]]. |
| **The device at ... is not the one trusted as 'steamdeck'** | A different device answered at the Deck's address, or the Deck was reinstalled. Find out which before you trust the new identity. A second Deck needs its own `-HostKeyAlias`. |
| **GnollHackM is running on the Deck** | Quit the game, or add `-Force`. |
| **No staged build at ...** | The version has not been built yet. Run `Build-LinuxPackages.ps1`, or pass the staged version with `-Version`. The message lists the versions that are staged. |
| **rsync is missing ... copying the whole build with tar** | The Deck or the WSL distribution has no `rsync`. The deploy still works, but copies the whole game every time. Install `rsync` in WSL if it is missing there. |
| Several addresses are printed for the Deck | The Deck is connected over Wi-Fi and a cable at once. The script uses the first; pass another with `-DeckHost <address>` if the first does not work. |
| Two new files with long names appear in your folder after `ssh-keygen` | Something was typed at the **Enter file in which to save the key** prompt, which saved a key under that name. Delete both files, and make sure that `~/.ssh/id_ed25519` exists in WSL. |
| The on-screen keyboard is wider than the screen | See [[Getting a Keyboard|#2-get-a-keyboard]]. |

## 📖 Learn More

- [[/Development/Build Instructions for Avalonia Linux Version on Windows]]
- [[/Development/Avalonia Port]]
- [[/Development/Debugging Linux Version in WSL using Visual Studio Code]]

## 🔗 External Links

- [Steam Deck Desktop FAQ](https://help.steampowered.com/en/faqs/view/671A-4453-E8D2-323C)
