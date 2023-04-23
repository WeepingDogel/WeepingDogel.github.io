# BlackArch Experience Report


> *Today, I attempted to install BlackArch and spent quite a long time doing so. However, I later discovered that this system was not very perfect.*

## Advantages

Firstly, let's talk about its advantages:

* This thing integrates thousands of software packages, all of which are powerful tools.
* Secondly, this thing is cool, especially the wallpaper and color matching, which I think are particularly stunning.
* Its ease of installation is also a plus. Initially, I thought it would be more difficult to install than Arch, but after using it, I found that its installation process is ten times simpler than Arch. It's just that I'm used to the manual style of Arch and not accustomed to this semi-automated approach.

## Disadvantages

Now, let's talk about the disadvantages:

* First of all, the ISO is really too big. The official live ISO for BlackArch is 12GB, which took me a long time to download using IDM. The network installation package is the same size as Arch, but I haven't tried it.
* What's more alarming is that the minimum hard disk requirement for installing blackarch's official mirrors is over 40GB, which makes it difficult for most people to meet this installation condition.
* Secondly, its desktop environment is too basic and its performance is particularly poor, especially for i3 and spectrwm, which are impossible to operate. Fluxbox is the coolest, but its habits are not suitable for most people. Openbox has nothing, and it's even harder to operate. It also doesn't support Chinese, which is very annoying. Also, the dependencies are too messy, making it difficult to switch to other desktop environments. For example, when I wanted to uninstall others and switch to xfce, I couldn't uninstall them with "pacman -Rs". I had to use "Rsc" to uninstall them, but as a result, I uninstalled "lxdm", which prevented me from entering graphics mode. Later, when I installed "lxdm", there was a major color bug.

## Conclusion

Firstly, it cannot be denied that BlackArch is a good thing for showing off, but I do not recommend using the official mirror (whether it is an online mirror or an offline live one) for installation, otherwise, you will end up like me. Secondly, users must have a foundation in the Arch series; otherwise, it will be a pitfall. It is recommended to install Arch first and then import BlackArch's software library to install the full set of tools. Finally, please do not compare BlackArch with Kali or Parrot. They are not comparable in terms of tools.
