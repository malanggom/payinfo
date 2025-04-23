/* =========================================================================== *
                                    Main.js
 * =========================================================================== */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ✅ Bootstrap CSS, Icons만 불러오기 (JS는 필요하면 따로 import)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ✅ 필요하면 Bootstrap JS도 아래처럼 import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).use(store).use(router).mount('#app')
