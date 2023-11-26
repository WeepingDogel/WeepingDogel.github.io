# About fcitx5, and recent environment variable issues


<!--more-->
## What happened

I recently received a message like this
>For those who use `$HOME/.pam_environment` to set environment variables, take note! Due to [CVE-2010-4708](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2010-4708), pam upstream is set to not read user's environment variable settings by default in version 1.4.0, and users are required to change their environment variable settings or restore the original default read behavior.
>
>ref: [Linux environment variables how to set Evian's Blog](https://blog.lilydjwg.me/2020/7/22/linux-environment-variables.215496.html)

~~Why is the 10-year vulnerability only now fixed?~~ Emmmm, so that's what the vulnerability is.

Emmmm, so that is `.pam_environment` this file can not be used ......

Here thanks to [lilydjwg](https://blog.lilydjwg.me/2020/7/22/linux-environment-variables.215496.html) for writing out the way to deal with various situations

I'll write a note about replacing fcitx5 in xfce + lightdm environment... Other specifics can be found in what **lilydjwg** wrote... (Escape

## fcitx5 vs fcitx

* Fcitx
> [Fcitx](https://en.wikipedia.org/wiki/Fcitx) (Flexible Input Method Framework) ── i.e. Little Penguin Input Method, which is an [input method](https://en.wikipedia.org/) distributed under GPL wiki/Input_method) platform, which can support multiple input methods by installing the engine, and supports simple input and output, it is a common Chinese input method in Linux OS. It has the advantage of being short and compact, and has good compatibility with programs.
>
> --- [Arch Wiki](https://wiki.archlinux.org/index.php/Fcitx_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

* Fcitx5
>Fcitx5 is the next generation input method framework after [Fcitx](https://wiki.archlinux.org/index.php/Fcitx). 
>
> --- [Arch Wiki](https://wiki.archlinux.org/index.php/Fcitx5_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

Daily lazy, direct quotes (flee

## Okay, let's get right to it

> first post my system situation
>
> Operating system: Arch Linux
>
> Desktop environment: xfce
>
> Display Manager: lightdm

Actually, just writing the input method environment variables from `.pam_environment` to `.xprofile` will solve the problem, but I'd like to try fcitx5.

### Uninstall the old version fcitx

First of all, we need to uninstall the original fcitx, I was using `fcitx-googlepinyin` input method before, so I need to uninstall this package too, because there will be dependency.

Besides, all the packages that have some relationship with fcitx should be uninstalled, otherwise `pacman` will report error, so you have to execute this

>(PS: you may not use Google input method, so please change `fcitx-googlepinyin` to the package name of the input method you installed)

```txt
sudo pacman -Rs fcitx-configtool fcitx-googlepinyin fcitx-qt5 fcitx
```

Next, delete this file, it's useless anyway (escape

```txt
$ sudo rm -rf . /.pam_environment
```


### Installing fcitx5

Now to install fcitx5, this is how to do it


* fcitx5

   * The main package, no need to explain

* fcitx5-chinese-addons

   * Chinese input method package .... Arch Wiki explains it like this.
       > [fcitx5-chinese-addons](https://www.archlinux.org/packages/?name=fcitx5-chinese-addons) contains a lot of Chinese input methods: Pinyin, ShuangPin, WubiPinyin, Natural Code, CangJie, BingToad Holographic, ErBi, etc.

* fcitx5-im
   * Environment dependency package, you have to install it, otherwise you can't type on some software

* fcitx5-configtool
   * fcitx5's GUI configuration tool, because I don't know how to modify the configuration file, so I installed this. Install it after the three above.

Then, execute
```txt
$ sudo pacman -S fcitx5 fcitx5-chinese-addons fcitx5-im fcitx5-configtool
```

After the package is installed, it will theoretically boot up, but well, there can be some metaphysical problems, so do this manually first

```txt
$ sudo cp /usr/share/applications/fcitx5.desktop ~/.config/autostart/ -v
```

### Environment variables

Well, finally it's set environment variable, since `.pam_environment` can't be used, where to write it? 

[lilydjwg](https://blog.lilydjwg.me/2020/7/22/linux-environment-variables.215496.html) said:
> Using X11 desktop environment, usually login through display manager, such as lightdm and sddm. Both of them support `~/.xprofile`. This file will be sourced during boot, using a shell determined by `dm` itself. Both lightdm and sddm use `/bin/sh` (in the files `/etc/lightdm/Xsession` and `/usr/share/sddm/scripts/Xsession` respectively). As you can see, in addition to reading `.xprofile`, lightdm also reads `.profile`. sddm even reads the startup configuration scripts for bash, zsh, tcsh, and fish.

That is, we need to write the fcitx5 environment variables in the `.xprofile` file

Then...

```txt
$ vim . /.xprofile
```

Write these things in it

```sh
export INPUT_METHOD=fcitx5
export GTK_IM_MODULE=fcitx5
export QT_IM_MODULE=fcitx5
export XMODIFIERS=@im=fcitx5
```

Next you can choose to restart `lightdm`,

```txt
$ sudo systemctl restart lightdm
```

Or reboot the system.

```txt
$ sudo reboot
```

At this time, a keyboard appears in the status bar of xfce, but pressing <kbd>`CTRL`</kbd> + <kbd>`SPACE`</kbd> but it does not bring up the Chinese input method, so what should we do?


Right-click the keyboard icon, click Configure, and then go to the QT configuration tool to add Chinese input methods on it!

![](/img/2020-07-25_15-52.png)

Just double click to add to the left ~

Then click OK and start enjoying fcitx5!


## Reference links
* [How to set environment variables for Linux - Evian's Blog](https://blog.lilydjwg.me/2020/7/22/linux-environment-variables.215496.html)
* [Fcitx5 (Simplified Chinese) - ArchWiki](https://wiki.archlinux.org/index.php/Fcitx5_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* [Fcitx - Wikipedia](https://en.wikipedia.org/wiki/Fcitx)
* [Fcitx (Simplified Chinese) - ArchWiki](https://wiki.archlinux.org/index.php/Fcitx_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

Translated with www.DeepL.com/Translator (free version)
