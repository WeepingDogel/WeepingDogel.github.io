# Python Study Notes - File Operations


<!--more-->
## File Operations
### open

`open()` is the key function in Python for file operations, with two parameters that need to be set:

* Filename - the name of the file, self-explanatory
* Mode - determines if the file being opened can be read/written to or has other attributes.

```python
open('filename','mode')
```

### Reading
Open a file in read-only mode:

```python
f = open("filename.txt")
```

This is equivalent to:

```python
f = open("filename","rt")
```
**"r"** indicates to read

**"t"** indicates that the file is text, this is the default setting for the function, so it can be omitted.

Here's a list from [w3schools](https://www.w3schools.com/python/python_file_handling.asp):

>There are four different methods (modes) for opening a file:
>
>>"r" - Read - Default value. Opens a file for reading, error if the file does not exist
>
>>"a" - Append - Opens a file for appending, creates the file if it does not exist
>
>>"w" - Write - Opens a file for writing, creates the file if it does not exist
>
>>"x" - Create - Creates the specified file, returns an error if the file exists
>
> In addition you can specify if the file should be handled as binary or text mode
>
>>"t" - Text - Default value. Text mode
>
>>"b" - Binary - Binary mode (e.g. images)

For example, let's say we have a file:

```
/home/weepingdogel/test.txt
---
Hello!I love Python.
```

We can read the file without specifying the mode parameter:

```python
f = open('test.txt')
print(f.read())
```

Output:

```
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.
```

Or we can specify it:

```python
f = open('test.txt', 'rt')
print(f.read())
```

Output:

```
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.
```

### Reading lines

File:

```
/home/weepingdogel/test.txt
---
Hello!I love Python.
Have a nice day!
Good luck!
```

When we encounter a multiline file, we can choose to read only one line at a time using `f.readline()`

For example:

```python
f = open('test.txt')
print(f.readline())
```

Output:

```
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.
```

If we need two lines:

```python
f = open('test.txt')
print(f.readline())
print(f.readline())
```

Output:

```
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.

Have a nice day!
```

If we need three lines:

```python
f = open('test.txt')
print(f.readline())
print(f.readline())
print(f.readline())
```

Output:

```
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.

Have a nice day!

Good luck!


```

This usage reads line by line and prints with line breaks.

You may need it when reading configuration files...

Of course, we can also use a `for()` loop to read all lines at once:

```python
f = open('test.txt')
for x in f:
    print(x)
```

Output:

```
weepingdogel@WeepingDogel ~> python test.py
Hello!I love Python.

Have a nice day!

Good luck!
```

I think using `for` is more efficient...

### Closing files
Nothing much to say here...
```python
f = open('test.txt')
print(f.read())
f.close()
```
The effect is similar to the previous example.
> I won't provide debugging results below, it's too late.

### Creating

**"x"** indicates creating a new file. If the specified filename already exists, an error will be returned.

```python
f = open("test.txt","x")
```

Try it out yourself, nothing much else.

### Writing to a file

The character `'a'` represents adding content to an existing file without deleting or overwriting its original contents.

For example:

```python
f = open("test.txt","a")
f.write("加入内容 / content added.")
```

The above string will be added to the file.

The character `'w'` represents overwriting the file, which will replace any existing content.

For example:

```python
f = open("test.txt", "w")
f.write("加入内容 / content added.")
```

In this case, only the string specified will exist in the file.

### Deleting a file

You need to use the `os` module and its `os.remove()` function. Simply type `import os` to import it.

```python
import os
os.remove("test.txt")
```

#### Classic example
Check if a file exists, delete it if it does, or display a message if it doesn't.

#### Deleting a directory

Use `os.rmdir()`.

```python
import os
os.rmdir("foldername")
```

## Conclusion

These are the basics of file read/write operations that you should know.

If you're having trouble understanding, you can try running the following code with different `open()` mode parameters.

Summary code:

```python
import os
import datetime

def sign():
    # Program identification
    print(
'''
╭╮╭╮╭╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━━━╮╱╱╱╱╱╱╱╱╭╮
┃┃┃┃┃┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰╮╭╮┃╱╱╱╱╱╱╱╱┃┃
┃┃┃┃┃┣━━┳━━┳━━┳┳━╮╭━━╮┃┃┃┣━━┳━━┳━━┫┃
┃╰╯╰╯┃┃━┫┃━┫╭╮┣┫╭╮┫╭╮┃┃┃┃┃╭╮┃╭╮┃┃━┫┃
╰╮╭╮╭┫┃━┫┃━┫╰╯┃┃┃┃┃╰╯┣╯╰╯┃╰╯┃╰╯┃┃━┫╰╮
╱╰╯╰╯╰━━┻━━┫╭━┻┻╯╰┻━╮┣━━━┻━━┻━╮┣━━┻━╯
╱╱╱╱╱╱╱╱╱╱╱┃┃╱╱╱╱╱╭━╯┃╱╱╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╱╱╱╱╰╯╱╱╱╱╱╰━━╯╱╱╱╱╱╱╰━━╯
'''
    )

def filecrt(filename):
    # File creation
    if os.path.exists(filename): # Check if the file exists
        print(str(datetime.datetime.now()) + ": The file already exists")
        return 0
    else:
        f = open(filename,'x')
        f.close()
        print(str(datetime.datetime.now()) + ": Created file: " + filename)
        return 1

def filewrt(filename):
    fruits = ['apple', 'banana', 'strawberry','orange'] # Specify the contents to be written
    # File write operation
    f = open(filename, 'w')
    for fruit in fruits:
        f.write(fruit + '\n')
        print(str(datetime.datetime.now()) + ": Writing: " + fruit)
    f.close()

def filedel(filename):
    # Delete file operation
    if os.path.exists(filename):
        os.remove(filename)
        print(str(datetime.datetime.now()) + ": Deleted file: " + filename)
    else:
        print(str(datetime.datetime.now()) + ": " + filename + " does not exist")

def fileread(filename):
    print(str(datetime.datetime.now()) + ": Reading..." )
    f = open(filename,'r')
    print("-" * 5 + " File contents " + "-" * 5 + "\n")
    print(f.read())
    print("-" * 5 + " File contents " + "-" * 5 + "\n")

sign()

if filecrt("test.txt") == 0:
    fileread("test.txt")
    filedel("test.txt")
else:
    filewrt("test.txt")
    fileread("test.txt")
    filedel("test.txt")
```
