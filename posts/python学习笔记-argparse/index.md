# Python Learning Notes - ArgParse


# Introduction

In order to make [TitleGetter](https://github.com/WeepingDogel/TitleGetter)  more flexible, I plan to let users customize `list.txt` and the output file. Therefore, this requires the use of command line options... just like some software we commonly use, such as `pacman`.

![](/img/2021-05-16-18-31-48屏幕截图.png)

So I googled it and learned about [ArgParse](https://docs.python.org/3/library/argparse.html).

> The argparse module makes it easy to write user-friendly command-line interfaces. The program defines what arguments it requires, and argparse will figure out how to parse those out of sys.argv. The argparse module also automatically generates help and usage messages and issues errors when users give the program invalid arguments.
>
> From: [argparse â Parser for command-line options, arguments and sub-commands — Python 3.9.5 documentation](https://docs.python.org/3/library/argparse.html)

Then I tried typing a file...

The result of running it looks like this:

![](/img/2021-05-16-18-43-35屏幕截图.png)

So let's organize some related notes...

# Creating Parser && Adding Options

Before everything starts, we need to use the `ArgumentParser` usage in the `argparse` library to create a variable named `parser`.

```python
import argparse
parser = argparse.ArgumentParser(description='')
```

There is a parameter `description=''` here, which is used for writing some explanations...

For example, we wrote:

```python
import argparse
parser = argparse.ArgumentParser(description='Welcome')
```

By the way, we need to write down some necessary options~

`parser.add_argument()` can be used here.

We need to add some things inside, such as the usage format of options like `-a` and `--about`.

Finally, add `args = parser.parse_args()`.

```python
import argparse
parser = argparse.ArgumentParser(description='Welcome')
parser.add_argument('-a','--about', help='Show the about')
args = parser.parse_args()
```

At this point, we can add `-h` to see the effect.
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

Then let's organize a few commonly used parameters.

1. `default`
    * 
    The default value when no parameters are set.
    ```python
    parser.add_argument('-a','--about', help='Show the about', defualt='text.txt')
    ```
    * If the user does not set this parameter, a default one will be provided automatically.
2. `help`
    * Add explanatory text to the corresponding option.
3. required 
    * Used to determine whether this parameter must be set.
    * If `required=True` is set, an error will be reported if this parameter is not set at runtime.
    ```python
    parser.add_argument('-a','--about', required=True)
    ```
    ```txt
    $ python a.py   
    usage: a.py [-h] -a ABOUT
    a.py: error: the following arguments are required: -a/--about
    ```

# Calling the Obtained Option Parameters

Next, we need to use the obtained parameters.

We know that when something is written after an option on the command line, the program will get it as a string by default. Then we have to use this to do what we want.

I wrote a simple script that can write the contents of one file to another file.

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
It is easy to see that what we obtain will go into the variable `args`, because **it is assigned from the content returned by the function `parser.parse_args()`. To get the corresponding value of an option parameter, you can access it using `args.option_name`.**

For example, if we want to get the written file name:
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

As you can see, we have obtained the string "WeepingDogel".

Similarly, the file name to be read is the same:
```python
args.read
```
That's all you need to do ～

Next, let's take a screenshot of the effect of the above code:
![](/img/2021-05-16-20-05-47屏幕截图.png)

Creating and using it is that simple...

Of course, there are more usages to explore...

# Conclusion

So what I'm going to do next is to update these into [TitleGetter](https://github.com/WeepingDogel/TitleGetter) 啦！

There is no need to set the location of `list.txt` in the configuration file anymore! The output file position does not need to be fixed either!!

---

# Reference links

* [argparse简要用法总结 | Yunfeng's Simple Blog](https://vra.github.io/2017/12/02/argparse-usage/)
* [argparse â Parser for command-line options, arguments and sub-commands — Python 3.9.5 documentation](https://docs.python.org/3/library/argparse.html)

