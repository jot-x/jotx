import { defineOptions, jotxe } from '../src/index';

const state = { doc: '# hello' };

// Use defineOptions for automatic type hinting.
const options = defineOptions({
  doc: state.doc,
  hooks: {
    afterUpdate: (doc: string) => {
      state.doc = doc;
    }
  }
});

const editor = jotxe(document.getElementById('editor')!, options);

// update editor directly.
// editor.update(state.doc);
