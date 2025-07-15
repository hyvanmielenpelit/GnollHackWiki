![gnoll-crystal-ball-4k-512](https://github.com/hyvanmielenpelit/GnollHack/assets/16661034/8d5b7790-2a74-4cbf-8185-6b4158ced305)

# Android & iOS Problems


## 1. Game crashes


### Reason 1: GPU acceleration on some devices causes crashes.


- **Solution:** Disable GPU Acceleration in the settings.


### Reason 2: Your device does not have enough RAM (less than 3 GB).


- **Info:** You can first check [[supported iPhones and iPads]] out. Unsupported Android devices are already filtered out by Google Play Store.
- **Solution:** Restart the device and disable Load Sound Banks in GnollHack's settings (you will hear no audio, then, though).​


## 2. Game starts with a dark gray GnollHack logo but then the main screen does not appear (except maybe for the background)


### Reason: You have disabled animations.​


- **Fix 1:** *(Samsung Galaxy phones and tablets)* Go to Android's **Settings → Accessibility → Visibility Enhancements** and disable **Remove Animations**.
- **Fix 2:** Go to **Android's Settings → (System) → Developer options** and set:​
    - Window animation scale to 1x
    - Transition animation scale to 1x
    - Animator duration scale to 1x

    If you do not have **Developer options** enabled, you can follow [these instructions](https://developer.android.com/studio/debug/dev-options#enable) to get them enabled, even though in that case it is unlikely that these settings are not at their default values. Note that the location of Developer Options varies by phone, so that it sometimes is in the root level of the settings and sometimes under **Settings → System**.​


## 3. Saved games have become incompatible


### Reason: You have upgraded the installation to an incompatible version.


*(This may be caused by auto-update.)*

- **Fix:** Downgrade your GnollHack installation.
    - **Android:** [[Android Releases]]
    - **iOS:** [[iOS Releases]]
- **Pre-emptive fix:** To prevent this happening in the future, please disable **auto-update**.
    - **Android:** Go to **Google Play Store → GnollHack** and click **three dots in the right top corner** and disable **Enable auto udate**.
    - **iOS:** Go to **Settings → App Store** and disable **App Updates**.


## 4. GnollHack is killed while on the background


### Reason: You have not disabled battery optimization for GnollHack


#### Android


- **Fix 1**: Go to **Settings → Apps → GnollHack → Battery** and set it to **Unrestricted**.
- **Fix 2**: Plug your device into power.
- **Test Results**: It's been tested on Samsung Galaxy A52s that the game is not killed within the first 10 minutes while on the background, when using the Unrestricted battery optimization mode. However, the game is in danger to be killed after that time due to excessive CPU usage.


## 5. Game screen is messed up


![android-messed-up-gpu](https://github.com/user-attachments/assets/d1590c12-f8e5-46b3-bea3-d45b1e9de4ea)


### Reason: Your phone's GPU is incompatible with Skia, our graphics rendering engine


This can happen with phones with Mediatek's CPU & GPU, such as Motorola Moto G73 5G, which has Mediatek Dimensity 930 SoC. It might have to do with GPU drivers, too.

- **Fix:** Disable **GPU Acceleration** in the settings.


####


# Android & iOS Troubleshooting Tools


## 1. View Panic Log


View the panic log in **About → View Panic Log**. It may contain some diagnostic data.


## 2. Activate *Send Diagnostic Data* in Settings


This enables the mobile client to send diagnostic data to a private channel on the GnollHack Discord server.


## 3. Send Crash Report


You can send us a crash report by clicking **About → Crash Report**.


## 4. Export and Import Saved Games


You can export and import your saved games by clicking:

- **About → Export Saved Games**
- **About → Import Saved Games**

This will make the saved games non-scoring, though.
