# Linux 基础命令


***提示：面向萌新，大佬勿喷***

刚入门Linux难免会觉得很麻烦，因为不知道如何使用命令去操作，这样的话在Linux系统是寸步难行的，但是学会了一些基础命令以后就能无压力的操作了，想不想学会Linux？那就让我们从简单的文件操作开始吧。
## 如何使用命令行

如果你的发行版自带图形界面的话，可以从图形界面的菜单中找到一个叫 **“终端”** 的东西，打开它，就可以使用命令了。如果你的发行版不带图形界面，那么在tty登录用户以后就可以直接使用了。

注意，这个终端不等于**DOS**也不等于**cmd**，它和windows是没有办毛钱关系的，是另一种东西。
## cd命令

如果你之前用过DOS或者经常使用windows的cmd，你就会知道这个命令了，这个命令在大多数操作系统中都有。

cd命令是”change directory”的缩写，也就是改变你当前所在的目录，后面可以加相对路径，也可以加上绝对路径。

简单的理解，就是进入一个文件夹。
### 用法

测试目录:`/a/b/c`
#### 进入某个目录:

绝对路径：指定一个完整的路径，与自己当前所在的目录无关
```bash
[weepingdogel@localhost ~]$ cd /a/b/c # 进入/a/b/c这个路径中的目录c
# 按下回车后
[weepingdogel@localhost c]$
```
相对路径：指定当前目录上级目录下的其他目录或下级中的一个目录 指定下一级(常用)
```bash
[weepingdogel@localhost b]$ cd ./c # 进入当前所在/a/b目录下面的目录c
# 按下回车后
[weepingdogel@localhost c]$
```
指定上一级
```bash
[weepingdogel@localhost b]$ cd ../xxx #进入当前所在目录/a/b中的/a目录下的其他目录
# 按下回车后
[weepingdogel@localhost xxx]$
```
#### 退出某个目录:

有人可能不知道，进入了目录以后怎么退出来，那么这个时候就要用到cd ..命令了。

返回上一级
```bash
[weepingdogel@localhost c]$ cd .. # 从当前所在的目录/a/b/c返回上一级的目录/a/b
# 按下回车后
[weepingdogel@localhost b]$
```
返回上两级
```bash
[weepingdogel@localhost c]$ cd ../.. # 从当前所在的目录/a/b/c返回上两级的目录/a
# 按下回车后
[weepingdogel@localhost a]$
```
## pwd命令

这个命令是用来辅助上面的cd命令的，它的作用是查看当前所在的绝对路径。
### 用法
```bash
[weepingdogel@localhost ~]$ pwd
# 按下回车后
/home/weepingdogel
```
假如当前所在目录为/a/b/c
```bash
[weepingdogel@localhost c]$ pwd
# 按下回车后
/a/b/c
```
虽然只有一个作用，但是却很重要，因为新手每天都会用到，bash或者部分zsh主题是不会显示绝对路就的，如果你不知道你当前在操作哪个目录，你就得用上pwd这个命令了。
## ls命令

这个命令相当于windows中的**dir**，作用是显示当前目录下的所有的文件和目录。
### 用法

测试目录`/tmp/a/b/c`

直接查看
```bash
[weepingdogel@localhost c]$ ls # 查看当前目录下面的文件
# 按下回车后
223333  文本.txt  test  wiaori # 被列出的文件
[weepingdogel@localhost c]$
```
列表式查看，参数-l
```bash
[weepingdogel@localhost c]$ ls -l
#按下回车后
总用量 4
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 223333
-rw-r--r-- 1 weepingdogel weepingdogel 11  8月  5 17:38 文本.txt
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 17:52 test
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 wiaori
[weepingdogel@localhost c]$
```
易读列表查看，参数-lh
```bash
[weepingdogel@localhost c]$ ls -lh
# 按下回车后
总用量 4.0K
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 223333
-rw-r--r-- 1 weepingdogel weepingdogel 11  8月  5 17:38 文本.txt
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 17:52 test
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 wiaori
[weepingdogel@localhost c]$
```
按时间排序的易读列表查看，参数-lh --sort=time
```bash
[weepingdogel@localhost c]$ ls -lh --sort=time
# 按下回车后
总用量 4.0K
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 17:52 test
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 wiaori
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 223333
-rw-r--r-- 1 weepingdogel weepingdogel 11  8月  5 17:38 文本.txt
[weepingdogel@localhost c]$
```
按文件大小排序的易读列表查看，参数-lh --sort=size
```bash
[weepingdogel@localhost c]$ ls -lh --sort=size
# 按下回车后
总用量 4.0K
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 17:52 test
-rw-r--r-- 1 weepingdogel weepingdogel 11  8月  5 17:38 文本.txt
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 223333
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 wiaori
[weepingdogel@localhost c]$
```
更多用法等你自己去摸索了
## 文件复制与移动
### mv命令

这个命令是英文单词**move**的缩写。

它的作用主要是移动某些文件到指定的位置，你可以指定绝对路径，但是如果离得比较近的话就可以使用相对路径。
#### 用法

