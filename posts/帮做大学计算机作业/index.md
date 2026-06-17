# Help with College Computer Homework


<!--more-->
## Introduction

Help with homework qwq... 

I haven't played with C language for a long time, let me try to see if I can do it.

>PS: I'm on Linux, the execution method may be different. If you are on Windows, you need an editor to run it.
>
>For example, Dev C++, VS 2019, etc.

## Experiment Eleven

> Experiment Eleven
>
> Objective:
> * Understand C programming concepts
> * Understand C program design framework
> 
> Contents:
> 
> Input a grade and output its level rating.

This is straightforward. We need to list several grade levels:

* Excellent
    * 80 ~ 100 points [80,100]
* Pass
    * 60~79 points [60,79]
* Fail
    * Below 60 points [0,60)

In the code, we can use expressions to represent the intervals, for example:

```c
score >= 80 && score <= 100
```

Then we use if() to determine the grade level.

```c
#include<stdio.h>
int main(){
    int score = 85;
     if(score >= 80 && score <= 100){
        printf("The grade is excellent");
    }else if(score >= 60 && score <= 79){
        printf("The grade is pass");
    }else if(score >= 0 && score < 60){
        printf("The grade is fail");
    }
}
```

Next, we run the program.

Output:

```
weepingdogel@WeepingDogel /tmp> make test
cc     test.c   -o test
weepingdogel@WeepingDogel /tmp> ./test
The grade is excellent⏎     
```

Then we need to get the user's input for the grade, like this, using the `scanf()` function to get the user's input and assign it to an integer variable `score`.

```c
#include<stdio.h>
int main(){
    int score;
    printf("Enter your grade:");
    scanf("%d",&score);
    printf("%d",score);
}
```

Next, we combine these two pieces of code together.

The complete code is as follows:

```c
#include<stdio.h>
int main(){
    int score;
    printf("Enter your grade:");
    scanf("%d",&score);
    if(score >= 80 && score <= 100){
        printf("The grade is excellent");
    }else if(score >= 60 && score <= 79){
        printf("The grade is pass");
    }else if(score >= 0 && score < 60){
        printf("The grade is fail");
    }
}
```

The idea is to first use `scanf()` function to get the user's input for the grade, then use `if()` statements to compare and output the result.

This is the output:

```
weepingdogel@WeepingDogel /tmp> make test
cc     test.c   -o test
weepingdogel@WeepingDogel /tmp> ./test
Enter your grade:99
The grade is excellent⏎                                                        
weepingdogel@WeepingDogel /tmp> ./test
Enter your grade:85
The grade is excellent⏎                                                        
weepingdogel@WeepingDogel /tmp> ./test
Enter your grade:60
The grade is pass⏎                                                        
weepingdogel@WeepingDogel /tmp> ./test
Enter your grade:59
The grade is fail⏎                       
```

## Experiment 12

>
>Experiment Purpose:
>
> *    Understand C program design ideas
> *   Understand C program design frameworks
>
>Task content
>
> * Requires writing a program that registers and then logs in, outputting the format shown in the following figure:
>
>```
>--------------------------------------
>               Registration Interface
>Please enter your registration username: Ly
>Please enter your registration password: 123
>Congratulations! Registration successful!
>--------------------------------------
>
>--------------------------------------
>               Login Interface
>Please enter your login username: Ly
>Please enter your login password: 123
>Login successful!
>--------------------------------------
>
>--------------------------------------
>               Login Interface
>Please enter your login username: Ly
>Please enter your login password: 1234
>Login failed!
>--------------------------------------
>```
>
> * Define 4 variables to save the registered username, password and login username, password respectively.
> * Use if...else statement to complete the judgment of the username and password.
>

To put it simply... it uses `scanf()` to get input, assigns the values to variables, and then performs the judgment...

Pft! Alright, here's the code, no explanation needed...

```c
#include<stdio.h>
#include<string.h>
int main(){
    /* Define 4 variables to save the registered username,
    password and login username, password respectively */
    char username_sign[40];
    char password_sign[16];
    char username_login[40];
    char password_login[16];
    /* Define 4 variables to save the registered username,
    password and login username, password respectively */
    printf("--------------------------------------\n               Registration Interface\n");
    printf("Please enter your registration username:");
    scanf("%s", username_sign);
    printf("Please enter your registration password:");
    scanf("%s", password_sign);
    printf("Congratulations! Registration successful!");
    printf("\n--------------------------------------");
    /* Use scanf() to get input */
    printf("\n\n--------------------------------------\n               Login Interface\n");
    printf("Please enter your login username:");
    scanf("%s",username_login);
    printf("Please enter your login password:");
    scanf("%s",password_login);
    /* Use if...else statement to complete the judgment of the username and password */
    /* Uses the strcmp() function here */
    if(strcmp(username_login,username_sign) == 0 && strcmp(password_login,password_sign) == 0){
        printf("Login successful!");
    }else{
        printf("Login failed!");
    }
    printf("\n--------------------------------------");
}
```

However, it's worth noting that this string comparison method is slightly different. It requires using the `strcmp()` function, something like this.

```c
if(strcmp(username_login,username_sign) == 0 && strcmp(password_login,password_sign) == 0){
        printf("Login successful!");
    }else{
        printf("Login failed!");
    }
```

It seems to calculate a numerical value, which equals 0 if the two strings are the same. That's roughly how it works.

Let's take a look at the output...

```
weepingdogel@WeepingDogel /tmp> make test2
cc     test2.c   -o test2
weepingdogel@WeepingDogel /tmp> ./test2
--------------------------------------
               Registration Interface
Please enter your registration username:Ly
Please enter your registration password:123
Congratulations! Registration successful!
--------------------------------------

--------------------------------------
               Login Interface
Please enter your login username:Ly
Please enter your login password:123
Login successful!
--------------------------------------⏎                              

weepingdogel@WeepingDogel /tmp> ./test2
--------------------------------------
               Registration Interface
Please enter your registration username:Ly
Please enter your registration password:123
Congratulations! Registration successful!
--------------------------------------

--------------------------------------
               Login Interface
Please enter your login username:Ly
Please enter your login password:1234
Login failed!
--------------------------------------⏎     
```

And that's it!

## Closing Remarks

Actually, there are still some details that I might overlook due to carelessness, so I can't say "Is that it? Is that all?"

But relatively speaking, it's still quite simple... yeah...
