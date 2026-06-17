# How to Build a Blog with GitHub


<!--more-->
## Preface

Last year I wrote a post about [how to build a website with GitHub](https://weepingdogel.github.io/posts/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8github%E6%90%AD%E5%BB%BA%E7%BD%91%E7%AB%99_%E4%B8%8A/), using GitHub Pages to upload your own HTML files to run a webpage.

Well... for building a blog, handwriting HTML, CSS, and JS is way too much work...

What to do? Use a framework!

qwq

I recommend Hugo... I think it's the simplest.

A friend happens to want to rebuild their blog, so here's the guide.

## Register a GitHub Account

First, you need a GitHub account and a repository that can be displayed on GitHub Pages.

Last year's [article](https://weepingdogel.github.io/posts/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8github%E6%90%AD%E5%BB%BA%E7%BD%91%E7%AB%99_%E4%B8%8A/) already explained how to register a GitHub account and create a GitHub Pages repository. I won't repeat it here.

In short, you need a GitHub account and create a repository named:
> your-github-username.github.io

Make sure to check "Public".

## Install Hugo

* Arch
```bash
$ sudo pacman -S hugo
```

* Debian-based
```bash
$ sudo apt install hugo
```

* Windows

Download the installer from [GitHub Releases](https://github.com/gohugoio/hugo/releases).

## Generate a Blog

I'll use Linux as an example. Other platforms may have some differences, so **pay attention.**

Open your terminal and run:

```bash
$ hugo new site test
```

Your terminal will return:

```txt
Congratulations! Your new Hugo site is created in /home/weepingdogel/test.

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder.
   Choose a theme from https://themes.gohugo.io/ or
   create your own with the "hugo new theme <THEMENAME>" command.
2. Perhaps you want to add some content. You can add single files
   with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>".
3. Start the built-in live server via "hugo server".

Visit https://gohugo.io/ for quickstart guide and full documentation.
```

If you don't understand the English well, just use Google Translate.

Alright, now go to [https://themes.gohugo.io/](https://themes.gohugo.io/) to find a nice theme.

![](/img/2020-10-22_13-31.png)

There are many themes here, qwq.

Well... it depends on personal preference. Different people like different things.

And various themes have different configuration methods. I'll use [hugo-coder](https://themes.gohugo.io/hugo-coder/) as an example.

Enter the hugo directory:

```bash
$ cd test
```

Check the files inside:

```bash
$ ls -lh
```

```txt
total 28K
drwxr-xr-x 2 weepingdogel weepingdogel 4.0K Oct 22 13:23 archetypes/
-rw-r--r-- 1 weepingdogel weepingdogel   82 Oct 22 13:23 config.toml
drwxr-xr-x 2 weepingdogel weepingdogel 4.0K Oct 22 13:23 content/
drwxr-xr-x 2 weepingdogel weepingdogel 4.0K Oct 22 13:23 data/
drwxr-xr-x 2 weepingdogel weepingdogel 4.0K Oct 22 13:23 layouts/
drwxr-xr-x 2 weepingdogel weepingdogel 4.0K Oct 22 13:23 static/
drwxr-xr-x 2 weepingdogel weepingdogel 4.0K Oct 22 13:23 themes/
```

You only need to remember these directories:

* `config.toml` — blog configuration file, global settings
* `static` — static resource files, you can put images here
* `content` — articles you write go into `content/posts/`, other pages are also here
* `themes` — this is where you put themes
* `public` — generated static files

Now let's execute these:

```bash
$ cd themes
```

```bash
$ git clone https://github.com/luizdepra/hugo-coder.git 
```

```bash
$ cd ..
```

Now copy the example site config from the theme:

```bash
$ cp ./themes/hugo-coder/exampleSite/config.toml ./
```

Also copy the example content:

```bash
$ cp -rv ./themes/hugo-coder/exampleSite/content/* content/
```

Start the local preview server:

```bash
$ hugo server 
```

Then visit `http://127.0.0.1:1313/` with your browser to preview.

![](/img/2020-10-22_13-53.png)

Now the blog is accessible locally. That's half the battle.

You can edit `config.toml` to change your blog settings:

```bash
$ vim config.toml
```

```toml
baseurl = "http://www.example.com"
title = "johndoe" # Blog title

theme = "hugo-coder" # Theme name, no need to change

languagecode = "en" # Language, default English..
defaultcontentlanguage = "en" # Same as above

paginate = 20

[params]
    author = "John Doe"
    description = "John Doe's personal website"
    keywords = "blog,developer,personal"
    info = "Full Stack DevOps and Magician"
    avatarurl = "images/avatar.jpg"
    ...

# Social links
[[params.social]]
    name = "Github"
    icon = "fa fa-github"
    weight = 1
    url = "https://github.com/johndoe/"
...
```

For detailed documentation about this theme, read [this link](https://github.com/luizdepra/hugo-coder/wiki/Configurations).

Modify the config file according to your needs and the instructions~

## Write a Blog Post

First, we need to create a `*.md` file. We can use `hugo new` to generate one, because different themes have different blank formats.

This is the blank format for my current site:

```markdown
---
title: "Test"
date: 2020-10-22T17:08:31+08:00
draft: true
---
```

And this is the coder theme's blank format:

```markdown
+++ 
draft = true
date = 2020-10-22T17:09:47+08:00
title = ""
description = ""
slug = ""
authors = []
tags = []
categories = []
externalLink = ""
series = []
+++
```

They're different, right? So we need to do it this way:

```bash
$ hugo new posts/helloworld.md
```

If the terminal returns:

```txt
/home/weepingdogel/test/content/posts/helloworld.md created
```

It means the file was created successfully. Now just edit this file to write~

Oh right, writing blog posts requires using [Markdown syntax](https://www.markdownguide.org/). If you don't know it, click the link to learn~

Let me write a symbolic one:

```markdown
+++ 
draft = false
date = 2020-10-22T17:09:47+08:00
title = "HELLO WORLD"
description = ""
slug = ""
authors = []
tags = []
categories = []
externalLink = ""
series = []
+++

## Hello World

**It's my first blog!**

```c
#include<stdio.h>
int main(){
  printf("Hello World");
  return 0;
}
```
```

![](/img/2020-10-22_17-31.png)

Remember to change `draft` to `false`, otherwise it will be recognized as a draft and won't be published.

## Publish to GitHub

After writing, we can only preview it locally at `127.0.0.1:1313`. Others can't see it.

We need to put it on GitHub.

First generate the static files:

```bash
$ hugo --theme=hugo-coder
```

It will output:

```txt
Start building sites … 

                   | EN | PT-BR  
-------------------+----+--------
  Pages            | 57 |    25  
  Paginator pages  |  0 |     0  
  Non-page files   |  0 |     0  
  Static files     |  0 |     0  
  Processed images |  0 |     0  
  Aliases          | 21 |     9  
  Sitemaps         |  2 |     1  
  Cleaned          |  0 |     0  

Total in 237 ms
```

Enter the `public` directory:

```bash
$ cd public/
```

Now we need to push all the files in this directory to the `yourusername.github.io` repository. It's actually quite simple.

Initialize the repository:

```bash
$ git init
```

Add files:

```bash
$ git add -A
```

Make a commit:

```bash
$ git commit -m "Initial commit"
```

Add your GitHub repository remote:

```bash
$ git remote add origin https://github.com/yourusername/yourusername.github.io.git
```

Push using HTTPS:

```bash
$ git push -u origin master
```

Then enter your account credentials and it will automatically push to the repository. After waiting a moment, your blog will be accessible at:

```txt
https://yourusername.github.io/
```

## Conclusion

This hole is finally filled.

Yeah, this one was also quite lazy and not very detailed. If you still can't figure it out after reading, leave a comment below.

qwq

## Reference Links

* [Hugo Documentation](https://gohugo.io/documentation/)
* [Hugo Themes](https://themes.gohugo.io/)
* [Hugo Coder Theme](https://themes.gohugo.io/hugo-coder/)
* [Hugo Coder Wiki - Configurations](https://github.com/luizdepra/hugo-coder/wiki/Configurations)
* [Markdown Tutorial](https://www.markdownguide.org/)
