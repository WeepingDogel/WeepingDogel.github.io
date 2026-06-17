# Linux Mint Installation Guide


<!--more-->
## Introduction

Linux Mint is a Linux distribution based on Debian and Ubuntu, first released by the Linux Mint Team in 2006.

Its purpose is to provide a more complete out-of-the-box experience, offering a free, easy-to-use, comfortable, and elegant desktop operating system for home users and businesses.

It includes a browser, multimedia player, DVD playback support, Java, and other components. It comes in three desktop environment versions: Cinnamon, MATE, and Xfce.

## Download

You can download Linux Mint from the official website. The official site offers two download methods: HTTP download via mirror sites in your country, or torrent download.

Linux Mint official website: [https://www.linuxmint.com/](https://www.linuxmint.com/)

Users inside China can quickly download Linux Mint from these mirror sources:

* [Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/linuxmint-cd/stable/)
* [USTC Open Source Mirror](http://mirrors.ustc.edu.cn/linuxmint-cd/stable/)

![](/img/截图_2019-06-23_13-59-22.png)

![](/img/截图_2019-06-23_14-07-11.png)

## Installation

**Xfce version requirements: at least 512MB or more RAM, 15GB or more disk space.**

You can choose to install it on a **physical machine** or on a **virtual machine**.

If you need to install it on a **physical machine**, you need to use **Rufus** or similar **USB boot creation tools** to make a **bootable USB drive**.

This blog post will use a virtual machine as a demonstration.

![](/img/截图_2019-06-23_14-09-13.png)

![](/img/截图_2019-06-23_15-44-12.png)

### Installation Process

#### Mount the Installation Media

First, add the downloaded **ISO file** to the **virtual machine's** boot drive. If on a **physical machine**, insert your **prepared bootable USB drive**.

![](/img/截图_2019-06-23_15-47-56.png)

![](/img/截图_2019-06-23_15-49-43.png)

![](/img/截图_2019-06-23_15-51-26.png)

After selecting, click **OK**.

Then start the virtual machine. For a physical machine, you need to restart and press the corresponding key (ESC, F12, F11, etc.) — you can search for these online.

![](/img/截图_2019-06-23_15-59-20.png)

The virtual machine will automatically boot from the virtual CD. Just wait.

You'll see this screen, and after 10 seconds, you'll enter the CD Live environment.

![](/img/截图_2019-06-23_15-59-47.png)

After 10 seconds, you'll see the boot animation — it's actually quite nice to look at!

![](/img/截图_2019-06-23_16-00-08.png)

After a moment, you'll enter this interface — this is the CD Live I mentioned.

![](/img/截图_2019-06-23_16-00-31.png)

(Just a side note: the time shown might be different because the CD Live's default timezone might not be yours. Don't worry about it.)

#### Select Language and Preferences

Click **"Install Linux Mint"** to start the installation wizard. The first page asks you to select a language. I'll choose Simplified Chinese (choose whatever language you understand).

![](/img/截图_2019-06-23_16-06-03.png)

![](/img/截图_2019-06-23_16-06-26.png)

![](/img/截图_2019-06-23_16-06-39.png)

Then choose the keyboard layout — the default or US layout should be fine.

![](/img/截图_2019-06-23_16-06-58.png)

![](/img/截图_2019-06-23_16-14-47.png)

![](/img/截图_2019-06-23_16-15-18.png)

#### Partitioning

Now comes the **main event**. You must **pay close attention! Pay close attention! Pay close attention!**

(Said three times for emphasis)

You'll be given two options for partitioning. The first radio button means **formatting your entire hard drive** and then installing Linux Mint. This is fine for a virtual machine, but if you're on a **physical machine**, be **very careful** — whether the installation succeeds or fails, your original data will be lost.

The two checkboxes below don't matter because most people won't choose the first option anyway. This blog will choose **"Something else"**. So select the second option.

![](/img/截图_2019-06-23_16-15-56.png)

After selecting "Something else", you'll enter this page, where you can create a partition table.

![](/img/截图_2019-06-23_16-33-55.png)

Since this is a virtual machine demonstration, click "New Partition Table". For a physical machine, this isn't needed.

A prompt will appear — just click `Continue`.

![](/img/截图_2019-06-23_16-35-03.png)

An empty partition table will be created.

![](/img/截图_2019-06-23_16-35-14.png)

So, how do you partition?

Linux requires at least the `/` (root), `/boot`, and `swap` partitions. How much space should each get?

`/boot`: This partition stores system boot files. It only needs about 500MB. Don't underestimate this small partition — without it, if the root partition fills up, the system won't boot.

`SWAP partition`: Used for memory swap space. When memory is about to run out, the system moves some processes to SWAP. It can be half the size of your RAM, equal to it, or twice as much. But too large isn't good — if you have enough RAM, allocating too much to swap wastes disk space.

`Root partition`: This is straightforward — it's the system partition. Give it all the remaining space.

Here's how to do it:

Click the `+` button to create a partition.

![](/img/截图_2019-06-23_16-55-46.png)

![](/img/截图_2019-06-23_16-56-14.png)

First, create a `/boot` partition: 500MB, EXT4 filesystem, mount point `/boot`.

![](/img/截图_2019-06-23_17-00-20.png)

Then create the SWAP partition: Primary partition, 1024MB, filesystem type "swap area", no mount point needed.

![](/img/截图_2019-06-23_17-13-14.png)

![](/img/截图_2019-06-23_17-13-28.png)

Then create the root partition: Primary partition, EXT4 filesystem, mount point `/`, give it all the remaining space.

![](/img/截图_2019-06-23_17-19-40.png)

The partition setup is essentially complete.

![](/img/截图_2019-06-23_17-19-59.png)

#### Begin Automatic Installation

Now we can install. Click **"Install Now"**. A prompt will appear — click **"Continue"**.

![](/img/截图_2019-06-23_17-23-47.png)

Next, you'll be asked to select your region. This determines the system's timezone. Choose based on your actual location. For China, select Shanghai. Then click **"Continue"**.

![](/img/截图_2019-06-23_17-27-27.png)

Then set your name, computer name, username, and password. These can be anything, but make sure you remember your username and password.

There's a "Encrypt Home Directory" option — optional. I won't select it since it's not necessary for me.

After filling everything in, click "Continue".

![](/img/截图_2019-06-23_17-32-21.png)

The installation will start — fully automatic! Go grab a cup of milk tea and wait.

![](/img/截图_2019-06-23_17-34-43.png)

![](/img/截图_2019-06-23_17-35-02.png)

Just keep waiting.

Until this window appears:

![](/img/截图_2019-06-23_17-53-00.png)

Congratulations, you've successfully installed! Click **"Restart Now"**. If you're using a VM, remove the virtual optical drive and press Enter. Physical machine users should remove the USB drive and press Enter.

(Physical machines usually won't see this prompt.)

![](/img/截图_2019-06-23_17-58-03.png)

If everything went smoothly, you'll boot into the system.

Log in with the username and password you set, and enjoy.

![](/img/截图_2019-06-23_18-05-27.png)

---

## Summary

To summarize, Linux Mint is a very beginner-friendly Linux distribution. Its installation process is very simple — mostly just clicking through graphical operations. So I highly recommend it for beginners.

This blog is for reference and learning purposes only. If other issues arise, please search for solutions yourself.

If reprinting, please indicate the source.