##### 绝对路径用法：

比如我们把 **“目录c”** 下面的 **“文本.txt”** 移动到`/tmp/a/`下面
```bash
[weepingdogel@localhost c]$ mv /tmp/a/b/c/文本.txt /tmp/a/
# 按下回车后，文件就被移动了
[weepingdogel@localhost c]$
```
接下来我们切换到`/tmp/a/`下面看看吧
```bash
[weepingdogel@localhost c]$ cd /tmp/a
[weepingdogel@localhost a]$ ls
文本.txt  b
[weepingdogel@localhost a]$
```
此时我们就看到了那个 **“文本.txt”** 被移动到了`/tmp/a/`下面了。

##### 相对路径用法：

那么我们用另一种方法把这个文件移回去吧，首先我们还在这个`/tmp/a/`下面，那么命令如下
```bash
[weepingdogel@localhost a]$ mv ./文本.txt ./b/c/
# 按下回车后，文件就被移动了
[weepingdogel@localhost a]$
```
接下来我们回到`/tmp/a/b/c/`下面看看吧。
```bash
[weepingdogel@localhost a]$ cd ./b/c
[weepingdogel@localhost c]$ ls
223333  文本.txt  test  wiaori
[weepingdogel@localhost c]$
```
看到了没有，它又回来了。

### cp命令

哈哈，这个命令也不是那个cp的意思，它是  **“copy”** 的缩写，复制的意思。

顾名思义，它的作用就是把一个文件复制到另一个地方。它同样有指定绝对路径和相对路径的两种用法。来尝试一下？
#### 用法

##### 绝对路径：

我们来试试把`/tmp/a/b/c/文本.txt`这个文件复制到`/tmp/a/`下面
```bash
[weepingdogel@localhost c]$ cp /tmp/a/b/c/文本.txt /tmp/a/
# 按下回车后，文件就被复制了
[weepingdogel@localhost c]$ cd ../.. # 我们来看看它是否被复制成功
[weepingdogel@localhost a]$ ls -lh # 使用ls命令看一下，可见他是被复制成功的，创建日期与上面不一样。
总用量 4.0K
-rw-r--r-- 1 weepingdogel weepingdogel 11  8月  5 18:36 文本.txt
drwxr-xr-x 3 weepingdogel weepingdogel 60  8月  5 17:37 b
[weepingdogel@localhost a]$
```
> 注意：此命令如果不使用高级用法是无法复制创建时间和所有者的

##### 相对路径：

嘿嘿，我们尝试给/tmp/a/的每一级目录都复制一份吧。
```bash
[weepingdogel@localhost a]$ cp ./文本.txt ./b/ # 先复制到目录b
[weepingdogel@localhost a]$ cp ./文本.txt ./b/c/ # 复制到目录c
[weepingdogel@localhost a]$ cp ./文本.txt ../ # 复制到/tmp/下面
[weepingdogel@localhost a]$ cd .. # 回到/tmp下面
[weepingdogel@localhost tmp]$ ls -lh # 查看是否复制成功，可见第一个就是该文件
总用量 4.0K
-rw-r--r-- 1 weepingdogel weepingdogel 11  8月  5 18:48  文本.txt
drwxr-xr-x 3 weepingdogel weepingdogel 80  8月  5 18:36  a
# 接下来一级一级往下看
[weepingdogel@localhost tmp]$ ls -lh ./a
总用量 4.0K
-rw-r--r-- 1 weepingdogel weepingdogel 11  8月  5 18:36 文本.txt
drwxr-xr-x 3 weepingdogel weepingdogel 80  8月  5 18:45 b
[weepingdogel@localhost tmp]$ ls -lh ./a/b
-rw-r--r-- 1 weepingdogel weepingdogel  11  8月  5 18:45 文本.txt
drwxr-xr-x 3 weepingdogel weepingdogel 120  8月  5 18:25 c
[weepingdogel@localhost tmp]$ ls -lh ./a/b/c
总用量 4.0K
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 223333
-rw-r--r-- 1 weepingdogel weepingdogel 11  8月  5 18:47 文本.txt
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 17:52 test
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 wiaori
```
可见，复制是成功的。

> 注意：如果要复制目录，请在指定目录前加上参数-r，否则将无法复制

## mkdir命令

这个命令是 **“make directory”** 的缩写，意为创建一个目录它一般情况下有两种用法

1. 一般创建，直接在已存在的绝对路径或相对路径创建一个目录
2. 递归创建，创建一连串目录，在创建之前有一级或以上的目录未被创建

同样也是可以指定绝对路径和相对路径的，接下来我就只写出相对路径的示例了，因为方便。

来尝试一下？
### 用法
#### 一般创建

假设目录`/tmp/a/b/c`

我们要创建一个目录`d`
```bash
[weepingdogel@localhost c]$ mkdir ./d # 在/tmp/a/b/c/下面创建一个目录d
# 按下回车之后，目录就创建了，我们可以用ls来检查一下
[weepingdogel@localhost c]$ ls -lh
总用量 4.0K
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 223333
-rw-r--r-- 1 weepingdogel weepingdogel 11  8月  5 18:47 文本.txt
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 19:07 d
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 17:52 test
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 wiaori
[weepingdogel@localhost c]$
```
可见，目录被成功创建了。
#### 递归创建

