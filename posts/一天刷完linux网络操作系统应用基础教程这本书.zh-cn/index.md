# 一天刷完《Linux网络操作系统应用基础教程》这本书


<!--more-->
# 序


多日不见，甚是想念。

这段时间开学了，忙了一阵， 好久没更新博客了。

教科书当中看到了这么一本书（上图），叫做《Linux网络操作系统应用基础教程》。第一眼感觉封面挺好看的，这种简约配色显得这本书有高级感...然而，翻了几页看了，发现这是一本基础书籍。

对于一个用了两年 Arch 又不喜欢看书的人来说，这本书里的内容学起来应该会很快吧。

抱着试试看的态度，我想一天肝完这本书。

# 全书目录

首先来看一下目录， 差点笑出声。

很明显，这确实是一些基础内容。其中很大部分在两年 Arch 使用经验中也接触过。

![](/img/photo_2022-09-30_20-37-22.jpg)

![](/img/photo_2022-09-30_20-41-03.jpg)

![](/img/photo_2022-09-30_20-44-12.jpg)

看起来都是一些概念+基础+实践操作

# 概念内容

大概是项目一到项目二的 2.1 的内容，讲了 Linux 的案例、历史、以及流行的发行版。

书中居然没有 Arch, 差评。

但是也描述了 Linux 可以用来运行各种服务，比如 DNS（[Domain Name System](https://zh.wikipedia.org/zh-cn/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F)）服务、Web 服务器（Apache Nginx 这些提供基于HTTP协议的网页服务的）、基于 SMTP 协议的邮件服务器、以及 FTP 协议的文件传输服务器、基于 Samba 协议的文件共享服务器、[DHCP](https://zh.wikipedia.org/zh-ctiaoguo%B8%BB%E6%9C%BA%E8%AE%BE%E7%BD%AE%E5%8D%8F%E8%AE%AE) 服务器 还有 VPN 服务器。

总之就是讲了 Linux 能干啥、Linux 的优点等， 这些可以通过搜索引擎查到，不多赘述。

# 实操性内容

往后都是一些操作性的内容，比如 Linux 的安装和搭建各种服务等

## 安装 Linux 操作系统

书中讲用 VMware 装一个 CentOS 虚拟机。

高中的时候就会了，跳过。

## Linux 基础操作

关于基础操作方面，我在初中的时候就写过一丢丢[基础命令的笔记](https://weepingdogel.github.io/posts/linux%E5%9F%BA%E7%A1%80%E5%91%BD%E4%BB%A4/)

书里也介绍了两种打开终端的方式，一个是在图形界面打开终端，另一种是按 `Ctrl` + `Alt` + `(F1 ~F6)` 来切换 tty。

然后是命令，大部分是加了 `-h` 参数以后的中文翻译，对于英语不太好的人来说，需要的时候翻阅一下也是一件美事。

另外我需要补充一些初中发的那篇文章当中没有写到的一些命令。

### cat

输出一个文件的内容，书中写的用法是

```
cat [选项] [文件名]
```

但我们一般的用法是

```
cat [文件名]
```

这个没什么好说的，也是常用的，但是遇到太长的文本就不太好了。

### less 和 more

我几乎没见过有人用 more， 命令的使用方式都是一样的，但是效果可能不同吧。

```
more [选项] [文件名]
```

```
less [选项] [文件名]
```

一般来说我们都不加什么选项的...

### head 和 tail

这个也没啥好说的，参数用法都一样，不过~~前者看头后者看屁股~~。

```
head [option] [文件名]
```

```
tail [option] [文件名]
```
参数选项
* -n num 显示指定文件的末尾 num 行
* -c num 显示指定文件的末尾 num 个字符。

### rmdir

用来删除目录，用这个的话，删除的目录必须是空的。

否则会报错，和 `mkdir` 一样，可以加 `-p` 来进行递归删除。

递归是什么意思？就是一级一级往下删。

```
rmdir [option] [文件名]
```

然而我平时不喜欢用这个，我喜欢用 `rm -r` 或者 `rm -rfv` 。

### touch

touch 命令可以生成一个普通文件。

```
touch [文件名]
```

### grep

这个用来查看文件中包含指定字符串的行，常用。

```
grep [选项] [要查找的字符串] [文件名]
```

### tar 

这个 tar 我平时就用来解压。
```
tar xvf [文件名]
```
然而这是个打包命令， 相当于压缩文档。

```
tar [选项] [档案文件] [文件列表]
```

* -c 生成档案文件
* -v 列出归档文件解档的详细过程
* -f 指定档案文件名称
* -r 将文件追加到档案文件末尾
* -z 以 gzip 格式压缩或解压
* -j 以 bzip2 格式压缩或解压
* -d 比较档案与当前目录中的文件
* -x 解开档案文件


可以用 `man` 来查看 `tar` 的更多信息。

```
man tar
```

### rpm

rpm 系发行版的离线软件包安装器。至少我是这么理解的。

```
rpm [选项] [软件包名字]
```

这个软件包名字是指一个文件名哦， 一些 `.rpm` 后缀结尾的文件，就是 rpm 系的软件包。

安装好像是这样的

```
rpm -i [软件包名字]
```

其他的参数

* -v 安装过程显示详细信息
* -h 安装过程中显示`#`号进度条
* -e 删除软件包
* -q 查看软件包是否已经安装

也可以通过 `man` 来阅读手册

```
man rpm
```

现在都是直接用 `yum` 或者 `dnf` 这种包管理器了，使用远程仓库来安装和管理软件包。

## 文档编辑

至于文档编辑，就需要用 `vi` 或者 `vim`。

这个也是常有的事

```
vim [文件名]
```

引用一个[菜鸟教程的链接吧](https://www.runoob.com/linux/linux-vim.html)

我平常就用个 `i` 来编辑文档， `ESC` 来退出编辑模式， `:w` 保存， `:q` 来退出。

有时候要加个 `!` 强制执行。

保存退出是 `:wq`

如果有其他需求我会用 `man` 来看文档。

```
man vim
```

## 用户和组的管理

安装 Arch 的时候要干的事，就是用 `useradd` 添加用户。

桌面系统往往不使用 root 用户， 会添加一个或多个普通用户。

有些多人协作部署的服务器也会利用 Linux 多用户的特性。

{{< admonition tip "提示" true >}}
GNU/Linux 系统中的每一个文件都从属一个用户（属主）和一个用户组（属组）。另外，还有三种类型的访问权限：读（read）、写（write）、运行（execute）。我们可以针对文件的属主、属组、而设置相应的访问权限。

—— 摘自&&详见 [ArchWiki](https://wiki.archlinux.org/title/Users_and_groups_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E6%9D%83%E9%99%90%E4%B8%8E%E5%B1%9E%E4%B8%BB)
{{</ admonition >}}

### useradd

这个命令用来添加用户

```
useradd [选项] 用户名
```

先把参数用法贴上

* `-m` / `--create-home` 创建用户主目录`/home/[用户名]`；在自己的主目录内，即使不是root用户也可以读写文件、安装程序等等。
* `-G` / `--groups` 用户要加入的附加组列表；使用逗号分隔多个组，不要添加空格；如果不设置，用户仅仅加入初始组。
* `-s` / `--shell` 用户默认登录shell的路径；启动过程结束后，默认启动的登录shell在此处设定；请确保使用的shell已经安装，默认是 Bash。

{{< admonition tip "提示" true >}}
使用 `useradd --defaults` 可以查看 shell 的默认值。默认是 Bash。使用 `-s` / `--shell` 选项可以设置其他值。`/etc/shells` 记录了可以使用的登录 shell。

—— 摘自 [ArchWiki](https://wiki.archlinux.org/title/Users_and_groups_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
{{< /admonition >}}


比如我要在一个新机器上创建一个用户，用户名为 `weepingdogel` 且需要创建用户主目录 `/home/weepingdogel`， **而且加入到 `wheel` 这个组** ,默认 **shell** 设置为 **Bash** 。

我就会执行这条命令：

```
useradd -G wheel -m -s /bin/bash weepingdogel
```

那如果我要 `zsh` 呢？

```
useradd -G wheel -m -s /bin/bash weepingdogel
```

就像这样咯～

{{< admonition warning "警告" true >}}
1. 新增用户不能与已存在用户的用户名相同;
2. 用户创建后，用户名或组需被 `/etc/sudoers` 文件包含，否则无法使用 `sudo` 调取 root 权限;
3. ~~别瞎j8乱创建一堆没卵用的用户~~
4. 请确保使用的shell已经安装，默认是 Bash。 没装上的 shell 没法用，用户创建不了。
{{</ admonition >}}

### userdel

这个命令用来删除用户

```
userdel [选项] 用户名
```

加上 `-r` 选项可以一并删除用户主目录
```
userdel -r 用户名
```
{{< admonition warning "警告" true >}}
**~~别瞎j8乱删用户~~**
{{</ admonition >}}

没什么好说的，详见 [man userdel](https://linux.die.net/man/8/userdel) 。


### groups

这个命令用来查看用户属于哪些组。
```
groups [用户名]
```

当然我们也可以通过查看 `/etc/group` 来查看所有组。

```
cat /etc/group
```

### id

这个命令可以显示用户的一些额外信息，比如 `UID` 、 `GID` 等等。

```
id [用户名]
```

### groupadd 和 groupdel

前者是创建新组，后者是删除一个组。


创建一个新组：

```
groupadd [组名]
```

删除一个用户组：

```
groupdel [组名]
```

{{< admonition warning "警告" true >}}
**~~别瞎j8乱删组~~**
{{</ admonition >}}

### groupmod

往往用来更改用户所属组的名字，但不变更 `GID`。

```
groupmod -n [新名字] [旧名字]
```

### gpasswd

往往用来变更用户所属于哪个组的情况。

比如将某个用户添加到某个组：

```
gpasswd -a [用户名] [组名]
```

或者将用户从某个组中移除：
```
gpasswd -d [用户名] [组名]
```

其他的用法也可以参考 [man gpasswd](https://linux.die.net/man/1/gpasswd)


{{< admonition tip "提示" true >}}
如果用户已经处于登录状态，必须重新登录才能更改生效。 
{{</ admonition >}}

### 一些相关文件列表

* `/etc/shadow` 	保存用户安全信息
* `/etc/passwd` 	用户账户信息
* `/etc/gshadow` 	保存组账号的安全信息
* `/etc/group` 	    定义用户所属的组
* `/etc/sudoers` 	可以运行 sudo 的用户
* `/home/* `	    主目录 

要好好记住它们。

## 基本磁盘管理

当然也涉及到了磁盘的管理，这个其实在安装 Arch 的时候就能接触不少。

### 查看分区情况

当 Linux 识别到磁盘，就会将其分配为一个块设备， 在系统里是个文件，比如 `/dev/sda`、`/dev/nvme0n1` 或 `/dev/mmcblk0`。可以使用 `lsblk` 或者 `fdisk` 查看： 

```
fdisk -l
```
{{< admonition tip "提示" true >}}
不同的设备当中，磁盘的块设备表示也不同，比如使用 SATA 接口的硬盘会被显示为 `/dev/sd*X`， 而使用 NVME 硬盘则会显示为 `/dev/nvme*n*`
{{</ admonition >}}

### 创建编辑分区

你可以去搜索引擎找 `fdisk` 的说明，按照它来创建、编辑分区，可以用简单的 `cfdisk`。

![](/img/截图_2022-10-01_14-31-22.png)

甚至可以用一些发行版自带的图形化分区工具。

### 格式化

分区创建好以后，就要选择合适的文件系统来进行格式化。

文件系统有哪些？具体可以参考[这个页面](https://wiki.archlinux.org/title/File_systems_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

Linux 往往用 EXT4

使用 mkfs

```
mkfs.ext4 /dev/partition
```

挂载分区
```
mount [被挂载的分区] [要挂载到的地方]
```

当然也可以写 `/etc/fstab` 来进行自动挂载，详情可以看[这里](https://wiki.archlinux.org/title/Fstab_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E8%87%AA%E5%8A%A8%E6%8C%82%E8%BD%BD)


## 资源共享服务

### FTP
搭建 FTP 服务器


首先使用包管理器安装 `vsftpd`

deb
```
sudo apt install vsftpd
```

centos
```
sudo yum install vsftpd
```

通过编辑 `/etc/vsftpd.conf` 来配置

比如允许匿名登录，以及允许无密码登录
```conf
anonymous_enable=YES
no_anon_password=YES
```

然后通过 systemd 启动

```
sudo systemctl start vsftpd
```

通过客户端连接


![](/img/截图_2022-10-01_15-58-41.png)

参考[Arch Wiki](https://wiki.archlinux.org/title/Very_Secure_FTP_Daemon_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E9%85%8D%E7%BD%AE)， 可根据实际情况调整配置。

### Samba

不搞这玩意，太危险了。

## DHCP 服务器

直接安装 dhcpd

deb
```
sudo apt install dhcpd
```
centos
```
yum install -y dhcpd
```

pacman
```
sudo pacman -S dhcpd
```


写配置文件 `/etc/dhcpd.conf`:

```conf
# No DHCP service in DMZ network (192.168.2.0/24)
subnet 192.168.2.0 netmask 255.255.255.0 
```

然后通过 systemd 来启动服务
```
sudo systemctl start dhcpd4
```

## DNS 服务器

懒得搞了，不难

参考 [https://wiki.archlinux.org/title/BIND_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)](https://wiki.archlinux.org/title/BIND_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

## Apache 服务器

这个简单

deb
```
sudo apt install apache2
```

pacman
```
sudo pacman -S apache
```

rpm
```
sudo yum install -y apache2
```
直接启动服务

```
sudo systemctl start httpd
```

然后访问 `http://127.0.0.1:80`就行。
# 总结

~~什么垃圾书！~~

很简单，但是太老了，跟不上时代了。

还是自己去网上找资料来得快。
