# Input a Score and Determine Its Grade


<!--more-->
# Preface

It's been a while since I played with C. Last night I saw a problem:
> Input a score and automatically determine its grade.
>
> Requirement: Use `switch(){}`.

# Process

First, I need to get the score and assign it to a variable. `scanf();` can do that:

```c
#include<stdio.h>

int main()
{
    float score;
    printf("Please type a score:\n");
    scanf("%f", &score);
}
```

Second, I need to make sure the number is less than `100` and greater than `0`:
> Full score is 100.
> Minimum score is 0.

[An article I wrote before](https://weepingdogel.github.io/posts/%E5%B8%AE%E5%81%9A%E5%A4%A7%E5%AD%A6%E8%AE%A1%E7%AE%97%E6%9C%BA%E4%BD%9C%E4%B8%9A/#%e5%ae%9e%e9%aa%8c%e5%8d%81%e4%b8%80) mentioned the `&&` operator.

So just use `if(score <= 100 && score >= 0){}`:

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

Now the score source problem is solved. If the input score is greater than 100 or less than 0, just report an error:

```c
printf("The score %.2f is an Error Value!", score);
```

Now I need to assign different grades to different scores. Here are the score-to-grade mappings:

* 90 to 100 is A
* 80 to 89 is B
* 70 to 79 is C
* 60 to 69 is D
* Below 60 is E

These letters will be stored in a single character variable, which I'll name `grade`:

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

How do we determine the grade corresponding to a score?

We could use `if(){}` to write it, but the requirement is to use [`switch();`](https://www.runoob.com/cprogramming/c-switch.html).

The idea is to take the score, divide it by 10, convert it to an integer, and then compare it case by case:

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

Then just output the score and letter:

```c
printf("The score %.2f is grade %c .\n",score,grade);
```

# Complete Code

See on GitHub: [drafts/a.c at main · WeepingDogel/drafts · GitHub](https://github.com/WeepingDogel/drafts/blob/main/C/a.c)

Or here:

```c
/*
Score to Grade ABCDEF

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

# Reference Links

* [C switch Statement](https://www.tutorialspoint.com/cprogramming/switch_statement_in_c.htm)
* [C Library Function – printf()](https://www.tutorialspoint.com/c_standard_library/c_function_printf.htm)
* [C Library Function – scanf()](https://www.tutorialspoint.com/c_standard_library/c_function_scanf.htm)
