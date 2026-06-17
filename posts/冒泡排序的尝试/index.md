# Attempt at Bubble Sort


<!--more-->
# Preface

Well... I've encountered another problem:

> Input 4 integers, sort them from smallest to largest.

Wow... this seems simple but it's not that easy to write.

I wrote two solutions based on tutorials I found on Google.

One is the pointer swap method:
* [drafts/swap_sort.c at main · WeepingDogel/drafts · GitHub](https://github.com/WeepingDogel/drafts/blob/main/C/swap_sort.c)

The other is bubble sort:
* [drafts/bbsort.c at main · WeepingDogel/drafts · GitHub](https://github.com/WeepingDogel/drafts/blob/main/C/bbsort.c)

This article will describe using the bubble sort method to solve this problem.

# Bubble Sort

What is bubble sort?

> Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.
>
> —— [Bubble sort - Wikipedia](https://en.wikipedia.org/wiki/Bubble_sort)

Well... what's the process of bubble sort?

> 1. Compare adjacent elements. If the first is bigger than the second, swap them.
> 2. Do the same for each pair of adjacent elements, from the first pair to the last. After this step, the last element will be the largest.
> 3. Repeat the above steps for all elements except the last one.
> 4. Keep repeating for fewer and fewer elements until no pairs need to be compared.
>
> —— [Bubble sort - Wikipedia](https://en.wikipedia.org/wiki/Bubble_sort)

Let's also look at Wikipedia's pseudocode and mnemonic code:

> ```c#
> function bubble_sort (array, length) {
>     var i, j;
>     for(i from 0 to length-1){
>         for(j from 0 to length-1-i){
>             if (array[j] > array[j+1])
>                 swap(array[j], array[j+1])
>         }
>     }
> }
> ```
> ```basic
> function bubble_sort(array, length)
>     i from 0 to (length - 1)
>         j from 0 to (length - 1 - i)
>             if array[j] > array[j + 1]
>                 swap array[j] and array[j + 1]
>             end if
>         end j loop
>     end i loop
> end function
> ```
> Mnemonic code:
> ```r
> i∈[0,N-1)               // loop N-1 times
>   j∈[0,N-1-i)           // the unordered part each pass
>     swap(j,j+1)          // pairwise sort (ascending/descending)
> ```

After reading this, it's not hard to understand. The variables `i` and `j` are used to locate positions in the array. By cycling through increments and decrements for comparison, if one is bigger than the other, their positions are swapped.

Each cycle of `j`'s `for` loop performs one comparison and swap. Each cycle of `i`'s `for` loop runs `j`'s `for` loop once. This repeats until the loop ends and no pairs need to be compared.

Next, I'll implement the bubble sort algorithm and solve the problem's requirement using Python and C respectively.

# Process

## Python
First, let's try with Python.

Declare the function `sort()`, with parameter `arr` to represent the array:

```python
def sort(arr):
```

Set variables `i` and `j`, and use `for` to loop `i` from `1` to `arr.length - 1`:

```python
for i in range(1, len(arr)):
```

```python
def sort(arr):
    for i in range(1, len(arr)):

```

Next, create another loop inside the previous one, using `for` to loop `j` from `0` to `arr.length - 1 - i`:

```python
for j in range(0, len(arr) - i):
```

```python
def sort(arr):
    for i in range(1, len(arr)):
        for j in range(0, len(arr) - i):

```

Then, inside the `j` loop, compare elements. If `arr[j]` is greater than `arr[j+1]`, swap their values:

```python
if (arr[j] > arr[j+1]):
    arr[j], arr[j+1] = arr[j+1], arr[j]
```

```python
def sort(arr):
    for i in range(1, len(arr)):
        for j in range(0, len(arr) - i):
            if (arr[j] > arr[j+1]):
                arr[j], arr[j+1] = arr[j+1], arr[j]
```

Finally, return the sorted array:

```python
return arr
```

```python
def sort(arr):
    for i in range(1, len(arr)):
        for j in range(0, len(arr) - i):
            if (arr[j] > arr[j+1]):
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
```

Now the sorting function is complete. Let's input four integers according to the problem and test it:

```python
arr = [73837372882, 2772828191919, 82828282828, 828282728181]
print(sort(arr))
```

Output:
```txt
[73837372882, 82828282828, 828282728181, 2772828191919]
```

Clearly, it's arranged from smallest to largest. :)

Python has successfully implemented bubble sort.

## C

Next, let's implement it in C. But first, we need to check how C's `for(){}` statement works.

> ![](https://www.runoob.com/wp-content/uploads/2014/09/69978E61-0BA5-4D66-A115-D3AD15B16F47.jpg)
>
> ```c
> for ( init; condition; increment )
> {
>    statement(s);
> }
> ```
>
> The control flow of the for loop:
> 1. `init` is executed first, and only once. This step allows you to declare and initialize any loop control variables. You can also leave it empty, as long as there's a semicolon.
> 2. Next, `condition` is evaluated. If true, the loop body executes. If false, the loop terminates.
> 3. After executing the loop body, control flow jumps back to the `increment` statement. This allows you to update loop control variables. It can be left empty.
> 4. The condition is evaluated again. If true, the loop repeats.
>
> —— [C for loop - Tutorialspoint](https://www.tutorialspoint.com/cprogramming/c_for_loop.htm)

This is different from Python, but the general flow is similar. :)

Since C doesn't have Python's `len()` function, we need to provide the length parameter `int len` in the sorting function.

We calculate this value using the `sizeof()` function:

```c
int len = sizeof(arr) / sizeof(*arr);
```

But that's outside the sorting function — it goes in the main function.

Now let's write the sorting function. Declare `void sort(){}` with two parameters `int arr[]` and `int len`:

```c
#include<stdio.h>

void sort(int arr[], int len)
{

}
```

Next, define three integer variables: `i`, `j`, and `temp`. In C, `temp` will be the temporary variable used for swapping:

```c
int i, j, temp;
```

```c
#include<stdio.h>

void sort(int arr[], int len)
{
    int i, j, temp;
}
```

Now create the `for` loop, with `i` starting from 0 and incrementing until `i < len - 1` is no longer true:

```c
for (i = 0; i < len - 1; i++)
{

}
```

```c
#include<stdio.h>

void sort(int arr[], int len)
{
    int i, j, temp;
    for (i = 0; i < len - 1; i++)
    {

    }
}
```

Then create another `for` loop inside, with `j` starting from 0 and incrementing until `j < len - 1 - i` is no longer true:

```c
for (j = 0; j < len - 1 - i; j++)
{

}
```

```c
#include<stdio.h>

void sort(int arr[], int len)
{
    int i, j, temp;
    for (i = 0; i < len - 1; i++)
    {
        for (j = 0; j < len - 1 - i; j++)
        {

        }
    }
}
```

Now compare and swap inside the inner loop. If `arr[j]` is greater than `arr[j + 1]`, swap their values — first assign `arr[j]` to `temp`, then assign `arr[j+1]` to `arr[j]`, and finally assign `temp` to `arr[j+1]`:

```c
if (arr[j] > arr[j+1])
{
    temp = arr[j];
    arr[j] = arr[j+1];
    arr[j+1] = temp;
}
```

```c
#include<stdio.h>

void sort(int arr[], int len)
{
    int i, j, temp;
    for (i = 0; i < len - 1; i++)
    {
        for (j = 0; j < len - 1 - i; j++)
        {
            if (arr[j] > arr[j+1])
            {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}
```

Now the sorting function is complete. Let's write the main function:

```c
#include<stdio.h>

int main()
{

}
```

The problem asks us to input four integers. Define four integer variables and use `scanf()` to read the input values:

```c
int n1, n2, n3, n4;
printf("please type four numbers:");
scanf("%d%d%d%d", &n1, &n2, &n3, &n4);
```

```c
#include<stdio.h>

int main()
{
    int n1, n2, n3, n4;
    printf("please type four numbers:");
    scanf("%d%d%d%d", &n1, &n2, &n3, &n4);
}
```

Next, define an integer array and add the four numbers:

```c
int arr[] = {n1, n2, n3, n4};
```

```c
#include<stdio.h>

int main()
{
    int n1, n2, n3, n4;
    printf("please type four numbers:");
    scanf("%d%d%d%d", &n1, &n2, &n3, &n4);
    int arr[] = {n1, n2, n3, n4};
}
```

Define an integer variable `len` to calculate the array length:

```c
int len = (int)sizeof(arr) / sizeof(*arr);
```

```c
#include<stdio.h>

int main()
{
    int n1, n2, n3, n4;
    printf("please type four numbers:");
    scanf("%d%d%d%d", &n1, &n2, &n3, &n4);
    int arr[] = {n1, n2, n3, n4};
    int len = (int)sizeof(arr) / sizeof(*arr);
}
```

Call the sorting function:

```c
sort(arr, len);
```

```c
#include<stdio.h>

int main()
{
    int n1, n2, n3, n4;
    printf("please type four numbers:");
    scanf("%d%d%d%d", &n1, &n2, &n3, &n4);
    int arr[] = {n1, n2, n3, n4};
    int len = (int)sizeof(arr) / sizeof(*arr);
    sort(arr, len);
}
```

Now `arr[]` is sorted in ascending order. Finally, create a `for` loop to output the array:

```c
int i;
for (i = 0; i < len; i++)
{
    printf("%d ", arr[i]);
}
```

```c
#include<stdio.h>

int main()
{
    int n1, n2, n3, n4;
    printf("please type four numbers:");
    scanf("%d%d%d%d", &n1, &n2, &n3, &n4);
    int arr[] = {n1, n2, n3, n4};
    int len = (int)sizeof(arr) / sizeof(*arr);
    sort(arr, len);
    int i;
    for (i = 0; i < len; i++)
    {
        printf("%d ", arr[i]);
    }
    return 0;
}
```

(Don't forget `return 0;`)

Now compile and run:

```txt
$ gcc filename.c -o /tmp/filename
```

```txt
$ /tmp/filename
```

Output:
```txt
type four numbers:
54 87 25 65
25 54 65 87 
```

Clearly, each number is arranged from smallest to largest. Bubble sort in C has been successfully implemented. :)

# Complete Code

## Python
GitHub: [drafts/bbsort.py at main · WeepingDogel/drafts · GitHub](https://github.com/WeepingDogel/drafts/blob/main/Python/bbsort.py)

```python
'''
Bubble Sort
Python Example
By WeepingDogel
'''
def sort(arr):
    for i in range(1, len(arr)):
        for j in range(0, len(arr) - i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

arr = [73837372882, 2772828191919, 82828282828, 828282728181]

print(sort(arr))
```

## C
GitHub: [drafts/bbsort.c at main · WeepingDogel/drafts · GitHub](https://github.com/WeepingDogel/drafts/blob/main/C/bbsort.c)

```c
/*
Bubble Sort
C Language Example
By WeepingDogel
*/
#include<stdio.h>

void sort(int arr[], int len)
{
    int i, j, temp;
    for(i = 0; i < len - 1; i++)
    {
        for(j = 0; j < len - 1 - i; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main()
{
    int n1, n2, n3, n4;
    printf("type four numbers:\n");
    scanf("%d%d%d%d", &n1, &n2, &n3, &n4);
    int arr[] = {n1, n2, n3, n4};
    int len = (int)sizeof(arr) / sizeof(*arr);
    sort(arr, len);
    int i;
    for(i = 0; i < len; i++)
    {
        printf("%d ", arr[i]);
    }
    return 0;
}
```

# Reference Links

* [C Arrays - Tutorialspoint](https://www.tutorialspoint.com/cprogramming/c_arrays.htm)
* [C for Loop - Tutorialspoint](https://www.tutorialspoint.com/cprogramming/c_for_loop.htm)
* [C Basic Syntax - Tutorialspoint](https://www.tutorialspoint.com/cprogramming/c_basic_syntax.htm)
* [C Data Types - Tutorialspoint](https://www.tutorialspoint.com/cprogramming/c_data_types.htm)
* [Python for Loop - Tutorialspoint](https://www.tutorialspoint.com/python/python_for_loop.htm)
* [Bubble sort - Wikipedia](https://en.wikipedia.org/wiki/Bubble_sort)
* [Three Ways to Get Array Length in C - Tencent Cloud Community](https://cloud.tencent.com/developer/article/1736013)
