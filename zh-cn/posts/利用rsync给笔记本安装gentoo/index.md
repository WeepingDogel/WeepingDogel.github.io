# 利用 rsync 给笔记本安装 Gentoo


# 序

半年不见，甚是想念～

我有一台性能羸弱不堪的 ChromeBook，

2GB 的 RAM 和一颗 只有 2.6 GHz 的双核老低压 U 对于现在的流行发行版来说已经完全不够用了，目前跑个 Mint 也是 CPU 经常性的 100% 占用。

![](/img/photo_2022-01-04_13-39-29.jpg)

于是我想着能不能给他装个 Gentoo？

然而就这乌龟U，估计得连续开机一周才能编译完吧...

嗯，不过我想试试能不能通过台式机编译完 Gentoo 再通过 rsync 给它传输到 ChromeBook。

![](/img/2022-01-04-13-46-55屏幕截图.png)

论编译，我感觉哪怕是在 2022 年 E3 神教也不会让我失望吧。

起码比这颗小赛扬快多了。

# 准备工作

废话不多说，直接开搞。

但我们要准备好这些东西

* [Gentoo Wiki](https://wiki.gentoo.org/wiki/Main_Page)
  * 安装过程中需要用到官方的指引和文档，必备
* 翻译工具
  * 由于 Gentoo 的用户群体较小，文档汉化可能不是很全面，因此可以借助翻译工具，这里推荐 [deepl](https://www.deepl.com/zh/translator)
* 一个 U 盘
  * 用来装一个临时的 Linux 作为笔记本的 rsync 接收端。
  * 这个没什么好说的，最好支持 USB 3.0～
* 下载好 Gentoo 官方提供的 stage 包
  * 这个会在下文中写出过程
* 一个能够操作的 Linux 终端

# 下载 stage 压缩包

由于我们的安装手段比较特殊，因此可以直接跳到官方 wiki 的这一步

按照官方 wiki 给出的文档，我们进行以下操作:

首先开启 root

```
weepingdogel $ sudo -i
```

接下来，你可以挂载一个分区到 `mnt` ，也可以直接创建文件夹，我这边空间很充足就直接空载操作了。

至于如何挂载？可以去参考 Arch Wiki。

```
root # cd /mnt/gentoo
```

然后我们需要用 wget 下载 stage 包，打开[这个页面](https://www.gentoo.org/downloads/#other-arches)，这里我们选择 stage3 

因为我懒，喜欢用 systemd ， 可以根据需要选择。

**注意：右键 stage3 systemd ，复制链接**

![](/img/2022-01-04-22-58-13屏幕截图.png)

将链接粘贴到终端上

```
root # wget https://bouncer.gentoo.org/fetch/root/all/releases/amd64/autobuilds/20220605T170549Z/stage3-amd64-systemd-20220605T170549Z.tar.xz
```

等待下载。

![](/img/2022-01-04-23-02-53屏幕截图.png)

下载完成之后可以进行一下文件校验，可以参考一下官方的[这个条目](https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Stage/zh-cn)

![](/img/2022-01-04-23-04-47屏幕截图.png)

一般情况下我这边不会损坏，所以我这里就不写出来了，接下来我们直接进入解压 stage 文件这一步。

# 解压 stage 压缩包

我们使用 tar 来进行解压，这是官方 wiki 给出的命令：

```
root #tar xpvf stage3-*.tar.bz2 --xattrs-include='*.*' --numeric-owner
```

有些读者可能看不懂中间那一串，那一串其实是个通配符，不过这个通配符可能跟你下载到的文件不一样，因此我们将中间那段改成准确的文件名。

这一步操作很简单，只需要按一下 Tab 键即可。

```
root # tar xpvf stage3-amd64-systemd-20220102T170545Z.tar.xz --xattrs-include='*.*' --numeric-owner
```

等待解压，一会儿就好，~~除非你用 IDE 硬盘~~。

![](/img/2022-01-04-23-10-11屏幕截图.png)

# 配置编译选项

这一步官方是这么解释的：

>为了优化Gentoo，可以设置一些影响Portage的变量，Gentoo官方支持包管理器。 所有这些变量可以设置为环境变量（使用export），但这不是永久的。 为了保留设置，Portage读入/etc/portage/make.conf文件 ，一个用于Portage的配置文件。 
>
>> 附注
>>
>>所有可能的变量的注释列表可以在 /mnt/gentoo/usr/share/portage/config/make.conf.example中找到。要成功安装Gentoo，只需要设置下面提到的变量。
>
>启动编辑器（在本指南中，我们使用 nano）来更改我们将在下面讨论的优化变量。
>```txt
>root #nano -w /mnt/gentoo/etc/portage/make.conf
>```
>从make.conf.example文件中可以明显看出文件的结构：注释行以 "#"开头，其他行使用 VARIABLE="content 语法定义变量。 接下来选取其中的几个进行讨论。 
>
>

这里我们用 vim 写一下

```
root # vim /mnt/gentoo/etc/portage/make.conf
```

将里面的 `COMMON_FLAGS=` 加入 `-march=silvermont` 的选项，这样就能让编译器给 `silvermont` 架构的垃圾 CPU 进行优化了。

完整文件如下：

```conf
# These settings were set by the catalyst build script that automatically
# built this stage.
# Please consult /usr/share/portage/config/make.conf.example for a more
# detailed example.
COMMON_FLAGS="-march=silvermont -O2 -pipe"
CFLAGS="${COMMON_FLAGS}"
CXXFLAGS="${COMMON_FLAGS}"
FCFLAGS="${COMMON_FLAGS}"
FFLAGS="${COMMON_FLAGS}"

# NOTE: This stage was built with the bindist Use flag enabled
PORTDIR="/var/db/repos/gentoo"
DISTDIR="/var/cache/distfiles"
PKGDIR="/var/cache/binpkgs"

# This sets the language of build output to English.
# Please keep this setting intact when reporting bugs.
LC_MESSAGES=C

```

# 安装 Gentoo 基础系统

上面已经完成了第一阶段的操作，可以开始安装基本系统了，诶嘿嘿。

接下来要做的是选择镜像源，我们可以参考 ustc mirror 给出的帮助文档：

* [Gentoo 源使用帮助 — USTC Mirror Help  文档](https://mirrors.ustc.edu.cn/help/gentoo.html)
* [Gentoo Portage 源使用帮助 — USTC Mirror Help  文档](https://mirrors.ustc.edu.cn/help/gentoo-portage.html)

直接按照 ustc 给出的帮助设置这两个源地址就好啦～

![](/img/2022-01-04-23-27-27屏幕截图.png)

![](/img/2022-01-04-23-27-54屏幕截图.png)

然后复制 DNS 信息

```
root # cp --dereference /etc/resolv.conf /mnt/gentoo/etc/
```

## 挂载必要的文件系统

这里要注意一下了，我这边要打好几条命令

Why？

官方的解释：
>稍等片刻，Linux 的根目录将变更到新的位置。为了确保新环境正常工作，需要确保一些文件系统可以正常使用。
>
>需要提供的文件系统是：
>
> *    /proc/ 一个pseudo文件系统（看起来像是常规文件，事实上却是实时生成的），由Linux内核暴露的一些环境信息
> *    /sys/ 一个pseudo文件系统，像要被取代的/proc/一样，比/proc/更加有结构
> *    /dev/ 是一个包含全部设备文件的常规文件系统，一部分由Linux设备管理器（通常是udev）管理
>
>/proc/位置将要挂载到/mnt/gentoo/proc/，而其它的两个都是绑定挂载。字面上的意思是，例如/mnt/gentoo/sys/事实上就是/sys/（它只是同一个文件系统的第二个条目点），而/mnt/gentoo/proc/是（可以说是）文件系统的一个新的挂载。 
>

因此按顺序执行以下命令进行挂载：
```
root # mount --types proc /proc /mnt/gentoo/proc
root # mount --rbind /sys /mnt/gentoo/sys
root # mount --make-rslave /mnt/gentoo/sys
root # mount --rbind /dev /mnt/gentoo/dev
root # mount --make-rslave /mnt/gentoo/dev 
```

然而，这还没完

![](/img/2022-01-04-23-33-37屏幕截图.png)

因此，接下来要加上这三条

```
root # test -L /dev/shm && rm /dev/shm && mkdir /dev/shm
root # mount --types tmpfs --options nosuid,nodev,noexec shm /dev/shm 
root # chmod 1777 /dev/shm
```

## Chroot : 进入新环境

当挂载好一切后，就可以 chroot 进去了

```
root # chroot /mnt/gentoo /bin/bash 
```

```
root # source /etc/profile 
```

```
root # export PS1="(chroot) ${PS1}"
```

接下来终端会变成这样

![](/img/2022-01-04-23-37-35屏幕截图.png)

## 挂载 boot 分区

这一步我们直接略过，因为最终安装的设备不是本机，而是另一台笔记本。

之后我们再进行手动安装引导介质。

## 从网站安装 Gentoo ebuild 数据库快照

官方其实这个就相当于 Arch 里面的 `sudo pacman -Syyu`

不多说，复制粘贴吧。

```txt
root # emerge-webrsync
```

![](/img/2022-01-04-23-42-07屏幕截图.png)


##  选择配置文件

~~我怎么感觉像是在复制 wiki 的内容呢...~~

> 配置文件是任何一个Gentoo系统的积木。它不仅指定USE、CFLAGS和其它重要变量的默认值，还会锁定系统的包版本范围。这些设定全是由Gentoo的Portage开发者们来维护。 


```
# eselect profile list
```

```
Available profile symlink targets:
  [1]   default/linux/amd64/17.1 *
  [2]   default/linux/amd64/17.1/desktop
  [3]   default/linux/amd64/17.1/desktop/gnome
  [4]   default/linux/amd64/17.1/desktop/kde

```

然后输入以下命令即可：

```
# eselect profile set [对应的数字]
```

其实它会列出很多选项，我们需要选择含有 `desktop/system` 的版本

## 设置时区

这里直接用 Arch 的方法

```
# ln -sf /usr/share/zoneinfo/Region（地区名）/City（城市名） /etc/localtime
```

根据我的情况，我应该这样写：

```
# ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
然后运行 hwclock 以生成 /etc/adjtime：

```
# hwclock --systohc
```

## 设置 USE

对于 Gentoo 这个系统来说， USE 标记是必备的，因此在编译之前，我们需要设置好全局 USE 标记

```
# vim /etc/portage/make.conf
```

```conf
USE="alsa udev dbus icu systemd gles2 sound video intel -kde tiff x265"
VIDEO_CARDS="intel"
```

## 更新 @world 集合

其实就是跟 Arch 的“滚”差不多，但是它会是一个比较漫长的过程。

```
# emerge --ask --verbose --update --deep --newuse @world
```

除此之外，在更改USE标记之后，这条命令也用来动态调整系统功能。

## 配置 locale 

麻了，参考这个 [Installation guide (简体中文) - ArchWiki](https://wiki.archlinux.org/title/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E6%9C%AC%E5%9C%B0%E5%8C%96)

# 配置内核

嗯哼，你以为我那么傻又编译八个小时？不！这次我选择用 bin 内核！

```
# emerge --ask sys-kernel/installkernel-systemd-boot
```

节省不少时间呢。

```
# emerge --ask sys-kernel/gentoo-kernel-bin
```
哎呀不想写了... 写了都是复制粘贴

自己看吧

![](/img/2022-01-11-12-46-51屏幕截图.png)

# 安装固件

> 一些驱动需要先在系统上安装附加的固件才能工作。经常网络接口上会使用，特别是无线网络接口。此外，来自 AMD 、 NVidia 和 Intel 等供应商的现代视频芯片在使用开源驱动程序时，通常也需要外部固件文件。大多数固件都打包在 sys-kernel/linux-firmware 里

大多数设备的驱动都依赖于 `linux-firmware` 这个包

```
# emerge --ask sys-kernel/linux-firmware
```

# 配置 fstab

这一步操作是在系统启动的时候，让内核认识分区

但是 Gentoo 好像不能用 `genfstab`

只能手写了

先在笔记本获取 UUID

```
ls /dev/disk/by-uuid/ -l
```

接下来将 `/` 分区对应分区的 `UUID` 按如下格式写在 `/etc/fstab` 这个文件里面 

```fstab
# /dev/mmcblk1p2
UUID=xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx	/         	xfs       	default,rw,relatime	0 1
```

# 通过 rsync 将系统灌到笔记本上

这个时候需要给笔记本插入一个 ArchISO 的 U 盘，启动到 ISO，**并连接 WIFI 和 开启 ssh 服务。**

接下来将其原有的分区格式化

```
# mkfs.btrfs /dev/mmcblk1p2 -f
```

然后挂载它，并将刚刚做好的文件用 rsync 灌进去


```
# mount /dev/mmcblk1p2 /mnt 
```

接下来笔记本这一端开启 ssh 服务

```
# systemctl start sshd
```

然后使用 rsync 将编译好的文件传输至笔记本的系统分区。

```
# rsync -aAXHv -P -vi --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} ./mnt/gentoo/. root@192.168.0.109:/mnt
```

# 在笔记本安装启动引导器

这个也是很熟悉的操作了。

```
# grub-install --target=x86_64-efi --efi-directory=/dev/mmcblk1p1 --bootloader-id=GRUB
```

```
# grub-mkconfig -o /boot/grub/grub.cfg
```
# 结语


通过一系列的折腾，这台老本子终于能发挥其最大的性能了。

由此看来通过 rsync 复制 Linux 发行版系统文件到其他的设备看起来是可行的。

不过也折腾了挺久的

# 参考链接

* [Gentoo Wiki](https://wiki.gentoo.org/wiki/Main_Page)
* [Downloads â Gentoo Linux](https://www.gentoo.org/downloads/#other-arches)
* [安装Gentoo安装文件 - Gentoo Wiki](https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Stage/zh-cn)
* [Gentoo 源使用帮助 — USTC Mirror Help  文档](https://mirrors.ustc.edu.cn/help/gentoo.html)
* [Gentoo Portage 源使用帮助 — USTC Mirror Help  文档](https://mirrors.ustc.edu.cn/help/gentoo-portage.html)
* [Installation guide (简体中文) - ArchWiki](https://wiki.archlinux.org/title/Installation_guide_%28%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%29#%E6%9C%AC%E5%9C%B0%E5%8C%96)
