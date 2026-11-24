**Last updated:** 24 November 2026

This policy describes the personal data that the GnollHack app collects and sends, why, to whom, and for how long, and the rights you have over it. Our other privacy policies are listed on the [[Privacy Policy]] page.

## 1. Who We Are

The controller of your personal data is Hyvän mielen pelit ry (Sound Mind Games), a non-profit association registered in Finland.

- **Business ID:** 2722684-3
- **Address:** Kitarakuja 4D 53, 00420 Helsinki, Finland
- **Email:** gnollhack@hyvanmielenpelit.fi

## 2. Scope

This policy covers the following ports of GnollHack:

- Android port, available on the Google Play Store
- iOS port, available on the Apple App Store
- Windows, Linux, Steam Deck, and macOS ports, available on Steam and on GitHub

Your GnollHack account and the account website are covered by the [[GnollHack Account Privacy Policy]]. The app includes an optional AI-powered gameplay advisor called the Gnoll Overseer, which is covered by the [[Gnoll Overseer Privacy Policy]].

## 3. Data We Collect

The GnollHack app sends crash and error reports to Sentry, a crash reporting service, as described in section 3.1. These reports are sent by default, and the app has no setting that turns them off.

All other data described in this policy is sent only if you turn on the setting that controls it (sections 3.2 to 3.6).

### 3.1. Crash and Error Reports

#### 3.1.1. When Reports Are Sent

The app uses Sentry, provided by Functional Software, Inc., to find and fix crashes and errors. The app sends a report to Sentry when:

- The app or the game engine crashes. On Windows, Linux, Steam Deck, and macOS, a crash report is saved on your device and sent the next time you start the app.
- The app stops responding on Android or iOS.
- Android closes the app, for example because the device is low on memory. The app reports this the next time it starts.
- The game detects an internal error, such as an impossible situation or a panic, or the app catches an unexpected error.

The app also tells Sentry when an app session starts and ends, so that Sentry can count how many sessions end in a crash.

#### 3.1.2. Data in a Report

A report can contain:

- The error message and the program state at the time of the error, such as stack traces and, for crashes, the program's threads and loaded program files
- The app version and build number
- Device information: manufacturer, model, processor type, total and free memory, total and free storage, screen resolution, battery level and charging state, screen orientation, network status, the time the device was last started, and whether the device is rooted or an emulator
- Operating system name, version, and build
- Language and region settings and time zone
- Random identifiers created for the app installation, which are not linked to your GnollHack account
- An approximate location (country, region, and city), which Sentry derives from the IP address the report is sent from. The IP address itself is not stored with the report.
- The state of the current game: character name, role, race, dungeon and level, position on the map, turn count, difficulty, game mode, and internal game status flags
- The latest internal messages of the game engine, up to 40, which describe recent game events
- A log of your most recent actions in the app before the error, such as the buttons and menu items you selected, the questions the game asked, and the text you typed in answer to them (for example, a character name, an engraving, a wish, or a name for a pet)
- The names and locations of the save files the app opened, which include the character name and, on Windows, Linux, Steam Deck, and macOS, can include your user name on the computer
- Technical details about the app's sound, graphics, memory use, and installation type (for example, Steam or AppImage)
- On Android, the reason and the memory figures that Android records when it closes the app, and a list of what each part of the app was doing when it stopped responding

Reports do not contain your GnollHack account user name, password, or email address, your save files, your dumplogs, or screenshots.

### 3.2. Post Game Progress

If you turn on **Post Game Progress** under **Forum Posting** in the settings, the game posts messages about your game to the public **#player-log channel of the GnollHack Discord server**. If you enter your own Discord webhook in **Webhook Link**, the messages go to that channel instead. Tournament mode turns Post Game Progress on and always posts to the GnollHack Discord server.

No messages are posted in casual, explore, or debug mode.

Every message ends with:

- Your GnollHack account user name, if **Post Top Scores** is on and you are signed in
- The port version and port letters, which show the platform and, on Windows, Linux, and macOS, where the app was installed from (for example, Steam)

#### 3.2.1. Game Events

A message is posted when you make a wish, earn an achievement, kill a unique monster, receive a divine gift, have your life saved, receive or create an artifact, or genocide monsters. It contains:

- Character name
- Character stats: role, race, gender, alignment, and experience level
- Event description, including the text you typed when making a wish
- Turn count and time played
- Game mode and difficulty level

#### 3.2.2. Game Start, Save, and Restore

If **Record Game** and **Auto-Upload to Cloud** are also on, a message is posted when you start, save, or restore a game. It contains the same data as a game event message. A game start message also names the difficulty and game mode. Save and restore messages also include the dungeon level and a saved game code.

#### 3.2.3. End of Game

When a game ends by death, ascension, or escape, a message is posted with:

- Character name
- Character stats: role, race, gender, alignment, and experience level
- Score
- Turn count and time played
- Death reason, or how the game ended
- Game mode and difficulty level
- Plain text dumplog
- HTML dumplog

