# 如何使用 GitHub 搭建网站


<!--more-->
## 不正经的前言
>
> 我又回来啦～
>
> 嘿嘿，我绝对不会告诉你我又回来水啦～
>
> 啊啊别打我～疼
>
## Github是啥
> 
> 某个萌新:大佬大佬，Github是啥？
>
> 大佬:不知道，滚。
>
>萌新:呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜大佬不帮我了呜呜呜呜呜呜呜
>

咳咳，，，，

[Github](https://github.com/)是一个基于git的源代码托管平台，由Chris Wanstrath, PJ Hyett 与Tom Preston-Werner三位开发者在2008年4月创办。迄今拥有59名全职员工，主要提供基于git的版本托管服务。

也常常被人戏称为**Gayhub**。2333
>
> 今天，GitHub已是：
>
> * 一个拥有143万开发者的社区。其中不乏Linux发明者[Torvalds](https://github.com/torvalds)这样的顶级黑客，以及Rails创始人[DHH](https://github.com/dhh)这样的年轻极客。
> * 这个星球上最流行的开源托管服务。目前已托管431万git项目，不仅越来越多知名开源项目迁入GitHub，比如Ruby on Rails、jQuery、Ruby、Erlang/OTP；近三年流行的开源库往往在GitHub首发，例如：[BootStrap](https://github.com/twitter/bootstrap)、[Node.js](https://github.com/joyent/node)、[CoffeScript](https://github.com/jashkenas/coffee-script)等。
> * alexa全球排名414的网站。

也就是说，你想把你写好的开源程序发布出去，Github将是最佳选择。

## 本期的主要内容

本期内容将会写出如何使用Github搭建一个简单的网站

### 使用Github建站的好处
> 
> * 安全
>   * 由于你的网页源代码是由Github托管，所以Github有多安全，你的网站就有多安全，别人想黑你就得先黑掉Github
> * 简单
>   * 大部分操作只需要有前端基础就可以轻松完成
> * 无忧
>   * 后端用Github的服务器，无需一天24小时维护，可以做到无人值守
>

### 使用Github建站的缺点

> * 限制
>   * Github仓库只能运行基于HTML这类的静态网页，不能使用数据库等花里胡哨的东西。
> * ~~禁止爬虫~~
>   * ~~Github的仓库是禁止搜索引擎进行爬取内容的，所以你搭建的网站不会在搜索引擎上被找到。~~ (事实证明其实可以)
>

---

以上就是使用Github建站的优缺点，在搭建之前必须按实际情况以及需求来考虑。

## 详细教程
### 准备
#### 注册帐号

首先你需要去[Github](https://github.com/)注册一个帐号，只需要使用邮箱就可以注册，具体方法就不多说了，绝大多数人都会。
> 
> 萌新:大佬，我看不懂英文啊。。
>
> 大佬:emmmm [谷歌翻译](https://translate.google.cn/)，请
> 
#### 创建仓库

当你登录帐号以后，你可以看到左上角一个绿绿的`new`，点击它

![](/img/截图_2019-10-13_21-08-00.png)

然后，就会弹出一个要你填的东西

![](/img/截图_2019-10-13_21-11-12.png)

如图所示，`Respository name`就是仓库的名称，

**注意:Github只允许使用与用户名相同的仓库名搭建网页**

这里有个特殊格式:

> 你的GitHub用户名.github.io


这个仓库名以后就是你的网址了

创建完以后就是个空的仓库

![](/img/截图_2019-10-13_21-18-16.png)

这个时候你就可以按照它的提示上传你的网页代码了。

### 上传代码

这里我会贴出一部分 `git` 的用法

首先创建一个目录:

```bash
$ mkdir ./你的Github用户名
```

这个目录的名称其实可以随便写，但是为了方便管理，还是写成你的Github用户名比较好。

接下来进入这个目录:

```bash
$ cd ./你的Github用户名
```

执行:

```bash
$ git init
```
这个命令会使你这个目录被初始化为git目录，如果不理解的话去[学一下git](https://www.runoob.com/git/git-tutorial.html)吧。。。。

接下来你就可以开始创建、编写你的网页代码了，比如我写个简单的HTML

先创建一个` index.html `文件

```bash
$ vim ./index.html
```

这里使用了`vim`，它会使你的终端自动进入编辑页面。

接下来按 `i` 键进入编辑模式

在里面写入以下代码
```html
<!DOCTYPE html>
<html>
    <head>
        <title>HelloWorld</title>
    </head>
    <body>
        <h1>HelloWorld</h1>
        <p>HelloWorld,this is my first website.</p>
    </body>
</html>
```
你可以使用HTML语言随意编写你的网站，可以添加多个html页面文件和CSS，甚至JavaScript。

编写完你的代码后，按 `ESC` 键回到命令模式，接下来按 : 键，你的vim左下角就会出现一个冒号，接下来
```
:wq
```

接下来…执行

```bash
$ git add index.html
```

然后你的创建的网页代码文件将会被提交

如果你的文件比较多的话，可以试试

```bash
$ git add *
```

这样你就可以快速的提交你所有的文件了

然后依次执行以下命令进行提交
```bash
$ git commit -m "first commit"
```

```bash
$ git remote add origin https://github.com/你的Github用户名/你的Github用户名.github.io.git
```

```bash
$ git push -u origin master
```

接下来输入你的Github帐号和密码就可以提交了。

然后你就可以在浏览器里访问你的网站了。

地址就是上面所述的: `你的Github用户名.github.io`

效果图:
![](/img/截图_2019-10-13_22-34-30.png)

## 结语

以上就是使用github搭建简单网页的全过程了，由于时间关系所以只能写这么多了，下期可能又会拖一段时间。

## 参考链接

* [git教程](https://www.runoob.com/git/git-tutorial.html)

*  [Archwiki|vim](https://wiki.archlinux.org/index.php/Vim_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

* [Archwiki|git](https://wiki.archlinux.org/index.php/Git_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

* [html教程](https://www.runoob.com/html/html-tutorial.html)
