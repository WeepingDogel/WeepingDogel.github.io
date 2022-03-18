# 关于N卡闭源驱动 nvidia-340xx 无法安装这档子事


# 序

首先容我说一句

> **FUCK YOU NVIDIA!**

由于我现在时间比较少，Arch 经常好几天不滚，前两天滚了一下，驱动炸了

内核更新到了 5.15.3 

一开始我觉得问题不大，更新一下就好了

于是我就

```
$ yay -S nvidia-340xx
```

但是没想到，它给我来这一出

![](/img/fucknvidia1.jpg)

呜呜呜！！！为什么编译不出来！！！

**~~黄仁勋 NMSL!!!~~**


# 解决过程

咳咳，尽管如此我还是花了一天的时间冷静了下来，然后开始试试看手动 `makepkg` 行不行。

按照惯例我应该去 aur 把 PKGBUILD 给 git 下来。

不过正当我打开 `nvidia-340xx` 这个包的 aur 界面时，我在评论那里看到了这句话。
> Users of this package should block automatic update of their kernel. There is not enough man power to update it as fast as newer kernels are released.

![](/img/fucknvidia2.png)

康不懂嘤语？ 给你翻译一下

> 这个软件包的用户应该阻止其内核的自动更新。没有足够的人力来更新它，因为更新内核的速度太快了。

我当场就想说

> **FUCK YOU NVIDIA!**

然后我就想着要不用回旧版本的内核？一边想一边往下翻，我就又看到了一条对我有用的评论

> Patch for kernel 5.15 https://pastebin.com/uYP9J2Cw Found here https://github.com/warpme/minimyth2/issues/15

![](/img/2021-11-22-13-58-14屏幕截图.png)

然后我观察了一下这个包的文件目录..

```
.
├── 0001-kernel-5.7.patch
├── 0002-kernel-5.8.patch
├── 0003-kernel-5.9.patch
├── 0004-kernel-5.10.patch
├── 0005-kernel-5.11.patch
├── 0006-kernel-5.14.patch
├── 20-nvidia.conf
├── nvidia-340xx.install
└── PKGBUILD

0 directories, 9 files
```

虽然我不太懂，但我发现这个 `*.patch` 文件的文件名似乎对应着各个内核版本。

