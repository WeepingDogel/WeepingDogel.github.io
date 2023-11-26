# 如何解决 gvfs 在 i3wm 下无法挂载的问题


<!--more-->
## 序
呃... 前面其实没什么可以说的废话，就是出问题了嘛...

然后就去群里问了，弄好了，然后写一下怎么弄好的...

换 i3wm 了，然后使用文件管理器挂载别的分区的时候，突然弹出这个报错...

![](/img/image_2021-01-09_16-24-45.png)

这个问题一般是缺包，

好吧其实就是少装了东西。

我们需要装的是 `polkit` 这个东西...

如果不知道它是啥的话，看 Arch Wiki 的这个页面。

 * [Polkit - ArchWiki](https://wiki.archlinux.org/index.php/Polkit)


## 解决过程

首先安装 `polkit` ，

```txt
$ sudo pacman -S polkit
```

装完后，我们还需要安装其对应的图形前端。

如图，我们有很多可以选择。

![](/img/2021-01-16_23-40.png)

我这里选择 Gnome 的，比较习惯..

用 `pacman` 就可以装了，

```txt
$ sudo pacman -S polkit-gnome 
```

如果想用其他的，把 `polkit-gnome` 替换成其他包名即可。 

但是装完还不行，还得设置启动项，原因？ 在这：

> If you are using a graphical environment, make sure that a graphical authentication agent is installed and [autostarted](https://wiki.archlinux.org/index.php/Autostarting) on login.
>
> ——[Arch Wiki 里写的](https://wiki.archlinux.org/index.php/Polkit#Authentication_agents)

大意就是，如果你要用的话，得保持这个程序运行...

大概是这样吧，想看完整意思就去谷歌翻译吧..

接下来我要做的是想办法启动...

其实我们在终端里直接输入 wiki 上对应的路径就可以用了

```txt
$ /usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &
```

但这样的话每次都要打一遍，反正我是觉得麻烦～ rua～

所以要设置开机启动，一般是可以这样的..

![](/img/photo_2021-01-16_23-59-36.jpg)

嘛... i3wm 的话，要参考这个文档了。

 * [i3: i3 User’s Guide](https://i3wm.org/docs/userguide.html#_automatically_starting_applications_on_i3_startup)

接下来呢，我就直接编辑 `~/.config/i3/config` 这个文件。

```txt
$ vim ~/.config/i3/config
```

然后在里面加入...

```sh
# 登录时，启动 polkit-gnome 

exec --no-startup-id /usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1

```

![](/img/photo_2021-01-17_00-02-51.jpg)

然后我就重启了。

嗯，可以用了。

![](/img/2021-01-16_23-52.png)

然后我试着输入密码，敲下去之后... 嗯，又报错了..

![](/img/photo_2021-01-16_23-53-31.jpg)

看英文就知道.. 这其实是另一个问题了.. 

其实它 balabla 一大堆，只不过是 `ntfs-3g` 这个包我又忘了装而已啦..

```txt
$ sudo pacman -S ntfs-3g
```

然后就好了...

不过截图是我今晚截的..

![](/img/2021-01-17_00-00.png)

## 结尾

然后我就又可以快乐地使用 `i3wm` 啦～