假设目录`/tmp/a/b/c`

我们要在当前目录下创建一串目录，比如`./go/for/it`，此时我们就要加个参数`-p`
```bash
[weepingdogel@localhost c]$ mkdir -p ./go/fot/it
# 按下回车之后，一串目录就被创建了，接下来我们会一级一级的查看
[weepingdogel@localhost c]$ ls -lh 
总用量 4.0K
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 223333
-rw-r--r-- 1 weepingdogel weepingdogel 11  8月  5 18:47 文本.txt
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 19:07 d
drwxr-xr-x 3 weepingdogel weepingdogel 60  8月  5 19:14 go
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 17:52 test
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 wiaori
# 可见我们看见了目录go
[weepingdogel@localhost c]$ cd ./go # 我们试着进入这个目录，可见我们成功进入了目录
[weepingdogel@localhost go]$ ls -lh #继续查看下一级
总用量 0
drwxr-xr-x 3 weepingdogel weepingdogel 60  8月  5 19:14 for
[weepingdogel@localhost go]$ cd ./for #进入目录for
[weepingdogel@localhost for]$ ls -lh # 继续查看下一级
总用量 0
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 19:14 it
[weepingdogel@localhost for]$ cd ./it #接下来我们进入这个目录it，由于it里面是空的，所以就不用ls查看了
[weepingdogel@localhost it]$ pwd #使用pwd查看当前位置
/tmp/a/b/c/go/for/it
[weepingdogel@localhost it]$
```
可见这一串目录也创建成功了。

## rm命令

> 注意:此命令如果使用不当十分危险

这个命令是 **“remove”** 的缩写，意为删除，作用上和windows中的del命令差不多，但是用法和参数却有所不同，而且诶这个命令如果使用不当是十分危险的，因为在Linux中，就算是正在被使用的文件也可以被删除，并不会有windows那种保姆级别的”拒绝访问”。
### 用法

假设目录`/tmp/a/b/c`

#### 删除文件

我们来尝试删除一下`文本.txt`
```bash
[weepingdogel@localhost c]$ rm ./文本.txt
# 按下回车之后这个文件就被删除了
[weepingdogel@localhost c]$ ls
223333  d  go  test  wiaori
[weepingdogel@localhost c]$
```
#### 删除目录

如果你要删除一个目录，比如go，就需要加一个参数-r
```bash
[weepingdogel@localhost c]$ rm -r ./go
# 按下回车之后，这个目录就被删除了
[weepingdogel@localhost c]$ ls -lh #查看一下就可以看到，go也不见了
总用量 0
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 223333
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 19:07 d
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 17:52 test
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 wiaori
[weepingdogel@localhost c]$
```
#### 强制删除|危险|

如果你需要强制删除一个文件，则需要调用root权限，并且使用`-rf`参数。

> 注意，千万不要用这个命令去删除 `/`目录，否则你的系统将会自杀

比如我们要删除`223333`这个文件
```bash
[weepingdogel@localhost c]$ sudo rm -rf ./223333
# 按下回车后会要你输入一次密码，输入密码后按回车，这个文件就删除了，Linux的安全保护机制使密码不会显示在屏幕上
[sudo] weepingdogel 的密码：
[weepingdogel@localhost c]$ ls -lh # 查看一下文件的情况，可见这个文件不见了
总用量 0
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 19:07 d
drwxr-xr-x 2 weepingdogel weepingdogel 40  8月  5 17:52 test
-rw-r--r-- 1 weepingdogel weepingdogel  0  8月  5 17:52 wiaori
[weepingdogel@localhost c]$
```

## 包管理器

> 注意：不同发行版之间可能有差异

一般情况下，新手使用的**deb系发行版**的包管理器是**apt**

那么这些就是**apt**常用的用法了
```bash
[weepingdogel@localhost ~]$ sudo apt-get update # 更新软件源
```

```bash
[weepingdogel@localhost c]$ sudo apt-get install <包名> # 安装一个软件、软件包
```

```bash
[weepingdogel@localhost c]$ sudo apt-get search <软件名称> # 搜索软件
```

```bash
[weepingdogel@localhost c]$ sudo apt-get upgrade # 升级你已安装的软件，通常消耗时间比较长
```

```bash
[weepingdogel@localhost c]$ sudo apt-get remove <包名> # 卸载软件
```

```bash
[weepingdogel@localhost c]$ sudo apt-get autoremove # 自动处理依赖
```

```bash
如果要安装本地包，则需要使用本地包管理器dpkg，用法如下
```

```bash
[weepingdogel@localhost c]$ sudo dpkg -i <包名> # 安装本地包
```


## 结语

本期博客中的内容并不是很详细，我已经尽力写得让大多数人能看懂，也许还有少数人无法理解内容，没关系，你可以在下面的评论区提问。

那么，欢迎评论。
