# 冒泡排序的尝试


# 序

嗯.. 又遇到了一个题

> 输入4个整数，从小到大排序

哇这个.. 看似简单其实写起来可不轻松呢。

我照着谷歌查到的教程写了两种办法..

一个是指针交换法
* [drafts/swap_sort.c at main · WeepingDogel/drafts · GitHub](https://github.com/WeepingDogel/drafts/blob/main/C/swap_sort.c)

另一个是冒泡排序
* [drafts/bbsort.c at main · WeepingDogel/drafts · GitHub](https://github.com/WeepingDogel/drafts/blob/main/C/bbsort.c)

本文将会描述用冒泡排序法解这个题

# 冒泡排序

什么是冒泡排序？

>冒泡排序（英语：Bubble Sort）又称为泡式排序，是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。 
>
> ——[冒泡排序 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-cn/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F)

嗯... 冒泡排序的过程是啥？
> 1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
> 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
> 3. 针对所有的元素重复以上的步骤，除了最后一个。
> 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
>
> ——[冒泡排序 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-cn/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F)

再来看看维基百科上的伪代码和助记码
>```c#
>function bubble_sort (array, length) {
>    var i, j;
>    for(i from 0 to length-1){
>        for(j from 0 to length-1-i){
>            if (array[j] > array[j+1])
>                swap(array[j], array[j+1])
>        }
>    }
>}
>```
>```basic
>函数 冒泡排序 输入 一个数组名称为array 其长度为length 
>    i 从 0 到 (length - 1) 
>        j 从 0 到 (length - 1 - i) 
>            如果 array[j] > array[j + 1] 
>                交换 array[j] 和 array[j + 1] 的值 
>            如果结束 
>        j循环结束 
>    i循环结束 
>函数结束
>```
>助记码
>```r
> i∈[0,N-1)               //循环N-1遍
>   j∈[0,N-1-i)           //每遍循环要处理的无序部分
>     swap(j,j+1)          //两两排序（升序/降序）
>```

看完之后其实不难理解，变量`i`和`j`其实是用来定位元素在数组中的位置，然后通过循环增减来进行比较，如果其中一个比另一个大就更换位置。

`j` 的 `for` 循环每循环一次比对交换一次，`i` 的 `for` 循环每循环一次执行一次 `j` 的 `for` 循环，周而复始，直到循环结束就已经没有任何一对数字需要比较。

接下来我将分别使用 Python 和 C 语言来实现冒泡了算法以及题目的需求。

# 过程

## Python
首先用 Python 试试看。

先声明变量 `sort()`，规定参数 `arr` 来表示数组:
```python
def sort(arr):
```
设置变量 `i` 和 `j`, 并用 `for` 从 `i` 开始循环`arr的长度-1`遍:
```python
for i in range(1,len(arr)):
```
```python
def sort(arr):
    for i in range(1,len(arr)):

```
接下来在上一个循环里面再创建一个循环, 用 `for` 从 `j` 开始循环 `arr 的长度 - 1 - i` 遍, 所以这里 `range()` 要从 0 开始了: 
```python
for j in range(0, len(arr) - i):
```
```python
def sort(arr):
    for i in range(1,len(arr)):
        for j in range(0, len(arr) - i):

```
然后我们在`j`这个循环里面开始比对元素, 如果`arr[j]`大于`arr[j+1]`则将二者的值相互交换一下：
```python
if (arr[j] > arr[j+1]):
    arr[j],arr[j+1] = arr[j+1],arr[j]
```
```python
def sort(arr):
    for i in range(1,len(arr)):
        for j in range(0,len(arr) - i):
            if (arr[j] > arr[j+1]):
                arr[j],arr[j+1] = arr[j+1],arr[j]
```
最后我们返回转换好的数组:
```python
return arr
```
```python
def sort(arr):
    for i in range(1,len(arr)):
        for j in range(0,len(arr) - i):
            if (arr[j] > arr[j+1]):
                arr[j],arr[j+1] = arr[j+1],arr[j]
    return arr
```

这样以来排列函数就写好了，接下来我们按照题目的要求输入四个整数再输出看看:
```python
arr = [73837372882, 2772828191919, 82828282828,828282728181]
print(sort(arr))
```
输出:
```txt
[73837372882, 82828282828, 828282728181, 2772828191919]
```

很明显是按从小到大的数据排列的。:)

这样一来 Python 就成功实现冒泡排序了。

## C

接下来我们使用 C 语言来实现一下，不过在此之前我们看看 C 语言的 `for(){}` 语句是怎样的。
>![](https://www.runoob.com/wp-content/uploads/2014/09/69978E61-0BA5-4D66-A115-D3AD15B16F47.jpg)
>
>```c
>for ( init; condition; increment )
>{
>   statement(s);
>}
>```
>
>for 循环的控制流：
>1. init 会首先被执行，且只会执行一次。这一步允许您声明并初始化任何循环控制变量。您也可以不在这里写任何语句，只要有一个分号出现即可。
>2. 接下来，会判断 condition。如果为真，则执行循环主体。如果为假，则不执行循环主体，且控制流会跳转到紧接着 for 循环的下一条语句。
>3. 在执行完 for 循环主体后，控制流会跳回上面的 increment 语句。该语句允许您更新循环控制变量。该语句可以留空，只要在条件后有一个分号出现即可。
>4. 条件再次被判断。如果为真，则执行循环，这个过程会不断重复（循环主体，然后增加步值，再然后重新判断条件）。在条件变为假时，for 循环终止。
>
> ——[C for 循环 | 菜鸟教程](https://www.runoob.com/cprogramming/c-for-loop.html)

这跟 Python 又不一样了，不过流程大致上是相同的。 :)

由于 C 语言没有 Python 当中的 `len()` 函数来取长度，因此我们得在循环函数提供长度参数`int len()`了。
而这个参数的值我们需要利用`sizeof()`函数计算地址来算。
```c
int len = sizeof(arr)/sizeof(*arr);
```
不过这是循环函数之外的事情，回写在主函数里面。

接下来我们先写循环函数,声明函数 `void sort(){}`, 规定两个参数 `int arr[]` 和 `int len`：

```c
#include<stdio.h>

void sort(int arr[], int len)
{

}
```
接下来定义三个整型变量，分别为 `i`,`j`,`temp`， 由于语法不同，在 C 语言中变量 `temp` 将作为交换两个数组元素值而设置的中间值：
```c
int i,j,temp;
```
```c
#include<stdio.h>

void sort()
{
    int i,j,temp;
}
```

接下来创建 `for` 循环, 规定 `i` 从 0 开始一增加，直到不满足 `i < len - 1;` 为止并跳出循环：
```c
for (i = 0; i < len - 1; i++)
{

}
```
```c
#include<stdio.h>

void sort()
{
    int i,j,temp;
    for (i = 0; i < len - 1; i++)
    {

    }
}
```
然后在上一个 `for` 循环里面再创建一个 `for` 循环，规定 `j` 从 0 开始一直增加，直到不满足 `j < len - 1 - i` 为止并跳出循环：
```c
for (j = 0;j < len - 1 - i;j++)
{

}
```
```c
#include<stdio.h>

void sort()
{
    int i,j,temp;
    for (i = 0; i < len - 1; i++)
    {
        for (j = 0;j < len - 1 - i;j++)
        {

        }
    }
}
```
然后就开始在循环圈里比对大小和交换了,如果 `arr[j]` 大于 `arr[j + 1]`，则将他们的值交换，先把 `arr[j]` 的值赋给 `temp`, 再把 `arr[j+1]` 的值赋给 `arr[j]`, 最后将 `temp` 的值赋给 `arr[j+1]`:
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

void sort()
{
    int i,j,temp;
    for (i = 0; i < len - 1; i++)
    {
        for (j = 0;j < len - 1 - i;j++)
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
这样以来排序函数就写好了，接下来我们来写主函数里面的东西, 先定义主函数：
```c
#include<stdio.h>

int main()
{

}
```
题目要我们输入四个整数，我们定义四个整形变量，并通过`scanf()` 获取输入值并分别赋给他们:
```c
int n1,n2,n3,n4;
printf("please type four numbers:");
scanf("%d%d%d%d",n1,n2,n3,n4);
```
```c
#include<stdio.h>

int main()
{
    int n1,n2,n3,n4;
    printf("please type four numbers:");
    scanf("%d%d%d%d",n1,n2,n3,n4);
}
```
接下来定义整形数组`int arr[]={};`，将得到的这四个整数加入这个数组:
```c
int arr[] = {n1,n2,n3,n4};
```
```c
#include<stdio.h>

int main()
{
    int n1,n2,n3,n4;
    printf("please type four numbers:");
    scanf("%d%d%d%d",n1,n2,n3,n4);
    int arr[] = {n1,n2,n3,n4};
}
```
然后定义整形变量 len, 计算数组长度并赋值给它:
```c
int len = (int)sizeof(arr) / sizeof(*arr);
```
```c
#include<stdio.h>

int main()
{
    int n1,n2,n3,n4;
    printf("please type four numbers:");
    scanf("%d%d%d%d",n1,n2,n3,n4);
    int arr[] = {n1,n2,n3,n4};
    int len = (int)sizeof(arr) / sizeof(*arr);
}
```
然后我们调用刚刚写好的排序函数`sort();`：
```c
sort(arr,len);
```
```c
#include<stdio.h>

int main()
{
    int n1,n2,n3,n4;
    printf("please type four numbers:");
    scanf("%d%d%d%d",n1,n2,n3,n4);
    int arr[] = {n1,n2,n3,n4};
    int len = (int)sizeof(arr) / sizeof(*arr);
    sort(arr,len);
}
```
此时 `arr[]` 各项元素的位置都按照以小到大的顺序排列好了。最后我们需要定义一个用来确定位置的整形变量 `i` 再将这个数组用 `for` 循环输出就好了。

创建 `for` 循环, 规定 `i` 从 0 开始一直增加直到不满足 `i < len` 为止并跳出，每循环一次，输出一个以`i`为位置的元素：
```c
int i;
for(i = 0; i < len; i++)
    {
        printf("%d ",arr[i]);
    }
```
```c
#include<stdio.h>

int main()
{
    int n1,n2,n3,n4;
    printf("please type four numbers:");
    scanf("%d%d%d%d",n1,n2,n3,n4);
    int arr[] = {n1,n2,n3,n4};
    int len = (int)sizeof(arr) / sizeof(*arr);
    sort(arr,len);
    for(i = 0; i < len; i++)
    {
        printf("%d ",arr[i]);
    }
    return 0;
}
```
(还有不要忘了 `return 0;`)

接下来进行编译和运行
```txt
$ gcc 文件名.c -o /tmp/文件名
```
```txt
$ /tmp/文件名
```
输出:
```txt
type four numbers:
54 87 25 65
25 54 65 87 
```

很明显，每个数字都是按照从小到大的顺序排列的，C 语言下的冒泡排序就成功实现了。:)

# 完整代码
## Python
Github: [drafts/bbsort.py at main · WeepingDogel/drafts · GitHub](https://github.com/WeepingDogel/drafts/blob/main/Python/bbsort.py)
```python
'''
冒泡排序
Python 实例
By WeepingDogel
'''
def sort(arr):
    for i in range(1,len(arr)):
        for j in range(0, len(arr) - i):
            if arr[j] > arr[j+1]:
                arr[j],arr[j+1] = arr[j+1],arr[j]
    return arr
arr = [73837372882, 2772828191919, 82828282828,828282728181]

print(sort(arr))
```

## C
Github: [drafts/bbsort.c at main · WeepingDogel/drafts · GitHub](https://github.com/WeepingDogel/drafts/blob/main/C/bbsort.c)
```c
/*
冒泡排序 
C 语言实例
By WeepingDogel
*/
#include<stdio.h>

void sort(int arr[],int len)
{
    int i,j,temp;
    for(i = 0; i < len - 1; i++)
    {
        for(j = 0; j < len - 1 - i;j++)
        {
            if (arr[j] > arr[j + 1])
            {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j + 1] =temp;
            }
        }
    }
}
int main()
{
    int n1,n2,n3,n4;
    printf("type four numbers:\n");
    scanf("%d%d%d%d",&n1,&n2,&n3,&n4);
    int arr[] = {n1,n2,n3,n4};
    int len = (int)sizeof(arr) / sizeof(*arr);
    sort(arr,len);
    int i;
    for(i = 0; i < len; i++)
    {
        printf("%d ",arr[i]);
    }
    return 0;
}
```
# 参考链接

* [C 数组 | 菜鸟教程](https://www.runoob.com/cprogramming/c-arrays.html)
* [C for 循环 | 菜鸟教程](https://www.runoob.com/cprogramming/c-for-loop.html)
* [C 基本语法 | 菜鸟教程](https://www.runoob.com/cprogramming/c-basic-syntax.html)
* [C 数据类型 | 菜鸟教程](https://www.runoob.com/cprogramming/c-data-types.html)
* [Python for 循环语句 | 菜鸟教程](https://www.runoob.com/python/python-for-loop.html)
* [冒泡排序 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-cn/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F)
* [c语言获取数组长度的三种方法 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1736013)

