// https://github.dev/vuejs/core/tree/main/packages/runtime-core/src/h.ts
// https://github.dev/vuejs/core/tree/main/packages/runtime-core/src/vnode.ts - createVNode
// https://github.dev/vuejs/core/tree/main/packages/runtime-core/src/apiCreateApp.ts - createAppAPI
// https://github.dev/vuejs/core/tree/main/packages/runtime-core/src/renderer.ts - createRenderer
// https://github.dev/vuejs/core/tree/main/packages/runtime-core/src/component.ts - createComponentInstance
// https://github.dev/vuejs/core/tree/main/packages/runtime-dom/src/index.ts - createApp

/**
 * Create a virtual node.
 * Virtual nodes are an in-memory representation of the final DOM the application will render.
 *
 * @param {string} tag - HTML tag
 * @param {*} props - corresponding HTML tag's props
 * @param {*} children
 * @returns {tag: string; props: object; children: object[]}
 */
export function h(tag, props, children) {
  return { tag, props, children };
}

/**
 * Add a virtual node onto the DOM
 *
 * @param {*} vnode
 * @param {*} container
 */
export function mount(vnode, container) {
  const el = document.createElement(vnode.tag);
  vnode.el = el;

  // Handle props
  for (const key in vnode.props) {
    // key: class
    // vnode.props[key]: 'text-red-500
    if (key.startsWith('on')) {
      // When it's an event
      // onClick => click
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, vnode.props[key]);
    } else {
      // When it's a regular attribute
      el.setAttribute(key, vnode.props[key]);
    }
  }

  // Add children
  if (typeof vnode.children === 'string') {
    // Text
    el.textContent = vnode.children;
  } else if (Array.isArray(vnode.children)) {
    // Array of vnodes
    vnode.children.forEach((child) => mount(child, el));
  } else {
    // Single vnode
    mount(vnode.children, el);
  }

  // Add to real DOM
  container.appendChild(el);
}

/**
 * Remove a vnode from the real DOM
 *
 * @param {*} vnode
 */
export function unmount(vnode) {
  vnode.el.parentNode.removeChild(vnode.el);
}

/**
 * HTML DOM changes are expensive.
 * If we have an in-memory representation of the DOM made of plain JS objects,
 * we can figure out the changes required in the actual (not virtual) DOM, batch them together,
 * and make only the minimum necessary updates to the document at given moments in time determined by the scheduler
 * This process is known as “patching the DOM”.
 *
 * Check for differences and apply changes (very simplified version).
 *
 * @param {*} vnode1
 * @param {*} vnode2
 */
export function patch(vnode1, vnode2) {
  const el = (vnode2.el = vnode1.el);

  if (typeof vnode2.children === 'string') {
    el.textContent = vnode2.children;
  } else {
    // Assume an array of h()
    for (let i = 0; i < vnode2.children.length; i++) {
      patch(vnode1.children[i], vnode2.children[i]);
    }
  }
}
