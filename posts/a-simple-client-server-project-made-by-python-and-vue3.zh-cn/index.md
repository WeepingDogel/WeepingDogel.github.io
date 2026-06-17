# 用 Python 和 Vue3 制作的简单客户端服务器项目


<!--more-->

# 简介
![图 01](/img/figure_01.drawio.png)

本演示将展示一个用户列表，其中包含头像、用户名和描述，这些是从后台获取的数据。

首先，vue3 制作的客户端页面会向服务器发送请求，然后服务器响应并传输 JSON 类型的数据。然后，客户端页面接受这些数据并渲染页面。

# 后端
HTTP 服务由 [FastAPI](https://fastapi.tiangolo.com/)提供，它是 Python 的高性能 Web 框架。

![图 02](/img/figure_02.drawio.png)

启动后，它会将 json 文件 `user_list.json` 作为变量读入 RAM。

![图 03](/img/figure_03.drawio.png)

![图 04](/img/figure_04.drawio.png)

当收到来自任何客户端的 URL `/userdata/list`的 HTTP 请求时，它将读取 RAM 中的 JSON 数据并发送给客户端。

下面是 JSON 文件。

```json
[
  {
    "id": 1,
    "name": "WeepingDogel",
    "type": "dog",
    "age": 20,
    "avatar": "/static/WeepingDogel.jpg"
  },
  {
    "id": 2,
    "name": "kira-pgr",
    "type": "cat",
    "age": 18,
    "avatar": "/static/kira-pgr.png"
  },
  {
    "id": 3,
    "name": "kara",
    "type": "cat",
    "age": 19,
    "avatar": "/static/kara.jpg"
  },
  {
    "id": 4,
    "name": "Felix Yan",
    "type": "fox(?)",
    "age": 30,
    "avatar": "/static/felix.jpg"
  },
  {
    "id": 5,
    "name": "Old Herl",
    "type": "cat",
    "age": 400,
    "avatar": "/static/old_herl.jpg"
  },
  {
    "id": 6,
    "name": "Episode 33",
    "type": "-/@”～、",
    "age": 17,
    "avatar": "/static/episode-33.jpg"
  }
]
```

让我们开始编写代码。首先，我们需要创建一个 Python 虚拟环境并导入 fastapi 软件包。

```commandline
$ python -m venv venv
```
使用 `pip` 安装 fastapi 库，并建立一个根 API URL 以运行 Web 服务器。

```commandline
$ pip install "fastapi[all]"
```

```python
# encoding=UTF-8
# filename=main.py
from fastapi import FastAPI

app = FastAPI()


@app.get('/')
async def root():
    return {"message": "Hello"}

```

客户端在接收数据以渲染页面时，仍会访问服务器以获取静态文件。

因此，让我们挂载静态文件目录。

```commandline
$ ls src/static/ -lh
总计 396K
-rw-r--r-- 1 weepingdogel weepingdogel 89K  3月 3日 18:51 episode-33.jpg
-rw-r--r-- 1 weepingdogel weepingdogel 87K  3月 3日 18:35 felix.jpg
-rw-r--r-- 1 weepingdogel weepingdogel 45K  3月 3日 15:52 kara.jpg
-rw-r--r-- 1 weepingdogel weepingdogel 93K 12月18日 11:34 kira-pgr.png
-rw-r--r-- 1 weepingdogel weepingdogel 36K  3月 3日 18:37 old_herl.jpg
-rw-r--r-- 1 weepingdogel weepingdogel 34K  1月 6日 16:20 WeepingDogel.jpg

```

在 `main.py` 当中加入以下代码：

```python
from fastapi.staticfiles import StaticFiles

app.mount('/static', StaticFiles(directory="src/static"), name="static")

```

然后，我们需要创建一个路由器 `/userdata`，在其他路径或同一目录下创建一个新文件 `router_userdata.py`。

```python
# encoding=UTF-8
# filename=router_resources.py

from fastapi import APIRouter
import json

userdata_router = APIRouter(
    prefix='/userdata',
    tags=['userdata'],
    responses={404: {"Description": "Not Found"}}
)

```

现在，我们需要打开 json 文件，并将内容作为变量存储到内存中。

```python
user_list: list = json.loads(open('src/data/user_list.json').read())
```

最后，我们创建一个 URL 路由器，提供获取数据的 API。

```python
# encoding=UTF-8
# filename=router_resources.py

from fastapi import APIRouter
import json

userdata_router = APIRouter(
    prefix='/userdata',
    tags=['userdata'],
    responses={404: {"Description": "Not Found"}}
)


user_list: list = json.loads(open('src/data/user_list.json').read())


@userdata_router.get('/list')
def read_user_list():
    """
    Read a user list from a json file.
    :return: A user list.
    """

    return user_list

```

现在用 uvicorn 启动服务器。

```commandline
uvicorn  src.main:app --reload
```

# 前端

现在是前端必须负责的工作了。让我们先用 yarn 创建一个 vue3 项目。

```commandline
$ yarn create vue
```

然后删除之前的组件，本演示中不需要它们。只需重写`App.vue`的代码即可。

在发送获取数据的请求之前，如果启用了**Typescript**，我们需要定义两种类型来包含数据。

```typescript
type User = {
  id: Number;
  name: string;
  user_type: string;
  age: Number;
  avatar: string;
};

type UserList = User[];
```

根据 Vue3 的 [生命周期](https://vuejs.org/api/options-state.html)，需要在 `mount` 生命周期中创建并使用一个方法。我们必须在 `data()` 状态中定义一个全局变量，并在 `methods` 状态中定义一个同步函数。

```vue
export default { 
  data() { 
    return { 
      user_list: [] as UserList 
      }; 
    }, 
    methods: {
      async GetUserList() {}, 
  }, 
};
```

现在，我们需要通过 `axios` 发送一个请求。

```typescript
import axios from "axios";
```

```typescript
async GetUserList() {
  try {
    const response = await axios.get<UserList>("/userdata/list");
    this.user_list = response.data;
    } catch (error) {
      console.log(error);
  }
},
```

然后，我们需要在 `mount` 生命周期中运行该函数。

```vue
mounted() { 
  this.GetUserList(); 
},
```

下面是在 `<script>` 标记中完成的代码：

```typescript
import axios from "axios";

type User = {
  id: Number;
  name: string;
  user_type: string;
  age: Number;
  avatar: string;
};

type UserList = User[];

export default {
  data() {
    return {
      user_list: [] as UserList,
    };
  },
  methods: {
    async GetUserList() {
      try {
        const response = await axios.get<UserList>("/userdata/list");
        this.user_list = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.GetUserList();
  },
};
```
通过 "v-for "属性[渲染](https://vuejs.org/guide/extras/render-function.html#v-for)模板中的数据。

```html
<template>
  <div class="bg">
    <div class="user-list">
      <div class="user-card" v-for="items of user_list">
        <div class="user-image">
          <img :src="items.avatar" />
        </div>
        <div class="user-info">
          <p class="user-name">{{ items.name }}</p>
          <p class="description">
            A {{ items.user_type }}, {{ items.age }} years old.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
```

启动 developerment 服务器，你会看到如下页面：

```commandline
$ yarn dev
```

![](/img/2024-03-05-15-44-38屏幕截图.png)

最后，我们只需在`<style scoped>`标记内完成 CSS，以美化样式。

```css
@keyframes FadeIn {
  from {
    scale: 0.75;
    opacity: 0;
  }
  to {
    scale: 1;
    opacity: 1;
  }
}

@keyframes BackgroundColor {
  from {
    background-color: #f1f1f1;
  }
  to {
    background-color: #dfaed4;
  }
}

.bg {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dfaed4;
  animation: BackgroundColor 5s;
}

.user-list {
  width: 450px;
  height: 800px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 20px;
  animation: FadeIn 1.5s;
}

.user-card {
  width: 100%;
  height: auto;
  display: flex;
  padding: 20px;
  flex-direction: row;
  border-bottom: solid 1px #ebebeb;
}

.user-image {
  width: 120px;
  height: 120px;
  border-radius: 100%;
}

.user-image img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.user-info {
  position: relative;
  left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.user-name {
  line-height: 60px;
  font-size: 32px;
}

.description {
  font-size: 22px;
  line-height: 30px;
}
```

您将在浏览器中看到一个包含用户列表的优雅页面。

![](/img/2024-03-05-13-08-30屏幕截图.png)

# 结

在本项目中，我们成功演示了使用 Vue3 制作的前端客户端与由 FastAPI 支持的后端服务器之间的交互。通过建立连接，客户端从服务器请求用户数据、接收 JSON 响应并将其渲染到网页上，我们展示了一个基本的全栈网络应用程序流程。

使用 FastAPI 构建的后端服务器是数据存储文件 `user_list.json` 和客户端之间的中介。在端点 `/userdata/list` 上接收到用户数据请求后，服务器会读取存储在内存中的 JSON 数据，然后用用户列表做出响应，并将其发送回客户端以供显示。

使用 Vue3 开发的前端使用 Axios 向后端服务器发送请求，检索用户数据，并动态更新网页以显示用户头像、姓名和描述。客户端和服务器之间无缝的数据流说明了网络开发中前端和后端分离的原则。

通过将 Vue3、FastAPI、Python 和 Axios 等技术相结合，我们展示了一种简单而有效的方法，即利用现代工具和最佳实践来构建网络应用程序。该项目为创建更复杂、功能更丰富的应用程序奠定了基础，突出了网络开发中高效数据获取、处理和渲染的重要性。

