# 关于写 HTML CSS 的时候一些想说的话


# 序

很多初学者在学 HTML 和 CSS 的时候总是遇到一些低级的问题就望而却步...

我本来是实在不想写基础类的内容的，但是感觉有些人可能就需要看这种内容... 就写一些吧

要说的也不多，就是语法和用法上的问题。


# 我已经发现的常见问题

## HTML 语法问题

### 标签顺序问题

我经常被人问：“为什么我的标签写上去之后内容显示不出来？为什么我这个显示不了... ” 之类的问题。

我第一个被问到的是为什么标题（`<h1>` 标签）的内容显示不出来，我看一眼他的代码:


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test</title>
  </head>
  <body>
    <p>
      ppp
      <h1>TT</h1>
      pppp
    </p>
  </body>
</html>
```

麻了，我血压一下子就上来了，居然把 h1 标签套进 p 里面去...

这里很明显是对这两个标签都不太熟， `<h1>` 和 `<p>` 都是块级元素的标签，且默认情况下 `<h1>` 的字体是比 `<p>` 要大的，因此放进去之后可能会显示错误，正常情况下，这两个标签是平级存在的，两者都会独占一整行来显示。如果大的`<h1>`套进小的里面去的话，当然就看不到啦~

总的来说段落里面不能有标题，二者不能互相嵌套。

所以正确的写法应该是这样的：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test</title>
  </head>
  <body>
    <h1>The Title Of An article.</h1>
    <p>The Paragraph.</p>
  </body>
</html>
```

### 丢符号的问题，

有时候也因为这个问题被问到，我感觉这都是低级错误。

打开代码一看， ~~妈也， 这是什么玩意~~

很明显这就是不规范的 HTML。 

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" >
    <title>Test</title
  </head>
  <body>
    <div>
      <h1>Test</h1
      <p Text</p>
      <div> 
    /body>
</html>
```

这种代码....

要么是打的时候不认真，要么也是没有熟悉这些标签的用法。

或者是说，不知道标签怎么表示

那这里就再解释一下， 标签有两种，单标签和双标签

以插入图片的标签为例，单标签是这样的: `<img />`， 前面的 `<` 和后面的 `>` 都不能丢， 而且最好在末尾的 `>` 前面加个 `/`。

双标签就以段落为例吧： `<p>这是一个段落</p>` ，这种双标签有头必有尾。 前面的部分和后面的部分一个都不能丢。

写双标签出现嵌套的时候最好养成一个好习惯，换行缩进

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test</title>
  </head>
  <body>
    <div class="Box1">
      <div class="Box2">
        <h1>Title</h1>
        <ul>
          <li>
            <p>Para1</p>
          </li>
          <li>
            <p>Para2</p>
          </li>
        </ul>
      </div>
    </div>
  </body>
</html>
```

这样的话，代码不仅美观，而且后期维护起来也会轻松很多，出了问题也好找。

### 分不清 `<head>` 和 `<body>`

除了上面的问题以外，甚至还有在 `<head>` 里面写 `<div>` 的，这就说明还没有分清楚 HTML 的头部信息区和内容显示区。

我只能这样解释了：

* `<head>` 里面是头部信息区，这个是服务器给浏览器看的，里面的代码并不会渲染在浏览器的页面上。

* `<body>` 则是内容显示区，用来写那些能够被显示出来的标签的，也可以写 `<script>` 标签然后套 js 代码，但是 CSS 样式不能写在这里。

## CSS 的问题

除了 HTML 的语法问题和区域分不清的问题以外，在写 CSS 的时候也有不少人问我一些奇葩问题。

### 引用样式的方法

引用 CSS 样式表的方法，按教科书来说有三种，但是常用的也就两种。

我个人最喜欢的是用 `<link>` 来链入，这样可以分为两个文件然后分屏写，很方便。

不需要像行内式一样把屏幕翻来翻去。