而这条评论给出了[新 `patch` 文件的链接](https://pastebin.com/uYP9J2Cw)，以及[一个 issue 链接](https://github.com/warpme/minimyth2/issues/15)。

我瞬间知道怎么回事了，打包所需的文件是更新了，但还没有提交到 aur..

淦，我只能自己试试看了

于是抱着试试看的态度

我打开了它的 PKGBUILD

```
pkgbase=nvidia-340xx
pkgname=(nvidia-340xx nvidia-340xx-dkms); [ -n "$NVIDIA_340XX_DKMS_ONLY" ] && pkgname=(nvidia-340xx-dkms)
pkgver=340.108
pkgrel=25
pkgdesc="NVIDIA drivers for linux, 340xx legacy branch"
arch=('x86_64')
url="https://www.nvidia.com/"
makedepends=("nvidia-340xx-utils=${pkgver}" 'linux>=5.5' 'linux-headers>=5.5')
conflicts=('nvidia')
license=('custom')
options=(!strip)
# https://github.com/warpme/minimyth2/tree/master/script/nvidia/nvidia-340.108/files
source=("https://us.download.nvidia.com/XFree86/Linux-x86_64/${pkgver}/NVIDIA-Linux-x86_64-${pkgver}-no-compat32.run"
  20-nvidia.conf
  0001-kernel-5.7.patch
  0002-kernel-5.8.patch
  0003-kernel-5.9.patch
  0004-kernel-5.10.patch
  0005-kernel-5.11.patch
  0006-kernel-5.14.patch
)
```

确实发现了这么一行文件，我在想，是不是把这个新的文件下下来，放到编译目录然后在这个列表加上就能编译了？

于是我把这个文件下载了下来，放进了编译目录

（具体过程就略过了，都是 wget cp cd 之类的事情）

并且把文件名加上了

```
source=("https://us.download.nvidia.com/XFree86/Linux-x86_64/${pkgver}/NVIDIA-Linux-x86_64-${pkgver}-no-compat32.run"
  20-nvidia.conf
  0001-kernel-5.7.patch
  0002-kernel-5.8.patch
  0003-kernel-5.9.patch
  0004-kernel-5.10.patch
  0005-kernel-5.11.patch
  0006-kernel-5.14.patch
  0007-kernel-5.15.patch
)
```

接下来

```
$ makepkg
```

不过很快我就收到了报错

```
==> 正在创建软件包：nvidia-340xx 340.108-25 (Mon 22 Nov 2021 02:08:12 PM CST)
==> 正在检查运行时依赖关系...
==> 正在检查编译时依赖关系
==> 获取源代码...
  -> 找到 NVIDIA-Linux-x86_64-340.108-no-compat32.run
  -> 找到 20-nvidia.conf
  -> 找到 0001-kernel-5.7.patch
  -> 找到 0002-kernel-5.8.patch
  -> 找到 0003-kernel-5.9.patch
  -> 找到 0004-kernel-5.10.patch
  -> 找到 0005-kernel-5.11.patch
  -> 找到 0006-kernel-5.14.patch
  -> 找到 0007-kernel-5.15.patch
==> 错误： 对这些文件的完整性检查缺失: source

```

然后我试了一下重新生成校验码

```
makepkg -g
```

然后把返回来的数据复制粘贴进 `PKGBUILD` (注意，返回内容不唯一)

```
b2sums=('6538bbec53b10f8d20977f9b462052625742e9709ef06e24cf2e55de5d0c55f1620a4bb21396cfd89ebc54c32f921ea17e3e47eaa95abcbc24ecbd144fb89028'
        '49d99f612e8eee3ab5e34083c25348bfd14ed5fc8a7984dafc0dad7c0ae0df2c0b2a63a1bb993da440eb0a60293d7c753ca3889bd2f51991b8ddc51bce2fe4a8'
        '7150233df867a55f57aa5e798b9c7618329d98459fecc35c4acfad2e9772236cb229703c4fa072381c509279d0588173d65f46297231f4d3bfc65a1ef52e65b1'
        'b436095b89d6e294995651a3680ff18b5af5e91582c3f1ec9b7b63be9282497f54f9bf9be3997a5af30eec9b8548f25ec5235d969ac00a667a9cddece63d8896'
        '947cb1f149b2db9c3c4f973f285d389790f73fc8c8a6865fc5b78d6a782f49513aa565de5c82a81c07515f1164e0e222d26c8212a14cf016e387bcc523e3fcb1'
        '665bf0e1fa22119592e7c75ff40f265e919955f228a3e3e3ebd76e9dffa5226bece5eb032922eb2c009572b31b28e80cd89656f5d0a4ad592277edd98967e68f'
        '344cd3a9888a9a61941906c198d3a480ce230119c96c72c72a74b711d23face2a7b1e53b9b4639465809b84762cdc53f38210e740318866705241bc4216e4f35'
        '31a4047ab84d13e32fd7fdbf9f69c696d3fab6666c541d2acf0a189c1d17c876970985167fd389a4adc0f786021172bdec1aa6d690736e3cf9fcd8ceabe5fd32'
        'a26426488f6e105f546e091ce4d2e9587cc41a0fb05b0dffeb1c523d8d06782bda3004352655c9c019224091f7bc7903939e53ede73f64553f14be8e8a47793a')
```


接下来再次执行 `makepkg` 就能成功编译了

![](/img/screenshot-2021-nov-22.png)

接下来用 `pacman` 装上

```
sudo pacman -U nvidia-340xx-dkms-340.108-25-x86_64.pkg.tar.zst
```

最后 pacman 提示我们

```
>>> You must tell Xorg to use the nvidia driver with kernels >=5.11.0.
    You must also set IgnoreABI option with Xorg version >= 21.1.1.
    Minimal config example provided in /usr/share/nvidia-340xx/20-nvidia.conf
    which you should manually place in /etc/X11/xorg.conf.d/
```

这个好搞

复制一下文件就可以了
```
cp /usr/share/nvidia-340xx/20-nvidia.conf /etc/X11/xorg.conf.d/
```

然后重启

![](/img/image_2021-11-22_14-17-46.png)

完美解决～


# 总结
最后再说一句

> **FUCK YOU NVIDIA!**
