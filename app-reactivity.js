// Import reactivity elements from Vue
import * as vue from 'vue';
// Import vdom elemens from our own VDOM engine
import { h, mount, patch } from './vue-vdom.js';

window.vue = vue;

const counter = vue.ref(0);

// Render function
const render = () => {
  return h('div', { class: 'flex flex-col gap-3' }, [
    h('h1', { class: 'text-3xl font-bold' }, `Count: ${counter.value}`),
    h(
      'button',
      {
        class: 'bg-gray-200 p-2 rounded hover:bg-gray-300',
        onClick: () => counter.value++,
      },
      'Increment +',
    ),
  ]);
};

// Initial DOM tree
let vdom = render();

// Mount the DOM tree
const app = document.getElementById('app');
mount(vdom, app);

// Watch for changes in the counter
vue.watch(counter, () => {
  // Patch the DOM tree
  const vdomNew = render();
  patch(vdom, vdomNew);
  // vdom = vdomNew;
});
