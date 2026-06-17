# scp Command Summary


<!--more-->
## What is the scp Command?

It's for transferring files...

When we use `ssh` to operate a server and need to transfer files to it, the `scp` command transfers files through the `ssh` port.

## Usage

When we type `scp` in the terminal, we get this:

```txt
weepingdogel@WeepingDogel ~> scp
usage: scp [-346BCpqrTv] [-c cipher] [-F ssh_config] [-i identity_file]
            [-J destination] [-l limit] [-o ssh_option] [-P port]
            [-S program] source ... target
```

We quickly recognize some parameters...

## Examples

Let me give some examples to demonstrate the specific usage...

First, let me describe my test environment:

> Arch Linux
>
> IP: 192.168.0.105
>
> CentOS8 VM
>
> IP: 192.168.0.108

### Uploading a File

```txt
$ scp [local filename] username@address:[filename]
```

This is the general usage, but **make sure the path is correct!**

For example:

```txt
weepingdogel@WeepingDogel ~ [1]> scp ./compile/7.1.0.zip root@192.168.0.108:/root/
root@192.168.0.108's password: 
7.1.0.zip                                                    100%   95KB   5.2MB/s   00:00 
```

That's simple — nothing more to say...

### Downloading a File

What if we need to download a file from the server to modify it, and the server doesn't have `ftp`?

We need to use SSH to find the file's location, but I won't go into detail about that — it's off-topic. (Just know the file's location.)

```txt
$ scp username@address:[filename] [local filename]
```

Reminder: this **filename** **is a path!**

It's a **relative path** or **absolute path**! It depends on the situation, but **it's definitely a path!**

For example:

```txt
weepingdogel@WeepingDogel ~> scp root@192.168.0.108:/root/index.html /tmp/index.html
root@192.168.0.108's password: 
index.html                                                   100%   46KB 728.6KB/s   00:00
weepingdogel@WeepingDogel ~> ls /tmp/*.html -lh
-rw-r--r-- 1 weepingdogel weepingdogel 47K  Sep  5 20:54 /tmp/index.html
```

You just need to know the exact location of the file on the server and decide where to save it locally.

### Specifying a Port

Generally, SSH uses port 22, which is the case for cloud servers or servers with public IPs.

But the examples above are based on local network file transfers. We need NAT traversal for remote file transfers, which typically assigns a different port for SSH to establish a tunnel, so the port is no longer 22.

I use [SakuraFRP](https://www.natfrp.com/) — a very useful free NAT traversal service!

**Upload:**
```txt
scp -P [port] [local filename] username@address:[filename]
```
**Download:**
```txt
scp -P [port] username@address:[filename] [local filename]
```

I've already reminded you many times that **this `[filename]` is a path**. No more repetition here.

Well... here's how it looks:

```txt
weepingdogel@WeepingDogel ~> scp -P 45820 root@cn-zj-dx-2.sakurafrp.com:/root/test.py /tmp/test.py
```

But let me do a combined command:

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

Uploading is pretty much the same — just reverse the order. I won't demonstrate it here.

Done writing!

## Reference Links

What? None this time. I figured it out myself...

Well, to be accurate, there is one — search engines~