#### 3.2.4. Game Panic

If the game engine panics while Post Game Progress is on, the app posts a message to the private **diagnostics channel of the GnollHack Discord server**, whatever you answer when the app offers to create a crash report. The message contains:

- Character name
- Panic message
- Game mode and difficulty level
- Game version, port version, and port build number
- Operating system name and version, and whether the app is a Steam or Playtest version
- Device manufacturer and model
- Total memory, and free and total storage space

### 3.3. Post Top Scores

If you set up a **GnollHack account** in the settings and turn on **Post Top Scores**, the app checks your user name and password with the GnollHack account server when it starts. The server records the time you last signed in.

When a game ends by death, ascension, escape, or quitting, the app sends the following data to the GnollHack account server. Games in casual, explore, or debug mode, and games that are not eligible for scoring, are not sent.

- Game version number and edit level
- Game version number and edit level when the game was started
- Platform and platform version
- Port, port version, and port build number
- Store or download channel the app was installed from (for example, Google Play, the App Store, Steam, or GitHub)
- Port security level and save file tracking level
- Score
- Dungeon number and dungeon level of the place where the game ended
- Deepest dungeon level visited
- Hit points and maximum hit points
- Number of deaths
- Date the game started and date it ended
- The numeric user ID of your operating system account (always 1 on Windows and Android)
- Role, race, gender, and alignment
- Starting gender and starting alignment
- Experience level
- Character name
- Death reason, or how the game ended
- What the character was doing, if the character was helpless at the time of death
- Conducts and achievements, as flags and as comma-separated lists
- Turn count
- Real time played
- Start time and end time, in local time and in UTC
- Game flags, difficulty level, and game mode
- Whether the game is eligible for scoring, and whether tournament mode is on
- Number of times the game was recovered after a crash
- Plain text dumplog
- HTML dumplog
- GnollHack account user name
- GnollHack account password

The server stores this data with your account. It does not store your password, which is used only to sign you in.

Score entries and dumplogs are public. Anyone can view them, together with your GnollHack account user name, on the top scores pages and through the account server's public score list.

### 3.4. Bones Sharing

If **Allow Ghost Levels** and **Share Bones Files** are both on, and you have a GnollHack account set up, the app may send the bones file of a dead character to the GnollHack account server. About two out of three bones files are sent; the rest stay on your device. The app sends:

- Bones file
- Difficulty level
- The list of user names you allow or, with **Use Blacklist** on, do not allow to receive your bones files
- Game version number and version compatibility number
- Platform and platform version
- Port, port version, and port build number
- GnollHack account user name
- GnollHack account password, used only to sign you in

In return, the server may send you a bones file from another player. The app then confirms that it received the file, and the server deletes it. Each shared bones file is used only once. The server records each upload, download, and deletion with your account, the date, the difficulty level, and the platform and version details.

### 3.5. Save File Tracking

On Windows, Linux, Steam Deck, and macOS, **Save File Tracking** is on by default when you have a GnollHack account set up. Post Top Scores and Share Bones Files work only while it is on. When you save or load a game, the app sends the GnollHack account server:

- GnollHack account user name
- GnollHack account password, used only to sign you in
- The save time, file size, and a checksum (SHA-256) of the save file
- When loading, the tracking code the server returned when the game was saved

The server stores the time, file size, and checksum with your account. Save files themselves are not sent.

### 3.6. Game Recording and Cloud Storage

If **Record Game** and **Auto-Upload to Cloud** are both on, the app uploads your game recordings (replays) to our cloud storage, hosted on Microsoft Azure, in a folder named after your GnollHack account user name.

If you use **Save File Transfer** to move a saved game between devices, the app uploads the save file, its backup copy, and a description of the saved game to the same cloud storage, in a folder named after your GnollHack account user name. The description contains your account user name, the character name, the game version, a short description of the character and its location, the turn count, and the sizes and checksums of the files.

### 3.7. Custom Servers

You can enter your own server addresses in the settings: **Webhook Link** for Post Game Progress, and **Link** next to **Account** and **Posting** for the GnollHack account server. If you do, the data described in sections 3.2 to 3.5 is sent to those servers instead of ours, and the privacy practices of those servers apply. Tournament mode always uses our servers.

### 3.8. Server Logs

For each request from the app, the GnollHack account server records your IP address, your user name, the address of the request, the data sent, and the result. It also records the IP address of failed sign-ins. These logs are part of the server's security audit trail.

## 4. Purposes and Legal Bases

We use your data only for the purposes below. The legal basis of each is one of those in Article 6(1) of the General Data Protection Regulation (GDPR):

- **Contract**: The processing is needed to provide a feature you have chosen to use.
- **Legitimate interests**: The processing is needed for our legitimate interests, such as keeping the game and our servers working and secure, and those interests are not overridden by your rights. You can object to it (section 8).

