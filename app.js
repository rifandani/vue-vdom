import { vdom7 } from './vdom-examples.js';
import { mount } from './vue-vdom.js';

const root = document.getElementById('app');

// real implementation in Vue 3
// const app = createApp(vdom)
// app.mount(root)

mount(vdom7, root);
