# Solve the problem of dual screen with NVIDIA and Intel GPUs


<!--more-->
## Introduction

Recently I bought a new monitor made by ViewSonic, but I meet some problems of the dual GPUs.

In the past years, I have used only one screen which is installed in my laptop without NVIDIA graphcial drivers. (Only use the Intel core GPU).

However, because of the new monitor added, the ntegrated graphics is not powerful enough to output two screens.

Therefore, I decide to install the NVIDIA grapcial driver of the RTX3050 on my Arch Linux in order to make use of the Discrete Graphics Card to output the new screen.

But things are not running well...

The reason why I crashed the wall is that I used to running Gnome on wayland mode before.

But it is said that NVIDIA drivers are not performing well on wayland?

So it truly means that I have to abandon the idea to output two screen on wayland.

Oh it's bad! I have to come back to the hugging of the X11!

## Beginning

At the beginning of that, I plugged the miniDP into the laptop and the another port into the monitor.

But disappointingly, it can't be lighted up at all. QAQ.

Maybe the miniDP port can not output anything because of missing the NVIDIA driver.

So I have to install it.

## Installation of the NVIDIA drivers

The first step is to install the drivers. Yeah notefuly, it's the first step, not the last.

```commandline
$ sudo pacman -S nvidia nvidia-utils lib32-nvidia-utils nvidia-prime
```

However, the screen was still not displaying anything...

Then I went to the Arch Linux CN group to ask the guys in community.

After discussion, I finally got the solution.

## Open the `ibt`

About on the March, [I faced a problem of VirutalBox and set the `ibt=off`](/en/posts/problem_of_virtualbox_appeding_starting_vm/).

But now it is not required to be `off`, I need to remove the param of the kernel.

Edit the file: `/etc/default/grub`,

```commandline
$ sudo vim /etc/default/grub

```

```conf
GRUB_DEFAULT="0"
GRUB_TIMEOUT="100"
GRUB_DISTRIBUTOR="Arch"
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash loglevel=3 rd.udev.log_priority=3 vt.global_cursor_default=0"
GRUB_CMDLINE_LINUX="ibt=off"
.........
```

then remove the `ibt=off` in `GRUB_CMD_LINE_LINUX`:

```conf
GRUB_DEFAULT="0"
GRUB_TIMEOUT="100"
GRUB_DISTRIBUTOR="Arch"
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash loglevel=3 rd.udev.log_priority=3 vt.global_cursor_default=0"
GRUB_CMDLINE_LINUX=""
.........
```

Then regenerate the `grub.cfg`:

```commandline
$ sudo grub-mkconfig -o /etc/grub/grub.cfg
```

## Set NVIDIA modeset

Then I need to check the value of the `nvidia-drm.modeset`.

```commandline
$ cat /sys/module/nvidia_drm/parameters/modeset
```

It shows:

```
N
```

Now I need to add `nvidia-drm.modeset=1` into Kernel Paramaters.

{{< admonition type=tip title="Explanation from ChatGPT" open=true >}}
The `nvidia-drm.modeset=1` kernel parameter enables the **NVIDIA Direct Rendering Manager KMS (Kernel Mode Setting)**. KMS is a method for setting display resolution and depth in the kernel space rather than user space.
{{< /admonition >}}

Edit the file: `/etc/default/grub`

```commandline
$ sudo vim /etc/default/grub
```

Add the `nvidia-drm.modeset=1` into `GRUB_CMDLINE_LINUX_DEFAULT`

```conf
........
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash loglevel=3 rd.udev.log_priority=3 vt.global_cursor_default=0 nvidia-drm.modeset=1"
........
```

Then regenerate the grub configuration file.

```commandline
$ sudo grub-mkconfig -o /boot/grub/grub.cfg
```

And reboot.

## Use mutter-performance

Still, it's not performing well after restarting the system.

For this reason, it should be a bit better to use the `mutter-performance`.

{{< admonition type=tip title="Explanation from ChatGPT" open=true >}}
`mutter-performance` is an optimized version of the Mutter window manager, particularly tweaked for performance. Mutter is the default window manager for GNOME 3, which is responsible for arranging, interacting with, and animating windows [linkedin.com](https://www.linkedin.com/company/mutter-performance/).
{{< /admonition >}}

This package should be installed from [AUR](https://aur.archlinux.org)

```commandline
$ paru -S mutter-performance
```

After installation, the desktop truly ran a little faster, but it's still not enough.

And by the way, it's time to remove the `xf86-video-intel`. It is not required in new devices.

```commandline
$ sudo pacman -Rs xf86-video-intel
```
{{< admonition type=tip title="Explanation from ChatGPT" open=false >}}
The xf86-video-intel package is a driver for Intel integrated graphics chips that is maintained by the X.Org project. However, for modern Intel graphics hardware (roughly 2007 and newer), it is often recommended to remove this package for several reasons:

Better support with modesetting driver: The modesetting driver, which is part of the X server and does not need to be installed separately, has better support for modern graphics features and hardware. It is maintained by the X.Org project and tends to keep up with new developments in graphics technology github.com.

Issues with xf86-video-intel driver: The xf86-video-intel driver has been known to cause issues on some systems, including graphical glitches and poorer performance compared to the modesetting driver. In some cases, it can even lead to system instability bbs.archlinux.org.

Lack of active development: The xf86-video-intel driver has not seen active development for several years, which means it may lack support for features found in newer hardware and software. On the other hand, the modesetting driver is actively developed as part of the X server reddit.com.

To remove the xf86-video-intel package, you can use the package manager of your specific Linux distribution. Here's an example using pacman, the package manager for Arch Linux:
```commandline
sudo pacman -R xf86-video-intel
```

After removing the package, restart your system to ensure the changes take effect.

Remember to check the documentation of your specific distribution for the correct way to remove packages and handle drivers.
{{< /admonition >}}


## Set X-11 Configuration

According to the [Arch Wiki](https://wiki.archlinux.org/title/NVIDIA_Optimus#Use_NVIDIA_graphics_only), I need to set some X-11 Configuration, intending to use the NVIDIA graphics only.

Write in the file `/etc/X11/xorg.conf.d/10-nvidia-drm-outputclass.conf/`: 
```conf
Section "OutputClass"
    Identifier "intel"
    MatchDriver "i915"
    Driver "modesetting"
EndSection

Section "OutputClass"
    Identifier "nvidia"
    MatchDriver "nvidia-drm"
    Driver "nvidia"
    Option "AllowEmptyInitialConfiguration"
    Option "PrimaryGPU" "yes"
    ModulePath "/usr/lib/nvidia/xorg"
    ModulePath "/usr/lib/xorg/modules"
EndSection
```

Then I need to create two `*.desktop` files to configure the GDM.

Write in `/usr/share/gdm/greeter/autostart/optimus.desktop` and `/etc/xdg/autostart/optimus.desktop`

```conf
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
```


Finally, I rebooted and fixed the problem.

Yay!

## References

* [Phind.com](https://www.phind.com)
* [NVIDIA Optimus - ArchWiki #Use_NVIDIA_graphics_only](https://wiki.archlinux.org/title/NVIDIA_Optimus#Use_NVIDIA_graphics_only)
* [NVIDIA Optimus - ArchWiki #GDM](https://wiki.archlinux.org/title/NVIDIA_Optimus#GDM)

