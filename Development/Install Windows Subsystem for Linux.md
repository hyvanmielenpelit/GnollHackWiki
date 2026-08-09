To install Windows Subsystem for Linux and reequired programs, please do the following:

1. [Install WSL](https://docs.microsoft.com/en-us/windows/wsl/install)
    - We recommend installing the latest Ubuntu LTS from Microsoft Store.
    - You may need to install a Linux kernel update package from here: https://aka.ms/wsl2kernel
    - Please write down your **WSL user name** and **password**. You will need them later.
2. Start WSL from the start menu.
3. Upgrade WSL with `sudo apt update && sudo apt upgrade`.
4. Install essential building software with `sudo apt install -y build-essential gdb rsync zip openssh-server`.
5. Install **dos2unix** by `sudo apt install dos2unix`.
6. Install **Bison** by `sudo apt-get install -y bison`.
7. Install **Flex** by `sudo apt-get install -y flex`.
8. Enable password authentication by editing sshd_config: `sudo nano /etc/ssh/sshd_config`:
    - `PasswordAuthentication yes`
9. `sudo ssh-keygen -A`.
10. `sudo service ssh start`
11. `sudo systemctl enable ssh` *(SSH starts on boot)*