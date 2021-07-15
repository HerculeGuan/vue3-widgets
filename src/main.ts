import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

createApp(App).use(router).mount('#app')

// const app = createApp(App) // 生成app应用实例
// console.log(app);

// app.use(router)

// const vm = app.mount("#app") // 实例挂载到dom 组件实例
// console.log(vm); // vm就是this
