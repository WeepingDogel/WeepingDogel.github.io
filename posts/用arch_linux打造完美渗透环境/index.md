# Building the Perfect Penetration Testing Environment with Arch Linux


<!--more-->
## Introduction to Arch Linux

Arch Linux is a general-purpose x86_64 GNU/Linux distribution that uses a rolling release model, striving to provide users with the latest stable software.

> Hehe, if you don't roll for a long time, you might break your system~

A freshly installed Arch is just a basic system with nothing. Users can then install the software they need according to their own ideas and preferences, and through highly customizable configuration, create their ideal system. This is what makes Arch lovely and attractive. That's also why Arch is one of my favorite distributions.

For more details about Arch Linux, please refer to the [Arch Wiki](https://wiki.archlinux.org/index.php/Arch_Linux).

## About This Article

This article will demonstrate how to build the perfect penetration testing environment with Arch Linux. All operations are for tutorial demonstration purposes. Please operate according to your actual situation. Users who haven't used Arch Linux before should **operate with caution** and carefully consult the [Arch Wiki](https://wiki.archlinux.org/index.php/Main_page).

So, let's begin!

### Note

This article will make extensive use of Arch Wiki hyperlinks for easier understanding of some content.

## Preparation

### Installing Arch Linux

This article will not detail the installation process of Arch Linux. Please refer to the [Arch Wiki](https://wiki.archlinux.org/index.php/Installation_guide) to install Arch Linux and complete basic configuration.

### Choosing a Lightweight Desktop Environment

Since some operations in penetration testing consume a lot of resources, please try to choose a lightweight desktop environment based on your needs. Using [GNOME](https://wiki.archlinux.org/index.php/GNOME) and [KDE](https://wiki.archlinux.org/index.php/KDE) is not recommended here, as both consume a lot of resources and are not friendly to low-spec users.

1. [LXDE](https://wiki.archlinux.org/index.php/LXDE)
   * Lightweight GTK desktop environment. Default window manager is [OpenBox](https://wiki.archlinux.org/index.php/Openbox). One of the lightest desktop environments.

2. [LXQT](https://wiki.archlinux.org/index.php/LXQt)
   * In 2013, PCMan started a project to port LXDE to Qt. So LXQT is essentially LXDE using Qt. Default window manager is still [OpenBox](https://wiki.archlinux.org/index.php/Openbox). It's even lighter than LXDE.

3. [xfce4](https://wiki.archlinux.org/index.php/Xfce)
   * The desktop environment I'm currently using. Based on GTK+2. It's the best-looking among lightweight desktop environments.

4. [i3wm](https://wiki.archlinux.org/index.php/I3)
   * i3 is a dynamic [tiling window manager](https://en.wikipedia.org/wiki/Tiling_window_manager) inspired by [wmii](https://wiki.archlinux.org/index.php/Wmii) for developers and advanced users. i3's stated goals include clearly readable documentation, comprehensive multi-monitor support, tree-based window management, and vim-like operation modes. — From [Arch Wiki](https://wiki.archlinux.org/index.php/I3)

5. DIY your own desktop environment
   * You can use [OpenBox](https://wiki.archlinux.org/index.php/Openbox), [fluxbox](https://wiki.archlinux.org/index.php/Fluxbox), [i3wm](https://wiki.archlinux.org/index.php/I3), etc., to DIY your own desktop environment through configuration.

This article will also use a custom desktop environment for demonstration.

> OpenBox + xfce4-panel

### Adding the BlackArch Repository

After basic Arch Linux configuration is complete, you can start using it normally. But to install penetration testing tools, you need to add a **BlackArch software repository**.

> #### What is BlackArch?
>
> BlackArch Linux is an Arch-based Linux distribution designed for system penetration testing and security research. BlackArch provides a self-starting DVD image containing multiple lightweight window managers and over a thousand specialized tools for penetration testing and computer forensic analysis.
>
> BlackArch official website: [blackarch.org](https://blackarch.org/)

As mentioned above, BlackArch is an independent distribution based on Arch Linux, but we don't need to install it — we just need to add its repository.

Here's how to do it:

```bash
$ sudo nano /etc/pacman.conf # Edit pacman.conf
```

Add the following content at the end of the `pacman.conf` file:

```conf
[blackarch]
SigLevel = Optional TrustAll
Server = https://mirrors.ustc.edu.cn/blackarch/$repo/os/$arch
```

Then run:

```bash
$ sudo pacman -Syyu
```

If everything is fine, the BlackArch repository is now available.

## Installing and Configuring Common Penetration Tools

### Port Scanning and Information Gathering

#### Nmap

First up is [Nmap](https://en.wikipedia.org/wiki/Nmap), a very commonly used scanning tool that can scan the target's IP, ports, operating system, etc. during penetration testing.

##### Installation

```bash
$ sudo pacman -S nmap
```

##### Basic Usage

```bash
$ nmap <target IP> # Simple scan
```

```bash
$ sudo nmap -O <target IP> # Scan target's operating system
```

```bash
$ sudo nmap -sP <target IP> # Ping scan
```

#### xerosploit

This scanning tool is cooler than **Nmap**, with nicer colors and very simple usage — even simpler than **Metasploit**.

##### Installation

```bash
$ sudo pacman -S xerosploit
```

##### Usage

```
$ sudo xerosploit
```

Then run `help` to see the built-in help documentation.

#### nslookup

This command is used to look up domain records, such as CNAME, A records, etc. It's included in the **dnsutils** package.

##### Installation

```bash
$ sudo pacman -S dnsutils
```

#### nbtscan

An internal network scanning tool that can check if there are active IPs within an IP range. It's faster than nmap but can only be used on local networks.

##### Installation

```bash
$ sudo pacman -S nbtscan
```

##### Usage

* Basic scan

```bash
$ sudo nbtscan -r 192.168.16.0/24
```

#### Burpsuite

A packet capture tool that requires Java dependencies.

##### Installation

```bash
$ sudo pacman -S burpsuite
```

##### Usage

Burpsuite has a graphical interface. You can find usage tutorials through search engines.

### Brute Forcing and Password Generation

#### Hydra

A brute force cracking tool — Chinese name "九头蛇" (nine-headed snake). Very powerful.

##### Installation

```bash
$ sudo pacman -S hydra
```

##### Usage

* Brute forcing SSH port

```bash
$ hydra -l <username> -P <password dictionary.txt> -v -e ns -t <threads> <target IP> ssh
```

#### Crunch

A powerful password dictionary generator.

##### Installation

```bash
$ sudo pacman -S crunch
```

##### Usage

**Special characters in Crunch:**

```
'%' insert numbers
'@' insert lowercase letters
',' insert uppercase letters
'^' insert symbols
```

**Generate all combinations of 1 to 8 characters from 26 lowercase letters:**

```bash
$ crunch 1 8 >> 1.txt
```

**Generate all combinations of 1 to 4 characters from the letters abcd:**

```bash
$ crunch 1 4 abcd >> 2.txt
```

**Generate all password combinations from elements "yale" and "test":**

```bash
$ crunch 4 5 -p yale test
```

### Vulnerability Exploitation

#### Metasploit

This is the most important tool. Without it, internal network penetration testing cannot be fully conducted.

##### Installation

```bash
$ sudo pacman -S metasploit
```

After installation, run:

```bash
$ sudo msfconsole
```

##### Fixing Database Issues

When starting msf, do you see three error lines? This is caused by not connecting to the database.

###### Install PostgreSQL

```bash
$ sudo pacman -S postgresql
```

###### Configure PostgreSQL

After installation, a new user called `postgres` will be created. We need to set a password for it.

```bash
$ sudo passwd postgres
```

Then initialize the database:

```bash
$ sudo su - postgres -c "initdb --locale en_US.UTF-8 -E UTF8 -D '/var/lib/postgres/data'"
```

After initialization, start the database:

```bash
$ sudo systemctl start postgresql
```

Next, switch to the postgres user:

```bash
$ sudo su postgres
```

Run `psql`:

```bash
$ psql
```

Create a new database user, for example `msf4`:

```bash
postgres=# CREATE USER msf4 WITH PASSWORD '123456';
```

Create the corresponding database:

```bash
postgres=# CREATE DATABASE msfdb OWNER msf4;
```

Grant all permissions to msf4:

```bash
postgres=# GRANT ALL PRIVILEGES ON DATABASE msfdb TO msf4;
```

Exit psql:

```bash
postgres=# \q
```

Create a Linux regular user with the same name as the database user, e.g., msf4:

```bash
$ sudo useradd msf4
```

###### Connecting to the Database via msf

Enter msf and connect to the database:

```bash
msf5> db_connect msf4:123456@127.0.0.1/msfdb
```

Then check if the connection was successful:

```bash
msf5 > db_status
[*] Connected to msf3. Connection type: postgresql. Connection name: DFz5oEX3.
```

After successful connection, don't forget to save and enable PostgreSQL auto-start:

```bash
msf5 > db_save
```

```bash
$ sudo systemctl enable postgresql
```

##### Usage

Refer to [this article](/posts/震惊16岁男子竟然在家里做出这种事/).

You can also find more tutorials through search engines.

#### sqlmap

A powerful web injection tool. Usage can be found through search engines.

##### Installation

```bash
$ sudo pacman -S sqlmap
```

### DNS Hijacking

#### Ettercap

A powerful DNS hijacking tool. It comes in command-line and graphical versions, but you can only install one, otherwise they'll conflict.

##### Installation

Command-line version:

```bash
$ sudo pacman -S ettercap
```

Graphical version:

```bash
$ sudo pacman -S ettercap-gtk
```

#### Apache

What's this doing here? Isn't this for building websites? Haha, actually it's used to assist Ettercap. When you hijack the target's DNS, it will forcibly resolve to your IP, and Apache can run a static webpage (HTML) on your machine.

##### Installation

```bash
$ sudo pacman -S apache
```

##### Usage

Start Apache:

```bash
$ sudo systemctl start httpd
```

The web root directory is `/srv/http/`.

## Summary

An ordinary Arch Linux system with the BlackArch repository imported can be considered a perfect penetration testing environment. The above are just common tools. The BlackArch repository contains thousands of tools — whatever you need, you can download and install via `pacman`.

Finally, thank you for visiting.
