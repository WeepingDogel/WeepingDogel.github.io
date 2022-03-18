# Python 学习笔记——ArgParse


# 序

为了使 [TitleGetter](https://github.com/WeepingDogel/TitleGetter) 更加灵活，我打算将 `list.txt` 和输出文件由用户自定， 因此这需要用到命令行选项... 就像一些我们常用到的软件一样，比如 `pacman`

![](/img/2021-05-16-18-31-48屏幕截图.png)

因此谷歌了一下，了解到了 [ArgParse](https://docs.python.org/3/library/argparse.html) 这个东西

> The argparse module makes it easy to write user-friendly command-line interfaces. The program defines what arguments it requires, and argparse will figure out how to parse those out of sys.argv. The argparse module also automatically generates help and usage messages and issues errors when users give the program invalid arguments.
>
> From: [argparse â Parser for command-line options, arguments and sub-commands — Python 3.9.5 documentation](https://docs.python.org/3/library/argparse.html)

然后我就试着敲了一个文件..

运行出来的结果是这样的

![](/img/2021-05-16-18-43-35屏幕截图.png)

那么接下来稍微整理一下相关的笔记吧.....

# 创建 Parser && 添加选项

在一切开始之前，我们需要使用 `argparse` 库里面的 `ArgumentParser` 用法来创建一个变量，命名为 'parser'

```python
import argparse
parser = argparse.ArgumentParser(description='')
```

这里有个参数 `description=''`， 这里是写一些说明用的... 

比如我们写上

```python
import argparse
parser = argparse.ArgumentParser(description='Welcome')
```

顺便我们需要写上一些需要的选项～

`parser.add_argument()` 使用这个就可以了

里面需要加上一些东西, 比如 `-a`、 `--about` 这些选项的使用形式

最后加上 `args = parser.parse_args()`

```python
import argparse
parser = argparse.ArgumentParser(description='Welcome')
parser.add_argument('-a','--about', help='Show the about')
args = parser.parse_args()
```

这时我们已经可以加上 `-h` 来看看效果了
```sh
$ python a.py -h
```
```txt
usage: a.py [-h] [-a ABOUT]

Welcome

optional arguments:
  -h, --help            show this help message and exit
  -a ABOUT, --about ABOUT
                        Show the about
```

那么这里整理一下常用的这么几个参数

1. `default`
    * 没有设置任何参数情况下的默认参数
    ```python
    parser.add_argument('-a','--about', help='Show the about', defualt='text.txt')
    ```
    * 如果用户没有设置这个参数则会自动提供一个默认的
2. `help`
    * 给对应的选项添加说明文字
3. required 
    * 用于决定这个参数是否一定需要设置
    * 如果设置了 `required=True`, 在运行时如果不设置这个参数就会报错
    ```python
    parser.add_argument('-a','--about', required=True)
    ```
    ```txt
    $ python a.py   
    usage: a.py [-h] -a ABOUT
    a.py: error: the following arguments are required: -a/--about
    ```

# 调用获取到的选项参数

接下来我们要做的是，将获取到的参数运用起来。

我们知道，当在命令行中给选项后面写上了一些东西，那么程序会默认地作为字符串而获取它，这时我们就要拿这获得的东西做我们想要做的事

我简单地写了个能够将一个文件的内容写到另一个文件的脚本

```python
import argparse
print('''                                                            
By WeepingDogel
''')
def GetParser():
    parser = argparse.ArgumentParser(description='Help', epilog='A new testing program.')
    parser.add_argument('-o','--output', help='Output file',default='test.txt' , required=True)
    parser.add_argument('-r','--read',help='read a file', required=True)
    return parser
def Write(content, filename):
    f = open(filename,"a")
    f.write(content)
    f.close()
    print(filename + ' has been written')
def Read(filename):
    f = open(filename)
    text = f.read()
    return text
def Main():
    parser = GetParser()
    args = parser.parse_args()
    Write(Read(args.read),args.output)
Main()
```
好的不难看出，我们得到的东西会到这个 `args` 变量里面去，**因为它是由 `parser.parse_args()` 这个函数所返回的内容所赋值而来的，而取出对应选项参数得到的内容则是 `args.选项名`**

比如我们要获取写出的文件名
```sh
$ vim b.py
```
```python
import argparse
parser = argparse.ArgumentParser(description='Help', epilog='A new testing program.')
parser.add_argument('-o','--output', help='Output file',default='test.txt' , required=True)
args = parser.parse_args()
filename = args.output
print("The filename is "+ filename)
```
```txt
$ python b.py -o WeepingDogel
The filename is WeepingDogel
```

可见我们已经获取到这个字符串 "WeepingDogel" 了。

同理，需要读取的文件名也是一样的
```python
args.read
```
这么写就可以了～

接下来用截图来看看上面那一堆代码的效果：
![](/img/2021-05-16-20-05-47屏幕截图.png)

简单的创建与使用就是如此...

当然还有更多的用法需要探索..

# 结语

那么我接下来要做的就是将这些更新进 [TitleGetter](https://github.com/WeepingDogel/TitleGetter) 啦！

以后就不需要在配置文件里设置 `list.txt` 的位置了！ 输出的文件位置也不需要固定了！！

---

# 参考链接

* [argparse简要用法总结 | Yunfeng's Simple Blog](https://vra.github.io/2017/12/02/argparse-usage/)
* [argparse â Parser for command-line options, arguments and sub-commands — Python 3.9.5 documentation](https://docs.python.org/3/library/argparse.html)

