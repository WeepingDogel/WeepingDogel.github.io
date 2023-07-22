# How To Transfer A Value From The Parent Component To The Child Component in Vue 3.2


## Introduction

Vue is a popular JavaScript framework for building interactive web interfaces. It's easy to learn, versatile, and has a supportive community.

Developing single-page applications with Vue is incredibly convenient.

However, there are instances where we encounter challenges when it comes to transferring values between parent and child components.

Still unclear? Imagine this scenario: You've created a button and you want it to control the content of a `<p></p>` element, thereby fulfilling a specific development requirement.

Then it's time to transfer different values to `ChildComponet` to change the properties or trigger an event.


## Ways to transfer a value from the parent to the child

### Step 1: Create the Parent Component
1. Create a new Vue component file for the parent component (e.g., `ParentComponent.vue`).
2. In the component's template, define the parent component's content and include the child component.
```vue
<template>
    <div class="FatherBox">
        <ChildComponent />
        <button></button>
    </div>
</template>
```
3. Import the child component by adding the necessary import statement.
```vue
<script lang="ts">
import ChildComponent from './ChildComponent.vue';
</script>
```
4. Register the child component in the parent component's components property.

```vue
<script lang="ts">
export default {
  components: {
    ChildComponent,
    },
}
</script>
```

### Step 2: Define the Data in the Parent Component

1. In the parent component's script section, define a data property to store the value that will be passed to the child component.
```vue
<script lang="ts">
export default {
  data() {
    return {

    };
  },
}
</script>
```
2. Assign the initial value to the data property. This will be the value passed initially to the child component.

```vue
<script lang="ts">
export default {
  data() {
    return {
      message: 'Hello from the parent component!', // Value to pass to child component
    };
  },
}
</script>
```

### Step 3: Pass the Data as a Prop to the Child Component

1.In the parent component's template, add the child component and use the colon (:) binding to pass the data property as a prop to the child component.
```vue
<template>
    <div class="FatherBox">
        <ChildComponent :message="message" />
    </div>
</template>
```
2. The prop name in the child component should match the name you choose when passing the prop in the parent component.
```vue
<script lang="ts">
import ChildComponent from './ChildComponent.vue';

export default {
    components: {
        ChildComponent,
    },
    data() {
        return {
            message: 'Hello from the parent component!', // Value to pass to child component
        };
    },
    methods: {
      changeMessage() {
            this.message = 'New message from parent!';
        },
    }
};
</script>
```
### Step 4: Create the Child Component

1. Create a new Vue component file for the child component (e.g., `ChildComponent.vue`).

2. In the child component's template, define the child component's content. This will include rendering the prop value passed from the parent component.
```vue
<template>
    <div>
        <p>{{ message }}</p>
    </div>
</template>
```
### Step 5: Define the Prop in the Child Component

1. In the child component's script section, define the prop for receiving the data sent by the parent component.
```vue
<script lang="ts">
export default {
    props: {
        message: {

        },
    },
};
</script>
```
2. Specify the type of the prop (e.g., `String`, `Number`, etc.) to ensure data integrity. You can also set `required: true` if the prop must be passed.
```vue
message: {
  type: String,
  required: true,
},
```
### Step 6: Emit an Event from the Child Component

1. In the child component's script, define a method that will emit an event to communicate with the parent component.
```vue
methods: {
  changeMessage() {
    const newMessage = 'New message from child!';

  },
},
```
2. Inside the method, use this.$emit('event-name', data) to emit the event. Choose a suitable event name and pass any relevant data to the parent component.
```vue
methods: {
  changeMessage() {
    const newMessage = 'New message from child!';
    this.$emit('update-message', newMessage);
  },
},
```

### Step 7: Handle the Event in the Parent Component

1. In the parent component's script, define a method that will handle the event emitted by the child component.
```vue
updateMessage(newMessage: any) {

},
```
2. Add an event listener to the child component instance in the parent component's template, using `@event-name="methodName"`.
```vue
<template>
<ChildComponent :message="message" @update-message="updateMessage" />
</template>
```
3. In the method, receive the emitted data as an argument and update the parent component's data accordingly.
```vue
updateMessage(newMessage: any) {
  this.message = newMessage;
},
```
---

### Compeleted Code

ParentComponent:
```vue
<template>
    <div class="FatherBox">
        <ChildComponent :message="message" @update-message="updateMessage" />
        <button @click="changeMessage">Change Message By ParentComponent</button>
    </div>
</template>
  
<script lang="ts">
import ChildComponent from './ChildComponent.vue';

export default {
    components: {
        ChildComponent,
    },
    data() {
        return {
            message: 'Hello from the parent component!', // Value to pass to child component
        };
    },
    methods: {
        updateMessage(newMessage: any) {
            this.message = newMessage;
        },
        changeMessage() {
            this.message = 'New message from parent!';
        },
    },
};
</script>

<style scoped>
.FatherBox {
    background-color: #f1f1f1;
    border-radius: 20px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
}
</style>
```

ChildComponent:
```vue
<template>
    <div>
        <p>{{ message }}</p>
        <button @click="changeMessage">Change Message</button>
    </div>
</template>
  
<script lang="ts">
export default {
    props: {
        message: {
            
        },
    },
    methods: {
        changeMessage() {
            const newMessage = 'New message from child!';
            this.$emit('update-message', newMessage);
        },
    },
};
</script>
```

## Test

Then we can execute `yarn dev` to start a development server and we can see a page like this:

![](/img/Screenshot_2023-07-22_at_18-07-34_Vite_App.png)


Now Let's try clicking the first button!

![](/img/2023-07-22-18-09-41屏幕截图.png)

Obviously! The content of the text changed!

Then let's click the second button!

![](/img/2023-07-22-18-11-13屏幕截图.png)

It became "New message from parent!"!

That's amazing right?

## Conclusion

That's it! By following these steps, you can successfully pass a value from a parent component to a child component using props and events in Vue.js. Don't forget to save your files, import components where necessary, and register components appropriately.
