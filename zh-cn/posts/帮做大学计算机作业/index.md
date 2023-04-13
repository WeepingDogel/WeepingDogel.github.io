# 帮做大学计算机作业


## 序

帮做作业 qwq... 

我也好久没玩 C 语言了，试试看我会不会做

>PS: 我这里是 Linux，运行方式可能不同，如果你是 Windows ，你得用编辑器来运行。
>
> 例如 Dev C++ 、 VS 2019 等。

## 实验十一

> 实验十一
>
> 实验目的:
> * 了解 C 程序设计思想
> * 了解 C 程序设计框架
> 实验内容:
>
> 输入一个成绩，输出它的等级评分

这个很简单，我们需要列几个等级区间。

* 优秀
    * 80 ~ 100 分 [80,100]
* 及格
    * 60~79 分 [60,79]
* 不及格
    * 60 以下 [0,60)

在代码中，我们可以直接用运算表达式来表达区间，例如：
```c
score >= 80 && score <= 100
```
然后我们用 `if()` 来判断成绩等级。
```c
#include<stdio.h>
int main(){
    int score = 85;
     if(score >= 80 && score <= 100){
        printf("成绩为优秀");
    }else if(score >= 60 && score <= 79){
        printf("成绩为及格");
    }else if(score >= 0 && score < 60){
        printf("成绩不及格");
    }
}
```
接下来执行程序 

输出如下：
```txt
weepingdogel@WeepingDogel /tmp> make test
cc     test.c   -o test
weepingdogel@WeepingDogel /tmp> ./test
成绩为优秀⏎     
```


然后我们需要获取用户输入的成绩，像这样，使用 `scanf()` 函数获取用户输入的数据然后赋值给整型变量 `score` 。

```c
#include<stdio.h>
int main(){
    int score;
    printf("输入你的成绩:");
    scanf("%d",&score);
    printf("%d",score);
}
```

接下来就是将这两段代码组合到一起。

完整代码如下：

```c
#include<stdio.h>
int main(){
    int score;
    printf("输入你的成绩:");
    scanf("%d",&score);
    if(score >= 80 && score <= 100){
        printf("成绩为优秀");
    }else if(score >= 60 && score <= 79){
        printf("成绩为及格");
    }else if(score >= 0 && score < 60){
        printf("成绩不及格");
    }
}
```

思路：
先用 `scanf()` 函数获取用户输入的成绩，再用 `if()` 进行比对，最后输出结果。

这是输出：
```txt
weepingdogel@WeepingDogel /tmp> make test
cc     test.c   -o test
weepingdogel@WeepingDogel /tmp> ./test
输入你的成绩:99
成绩为优秀⏎                                                        
weepingdogel@WeepingDogel /tmp> ./test
输入你的成绩:85
成绩为优秀⏎                                                        
weepingdogel@WeepingDogel /tmp> ./test
输入你的成绩:60
成绩为及格⏎                                                        
weepingdogel@WeepingDogel /tmp> ./test
输入你的成绩:59
成绩不及格⏎                                
```

## 实验十二


> 实验十二
>
> 实验目的:
> * 了解 C 程序设计思想
> * 了解 C 程序设计框架
> 
>1. 任务内容
>* 要求编写一个先注册然后再登录的程序，输出格式如下图所示：
>```txt
>--------------------------------------
>                注册界面
>请输入您的注册用户名: Ly
>请输入您的注册密码: 123
>恭喜您！注册成功！
>--------------------------------------
>
>--------------------------------------
>                登录界面
>请输入您的登录用户名: Ly
>请输入您的登录密码: 123
>登录成功！
>--------------------------------------
>
>--------------------------------------
>                登录界面
>请输入您的登录用户名: Ly
>请输入您的登录密码: 1234
>登录失败！
>--------------------------------------
>```
>* 定义 **4** 个变量，分别保存注册时的用户名、密码以及登录时的用户名、密码
>* 使用 **`if ... else`** 语句完成用户名、密码的判断

...

怎么说呢.. 我连说都懒得说了...

跟上面一样，先用 `scanf()` 获取内容，然后赋值给变量再来判断...

噗！算了，上代码，不想解释..

```c
#include<stdio.h>
#include<string.h>
int main(){
    /*定义4个变量，分别保存注册时的用户名、密码以及登录时的用户名、密码*/
    char username_sign[40];
    char password_sign[16];
    char username_login[40];
    char password_login[16];
    /*定义4个变量，分别保存注册时的用户名、密码以及登录时的用户名、密码*/
    printf("--------------------------------------\n               注册界面\n");
    printf("请输入您的注册用户名:");
    scanf("%s", username_sign);
    printf("请输入您的注册密码:");
    scanf("%s", password_sign);
    printf("恭喜您！注册成功！");
    printf("\n--------------------------------------");
    /*先用 scanf() 获取内容*/
    printf("\n\n--------------------------------------\n               登录界面\n");
    printf("请输入您的登录用户名:");
    scanf("%s",username_login);
    printf("请输入您的登录密码:");
    scanf("%s",password_login);
    /*使用 if ... else 语句完成用户名、密码的判断*/
    /*这里用 strcmp() 函数*/
    if(strcmp(username_login,username_sign) == 0 && strcmp(password_login,password_sign) == 0){
        printf("登录成功！");
    }else{
        printf("登录失败！");
    }
    printf("\n--------------------------------------");
}
```

不过值得一提的是，这个字符串的判断方法有所不同，它需要使用`strcmp()` 函数，大概是这样...
```c
if(strcmp(username_login,username_sign) == 0 && strcmp(password_login,password_sign) == 0){
        printf("登录成功！");
    }else{
        printf("登录失败！");
    }
```

它似乎会计算出一个数值，如果等于 0 就表示这两段字符串是一样的。大概就是这样。


看看输出吧...
```txt
weepingdogel@WeepingDogel /tmp> make test2
cc     test2.c   -o test2
weepingdogel@WeepingDogel /tmp> ./test2
--------------------------------------
               注册界面
请输入您的注册用户名:Ly
请输入您的注册密码:123
恭喜您！注册成功！
--------------------------------------

--------------------------------------
               登录界面
请输入您的登录用户名:Ly
请输入您的登录密码:123
登录成功！
--------------------------------------⏎                              

weepingdogel@WeepingDogel /tmp> ./test2
--------------------------------------
               注册界面
请输入您的注册用户名:Ly
请输入您的注册密码:123
恭喜您！注册成功！
--------------------------------------

--------------------------------------
               登录界面
请输入您的登录用户名:Ly
请输入您的登录密码:1234
登录失败！
--------------------------------------⏎                                 
```

做完了～

## 结语

其实细节上还是涉及到一些我可能会粗心大意忘掉的东西，所以我不敢说 "就这？就这？"

不过，相对来说还是比较简单的... 嗯...


