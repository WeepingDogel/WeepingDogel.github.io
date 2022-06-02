# Python 学习笔记——文件操作


## 文件操作


### open

`open()` 是 Python 进行文件操作的关键函数，它有连个参数需要设置

* 文件名 - 文件的名称，不多解释
* 模式 - 决定打开的文件是否可读写以及其他属性

```python
open('filename','mode')
```
### 读
仅以只读方式打开一个文件
```python
f = open("filename.txt")
```
这样写也是一样的
```python
f = open("filename","rt")
```
**"r"** 表示读

**"t"** 表示文本，这是函数默认设定好的，所以可以省略。

这里引入一下 [w3school](https://www.w3schools.com/python/python_file_handling.asp) 的一个列表

>There are four different methods (modes) for opening a file:
>
>>"r" - Read - Default value. Opens a file for reading, error if the file does not exist
>
>>"a" - Append - Opens a file for appending, creates the file if it does not exist
>
>>"w" - Write - Opens a file for writing, creates the file if it does not exist
>
>>"x" - Create - Creates the specified file, returns an error if the file exists
>
> In addition you can specify if the file should be handled as binary or text mode
>
>>"t" - Text - Default value. Text mode
>
>>"b" - Binary - Binary mode (e.g. images)

以一个文件举例
```txt
/home/weepingdogel/test.txt
---
Hello!I love Python.
```
我们不写 mode 参数：
```python
f = open('test.txt')
print(f.read())
```
执行后：
```txt
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.
```
我们将它加上：
```python
f = open('test.txt', 'rt')
print(f.read())
```
执行后：
```txt
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.
```

结果是一模一样的。

#### 读行
文件:
```txt
/home/weepingdogel/test.txt
---
Hello!I love Python.
Have a nice day!
Good luck!
```
当我们遇到一个多行文件的时候，我们可以选择只读取它其中一行
`f.readline()`

例如:
```py
f = open('test.txt')
print(f.readline())
```
执行后：
```txt
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.

```

我们需要两行的时候：
```py
f = open('test.txt')
print(f.readline())
print(f.readline())
```
执行后：
```txt
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.

Have a nice day!

```
如果我们需要三行：

```py
f = open('test.txt')
print(f.readline())
print(f.readline())
print(f.readline())
```
执行后：
```txt
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.

Have a nice day!

Good luck!

```

这个用法它会逐行读取，并且打印输出的时候是会换行的

在读配置文件的时候也许会用到吧...

当然我们也可以用 `for` 循环读一次性读全部：
```py
f = open('test.txt')
for x in f:
    print(x)
```
执行后：
```txt
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.

Have a nice day!

Good luck!

```

我觉得用 `for` 应该更有效率点...


### 关闭文件
这个没什么好讲的...

```py
f = open('test.txt')
print(f.read())
f.close()
```

执行了也是跟上面差不多的效果

> 下面不给出调试结果了，太晚了。
### 创建
**"x"** 表示创建一个新文件，如果文件名指的那个文件已经存在就会报错
```py
f = open("test.txt","x")
```

自己去试试啦，这个没什么好说的。

### 写
**"a"** 表示在已有文件上添加内容，它不会使文件原有的内容被删除或者被覆盖

例如：
```py
f = open("test.txt","a")
f.write("加入内容 / content added.") # 这段字符串将会被添加到这个文件里
```
**"w"** 表示将会覆盖那个文件，它将会覆盖原有的内容

例如：
```py
f = open("test.txt", "w")
f.write("加入内容 / content added.") # 文件将只会存在这段字符串
```

### 删

这里需要用到 `os` 这个模块，并用到里面的 `os.remove()` 函数，直接 `import os` 即可

```py
import os
os.remove("test.txt")
```

#### 典型例子
检测一个文件是否存在，如果存在就删除，不存在就提示
```py
import os
if os.path.exists("test.txt"):
    os.remove("test.txt")
else:
    print("文件不存在")
```
#### 删除目录

用 `os.rmdir()` 即可

```py
import os
os.rmdir("foldername")
```

## 总结

这些就是基础的文件读写操作需要知道的东西啦...

如果看完没什么概念的话，可以试试下面这一大串代码

可以改改里面 `open()` 的 mode 参数试试

总结代码：
```python
import os
import datetime
def sign():
    # 程序标识
    print(
'''
╭╮╭╮╭╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━━━╮╱╱╱╱╱╱╱╱╭╮
┃┃┃┃┃┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰╮╭╮┃╱╱╱╱╱╱╱╱┃┃
┃┃┃┃┃┣━━┳━━┳━━┳┳━╮╭━━╮┃┃┃┣━━┳━━┳━━┫┃
┃╰╯╰╯┃┃━┫┃━┫╭╮┣┫╭╮┫╭╮┃┃┃┃┃╭╮┃╭╮┃┃━┫┃
╰╮╭╮╭┫┃━┫┃━┫╰╯┃┃┃┃┃╰╯┣╯╰╯┃╰╯┃╰╯┃┃━┫╰╮
╱╰╯╰╯╰━━┻━━┫╭━┻┻╯╰┻━╮┣━━━┻━━┻━╮┣━━┻━╯
╱╱╱╱╱╱╱╱╱╱╱┃┃╱╱╱╱╱╭━╯┃╱╱╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╱╱╱╱╰╯╱╱╱╱╱╰━━╯╱╱╱╱╱╱╰━━╯
'''
    )
def filecrt(filename):
    # 文件创建
    if os.path.exists(filename): #检查文件是否存在
        print(str(datetime.datetime.now())+ ": 文件已存在")
        return 0
    else:
        f = open(filename,'x')
        f.close()
        print(str(datetime.datetime.now()) + ": 已创建文件: " + filename)
        return 1
def filewrt(filename):
    fruits = ['apple', 'banana', 'strawbarry','orange'] # 给出要写的内容
    # 文件写入操作
    f = open(filename, 'w')
    for fruit in fruits:
        f.write(fruit + '\n')
        print(str(datetime.datetime.now()) + ": 已写入" + fruit)
    f.close()
def filedel(filename):
    # 删除文件操作
    if os.path.exists(filename):
        os.remove(filename)
        print(str(datetime.datetime.now()) + ": 已删除" + filename)
    else:
        print(str(datetime.datetime.now()) + filename + "不存在")
def fileread(filename):
    print(str(datetime.datetime.now()) + ": 读取中.." )
    f = open(filename,'r')
    print("-" * 5 + "文件内容" + "-" * 5 + "\n")
    print(f.read())
    print("-" * 5 + "文件内容" + "-" * 5 + "\n")
sign()
if filecrt("test.txt") == 0:
    fileread("test.txt")
    filedel("test.txt")
else:
    filewrt("test.txt")
    fileread("test.txt")
    filedel("test.txt")
```
