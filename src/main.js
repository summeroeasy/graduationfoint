// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Antd from "ant-design-vue";
import store from "./store/store";
import "ant-design-vue/dist/antd.css";
import axios from 'axios'
import qs from "qs";
import Dialog from '@/components/Dialog'
import FileUploader from './plugins/FileUploader';
import request from "@/utils/request";
Vue.prototype.$store = store;
Vue.prototype.$qs = qs; //同全局注册,qs为一个url参数转化的js库
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Dialog);
// 将axios绑定到Vue原型上，这样在组件内部可以使用this.$axios访问
Vue.prototype.$axios = axios;
// 使用插件，并提供上传接口的URL
Vue.use(FileUploader, {
  uploadUrl:  'http://localhost:8082/common/upload', // 替换为实际的上传URL
  });

//全局注册组件
//Vue.component('users',Users);
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});
