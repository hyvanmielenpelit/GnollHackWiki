## Ubuntu 20.04

1. Make sure **gcc**, **bison**, **flex**, and **libncurses** are all installed and up to date:
    - `sudo apt-get install build-essential`
    - `sudo apt-get install flex bison`
    - `sudo apt-get install libncurses5-dev libncursesw5-dev`
2. Create a directory for the GnollHack repository (`mkdir [directory path of your GnollHack repository]`).
3. Go to your GnollHack repository with `cd [directory path of GnollHack repository]`.
4. Download the sources from GitHub using `git clone https://github.com/hyvanmielenpelit/GnollHack.git`.
5. Make setup.sh readable and executable with `sudo chmod a+rx ./sys/unix/setup.sh`.
6. Run `setup.sh` to create a makefile in the main GnollHack directory:
    - **On GnollHack public servers (with a common xlogfile):** `sudo ./sys/unix/setup.sh ./sys/unix/hints/linux-gnh-debug`
    - **Otherwise:** `sudo ./sys/unix/setup.sh ./sys/unix/hints/linux-debug`
7. Compile GnollHack with `sudo make install -B`. This compiles GnollHack into /gnh directory (under the root directory).
8. Finally, `cd /gnh` and type `sudo chmod -R a+rw *` to have all necessary read and write permissions.
9. You should be now able to play GnollHack by typing `./gnollhack`.