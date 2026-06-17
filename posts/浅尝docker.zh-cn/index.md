# 浅尝 Docker


<!--more-->
# 序

嗯，未雨绸缪，提前学一下怎么玩 docker 。

~~卷死他们~~

# docker 是什么？

{{< admonition type=tip title="官方英文简介" open=true >}}
Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.
{{< /admonition >}}
根据官方文档的说明和通俗的理解， docker 能够提供快速部署软件项目的容器，它相当于一个可以模拟项目所需环境的虚拟机，但又和我们理解的一般的虚拟机又不同。

一般的虚拟机需要安装整个操作系统，会对我们的计算机占用大量的资源，而 docker 只需要模拟出项目所需要的运行环境，占用率非常低，这可以大大提高开发效率。

它可以按照我们的需求模拟出软件环境，并且能够快速部署我们开发好的项目实例（比如 Mastodon），并且一定程度上它具有环境隔离功能，运行环境与操作系统相分离，而且可以同时运行多个容器。

并且我们可以把容器封装成镜像，进行反复利用。

就像这条运着集装箱的鲸鱼一样，游到哪都是开箱即用。


![](https://www.runoob.com/wp-content/uploads/2016/04/docker01.png)

# 怎么安装 docker

各个平台装 docker 都非常简单。

Linux 平台可能对初学者稍微难一些，但是对熟悉的用户来说， Linux 安装 docker 非常快。

直接从相应发行版的包管理器安装就行。

## Arch

比如咱 Arch 可以让 pacman 把这条鲸鱼给带回来。

```
sudo pacman -S docker
```
{{< admonition type=note title="注意" open=true >}}
如果运行时出现以下报错

```
docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?.
See 'docker run --help'.
```
请使用 `systemctl` 启动 `docker` 的系统进程。

```
sudo systemctl start docker
```
如果有必要，设置其开机自启
```
sudo systemctl enable docker
```

{{< /admonition >}}
## Debian

如果是用 deb 系的发行版，可以参考[官方文档](https://docs.docker.com/engine/install/debian/#install-docker-engine)用 apt 来安装。

### 设置仓库
1. 更新 apt 仓库，并安装一些依赖来允许 apt 通过 https 使用第三方仓库。 
```
sudo apt update
```
```
sudo apt install ca-certificates curl gnupg lsb-release
```

2. 添加 Docker 官方 GPG 密钥

```
sudo mkdir -p /etc/apt/keyrings
```

```
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

3. 设置 Docker 仓库
```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 安装 docker

1. 更新软件包仓库

```
sudo apt update
```

如果更新的时候发生了 GPG 错误，可以参考官网的[这个提示](https://docs.docker.com/engine/install/debian/#install-docker-engine)：

{{< admonition type=tip title="Receiving a GPG error when running apt-get update?" open=true >}}
Your default [umask](https://en.wikipedia.org/wiki/Umask) may be incorrectly configured, preventing detection of the repository public key file. Try granting read permission for the Docker public key file before updating the package index:

```
 $ sudo chmod a+r /etc/apt/keyrings/docker.gpg

 $ sudo apt-get update
```
{{< /admonition >}}

2. 安装 Docker Engine 、 containerd 和 Docker Compose.

```
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

3. 通过运行 hello-world 镜像来验证 docker 是否安装成功

```
sudo docker run hello-world
```

## rpm 系列

其实说实话，这类发行版我个人不太喜欢，就拿 CentOS 为例吧，CentOS 7 以上的版本也是可以直接用 yum 安装的。

### 设置仓库

一样是设置第三方仓库。

不过要先安装 `yum-utils` 才能用 `yum-config-manager`。

```
sudo yum install -y yum-utils
```

然后设置仓库
```
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```
### 安装

一样是使用 yum 命令来安装 docker 的软件包和依赖。

```
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## 对于 Linux 平台再提一嘴

上述的方法都是在 Linux 平台安装 docker 的最新版本，如果需要安装特定的版本，可以[参考 docker 的官方文档](https://docs.docker.com/engine/)进行操作。

## Windows

在 Windows 平台可以直接安装 docker-desktop，这也非常简单，直接通过 [docker 官方文档](https://docs.docker.com/desktop/install/windows-install/)[下载](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)安装包就行了。

# 我能怎么玩 docker？


docker 能干的事多着呢。 

最常用的就是在 docker 容器里运行应用程序了。

## HelloWorld

比如我们来运行一个 Hello World

```
sudo docker run ubuntu /bin/echo "hello world"
```

如图所见，它输出一系列字符后，在最后输出了 hello world

![](/img/2022-11-07-07-53-37屏幕截图.png)

那么来解释一下命令的含义吧

* `docker` -- 运行 docker 的二进制文件, 这个没什么好说的
* `run` -- 运行容器
* `ubuntu` -- 要运行的镜像名称
* `/bin/echo "hello world"` - 在容器里面要执行的命令

{{< admonition type=tip title="提示" open=true >}}
如果出现了以下信息，可能是因为在启动容器的时候没有下载好相关的镜像
```
Unable to find image 'ubuntu:latest' locally
latest: Pulling from library/ubuntu
e96e057aae67: Pull complete 
```
默认情况下 docker 会自动下载，但最好养成启动之前下载好镜像的习惯。
```
sudo docker pull ubuntu
```
{{< /admonition>}}

## 交互式容器

当然,我们也可以创建一个可以交互的容器,意思就是可以用 bash 来控制它

```
sudo docker run -i -t ubuntu /bin/bash
```

{{< admonition type=tip title="参数含义" open=true >}}
* `-i`: 交互式操作。
* `-t`: 终端。

[引自菜鸟教程](https://www.runoob.com/docker/docker-image-usage.html)
{{< /admonition >}}

这样我们创建容器之后,我们的 shell 也变成了容器里的 shell

![](/img/2022-11-08-14-22-05屏幕截图.png)

我们可以对它进行一些操作命令,随便打几个吧.

![](/img/2022-11-08-14-27-39屏幕截图.png)

而且我们执行的命令是不会影响到主系统的

然后我们可以使用 `exit` 命令来退出这个系统.

![](/img/2022-11-08-14-26-41屏幕截图.png)

这样一来容器的操作系统就退出了,同时容器也停止运行了, 因为这个容器不是以 daemon 模式来运行的.

## 以 daemon 模式来运行容器

接下来我要说的是,为啥上文中用 `exit` 退出容器 shell 之后还不算完.

这次我们再打开一个容器,不过这次加一个参数 `-d`

这个参数的意思是以 Daemon 模式运行, 那么 Daemon 是什么意思呢?

通过搜索引擎得到的答案往往是什么 系统守护进程巴拉巴拉的,其实它类似于后台运行的意思.

接下来我们用这个命令来开个容器
```
sudo docker run -i -t -d ubuntu /bin/bash
```
![](/img/2022-11-08-14-27-39屏幕截图.png)

这时我们发现,我们并没有得一个 shell, 而是得到来一串字符串.

我们试试用 docker 的 ps 命令来查看一下正在运行的容器:

```
sudo docker ps
```
我们得到来这样的结果

![](/img/2022-11-08-14-36-23屏幕截图.png)

图片可能不太清楚? 这里还是贴出来吧


```
[weepingdogel@WeepingDogel-Arch ~]$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED              STATUS              PORTS     NAMES
2f4976200305   ubuntu    "/bin/bash"   About a minute ago   Up About a minute             funny_pare
```

然后发现了返回的结果中容器 ID 只有上面返回字符串的前面一部分,这个往往是我们会用的容器 ID

要怎样才能控制它的 shell 呢?

又要接触新的 docker 命令了

* attach
* exec

exec 需要加上 `-i` 和 `-t` 参数以及命令,比如 `/bin/bash` .

所以执行格式是这样的

```
sudo docker exec -it 容器ID 命令
```

然后我们需要执行 bash

```
sudo docker exec -it 2f4976200305 /bin/bash
```

很快,我们就进入了容器的 shell.

![](/img/2022-11-08-15-03-59屏幕截图.png)

我们可以用 `cat /etc/os-release` 来查看系统信息.

![](/img/2022-11-08-15-05-52屏幕截图.png)

我们可以很清晰的看到,上面返回的是 Ubuntu 而我用的是 Arch, 因此我们可以确定容器里的东西不会影响到操作系统.

什么?不清晰?那再看清楚一点吧

```
PRETTY_NAME="Ubuntu 22.04.1 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.1 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=jammy
```

退出还是一样的可以用 `exit` , 但是此时的 exit 只是退出这个 bash, 它并不会关闭容器.

执行 `docker ps` 我们可以看到它还在运行.

![](/img/2022-11-08-15-47-58屏幕截图.png)

那么我们接下来试试 attach

它的用法是

```
sudo docker attach 容器ID
```

所以我需要执行

```
sudo docker attach 2f4976200305
```

![](/img/2022-11-08-16-07-28屏幕截图.png)

这样一来我们也可以得到一个shell,但是如果我们执行了 `exit`, 这个容器是会被停止的.

来试试看?

很明显,当 `exit` 被执行之后用 `docker ps` 命令看不到正在运行的容器ID,这说明容器被停止了.

![](/img/2022-11-08-16-13-36屏幕截图.png)

如果需要再次启动这个容器呢,我们可以使用 start 或者 restart 命令来重启.

```
sudo docker restart 2f4976200305
```

此时我们用 `docker ps` 就又能看到它在运行了

{{< admonition type=tip title="提示" open=true >}}
使用 `docker ps -a`命令可以查看所有的容器,无论是否正在运行

```
sudo docker ps -a
```

![](/img/2022-11-09-17-27-47屏幕截图.png)
{{< /admonition >}}


## 删除容器

如果这些容器不需要了怎么办,

~~比如玩坏了,要把它删掉~~

那就要用 `docker rm` 命令

```
sudo docker rm 容器ID
```

后面接上容器 ID 就能删除, 可以删除多个

```
sudo docker rm 6c8c8d9f5540 6c49bc1fdc49 eb71e810ee50 5a84d067d769 2addaf3666ef
```

然后在用 `docker ps -a` 来查看, 就看不到任何容器 ID 了

![](/img/2022-11-09-19-05-22屏幕截图.png)

## 镜像

docker 容器运行的前提条件是它需要相应的镜像.

可以用 `docker images` 来查看本地已经有的镜像, 如果需要的别的镜像可以用 `docker pull` 来获取

```
sudo docker images
```

![](/img/2022-11-10-12-44-18屏幕截图.png)

我们来获取 php 的镜像

```
sudo docker pull php
```

![](/img/2022-11-10-18-01-21屏幕截图.png)

等待他们自动下载完成,镜像就可以用了.

如果你运行容器的时候没有事先拉取镜像的话, docker 则会在运行容器的时候临时进行拉取.

下载进程完成之后, 我们查看一下现有的镜像
```
sudo docker images
```

```
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
ubuntu       latest    a8780b506fa4   7 days ago    77.8MB
php          latest    30e567f030d3   12 days ago   484MB
httpd        latest    fe8735c23ec5   2 weeks ago   145MB
```

{{< admonition type=tip title="各个选项说明:" open=true >}}

* REPOSITORY：表示镜像的仓库源

* TAG：镜像的标签

* IMAGE ID：镜像ID

* CREATED：镜像创建时间

* SIZE：镜像大小

同一仓库源可以有多个 TAG，代表这个仓库源的不同个版本，如 ubuntu 仓库源里，有 `15.10`、`14.04` 等多个不同的版本，我们使用 `REPOSITORY:TAG` 来定义不同的镜像。


[引自菜鸟教程](https://www.runoob.com/docker/docker-image-usage.html)

{{< /admonition>}}

## 删除镜像

当然, 不需要的镜像也是可以删除的.

```
sudo docker rmi 镜像ID
```

![](/img/2022-11-10--19-35-17屏幕截图.png)

如图,这样就把不需要的镜像删除了


## dockerfile

啥是 dockerfile? Dockerfile 是用来构建镜像文件的文本文件, 文件里面包含的是一条条指令和说明, 和一些 shell 脚本类似(比如 PKGBUILD )


而一个简单的 Dockerfile 是长这样的

```dockerfile
FROM nginx
RUN echo 'Hello World!' > /usr/share/nginx/html/index.html
```

{{< admonition type=tip title="来自菜鸟教程的提示" >}}
* `FROM` 定制的镜像都是基于 FROM 的镜像, 这里的 nginx 就是定制需要的基础镜像。后续的操作都是基于 nginx。
* `RUN` 用于执行后面跟着的命令行命令。有以下俩种格式：

shell 格式：
```dockerfile
RUN <命令行命令>
# <命令行命令> 等同于，在终端操作的 shell 命令。
```

exec 格式:
```dockerfile
RUN ["可执行文件", "参数1", "参数2"]
# 例如：
# RUN ["./test.php", "dev", "offline"] 等价于 RUN ./test.php dev offline
```
{{< /admonition >}}

熟悉 Linux 操作的话, 上手这玩意也就很简单了, 但是值得注意的是菜鸟教程当中说的这一段:

{{< admonition type=note title="注意" open=true >}}
Dockerfile 的指令每执行一次都会在 docker 上新建一层。所以过多无意义的层，会造成镜像膨胀过大。例如：

```dockerfile
FROM centos
RUN yum -y install wget
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz"
RUN tar -xvf redis.tar.gz
```

以上执行会创建 3 层镜像。可简化为以下格式：

```dockerfile
FROM centos
RUN yum -y install wget \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && tar -xvf redis.tar.gz
```
{{< /admonition >}}

也就是说我们要尽量在 RUN 当中写命令脚本的时候尽量写并列语句.




## 一个简单的 Web 服务器.

现在我想试试用 docker 来跑一个简单的网页了.

就跑一下我之前闲着没事干写的[登录页面](/simpleLogin/index.html)吧.

首先我们要创建一个目录

```
mkdir webtest
```

先把前端的静态文件复制进去

```
cp test/* webtest/ -rv
```

然后进入该目录

```
cd webtest
```

检查一下文件

```
ls -lh
```

```
总计 4.0K
drwxr-xr-x 2 weepingdogel weepingdogel   23 11月10日 21:30 css
drwxr-xr-x 2 weepingdogel weepingdogel    6 11月10日 21:30 img
-rw-r--r-- 1 weepingdogel weepingdogel 1.4K 11月10日 21:30 index.html
drwxr-xr-x 2 weepingdogel weepingdogel   21 11月10日 21:30 js
```

ok ,现在我们来写一个 dockerfile

```dockerfile
FROM nginx
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./css/style.css /usr/share/nginx/html/css/style.css
COPY ./js/main.js /usr/share/nginx/html/js/main.js
```

{{< admonition type=tip title="指令详解" open=true >}}

* COPY

复制指令，从上下文目录中复制文件或者目录到容器里指定路径。

格式：
```dockerfile
COPY [--chown=<user>:<group>] <源路径1>...  <目标路径>
COPY [--chown=<user>:<group>] ["<源路径1>",...  "<目标路径>"]
```

**`[--chown=<user>:<group>]`**：可选参数，用户改变复制到容器内文件的拥有者和属组。

**`<源路径>`**：源文件或者源目录，这里可以是通配符表达式，其通配符规则要满足 Go 的 filepath.Match 规则。例如：
```dockerfile
COPY hom* /mydir/
COPY hom?.txt /mydir/
```
**`<目标路径>`**：容器内的指定路径，该路径不用事先建好，路径不存在的话，会自动创建。
{{< /admonition >}}

我的思路和正常的搭建方式一样,安装 nginx 之后再把写好的静态文件复制到web根目录就行, 但是用 docker 的效率高很多.

但是如果不用 docker 的话, 我至少要多花半个小时的时间去配置一个虚拟机, 配置软件源 安装 nginx 什么的, 花的时间就更多了, 而现在我只需要写一个脚本就能一键部署, 而且还能保存为镜像分享给别人,一劳永逸~

好了, 话不多说, 开始构建镜像

使用 `docker build` 命令通过目录下的 `dockerfile` 文件构建一个镜像, 

`-t` 的属性值是指 **`<镜像名称:镜像标签>`**

```
sudo docker build -t webtest:latest .
```

注意了, 我在最后面还加了一个 `.` , 这个叫做上写文路径, 也是指相对路径

{{< admonition type=note title="什么叫上下文路径?" open=true >}}
上下文路径，是指 docker 在构建镜像，有时候想要使用到本机的文件（比如复制），docker build 命令得知这个路径后，会将路径下的所有内容打包。
{{< /admonition >}}

然后我们查看一下镜像列表

```
sudo docker images
```
![](/img/2022-11-10-22-19-24屏幕截图.png)

很明显,我们可以看到我们刚刚创建的镜像, 镜像 ID 是 `9acd8c30bd5b`.

那么接下来把它部署到容器里~ 用 `-p` 来指定端口绑定 **`<外部端口:内部端口>`**

```
sudo docker run -p 8080:80 -d 9acd8c30bd5b
```

现在我们已经把容器的 80 端口映射到了宿主机的 8080 端口~

然后访问我们的本地 IP + 8080 就可以访问到那个页面了, 我这里用 `127.0.0.1:8080` 访问

![](/img/2022-11-10-22-27-24屏幕截图.png)

成功访问!

这样一来,快速部署 nginx 就完成了!

# 结语

经过对 docker 初学习和初体验, 我也浅尝到了它的高效率和便捷性, 收获还是比较多的.

但目前还是一个入门的阶段,更多高级应用方法还等着去探索~

诶? 你问我难不难? QwQ ~

对 Linux 熟悉的人来玩这个没几天应该就能玩会了, 不过要做到深入的了解还是需要时间的.

那 就这样吧


