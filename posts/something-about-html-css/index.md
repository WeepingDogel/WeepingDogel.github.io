# Some Thoughts on Writing HTML and CSS


<!--more-->
# Introduction

Many beginners often encounter some basic problems when learning HTML and CSS, which can be frustrating.

I originally didn't want to write about basic topics, but I feel that some people may need to see this kind of content...so here are some tips.

There is not much to say, just some issues related to syntax and usage.


# Common Issues I Have Noticed

## HTML Syntax Problems

### Tag Order Problems

I often get asked questions like "Why isn't my content showing up when I put the tags in?", or "Why isn't this working..." and so on.

The first question I was asked was why the content of the title (`<h1>` tag) wasn't showing up. I took a look at their code:


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

I couldn't believe it -- they put the `<h1>` tag inside the `<p>` tag...

It's clear that they aren't familiar with either of these tags. Both `<h1>` and `<p>` are block-level elements, and by default the font size of `<h1>` is larger than that of `<p>`. Therefore, putting them together may result in display errors. Normally, these two tags exist on the same level, and both will occupy a line to display. If the larger `<h1>` tag is nested inside the smaller one, of course you won't be able to see it~

In summary, there cannot be headings within paragraphs, and they cannot be nested within each other.

Therefore, the correct way to write it should be as follows:

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

### Missing Symbols

Sometimes I get asked about this issue as well, and I feel like these are all basic errors.

Looking at the code, I'm like, ~~"What is this mess?"~~

It's clearly not standard HTML.

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

This type of code...

Either they weren't paying attention when writing it or they're not familiar with how to use these tags.

Or perhaps they don't know how to represent tags.

Let me explain again: there are two types of tags, single tags and double tags.

Taking the tag for inserting an image as an example, the single tag looks like this: `<img />`. The `<` at the beginning and `>` at the end can't be left out, and it's best to add a `/` before the closing `>`.

As for double tags, let's take the paragraph tag as an example: `<p>This is a paragraph.</p>`. This type of double tag must have an opening and closing tag. Neither the beginning nor the end can be left out.

When writing double tags and there's nesting involved, it's a good habit to indent each level on a new line.

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

This way, the code is not only beautiful, but it's also easier to maintain and troubleshoot in the future.

### Not Differentiating Between `<head>` and `<body>`

In addition to the aforementioned issues, there are even cases where people write `<div>` tags inside the `<head>`, which indicates that they haven't yet distinguished between the HTML header and content display areas.

I can only explain it this way:

* The `<head>` section is the header information area, which is what the server sends to the browser. The code inside it is not rendered on the page in the browser.

* The `<body>` section is the content display area, used to write tags that can be displayed. You can also write `<script>` tags with JavaScript code nested inside, but CSS styles cannot be written here.

## CSS Problems

In addition to syntax issues and not differentiating between sections in HTML, there are also some strange questions people ask me when writing CSS.

### Referencing Stylesheets

There are three ways to reference CSS stylesheets, according to textbooks, but the most commonly used are two.

My personal favorite is to use `<link>` to link the stylesheet. This way, you can split it into two files and write them side by side, making it very convenient.

You don't need to flip back and forth like with inline styles.

As for inline styles? They're not used much, I almost never use them in practice.

But there are still people who don't know how to link stylesheets?

The main issue is not understanding the concept of paths.

It's actually very simple -- just remember the relative path and then fill it into the `href` attribute value of the `<link>` tag.

```html
<link type="text/css" rel="stylesheet" href="css/style.css" />
```



Of course, there are still people who don't know how to use inline styles, but there's not much to say about it. Just remember that the `<style>` tag must be placed inside the `<head>` section and then write the styles using the correct CSS format inside the `<style>` tag.

For example：

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

### When writing CSS, losing `;`, `{`, and `}` and misspelling words.

These are all minor mistakes that can be improved with more practice and attention. The correct template should look like this:

```css
Selector {
  Property: value;
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

### Remove default padding and margin

Many beginners do not develop the habit of resetting default padding and margin in CSS when they start coding, which leads to difficulty in styling as they progress.

In fact, it's quite simple:


```css
*{
    margin: 0;
    padding: 0;
}
```

`*` is a regular wildcard character in CSS, and it has the lowest priority among all selectors. Setting its `margin` and `padding` properties to `0` before everything else can eliminate the default padding and margin for all elements before they are selected by a specific selector. This makes it much easier to make more accurate adjustments to element spacing later on.

If you're still not sure whether or not to include it, try it out and see the difference for yourself.


### Inappropriate naming when using class selectors and ID selectors

This is also a big problem that greatly affects the readability and maintainability of the code.

I often see something like this:
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

It's hard to know what element it actually selects, which increases workload...

Because at first glance, it's unclear what it refers to.

Also, using Chinese characters for naming, although I used to like to do this when I was in middle school, this habit is not good because if there are some server encoding issues, the style files may not be loaded properly.

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

But some people even use numbers!

And then they ask me why the style is not displaying properly!

```css
.1{
  color: red;
}
```

Numbers or names that start with numbers cannot be used as class selector names and IDs in CSS. Similarly, in many programming languages, it is not allowed to name variables using numbers or names that begin with numbers.

To avoid this problem, naming conventions such as camelCase and `_` concatenation can be used.

* Upper camel case refers to two words combined, with the first letter of each word capitalized, such as `TopHead`.
* Lower camel case refers to two words combined, with only the first letter of the second word capitalized, such as `contentPlace`.

For naming conventions with more than two words, the `_` character is needed to combine them, such as `the_menu_bar`.

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

This significantly improves readability so that one can generally tell at a glance which element corresponds to which, without having to spend time searching through the code.

# End

The above are just my personal opinions and methods for addressing some of the small issues that beginner learners may encounter when studying HTML and CSS.

There may be other problems that I haven't discovered yet...

Feel free to leave a comment below to share your thoughts and feedback.


