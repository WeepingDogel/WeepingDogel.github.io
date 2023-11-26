# 如何解决 Manjaro 中 QCA6174 网卡问题


<!--more-->
## 开场白

尝试在 Redmibook 14 中安装了 Manjaro, 装完发现 WIFI 不能用

此时陷入了疑惑, 难道 Manjaro 也不自带 linux-firmware ?

总之经过了一系列折腾, 最后还是解决了, 写篇东西来记录一下解决的过程


## 尝试使用其他方法连接网络

既然 WIFI 不能用, 那也要想别的办法联网, 不然这问题就很棘手了

我能想到的是插网线, 可这是轻薄本, 没有有限网卡, 那么我们还有一种办法, 使用手机的 USB 网络共享

这个过程很简单, 按照以下步骤走

1. **使用 USB 数据线将电脑与手机连接, 并打开 USB 网络共享**
   * ~~这个都不会的, 可以执行 `sudo rm -rf /`~~
   * ~~这智商, 玩你妈的 Linux~~
   * 不会的, 请[参考这里](https://jingyan.baidu.com/article/09ea3ede1cfbf1c0aede391d.html)

2. **打开终端, 执行**
```txt
$ sudo ip link
```

然后它会返回这样的东西, 如图

![](/img/2020-07-17_11-16.png)

设置网卡

```txt
$ sudo ip link set enp3s0f4u2 up
```

运行 `dhcpcd`
```txt
$ sudo dhcpcd
```

接下来, 我试着运行 `ifconfig`, 可是不能用, 但是看了一眼 `network manager`

嗯 能上网了

![](/img/photo_2020-07-16_23-31-07.jpg)

## 解决过程

### 软件源

我们会进行软件包的装卸, 所以我们首先需要做的是选择合适的软件源....

ok, 现在我们需要修改的文件是这个
```txt
/etc/pacman.d/mirrorlist
```
我们用 `nano` 改, 记得加 `sudo`

```txt
$ sudo nano /etc/pacman.d/mirrorlist
```

将 `# China` 下面的内容 放到第一行

至于 `nano` 的用法, 请自行查找资料, 会用记事本就会用这个

修改完后, 如图

![](/img/photo_2020-07-16_23-48-54.jpg)

然后执行

```txt
$ sudo pacman -Sy
```

### 安装 `linux-firmware`

执行

```txt
$ sudo pacman -S linux-firmware
```

重启之后, 发现还是无效, 此时我去谷歌查了一下.

发现, 我们需要手动从 [Github](https://github.com/FireWalkerX/ath10k-firmware/tree/master/QCA6174/hw3.0) 下载它的驱动文件

### 手动替换驱动文件

到上面那个链接指向的 Github 仓库, 下载 `board-2.bin` 和 `firmware-4.bin_WLAN.RM.2.0-00180-QCARMSWPZ-1`, 分别将它们重命名为: `board.bin` 和 `firmware-4.bin` 

```txt
$ wget https://github.com/FireWalkerX/ath10k-firmware/raw/7e56cbb94182a2fdab110cf5bfeded8fd1d44d30/QCA6174/hw3.0/board-2.bin
```

```txt
$ wget https://github.com/FireWalkerX/ath10k-firmware/raw/7e56cbb94182a2fdab110cf5bfeded8fd1d44d30/QCA6174/hw3.0/firmware-4.bin_WLAN.RM.2.0-00180-QCARMSWPZ-1
```

然后把这两个文件复制到 `/lib/firmware/ath10k/QCA6174/hw3.0/` 目录下

```txt
$ sudo cp board.bin /lib/firmware/ath10k/QCA6174/hw3.0/board.bin
```

```txt
$ sudo cp firmware-4.bin /lib/firmware/ath10k/QCA6174/hw3.0/firmware-4.bin
```

然后重启系统, WIFI 就能用了.

![](/img/photo_2020-07-19_23-12-18.jpg)

## 总结

以上内容均为 Redmibook 14 的解决过程, 并不一定适用于其他设备, 因此仅供参考.
