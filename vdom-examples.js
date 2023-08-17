import { patch as patchExtended } from './vue-vdom-extended.js';
import { h, patch, unmount } from './vue-vdom.js';

// VDOM 0 ---------------------------------
export const vdom0 = h('h1', null, 'h1 with no props');

// VDOM 1 ---------------------------------
export const vdom1 = h(
  'h1',
  { class: 'text-orange-500 text-3xl font-bold' },
  'h1 with props class',
);

// VDOM 2 ---------------------------------
export const vdom2 = h(
  'button',
  {
    class: 'bg-gray-200 p-2 rounded',
    onClick: () => alert('🤘'),
  },
  'Button with props onClick 🎉',
);

// VDOM 3 ---------------------------------
export const vdom3 = h(
  'div',
  { class: 'bg-gray-800 rounded-full p-6' },
  h('h1', { class: 'text-6xl text-white' }, 'h1 as children of a div'),
);

// VDOM 4 ---------------------------------
export const vdom4 = h('div', { class: 'bg-gray-800 rounded p-4' }, [
  h('h1', { class: 'text-white text-2xl' }, 'Fooooods'),
  h('ol', { class: 'list-decimal text-white ml-4' }, [
    h('li', null, '🍕'),
    h('li', null, '🍔'),
    h('li', null, '🌮'),
    h('li', null, '🍟'),
  ]),
]);

// VDOM 5 ---------------------------------
const ducks = h('span', { class: 'text-3xl' }, '🦆🦆🦆');
const monkeys = h('span', { class: 'text-3xl' }, '🙈🙊🙉');
const goats = h('span', { class: 'text-3xl' }, '🐐🐐🐐');
export const vdom5 = h('div', { class: 'text-center rounded p-4' }, [
  h('h1', { class: 'text-2xl font-bold' }, 'Remove the monkeysss'),
  h('div', null, [ducks, monkeys, goats]),
  h(
    'button',
    {
      class: 'text-3xl bg-gray-200 p-2 rounded mt-4',
      onClick: () => unmount(monkeys),
    },
    '🚫🐒',
  ),
]);

// VDOM 6 ---------------------------------
export const vdom6_patch = h('div', { class: 'flex flex-col items-center' }, [
  h('h1', { class: 'font-bold' }, "... it's a feature!"),
  h('p', { class: 'text-5xl' }, '✨'),
  h('button', { class: 'bg-white text-black p-2 rounded' }, 'Patched ✨'),
]);
export const vdom6 = h('div', { class: 'flex flex-col items-center' }, [
  h('h1', { class: 'font-bold' }, "There's a bug!!!"),
  h('p', { class: 'text-5xl my-4' }, '🐛'),
  h(
    'button',
    {
      class: 'bg-black text-white p-2 rounded hover:bg-orange-500',
      onClick: () => patch(vdom6, vdom6_patch),
    },
    'Patch 🩹',
  ),
]);

// VDOM 7 ---------------------------------
export const vdom7_patch = h('div', { class: 'flex flex-col items-center' }, [
  h('h1', { class: 'font-bold' }, "... it's a feature!"),
  h('div', { class: 'text-5xl' }, '✨'),
  h('div', { class: 'text-5xl' }, '✨'),
  h('div', { class: 'text-5xl' }, '✨'),
  h('div', { class: 'text-5xl' }, '✨'),
]);
export const vdom7 = h('div', { class: 'flex flex-col items-center' }, [
  h('h1', { class: 'font-bold' }, "There's a bug!!!"),
  h('p', { class: 'text-5xl my-4' }, '🐛'),
  h(
    'button',
    {
      class: 'bg-black text-white p-2 rounded hover:bg-orange-500',
      onClick: () => patchExtended(vdom7, vdom7_patch),
    },
    'Patch 🩹',
  ),
]);
