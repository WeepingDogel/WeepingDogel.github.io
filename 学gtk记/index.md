# 学 GTK 记


## 序

心血来潮想玩玩 GTK, 于是.. 

我就尝试了一下， 用 `C` 试着捏了一个。

总的来说其实不是很难， 也是套用函数就好... 

但是，很长.. 真的很长..

## gtk.h

要写 gtk 程序， 首先得导入这个库， 不过它得在安装 gtk 之后才行。

并且编译的时候还要加一些参数..

### 安装 gtk
现在已经 gtk 已经更新到 4 了， 不过我这里用的是 3..

这边 Arch 的话， 直接装上就好。
```txt
$ sudo pacman -S gtk3
```
### 头文件
然后在程序的开头写上这个就可以开始编程了。

```c
#include <gtk/gtk.h>
```

## 构建一个空白窗口

C 可能稍微比较复杂， 在它能够加载出窗口之前， 我们需要在主函数里定义两个参数...

我也不太懂， 就当作标准格式了。

一个是 **整型(`int`)** 的， 命名为 `argc`:

```c
int main(int argc, )
```

另一个是 **`char` 类型的**, 命名为 `argv`, 但是这个有所不同， 我们得这么写 "`char *argv`" :

```c
int main(int argc, char *argv[])
```

接下来写上大括号，我们就可以开始写了

```c
#include <gtk/gtk.h>
int main(int argc, char *argv[])
{

}
```

首先我们要进行的是让 gtk 初始化
```c
gtk_init(&argc, &argv);
```

写入这两个参数， 记得前面变量要加 `&`, 这个似乎是指针吧.. 还是什么..

呜呜呜， C 学得不怎么好...

好啦我们继续.. 就这样写在**主函数(main)**里面

```c
#include <gtk/gtk.h>
int main(int argc, char *argv[])
{
    gtk_init(&argc, &argv);
}
```

**"`;`"** 这个一定不能丢！！ 别问为什么！

~~如果你不写 **"`;`"** 能把 C 语言程序跑起来, 我就一口气喝1L的肥宅快乐水~~

然后我们需要创建一个窗口

```c
GtkWidget *window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
```

`*window` 为控件名称， 后面是 `gtk.h` 里面的函数， 没错， 就是像这样的调用，但是很长。

你也可以把 `*window` 写成别的， 只要你接下来输对了就可以..

那么接下来我们的代码变成了这样

```c
#include <gtk/gtk.h>
int main(int argc, char *argv[])
{
    gtk_init(&argc, &argv);
    GtkWidget *window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
}
```

然后我们要让窗口显示出来， 需要写入这行

```c
gtk_widget_show_all(window);
```

以及这行， 让 gtk 完全启动

```c
gtk_main();
```

最后我们加上 `return 0;`

完整代码变成了这样:
```c
#include <gtk/gtk.h>

int main(int argc, char *argv[])
{
    gtk_init(&argc, &argv);
    GtkWidget *window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
    gtk_widget_show_all(window);
    gtk_main();
    return 0;
}
```

然后我们得编译了， 上面提到过编译要写一长串

首先要 `cd` 到代码文件所在的位置， 然后敲这些
```txt
$ gcc -o test $(pkg-config --cflags --libs gtk+-3.0) 文件名.c
```

`文件名.c` 改为你的代码文件名， test 也可以改为你需要命名的名称

如果没有任何报错，那么大概是编译成功了

接下来在终端敲
```txt
$ ./test
```

一个 gtk 窗口程序就此诞生了! 不过它需要使用 `CTRL + C` 来结束， 因为此时只是一个外观的渲染， 窗口按钮是无效的。

![](/img/2021-04-09_23-49.png)

接下来你可以添加更多的细节，一切可以参考 gtk 官方文档..

以及我这里也写了个实例可以参考。

~~也是瞎捏的~~

* [GitHub - Aozaki-Club/about-doggy](https://github.com/Aozaki-Club/about-doggy)

## 总结

总体上来讲它似乎并不是特别的难..

就是太长了..

上文写的可能看不出来它有多长， 但是真正控件多了的时候就...

不过我还是会试着继续学的。

---

## 参考链接

* [The GTK Project - A free and open-source cross-platform widget toolkit](https://www.gtk.org/)
* [C语言也能做界面：踏上GTK+学习之旅_秋叶原 && Mike || 麦克-CSDN博客_c语言gtk](https://blog.csdn.net/tennysonsky/article/details/42740865)
* [GTK+ 3 Reference Manual: GTK+ 3 Reference Manual](https://developer.gnome.org/gtk3/stable/)
* [GtkWindow: GTK+ 3 Reference Manual](https://developer.gnome.org/gtk3/stable/GtkWindow.html)


