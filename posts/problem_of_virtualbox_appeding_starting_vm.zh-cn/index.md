# 尝试解决最近 VirtualBox 启动虚拟机时卡在 Starting 的问题



<!--more-->
# 序：遇到了啥问题啊？

今天心血来潮想要玩一下 VirtualBox 虚拟机， 结果发现打开之后每个虚拟机都卡在 `Starting virutal machine.`。


首先遇到问题的第一步就是去谷歌。


嗯... 查到了两篇 Arch 官方论坛的帖子。

* [Virtualbox hangs on Starting virtual machine window / Newbie Corner / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=277409)

* [KVM busted in linux 5.18 due to Intel CET / Kernel & Hardware / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=276699)

读完两篇帖子之后，我发现是因为 KVM 在新版本的内核中产生了一个 bug 导致的。

已经有大佬提交了 Bug 报告了。

* [FS#75481 : [linux] VBox virtual machines stop functioning](https://bugs.archlinux.org/task/75481)

* [x86/ibt: Add IBT feature, MSR and #CP handling · torvalds/linux@991625f · GitHub](https://github.com/torvalds/linux/commit/991625f3dd2cbc4b787deb0213e2bcf8fa264b21)

~~至于这个 Bug 是怎么产生... 咱笨笨，不知道~~


# 想想怎么解决


根据阅读帖子里的内容，得到的解决方法都是设置内核参数 `ibt=off`。

>Thank you 
>
>appending
>```
>ibt=off
>```
>to kernel boot params fixed my problem. 


## 怎么设置内核启动参数呢？

我并不知道这个，所以我还是去谷歌查了，得到了方法。

* [How to set kernel boot parameters on Linux - Linux Tutorials - Learn Linux Configuration](https://linuxconfig.org/how-to-set-kernel-boot-parameters-on-linux)

此时能看懂英文的读者可以参考上面这条链接去解决问题了，但是如果英文阅读比较困难的话，也可以跟着本文的步骤走。

## 设想的解决方法

其实就是编辑 `/etc/defualt/grub` 这个文件的 `GRUB_CMDLINE_LINUX=""` 的值。

然后往这里面写 `"ibt=off"`


# 解决步骤

## 1. 编辑 `/etc/default/grub` 文件

编辑这个文件的目的是设置内核启动参数，在不同的启动引导器引导的系统中，设置这个玩意的方法也有所不同，由于我的 Arch 用的是 Grub， 所以我需要编辑这个文件。

```commandline
$ sudo vim /etc/default/grub
```

找到 `GRUB_CMDLINE_LINUX=""` 关键字，并设置参数 `ibt=off`

```conf
# GRUB boot loader configuration

GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="Arch"
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=7"
GRUB_CMDLINE_LINUX="ibt=off"

......
```

按 `:` 输入 `wq` 回车（基础操作了，不多解释）。


## 2. 重新生成 Grub 配置文件

然后重新生成 Grub 配置文件

```commandline
$ sudo grub-mkconfig -o /boot/grub/grub.cfg
```

等待操作，在没有报错的情况下，可以重启操作系统了。

```commandline
$ sudo reboot
```

# 测试和验证

重启之后再次打开 VirutalBox， 然后启动一个虚拟机，此时发现虚拟机已经进入了系统。

![](/img/photo_2023-03-06_23-08-43.jpg)

这意味着问题得到了解决。



