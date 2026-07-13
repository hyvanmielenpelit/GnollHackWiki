> 👉 **Sharing your adventures, triumphs, and even your most spectacular defeats in GnollHack is a fantastic way to connect with the community, learn new strategies, and leave your mark on the world of roguelikes. Whether you want to post live updates of your journey, share ghost levels with other players, or showcase your high scores on global scoreboards, GnollHack has built-in features to make social sharing seamless and engaging.**

## 🌍 Where to Share

To discuss the game, ask for help, or share your gameplay media and achievements, you can join the active GnollHack communities:

### 💬 GnollHack Discord

The [GnollHack Discord Server](https://discord.gg/cQuExnzUQy) is the central hub for the community and developers. You can use the following channels to connect with others:

| Channel | Purpose | Best For |
| :--- | :--- | :--- |
| **#playing-gnollhack** | General gameplay discussions, advice, active runs | Active chat, getting advice |
| **#memes-and-pics** | Sharing memes, funny images, and gameplay videos | Media, visual humor |
| **#snapshots** | Sharing in-game snapshot files or text/HTML dumplogs | Inventory checks, tactical advice |
| **#player-log** | Automated live feed of player deaths, achievements, level ups | Following other players' live runs |

> 💡 **Tip:** If you are asking for help with an active run, posting a screenshot or a snapshot link in `#snapshots` alongside your question is highly recommended!

### 🌐 NetHack Subreddit

The **[r/nethack](https://www.reddit.com/r/nethack/)** subreddit is a great community to share details of your runs, ascensions, and strategic discussions with NetHack veterans who appreciate variant differences.

### 🌐 Roguelike Subreddit

The **[r/roguelikes](https://www.reddit.com/r/roguelikes/)** subreddit is excellent for reaching out to new players who are interested in general roguelike mechanics, modern graphics, and mobile-friendly gameplay.

## ⚙️ Built-in Sharing Features

GnollHack offers several integrated systems to help you share your game data automatically or manually:

| Feature | What it Shares | Requirements | How to Enable / Use |
| :--- | :--- | :--- | :--- |
| **Automated Progress** | Live game log updates (levels, achievements, deaths) | None | Enable **Post Game Progress** under *Forum Posting Settings* in [[Settings]]. |
| **Top Scores** | High scores, final stats, and HTML dumplogs | [[GnollHack Account]] | Enable **Post Top Scores** under *Server Posting Settings* in [[Settings]]. |
| **Bones Files** | Dead character inventory, stats, and ghost | [[GnollHack Account]] | Enable **Share Bones Files** under *Server Posting Settings* in [[Settings]]. |
| **In-Game Snapshots** | Active game stats, inventory, and full HTML log | None | Use extended command `#snapshot` or **Snapshot** button in the game menu. View via **Vault** -> **Snapshots** and tap **Share**. |
| **Replays** | Recorded gameplay inputs and logs | None | Enable **Record Game** in Replays Settings. View via **Vault** -> **Replays** and tap **Share**. |

### 📢 Automated Discord Game Progress

You can configure GnollHack to automatically post live updates of your character's major events (such as levels gained, achievements unlocked, or cause of death) directly to the **GnollHack Discord's #player-log** channel.

- Enable **Post Game Progress** under the **Forum Posting Settings** in the game's [[Settings]].

### 🏆 Posting Top Scores & Scoreboards

Veteran players can showcase their completed games and ascensions to the wider NetHack community. When your game ends:

- If you have registered a [[GnollHack Account]] and enabled **Post Top Scores** under **Server Posting Settings**, the game posts your score and final stats to the GnollHack Account server.
- The server publicly exposes the game results, which allows the **[NetHack Scoreboard](https://nethackscoreboard.org)** and **[Junethack](https://junethack.net)** to automatically track and display your achievements.
- On the account website, you and other players can view recent games, overall win rate statistics, and even inspect detailed HTML dumplogs.

> ℹ️ **Note:** Only games played with server posting enabled from the start will be properly tracked on external scoreboards.

### 🪦 Bones Sharing

When your character dies in Classic mode, their dead body, inventory, and ghost can be uploaded as a "bones file" to the server. Other players might then download this file and encounter your ghost in their own games!

- This requires a [[GnollHack Account]] and having **Share Bones Files** enabled under **Server Posting Settings**.
- For more details on how ghost levels work, read the [[Bones Sharing]] guide.

### 📸 In-Game Snapshots

If you want to share a detailed log of your current in-progress game (your inventory, attributes, conducted actions, and game log), you can take a snapshot at any time:

- Use the extended command `#snapshot` or press the **Snapshot** button in the **Game Menu** (`⚙️`).
- To view your taken snapshots, go to **Vault** on the main screen and tap **Snapshots**. Tapping on a snapshot will display its detailed HTML dumplog.
- At the bottom of the snapshot viewer, you can tap the native **Share** button to export the snapshot file directly to Discord, Reddit, email, or other applications using your device's sharing sheet.

> 💡 **Tip:** Snapshots capture your entire inventory, status effects, and recent message log. They are the best way to share your game state without recording a full replay.

### 📹 Replays

You can record your gameplay and share the replays with other players, or download and watch their runs. To enable recording:

- Enable **Record Game** under the **Replays Settings** in the [[Settings]] to let the client record your gameplay.

#### 🕹️ Replay Sharing Workflows

The game supports two different methods for sharing and playing back recorded games:

##### ☁️ Cloud Storage

###### 📤 How to Upload / Share

- Configure a custom **Cloud Storage** connection and enable **Auto-Upload to Cloud** in the [[Settings]] to automatically upload replays.
- Alternatively, go to **Vault** -> **Replays**, select a local replay, and tap the **Upload** button.

###### 📥 How to Watch

- Go to **Vault** -> **Replays** and select **Cloud** from the folder picker.
- Select the replay you want to watch and tap **Download**.
- Switch the folder picker back to **Downloaded** to play and watch the downloaded run.

##### 📦 Manual ZIP Archive

*Great for Discord, Reddit, or direct file sharing*

###### 📤 How to Upload / Share

- Go to **Vault** -> **Replays**.
- Select the local replay you want to share and tap **Share**. This builds a `.zip` archive and opens your device's sharing sheet to export the file.

###### 📥 How to Watch

- Download the shared `.zip` replay file to your device.
- On the main screen, go to **About** -> **Manage Files** and tap **Import Replays**.
- Select the `.zip` file to extract and validate the replay.
- Go back to the main screen, open **Vault** -> **Replays**, and select the imported replay to watch the run.

> ⚠️ **Warning:** Replay files should generally match your current game version to ensure accurate playback. Older replays may not play correctly on newer versions.

## 📷 Tips for Manual Sharing

### 🖼️ Taking Clean Screenshots

If you want to manually capture a screenshot (e.g., using `Win+Shift+S` on Windows or your mobile device's default buttons) to post in `#playing-gnollhack`, `#snapshots`, or `#memes-and-pics`:

- You may enable **Hide Message History** under **System Settings** in the [[Settings]] to temporarily hide the message box, allowing a cleaner view of the map and UI.
- You can customize the status bar layout using settings like **Show Score** and **Show XP** to choose exactly how much information is shown in your screenshot.

> 💡 **Tip:** When sharing a screenshot to ask for help, make sure your inventory or relevant stats are visible if they are pertinent to your question.
