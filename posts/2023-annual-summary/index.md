# Annual Summary in 2023


Though the time is a unit defined by people, it can still flow away like a river running from the hill to the plain. I Only feel a sigh and a wink, the 2023 just has passed.

<!--more-->

Just looking back on the memories like the cherry blossoms drifting in midair, which I want to catch on my tiptoes, a lot has happened this year.

Now just hold the petals and look, which probably makes me bring back the time to mind.

# Gained

The past year has been a whirlwind of learning and growth for me.

## Skills & Knowledge

In 2023, I delved into a multitude of skills and embarked on several captivating open-source projects that have significantly broadened my horizons.

### Flask
Let's start with the Flask journey.

Early on, I found myself entangled in the enchanting web of Flask, a delightful web application framework in Python. 
The thrill of setting up and completing the [TinyGallery](https://github.com/WeepingDogel/tinygallery) using Flask's straightforward and efficient MVC structure left an indelible mark on my learning path. 

Diving into the official Flask documentation, I uncovered the art of rendering pages with the aid of jinja2-powered templates. This exploration, though it demanded patience, eventually bore fruit as I gradually incorporated functionalities into the project—minus the requirement of file uploads.

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

```jinja2
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

Despite its simplicity and ease of adoption, Flask did exhibit some flaws and yielded challenging bugs in the earlier versions of TinyGallery, contributing to a decision to transition to a new technology stack.

### FastAPI, VueJS

Enter **FastAPI** and **VueJS**. To elevate the TinyGallery experience, a decision was made to bifurcate the backend and frontend, with a keen emphasis on leveraging Ajax-all-in and Restful API features. This compelling pursuit led me to immerse myself in the world of VueJS, resulting in the creation of [tinygallery-vue](https://github.com/WeepingDogel/tinygallery-vue) and [tinygallery-backend](https://github.com/WeepingDogel/tinygallery-backend). Months of dedicated learning culminated in the successful completion of this endeavor.

The depth and breadth of my learning during this period were substantial, encompassing the creation of a Restful API provider with FastAPI, the crafting of a webpage capable of seamless data communication with the server using axios, and the meticulous design of simple, yet elegant components in VueJS. 

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

Reveling in the satisfaction of newfound skills, I proudly navigated my way through VueJS's option API, acquainting myself with the intricacies of lifecycle management, components, and props. On the backend front, mastering the art of JWT token creation for authentication, file handling, and data manipulation further bolstered my repertoire.

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

In addition, I can also deal with the task of uploading files, updating and deleting data.
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

These frameworks didn't just expedite my development speed for simple web applications; they also broadened my programming experiences, empowering me with a newfound sense of confidence.

### pandas
Learning [**pandas**](https://pandas.pydata.org/) has been a game-changer for me. This versatile and lightning-fast open-source data analysis and manipulation tool, built on top of Python, has proven to be an indispensable asset for my data-related tasks.

Whether it's cleaning up datasets or delving into comprehensive data analysis, pandas has consistently come to my rescue.
One interesting aspect is its ability to effortlessly handle data fetched through spider scripts, making it accessible and easily readable for further processing. 

Plus, the fact that I can swiftly generate new data into Excel or CSV files after the cleansing operation is nothing short of magical. However, I must admit, there's always more to learn and practice when it comes to mastering this powerful tool. Experience is the true teacher, right?

### pyecharts

Now, let's talk about [**pyecharts**](https://pyecharts.org/#/). When I need to whip up a stunning picture or chart from my data and display it on a webpage, pyecharts has become my go-to solution.

Sure, I'm aware of Apache ECharts, an open-source JavaScript visualization library, but setting up its properties and rendering a complex chart can be quite the heavy lift. This is where pyecharts swoops in to save the day, helping me sidestep the complexities and streamline the process.

The official documentation, with its plethora of examples for creating simple data charts and graphs, has been an absolute lifesaver. When all I need is a quick, simple chart, relying on pyecharts feels like a breeze.

### Database

After mastering SQL and familiarizing myself with MySQL, MariaDB, and SQLite, I found that each has its unique advantages for various development needs. 

#### [SQLite](https://www.sqlite.org)

When it comes to lightweight, file-based management and easy transferability of rich content, SQLite has been my go-to choice for simpler applications. The fact that SQLite database files are commonly employed for content transfer and long-term data archival points to its versatility and widespread use in diverse scenarios. In fact, did you know that there are over 1 trillion (1e12) active SQLite databases in use today? That's mind-blowing! The flexibility and ease of use of SQLite make it an ideal solution for projects like [TinyGallery](https://github.com/WeepingDogel/tinygallery-backend), where it serves as the reliable database engine.

#### [MySQL](https://www.mysql.com) & [MariaDB](https://mariadb.org)

Of course, in scenarios where performance is a top priority, especially in larger-scale applications, the robustness of MySQL or its fork, MariaDB, often becomes essential. Their well-established presence in the industry and their ability to handle larger datasets and a higher load have made them popular choices in the development community.


### Virtualization

Venturing into the captivating realm of cloud computing has not only broadened my understanding of modern technology but also kindled a deep interest in virtualization—a cornerstone of cloud infrastructure. 

Within this domain, I've had the pleasure of acquainting myself with a diverse array of virtualization software that has elevated my comprehension of resource management and system orchestration. Let's delve into the specifics of each prominent tool:

#### VMware Workstation

At the forefront of my virtualization exploration stands [**VMware Workstation**](https://www.vmware.com/products/workstation-pro.html). Its robust environment for running multiple virtual machines on a single physical device has been instrumental in refining my approach to system administration and resource allocation. 

The rich feature set and user-friendly interface of VMware Workstation have empowered me to create and manage virtual environments with unparalleled ease and efficiency, leaving an indelible mark on my journey through digital infrastructure management.

#### VirtualBox

As I delved deeper, [**VirtualBox**](https://www.virtualbox.org), with its open-source ethos, emerged as a compelling alternative, reshaping how I perceive accessibility and simplicity in virtualization. Its seamless capacity to create and manage virtual machines has not only broadened my technical adeptness but also democratized the virtualization experience, making it accessible to a diverse spectrum of enthusiasts and professionals. 

The inclusive and user-friendly nature of VirtualBox has underscored the significance of providing accessible virtualization tools in empowering a broader community of aspiring developers and cloud enthusiasts.

#### Qemu/KVM

The potent alliance of [**QEMU/KVM**](https://wiki.qemu.org/Features/KVM) has stood as a formidable force in my virtualization odyssey, encapsulating the raw power of hypervisor functionality and hardware-assisted virtualization for Linux systems. 

The seamless compatibility and robust performance offered by this dynamic duo have unlocked new dimensions of agility and efficiency in managing virtualized environments, sparking a newfound appreciation for the intricacies of low-level virtualization technologies. 

Embracing QEMU/KVM has not only fortified my technical prowess but also enriched my understanding of system-level virtualization, transforming my approach to managing digital infrastructure.

#### Libvirt

Last but not least, [**libvirt**](https://libvirt.org/manpages/libvirtd.html), the versatile open-source toolkit, has emerged as a stalwart companion in my exploration of virtualization technologies. 

Its broad support for a range of hypervisors, including QEMU/KVM, Xen, and LXC, has streamlined the orchestration and management of virtualized platforms, providing a holistic perspective on virtualization capabilities and infrastructure management. 

My journey with libvirt has underscored the crucial role of adaptive and versatile virtualization tools in the modern era, redefining the paradigm of infrastructure management and resource optimization.

---

These virtualization technologies, with their diverse capabilities and applications, have not only deepened my expertise in cloud computing but also broadened my horizons, equipping me with a nuanced perspective on efficient resource utilization and infrastructure orchestration. 

The journey through virtualization has been nothing short of transformative, laying a resilient foundation for navigating the dynamic landscapes of cloud infrastructure and digital environments.

### Docker

Embracing the world of [**Docker**](https://www.docker.com) has been a transformative journey, redefining how I approach software development and deployment. From diving into Docker's innovative approach to containerization to unraveling its potential for creating lightweight, portable, and self-sufficient environments, my exploration has been nothing short of exhilarating. 

Last year, I penned an [**article**](/zh-cn/posts/浅尝docker/) shedding light on this very journey with Docker, and now, armed with an even broader understanding, I'm geared up to delve deeper into its intricacies.

### OpenStack

Venturing into the realm of [**OpenStack**](https://www.openstack.org) has been a recent foray, opening the doors to a world of immense potential in cloud infrastructure management. 

While I've currently dipped my toes into the installation process on a Linux server, I'm poised to embark on an enriching learning journey that will unravel the depths of OpenStack's capabilities. 

This journey has already highlighted the power of OpenStack in reshaping the dynamics of scalable and customizable cloud environments, and I'm looking forward to documenting my discoveries as I delve further into its functionalities and applications.


## New Devices

### 108 Customized Keyboard 
* Polar Fox Shaft for letter area, Midnight Jade Shaft for large keys, Box White Shaft for other keys.
* Support tri-mode and RGB

I bought this keyboard for better typing experience, better appearance and gaming.

### 87 Customized Keyboard
* Blueberry Ice Cream shaft for space bar, Graywood V4 shaft for other keys
* Single mode only, white backlight

I bought this keyboard for programming and trying different typing experience.

Plus, its light weight always helps me replace the membrane keyboard in computer classroom of shcool.
There's no keyboards in good status... Most of them are broken in different levels because of the students who feels boring in class...
There are even keycaps that have been gouged out... Then I need to take my own keyboard to take a laboratory course.

### ViewSonic Displayer

* 23.8", 1080P, 165Hz, Fast-IPS panel, HDR10 support

I bought it at the beginning of the school year, at first thinking that I could read more lines of code on the big screen...

### Asus Router AX-56U

I don't know what madness to buy Asus router, support dual-band WiFi6, Gigabit wired, didn't brush the system, still using the official firmware, currently using it as an AP at home.

### Small host received from [muki](https://t.me/Mukixi)

It actually has a story of where it came from, but as I said bad memories don't mean anything. R5-1400 + RX580, 8GB RAM, currently sitting at home as an internal server for the Me0w00f Technology team.

### Pixel 3XL 

Off-[wall](https://en.wikipedia.org/wiki/Great_Firewall) machine donated by [a certain fox](https://t.me/kawaii_fox), used for off-wall socializing, sometimes watching YouTube, [DOL](https://www.vrelnir.com/) installed.
It's also not bricked, and is still officially native to the Pixel.

# Pity

However, it's impossible for a ship to always move mildly on the ocean. 
Something is a pity that couldn't be realized and accomplished.

## Competition

The first and biggest pity is that I couldn't get a chance to participate in large competition this year.

Although I had trained and prepared, learning much...

## Skills, works and gaming.

In addition..  some details of skills and some basic knowledges hadn't been accquired.

Saddly, I also hadn't enjoyed a good gaming time...

## Depression

Everything bad comes from the terrible reason, I might be ill in emotion, like depression.

I know it is necessary to see a doctor, but chances are few. 
I wanna get rid of it, but it's hard.

It has been a stone which probably and definitly prevents my steps to go forward...

# New accquaintance

Here are my new accquaintance or firends I met this year with something they say.

## GrassBlock
> "In the new year I hope WeepingDogel can live happily and not stress himself out by thinking too lowly of himself!"
## Riiina
> "See a doctor"
## Epsoide33
> "You.  
> Think about how to live, at least you seem promising to me."
# Plans in 2024

* Finish reading the book ***Computer Systems A Programmer’s Perspective***.
* Learn to use Vuetify or PrimeVue.
* Learn more about virtualization, programming and networking.
* Prepare for bachelor's degree.
* Join and win a competition.
* ~~Find a lover~~(Never mind)

# Conclusion

Finally, I recorded this year. Even if there's a pity for something failed, I still gain so much that never feel sad at the end of the year.


