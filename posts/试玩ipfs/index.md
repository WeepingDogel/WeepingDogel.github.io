# 试玩 IPFS 协议——Web3.0时代的先驱者。



~~这个 LOGO 真好看。~~

# IPFS 是什么啊？

**IPFS(InterPlanetary File System)**, 听名字一看好像是个文件系统？ 翻译过来是星际文件系统，听起来是不是很高级？

实际上它能实现的功能远比文件系统强大。

{{< admonition type=tip title="官方描述" open=true >}}
IPFS is a collection of protocols, packages, and specifications that allow computers to send and receive data. Because of this, users can pick and choose which packages to install when using IPFS. And like shoe sizes, there is no one-size-fits-all solution. A developer building network applications will install a different set of tools than someone who wants to store files on IPFS. Pick the one that best suits what you're here to do.
{{< /admonition >}}

如果你康得懂英文就很容易明白它是啥了，如果你康不懂那就来翻译一下。

> IPFS 是允许计算机发送和接收数据的协议、包和规范的集合。 因此，用户可以在使用 IPFS 时选择要安装的软件包。 和鞋码一样，没有一种万能的解决方案。 构建网络应用程序的开发人员将安装一组不同的工具，而不是想要在 IPFS 上存储文件的人。 选择最适合您在这里做的事情。
> （Google Translate）


其实它的原理和BT差不多，具有去中心化的性质，这可能会加速从 Web2.0 时代到 Web3.0 时代的过程。

它可能会带头颠覆之前 Web2.0 时代所有的开发逻辑。因为这是比 http 还底层的协议，它可不仅仅是让你能够通过 BT 下载好康的那么简单，而且它可以让一切信息都用去中心化的方式传输。

因此我对它挺有兴趣的，今天就来玩一下。


# 我能怎么玩？

对于目前这么菜的我来说，可以先试试官方文档写好了的玩法， 233。

## 安装
在一切开始之前我得先把 IPFS 安装上去。

我们可以选择多种安装方案。

