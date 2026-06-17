# How to Modify Software Sources in Linux Mint


<!--more-->
## Introduction

After installing Linux Mint, one of the first things you may want to do is modify your software sources.

![](/img/2020-11-07_14-12.png)

The default software sources in Linux Mint are official ones, which may take a long time to download and update packages. Therefore, it's recommended to modify the software sources and use a mirror source that is closer to you.

For Linux Mint, there are basically two ways to modify the software sources.

**Note: Choose only one of the following options.**

## Method 1: Using the Terminal

We'll first go to the TUNA mirror site and take a look at the help documentation (https://mirrors.tuna.tsinghua.edu.cn/help/linuxmint/).

The content is as follows:

![](/img/2020-11-07_15-07.png)

"Oh, I see. Maybe you're having trouble understanding how to do it. Here's a detailed guide on how to perform the operation:

First, move your mouse cursor to the bottom left corner of the screen and open the Terminal."


![](/img/截图_2020-11-07_14-28-48.png)

![](/img/2020-11-07_14-34.png)

To modify the software sources, we first need to edit the `/etc/apt/sources.list` file.

It seems that Mint does not come with `vim` pre-installed, so we will use `nano` here.


```bash
$ sudo nano /etc/apt/sources.list
```

**Note: `sudo` is required and do not forget to enter your password after pressing Enter in the terminal.**

![](/img/2020-11-07_14-39.png)

When you open the file, you may notice that it appears empty except for some English comments.

You can start writing into the file by following the instructions provided by the TUNA mirror site or other tutorial
```txt
deb http://mirrors.tuna.tsinghua.edu.cn/linuxmint/ ulyana main upstream import backport
```

I understand. To complete the process, we also need to add Ubuntu repositories as some packages in Mint require them. Let's take a look at the [Ubuntu help documentation](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/) for further instructions.

![](/img/2020-11-07_14-46.png)

Great, it sounds like you have a good understanding of the process! Yes, you can modify the URLs in the `/etc/apt/sources.list` file and replace `archive.ubuntu.com` with `mirrors.tuna.tsinghua.edu.cn`. This will help speed up the process of downloading and updating packages in Linux Mint.

```txt
#deb cdrom:[Linux Mint 20 _Ulyana_ - Release amd64 20200624]/ focal contrib main

# This system was installed using small removable media
# (e.g. netinst, live or single CD). The matching "deb cdrom"
# entries were disabled at the end of the installation process.
# For information about how to configure apt package sources,
# see the sources.list(5) manual.

deb http://mirrors.tuna.tsinghua.edu.cn/linuxmint/ ulyana main upstream import backport
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu focal main restricted universe multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu focal-updates main restricted universe multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu focal-backports main restricted universe multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
```
Like this：

![](/img/2020-11-07_14-49.png)

Exactly! After modifying the software sources, you can run the command `sudo apt update` in the terminal to update the package lists. This will allow you to download and install packages much faster than before.

## Method 2: Using the Update Manager

irst, click on the "Menu" button in the bottom left corner of the screen to access the applications menu. Then, search for "Settings Manager" and click on it to open the manager.

![](/img/截图_2020-11-07_15-06-34.png)

Next, scroll down the Settings Manager window until you find the "Software Sources" option. Click on it to open the software sources settings.

![](/img/2020-11-07_15-08.png)

Hmm, didn't you see it at the beginning?

![](/img/2020-11-07_15-09.png)

Yes, you are correct! The TUNA mirror site was mentioned earlier in this guide as an example of a mirror that can be used to modify the software sources.

![](/img/2020-11-07_15-10.png)

Then use this software to modify the sources to use mirrors hosted in China. However, I am not sure of the exact steps on how to do this.

![](/img/2020-11-07_15-12.png)

Oh yeah! Anyway, this is it... Just use your mouse to click around, and you're good to go!

![](/img/2020-11-07_15-14.png)

Next, you will be prompted to update the apt cache. Click "OK" to continue.

![](/img/2020-11-07_15-15.png)

Wait for the process to finish, and you're done!

![](/img/2020-11-07_15-16.png)

## Updating Software Packages

Once you have set up the apt software sources, the next step is to perform necessary software package updates.

Here are two methods to update your software packages:

**Note: Still, you can choose either Method 1 or Method 2 to update your software packages.**

### Method 1: Using the Terminal

1. Open the Terminal by clicking on the "Menu" button in the bottom left corner of the screen and searching for "Terminal".
2. In the Terminal, type the following command and press Enter:

```bash
$ sudo apt upgrade
```
3. Enter your password when prompted and press Enter again.
4. Wait for the update process to finish.

![](/img/2020-11-07_15-26.png)

![](/img/2020-11-07_15-28.png)

![](/img/2020-11-07_16-44.png)

Then, you can reboot your system.

### Using the Update Manager

![](/img/2020-11-07_15-19.png)

Click it!

![](/img/2020-11-07_15-20.png)

Then you just need to enter the password.

![](/img/2020-11-07_15-21.png)

Just click to install the update.
![](/img/2020-11-07_15-24.png)

确定Click OK

![](/img/2020-11-07_15-25.png)

Screenshots are exhausting...then just wait for it to finish running.

![](/img/2020-11-07_15-25_1.png)

Next, restart the virtual machine and it will be ready to use.
## Conclusion

First of all, I used Linux Mint 20 for demonstration, which may be updated in the future and some details in this article may differ from the actual situation, but the operations are similar. Please adjust accordingly based on your actual situation.

Secondly, ~~please don't laugh!~~ This article is aimed at beginners who are just starting to learn about Linux. 

If there are any shortcomings or small mistakes caused by carelessness, please leave a message in the Gitalk section below.

Finally, this site follows the [CC-BY-NC 4.0 license](https://creativecommons.org/licenses/by-nc/4.0/)，please indicate the source when reprinting.

----

## Reference links

* [Linux Mint | Mirror Usage Guide | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/linuxmint/)

* [Ubuntu | Mirror Usage Guide | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)


