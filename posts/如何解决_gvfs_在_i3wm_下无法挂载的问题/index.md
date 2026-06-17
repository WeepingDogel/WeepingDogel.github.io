# How to Fix gvfs Not Mounting Under i3wm


<!--more-->
## Preface
Uh... there's really nothing much to say before this—a problem came up...

So I asked in the group, got it fixed, and now I'm writing down how it was done...

I switched to i3wm, and when I tried to mount another partition using a file manager, this error popped up:

![](/img/image_2021-01-09_16-24-45.png)

This issue is usually caused by a missing package.

Well, basically I just forgot to install something.

What we need is `polkit`...

If you don't know what it is, check out this page on the Arch Wiki:

* [Polkit - ArchWiki](https://wiki.archlinux.org/index.php/Polkit)

## The Solution Process

First, install `polkit`:

```txt
$ sudo pacman -S polkit
```

After installation, we also need to install its graphical frontend.

As shown, there are many to choose from:

![](/img/2021-01-16_23-40.png)

I'll go with Gnome's — it's what I'm used to...

You can install it with `pacman`:

```txt
$ sudo pacman -S polkit-gnome 
```

If you want to use another one, just replace `polkit-gnome` with the other package name.

But installing it isn't enough — you also need to set it to start automatically. Why? Here's the reason:

> If you are using a graphical environment, make sure that a graphical authentication agent is installed and [autostarted](https://wiki.archlinux.org/index.php/Autostarting) on login.
>
> — [Arch Wiki](https://wiki.archlinux.org/index.php/Polkit#Authentication_agents)

In short, if you want to use it, you need to keep this program running...

That's about it. If you want the full meaning, go ask Google Translate.

Next, I need to figure out how to start it...

Actually, you can just run the path listed on the wiki directly in the terminal:

```txt
$ /usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &
```

But you'd have to type that every time, and I think that's a hassle — rua～

So we need to set it to start on boot. Generally, you can do it like this:

![](/img/photo_2021-01-16_23-59-36.jpg)

Well... for i3wm, you'll need to refer to this documentation:

* [i3: i3 User's Guide](https://i3wm.org/docs/userguide.html#_automatically_starting_applications_on_i3_startup)

So I directly edited the `~/.config/i3/config` file:

```txt
$ vim ~/.config/i3/config
```

Then added this:

```sh
# Start polkit-gnome on login

exec --no-startup-id /usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1
```

![](/img/photo_2021-01-17_00-02-51.jpg)

Then I rebooted.

It worked.

![](/img/2021-01-16_23-52.png)

Then I tried entering the password and hitting enter... and got another error...

![](/img/photo_2021-01-16_23-53-31.jpg)

From the English, you can tell it's actually another problem...

It blabbered on and on, but it's just that I forgot to install the `ntfs-3g` package again...

```txt
$ sudo pacman -S ntfs-3g
```

And then it was fixed...

But the screenshots were taken tonight...

![](/img/2021-01-17_00-00.png)

## Conclusion

And then I can happily use `i3wm` again～
