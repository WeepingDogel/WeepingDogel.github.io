# Attempt to Solve the Problem of VirtualBox Stuck on 'Starting' When Starting a Virtual Machine



<!--more-->
# Prologue: What was the problem?

Today, I felt like playing around with VirtualBox and discovered that every virtual machine was stuck at `Starting virtual machine.`.


The first step when encountering a problem is to go to Google.

Hmm... I found two posts on the official Arch forum.

* [Virtualbox hangs on Starting virtual machine window / Newbie Corner / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=277409)

* [KVM busted in linux 5.18 due to Intel CET / Kernel & Hardware / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=276699)

After reading the two posts, I discovered that it was due to a bug in KVM in the new version of the kernel.

Fortunately, a skilled individual had already submitted a bug report.

* [FS#75481 : [linux] VBox virtual machines stop functioning](https://bugs.archlinux.org/task/75481)

* [x86/ibt: Add IBT feature, MSR and #CP handling · torvalds/linux@991625f · GitHub](https://github.com/torvalds/linux/commit/991625f3dd2cbc4b787deb0213e2bcf8fa264b21)

~~As for how this bug came about... I'm not sure, I'm not that knowledgeable.~~


# Thinking about how to solve it


Based on the content of the posts I've read, the solution is to set the kernel parameter `ibt=off`.

>Thank you 
>
>appending
>```
>ibt=off
>```
>to kernel boot params fixed my problem. 


## How do I set kernel boot parameters?

Since I didn't know how to do this, I went to Google and found a method.

* [How to set kernel boot parameters on Linux - Linux Tutorials - Learn Linux Configuration](https://linuxconfig.org/how-to-set-kernel-boot-parameters-on-linux)

## Proposed Solution

Actually, the solution is to edit the value of GRUB_CMDLINE_LINUX="" in the /etc/default/grub file and add "ibt=off" to it.

# Solution Steps

## 1. Edit the `/etc/default/grub` file

The purpose of editing this file is to set the kernel boot parameters. The method for setting this may vary depending on the system booted by different bootloaders. As I am using Grub in my Arch system, I need to edit this file.


```commandline
$ sudo vim /etc/default/grub
```

Find the keyword `GRUB_CMDLINE_LINUX=""` and add the parameter `ibt=off`.


```conf
# GRUB boot loader configuration

GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="Arch"
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=7"
GRUB_CMDLINE_LINUX="ibt=off"

......
```

Enter `:` and type `wq` to save and exit the file (this is a basic operation and requires no further explanation).

## 2. Regenerate the Grub configuration file

Then, regenerate the Grub configuration file.
```commandline
$ sudo grub-mkconfig -o /boot/grub/grub.cfg
```

Wait for the operation to complete. If there are no errors, you can restart the operating system.

```commandline
$ sudo reboot
```

# Testing and Verification

After restarting the system, open VirtualBox again and start a virtual machine. At this point, it should successfully enter the system.

![](/img/photo_2023-03-06_23-08-43.jpg)

This means that the problem has been solved.



