# 关于 fcitx5 ，以及最近的环境变量问题


<!--more-->
## 发生了啥

最近我收到了一条这样的消息
>使用 `$HOME/.pam_environment` 设置环境变量的用户注意啦！由于 [CVE-2010-4708](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2010-4708), pam 上游在 1.4.0 版本中设置了默认不读取用户的环境变量设置，需要用户自行更换环境变量设置位置或恢复原默认读取行为。
>
>ref: [Linux 的环境变量怎么设 依云's Blog](https://blog.lilydjwg.me/2020/7/22/linux-environment-variables.215496.html)

~~为什么十年的漏洞现在才修啊喂！！！~~

Emmmm, 这么说就是 `.pam_environment` 这个文件不能用了......

这里感谢 [依云](https://blog.lilydjwg.me/2020/7/22/linux-environment-variables.215496.html) 写出了各种情况的应对方法

我这里记一篇在 xfce + lightdm 环境下更换 fcitx5 的东西... 其他具体的可以参考云云写的.. (逃

## fcitx5 与 fcitx

* Fcitx
> [Fcitx](https://en.wikipedia.org/wiki/Fcitx) (Flexible Input Method Framework) ──即小企鹅输入法，它是一个以 GPL 方式发布的[输入法](https://en.wikipedia.org/wiki/Input_method)平台,可以通过安装引擎支持多种输入法，支持简入繁出，是在 Linux 操作系统中常用的中文输入法。它的优点是，短小精悍、跟程序的兼容性比较好。
>
> --- [Arch Wiki](https://wiki.archlinux.org/index.php/Fcitx_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

* Fcitx5
>Fcitx5 是继 [Fcitx](https://wiki.archlinux.org/index.php/Fcitx) 后的新一代输入法框架。 
>
> --- [Arch Wiki](https://wiki.archlinux.org/index.php/Fcitx5_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

日常偷懒，直接引用(逃

## 好啦，直接开始吧

> 先贴出我的系统情况
>
> 操作系统：Arch Linux
>
> 桌面环境：xfce
>
> 显示管理器：lightdm

实际上，只要把原来写 `.pam_environment` 中的输入法环境变量写到 `.xprofile` 里面就可以解决这个问题，但是我想试试 fcitx5。

### 卸载掉 fcitx

首先我们要先卸载掉原来的 fcitx ，我之前用的是 `fcitx-googlepinyin` 这个输入法，所以这个包也要卸掉，因为会有依赖

除此之外，与 fcitx 有一定关系的都要卸掉，不然 `pacman` 会报错，所以你要执行这个

>（PS：你可能用的不是谷歌输入法，所以请把 `fcitx-googlepinyin` 改成你装的输入法的包名）

```txt
sudo pacman -Rs fcitx-configtool fcitx-googlepinyin fcitx-qt5 fcitx
```

接下来，将这个文件删除，反正也没用了 (逃

```txt
$ sudo rm -rf ./.pam_environment
```


### 安装 fcitx5

现在来安装 fcitx5，这样子弄


* fcitx5

   * 主包，不用多解释啦～

* fcitx5-chinese-addons

   * 中文输入法包.... Arch Wiki 里面是这样解释的:
       > [fcitx5-chinese-addons](https://www.archlinux.org/packages/?name=fcitx5-chinese-addons) 包含了大量中文输入方式：拼音、双拼、五笔拼音、自然码、仓颉、冰蟾全息、二笔等

* fcitx5-im
   * 环境依赖包，要装的，不然在一些软件上打不出字

* fcitx5-configtool
   * fcitx5 的 GUI 配置工具，因为我不懂怎么修改配置文件，所以就装了这个。在上面三个装完之后装。

那么，执行
```txt
$ sudo pacman -S fcitx5 fcitx5-chinese-addons fcitx5-im fcitx5-configtool
```

软件包安装完成后，理论上它是会开机启动的，但是嘛，也有可能出点玄学问题，先手动做一下这个

```txt
$ sudo cp /usr/share/applications/fcitx5.desktop ~/.config/autostart/ -v
```

### 环境变量

嗯哼，最后就是设置环境变量了，既然 `.pam_environment` 不能用了，那要写在哪里呢？ 

[云云](https://blog.lilydjwg.me/2020/7/22/linux-environment-variables.215496.html)说：
>使用 X11 的桌面环境，通常通过 display manager 来登录，比如 lightdm 和 sddm。这俩都支持 `~/.xprofile`。这个文件会在启动过程中被 source，使用的 shell 是由 dm 自己确定的。lightdm 和 sddm 都是用的 `/bin/sh`（分别位于 `/etc/lightdm/Xsession` 和 `/usr/share/sddm/scripts/Xsession` 文件里）。可以看到，除了读取 `.xprofile` 外，lightdm 也会读取 `.profile`。sddm 甚至连 bash、zsh、tcsh、fish 的启动配置脚本都给读了。

也就是说，我们需要把 fcitx5 的环境变量写在 `.xprofile` 这个文件里面

然后...

```txt
$ vim ./.xprofile
```

在里面写入这些东西

```sh
export INPUT_METHOD=fcitx5
export GTK_IM_MODULE=fcitx5
export QT_IM_MODULE=fcitx5
export XMODIFIERS=@im=fcitx5
```

接下来你可以选择重启 `lightdm` ，

```txt
$ sudo systemctl restart lightdm
```

或者重启系统

```txt
$ sudo reboot
```

此时，xfce 的状态栏出现了一个键盘，但是按 <kbd>`CTRL`</kbd> + <kbd>`SPACE`</kbd> 无法弹出中文输入法，这下怎么办呢？

直接右键那个键盘图标，点击配置，然后进入内个 QT 写的配置工具里添加中文输入法就可以啦～～！

![](/img/2020-07-25_15-52.png)

只需要双击就可以添加到左边哦～

然后点击 OK，开始享受 fcitx5 吧


## 参考链接
* [Linux 的环境变量怎么设 - 依云's Blog](https://blog.lilydjwg.me/2020/7/22/linux-environment-variables.215496.html)
* [Fcitx5 (简体中文) - ArchWiki](https://wiki.archlinux.org/index.php/Fcitx5_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* [Fcitx - Wikipedia](https://en.wikipedia.org/wiki/Fcitx)
* [Fcitx (简体中文) - ArchWiki](https://wiki.archlinux.org/index.php/Fcitx_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
