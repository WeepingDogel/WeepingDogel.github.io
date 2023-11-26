# Linux Mint 如何修改软件源


<!--more-->
## 序

由于 Linux Mint 在安装完之后.. 

~~唔啊！ 不许笑！！ 我我我当然早就会！写给萌新看的！喂！不许笑！！~~

![](/img/2020-11-07_14-12.png)

默认的软件源是官方的，在安装软件包和更新的时候得 ~~跨过山河大海，也要穿过人山人海~~ ，因此我们得把它修改为离我们最近的镜像源

对于 Mint 来说，无非就两种办法

**注意：二选一**

## 一、终端法

我们先去 TUNA 镜像站看看[帮助文档](https://mirrors.tuna.tsinghua.edu.cn/help/linuxmint/)

内容是这样的

![](/img/2020-11-07_15-07.png)

嗯... 也许你看不太懂，具体怎么操作...

首先把鼠标移到左下角，打开终端

![](/img/截图_2020-11-07_14-28-48.png)

就是封面上那个东西..

![](/img/2020-11-07_14-34.png)

我们先要编辑 `/etc/apt/sources.list` 这个文件。

Mint 似乎不自带 `vim`，所以我们这里使用 `nano`。

```bash
$ sudo nano /etc/apt/sources.list
```

**注意：`sudo` 不能丢！ 而且按下回车之后要输入密码才能有权限。**

![](/img/2020-11-07_14-39.png)

我们打开才发现里面是空的，除了一大堆英文注释什么都没有..

我们往里面写入
```txt
deb http://mirrors.tuna.tsinghua.edu.cn/linuxmint/ ulyana main upstream import backport
```

接下来还不够，因为 Mint 还有一些包要使用 Ubuntu 的仓库，所以我们再看看 [Ubuntu 的帮助文档](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/) 

![](/img/2020-11-07_14-46.png)

我知道怎么做了，把这些当中的`archive.ubuntu.com` 等域名全部改成`mirrors.tuna.tsinghua.edu.cn` 即可

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
如图：

![](/img/2020-11-07_14-49.png)

接下来，执行
```bash
$ sudo apt update
```
就会比最开始快很多了

## 二、使用自带的更新管理器

首先点击开始菜单，找到设置管理器

![](/img/截图_2020-11-07_15-06-34.png)

滚轮滑下去，找到`软件源`

![](/img/2020-11-07_15-08.png)

输入你的用户密码

![](/img/2020-11-07_15-09.png)

嗯哼，是不是在开头看到过？
![](/img/2020-11-07_15-10.png)

然后用这个软件把这些都改成国内的就好了，具体怎么操作... 我也不好讲啊...

![](/img/2020-11-07_15-12.png)

唔啊！总之这个就是... 拿鼠标点点点就好了...

总之这样就好啦～

![](/img/2020-11-07_15-14.png)

接下來它会提示你是否更新 apt 缓存，点击确定就可以啦～

![](/img/2020-11-07_15-15.png)

等它跑完就好啦～

![](/img/2020-11-07_15-16.png)

## 更新软件包

当我们设置好 apt 软件源后，我们要做的就是进行必要的软件包更新..

还是两种方法

**注意：还是二选一**

### 一、终端法

```bash
$ sudo apt upgrade
```
![](/img/2020-11-07_15-26.png)

![](/img/2020-11-07_15-28.png)

![](/img/2020-11-07_16-44.png)

搞定

接下来重启虚拟机就可以了

### 二、使用这个更新管理器

![](/img/2020-11-07_15-19.png)

点击就好～

![](/img/2020-11-07_15-20.png)

然后输入密码就可以了

![](/img/2020-11-07_15-21.png)

点击安装更新就好了
![](/img/2020-11-07_15-24.png)

确定

![](/img/2020-11-07_15-25.png)

截图累死了...

然后等它跑完就好了

![](/img/2020-11-07_15-25_1.png)

接下来重启虚拟机就可以了

## 结语

首先要说的是，我是使用 Linux Mint 20 来演示的，在未来它会更新，也许本文章的有些细节与实情不相同，但操作是大同小异的。请根据实际情况随机应变。

其次，~~不许笑~~ ，本文章是面向刚接触 Linux 的初学者，不喜勿喷。

如果有什么不足之处，或一些粗心造成的小错误，请在下面的 gitalk 中留言

最后，本站遵循 [CC-BY-NC 4.0 协议](https://creativecommons.org/licenses/by-nc/4.0/)，转载请注明出处

----

## 参考链接

* [linuxmint | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/linuxmint/)

* [ubuntu | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)


