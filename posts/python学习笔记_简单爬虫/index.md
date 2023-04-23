# Python Learning Notes: Simple Web Crawler


## A Casual Preface

Hey, I'm back. Today, I set up hexo in my U-disk, so I can continue to update my blog.

~~And this time I added a visitor counter to my blog. Feel free to help increase the count!～~~

So, in this post, I will introduce a simple web crawler implemented in Python.

## Principles of Web Crawlers
>
> Beginner: Hey there, what is a web crawler?
>
> Expert: Go search it on a search engine.
>
> Beginner: I did, but I still don't understand it.
>
> Expert: Uh...then keep reading...

### Overview

To put it simply, a web crawler automates the process of browsing web pages to extract desired information and content from them.

We all know that we use web browsers to access the Internet. So how do we visit a webpage? Here's a brief overview (I'm too lazy to draw):

>
> 1. Browser –Sends a request for www.bing.com–>
>
> 2. Server <–Receives the request–
>
> 3. Server –Responds with data–> –Returns the data–> Browser
>
What? Still confused? Let's take a look using a browser. Open any webpage.

![](/img/截图_2019-08-13_01-05-37.png)

Using Chrome/Chromium as an example, right-click and select "Inspect", then go to the "Network" tab, and check the "Preserve log" checkbox. Refresh the page and you'll see the following content:

![](/img/截图_2019-08-13_01-12-19.png)

As you can see, the browser displays the request content in great detail. And the left lists are the contents you retrieve from the website.

A web crawler automates these processes so that we don't need to visit websites manually to get the information we want.

### The Purpose of Web Crawlers

For example, let's say there is a website ~~[全国号码段(链接已失效)](http://www.hiphop8.com/)~~ where we need to obtain all the phone numbers of one of the phone number segments in a city, such as Xi'an.

![](/img/截图_2019-08-13_01-18-42.png)

![](/img/截图_2019-08-13_01-20-17.png)

As you can see, there are many phone number segments, each with ten thousand phone numbers. What should we do? Can't we copy and paste them one by one using the mouse, right? This is where web crawlers come into play.

> Actually, it can also be used to crawl my blog so that you can receive update information in a timely manner.
>
> Ah, please don't hit me, it hurts!

## Choosing a Programming Language

To perform web crawling, we need to use a programming language. The most commonly used one is **Python** because it is easy to use for web crawling. However, you can also choose other languages such as **C/C++**, **Java**, or even **Visual Basic**. The level of difficulty and coding methods may be different, but the purpose and functionality are the same. In this post, we will choose **Python**.
## Installing Python

Python is a cross-platform language, so installation methods differ depending on the platform.

### Windows

You can download the installation program from [Python's official website](https://www.python.org/) and install it. It is recommended to download Python 3.

### Mac OSX

Download it from [Python's official website](https://www.python.org/)

### Linux

Install it via package manager.

#### deb-based

```bash
$ sudo apt-get install python3
```
#### Arch-based
```bash
$ sudo pacman -S python
```
#### rpm-based
```bash
$ sudo yum install python3
```
### Android

Install QPython on the Android platform:

[Download it from Coolapk](https://www.coolapk.com/apk/com.hipipal.qpy3)

[QPython Official Website](https://www.qpython.com/)

## Installing pip

The installation programs for Windows and Mac OS X will automatically install pip, but Linux does not. We need to install it manually.

> What? You're asking about Android? I don't know either, hahaha.

First, go to [this website](https://pypi.org/project/pip/#files)，and click **Download**，Download the second tar.gz file, which is a Linux compressed file.

Then, extract it to get a `pip-19.2.2` directory:
```bash
$ tar -xvf pip-19.2.2.tar.gz
```
Enter the directory:
```bash
$ cd ./pip-19.2.2
```
There is a file called **setup.py** in there. Execute it using Python:
```bash
$ sudo python setup.py
```

Then pip will be installed automatically.

## Required Modules

The web crawler in this post uses the following modules:

* requests, for sending HTTP/1.1 requests
* BeautifulSoup, for parsing HTML and XML documents

We can install them using the following command:

```bash
$ sudo pip install requests BeautifulSoup
```

If you find that the installation speed is slow, you can refer to [this link](https://www.cnblogs.com/microman/p/6107879.html) to change the mirror source to a domestic one.

## Public Code

Here's the code for a simple phone number crawler:

```python
from bs4 import BeautifulSoup
import requests
print("简易手机号码抓取工具 By WeepingDogel")
url="http://www.hiphop8.com/mobile/xian_1319339.html"
page=requests.get(url)
page_info=page.content
soup = BeautifulSoup(page_info, "html.parser")
numbers = soup.find_all('a')
with open("1319339.txt","w") as file:
    for number in numbers:
        print(number.string)
        file.write(str(number.string)+"\n")
```

You can copy the above code into a Python file and run or modify it as needed.

## In Conclusion

I wrote this post in a hurry, so it may not be detailed enough. Please forgive me. ~~There's a comment section below, feel free to leave comments (or criticize me).~~
