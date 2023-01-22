# 修正普通用户使用 docker 时没权限的问题


# 序

![](/img/2023-01-23-01-03-33屏幕截图.png)

平时用 docker 的时候都是用 sudo 来调用 root 权限才能运行，这样其实很不安全，尤其是在共用环境中这样滥用 root 权限会有很大风险。

为了规避这个风险，可以用一种简单的方法修复这个问题。

# 解决方法

首先创建一个新组名为 `docker` 。
```
$ sudo groupadd docker 
```

然后把用户添加进去。
```
$ sudo usermod -aG docker $USER
```

这里将 `$USER` 改为当前登录的用户名， 比如我是 `weepingdogel` 。

然后再重新登录到该组就行啦。

```
$ newgrp docker
```

run 一个 `hello-world`， 来检查一下是否修复成功。

```
$ docker run hello-world
```

![](/img/2023-01-23-01-10-40屏幕截图.png)

很明显它成功了！

但是如果还是报错的情况下，这个时候就要重启了。

```
$ reboot
```

自此，这个问题就解决了。

# 参考链接

* https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue
