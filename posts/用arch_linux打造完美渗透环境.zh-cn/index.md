# 用 Arch Linux 打造完美渗透环境


<!--more-->
## 简介Arch Linux

Arch Linux是一款通用x86_64的GNU/Linux发行版，它采用滚动更新模式，尽全力给用户提供最新的稳定版软件。

> 嘿嘿，很久不滚可能会滚挂哦

刚装完的Arch只是一个基本系统，什么都没有，随后用户就可以根据自己的想法和喜好，安装自己需要的软件，然后通过高度自定义的配置，打造自己喜欢的、理想的系统。这也是Arch的可爱和有吸引力之处。所以Arch也是我最喜欢的发行版之一。

关于Arch Linux的更多详细内容，请参见[Arch Wiki](https://wiki.archlinux.org/index.php/Arch_Linux_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))。

## 本期内容介绍

本期将会演示如何用Arch Linux打造完美的渗透环境。一切操作均为教程演示，请读者根据实际情况操作。没使用过Arch Linux的用户请**谨慎操作**，并仔细查阅[Arch Wiki](https://wiki.archlinux.org/index.php/Main_page_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))。

那么，开始本期的内容吧。

### 提示

本期博客会大量使用Arch Wiki的超链接，以方便理解部分内容。

## 准备工作
### 安装Arch Linux

本期博客不会详细写出Arch Linux的安装过程，请参考[Arch Wiki](https://wiki.archlinux.org/index.php/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))安装Arch Linux，并做好基本的配置工作。

### 选择轻量桌面环境

由于渗透测试中部分操作会占用大量的资源，所以请尽量按需求选择轻量的桌面环境，这里不建议使用 [Gnome](https://wiki.archlinux.org/index.php/GNOME_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)) 和 [KDE](https://wiki.archlinux.org/index.php/KDE_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))，因为二者占用的资源非常大，对低配用户不友好。

1. [LXDE](https://wiki.archlinux.org/index.php/LXDE_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
  * 轻量级GTK桌面环境，默认窗口管理器是 [OpenBox](https://wiki.archlinux.org/index.php/Openbox_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)) ，最轻量的桌面环境之一。

2. [LXQT](https://wiki.archlinux.org/index.php/LXQt_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
  * 2013年间，洪任諭（“PCMan”）启动了将 LXDE 移植到 Qt 的项目。所以LXQT相当于是使用QT的LXDE，默认窗口管理器还是 [OpenBox](https://wiki.archlinux.org/index.php/Openbox_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)) ，它比上面的LXDE还要轻量。

3. [xfce4](https://wiki.archlinux.org/index.php/Xfce_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
  * 目前我在用的桌面环境，基于GTK+2，这个是轻量化桌面环境中最好看的一个了。

4. [i3wm](https://wiki.archlinux.org/index.php/I3_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
  * i3 是一种动态的[平铺式窗口管理器](https://en.wikipedia.org/wiki/Tiling_window_manager)，其灵感来自于面向开发者与资深用户的 [wmii](https://wiki.archlinux.org/index.php/Wmii)。 i3 的既定目标包括清晰可读的文档，完善的多显示器支持，基于树形结构的窗口管理，提供 [vim](https://wiki.archlinux.org/index.php/Vim) 式的多种操作模式。 ——摘自[Arch Wiki](https://wiki.archlinux.org/index.php/I3_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))。

5. 自己DIY桌面环境
  * 你可以使用上面介绍过的 [OpenBox](https://wiki.archlinux.org/index.php/Openbox_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)) 通过配置来DIY自己的桌面环境，也可以使用 [fluxbox](https://wiki.archlinux.org/index.php/Fluxbox_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))、[i3wm](https://wiki.archlinux.org/index.php/I3_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)) 等。详细请参见 ~~[利用openbox打造自己的桌面环境-辣条的博客(链接已失效)。](https://latiao233.github.io/2019/07/30/%E5%88%A9%E7%94%A8openbox%E6%89%93%E9%80%A0%E8%87%AA%E5%B7%B1%E7%9A%84%E6%A1%8C%E9%9D%A2%E7%8E%AF%E5%A2%83/#more)~~

本期博客也将会使用自定义桌面环境进行演示。

> OpenBox+xfce4-panel

### 添加Black Arch源

当Arch Linux基本配置完成之后，就可以开始正常使用了，但是为了安装渗透工具，需要添加一个**Black Arch软件源**

> #### **什么是Black Arch**
>
> BlackArch Linux，简称BlackArch，是一份基于Arch的Linux发行版。该发行版被设计用于系统渗透测试及安全研究。BlackArch提供一张自启动运行DVD镜像，其中包含有多个轻量级窗口管理器和一千多种用于渗透测试和计算机取证分析的专用工具。该系统即可以直接从镜像启动，也可以安装在硬盘、U盘或虚拟机上。 ——摘自[维基百科(需要科学上网)](https://zh.wikipedia.org/zh-hans/BlackArch_Linux)
>
> Black Arch官网：[blackarch.org](https://blackarch.org/)


如上我们知道，Black Arch是一个基于Arch Linux的独立发行版，但我们不需要去安装它，我们只需要添加它的软件源就好。

具体操作如下:
```bash
$ sudo nano /etc/pacman.conf # 编辑pacman.conf文件
```
在`pacman.conf`文件的末尾加入以下内容:

```conf
[blackarch]
SigLevel = Optional TrustAll
Server = https://mirrors.ustc.edu.cn/blackarch/$repo/os/$arch
```

然后执行:
```bash
$ sudo pacman -Syyu
```

如果没问题，就可以使用Black Arch的软件源了。

## 开始安装、配置常用渗透工具
### 端口扫描和信息收集
#### Namp

首先搬出[Nmap](https://baike.baidu.com/item/nmap/1400075?fr=aladdin)，这是一个很常用的扫描工具，可以在渗透的过程中扫描到对方的IP、端口、操作系统等情况。
##### 安装方法

```bash
$ sudo pacman -S nmap
```

##### 基本用法

```bash
$ nmap <目标IP地址> # 简单的扫描
```

```bash
$ sudo nmap -O <目标IP地址> # 扫描目标的操作系统情况
```

```bash
$ sudo nmap -sP <目标IP地址> # ping扫描
```
更多用法可参考搜索引擎查询。

#### xerosploit

这个扫描工具比**Nmap**要炫酷一些，色彩也比较好看，用法也很简单，比**Metasploit**还简单。

##### 安装方法

```bash
$ sudo pacman -S xerosploit
```

##### 用法
```
$ sudo xerosploit
```
然后执行`help`就可以看到软件自带的帮助文档了

#### nslookup

这个命令是查看域名记录的，可以查看Cname、A等各种记录。它包含在**dnsutils**这个包里

##### 安装方法

```bash
$ sudo pacman -S dnsutils
```

安装这个包dnsutils即可。

> 我也不太了解这个，所以具体怎么用请自行百度、谷歌一下吧。

#### nbtscan

内网扫描工具，可以扫描IP段内是否有存活的IP，速度比nmap要快一些。但是只能用于局域网。

##### 安装方法

```bash
$ sudo pacman -S nbtscan
```

##### 使用方法

* 基本扫描

```bash
$ sudo nbtscan  -r  192.168.16.0/24
```

* 官方帮助文档
```txt
"Human-readable service names" (-h) option cannot be used without verbose (-v) option.
Usage:
nbtscan [-v] [-d] [-e] [-l] [-t timeout] [-b bandwidth] [-r] [-q] [-s separator] [-m retransmits] (-f filename)|(<scan_range>) 
	-v		verbose output. Print all names received
			from each host
	-d		dump packets. Print whole packet contents.
	-e		Format output in /etc/hosts format.
	-l		Format output in lmhosts format.
			Cannot be used with -v, -s or -h options.
	-t timeout	wait timeout milliseconds for response.
			Default 1000.
	-b bandwidth	Output throttling. Slow down output
			so that it uses no more that bandwidth bps.
			Useful on slow links, so that ougoing queries
			don't get dropped.
	-r		use local port 137 for scans. Win95 boxes
			respond to this only.
			You need to be root to use this option on Unix.
	-q		Suppress banners and error messages,
	-s separator	Script-friendly output. Don't print
			column and record headers, separate fields with separator.
	-h		Print human-readable names for services.
			Can only be used with -v option.
	-m retransmits	Number of retransmits. Default 0.
	-f filename	Take IP addresses to scan from file filename.
			-f - makes nbtscan take IP addresses from stdin.
	<scan_range>	what to scan. Can either be single IP
			like 192.168.1.1 or
			range of addresses in one of two forms: 
			xxx.xxx.xxx.xxx/xx or xxx.xxx.xxx.xxx-xxx.
Examples:
	nbtscan -r 192.168.1.0/24
		Scans the whole C-class network.
	nbtscan 192.168.1.25-137
		Scans a range from 192.168.1.25 to 192.168.1.137
	nbtscan -v -s : 192.168.1.0/24
		Scans C-class network. Prints results in script-friendly
		format using colon as field separator.
		Produces output like that:
		192.168.0.1:NT_SERVER:00U
		192.168.0.1:MY_DOMAIN:00G
		192.168.0.1:ADMINISTRATOR:03U
		192.168.0.2:OTHER_BOX:00U
		...
	nbtscan -f iplist
		Scans IP addresses specified in file iplist.
```

> 这个我也不是很了解，因为平时都用nmap。

#### burpsuite

抓包神器，需要安装java依赖。

##### 安装方法

```bash
$ sudo pacman -S burpsuite
```

##### 使用方法

burpsuite有图形界面，可以通过搜索引擎找到使用方法。

> 图形界面的东西不好讲，图片一多博客就加载不出来了，请见谅。

### 暴力破解、密码生成
#### hydra

暴力破解工具，中文名九头蛇，功能很强大。
##### 安装方法
```bash
$ sudo pacman -S hydra
```
##### 使用方法

* 爆破ssh端口
```bash
$ hydra -l <用户名> -P <密码字典.txt> -v -e ns -t <次数> <目标IP> ssh
```

具体使用方法可以通过搜索引擎查询。

#### crunch

强大的密码字典生成器。

##### 安装方法
```bash
$ sudo pacman -S crunch
```
##### 使用方法

**Crunch中的特殊字符有：**
```bash
'%' 插入数字

'@' 插入小写字母

',' 插入大写字母

'^' 插入符号
```
**Crunch中用到的命令参数有：**
```bash
-b #按大小分割字典文件，比如后跟20mib

-c #密码个数（行数），比如8000

-d #限制出现相同元素的个数（至少出现元素个数），-d 3就不会出现aabbbb之类的情况

-e #定义停止生成密码 ，比如-e abcd：到abcd停止生成密码

-f #调用密码库文件，比如-f charset.lst mixalpha-numeric 意为调用密码库 charset.lst中的 mixalpha-numeric项目字符

-i #改变输出格式

-l #与-t搭配使用

-m #与-p搭配使用

-o #保存为

-p #定义密码元素

-q #读取字典

-r #定义从某一个地方重新开始

-s #第一个密码，从xxx开始

-t #定义输出格式

-z #打包压缩，格式支持 gzip, bzip2, lzma, 7z
```
**生成最小1位，最大8位，由26个小写字母为元素的所有组合:**
```bash
$ crunch 1 8 >> 1.txt
```
**生成 最小为1,最大为4.由abcd为元素的所有组合:**
```bash
$ crunch 1 4 abcd >> 2.txt
```
**生成以“yale”“test”为元素的所有密码组合:**
```bash
$ crunch 4 5 -p yale test
```

还有更多的方法可以自行通过搜索引擎查找。
### 漏洞利用
#### metasploit

这是最重要的一个工具，没有它，内网的渗透也是无法完整进行的。
##### 安装方法
```bash
$ sudo pacman -S metasploit
```
安装完后执行:

```bash
$ sudo msfconsole
```

即可。

##### 修复数据库问题

启动msf以后是不是出现了三行报错？这是没有连接数据库导致的。
###### 安装postgresql
```bash
$ sudo pacman -S postgresql
```

###### 配置postgresql

安装完后会多出来一个用户，叫做`postgres`，我们需要给它设置一个密码。

```bash
$ sudo passwd postgres
```

然后初始化数据库

```bash
$ sudo su - postgres -c "initdb --locale en_US.UTF-8 -E UTF8 -D '/var/lib/postgres/data'"
```

初始化完成后就可以启动数据库了

```bash
$ sudo systemctl start postgresql
```

接下来，进入数据库用户postgres

```bash
$ sudo su postgres
```

执行`psql`

```bash
$ psql
```
然后光标就变成了`postgres=#`
```bash
postgres=#
```
如上面这个样子。

接下来创建一个数据库的新用户，比如`msf4`
```bash
postgres=# CREATE USER msf4 WITH PASSWORD '123456';
```
然后创建对应的数据库
```bash
postgres=# CREATE DATABASE msfdb OWNER msf4;
```
将msfdb数据库的所有权限都赋予msf4
```bash
postgres=# GRANT ALL PRIVILEGES ON DATABASE msfdb TO msf4;
```
退出psql
```bash
postgres=# \q
```
创建Linux普通用户，名称与刚才新建的数据库用户同名，如msf4
```bash
$ sudo useradd msf4
```
###### 通过msf连接数据库

进入msf，链接数据库，命令为`db_connect用户名:密码@ip/数据库名`

```bash
msf5> db_connect msf4:123456@127.0.0.1/msfdb
```

然后检查是否连接成功，如果出现类似以下内容说明成功了。

```bash
msf5 > db_status
[*] Connected to msf3. Connection type: postgresql. Connection name: DFz5oEX3.
```

成功连接后，别忘了保存以及设置`postgresql`自启

```bash
msf5 > db_save
```

```bash
$ sudo systemctl enable postgresql
```

##### 使用方法

参考[这篇文章](/posts/震惊16岁男子竟然在家里做出这种事/)

也可通过搜索引擎找更多的教程。

#### sqlmap

强大的web注入工具，使用方法可以通过搜索引擎查到。
##### 安装方法

执行以下命令安装即可。
```bash
$ sudo pacman -S sqlmap
```
### DNS劫持
#### ettercap

强大的DNS劫持工具，各大搜索引擎也有不少教程。它分为命令行版本和图形化版本，但是只能装其中一个，否则会冲突。

##### 安装方法

命令行版:
```bash
$ sudo pacman -S ettercap
```
图形化版:
```bash
$ sudo pacman -S ettercap-gtk
```

命令行版本在终端执行即可，图形化版本可以在菜单中找到，如果没有执行以下命令

```bash
$ sudo ettercap -G
```

#### apache

怎么还有这个东西？这个东西不是建网站的吗，哈哈，其实这个是辅助ettercap的，当你劫持目标DNS以后，会将其强行解析到你的IP，而apache就可以在你的机器上运行一个静态网页（html）。
##### 安装方法

```bash
$ sudo pacman -S apache
```

##### 使用方法

执行以下命令启动apache

```bash
$ sudo systemctl start httpd
```

网页根目录为`/srv/http/`

可以在目录下写一个html文件，写完执行

```bash
$ sudo systemctl restart httpd
```
以重启apache即可。

## 小结

一个普通的Arch Linuxu导入了Black Arch的软件源之后，可以堪称完美的渗透环境了，以上只是常用的工具，而Black Arch软件源里面有几千个工具，想要什么可以通过`pacman`下载安装，应有尽有。

最后，谢谢访问。