至于行内式？用得少，我几乎在实践当中没用过。

不过到现在为止居然还有人不会链入式？

最主要的是不清楚路径这个概念。

其实很简单，只需要把相对路径记住，然后再把相对路径填入 `<link>` 标签的 `href` 属性值里面就行了。

```html
<link type="text/css" rel="stylesheet" href="css/style.css" />
```



当然，内嵌式也还是有人不会的，这没什么好说的，一定记得 `<style>` 标签要写在 `<head>` 里面，然后按照正确的 CSS 格式在 `<style>` 标签里面写样式就行。

例如：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style type="text/css">
        *{
            margin: 0;
            padding: 0;
        }
        .TopHead{
            background-color: white;
            border: solid 1px black;
            width: 100px;
            height: 200px;
        }
    </style>
    <body>
        <div class="TopHead">

        </div>
    </body>
</html>
```

### 写 CSS 的时候丢 `;` 、`{` 和 `}` ，和拼错单词

这种呢都是低级错误，多练练多注意就好....

正确模板是这样的：

```css
选择器{
  属性: 属性值;
}
```
```css
.TopHead{
    background-color: white;
    border: solid 1px black;
    width: 100px;
    height: 200px;
}
```

### 消除默认内外边距

很多初学者在写 CSS 的时候没有养成先消除默认内外边距的习惯，这导致写到后期会发现样式越来越难调。

其实很简单:

```css
*{
    margin: 0;
    padding: 0;
}
```

`*` 是个正则通配符，在 CSS 里面它的优先级是最低的，而在一切开始之前将它的 `margin` 属性和 `padding` 属性设置为0可以消除所有的元素在没被选择器选择的时候的内外边距清除，便于后期对它进行更准确的设定。

还是不知道写不写有什么区别？你试试就知道了。

### 使用类选择器、ID 选择器的时候命名不规范

这个问题也很大，非常影响代码的可读性和后期管理性。

我是经常看到这样的:
```css
.a1{

}
.a2{

}
#b1{

}
#b2{

}
```

这就很难去找它到底选择的是个什么元素，增加了工作量....

因为第一眼看上去完全就不知道它指的是什么。

还有用中文的，虽然我在初中的时候写这玩意也喜欢用中文，但是这个习惯也很不好，如果有一些服务器的编码炸了，样式文件也很容易加载不出来。
```css
h1.中央标题
{
    text-align:center;
    font-size:22px;
}
h1.一级标题
{
    font-size:22px;
}
h2.二级标题
{
    font-size:20px;
}
h2.三级标题
{
    font-size:18px;
}
h2.四级标题
{
    font-size:16px;
}
p.普通文字
{
    text-indent:25px;
    font-size:15px;
    text-align:justify;
}
```

但是甚至还有用数字的！

然后问我为什么不显示！

```css
.1{
  color: red;
}
```

数字和数字开头的名字是不能作为类选择器名称和ID的，其次在很多编程语言中也不能使用数字或者数字开头的名字来给变量命名。

而比较好的命名方法有驼峰法和`_`拼接法。

* 大驼峰是指两个单词拼在一起，两个首字母都大写，比如 `TopHead`。
* 小驼峰是指两个单词拼在一起，只有后面那个词的首字母大写，比如 `contentPlace`。

而两个以上单词的命名就需要 `_` 来拼接了，比如 `the_menu_bar`。

```css
.TopHead{
  width: 1000px;
  height: 300px;
}
.contentPlace{
  width: 1000px;
  height: auto;
}
.the_menu_bar{
  width: 100%;
  height: 50px;
  background-color: blue;
}
```

这样可读性就高多了，一般来说都知道哪个对应哪个，不需要费那么多眼神去一个一个找了。

# 结尾

以上只是我个人对目前已经发现的初学者学习 HTML 和 CSS 会出现的小问题的一些看法和方法。

也许还有更多问题我没发现的...

其实你可以到下面的评论插件吐槽....