| Purpose | Data | Legal basis |
|---|---|---|
| **Finding and fixing crashes and errors** | Crash and error reports (section 3.1) | Legitimate interests: finding and fixing crashes. The app has no setting that turns the reports off; you can object by email. |
| **Posting your game progress to Discord, including in tournament mode** | Post Game Progress messages (sections 3.2.1 to 3.2.3) | Contract: a feature you turn on |
| **Fixing game engine panics** | Game panic messages to the private diagnostics channel (section 3.2.4) | Legitimate interests: fixing game engine panics |
| **Top scores, bones sharing, save file tracking, cloud storage, and save file transfer** | Sections 3.3 to 3.6 | Contract: features of your GnollHack account that you turn on |
| **Security and abuse prevention** | Server request logs and failed sign-in records (section 3.8) | Legitimate interests: security and abuse prevention |

## 5. Recipients

| Recipient | What it receives | Why | Location |
|---|---|---|---|
| **Sentry** (Functional Software, Inc.) | Crash and error reports (section 3.1) | Crash reporting | European Union data region, Germany |
| **Discord** (Discord Inc.) | Post Game Progress and game panic messages (section 3.2) | Posting to the GnollHack Discord server, or to the channel of your own webhook | United States |
| **GnollHack account server**, run by us | Sections 3.3 to 3.5 and 3.8 | Running the features of your GnollHack account | United States |
| **Our cloud storage on Microsoft Azure** | Replays and saved games (section 3.6) | Storing replays and transferring saved games | United States |
| **Anyone** | Score entries and dumplogs with your account user name (section 3.3), and messages in the public #player-log channel (section 3.2) | These are public by design | Public |
| **A custom server you configure** (section 3.7) | The data of the features that use it | Your own choice | Set by that server; its own privacy practices apply |

Sentry's own privacy policy is at [sentry.io/privacy](https://sentry.io/privacy/), and Discord's at [discord.com/privacy](https://discord.com/privacy).

## 6. International Transfers

Crash and error reports stay in the European Union: Sentry stores them in its European Union data region, in Germany.

The GnollHack account server, our cloud storage on Microsoft Azure, and Discord are in the United States. Data that the app sends to them is transferred outside the European Economic Area.

## 7. Retention

| Data | Kept for |
|---|---|
| **Crash and error reports** | 90 days, after which Sentry deletes them |
| **Data described in sections 3.3 to 3.5** | Until you delete your GnollHack account |
| **Server request logs and failed sign-in records** | Indefinitely, as part of the server's security audit trail. When your account is deleted, your account and user name are removed from them. |
| **Messages posted to Discord** | They stay on Discord. |
| **Replays and saved games in our cloud storage** | Until you ask us to delete them |

When your GnollHack account is deleted:

- Your score entries stay on the public score list, but your user name, character names, and other game details are removed from them.
- Your dumplogs, your bones files and their records, and your save file tracking records are deleted.
- The server's request logs are kept, but your account and user name are removed from them. The IP addresses and the data sent in each request stay in the logs.
- Replays and saved games in our cloud storage are not deleted automatically. To have them deleted, contact us at gnollhack@hyvanmielenpelit.fi.

## 8. Your Rights

Under the GDPR, you have the right to:

- Get a copy of your personal data and information about how we use it (access)
- Have incorrect or incomplete data corrected (rectification)
- Have your data deleted (erasure)
- Have the use of your data restricted
- Receive the data you have given us in a machine-readable format and have it moved to another service (data portability)
- Object to processing based on our legitimate interests
- Withdraw your consent at any time, where processing is based on consent, without affecting the processing done before you withdrew it

To use these rights, email us at gnollhack@hyvanmielenpelit.fi. We answer within one month.

You can also act yourself on the **Personal Data** page of your account settings on [account.gnollhack.com](https://account.gnollhack.com): **Download** gives you a file with your personal data, and **Delete** deletes your GnollHack account. Some deletion requests are reviewed by an administrator before they are completed. Section 7 describes what deletion removes.

You also have the right to lodge a complaint with a supervisory authority. In Finland, it is the [Office of the Data Protection Ombudsman](https://tietosuoja.fi/en).

## 9. Security

The app keeps your GnollHack account user name and password in your device's secure storage. The GnollHack account server does not store the password that the app sends; it is used only to sign you in.

## 10. Children

A GnollHack account requires you to be at least 13 years old, and users under 18 need the consent of a parent or legal guardian, as set out in the [[GnollHack Account Terms of Service]]. The app works without an account. Crash and error reports are sent for every user, as section 3.1 describes.

If you are a parent or guardian and want a child's data deleted, email us at gnollhack@hyvanmielenpelit.fi.

## 11. Automated Decision-Making

We do not make decisions about you based solely on automated processing that have legal or similarly significant effects.

## 12. Changes to This Policy

We update the date at the top of this page whenever the policy changes.

## 13. Contact

For questions about this policy or your data, email us at gnollhack@hyvanmielenpelit.fi, or write to the address in section 1.
