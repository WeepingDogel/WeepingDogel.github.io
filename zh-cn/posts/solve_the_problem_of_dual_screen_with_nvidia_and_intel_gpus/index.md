# 解决 NVIDIA 和 Intel GPU 双屏问题


<!--more-->
## 序

最近买了个优派的新显示器，但是我遇到了多显卡问题。过去一年我都是用笔记本自带的显示器跑 Gnome, 没有装 N 卡闭源驱动。

然而，因为买了新显示器，用核显来带两个屏幕，显然性能不够。

因此，我打算在我的 Arch 给这张 3050 装闭源驱动，用来带新的显示器。但是过程并不是很顺利......

我踩坑的原因是我之前习惯用 wayland 模式来跑 Gnome 的，但据说 N 卡的闭源驱动在 wayland 表现不太好？

所以这意味着我必须放弃用 wayland 来带两个屏幕，这太糟糕了，我不得不回到 X11 的怀抱了。


## 起步

最开始呢，我直接把显示器插在了笔记本上的 mini-DP 口，另一头插在显示器的 DP 口上。

但失望的是，它根本没有亮起来。 QAQ

也许是这个 miniDP 口在缺少N卡驱动的情况下不能输出。

所以我打算把它装上。

## 安装 N 卡驱动

第一步是安装驱动，但需要注意的是，这是第一步，而不是万事大吉。

```commandline

$ sudo pacman -S nvidia nvidia-utils lib32-nvidia-utils nvidia-prime
```

然而，这显示器仍然没有亮...

于是我到 ArchCN 群问大佬。

经过讨论之后，我得到了解决问题的方法。

## 打开 `ibt`

大概在三月份的时候，[我遇到了一些 VirtualBox 的问题](/zh-cn/posts/problem_of_virtualbox_appeding_starting_vm/)。

但是现在不需要关掉了，所以我需要把它从内核参数当中移除。

编辑文件：`/etc/default/grub`

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

然后将 `ibt=off` 从 `GRUB_CMD_LINE_LINUX` 当中删除：

```conf
GRUB_DEFAULT="0"
GRUB_TIMEOUT="100"
GRUB_DISTRIBUTOR="Arch"
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash loglevel=3 rd.udev.log_priority=3 vt.global_cursor_default=0"
GRUB_CMDLINE_LINUX=""
.........
```

然后重新生成 `grub.cfg` 配置文件

```commandline
$ sudo grub-mkconfig -o /etc/grub/grub.cfg
```

## 设置 NVIDIA modeset

然后我需要查看 `nvidia-drm.modeset` 的值。

```commandline
$ cat /sys/module/nvidia_drm/parameters/modeset
```

它返回的结果：

```commandline
N
```

现在我需要向内核参数添加 `nvidia-drm.modeset=1` 。

{{< admonition type=tip title="ChatGPT 的解释" open=true >}}
`nvidia-drm.modeset=1`内核参数启用了**NVIDIA Direct Rendering Manager KMS（内核模式设置）**。KMS是一种在内核空间而非用户空间设置显示分辨率和深度的方法。
{{< /admonition >}}

编辑文件：`/etc/default/grub`

```commandline
$ sudo vim /etc/default/grub
```

向 `GRUB_CMDLINE_LINUX_DEFAULT` 添加 `nvidia-drm.modeset=1` 。

```conf
........
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash loglevel=3 rd.udev.log_priority=3 vt.global_cursor_default=0 nvidia-drm.modeset=1"
........
```

然后重新生成 grub 配置文件。

```commandline
$ sudo grub-mkconfig -o /boot/grub/grub.cfg
```

然后重启。

## 使用 mutter-performance

然而，在重启之后效果还是不太好。

{{< admonition type=tip title="ChatGPT 的解释" open=true >}}
`mutter-performance` "是 Mutter 窗口管理器的优化版本，特别针对性能进行了调整。Mutter 是 GNOME 3 的默认窗口管理器，负责窗口的排列、交互和动画[linkedin.com](https://www.linkedin.com/company/mutter-performance/)。
{{< /admonition >}}

这个包需要从 [AUR](https://aur.archlinux.org) 安装.

```commandline
$ paru -S mutter-performance
```

装完之后，桌面确实比之前要快一点了，但仍然不够。

并且，值得一提的是，现在是时候卸载 `xf86-video-intel` 了。 在新设备当中并不需要这个包。

```commandline
$ sudo pacman -Rs xf86-video-intel
```
{{< admonition type=tip title="ChatGPT 的解释" open=false >}}
xf86-video-intel 软件包是 Intel 集成显卡芯片的驱动程序，由 X.Org 项目维护。 然而，对于现代 Intel 图形硬件（大约 2007 年及更新版本），出于以下几个原因，通常建议删除此软件包：

更好地支持模式设置驱动程序：模式设置驱动程序是 X 服务器的一部分，不需要单独安装，可以更好地支持现代图形功能和硬件。 它由 X.Org 项目维护，并倾向于跟上图形技术 github.com 的新发展。

xf86-video-intel 驱动程序的问题：已知 xf86-video-intel 驱动程序会在某些系统上引起问题，包括图形故障以及与模式设置驱动程序相比性能较差。 在某些情况下，它甚至会导致 bbs.archlinux.org 系统不稳定。

缺乏积极的开发：xf86-video-intel 驱动程序已经好几年没有积极开发了，这意味着它可能缺乏对较新硬件和软件中的功能的支持。 另一方面，模式设置驱动程序作为 X 服务器 reddit.com 的一部分正在积极开发。

要删除 xf86-video-intel 软件包，您可以使用特定 Linux 发行版的软件包管理器。 以下是使用 pacman（Arch Linux 的包管理器）的示例：
```commandline
sudo pacman -R xf86-video-intel
```

删除软件包后，重新启动系统以确保更改生效。

请记住检查特定发行版的文档，了解删除软件包和处理驱动程序的正确方法。

{{< /admonition >}}

## 设置 X11 配置文件

根据 [Arch Wiki](https://wiki.archlinux.org/title/NVIDIA_Optimus#Use_NVIDIA_graphics_only)，我需要设置一些 X11 配置文件，用来单独使用 N 卡。

写入文件 `/etc/X11/xorg.conf.d/10-nvidia-drm-outputclass.conf/`：
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

然后我就需要创建两个 `*.desktop` 文件来配置 GDM。

写入文件 `/usr/share/gdm/greeter/autostart/optimus.desktop` 和 `/etc/xdg/autostart/optimus.desktop`

```conf
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
```

最后，经过重启，终于解决了这些问题。

好耶！


## 参考连接

* [Phind.com](https://www.phind.com)
* [NVIDIA Optimus - ArchWiki #Use_NVIDIA_graphics_only](https://wiki.archlinux.org/title/NVIDIA_Optimus#Use_NVIDIA_graphics_only)
* [NVIDIA Optimus - ArchWiki #GDM](https://wiki.archlinux.org/title/NVIDIA_Optimus#GDM)

