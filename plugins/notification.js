import Vue from 'vue'
import Notifications from 'vue-notification/dist/ssr.js'
import velocity from 'velocity-animate'
import Fullscreen from 'vue-fullscreen'
import Vuebar from 'vuebar';
import {Tabs, Tab} from 'vue-tabs-component';

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
Vue.use(Vuebar);
Vue.use(Fullscreen)
Vue.use(Notifications, {velocity})










