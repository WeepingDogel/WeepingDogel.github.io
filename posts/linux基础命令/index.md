# Linux Basic Commands


***Tip: For beginners, please don't be harsh.***

<!--more-->
Getting started with Linux can be troublesome if you don't know how to use commands. You won't be able to navigate the system efficiently. But once you learn some basic commands, you'll be able to operate without stress. Want to learn Linux? Let's start with simple file operations.

## How to Use the Command Line

If your distribution has a GUI, you can find a **"Terminal"** in the menu. Open it and start typing commands. If your distribution doesn't have a GUI, you can directly use commands after logging in through tty.

Note: This terminal is NOT **DOS** or **cmd**. It has nothing to do with Windows — it's a different thing.

## cd Command

If you've used DOS or Windows cmd before, you'll know this command — it's available in most operating systems.

`cd` stands for "change directory". You can add a relative path or an absolute path after it.

Simply put, it's used to enter a folder.

### Usage

Test directory: `/a/b/c`

#### Entering a Directory:

Absolute path: Specifies a complete path, independent of your current directory:
```bash
[weepingdogel@localhost ~]$ cd /a/b/c
[weepingdogel@localhost c]$
```

Relative path: Specifies a subdirectory or other directory relative to your current location:
```bash
[weepingdogel@localhost b]$ cd ./c
[weepingdogel@localhost c]$
```

Going up one level:
```bash
[weepingdogel@localhost b]$ cd ../xxx
[weepingdogel@localhost xxx]$
```

#### Exiting a Directory:

Go back one level:
```bash
[weepingdogel@localhost c]$ cd ..
[weepingdogel@localhost b]$
```

Go back two levels:
```bash
[weepingdogel@localhost c]$ cd ../..
[weepingdogel@localhost a]$
```

## pwd Command

This command helps with `cd`. It shows your current absolute path.

### Usage
```bash
[weepingdogel@localhost ~]$ pwd
/home/weepingdogel
```

## ls Command

This is like Windows' **dir** command. It lists all files and directories in the current directory.

### Usage

Test directory `/tmp/a/b/c`

Basic listing:
```bash
[weepingdogel@localhost c]$ ls
223333  text.txt  test  wiaori
```

Detailed listing with `-l`:
```bash
[weepingdogel@localhost c]$ ls -l
```
Human-readable listing with `-lh`:
```bash
[weepingdogel@localhost c]$ ls -lh
```

## File Copying and Moving

### mv Command

`mv` stands for **move**. It moves files to a specified location.

#### Usage

Absolute path: Move `text.txt` from `/tmp/a/b/c/` to `/tmp/a/`:
```bash
[weepingdogel@localhost c]$ mv /tmp/a/b/c/text.txt /tmp/a/
```

Relative path: Move it back:
```bash
[weepingdogel@localhost a]$ mv ./text.txt ./b/c/
```

### cp Command

`cp` stands for **copy**. It copies files to another location.

#### Usage

Absolute path: Copy `/tmp/a/b/c/text.txt` to `/tmp/a/`:
```bash
[weepingdogel@localhost c]$ cp /tmp/a/b/c/text.txt /tmp/a/
```

Relative path: Copy to various directories:
```bash
[weepingdogel@localhost a]$ cp ./text.txt ./b/
```

> Note: To copy directories, add the `-r` parameter.

## mkdir Command

`mkdir` stands for **make directory**. It creates a new directory.

### Usage

Create a single directory:
```bash
[weepingdogel@localhost c]$ mkdir ./d
```

Recursively create a chain of directories:
```bash
[weepingdogel@localhost c]$ mkdir -p ./go/for/it
```

## rm Command

> Warning: This command is very dangerous if misused.

`rm` stands for **remove**. It deletes files or directories.

### Usage

Delete a file:
```bash
[weepingdogel@localhost c]$ rm ./text.txt
```

Delete a directory (with `-r`):
```bash
[weepingdogel@localhost c]$ rm -r ./go
```

Force delete (with `-rf` and sudo):
```bash
[weepingdogel@localhost c]$ sudo rm -rf ./223333
```

> Never use `rm -rf /` — it will destroy your entire system!

## Package Manager

> Note: May vary between distributions.

For Debian-based distributions, the package manager is **apt**:

```bash
$ sudo apt update                     # Update package sources
$ sudo apt install <package>          # Install a package
$ sudo apt search <package>           # Search for a package
$ sudo apt upgrade                    # Upgrade installed packages
$ sudo apt remove <package>           # Uninstall a package
$ sudo apt autoremove                 # Auto-clean dependencies
```

To install a local package using dpkg:
```bash
$ sudo dpkg -i <package.deb>
```

## Conclusion

This blog post isn't very detailed. I've tried my best to make it understandable for most people. There might still be a few who don't fully understand the content — that's okay, you can ask questions in the comments below.

Feel free to leave comments!
