# 怎样安装 Arch Linux




## Arch Linux是什么？

**[Arch Linux](https://wiki.archlinux.org/index.php/Arch_Linux_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))** 是一个通用 x86_64_ GNU/Linux 发行版，它采用滚动升级模式，尽权力给用户提供最新版本的稳定软件，因其"简洁、现代、实用、以用户为中心"的原则而得名。

Arch Wiki 上已经写明其原则
>简洁
>
>Arch Linux 将简洁定义为：避免任何不必要的添加、修改和复杂增加。它提供的软件都来自原始开发者(上游)，仅进行和发行版(下游)相关的最小修改。
>
>不包含上游不愿意接受的补丁。绝大部分 Arch 下游补丁都已经被上游接受，下一个正式版本里会包含。
>
>配置文件也是来自上游，仅包含发行版必须的调整，比如特殊的文件系统路径变动。Arch 不会在安装一个软件包后就自动启动服务。
>
>软件包通常都和一个上游项目直接对应。仅在极少数情况下才会拆分软件包。
>
>官方不支持图形化配置界面，建议用户使用命令行或文本编辑器修改设置。

> 现代
>
>Arch尽全力保持软件处于最新的稳定版本，只要不出现系统软件包破损，都尽量用最新版本。Arch采用滚动升级策略，安装之后可以持续升级。
>
> Arch向GNU/Linux用户提供了许多新特性，包括systemd初始化系统、现代的文件系统、LVM2/EVMS、软件磁盘阵列（软RAID）、udev支持、initcpio（附带mkinitcpio）以及最新的内核。

>实用
>
> Arch 注重实用性，避免意识形态之争。最终的设计决策都是由开发者的共识决定。开发者依赖基于事实的技术分析和讨论，避免政治因素，不会被流行观点左右。
>
>Arch Linux 的仓库中包含大量的软件包和编译脚本。用户可以按照需要进行自由选择。仓库中既提供了开源、自由的软件，也提供了闭源软件。实用性大于意识形态.

> 以用户为中心
>
> 许多 Linux 发行版都试图变得更“用户友好”，Arch Linux 则一直是，永远会是“以用户为中心”。此发行版是为了满足贡献者的需求，而不是为了吸引尽可能多的用户。Arch 适用于乐于自己动手的用户，他们愿意花时间阅读文档，解决自己的问题。
>
> Arch 鼓励每一个用户 参与 和贡献，报告和帮助修复 bugs，提供软件包补丁和参加核心 项目：Arch 开发者都是志愿者，通过持续的贡献成为团队的一员。Archers 可以自行贡献软件包到 Arch 用户仓库, 提升 ArchWiki 文档质量, 在 论坛, 邮件列表, IRC 中给其它用户提供技术支持. Arch Linux 是全球很多用户的选择，已经有很多国际社区提供帮助和文档翻译。 
>

以上内容引用自 Arch Wiki 词条: https://wiki.archlinux.org/index.php/Arch_Linux_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E5%8E%9F%E5%88%99

更多关于 Arch Linux 的介绍可以[参考这里](https://wiki.archlinux.org/index.php/Arch_Linux_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

## 如何安装

现在我们要知道的是如何安装它。

其实在Arch Wiki上已经有了安装指南，但是对于 Linux 新手或从未使用过 Linux 的入坑者来说似乎不太容易读懂。因此，这里将会简单的写出安装方法以及过程。

### 安装条件

总的来说，Arch 对配置的要求并不是太高，因为它默认安装完不带任何软件（甚至是 vim、wget、git）。但是，由于用户需要安装和使用的软件不同，因此配置需求也会根据实际情况而变化。

这里根据个人经验例举几个，仅供参考

> 不使用图形界面
> * 处理器需求: 1.0Ghz 单核或更好的
> * 内存需求: 1GB 足够
> * 显卡需求: 能亮就行

> 图形界面: lxde
> * 处理器需求: 2.0Ghz 单核或更好的
> * 内存: 2GB 或者更多
> * 显卡需求: 能亮就行....

> 图形界面: xfce
> * 处理器需求: 2.0GHz 单核 ~ 3.0 Ghz 单核 或更好的
> * 内存: 至少 2GB ，4GB 很够用
> * 显卡需求: 能亮还得有 128MB 显存

> 图形界面: Gnome
> * 处理器需求: 双核 2.0GHz以上
> * 内存: 4GB 足够，但推荐更多
> * 显卡需求: 一般的Intel核显如果有256MB显存就很流畅了
> * (一位不愿意透露姓名的 Gnome 用户表示不要推荐 Gnome)

> 图形界面: KDE
> * 处理器需求: 尽量要有 3.0GHz 双核，至少 2.6GHz 双核
> * 内存: 4GB 足够，但推荐更多
> * 显卡需求: 尽量比上面 Gnome 的更好一些

Emmmm... 总的来说... 只要是个电脑，都能运行起来，只不过用 KDE 和 Gnome 会比较卡而已.. 只要不是上世纪的486电脑.. xfce应该都是带得动的。

### 准备工作

这里会说明一下安装前需要准备什么

####  安装介质

如果你曾经安装过其他 Linux 发行版，则不需要花太多时间看这一段，因为Arch Linux的安装介质的制作与其他发行版也是相差不大的。

如果你曾经重装过 Windows 操作系统，但没试过安装Linux ，也许你只需要稍微看一下，就会明白怎么做了

* 第一步、下载Arch Linux的ISO镜像文件
  * 你可以去 [Arch 官网](https://www.archlinux.org/download/)下载，也可以去你所在位置的开源镜像站下载，这里贴出
    * [清华源传送门](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest//)
    * [中科大源传送门](http://mirrors.ustc.edu.cn/archlinux/iso/)

* 第二步、准备一个U盘
  * 你需要准备一个U盘来刻录 ArchISO，最好是 8GB 以上

* 第三步、使用刻录软件将 ArchISO 刻录进U盘
  * Windows 环境: 这里推荐 [rufus](https://rufus.ie/zh_CN.html) 
  * Linux 环境: 可以使用 DD 命令 （如果电脑不支持EFI启动，不推荐。）

篇幅原因，这个就不写太多吧

#### 不爆炸的心态

如果你从未接触过 Arch Linux 或者是 Linux 新手，在安装过程中难免会遇到问题，这个时候不要慌张也不要着急，平静下来通过各种途径找出解决方法，不过这都需要有个不爆炸的心态。

#### 阅读 Arch Wiki
Arch 官方搭建了一个 Wiki 供用户查阅资料，当遇到安装过程中遇到麻烦的时候，也许 [Arch Wiki](https://wiki.archlinux.org/index.php/Main_page_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)) 能够帮到你。

## 一切准备就绪，出发

当你准备好一切的时候，就可以开始安装了。

### 启动 Arch ISO

首先插入你的 U 盘，然后在开机时按特定的按键以启动 U 盘中的ArchISO

这里放出不同品牌设备或主板的按键

> 品牌台式
> * 联想台式电脑 F12
> * 惠普台式电脑 F12
> * 宏基台式电脑 F12
> * 戴尔台式电脑 ESC
> * 神舟台式电脑 F12
> * 华硕台式电脑 F8
> * 方正台式电脑 F12
> * 清华同方台式电脑 F12
> * 海尔台式电脑 F12
> * 明基台式电脑 F8

> 品牌笔记本
> * 联想笔记本 F12
> * 宏基笔记本 F12
> * 外星人笔记本 F12
> * 小米笔记本 F12
> * 华硕笔记本 ESC
> * 惠普笔记本 F9
> * 联想 Thinkpad F12
> * 戴尔笔记本 F12
> * 神舟笔记本 F12
> * 东芝笔记本 F12
> * 三星笔记本 F12
> * IBM笔记本 F12
> * 富士通笔记本 F12
> * 海尔笔记本 F12
> * 方正笔记本 F12
> * 清华同方笔记本 F12
> * 微星笔记本 F11
> * 明基笔记本 F9
> * 技嘉笔记本 F12
> * Gateway笔记本 F12
> * eMachines笔记本 F12
> * 索尼笔记本 ESC
> * 苹果笔记本 开机长按 option 键

> 主板
> * 华硕主板 F8
> * 技嘉主板 F12
> * 微星主板 F11
> * 映泰主板 F9
> * 梅捷主板 ESC 或 F12
> * 七彩虹主板 ESC 或 F11
> * 华擎主板 F11
> * 斯巴达卡主板 ESC
> * 昂达主板 F11
> * 双敏主板 ESC
> * 翔升主板 F10
> * 精英主板 ESC 或 F11
> * 冠盟主板 F11 或 F12
> * 富士康主板 ESC 或 F12
> * 顶星主板 F11 或 F12
> * 铭瑄主板 ESC
> * 盈通主板 F8
> * 捷波主板 ESC
> * Intel 主板 F12
> * 杰微主板 ESC 或 F8
> * 致铭主板 F12
> * 磐英主板 ESC
> * 磐正主板 ESC
> * 冠铭主板 F9

按下对应的按键，选择你的 U 盘，即可启动 Arch ISO。

![2020-06-13_14-38.png](/img/2020-06-13_14-38.png)

如上图，Arch ISO 启动后将会出现这样的界面，直接选择第一项回车即可。

### 确认是否连接到网络

启动Arch ISO之后，你将操作一个运行在 tty 上的 Live CD，这个时候第一件事就是检查有没有连接到网络。

你可以使用 `ping` 这个命令来确认是否连接到网络，随便一个非局域网地址都可以

```txt
# ping weepingdogel.github.io
```

若返回出类似这样的信息，则说明网络连接是正常的
```txt
PING weepingdogel.github.io (185.199.111.153) 56(84) bytes of data.
64 bytes from 185.199.111.153 (185.199.111.153): icmp_seq=2 ttl=48 time=113 ms
64 bytes from 185.199.111.153 (185.199.111.153): icmp_seq=3 ttl=48 time=110 ms
64 bytes from 185.199.111.153 (185.199.111.153): icmp_seq=4 ttl=48 time=114 ms
64 bytes from 185.199.111.153 (185.199.111.153): icmp_seq=5 ttl=49 time=113 ms
64 bytes from 185.199.111.153 (185.199.111.153): icmp_seq=6 ttl=48 time=111 ms
64 bytes from 185.199.111.153 (185.199.111.153): icmp_seq=7 ttl=48 time=112 ms
64 bytes from 185.199.111.153 (185.199.111.153): icmp_seq=8 ttl=49 time=113 ms
64 bytes from 185.199.111.153 (185.199.111.153): icmp_seq=9 ttl=49 time=111 ms
64 bytes from 185.199.111.153 (185.199.111.153): icmp_seq=10 ttl=48 time=111 ms
^C
--- weepingdogel.github.io ping statistics ---
11 packets transmitted, 9 received, 18.1818% packet loss, time 10801ms
rtt min/avg/max/mdev = 110.224/112.036/114.157/1.355 ms
```
如果返回的不是类似于上面的信息，那么你可能没有正确连接到网络，你需要这样做

检查网卡
```txt
# ip link
```

将会返回这些
```txt
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether bc:5f:f4:aa:04:c9 brd ff:ff:ff:ff:ff:ff
```

`lo` 是指 localhost ，一般情况下，如果你只有一个网卡的话，类似于 `enp3s0` 的名称就是你的网卡了，但不同品牌的网卡显示的也不同，如 Intel 网卡可能显示为 `ens33` 之类的。下面用 `<网卡名>` 来指代吧

设置网卡

```txt
# ip link set <网卡名> up
```

使用 `dhcpcd` 命令来自动匹配 DHCP 地址
```txt
# dhcpcd
```
它会自动帮你获取到 DHCP 地址，然后你就能连接到网络了

### 同步系统时间
你需要保证 Live CD 目前的时间是准确的

这里执行 `timedatectl` 命令
```txt
# timedatectl set-ntp true
```

### 分区

这里一直都是比较关键的部分，分区..

首先，你需要查看你的硬盘是否被识别

```txt
# fdisk -l
```

这里引入一个 **块设备的概念**

![](/img/2020-06-13_15-44.png)

也就是说如果被识别到，就会以 `/dev/sda` 或者 `/dev/nvme0n1` 这样，来表示你的硬盘。

`rom`，`loop`，或者`airoot` 这样的，可以忽略不管。

#### 建立分区
有两种分区方式，一种是对于 BIOS+MBR 启动的，另一种是 UEFI启动配GPT分区的。

这里列个表格吧


 * BIOS 和 MBR

|挂载点|分区|分区类型|建议大小|
|:--|----|:--|:--|:--|
|`/mnt`|`/dev/sdX1`|Linux|剩余空间|
|[SWAP]|`/dev/sdX2`|Linux swap (交换空间) |大于 512 MB|

 * UEFI with GPT

|挂载点|分区|分区类型|建议大小|
|:--|----|:--|:--|:--|
|`/mnt/boot/EFI`|`/dev/sdX1`|EFI 系统分区|260-512 MB|
|`/mnt`|`/dev/sdX2`|Linux|剩余空间|
|[SWAP]|`/dev/sdX3`|Linux swap (交换空间) |大于 512 MB|

Live CD 里面有几种分区工具 `fdisk`、`parted`、`cfdisk` 等，具体过程我就不写出来了，我推荐用cfdisk，操作简单。

> 注意：nvme 协议的硬盘设备名可能不是表上这个，也许是 `nvme0p1` 之类的。

#### 格式化

当你的分区建好了，这些分区要进行格式化

BIOS + MBR:
```txt
# mkfs.ext4 /dev/sdX1
```

UEFI with GPT:
```txt
# mkfs.ext4 /dev/sdX2
```
```txt
# mkfs.vfat -F 32 /dev/sdX1
```

不同的分区需要选择不同的文件系统，这个你需要去搜索引擎搜索了，篇幅有限，解释不了这么多。

对于交换分区(第一个表中的 `/dev/sdx2`、第二个表中的 `/dev/sdX3`)，需要使用 `mkswap` 将其初始化：
```txt
# mkswap /dev/sdX2
```
挂载 swap
```txt
# swapon /dev/sdX2
```

#### 挂载分区
将根分区挂载到`/mnt`，参考命令:
```txt
# mount /dev/sdX1 /mnt
```

### 安装基本系统
这个时候我们就已经可以安装基本系统了，但仍需要按照下面的步骤做

#### 选择镜像

Arch Linux是通过网络安装的，它会通过镜像源直接在所在的分区下载需要的安装文件，安装速度较快，这也是为什么要确认网络是否连接。

而现在要做的是选择离你所在地最近的镜像源

这个文件 `/etc/pacman.d/mirrorlist` 里面写好了所有的镜像源，定义了软件包会从哪一个镜像源下载。在 Live CD 中，所有的镜像都会被启用，文件中是按照同步情况和速度进行排序的。

这个是你需要做的是修改它的顺序，将离你最近的镜像地址修改到第一位，你可以使用 `nano` 进行修改
```
# nano /etc/pacman.d/mirrorlist
```
在 nano 中，`CTRL`+`W` 为搜索，你可以通过这个在文件中搜索你所在国家或地区的名称，再将其下面的镜像地址使用 `CTRL`+`K` 进行剪切，再将其用 `CTRL`+`U` 粘贴到第一行即可。

#### 安装必要软件包

Linux是由软件包组成的操作系统，而如果要启动它，就必须具备必要的软件包。

这个时候我们使用 `pacstrap` 脚本，安装 `base` 软件包 和 Linux 内核还有硬件的固件，这样基本系统很快就构建完成了。

```txt
# pacstrap /mnt base linux linux-firmware
```

我推荐这样
```txt
# pacstrap /mnt base base-devel linux linux-firmware linux-headers
```
这样能够尽可能的安装上更多的基本软件。

一顿文字输出过后，基本系统就安装完成了。

### 配置系统
基本系统刚安装完是没有灵魂的，需要进行配置才能完美地使用
#### Fstab
首先肯定要生成一个fstab文件，否则系统连硬盘都不认识。
用 `genfstab` 来生成
```txt
# genfstab -U /mnt >> /mnt/etc/fstab
```

最好在执行完以上命令后查看一下生成的 `/mnt/etc/fstab` 文件是否正确。
```txt
# cat /mnt/etc/fstab
```

#### Chroot
Chroot 是 "Change root" 的缩写，意思是更改根目录，而我们需要将 Live CD 的根目录更改为你安装好的系统的目录，这样才能操作它

用 `arch-chroot` 这个命令就可以了
```txt
# arch-chroot /mnt
```

#### 时区

chroot 完以后，第一步要修改时区
```txt
# ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
```

例如
```txt
# ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

接下来运行 `hwclock` 生成 `/etc/adjtime`
```txt
# hwclock --systohc
```
#### 本地化

>本地化的程序与库若要本地化文本，都依赖 Locale，后者明确规定地域、货币、时区日期的格式、字符排列方式和其他本地化标准等等。在下面两个文件设置：`locale.gen` 与 `locale.conf`。 —— Arch Wiki

所以不用多解释了...

编辑这个文件 `/etc/locale.gen` ，移除需要语言前面的 `#`
```txt
# vim /etc/locale.gen
```
然后执行 `locale-gen` 生成 locale 讯息:
```txt
# locale-gen
```
在 `/etc/` 目录下创建 一个叫 `locale.conf` 的文件
```txt
# vim /etc/locale.conf
```

写入以下内容
```ini
LANG=en_US.UTF-8
```

#### 网络

首先需要安装的是 `networkmanager` 这个包，不然安装完成重启后就需要手动配置网络了。

```txt
# pacman -S networkmanager
```
启用 NetworkManager 服务
```txt
# systemctl enable NetworkManager
```
接下来创建一个 `hostname` 文件，这个文件存储你的主机名
```txt
# vim /etc/hostname
```

写入以下内容，随便写，**但是要记住**，这里以 `myhostname` 代替了，
```txt
myhostname
```

接下来编辑 `/etc/hosts` 这个文件

```txt
# vim /etc/hosts
```
写入以下内容
```txt
127.0.0.1	localhost
::1		localhost
127.0.1.1	myhostname.localdomain	myhostname
```

接下来，执行
```txt
# systemctl enable dhcpcd
```

然后在安装完成之后就不需要担心网络连接问题了

#### Root 密码
你需要设置一个 root 密码
```txt
# passwd
```

这样基本系统就差不多完成了，但是现在还不能重启，因为它目前无法被引导。

### 安装启动引导器

如上面所说，你需要一个启动引导程序才能启动系统，Linux 有很多类似于这样的软件，可以在[这个页面](https://wiki.archlinux.org/index.php/Boot_loaders_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))参考.

我推荐使用 `GRUB`

#### 安装Grub

先安装 `grub` 这个软件包
```txt
# pacman -S grub
```

这里要考虑到两种情况了,

**第一种情况: BIOS + MBR**

直接执行这条即可
```txt
# grub-install --target=i386-pc /dev/sdX
```

如果它返回出 `no erros` 之类的,那么就可以执行下面的了.

生成 grub 配置文件

```txt
# grub-mkconfig -o /boot/grub/grub.cfg
```
接下来就可以拔掉 U 盘重启了
```txt
# reboot
```
**第二种情况: UEFI  + GPT**
这种情况的比较复杂一些, 

首先挂载你的EFI分区

```txt
# mount /dev/sdX1 /boot/EFI 
```

接下来执行

```txt
# grub-install --target=x86_64-efi --efi-directory=/boot/EFI/ --bootloader-id=GRUB
```

然后还是一样的生成配置文件

```txt
# grub-mkconfig -o /boot/grub/grub.cfg
```
接下来就可以拔掉 U 盘重启了
```txt
# reboot
```

## 安装后工作
装完后要做的一些事情.
### 创建普通用户
装完以后, 不建议直接使用 root 用户,需要创建一个普通用户

先使用 root 用户登录,执行这条命令创建一个普通用户
```txt
# useradd -G wheel -m -s /bin/bash <用户名>
```

接下来给你的用户设置密码

```txt
# passwd <用户名>
```

将其添加到 `sudoers` 列表, 如果你没有安装 `sudo` 或 `base-devel` 请先执行
```txt
# sudo pacman -S sudo
```

然后编辑 `/etc/sudoers` 这个文件
```txt
# vim /etc/sudoers
```

将你的用户名添加到 `root` 的下面,照抄即可
```txt
# Defaults!/usr/bin/sudoreplay !log_output
# Defaults!/usr/local/bin/sudoreplay !log_output
# Defaults!REBOOT !log_output

##
## Runas alias specification
##

##
## User privilege specification
##
root ALL=(ALL) ALL
<用户名> ALL=(ALL) ALL
```
重启即可登录普通用户了.

### 安装图形界面

在安装图形界面之前,我们需要安装的是 xorg , 它是大多数图形界面的依赖...

算了,这么一大堆说完肯定....直接一套安排上吧(xfce)


安装软件包
```txt
$ sudo pacman -S xorg xfce4 lightdm lightdm-greeter-gtk
```

设置lightdm启动权限
```txt
$ sudo systemctl enable lightdm
```

### 安装显卡驱动

显卡驱动软件包列表.
```txt
extra/xf86-video-amdgpu 19.1.0-2 (xorg-drivers) 
    X.org amdgpu video driver
extra/xf86-video-ati 1:19.1.0-2 (xorg-drivers)
    X.org ati video driver
extra/xf86-video-dummy 0.3.8-4 (xorg-drivers)
    X.org dummy video driver
extra/xf86-video-fbdev 0.5.0-2 (xorg-drivers)
    X.org framebuffer video driver
extra/xf86-video-intel 1:2.99.917+908+g7181c5a4-1 (xorg-drivers)
    X.org Intel i810/i830/i915/945G/G965+ video drivers
extra/xf86-video-nouveau 1.0.16-2 (xorg-drivers)
    Open Source 3D acceleration driver for nVidia cards
extra/xf86-video-openchrome 0.6.0-4 (xorg-drivers)
    X.Org Openchrome drivers
extra/xf86-video-sisusb 0.9.7-3
    X.org SiS USB video driver
extra/xf86-video-vesa 2.4.0-3 (xorg-drivers xorg) 
    X.org vesa video driver
extra/xf86-video-vmware 13.3.0-2 (xorg-drivers)
    X.org vmware video driver
extra/xf86-video-voodoo 1.2.5-11 (xorg-drivers)
    X.org 3dfx Voodoo1/Voodoo2 2D video driver
community/xf86-video-qxl 0.1.5-7 (xorg-drivers)
    Xorg X11 qxl video driver
```

vesa 会自动装上, 自己是什么显卡就装什么, 不需要过多解释了吧...

Intel 核显 

```txt
$ sudo pacman -S xf86-video-intel
```

NVIDIA

```txt
$ sudo pacman -S xf86-video-nouveau
```

AMD

```txt
$ sudo pacman -S xf86-video-amdgpu
```

好啦 装完啦~

接下来系统就可以使用啦~
