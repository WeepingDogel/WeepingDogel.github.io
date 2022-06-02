# 输入一个分数判断该分数的评级


# 序

好久没玩过 C 了， 昨晚看到一个题:
> 输入一个分数，自动判断该分数的评级
>
> 要求: 使用 switch(){}

# 过程

首先我肯定要获取这个分数然后赋值给某个变量，用 `scanf();` 就可以做到
```c
#include<stido.h>

int main()
{
    float score;
    printf("Please type a score:\n");
    scanf("%f", &score);
}
```

其次我得确认这个数字小于 `100` 并大于 `0`
> 满分100分
>
> 最低0分

[之前写过的一篇文章里](https://weepingdogel.github.io/posts/%E5%B8%AE%E5%81%9A%E5%A4%A7%E5%AD%A6%E8%AE%A1%E7%AE%97%E6%9C%BA%E4%BD%9C%E4%B8%9A/#%e5%ae%9e%e9%aa%8c%e5%8d%81%e4%b8%80)就提到了 `&&` 这个符号

因此直接 `if(score <= 100 && >= 0){}` 即可

```c
#include <stdio.h>

int main()
{
    float score;
    printf("Please type a score:\n");
    scanf("%f", &score);
    if(score <= 100 && score >= 0)
    {

    }
}
```

嗯.. 现在分数来源问题就解决了，如果输入的分数大于100或者小于0, 直接报错
```c
printf("The score %.2f is an Error Value!", score);
```

```c
#include <stdio.h>

int main()
{
    float score;
    printf("Please type a score:\n");
    scanf("%f", &score);
    if(score <= 100 && score >= 0)
    {

    }
    else
    {
        printf("The score %.2f is an Error Value!", score);
    }
}
```

好接下来要做的是把不同的分数评为不同的等级，先说说不同分数对应的字母吧:

* 90到100分为 A
* 90分以下80分以上为 B
* 80分以下70分以上为 C
* 70分以下60分以上为 D
* 60分以下为 E

这些字母将会用一个单字符型变量来存储，我把它命名为 `grade` 并加入代码中。

```c
char grade
```
```c
#include <stdio.h>

int main()
{
    float score;
    char grade;
    printf("Please type a score:\n");
    scanf("%f", &score);
    if(score <= 100 && score >= 0)
    {

    }
    else
    {
        printf("The score %.2f is an Error Value!", score);
    }
}
```

那怎样判断分数对应的级别？

其实我们可以用 `if(){}` 来写的，但是要求使用 [`switch();`](https://www.runoob.com/cprogramming/c-switch.html)

`switch()` 语句是流程控制中的判断语句之一，具体解释如下:
> 一个 switch 语句允许测试一个变量等于多个值时的情况。每个值称为一个 case，且被测试的变量会对每个 switch case 进行检查。 
>
>switch 语句必须遵循下面的规则：
>* switch 语句中的 expression 是一个常量表达式，必须是一个整型或枚举类型。
>* 在一个 switch 中可以有任意数量的 case 语句。每个 case 后跟一个要比较的值和一个冒号。
>* case 的 constant-expression 必须与 switch 中的变量具有相同的数据类型，且必须是一个常量或字面量。
>* 当被测试的变量等于 case 中的常量时，case 后跟的语句将被执行，直到遇到 break 语句为止。
>* 当遇到 break 语句时，switch 终止，控制流将跳转到 switch 语句后的下一行。
>* 不是每一个 case 都需要包含 break。如果 case 语句不包含 break，控制流将会 继续 后续的 case，直到遇到 break 为止。
>* 一个 switch 语句可以有一个可选的 default case，出现在 switch 的结尾。default case 可用于在上面所有 case 都不为真时执行一个任务。default case 中的 break 语句不是必需的。
>
> ——[C switch 语句 | 菜鸟教程](https://www.runoob.com/cprogramming/c-switch.html)

总感觉这个解释已经很容易看懂了...所以我不想用自己的话说一遍.. 这样会写得很长并且看起来很水..

我们大概就是要把取来的分数除以10然后转化成整数，再把这个整数进行逐一比对。

```c
switch ((int)(score / 10))
        {
        case 10:
        case 9:
            grade = 'A';
            break;
        case 8:
            grade = 'B';
            break;
        case 7:
            grade = 'C';
            break;
        case 6:
            grade = 'D';
            break;
        default:
            grade = 'E';
            break;
        }
```

接下来直接输出分数和字母就好了。

```c
printf("The score %.2f is grade %c .\n",score,grade);
```

这些都写进上面那个 `if(){}` 语句里面

看下面的完整代码吧～
# 完整代码

到 Github 看: [drafts/a.c at main · WeepingDogel/drafts · GitHub](https://github.com/WeepingDogel/drafts/blob/main/C/a.c)

这里看:
```c
/*
分数判断成绩 ABCDEF

By WeepingDogel
*/
#include <stdio.h>
int main()
{
    float score;
    char grade;
    printf("please input your score:\n");
    scanf("%f",&score);
    if (score <= 100 && score >= 0)
    {
        switch ((int)(score / 10))
        {
        case 10:
        case 9:
            grade = 'A';
            break;
        case 8:
            grade = 'B';
            break;
        case 7:
            grade = 'C';
            break;
        case 6:
            grade = 'D';
            break;
        default:
            grade = 'E';
            break;
        }
        printf("The score %.2f is grade %c .\n",score,grade);
    }
    else
    {
        printf("The score %.2f is an Error Value!", score);
    }
    return 0;
}
```

# 一些要注意的细节

作为初学者的我认为这些细节必须要知道，如果你也是初学者也会问这些。

1. `%.2f` 是什么意思？

意思是取到两位浮点数，也就是取两位小数啦

这里贴出完整的解释

>C 库函数 int printf(const char *format, ...) 发送格式化输出到标准输出 stdout。
>
>printf()函数的调用格式为:
>
>```c
>printf("<格式化字符串>", <参量表>);
>```
>下面是 printf() 函数的声明。
>```c
>int printf(const char *format, ...)
>```
>format -- 这是字符串，包含了要被写入到标准输出 stdout 的文本。它可以包含嵌入的 format 标签，format 标签可被随后的附加参数中指定的值替换，并按需求进行格式化。format 标签属性是 %[flags][width][.precision][length]specifier，具体讲解如下：
>![](/img/截图_2021-06-15_09-58-40.png)
>![](/img/截图_2021-06-15_09-59-46.png)
>![](/img/截图_2021-06-15_10-01-26.png)
>
>附加参数 -- 根据不同的 format 字符串，函数可能需要一系列的附加参数，每个参数包含了一个要被插入的值，替换了 format 参数中指定的每个 % 标签。参数的个数应与 % 标签的个数相同。
>
>——[C 库函数 – printf() | 菜鸟教程](https://www.runoob.com/cprogramming/c-function-printf.html)

2. 为什么 scanf() 里面那个`score`前面要加`&`?

这个... 读到的是内存地址，所以..~

>C 库函数 int scanf(const char *format, ...) 从标准输入 stdin 读取格式化输入。
>
>...
>
>1. &a、&b、&c 中的 & 是地址运算符，分别获得这三个变量的内存地址。
>2. %d%d%d 是按十进值格式输入三个数值。输入时，在两个数据之间可以用一个或多个空格、tab 键、回车键分隔。 
>
>——[C 库函数 – scanf() | 菜鸟教程](https://www.runoob.com/cprogramming/c-function-scanf.html)

3. 为什么 `case 10：` 和 `case 9:` 之间是空着的？

这个啊，因为上面说了需求是 100 和 90 多分都是 A, 要实现这个需求就得利用 `switch（）{}` 的这个规则:
>* 当遇到 break 语句时，switch 终止，控制流将跳转到 switch 语句后的下一行。
>* 不是每一个 case 都需要包含 break。如果 case 语句不包含 break，控制流将会 继续 后续的 case，直到遇到 break 为止。
>
> ——[C switch 语句 | 菜鸟教程](https://www.runoob.com/cprogramming/c-switch.html)


# 参考链接
* [C switch 语句 | 菜鸟教程](https://www.runoob.com/cprogramming/c-switch.html)
* [C 库函数 – printf() | 菜鸟教程](https://www.runoob.com/cprogramming/c-function-printf.html)
* [C 库函数 – scanf() | 菜鸟教程](https://www.runoob.com/cprogramming/c-function-scanf.html)
