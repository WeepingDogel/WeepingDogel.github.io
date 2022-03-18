# scp 命令小结


## scp 命令是什么

是传文件用的.. 

我们用 `ssh` 操作服务器，当我们需要给服务器传输文件的时候，`scp` 命令会通过 `ssh` 的端口进行文件传输。

## 用法

当我们在终端输入 `scp` 后，我们会得到这些
```txt
weepingdogel@WeepingDogel ~> scp
usage: scp [-346BCpqrTv] [-c cipher] [-F ssh_config] [-i identity_file]
            [-J destination] [-l limit] [-o ssh_option] [-P port]
            [-S program] source ... target
```

很显然我们很快就知道了一些参数...

## 示例

这里举一些例子，来展示清楚具体的使用方法...

先说明一下我的测试环境

> Arch Linux
>
> IP: 192.168.0.105
>
> CentOS8 虚拟机
>
>IP: 192.168.0.108

### 上传一个文件

```txt
$ scp [本地文件名] 用户名@地址:[文件名]
```

这是一般用法，但是**请确保路径正确！**

即：
```txt
weepingdogel@WeepingDogel ~ [1]> scp ./编译/7.1.0.zip root@192.168.0.108:/root/
root@192.168.0.108's password: 
7.1.0.zip                                                    100%   95KB   5.2MB/s   00:00 
```

这个很简单的，没什么多说的了..

### 下载一个文件

如果我们要从服务器里取一个文件下来修改，而服务器没有 `ftp` 时该怎么办呢？

我们需要用 SSH 去找到这个文件的位置，不过这个就不详写了，与主题无关。（总之你知道文件的位置就可以了）

```txt
$ scp 用户名@地址:[文件名] [本地文件名]
```

还是要提醒一下，这个**文件名**， **是一个路径！**

是一个**相对路径**或**绝对路径**！具体依情况而定，但**它一定是个路径！**

如：
```txt
weepingdogel@WeepingDogel ~> scp root@192.168.0.108:/root/index.html /tmp/index.html
root@192.168.0.108's password: 
index.html                                                   100%   46KB 728.6KB/s   00:00
weepingdogel@WeepingDogel ~> ls /tmp/*.html -lh
-rw-r--r-- 1 weepingdogel weepingdogel 47K  9月  5 20:54 /tmp/index.html
```

只需要知道文件在服务器的具体位置以及想好保存到本地的一个位置就可以了

### 指定一个 IP 

一般情况下 SSH 的端口都是 22，那是真的云服务器或者一些有公网 IP 的服务器。

而上文写的是基于局域网中的文件传输，我们需要内网穿透才能远程文件传输，但内网穿透在一般情况下都是指定一个别的端口来给 SSH 建立一个通道，因此端口就不再是 22 了。

我这里用的是 [SakuraFRP](https://www.natfrp.com/) ，非常好用的免费内网穿透服务！

**上传：**
```txt
scp -P [端口]  [本地文件名] 用户名@地址:[文件名]
```
**下载：**
```txt
scp -P [端口] 用户名@地址:[文件名] [本地文件名]
```

上面已经提示过很多次**这个`[文件名]`是个路径了**。这里就不再多废话啦。

嗯... 具体就是这样子的：
```txt
weepingdogel@WeepingDogel ~> scp -P 45820 root@cn-zj-dx-2.sakurafrp.com:/root/test.py /tmp/test.py
```

但是这里我来个组合命令
```txt
weepingdogel@WeepingDogel ~ [1]> scp -P 45820 root@cn-zj-dx-2.sakurafrp.com:/root/test.py /tmp/test.py && cd /tmp && python test.py
The authenticity of host '[cn-zj-dx-2.sakurafrp.com]:45820 ([222.186.174.33]:45820)' can't be established.
ECDSA key fingerprint is SHA256:8J1Z+I8NtPXAk7EFDwLiwu8pmwSoPLYeJM2iYnV7z5M.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '[cn-zj-dx-2.sakurafrp.com]:45820,[222.186.174.33]:45820' (ECDSA) to the list of known hosts.
root@cn-zj-dx-2.sakurafrp.com's password: 
test.py                                                      100%   21     0.2KB/s   00:00    
Hello World
```

上传的也是差不多的啦，把位置反过来就可以了，这里就不多演示啦

写完啦！

## 参考链接

啥？这次没有，自己试出来的...

唔啊！准确来说也有，那就是各种搜索引擎啦～


