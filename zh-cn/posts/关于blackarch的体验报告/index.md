# 关于BlackArch的体验报告


> *今天我尝试装了一下black Arch，花了很长时间，之后发现这个系统并不是很完美。*

<!--more-->
## 优点

首先说说它的优点:

* 这玩意集成了几千个软件包，并且都是一些很厉害的工具
* 其次这玩意很酷，特别是壁纸，配色什么的，我都觉得特别炫酷
* 以及它安装的便捷性，我一开始以为它比Arch难安装，其实用完才知道这个安装简直比Arch简单十倍，只不过我习惯了Arch那种手动式，这种半自动化却不习惯了

## 缺点

现在来说说缺点:

* 首先ISO实在是太大了，Black Arch官方的live ISO达到了12GB，我idm都下载了很久，而网络安装包和Arch的大小一样，不过我没试过
* 更可怕的是 blackarch官方镜像的安装最低硬盘需求达到了40GB以上，这使得大部分人缺乏这个安装条件
* 其次就是它的桌面环境实在太简陋了，而且性能上也特别不好，特别是i3和spectrwm这两个，根本无法操作，fluxbox最炫酷但是习惯太不适合大部分人了，openbox啥都没有，更不好操作，而且不支持中文，弄得我很蛋疼；还有就是依赖太乱了，换别的桌面环境很麻烦，比如我想卸载掉其他的换xfce，结果pacman -Rs卸载不了，得用Rsc才能卸载，结果把lxdm给卸掉了，进不去图形了，后来装上lxdm出现了很大的颜色bug。。。

## 总结

首先不能否认BlackArch是装逼的好东西，但是我不推荐使用官方的镜像（无论是在线镜像还是离线live）去安装，否则就会有我的下场了，其次就是用户必须有Arch系基础，否则就是个坑。建议先安装Arch，然后导入BlackArch的软件库安装全套工具即可。最后请不要那blackarch与kali、parrot对比，这没有对比性的，工具都差不多的。
