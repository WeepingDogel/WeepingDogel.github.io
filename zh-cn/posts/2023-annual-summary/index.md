# 2023 年度总结




尽管时间是人类定义的单位，但并不影响它像一条河流般从山坡像平原流逝。感觉只是喘口气，眨一下眼睛，2023年就这么过去了。

回想这些记忆，就像飘在半空中的樱花花瓣，我想踮起脚尖去捕捉，今年也发生了许多。
<!--more-->

现在就拾起花瓣看看，也许会让我把时光捡回来呢。

# 收获

过去的一年也学到了点东西。

## 知识 & 技能

2023 年，我学会了一些技能，并开了几个能看的开源项目，拓宽了一些视野。

### Flask
让我们从 Flask 之旅开始。

很早以前，我就发现自己陷入了 Flask 这个迷人的网络中，这是一个令人愉悦的 Python 网络应用程序框架。
使用 Flask 简单而高效的 MVC 结构设置并完成 [TinyGallery](https://github.com/WeepingDogel/tinygallery) 的快感在我的学习道路上留下了不可磨灭的印记。

深入研究 Flask 官方文档后，我发现了借助 jinja2 驱动的模板渲染页面的艺术。这种探索虽然需要耐心，但最终取得了成果，因为我逐渐在项目中加入了一些功能--除了上传文件的要求。

```python
@app.route("/")
def index():
    database = db.get_db()
    ImageTable = database.execute("SELECT * FROM IMAGES ORDER BY Date DESC")
    if 'username' in session:
        LikeTable = database.execute("SELECT LikedPostUUID FROM ImagesLikedByUser WHERE User = ? AND LikeStatus = ?",
        (session['username'], 1, )).fetchall()
        LikedList = []

        for i in LikeTable:
            LikedList.append(str(i[0]))
            Avatar = database.execute('SELECT Avatar FROM AVATARS WHERE UserName = ?', (session['username'],)).fetchone()
            userAvaterImage = app.config['PUBLIC_USERFILES'] + '/' + session['username'] + '/' + Avatar['Avatar']

        return render_template(
            "index.html",
            PageTitle="HomePage",
            Images=ImageTable,
            userAvaterImage=userAvaterImage,
            userName=session['username'],
            LikedList=LikedList)

    else:
        return render_template("index.html", PageTitle="HomePage", Images=ImageTable)

```

```html
{% extends "base.html" %}
{% block Title %} {{PageTitle}} | TinyGallery {% endblock %}
{% block body %}
<div class="Content">
    {% for x in Images %}
    <div class="work">
        <img class="displayedImages" onclick="OpenFullImage({{ loop[" index"] }})"
            src="/static/img/users/{{ x['User'] }}/Images/{{ x['UUID'] }}.jpg" alt="{{ x['UUID'] }}" />
        <h1 class="userName">{{ x['ImageTitle'] }}</h1>
        <p class="textFont">
            <span>By {{ x['User'] }}</span>
            <br />
            <span class="LikesNum">
                Likes: {{ x['Dots'] }}
            </span>
            <br />
            <span>Description: {{ x['Description'] }}</span>
            <br />
            <span>Date: {{x['Date']}}</span>
            <br />
            {% if g.user %}
            {% if x['UUID'] in LikedList %}
            <svg onclick="SendLikedData({{ loop[" index"] }}, 'Like' )" class="likeStatus0" style="display: none;"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star"
                viewBox="0 0 16 16">
                <path
                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>
            <svg onclick="SendLikedData({{ loop[" index"] }}, 'Unlike' )" class="likeStatus1"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill"
                viewBox="0 0 16 16">
                <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            {% else %}
            <svg onclick="SendLikedData({{ loop[" index"] }}, 'Like' )" class="likeStatus0"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star"
                viewBox="0 0 16 16">
                <path
                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>
            <svg onclick="SendLikedData({{ loop[" index"] }}, 'Unlike' )" class="likeStatus1" style="display: none;"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill"
                viewBox="0 0 16 16">
                <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            {% endif %}
            {% endif %}
        </p>
    </div>
    {% endfor %}
</div>
{% endblock %}
```

尽管 Flask 简单易用，但在 TinyGallery 的早期版本中，Flask 确实表现出了一些缺陷，并产生了一些具有挑战性的错误，这促使我决定过渡到一个新的技术栈。

### FastAPI、VueJS

进入**FastAPI**和**VueJS**。为了提升 TinyGallery 的体验，我们决定将后端和前端分开，重点利用 Ajax-all-in 和 Restful API 功能。这种强烈的追求让我沉浸在 VueJS 的世界中，并最终创建了 [tinygallery-vue](https://github.com/WeepingDogel/tinygallery-vue) 和 [tinygallery-backend](https://github.com/WeepingDogel/tinygallery-backend) 。经过几个月的潜心学习，最终成功完成了这项工作。

在此期间，我学习的深度和广度都很可观，包括使用 FastAPI 创建一个 Restful API 提供程序，使用 axios 制作一个能够与服务器进行无缝数据通信的网页，以及使用 VueJS 精心设计简单而优雅的组件。

```typescript
async fetchData() {
      // Fetch more image data from the server
    this.pages = this.pages + 1; // Increment the current page number
    const response = await axios.get("/resources/posts/" + this.pages); // Make a GET request to the server API
    const newData = JSON.parse(response.request.response); // Parse the response text to JSON format
    if (newData[0] == null) {
        // If there is no new data
        this.pages = this.pages - 1; // Decrement the current page number
    } else {
        // Otherwise
        for (let i = 0; i < newData.length; i++) {
          // Loop over the new data and add it to the display data array
          (this.displayData as any).push(newData[i]);
        }
    }
},
```

```html
<template>
  <div class="Card" v-for="items of displayData">
    <img
      @click="OpenRemarkBySingleUUID((items as any).post_uuid)"
      class="displayImage_NSFW"
      :src="(items as any).cover_url"
      :alt="(items as any).post_uuid"
      v-if="(items as any).nsfw"
    />
    <img
      @click="OpenRemarkBySingleUUID((items as any).post_uuid)"
      class="displayImage"
      :src="(items as any).cover_url"
      :alt="(items as any).post_uuid"
      v-else
    />
    <h2 class="ImageTitle">{{ (items as any).post_title }}</h2>
    <p class="ImageDescription">{{ (items as any).description }}</p>
    <div class="UserInfoBar">
      <img class="UserAvatar" :src="(items as any).avatar" />
      <p class="ImageUserName">{{ (items as any).user_name }}</p>
      <p class="LikesDisplay">{{ (items as any).dots }} likes</p>
      <p class="ImageDate">
        {{ TimeZoneCaculator.CaculateTheCorrectDate((items as any).date) }}
      </p>
    </div>
  </div>
</template>
```

```python
@image_resources_api.get("/posts/{page}")
async def get_posts_as_json(page: int, db: Session = Depends(get_db)):
    if not page:
        raise HTTPException(
            status_code=400, detail="You must append a page number to the end of the url.")
    posts_from_db = crud.get_posts_by_page(db=db, page=page)
    list_for_return: list[dict] = []
    for x in posts_from_db:
        user_uuid = get_user_uuid_by_name(user_name=x.user_name, db=db)
        admin_uuid = get_admin_uuid_by_name(user_name=x.user_name, db=db)
        temp_dict = {
            "id": x.id,
            "description": x.description,
            "share_num": x.share_num,
            "post_uuid": x.post_uuid,
            "nsfw": x.nsfw,
            "user_name": x.user_name,
            "post_title": x.post_title,
            "dots": x.dots,
            "date": x.date[0:16],
            "cover_url": dir_tool.get_cover_file_url(x.post_uuid),
            "avatar": dir_tool.get_avatar_file_url(dir_user_uuid=admin_uuid if admin_uuid else user_uuid)[1]
        }
        list_for_return.append(temp_dict)
    return list_for_return
```

我沉浸在新技能带来的满足感中，得意洋洋地浏览了 VueJS 的选项 API，熟悉了生命周期管理、组件和道具的复杂性。在后端方面，我掌握了用于身份验证、文件处理和数据操作的 JWT 令牌创建技术，进一步增强了我的能力。

```typescript
LoginAccount() {
    if (this.logUserName == "" || this.logPassWord == "") {
        // Check if username and password are empty
        this.Result = "Username or password can't be empty!";
        console.log("Username or password can't be empty!");
    } else {
        let bodyFormData = new FormData();
        bodyFormData.append("username", this.logUserName);
        bodyFormData.append("password", this.logPassWord);
        axios({method: "post", url: "/user/token", data: bodyFormData, headers: { "Content-Type": "application/x-www-form-urlencoded" },})
          .then((response: any) => {
            console.log(response.data.access_token);
            // Create an object to store the username and token.
            const token = response.data.access_token;
            window.localStorage.setItem("Token", token);
            // Set logging status.
            Authentication().setLogStatus(true);
        })
          .catch((error: any) => {
            // Return the errors.
            this.Result = error.response.data.detail;
            console.log(error.response.data.detail);
        });
    }
},
```

```python
@userAuthRouter.post("/token")
async def user_login(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user_authentication = authenticate_user(db, form_data.username, form_data.password)
    admin_authentication = authenticate_admin(db, form_data.username, form_data.password)
    # Raise error if authentication fails
    if not user_authentication and not admin_authentication:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password.",
            headers={"WWW-Authenticate": "Bearer"}
        )
    try:
        # Create access token
        access_token_expires = timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": form_data.username},
            expires_delta=access_token_expires)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Cannot create token.",
            headers={"WWW-Authenticate": "Bearer"}
        )
    # Return access token
    return {"access_token": access_token, "token_type": "bearer"}
```

```typescript
export default {
    data() {
        return {
            pages: 1, // The current page number
            displayData: [], // An array to store the displayed images.
        };
    },
    ...
    mounted() {
    // Called after the component is mounted and ready to use
    this.displayIamges(); // Display the initial set of images
    }
}
```
此外，我还可以处理上传文件、更新和删除数据的任务。

```typescript
uploadPost() {
      // Define a method called 'uploadPost' that sends a POST request to the server with the form data entered by the user.
    if (this.post_title == "" || this.description == "") {
        // If the 'post_title' or 'description' data properties are empty, log an error message to the console.
        console.log("Title and Dercription can't be empty!");
    } else {
        const token = localStorage.getItem("Token"); // Get the JWT token from local storage and store it in a variable called 'token'.
        const config = {
          // Define an object called 'config' with headers that include the JWT token and set the content type to 'multipart/form-data'.
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "multipart/form-data",
          },
        };
        let is_nsfw; // Declare a variable called 'is_nsfw'.
        let bodyFormData = new FormData(); // Create a new instance of the FormData class and store it in a variable called 'bodyFormData'.
        if (this.is_nsfw) {
          // Check whether the 'is_nsfw' data property is true. If so, set 'is_nsfw' to "true"; otherwise, set it to "false".
          is_nsfw = "true";
        } else {
          is_nsfw = "false";
        }
        bodyFormData.append("is_nsfw", is_nsfw); // Append the 'is_nsfw' value to the form data object.
        bodyFormData.append("post_title", this.post_title); // Append the 'post_title' value to the form data object.
        bodyFormData.append("description", this.description); // Append the 'description' value to the form data object.
        if (this.CustomCover) {
          // If the 'CustomCover' data property is true, append the cover file selected by the user to the form data object; otherwise, append an empty string.
          bodyFormData.append("cover", this.coverFile as any);
        } else {
          bodyFormData.append("cover", "");
        }
        for (let i = 0; i < this.uploadImagesFile.length; i++) {
          // Loop through the array of uploaded images and append each one to the form data object.
          console.log(this.uploadImagesFile[i]);
          bodyFormData.append("uploaded_file", this.uploadImagesFile[i]);
        }
        console.log(bodyFormData); // Log the final form data object to the console.
        axios
          .post("/posts/create", bodyFormData, config) // Send a POST request to the '/posts/create' endpoint with the form data as the payload.
          .then((response) => {
            // If the request is successful...
            console.log(response); // Log the response to the console for debugging purposes.
            if ((response.data.status = "success")) {
              // Check if the server responded with a success status.
              this.$emit("update:modelValue", false); // Emit the 'update:modelValue' event with a value of false to close the uploader panel.
              UpdateImages().Update(1); // Call the 'UpdateImages' function to update the images displayed on the website.
              this.$router.push("/"); // Redirect the user to the homepage.
            }
        })
          .catch((error) => {
            // If there was an error...
            console.error(error); // Log the error to the console for debugging purposes.
            alert(error.response.data.detail); // Display an alert with details about the error.  
        });
      }
      this.post_title = ""; // Reset the 'post_title' data property to an empty string.
      this.description = ""; // Reset the 'description' data property to an empty string.
      this.is_nsfw = ""; // Reset the 'is_nsfw' data property to an empty string.
      this.CustomCover = false; // Reset the 'CustomCover' data property to false.
    },
```
```python
@Post_router.post("/create")
def upload_image(is_nsfw: str = Form(),
                 db: Session = Depends(get_db),
                 uploaded_file: list[UploadFile] = File(),
                 cover: UploadFile | None = None,
                 post_title: str = Form(),
                 description: str = Form(),
                 token: str = Depends(oauth2Scheme)):
    # This block for declare variables.
    # --- declare block
    # Get the name of user from token
    user_name: str = token_tool.get_user_name_by_token(token=token)
    post_uuid: str = str(uuid.uuid4())
    # If User uploaded a cover then this variable will be True.
    cover_exist: bool = False
    # -- end declare block

    # This block for verification
    # ---verification block
    if not crud.get_user_by_name(db, user_name=user_name) and not crud.get_admin_by_name(db, user_name=user_name):
        raise HTTPException(
            status_code=400, detail="The user does not exist!")
    if cover:
        cover_exist = True
    # Return Error, if list have same file name.
    for x in uploaded_file:
        if x.filename in uploaded_file:
            raise HTTPException(
                status_code=400, detail="File name not be same!")

    # Create the post direction witch named its uuid in IMAGE_DIR from config.py.
    current_post_path_obj = Path(config.POST_DIR).joinpath(post_uuid)
    # If the direction already existed then return error.
    if current_post_path_obj.is_dir():
        raise HTTPException(
            status_code=500, detail="Cannot to create post.")
    current_post_path_obj.mkdir()
    current_post_path_obj.joinpath("cover").mkdir()

    # Check image files suffix.
    for x in uploaded_file:
        if x.filename.split(".")[-1] not in config.ALLOW_SUFFIX:
            raise HTTPException(
                status_code=400, detail="Not allowed file type.")
    if cover:
        if cover.filename.split(".")[-1] not in config.ALLOW_SUFFIX:
            raise HTTPException(
                status_code=500, detail="Not allowed file type.")

    save_post_status: bool = dir_tool.save_post_images(
        post_uuid=post_uuid,
        uploaded_file=uploaded_file,
        supplementary_mode=False
    )
    if not save_post_status:
        raise HTTPException(
            status_code=400, detail="Cannot save the post on server!")

    save_cover_status: bool = dir_tool.save_post_cover(
        cover_name=uploaded_file[0].filename,
        post_uuid=post_uuid,
        cover=cover,
        cover_exist=cover_exist,
        update_mode=False
    )
    if not save_cover_status:
        raise HTTPException(
            status_code=400, detail="Cannot save the cover of post on server!")

    compress_cover_status: bool = dir_tool.compress_cover(
        post_uuid=post_uuid,
        update_mode=False
    )
    if not compress_cover_status:
        raise HTTPException(
            status_code=400, detail="Cannot compress the cover of post on server!")

    if is_nsfw == "true":
        nsfw_db: bool = True
    else:
        nsfw_db: bool = False

    crud.db_create_post(
        db=db,
        user_name=user_name,
        post_title=post_title,
        description=description,
        post_uuid=post_uuid,
        is_nsfw=nsfw_db
    )

    return {
        "status": "success"
    }
```
这些框架不仅加快了我开发简单网络应用程序的速度，还拓宽了我的编程经验，让我重新找回了自信。

### pandas
学习 [**pandas**](https://pandas.pydata.org/) 改变了我的生活。这个建立在 Python 基础上的开源数据分析和处理工具用途广泛，速度快如闪电，已被证明是我执行数据相关任务时不可或缺的资产。

无论是清理数据集，还是深入研究综合数据分析，pandas 始终是我的得力助手。
一个有趣的方面是，它能够毫不费力地处理通过蜘蛛脚本获取的数据，使数据易于访问和读取，以便进一步处理。

此外，在清理操作之后，我还能迅速将新数据生成 Excel 或 CSV 文件，这一点简直太神奇了。

不过，我必须承认，要掌握这个强大的工具，需要学习和实践的地方还很多。经验才是真正的老师，不是吗？

### pyecharts

现在，让我们来谈谈 [**pyecharts**](https://pyecharts.org/#/)。当我需要从我的数据中绘制出令人惊叹的图片或图表并将其显示在网页上时，pyecharts 就成了我的首选解决方案。

当然，我也知道 Apache ECharts 是一个开源的 JavaScript 可视化库，但设置其属性和渲染复杂的图表可能是一项相当繁重的工作。这时，pyecharts 的出现拯救了我，帮我避开了复杂的问题，简化了流程。

官方文档提供了大量创建简单数据图表和图形的示例，绝对是我的救星。当我只需要一个快速、简单的图表时，依靠 pyecharts 绝对是轻而易举的事。

### 数据库

在掌握了 SQL 并熟悉了 MySQL、MariaDB 和 SQLite 之后，我发现它们在满足各种开发需求方面各有千秋。

#### [SQLite](https://www.sqlite.org)

说到轻量级、基于文件的管理和丰富内容的轻松传输，SQLite 一直是我在简单应用中的首选。SQLite 数据库文件通常用于内容传输和长期数据存档，这表明它具有多功能性，可广泛应用于各种场景。事实上，你知道目前有超过 1 万亿（1e12）个活跃的 SQLite 数据库在使用吗？这真是令人难以置信！SQLite 的灵活性和易用性使其成为 [TinyGallery](https://github.com/WeepingDogel/tinygallery-backend) 等项目的理想解决方案，在这些项目中，它是可靠的数据库引擎。

#### [MySQL](https://www.mysql.com) & [MariaDB](https://mariadb.org)

当然，在性能是重中之重的情况下，尤其是在大型应用中，MySQL 或其分叉产品 MariaDB 的稳健性往往变得至关重要。它们在业界的良好声誉以及处理更大数据集和更高负载的能力使它们成为开发社区的热门选择。

### 虚拟化

进入云计算这个令人着迷的领域，不仅拓宽了我对现代技术的理解，还激发了我对虚拟化--云基础设施的基石--的浓厚兴趣。

在这一领域，我有幸熟悉了各种虚拟化软件，提高了我对资源管理和系统协调的理解。让我们深入了解每种著名工具的具体内容：

#### VMware Workstation

在我的虚拟化探索中，[**VMware Workstation**](https://www.vmware.com/products/workstation-pro.html)处于最前沿。它在单个物理设备上运行多个虚拟机的强大环境，对完善我的系统管理和资源分配方法起到了重要作用。

VMware Workstation 丰富的功能集和友好的用户界面使我能够以无与伦比的轻松和高效创建和管理虚拟环境，在我的数字基础架构管理之旅中留下了不可磨灭的印记。

#### VirtualBox

随着我的深入研究，[**VirtualBox**](https://www.virtualbox.org)凭借其开源精神，成为一个引人注目的替代方案，重塑了我对虚拟化的可访问性和简易性的看法。它无缝创建和管理虚拟机的能力不仅拓宽了我的技术能力，还使虚拟化体验民主化，让不同的爱好者和专业人士都能使用虚拟化。

VirtualBox 的包容性和用户友好性凸显了提供易于使用的虚拟化工具对于帮助更多有抱负的开发人员和云计算爱好者的重要意义。

#### Qemu/KVM

在我的虚拟化之旅中，[**QEMU/KVM**](https://wiki.qemu.org/Features/KVM) 的强强联手一直是一股强大的力量，它囊括了管理程序功能和 Linux 系统硬件辅助虚拟化的原始力量。

这对充满活力的组合所提供的无缝兼容性和强大性能，为管理虚拟化环境的敏捷性和效率开辟了新的空间，并激发了我对底层虚拟化技术复杂性的新认识。

使用 QEMU/KVM 不仅增强了我的技术实力，还丰富了我对系统级虚拟化的理解，改变了我管理数字基础设施的方法。

#### Libvirt

最后但并非最不重要的是，[**libvirt**](https://libvirt.org/manpages/libvirtd.html)是一个通用的开源工具包，在我探索虚拟化技术的过程中成为我的忠实伙伴。

它对 QEMU/KVM、Xen 和 LXC 等一系列管理程序的广泛支持简化了虚拟化平台的协调和管理，为虚拟化功能和基础设施管理提供了一个整体视角。

我与 libvirt 的合作历程凸显了适应性强、功能多样的虚拟化工具在现代社会的重要作用，重新定义了基础架构管理和资源优化的范式。

---

这些虚拟化技术具有多种功能和应用，不仅加深了我在云计算方面的专业知识，还拓宽了我的视野，让我对高效资源利用和基础设施协调有了细致入微的了解。

虚拟化之旅是一次不折不扣的变革，为驾驭云基础设施和数字环境的动态景观奠定了坚实的基础。

### Docker

拥抱[**Docker**](https://www.docker.com)的世界是一次变革之旅，它重新定义了我对待软件开发和部署的方式。从潜心研究Docker的创新容器化方法，到挖掘其创建轻量级、可移植和自给自足环境的潜力，我的探索过程令人振奋。

去年，我撰写了一篇[***文章***]（/zh-cn/posts/浅尝docker/），揭示了使用Docker的这一历程。

### OpenStack

最近，我开始涉足[**OpenStack**](https://www.openstack.org)领域，为云计算基础设施管理打开了一扇潜力巨大的大门。

虽然我目前只是在一台 Linux 服务器上进行了安装，但我已经准备好开始一段丰富的学习之旅，揭开 OpenStack 功能的神秘面纱。

这次旅程已经彰显了 OpenStack 在重塑可扩展和可定制云环境动态方面的威力，我期待着在进一步深入研究其功能和应用时记录下我的发现。

## 新设备

### 108 客制化键盘 
* 极地狐狸轴用于字母区，午夜翡翠轴用于大按键，BOX白色轴用于其他按键。
* 支持三模式和 RGB

我购买这款键盘是为了获得更好的打字体验、更好的外观和游戏体验。

### 87 客制化键盘
* 空格键采用蓝莓冰淇淋轴，其他按键采用灰木 V4 轴
* 仅限单模式，白色背光

我购买这款键盘是为了编程和尝试不同的键入体验。

另外，它的轻巧总是能帮我取代学校计算机教室里的薄膜键盘。
没有状态良好的键盘... 大多数键盘都因为学生上课无聊而出现不同程度的损坏
甚至还有键帽被抠掉的... 那我得自己带键盘去上实验课了。

### ViewSonic 显示器

* 23.8 英寸，1080P，165Hz，Fast-IPS 面板，支持 HDR10

我在开学时买了它，起初以为在大屏幕上可以阅读更多行代码...

### 华硕路由器AX-56U

不知道什么疯买的华硕路由器，支持双频WiFi6，千兆有线，没刷系统，还在用官方固件，目前在家里当AP用。

### 从 [muki](https://t.me/Mukixi) 那里收的小主机
其实它的来历有故事，但我说过不好的回忆没有任何意义。R5-1400+RX580，8GB RAM，目前放在家作为 Me0w00f Technology 团队的内部服务器使用。

### Pixel 3XL
[某只狐狸](https://t.me/kawaii_fox)捐赠的墙外机，用于墙外社交、有时候看 YouTube 、安装了 [DOL](https://www.vrelnir.com/)。
也没有进行刷机，仍然是 Pixel 官方原生系统摆烂。

# 遗憾

然而，不可能总是一帆风顺。

无法实现和完成的事情是一种遗憾。

## 比赛

首先，也是最大的遗憾是，今年我没能有机会参加大型比赛。

虽然我进行了训练和准备，学习了很多...

## 技能、作品和游戏。

此外......一些技能细节和基本知识还没有掌握。

遗憾的是，我也没有享受到美好的游戏时光...

## 抑郁

一切糟糕的事情都来自可怕的原因，我可能在情绪上生病了，比如抑郁症。

我知道有必要去看医生，但机会很少。
我想摆脱它，但这很难。

它就像一块石头，很可能也肯定会阻碍我前进的脚步......

# 新友

以下是我今年新认识的朋友和他们说的话。

## GrassBlock
> "新的一年希望狗子能够开心的活着，不要把自己想的太低而给自己压力。"
## Riiina
> "看医生。"

## Epsoide33
> "你啊  
> 还是考虑下怎么好好活着吧,至少在我看来你是挺有前景的。"

# 2024 年的计划
* 完成***《Computer Systems A Programmer’s Perspective》***一书的阅读。
* 学习使用 Vuetify 或 PrimeVue。
* 学习更多有关虚拟化、编程和网络的知识。
* 准备专升本。
* 参加一次比赛。
* ~~找到对象~~(还是算了吧)

# 结语

终于，我记录下了这一年。即使有失败的遗憾，我还是收获了很多，以至于在年末时从不感到悲伤。

