# How to Build a Website Using GitHub


## Informal Introduction

> I'm back again~
>
> Hehe, I definitely won't tell you that I'm here to have some fun again~
>
> Ah, don't hit me~ It hurts!
## What is GitHub?

> Newbie: Hey, what is GitHub, senpai?
>
> Senpai: I don't know, go away.
>
> Newbie: sobs Senpai, you won't help me anymore, sobs

Ahem...

[Github](https://github.com/) is a source code hosting platform based on Git. It was founded by Chris Wanstrath, PJ Hyett, and Tom Preston-Werner in April 2008. Currently, it has 59 full-time employees and primarily offers version control services based on Git.

It is often jokingly referred to as **Gayhub** by some people.  HaHa!

> Today, GitHub is:
> * A community with 1.43 million developers. It includes top-level hackers like Linux creator [Torvalds](https://github.com/torvalds) and young geeks like Rails founder [DHH](https://github.com/dhh).
> * The most popular open-source hosting service on this planet. It currently hosts 4.31 million Git projects. Not only are more and more well-known open-source projects migrating to GitHub, such as Ruby on Rails, jQuery, Ruby, Erlang/OTP, but also popular open-source libraries of the past three years tend to debut on GitHub, for example, [Bootstrap](https://github.com/twitter/bootstrap), [Node.js](https://github.com/joyent/node), [CoffeeScript](https://github.com/jashkenas/coffee-script), and more.
> * Ranked 414 globally according to Alexa.

In other words, if you want to release your well-written open-source program, GitHub would be the best choice.

## Main Content of this Issue

This issue will cover how to use GitHub to build a simple website.

### Benefits of Using GitHub for Website Development
>
> * Security
>    * Since your website source code is hosted on GitHub, the security of your website is directly tied to the security of GitHub itself. If someone wants to attack your website, they would need to compromise GitHub first.
> * Simplicity
>   * Most operations can be easily accomplished with basic front-end knowledge.
> * Peace of Mind
>   * With GitHub's server handling the back-end, you don't need to maintain it 24/7. It can be set up to run without constant supervision.

### Drawbacks of Using GitHub for Website Development
> 
> * Limitations
>   * GitHub repositories can only run static web pages based on technologies like HTML. It doesn't support dynamic features like databases and other advanced functionalities.
> * ~~Prohibition of Web Crawlers~~
>   * ~~GitHub repositories are not indexed by search engines, which means that websites hosted on GitHub won't be discoverable through search engine results.~~(In reality, it has been proven that GitHub-hosted websites can be indexed by search engines.)

---

The above points outline the advantages and disadvantages of using GitHub for website development. Before starting the building process, it is crucial to carefully consider your specific circumstances and requirements.


## Detailed Tutorial
### Preparation
#### Account Registration

Firstly, you need to register an account on [GitHub](https://github.com/). It only requires an email address for registration. The specific steps are straightforward and most people are familiar with the process.

#### Creating a Repository

Once you have logged into your account, you will see a green `new ` button in the top-left corner. Click on it.

![](/img/截图_2019-10-13_21-08-00.png)

Then, a form will pop up asking you to fill in some information.

![](/img/截图_2019-10-13_21-11-12.png)

As shown in the image, the `Repository name` refers to the name of your repository.

**Note: GitHub only allows using a repository name that is the same as your username for hosting webpages.**

Here is a special format:

> yourGitHubUsername.github.io

This repository name will become your website address.

Once created, the repository will be empty.

![](/img/截图_2019-10-13_21-18-16.png)

At this point, you can follow the prompts to upload your website code as instructed.

### Uploading Code

Here, I will provide a portion of the usage of `git`.

First, create a directory:

```bash
$ mkdir ./YourGitHubUsername
```

The name of this directory can be arbitrary, but for better management, it is recommended to use your GitHub username.

Next, navigate into this directory:

```bash
$ cd ./YourGitHubUsername
```

Execute:

```bash
$ git init
```

This command initializes the directory as a Git repository. If you don't understand it, you can learn more about Git [here](https://www.runoob.com/git/git-tutorial.html).


Next, you can start creating and writing your website code. For example, let's create a simple HTML file.

First, create an `index.html` file:

```bash
$ vim ./index.html
```

Here, we use `vim`, which will automatically open an editing page in your terminal.

Next, press the `i` key to enter the editing mode.

Inside the file, enter the following code:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>HelloWorld</title>
    </head>
    <body>
        <h1>HelloWorld</h1>
        <p>HelloWorld, this is my first website.</p>
    </body>
</html>
```

You can use HTML language to freely write your website. You can add multiple HTML page files, CSS stylesheets, and even JavaScript to enhance your website.

After finishing writing your code, press the `ESC` key to exit the editing mode and return to command mode. Next, press the `:` key, and you will see a colon appearing at the bottom left corner of your vim.

```
:wq
```

Next... execute

```bash
$ git add index.html
```
This will stage your created web page code file for commit.

If you have multiple files, you can try

```bash
$ git add *
```

This way, you can quickly stage all your files for commit.

Then, execute the following commands one by one to commit your changes:

```bash
$ git commit -m "first commit"
```
```bash
$ git remote add origin https://github.com/YourGitHubUsername/YourGitHubUsername.github.io.git
```
```bash
$ git push -u origin master
```

Next, enter your GitHub username and password to complete the submission.

After that, you can access your website in a web browser.

The address is as mentioned above: `YourGitHubUsername.github.io`

Screenshot: 

![](/img/截图_2019-10-13_22-34-30.png)

## Conclusion

The above is the complete process of building a simple website using GitHub. Due to time constraints, this is all that can be covered for now. The next issue may be delayed for a while.

## References

* [Git Tutorial](https://www.runoob.com/git/git-tutorial.html)
* [Archwiki | Vim](https://wiki.archlinux.org/index.php/Vim_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* [Archwiki | Git](https://wiki.archlinux.org/index.php/Git_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* [HTML Tutorial](https://www.runoob.com/html/html-tutorial.html)