阅读 [IPFS 官方文档的 Install 部分](ipns://docs.ipfs.tech/install/)

![](/img/2022-08-13-14-12-24屏幕截图.png)

桌面用户（如 Windows、Mac、Linux）可以使用 IPFS Desktop，可以通过阅读官方文档中的教程进行安装和配置。 同样 Linux 也可以使用

然而 Arch 需要通过 aur 才能安装 `ipfs-desktop` 这个包，因此我决定安装命令行版本的 ipfs。

根据[官方文档](ipns://docs.ipfs.tech/install/command-line/#system-requirements)的教程

我们需要用 `wget` 下载一个叫 `kubo` 的包：

>1. Download the Linux binary from dist.ipfs.tech (opens new window).
>```
>wget https://dist.ipfs.tech/kubo/v0.14.0/kubo_v0.14.0_linux-amd64.tar.gz
>```

然后要进行解压、复制文件等一系列繁琐的操作，然而咱用 Arch 的就别吃这一套了。因为咱官方的仓库就有这个包

打开你的终端，用 `pacman` 找一下这个包:
```
sudo pacman -Ss kubo
```
接下来你的终端就会返回类似于这样的信息:
```
community/kubo 0.14.0-1
    A peer-to-peer hypermedia distribution protocol
```

装它就完事了！

```
sudo pacman -S kubo
```

接下来我们就可以愉快的使用 ipfs 了，哈哈！ ~~这就是咱 Arch 用户的优越性！！！~~

然后我们开始部署 ipfs，将自己的机器作为 ipfs 的节点～！

```
ipfs init
```
![](/img/2022-08-13-15-30-18屏幕截图.png)

```
ipfs daemon
```
![](/img/2022-08-13-15-31-06屏幕截图.png)

接下来我们用 Brave 浏览器打开 WebUI : http://127.0.0.1:5001/webui

然后你就能看到这个界面了:
![](/img/2022-08-13-15-34-13屏幕截图.png)

是不是超简单！

另外，推荐使用 [brave 浏览器](https://brave.com/)来访问 IPFS 服务，毕竟它原生支持 IPFS 网关！



## 文件传输

在当前 Web 2.0 的模式下，我们传输文件必须经过一些大公司的商业网盘，传输速度和存储空间都会得到一定程度的限制。

而使用 IPFS 传输文件则不会受这些限制，除此之外还能规避很大一部分的审查。

使用 IPFS 传输文件也非常简单，只需要使用 WebUI 进行操作即可。

首先点击 "文件"：

![](/img/2022-08-13-15-43-05屏幕截图.png)

再点击右上角的导入：

![](/img/2022-08-13-16-16-17屏幕截图.png)

发送文件者可以点击 `文件` 或 `文件夹` 来导入要分享出去的文件，这时浏览器会自动弹出系统或DE自带的目录选择器，找到需要分享的文件即可。

然后点击对应文件右边的三个点：

![](/img/2022-08-13-16-40-20屏幕截图.png)

选择`复制 CID`，然后将 CID 发给接受者。

而接受者则点击`来自 IPFS 路径`。

![](/img/2022-08-13-16-29-19屏幕截图.png)

将 CID 复制粘贴进去就能将它导入到 WebUI 的文件列表了。

图形化操作，非常简单。

我随便找来几个文件测试了一下，在节点距离较近的情况下传输速度非常惊人。

![](/img/2022-08-13-16-08-49屏幕截图.png)

而在远距离的情况下，速度略有逊色，但很稳定。至少比某些商业网盘的速度要快多了，而且这是免费的。

![](/img/photo_2022-08-13_16-44-30.jpg)

## 网页

IPFS 也是可以用来展示网页的，而且非常简单！

这里是个简单的玩法。

首先编写一个 HTML 文件。

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Hello! IPFS!</title>
    </head>
    <body>
        <h1 style="font-size: 100px;">Hello! IPFS!!</h1>
    </body>
</html>
```

保存，用和文件传输相同的方法把 `index.html` 导入自己的 IPFS 节点。

接下来同样点击文件最右边的三个点，与之前不同的是，这次我们要点击的是第一个按钮，`分享链接`。

![](/img/2022-08-13-16-51-44屏幕截图.png)

![](/img/2022-08-13-16-54-56屏幕截图.png)

然后用 Brave 浏览器直接访问链接。

![](/img/2022-08-13-16-55-49屏幕截图.png)

页面成功打开，这时候我们发现地址栏开头写的协议既不是 HTTP 也不是 HTTPS，而是 `ipfs://`

由此可见，这个网页是通过 IPFS 协议打开的：

![](/img/2022-08-13-16-59-29屏幕截图.png)

像这样点对点协议建立的网站是可以有效规避审查的，内容也会更加丰富。

# 对未来有什么影响？

就目前来看， IPFS 节点和用户都比较少，还处于一个冷门阶段。

但是通过我这么菜的试玩，可以看出在文件传输和网页搭建这两个方面 IPFS 是非常优秀的。

唯一想说的是，

在目前全世界节点不足一千的情况下，下载速度最慢最慢都能稳定在1MB/s左右，而某商业网盘运营十几年下载速度却只有9kb/s。

实在是想不到别的理由来拒绝 IPFS 的怀抱了。

也许有一天 IPFS 能火起来，节点数量能增加到 70 亿，那个时候，资源的获取和分享将会更加自由和高效吧。

除此之外，如果用 IPFS 来干一些更能满足需求的事情，一切去中心化，将会对 Web 2.0 时代的巨头们造成一次沉重的打击。

还在想什么呢，赶紧在本地搭一个 IPFS 节点试试看？也许你会想用 IPFS 整一些有意思的活？在评论区留言吧。

# 参考链接

* [星际文件系统 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-cn/%E6%98%9F%E9%99%85%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F)
* [IPFS Documentation | IPFS Docs](https://docs.ipfs.io)
* [InterPlanetary File System - ArchWiki](https://wiki.archlinux.org/title/InterPlanetary_File_System)

